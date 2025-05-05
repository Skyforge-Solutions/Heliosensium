import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BlogSubmission = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    name: "",
    email: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Here you would normally send the data to your API
    // For now, we'll simulate a submission
    setTimeout(() => {
      toast({
        title: "Blog Submitted Successfully",
        description:
          "Your blog has been submitted for review. We'll notify you once it's approved.",
      });
      setFormData({
        title: "",
        content: "",
        name: "",
        email: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-helia-blue/30 to-white pt-16 pb-16">
        <div className="helia-container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">
              Share Your Parenting Story
            </h1>
            <p className="text-xl text-gray-700">
              Help other parents by sharing your experiences, insights, or how
              Heliosensium has helped your family.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="helia-section bg-white">
        <div className="helia-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Blog Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter a catchy title for your blog post"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Your Story</Label>
                  <Textarea
                    id="content"
                    name="content"
                    placeholder="Share your parenting experience, insights, or how Heliosensium has helped your family..."
                    value={formData.content}
                    onChange={handleChange}
                    required
                    className="min-h-[300px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="How you'd like to be credited"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="We'll contact you when your blog is published"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="helia-btn-primary w-full md:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Your Story"}
                </Button>
              </form>
            </div>

            <div>
              <div className="helia-card sticky top-24">
                <h2 className="text-xl font-bold mb-4">
                  Blog Submission Guidelines
                </h2>
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
                    <p>
                      Posts should be about parenting experiences or insights
                    </p>
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
                    <p>
                      Include specific examples or strategies that worked for
                      you
                    </p>
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
                    <p>
                      Content should be original and not published elsewhere
                    </p>
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
                    <p>We may edit for clarity, grammar, or length</p>
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
                    <p>All submissions are reviewed before being published</p>
                  </li>
                </ul>

                <div className="mt-6 p-4 bg-helia-blue/50 rounded-lg">
                  <p className="text-sm">
                    <strong>Note:</strong> By submitting your story, you grant
                    HeliaSensium permission to publish it on our blog and
                    potentially feature it in our newsletter.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default BlogSubmission;
