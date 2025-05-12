import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { getBlogById, Blog, ApiError } from "@/lib/api";
import { format } from "date-fns";
import RichTextEditor from "@/components/RichTextEditor";

// Helper function to calculate reading time
const calculateReadingTime = (content: string): string => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const blogData = await getBlogById(id);
        setBlog(blogData);
        setError(null);
      } catch (err) {
        console.error("Error fetching blog post:", err);

        // Check if this might be a pending post error
        if (err instanceof ApiError && err.code === "not_found") {
          setError(
            "This blog post may be pending review by our moderators. It will be available once approved."
          );
        } else {
          setError(
            "Failed to load blog post. It may not exist or has been removed."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <section className="helia-section">
          <div className="helia-container">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p>Loading blog post...</p>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  if (error || !blog) {
    return (
      <>
        <Navbar />
        <section className="bg-gradient-to-b from-helia-blue/30 to-white pt-16 pb-16">
          <div className="helia-container">
            <div className="text-center max-w-2xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto text-amber-500 mb-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <h1 className="text-3xl font-bold mb-4">
                  Blog Post Not Available
                </h1>
                <p className="text-lg text-gray-700 mb-8">
                  {error || "The blog post you're looking for doesn't exist."}
                </p>
                <Link to="/blog">
                  <Button className="helia-btn-primary">Return to Blog</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  // Format date
  const formattedDate = format(new Date(blog.submissionDate), "MMMM d, yyyy");

  // Calculate reading time
  const readTime = calculateReadingTime(blog.content);

  return (
    <>
      <Navbar />

      {/* Blog Post Header */}
      <section className="bg-gradient-to-b from-helia-blue/30 to-white pt-16 pb-16">
        <div className="helia-container">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/blog"
              className="text-primary hover:underline flex items-center mb-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
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
              Back to Blog
            </Link>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {blog.title}
            </h1>

            <div className="flex items-center text-gray-600 mb-4">
              <span>{blog.authorName}</span>
              <span className="mx-2">•</span>
              <span>{formattedDate}</span>
              <span className="mx-2">•</span>
              <span>{readTime}</span>
              <span className="mx-2">•</span>
              <span>{blog.views} views</span>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="helia-section bg-white">
        <div className="helia-container">
          <div className="max-w-3xl mx-auto">
            <article className="prose lg:prose-lg max-w-none bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <RichTextEditor
                content={blog.content}
                onChange={() => {}}
                editable={false}
              />
            </article>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-bold mb-4">Share this post</h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  className="rounded-full bg-[#1DA1F2] text-white hover:bg-[#1a91da] border-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                  </svg>
                  <span className="ml-2">Twitter</span>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full bg-[#4267B2] text-white hover:bg-[#365899] border-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                  </svg>
                  <span className="ml-2">Facebook</span>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full bg-[#0A66C2] text-white hover:bg-[#094c8f] border-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                  </svg>
                  <span className="ml-2">LinkedIn</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts Section */}
      <section className="helia-section bg-helia-soft-gray">
        <div className="helia-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Share Your Parenting Journey</h2>
            <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
              Have your own insights or experiences to share? Join our community
              of parents helping parents.
            </p>
            <Link to="/blog/submit" className="mt-6 inline-block">
              <Button className="helia-btn-primary">Submit Your Story</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default BlogPost;
