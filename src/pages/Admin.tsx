import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { CheckCheck, X, Edit, Search } from "lucide-react";
import Footer from "@/components/Footer";

// Mock blog submissions data
const INITIAL_BLOG_SUBMISSIONS = [
  {
    id: 1,
    title: "How Mindfulness Techniques Helped My Hyperactive Child",
    content:
      "After struggling for years with my son's hyperactivity, I found Helia's Inner Dawn specialist. The mindfulness techniques they suggested were game-changing...",
    authorName: "Jessica R.",
    authorEmail: "jessica.r@example.com",
    submittedDate: "2023-04-25",
  },
  {
    id: 2,
    title: "Digital Boundaries That Actually Work for Teens",
    content:
      "As the parent of two teenagers, I was constantly battling over screen time. Helia Sun Shield provided strategies that finally made sense to my kids and ended our daily arguments...",
    authorName: "Marcus T.",
    authorEmail: "marcus.t@example.com",
    submittedDate: "2023-04-23",
  },
  {
    id: 3,
    title: "Building Confidence in My Shy Preschooler",
    content:
      "My 4-year-old would hide behind me whenever we met new people. After implementing the step-by-step confidence building plan from Helia Sunbeam, she's now much more comfortable in social situations...",
    authorName: "Priya K.",
    authorEmail: "priya.k@example.com",
    submittedDate: "2023-04-21",
  },
];

type BlogSubmission = {
  id: number;
  title: string;
  content: string;
  authorName: string;
  authorEmail: string;
  submittedDate: string;
};

const Admin = () => {
  const [submissions, setSubmissions] = useState<BlogSubmission[]>(
    INITIAL_BLOG_SUBMISSIONS
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSubmission, setCurrentSubmission] =
    useState<BlogSubmission | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredSubmissions = submissions.filter(
    (submission) =>
      submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApprove = (id: number) => {
    setSubmissions(submissions.filter((submission) => submission.id !== id));
    toast({
      title: "Blog Approved",
      description: "The blog has been approved and published.",
    });
  };

  const handleReject = (id: number) => {
    setSubmissions(submissions.filter((submission) => submission.id !== id));
    toast({
      title: "Blog Rejected",
      description: "The blog has been rejected and removed from the queue.",
    });
  };

  const handleView = (submission: BlogSubmission) => {
    setCurrentSubmission(submission);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-helia-soft-gray">
      {/* Admin Header */}
      <header className="bg-primary text-white py-4">
        <div className="helia-container">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold">HS</span>
              </div>
              <div>
                <h1 className="font-bold text-lg">Heliosensium Admin</h1>
                <p className="text-xs text-white/80">
                  Content Management Dashboard
                </p>
              </div>
            </div>
            <a href="/" className="text-sm hover:underline">
              Exit to Site
            </a>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <main className="py-8">
        <div className="helia-container">
          <div className="bg-white rounded-2xl shadow-md border border-helia-blue/30 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <h2 className="text-2xl font-bold">Blog Submissions</h2>
                <div className="relative w-full md:w-64">
                  <Input
                    placeholder="Search submissions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {filteredSubmissions.length === 0 ? (
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-helia-blue mb-4">
                  <CheckCheck className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium mb-2">
                  No pending blog submissions
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  There are currently no blog submissions waiting for approval.
                  Check back later or clear your search term.
                </p>
                {searchTerm && (
                  <Button
                    variant="link"
                    className="text-primary mt-4"
                    onClick={() => setSearchTerm("")}
                  >
                    Clear search
                  </Button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="w-[200px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell className="font-medium">
                          <button
                            onClick={() => handleView(submission)}
                            className="text-left hover:text-primary transition-colors"
                          >
                            {submission.title}
                          </button>
                        </TableCell>
                        <TableCell>{submission.authorName}</TableCell>
                        <TableCell>{submission.submittedDate}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex items-center gap-1"
                              onClick={() => handleView(submission)}
                            >
                              <Edit className="h-4 w-4" />
                              View
                            </Button>
                            <Button
                              size="sm"
                              variant="default"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleApprove(submission.id)}
                            >
                              <CheckCheck className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleReject(submission.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* View/Edit Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Review Blog Submission</DialogTitle>
            <DialogDescription>
              Review the content before approving or rejecting.
            </DialogDescription>
          </DialogHeader>

          {currentSubmission && (
            <div className="space-y-6 mt-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Title</h3>
                <p className="text-lg font-semibold">
                  {currentSubmission.title}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Content</h3>
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200 max-h-96 overflow-y-auto">
                  {currentSubmission.content}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Author Name</h3>
                  <p>{currentSubmission.authorName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Author Email</h3>
                  <p>{currentSubmission.authorEmail}</p>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsViewDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleReject(currentSubmission.id);
                    setIsViewDialogOpen(false);
                  }}
                >
                  Reject
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    handleApprove(currentSubmission.id);
                    setIsViewDialogOpen(false);
                  }}
                >
                  Approve
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Admin;
