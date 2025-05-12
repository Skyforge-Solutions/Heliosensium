import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useAdminAuth from "@/hooks/useAdminAuth";
import {
  getAdminBlogById,
  updateBlogStatus,
  deleteBlog,
  Blog,
} from "@/lib/api";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { marked } from "marked";

// Configure marked for security and features
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown
  breaks: true, // Convert \n to <br>
  pedantic: false, // Don't be too strict with markdown spec
});

// Helper function to calculate reading time
const calculateReadingTime = (content: string): string => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

// Helper function to safely render content
const renderContent = (content: string): string => {
  // Check if content contains HTML
  const hasHtml = /<[a-z][\s\S]*>/i.test(content);

  // If content looks like HTML, render it directly
  if (hasHtml) {
    return content;
  }

  // Otherwise, treat as markdown and convert to HTML
  try {
    // Ensure we get a string back, not a Promise
    const result = marked.parse(content);
    if (typeof result === "string") {
      return result;
    }
    // Handle potential Promise case (although marked.parse normally returns string)
    return content;
  } catch (error) {
    console.error("Error parsing markdown:", error);
    return `<p>${content}</p>`;
  }
};

const AdminBlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { isAuthenticated, authLoaded } = useAdminAuth();

  // State
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Action dialog state
  const [actionDialog, setActionDialog] = useState<{
    isOpen: boolean;
    action: "approve" | "reject" | "delete" | null;
    adminNotes: string;
  }>({
    isOpen: false,
    action: null,
    adminNotes: "",
  });

  // Add CSS styles for the blog content
  const blogContentStyles = `
    .rich-text-content {
      font-family: system-ui, -apple-system, sans-serif;
      line-height: 1.7;
      color: #333;
      word-wrap: break-word;
      overflow-wrap: break-word;
      max-width: 100%;
    }
    
    .rich-text-content h1 {
      font-size: 1.8rem;
      font-weight: 700;
      margin: 1.8rem 0 1rem 0;
      color: #1a56db;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 0.5rem;
    }
    
    .rich-text-content h2 {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 1.6rem 0 1rem 0;
      color: #1e429f;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 0.3rem;
    }
    
    .rich-text-content h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 1.4rem 0 0.75rem 0;
      color: #1a202c;
    }

    .rich-text-content h4, .rich-text-content h5, .rich-text-content h6 {
      font-size: 1.1rem;
      font-weight: 600;
      margin: 1.2rem 0 0.5rem 0;
      color: #2d3748;
    }
    
    .rich-text-content p {
      margin-bottom: 1.2rem;
      line-height: 1.7;
    }
    
    .rich-text-content ul, .rich-text-content ol {
      margin: 1.2rem 0;
      padding-left: 1.8rem;
    }
    
    .rich-text-content ul {
      list-style-type: disc;
    }
    
    .rich-text-content ol {
      list-style-type: decimal;
    }
    
    .rich-text-content li {
      margin-bottom: 0.5rem;
      padding-left: 0.5rem;
      line-height: 1.6;
    }

    .rich-text-content li > ul,
    .rich-text-content li > ol {
      margin: 0.5rem 0;
    }
    
    .rich-text-content blockquote {
      border-left: 4px solid #3b82f6;
      padding-left: 1rem;
      margin: 1.5rem 0;
      color: #4a5568;
      font-style: italic;
      background-color: #f7fafc;
      padding: 1rem;
      border-radius: 0.25rem;
    }
    
    .rich-text-content code {
      background-color: #f7fafc;
      padding: 0.2rem 0.4rem;
      border-radius: 0.25rem;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 0.9em;
      color: #e53e3e;
    }
    
    .rich-text-content pre {
      background-color: #2d3748;
      color: #e2e8f0;
      padding: 1rem;
      border-radius: 0.25rem;
      overflow-x: auto;
      margin: 1.5rem 0;
      font-size: 0.9em;
    }
    
    .rich-text-content pre code {
      background-color: transparent;
      color: inherit;
      padding: 0;
      display: block;
      white-space: pre;
      border: none;
    }
    
    .rich-text-content a {
      color: #3182ce;
      text-decoration: underline;
      transition: color 0.15s ease;
    }
    
    .rich-text-content a:hover {
      color: #2c5282;
    }

    .rich-text-content img {
      max-width: 100%;
      height: auto;
      border-radius: 0.25rem;
      margin: 1.5rem auto;
      display: block;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    }

    .rich-text-content table {
      border-collapse: collapse;
      width: 100%;
      margin: 1.5rem 0;
      overflow-x: auto;
      display: block;
    }

    .rich-text-content table th,
    .rich-text-content table td {
      padding: 0.75rem;
      border: 1px solid #e2e8f0;
      text-align: left;
    }

    .rich-text-content table th {
      background-color: #f7fafc;
      font-weight: 600;
    }

    .rich-text-content table tr:nth-child(even) {
      background-color: #f7fafc;
    }

    .rich-text-content hr {
      margin: 2rem 0;
      border: 0;
      border-top: 1px solid #e2e8f0;
    }

    /* Code highlighting */
    .rich-text-content pre {
      position: relative;
    }
    
    .rich-text-content pre:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to bottom, rgba(45, 55, 72, 0.05), rgba(45, 55, 72, 0));
      pointer-events: none;
    }

    /* Improve readability on mobile */
    @media (max-width: 640px) {
      .rich-text-content {
        font-size: 0.95rem;
      }
      
      .rich-text-content h1 {
        font-size: 1.5rem;
      }
      
      .rich-text-content h2 {
        font-size: 1.3rem;
      }
      
      .rich-text-content h3 {
        font-size: 1.1rem;
      }

      .rich-text-content pre {
        padding: 0.75rem;
      }

      .rich-text-content blockquote {
        padding: 0.75rem;
      }
    }
  `;

  // Fetch blog post
  useEffect(() => {
    if (!authLoaded) return;
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    const fetchBlog = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const blogData = await getAdminBlogById(id);
        console.log("Fetched blog data:", blogData);
        setBlog(blogData);
        setActionDialog((prev) => ({
          ...prev,
          adminNotes: blogData.adminNotes || "",
        }));
        setError(null);
      } catch (err) {
        console.error("Error fetching blog post:", err);
        setError(
          "Failed to load blog post. It may not exist or has been removed."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, authLoaded, isAuthenticated]);

  // Open action dialog
  const openActionDialog = (action: "approve" | "reject" | "delete") => {
    setActionDialog({
      isOpen: true,
      action,
      adminNotes: blog?.adminNotes || "",
    });
  };

  // Close action dialog
  const closeActionDialog = () => {
    setActionDialog({
      isOpen: false,
      action: null,
      adminNotes: blog?.adminNotes || "",
    });
  };

  // Handle admin notes change
  const handleAdminNotesChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setActionDialog((prev) => ({
      ...prev,
      adminNotes: e.target.value,
    }));
  };

  // Execute action
  const executeAction = async () => {
    if (!blog || !actionDialog.action) return;

    try {
      if (actionDialog.action === "delete") {
        await deleteBlog(blog.id);
        toast({
          title: "Blog Deleted",
          description: `Blog "${blog.title}" has been deleted.`,
        });
        navigate("/suraj/dashboard");
      } else {
        // Convert action type to status format required by the API
        const status =
          actionDialog.action === "approve" ? "approved" : "rejected";
        const updatedBlog = await updateBlogStatus(
          blog.id,
          status,
          actionDialog.adminNotes
        );
        setBlog(updatedBlog);
        toast({
          title:
            actionDialog.action === "approve"
              ? "Blog Approved"
              : "Blog Rejected",
          description: `Blog "${blog.title}" has been ${
            actionDialog.action === "approve" ? "approved" : "rejected"
          }.`,
        });
      }
    } catch (err) {
      console.error(`Error ${actionDialog.action}ing blog:`, err);
      toast({
        title: "Action Failed",
        description: `Failed to ${actionDialog.action} the blog. Please try again.`,
        variant: "destructive",
      });
    } finally {
      closeActionDialog();
    }
  };

  // Show loading indicator while checking auth
  if (!authLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-helia-blue/10 to-white">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate("/suraj/login", {
      state: { from: location },
      replace: true,
    });
    return null;
  }

  // Show loading indicator while fetching blog
  if (loading) {
    return (
      <div className="bg-gradient-to-b from-helia-blue/10 to-white min-h-screen">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p>Loading blog post...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error message if failed to load
  if (error || !blog) {
    return (
      <div className="bg-gradient-to-b from-helia-blue/10 to-white min-h-screen">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-6">Blog Post Not Found</h1>
            <p className="text-xl text-gray-700 mb-8">
              {error || "The blog post you're looking for doesn't exist."}
            </p>
            <Button
              className="mr-2"
              onClick={() => navigate("/suraj/dashboard")}
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Format date
  const formattedDate = format(new Date(blog.submissionDate), "MMMM d, yyyy");

  // Calculate reading time
  const readTime = calculateReadingTime(blog.content);

  // Get status badge color
  const getStatusBadgeClass = () => {
    switch (blog.status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="bg-gradient-to-b from-helia-blue/10 to-white min-h-screen">
      {/* Add the styles to the component */}
      <style dangerouslySetInnerHTML={{ __html: blogContentStyles }} />

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Admin navigation */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate("/suraj/dashboard")}
              className="flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Dashboard
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass()}`}
            >
              {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
            </span>
          </div>
        </div>

        {/* Blog title and meta */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Author</p>
              <p className="text-gray-900">{blog.authorName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Email</p>
              <p className="text-gray-900 break-all">{blog.authorEmail}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Submitted On
              </p>
              <p className="text-gray-900">{formattedDate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Stats</p>
              <div className="flex items-center gap-3">
                <span className="text-gray-900">{readTime}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-900">{blog.views} views</span>
              </div>
            </div>
          </div>

          {/* Admin actions */}
          <div className="border-t pt-6 mt-6">
            <p className="text-sm font-medium text-gray-500 mb-3">
              Admin Actions
            </p>
            <div className="flex flex-wrap gap-2">
              {blog.status === "pending" ? (
                <>
                  <Button
                    variant="default"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => openActionDialog("approve")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Approve Post
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => openActionDialog("reject")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Reject Post
                  </Button>
                </>
              ) : blog.status === "approved" ? (
                <Button
                  variant="secondary"
                  onClick={() => openActionDialog("reject")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Change to Rejected
                </Button>
              ) : (
                <Button
                  variant="default"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => openActionDialog("approve")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Change to Approved
                </Button>
              )}
              <Button
                variant="destructive"
                onClick={() => openActionDialog("delete")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete Post
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open(`/blog/${blog.id}`, "_blank")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                View Public Page
              </Button>
            </div>
          </div>

          {/* Admin notes */}
          <div className="border-t pt-6 mt-6">
            <h3 className="font-medium mb-2">Admin Notes:</h3>
            <div className="p-4 border rounded-md bg-gray-50">
              {blog.adminNotes ? (
                blog.adminNotes
              ) : (
                <span className="text-gray-500">No admin notes</span>
              )}
            </div>
          </div>
        </div>

        {/* Blog content */}
        <div className="border rounded-lg p-6 bg-white mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold text-primary">
                Blog Content
              </h2>
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {blog.content.length} characters
              </span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-md p-4 md:p-6 border overflow-auto">
            <div
              className="rich-text-content"
              dangerouslySetInnerHTML={{
                __html: renderContent(blog.content),
              }}
            />
          </div>

          {blog.lastModified && (
            <div className="mt-3 text-xs text-gray-500">
              Last modified: {format(new Date(blog.lastModified), "PPpp")}
            </div>
          )}
        </div>

        {/* Submission details */}
        <div className="border rounded-lg p-6 bg-white">
          <h3 className="text-xl font-semibold mb-4">Submission Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="text-sm font-medium text-gray-500 mb-1">
                IP Address
              </p>
              <p className="break-all text-gray-900 font-mono text-sm">
                {blog.ipAddress}
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="text-sm font-medium text-gray-500 mb-1">
                Submission Date
              </p>
              <p className="text-gray-900">
                {format(new Date(blog.submissionDate), "PPpp")}
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="text-sm font-medium text-gray-500 mb-1">
                Last Modified
              </p>
              <p className="text-gray-900">
                {format(new Date(blog.lastModified), "PPpp")}
              </p>
            </div>
            {blog.approvalDate && (
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Approval Date
                </p>
                <p className="text-gray-900">
                  {format(new Date(blog.approvalDate), "PPpp")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Dialog */}
      <Dialog
        open={actionDialog.isOpen}
        onOpenChange={(open) => !open && closeActionDialog()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionDialog.action === "approve"
                ? "Approve Blog"
                : actionDialog.action === "reject"
                ? "Reject Blog"
                : "Delete Blog"}
            </DialogTitle>
            <DialogDescription>
              {actionDialog.action === "delete"
                ? "Are you sure you want to delete this blog post? This action cannot be undone."
                : actionDialog.action === "approve"
                ? "This will make the blog visible to all users."
                : "This will reject the blog and notify the author."}
            </DialogDescription>
          </DialogHeader>

          {actionDialog.action !== "delete" && (
            <div className="py-4">
              <label
                htmlFor="adminNotes"
                className="block text-sm font-medium mb-2"
              >
                Admin Notes (optional)
              </label>
              <Textarea
                id="adminNotes"
                placeholder="Add notes about this blog post"
                value={actionDialog.adminNotes}
                onChange={handleAdminNotesChange}
                className="min-h-[100px]"
              />
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={closeActionDialog}>
              Cancel
            </Button>
            <Button
              variant={
                actionDialog.action === "delete"
                  ? "destructive"
                  : actionDialog.action === "approve"
                  ? "default"
                  : "secondary"
              }
              className={
                actionDialog.action === "approve"
                  ? "bg-green-600 hover:bg-green-700"
                  : ""
              }
              onClick={executeAction}
            >
              {actionDialog.action === "delete"
                ? "Delete"
                : actionDialog.action === "approve"
                ? "Approve"
                : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBlogPost;
