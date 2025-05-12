import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { getBlogs, Blog as BlogType, PaginatedBlogs } from "@/lib/api";
import { format } from "date-fns";

// Fallback image for blogs without one
const DEFAULT_BLOG_IMAGE = "/images/blog-placeholder.jpg";

const ReadTimeEstimate = (content: string): string => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

// Truncate text to a certain length
const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"submissionDate" | "views">(
    "submissionDate"
  );
  const [loadingMore, setLoadingMore] = useState(false);

  // Function to fetch blogs
  const fetchBlogs = async (cursor?: string, replace: boolean = true) => {
    try {
      setLoading(true);
      const response = await getBlogs(10, cursor, sortBy);

      if (replace) {
        setBlogs(response.data);
      } else {
        setBlogs((prevBlogs) => [...prevBlogs, ...response.data]);
      }

      setNextCursor(response.pagination.nextCursor);
      setError(null);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Failed to load blogs. Please try again later.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchBlogs();
  }, [sortBy]);

  // Load more blogs
  const handleLoadMore = async () => {
    if (nextCursor && !loadingMore) {
      setLoadingMore(true);
      await fetchBlogs(nextCursor, false);
    }
  };

  // Change sort order
  const handleSortChange = (newSort: "submissionDate" | "views") => {
    if (newSort !== sortBy) {
      setSortBy(newSort);
    }
  };

  // Filter blogs by search term
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (blog.summary &&
        blog.summary.toLowerCase().includes(searchTerm.toLowerCase())) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-helia-blue/30 to-white pt-16 pb-16">
        <div className="helia-container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              The Parenting Blog
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Stories, insights, and tips from parents who are using Helia to
              navigate modern parenting challenges.
            </p>

            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 px-6 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog List Section */}
      <section className="helia-section bg-white">
        <div className="helia-container">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-2xl font-bold">Latest Posts</h2>

            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <Button
                  variant={sortBy === "submissionDate" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSortChange("submissionDate")}
                  className="text-sm"
                >
                  Latest
                </Button>
                <Button
                  variant={sortBy === "views" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSortChange("views")}
                  className="text-sm"
                >
                  Popular
                </Button>
              </div>

              <Link to="/blog/submit">
                <Button variant="outline" className="helia-btn-outline">
                  Write Your Story
                </Button>
              </Link>
            </div>
          </div>

          {loading && blogs.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-gray-600">Loading blogs...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-600">
              <p className="mb-4">{error}</p>
              <Button onClick={() => fetchBlogs()}>Try Again</Button>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">
                No matching blog posts found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search term or browse all our posts
              </p>
              <Button
                variant="link"
                className="text-primary mt-4"
                onClick={() => setSearchTerm("")}
              >
                Clear search
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((blog) => {
                  // Calculate read time based on content length
                  const readTime = ReadTimeEstimate(blog.content);

                  // Format the date
                  const formattedDate = format(
                    new Date(blog.submissionDate),
                    "MMM d, yyyy"
                  );

                  // Get summary or excerpt from content
                  const displaySummary =
                    blog.summary ||
                    truncateText(blog.content.replace(/<[^>]*>/g, ""), 150);

                  return (
                    <div key={blog.id} className="helia-card">
                      <Link to={`/blog/${blog.id}`}>
                        <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                          {blog.title}
                        </h3>
                      </Link>
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <span>{formattedDate}</span>
                        <span className="mx-2">•</span>
                        <span>{readTime}</span>
                        <span className="mx-2">•</span>
                        <span>{blog.views} views</span>
                      </div>
                      <p className="text-gray-700 mb-4">{displaySummary}</p>
                      <div className="flex justify-between items-center">
                        <Link
                          to={`/blog/${blog.id}`}
                          className="text-primary font-medium hover:underline"
                        >
                          Read more
                        </Link>
                        <span className="text-sm text-gray-500">
                          By {blog.authorName}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {nextCursor && (
                <div className="mt-12 text-center">
                  <Button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    variant="outline"
                    className="px-8"
                  >
                    {loadingMore ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></div>
                        Loading...
                      </>
                    ) : (
                      "Load More"
                    )}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="helia-section bg-helia-soft-gray">
        <div className="helia-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Share Your Parenting Story
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Have you used Helia to overcome a parenting challenge? Or do you
                have insights that could help other parents? We'd love to
                feature your story on our blog.
              </p>
              <Link to="/blog/submit">
                <Button className="helia-btn-primary">Submit Your Blog</Button>
              </Link>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md border border-helia-blue/30">
              <h3 className="text-xl font-bold mb-4">Why Share Your Story?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-helia-blue rounded-full p-1 mr-3 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-primary"
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
                  <p>Help other parents facing similar challenges</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-helia-blue rounded-full p-1 mr-3 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-primary"
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
                  <p>Become part of our supportive community</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-helia-blue rounded-full p-1 mr-3 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-primary"
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
                  <p>Gain insights by reflecting on your experience</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-helia-blue rounded-full p-1 mr-3 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-primary"
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
                  <p>Get featured in our newsletter to thousands of parents</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Blog;
