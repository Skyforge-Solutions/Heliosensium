/**
 * API services for interacting with the blog backend
 */

// Base API URL
// Try production URL first, fallback to localhost for development
const API_BASE_URL = "https://heliosensium-blog-backend.onrender.com/api";

// Log the current API URL being used
console.log(`Using API URL: ${API_BASE_URL}`);

// Auth token storage key
const AUTH_TOKEN_KEY = "admin_auth_token";

/**
 * AUTHENTICATION NOTES:
 * 
 * The backend API uses JWT tokens for authentication:
 * 1. The login endpoint returns a JWT token in the response
 * 2. We store this token in localStorage
 * 3. All subsequent admin API requests include the token in the Authorization header
 * 4. The token is cleared on logout or when validation fails
 *
 * This approach has been updated from a previous cookie-based approach that was not working
 * correctly with the backend implementation.
 */

// Types
export interface Blog {
  id: string;
  title: string;
  content: string;
  summary: string | null;
  authorName: string;
  authorEmail: string;
  status: "pending" | "approved" | "rejected";
  views: number;
  submissionDate: string;
  approvalDate: string | null;
  lastModified: string;
  ipAddress: string;
  adminNotes: string | null;
}

export interface PaginatedBlogs {
  success: boolean;
  data: Blog[];
  pagination: {
    nextCursor: string | null;
  };
}

export interface BlogFormData {
  title: string;
  content: string;
  summary?: string;
  authorName: string;
  authorEmail: string;
}

// API Error
export class ApiError extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message);
    this.code = code;
    this.name = "ApiError";
  }
}

// Helper to get the auth token from storage
const getAuthToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

// Helper to set the auth token in storage
const setAuthToken = (token: string): void => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

// Helper to clear the auth token from storage
const clearAuthToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

// Helper to add auth headers to requests if token exists
const getAuthHeaders = (): HeadersInit => {
  const token = getAuthToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  
  return headers;
};

// Public API functions
export const getBlogs = async (
  limit: number = 10,
  cursor?: string,
  sort: "views" | "submissionDate" = "submissionDate"
): Promise<PaginatedBlogs> => {
  // Only fetch approved blogs for public display
  let url = `${API_BASE_URL}/blogs?limit=${limit}&sort=${sort}&status=approved`;

  if (cursor) {
    url += `&cursor=${cursor}`;
  }

  console.log(`Fetching blogs from: ${url}`);

  try {
    const response = await fetch(url);
    console.log(`Response status: ${response.status}`);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
        console.error("Error response data:", errorData);
      } catch (jsonError) {
        console.error("Failed to parse error response:", jsonError);
        errorData = { error: { message: "Unknown error", code: "unknown" } };
      }
      throw new ApiError(errorData.error.message, errorData.error.code);
    }

    const data = await response.json();
    console.log(`Blogs fetched, count: ${data.data?.length || 0}`);
    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

export const getBlogById = async (id: string): Promise<Blog> => {
  const response = await fetch(`${API_BASE_URL}/blogs/${id}`);

  if (!response.ok) {
    const error = await response.json();
    throw new ApiError(error.error.message, error.error.code);
  }

  const result = await response.json();
  return result.data;
};

export const submitBlog = async (blogData: BlogFormData): Promise<Blog> => {
  const response = await fetch(`${API_BASE_URL}/blogs/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blogData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new ApiError(error.error.message, error.error.code);
  }

  const result = await response.json();
  return result.data;
};

// Admin API functions
export const adminLogin = async (
  username: string,
  password: string
): Promise<{ success: boolean }> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new ApiError(error.error.message, error.error.code);
  }

  const result = await response.json();

  // Store the JWT token from the response
  if (result.token) {
    setAuthToken(result.token);
  }

  return { success: true };
};

// Function to check if user is authenticated
export const checkAuth = async (): Promise<boolean> => {
  try {
    // If no token exists, user is not authenticated
    if (!getAuthToken()) {
      return false;
    }

    const response = await fetch(`${API_BASE_URL}/auth/validate`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    return response.ok;
  } catch (err) {
    console.error("Auth validation failed:", err);
    return false;
  }
};

// Function to logout
export const logout = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: getAuthHeaders(),
    });

    // Clear token regardless of response
    clearAuthToken();

    return response.ok;
  } catch (err) {
    console.error("Logout failed:", err);
    // Still clear token on error
    clearAuthToken();
    return false;
  }
};

export const getAdminBlogs = async (
  page: number = 1,
  limit: number = 10,
  status: "pending" | "approved" | "rejected" = "pending"
): Promise<{
  data: Blog[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
}> => {
  const response = await fetch(
    `${API_BASE_URL}/admin/blogs?page=${page}&limit=${limit}&status=${status}`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new ApiError(error.error.message, error.error.code);
  }

  const result = await response.json();
  return result;
};

export const getAdminBlogById = async (id: string): Promise<Blog> => {
  const response = await fetch(`${API_BASE_URL}/admin/blogs/${id}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new ApiError(error.error.message, error.error.code);
  }

  const result = await response.json();
  return result.data;
};

export const updateBlogStatus = async (
  id: string,
  status: "approved" | "rejected",
  adminNotes?: string
): Promise<Blog> => {
  const response = await fetch(`${API_BASE_URL}/admin/blogs/${id}/status`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ status, adminNotes }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new ApiError(error.error.message, error.error.code);
  }

  const result = await response.json();
  return result.data;
};

export const deleteBlog = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/admin/blogs/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new ApiError(error.error.message, error.error.code);
  }
};

export const getAdminStats = async (): Promise<
  {
    status: "pending" | "approved" | "rejected";
    count: number;
  }[]
> => {
  const response = await fetch(`${API_BASE_URL}/admin/stats`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new ApiError(error.error.message, error.error.code);
  }

  const result = await response.json();
  return result.data;
};

export const updateBlogContent = async (
  id: string,
  content: string
): Promise<Blog> => {
  const response = await fetch(`${API_BASE_URL}/admin/blogs/${id}/content`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new ApiError(error.error.message, error.error.code);
  }

  const result = await response.json();
  return result.data;
};
