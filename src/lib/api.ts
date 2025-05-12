/**
 * API services for interacting with the blog backend
 */

// Base API URL
const API_BASE_URL = "http://localhost:8000/api";

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

// Public API functions
export const getBlogs = async (
  limit: number = 10,
  cursor?: string,
  sort: "views" | "submissionDate" = "submissionDate"
): Promise<PaginatedBlogs> => {
  let url = `${API_BASE_URL}/blogs?limit=${limit}&sort=${sort}`;

  if (cursor) {
    url += `&cursor=${cursor}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    const error = await response.json();
    throw new ApiError(error.error.message, error.error.code);
  }

  return await response.json();
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
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new ApiError(error.error.message, error.error.code);
  }

  const result = await response.json();
  return { success: true };
};

// Function to check if user is authenticated
export const checkAuth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/validate`, {
      method: "GET",
      credentials: "include",
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
      credentials: "include",
    });

    return response.ok;
  } catch (err) {
    console.error("Logout failed:", err);
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
      credentials: "include",
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
    credentials: "include",
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
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
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
    credentials: "include",
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
    credentials: "include",
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
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new ApiError(error.error.message, error.error.code);
  }

  const result = await response.json();
  return result.data;
};
