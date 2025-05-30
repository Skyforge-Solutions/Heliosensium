import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shield, Lightbulb, Mic, Flower } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBlogs, Blog } from "@/lib/api";
import { format } from "date-fns";

// Helper function to calculate reading time
const calculateReadingTime = (content: string): string => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

// Helper function to truncate text
const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};

// Helper function to strip HTML tags for clean summaries
const stripHtmlTags = (html: string): string => {
  return html.replace(/<[^>]*>/g, "");
};

const Index = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch featured blogs on component mount
  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      try {
        setLoading(true);
        // Get only approved blogs, limit to 2, sorted by views to get popular ones
        const response = await getBlogs(2, undefined, "views");

        if (response.data.length > 0) {
          console.log("Fetched featured blogs:", response.data);
          setFeaturedBlogs(response.data);
          setError(null);
        } else {
          console.log("No featured blogs found");
          setFeaturedBlogs([]);
        }
      } catch (err) {
        console.error("Error fetching featured blogs:", err);
        setError("Failed to load featured blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedBlogs();
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-helia-blue/30 to-white pt-16 pb-24">
        <div className="helia-container">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Parenting wisdom,{" "}
                <span className="text-primary">personalized</span>
              </h1>
              <p className="text-xl mb-8 text-gray-700 max-w-lg">
                Heliosensium presents Helia Chat, your AI parenting assistant
                with specialized guidance for parents navigating the challenges
                of raising children in today's world.
              </p>
              <Link to="/chat">
                <Button className="helia-btn-primary text-lg">
                  Get Started Free
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="/placeholder.svg"
                alt="Heliosensium Logo"
                className="w-full max-w-md animate-pulse-slow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="helia-section bg-white">
        <div className="helia-container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Parenting is harder than ever
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              In today's digital world, parents face unprecedented challenges:
              screen time battles, online safety concerns, emotional development
              questions, and the constant pressure to get it "right."
            </p>
            <div className="helia-card">
              <p className="italic text-lg">
                "I often feel overwhelmed trying to balance everything my kids
                need in this digital age. There's so much conflicting advice out
                there."
              </p>
              <p className="mt-4 font-medium">— A modern parent</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="helia-section bg-helia-soft-gray">
        <div className="helia-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Helia</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Your team of specialized parenting experts, ready to provide
              personalized guidance for your unique family situation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Digital Safety */}
            <div className="helia-card text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-helia-blue mb-4">
                <Shield className="text-primary h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Digital Guide</h3>
              <p className="text-gray-700">
                Helps parents navigate technology and the internet for their
                children. From screen time management to online safety, get
                expert guidance on all tech-related parenting challenges.
              </p>
            </div>

            {/* Emotional Growth */}
            <div className="helia-card text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-helia-blue mb-4">
                <Lightbulb className="text-primary h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Emotional Coach</h3>
              <p className="text-gray-700">
                Learn how to handle tantrums, attention-seeking behavior, and
                express love appropriately. Get age-specific advice for
                nurturing emotional intelligence in children of all ages.
              </p>
            </div>

            {/* Child Development */}
            <div className="helia-card text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-helia-blue mb-4">
                <Mic className="text-primary h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Growth Mentor</h3>
              <p className="text-gray-700">
                Support your child's development from self-esteem building to
                cognitive growth. Get strategies to nurture intelligence,
                confidence, and well-rounded development at every stage.
              </p>
            </div>

            {/* Parental Mindfulness */}
            <div className="helia-card text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-helia-blue mb-4">
                <Flower className="text-primary h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Parent Mindfulness</h3>
              <p className="text-gray-700">
                Focus on your growth as a parent. Learn mindfulness techniques,
                patience practices, and how to avoid projecting your own fears
                and insecurities onto your children.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="helia-section bg-white">
        <div className="helia-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              How Helia Works
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Helia adapts to your parenting style and your children's unique
              needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-helia-blue rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">
                Personalized Onboarding
              </h3>
              <p className="text-gray-700">
                Tell Helia about your family, parenting style, and the
                challenges you're facing.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-helia-blue rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Expert Guidance</h3>
              <p className="text-gray-700">
                Get customized advice from four specialized experts focused on
                different aspects of parenting.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-helia-blue rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Continuous Support</h3>
              <p className="text-gray-700">
                Ask questions anytime and receive ongoing guidance as your
                children grow and evolve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="helia-section bg-helia-blue/30">
        <div className="helia-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What Parents Say
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Join thousands of parents who've found support with Helia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="helia-card">
              <p className="text-gray-700 mb-4">
                "Helia helped me navigate my daughter's screen time struggles
                with practical, personalized advice that actually worked for our
                family."
              </p>
              <p className="font-medium">— Rebecca T., mother of two</p>
            </div>

            <div className="helia-card">
              <p className="text-gray-700 mb-4">
                "The emotional growth guidance has transformed how I talk to my
                son about his feelings. He's more open now and our relationship
                is stronger."
              </p>
              <p className="font-medium">— Michael K., father of one</p>
            </div>

            <div className="helia-card">
              <p className="text-gray-700 mb-4">
                "As a single parent, Helia has been like having a parenting
                expert on call 24/7. The mindfulness techniques have helped us
                both."
              </p>
              <p className="font-medium">— Jamie L., single parent</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser Section */}
      <section className="helia-section bg-white">
        <div className="helia-container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Free, Upgrade When Ready
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Every new user gets 100 free credits. One conversation with Helia
              uses just one credit. Experience the full power of parenting
              support without risk.
            </p>
            <Link to="/pricing">
              <Button className="helia-btn-secondary text-lg">
                See Pricing Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Teaser Section */}
      <section className="helia-section bg-helia-soft-gray">
        <div className="helia-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Learn From Other Parents
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Discover insights, stories, and tips from parents just like you in
              our community blog.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {loading ? (
              // Show loading state
              <div className="col-span-2 text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em]"></div>
                <p className="mt-4 text-gray-600">Loading blogs...</p>
              </div>
            ) : error ? (
              // Show error state
              <div className="col-span-2 text-center py-12">
                <p className="text-gray-600">{error}</p>
              </div>
            ) : featuredBlogs.length > 0 ? (
              // Show real blogs
              featuredBlogs.map((blog) => {
                // Format the date
                const formattedDate = format(
                  new Date(blog.submissionDate),
                  "MMMM d, yyyy"
                );
                // Calculate read time
                const readTime = calculateReadingTime(blog.content);
                // Get summary or excerpt from content
                const cleanContent = stripHtmlTags(blog.content);
                const displaySummary =
                  blog.summary || truncateText(cleanContent, 150);

                return (
                  <div
                    key={blog.id}
                    className="helia-card hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                    <p className="text-gray-500 mb-3">
                      {formattedDate} • {readTime} • by {blog.authorName}
                    </p>
                    <p className="text-gray-700 mb-4">{displaySummary}</p>
                    <Link
                      to={`/blog/${blog.id}`}
                      className="text-primary font-medium hover:underline"
                    >
                      Read more
                    </Link>
                  </div>
                );
              })
            ) : (
              // Show empty state
              <div className="col-span-2 text-center py-12">
                <p className="text-gray-600">No blog posts available yet.</p>
                <Link to="/blog/submit" className="mt-4 inline-block">
                  <Button variant="outline">Submit the first blog</Button>
                </Link>
              </div>
            )}
          </div>

          <div className="text-center">
            <Link to="/blog">
              <Button variant="outline" className="helia-btn-outline">
                View All Blog Posts
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="helia-section bg-gradient-to-b from-helia-blue/30 to-white">
        <div className="helia-container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Parenting Journey?
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Join thousands of parents who are raising confident, emotionally
              intelligent children with help from Helia.
            </p>
            <Link to="/chat">
              <Button className="helia-btn-primary text-lg px-8 py-6">
                Get Started Free
              </Button>
            </Link>
            <p className="text-gray-500 mt-4">
              No credit card required. 100 free credits included.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Index;
