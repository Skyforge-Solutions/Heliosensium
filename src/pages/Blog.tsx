
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';

// Mock blog data
const BLOG_DATA = [
  {
    id: 1,
    title: "How I Used Helia to Help My Child Overcome Social Anxiety",
    summary: "When my daughter started showing signs of social anxiety, I wasn't sure how to help. Here's how Helia's personalized guidance made a difference...",
    author: "Rebecca T.",
    date: "May 15, 2023",
    readTime: "5 min read",
    views: 1245,
  },
  {
    id: 2,
    title: "Screen Time Strategies That Actually Work According to Experts",
    summary: "Managing screen time can feel like a constant battle. These research-backed approaches recommended by Helia have transformed our family's digital habits...",
    author: "Michael K.",
    date: "April 28, 2023",
    readTime: "4 min read",
    views: 982,
  },
  {
    id: 3,
    title: "Building Resilience in Children: A Parent's Guide",
    summary: "Resilience is one of the most important skills we can teach our children. Here's how the Helia Growth Ray helped me foster this critical trait in my son...",
    author: "Jamie L.",
    date: "April 10, 2023",
    readTime: "6 min read",
    views: 756,
  },
  {
    id: 4,
    title: "Mindfulness for Busy Families: Simple Techniques That Work",
    summary: "As a working parent of three, finding time for mindfulness seemed impossible. Helia's Inner Dawn specialist provided these game-changing strategies...",
    author: "Sarah M.",
    date: "March 22, 2023",
    readTime: "4 min read",
    views: 903,
  },
  {
    id: 5,
    title: "How to Talk to Your Kids About Digital Safety Without Scaring Them",
    summary: "Online safety conversations don't have to be frightening. Here's the balanced approach Helia Sun Shield recommended that actually worked for my family...",
    author: "David R.",
    date: "March 5, 2023",
    readTime: "5 min read",
    views: 845,
  },
  {
    id: 6,
    title: "Building Confidence in Shy Children: Our Journey with Helia",
    summary: "My son was always the quietest kid in class. Here's how Helia Sunbeam's confidence-building strategies helped him find his voice...",
    author: "Lisa P.",
    date: "February 18, 2023",
    readTime: "7 min read",
    views: 1102,
  },
];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredBlogs = BLOG_DATA.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-helia-blue/30 to-white pt-16 pb-16">
        <div className="helia-container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">The Parenting Blog</h1>
            <p className="text-xl text-gray-700 mb-8">
              Stories, insights, and tips from parents who are using Helia to navigate modern parenting challenges.
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog List Section */}
      <section className="helia-section bg-white">
        <div className="helia-container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Latest Posts</h2>
            <Link to="/blog/submit">
              <Button variant="outline" className="helia-btn-outline">Write Your Story</Button>
            </Link>
          </div>
          
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No matching blog posts found</h3>
              <p className="text-gray-600">Try adjusting your search term or browse all our posts</p>
              <Button 
                variant="link" 
                className="text-primary mt-4"
                onClick={() => setSearchTerm("")}
              >
                Clear search
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map(blog => (
                <div key={blog.id} className="helia-card">
                  <Link to={`/blog/${blog.id}`}>
                    <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                      {blog.title}
                    </h3>
                  </Link>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>{blog.date}</span>
                    <span className="mx-2">•</span>
                    <span>{blog.readTime}</span>
                    <span className="mx-2">•</span>
                    <span>{blog.views} views</span>
                  </div>
                  <p className="text-gray-700 mb-4">
                    {blog.summary}
                  </p>
                  <Link to={`/blog/${blog.id}`} className="text-primary font-medium hover:underline">
                    Read more
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="helia-section bg-helia-soft-gray">
        <div className="helia-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Share Your Parenting Story</h2>
              <p className="text-lg text-gray-700 mb-6">
                Have you used Helia to overcome a parenting challenge? Or do you have insights that could help other parents?
                We'd love to feature your story on our blog.
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
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p>Help other parents facing similar challenges</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-helia-blue rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p>Become part of our supportive community</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-helia-blue rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p>Gain insights by reflecting on your experience</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-helia-blue rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
