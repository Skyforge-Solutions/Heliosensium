import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useAdminAuth from "@/hooks/useAdminAuth";
import {
  getAdminBlogs,
  getAdminStats,
  updateBlogStatus,
  deleteBlog,
  Blog,
  ApiError,
} from "@/lib/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";

// Page size for the blogs table
const PAGE_SIZE = 10;

type BlogManagementAction = {
  type: "approve" | "reject" | "delete";
  blog: Blog;
};

const AdminDashboard = () => {
  const { logout, isAuthenticated, authLoaded, forcedLogout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // State
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [activeTab, setActiveTab] = useState<
    "pending" | "approved" | "rejected"
  >("pending");
  const [stats, setStats] = useState<{
    pending: number;
    approved: number;
    rejected: number;
  }>({
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  // Dialog state
  const [actionDialog, setActionDialog] = useState<{
    isOpen: boolean;
    action: BlogManagementAction | null;
    adminNotes: string;
  }>({
    isOpen: false,
    action: null,
    adminNotes: "",
  });

  // Fetch blogs and stats
  useEffect(() => {
    if (!authLoaded) return;
    if (!isAuthenticated) {
      setLoading(false);
      navigate("/suraj/login", { replace: true });
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch blogs with better error handling
        try {
          const blogsResult = await getAdminBlogs(
            currentPage,
            PAGE_SIZE,
            activeTab
          );

          setBlogs(blogsResult.data);
          setTotalPages(blogsResult.pagination.totalPages);
          setTotalCount(blogsResult.pagination.totalCount);
        } catch (blogsErrorUnknown) {
          const blogsError = blogsErrorUnknown as Error;

          // Check for auth errors (401 Unauthorized)
          if (blogsError instanceof Error && "code" in blogsError) {
            const authError = blogsError as ApiError;
            if (
              authError.code === "unauthorized" ||
              blogsError.message?.includes("authentication")
            ) {
              forcedLogout("Your session has expired. Please log in again.");
              return; // Exit early
            } else {
              setError("Failed to load blogs. Please try refreshing the page.");
            }
          } else {
            // Generic error
            setError("Failed to load blogs. Please try refreshing the page.");
          }
        }

        // Fetch stats with separate error handling
        try {
          const statsResult = await getAdminStats();

          const statsMap = statsResult.reduce((acc, item) => {
            acc[item.status] = item.count;
            return acc;
          }, {} as Record<string, number>);

          setStats({
            pending: statsMap.pending || 0,
            approved: statsMap.approved || 0,
            rejected: statsMap.rejected || 0,
          });
        } catch (statsErrorUnknown) {
          const statsError = statsErrorUnknown as Error;

          // Don't show error if we already have a more serious one
          if (!error) {
            // Try to cast to ApiError if it has code property
            if (statsError instanceof Error && "code" in statsError) {
              const authError = statsError as ApiError;
              if (
                authError.code === "unauthorized" ||
                statsError.message?.includes("authentication")
              ) {
                forcedLogout("Your session has expired. Please log in again.");
              } else {
                setError("Failed to load blog statistics.");
              }
            } else {
              // Generic error
              setError("Failed to load blog statistics.");
            }
          }
        }
      } catch (err) {
        setError(
          "Failed to load data. Please try again or log out and back in."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authLoaded, isAuthenticated, currentPage, activeTab]);

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value as "pending" | "approved" | "rejected");
    setCurrentPage(1);
  };

  // Handle pagination
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Open the action dialog
  const openActionDialog = (action: BlogManagementAction) => {
    setActionDialog({
      isOpen: true,
      action,
      adminNotes: action.blog.adminNotes || "",
    });
  };

  // Close the action dialog
  const closeActionDialog = () => {
    setActionDialog({
      isOpen: false,
      action: null,
      adminNotes: "",
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

  // Execute the action (approve, reject, delete)
  const executeAction = async () => {
    if (!actionDialog.action) return;

    setLoading(true);
    const { type, blog } = actionDialog.action;
    const adminNotes = actionDialog.adminNotes;

    try {
      if (type === "delete") {
        await deleteBlog(blog.id);
        toast({
          title: "Blog Deleted",
          description: `"${blog.title}" has been deleted.`,
        });
      } else {
        const status = type === "approve" ? "approved" : "rejected";
        await updateBlogStatus(blog.id, status, adminNotes);
        toast({
          title: `Blog ${status === "approved" ? "Approved" : "Rejected"}`,
          description: `"${blog.title}" has been ${status}.`,
        });
      }

      // Refresh the data
      const updatedStats = await getAdminStats();
      const statsMap = updatedStats.reduce((acc, item) => {
        acc[item.status] = item.count;
        return acc;
      }, {} as Record<string, number>);

      setStats({
        pending: statsMap.pending || 0,
        approved: statsMap.approved || 0,
        rejected: statsMap.rejected || 0,
      });

      // Remove deleted/approved/rejected blog from the list
      setBlogs((currentBlogs) => currentBlogs.filter((b) => b.id !== blog.id));
    } catch (err) {
      toast({
        title: "Action Failed",
        description: "There was an error processing your request.",
        variant: "destructive",
      });
    } finally {
      closeActionDialog();
      setLoading(false);
    }
  };

  // Truncate text helper
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Format date helper
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy HH:mm");
  };

  // Show loading indicator while checking auth
  if (!authLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-helia-blue/10 to-white">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em]"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // The useAdminAuth hook will handle redirects if not authenticated

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-helia-blue to-blue-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-black">
                Blog Admin Dashboard
              </h1>
              <p className="text-black">Manage and moderate blog submissions</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-4">
              <div className="bg-blue-800/30 px-4 py-2 rounded-lg">
                <span className="text-sm font-medium">Admin Control Panel</span>
              </div>
              <Button
                variant="outline"
                className="text-black border-white hover:bg-blue-900 hover:text-white"
                onClick={logout}
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
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 transition-all hover:shadow-md">
            <div className="flex items-center">
              <div className="rounded-full bg-amber-100 p-3 mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-amber-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-500">Pending</h3>
                <p className="text-3xl font-bold text-amber-600">
                  {stats.pending}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 transition-all hover:shadow-md">
            <div className="flex items-center">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600"
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
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-500">Approved</h3>
                <p className="text-3xl font-bold text-green-600">
                  {stats.approved}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 transition-all hover:shadow-md">
            <div className="flex items-center">
              <div className="rounded-full bg-red-100 p-3 mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-600"
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
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-500">Rejected</h3>
                <p className="text-3xl font-bold text-red-600">
                  {stats.rejected}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Blogs Management Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <Tabs defaultValue="pending" onValueChange={handleTabChange}>
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <TabsList className="grid grid-cols-3 w-full md:w-1/2">
                <TabsTrigger
                  value="pending"
                  className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800"
                >
                  Pending ({stats.pending})
                </TabsTrigger>
                <TabsTrigger
                  value="approved"
                  className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800"
                >
                  Approved ({stats.approved})
                </TabsTrigger>
                <TabsTrigger
                  value="rejected"
                  className="data-[state=active]:bg-red-100 data-[state=active]:text-red-800"
                >
                  Rejected ({stats.rejected})
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab Contents */}
            <TabsContent value="pending" className="p-4">
              {renderBlogsTable("pending")}
            </TabsContent>
            <TabsContent value="approved" className="p-4">
              {renderBlogsTable("approved")}
            </TabsContent>
            <TabsContent value="rejected" className="p-4">
              {renderBlogsTable("rejected")}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Action Dialog */}
      <Dialog
        open={actionDialog.isOpen}
        onOpenChange={(open) => !open && closeActionDialog()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionDialog.action?.type === "approve"
                ? "Approve Blog"
                : actionDialog.action?.type === "reject"
                ? "Reject Blog"
                : "Delete Blog"}
            </DialogTitle>
            <DialogDescription>
              {actionDialog.action?.type === "delete"
                ? "Are you sure you want to delete this blog post? This action cannot be undone."
                : actionDialog.action?.type === "approve"
                ? "This will make the blog visible to all users."
                : "This will reject the blog and notify the author."}
            </DialogDescription>
          </DialogHeader>

          {actionDialog.action?.blog && (
            <div className="py-4">
              <h4 className="font-medium mb-2">
                {actionDialog.action.blog.title}
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                By {actionDialog.action.blog.authorName} (
                {actionDialog.action.blog.authorEmail})
              </p>

              {(actionDialog.action.type === "approve" ||
                actionDialog.action.type === "reject") && (
                <div className="space-y-2">
                  <label
                    htmlFor="adminNotes"
                    className="block text-sm font-medium"
                  >
                    Admin Notes{" "}
                    {actionDialog.action.type === "reject" &&
                      "(will be visible to the author)"}
                  </label>
                  <Textarea
                    id="adminNotes"
                    value={actionDialog.adminNotes}
                    onChange={handleAdminNotesChange}
                    rows={3}
                  />
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={closeActionDialog}>
              Cancel
            </Button>
            <Button
              variant={
                actionDialog.action?.type === "delete"
                  ? "destructive"
                  : actionDialog.action?.type === "approve"
                  ? "default"
                  : "secondary"
              }
              onClick={executeAction}
            >
              {actionDialog.action?.type === "approve"
                ? "Approve"
                : actionDialog.action?.type === "reject"
                ? "Reject"
                : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );

  // Helper function to render blogs table
  function renderBlogsTable(status: "pending" | "approved" | "rejected") {
    if (loading) {
      return (
        <div className="py-12 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-helia-blue border-r-transparent align-[-0.125em]"></div>
          <p className="mt-4 text-gray-600">Loading blogs...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="py-12 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      );
    }

    if (blogs.length === 0) {
      return (
        <div className="py-12 text-center">
          <p className="text-gray-600">No {status} blog posts found.</p>
        </div>
      );
    }

    return (
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead className="hidden md:table-cell">Submitted</TableHead>
              <TableHead className="hidden md:table-cell">Views</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell className="font-medium">
                  <div className="max-w-xs">
                    <div className="truncate">{blog.title}</div>
                    <div className="text-xs text-gray-500 md:hidden">
                      {formatDate(blog.submissionDate)}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="truncate">{blog.authorName}</div>
                    <div className="text-xs text-gray-500 truncate">
                      {blog.authorEmail}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {formatDate(blog.submissionDate)}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {blog.views}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8"
                      onClick={() => navigate(`/suraj/blog/${blog.id}`)}
                    >
                      View
                    </Button>

                    {status === "pending" && (
                      <>
                        <Button
                          variant="default"
                          size="sm"
                          className="h-8 bg-green-600 hover:bg-green-700"
                          onClick={() =>
                            openActionDialog({ type: "approve", blog })
                          }
                        >
                          Approve
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="h-8"
                          onClick={() =>
                            openActionDialog({ type: "reject", blog })
                          }
                        >
                          Reject
                        </Button>
                      </>
                    )}

                    <Button
                      variant="destructive"
                      size="sm"
                      className="h-8"
                      onClick={() => openActionDialog({ type: "delete", blog })}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between py-4">
          <div>
            <p className="text-sm text-gray-600">
              Showing {blogs.length} of {totalCount} entries
              {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    );
  }
};

export default AdminDashboard;
