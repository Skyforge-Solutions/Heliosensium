
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Mock blog data
const BLOG_POSTS = {
  "1": {
    id: 1,
    title: "How I Used Helia to Help My Child Overcome Social Anxiety",
    content: `
      <p>When my daughter Emma started third grade, I noticed a change in her behavior. She, who had always been outgoing and eager to join activities, suddenly became hesitant about going to school. She complained of stomachaches in the mornings and became tearful when it was time to leave for school.</p>
      
      <p>At first, I thought it might be a phase or maybe an issue with a specific classmate. But after two weeks with no improvement, I realized something deeper was going on. She finally confided that she was afraid to speak up in class, worried that other kids would laugh at her.</p>
      
      <h3>Turning to Helia for Help</h3>
      
      <p>That's when I first turned to Helia, specifically the Growth Ray specialist. I explained Emma's situation, her previous confidence, and this sudden change. What impressed me immediately was how Helia didn't just offer generic advice but asked thoughtful follow-up questions: Had anything changed at school? Did Emma have a particularly negative experience recently? Was she sleeping well?</p>
      
      <p>Through our conversation, Helia helped me realize that Emma's anxiety had started after she'd made a mistake during a class presentation and a few children had giggled. What seemed minor to adults had been devastating to her seven-year-old self-image.</p>
      
      <h3>A Personalized Approach</h3>
      
      <p>Helia's Growth Ray provided a multi-step approach specifically for Emma:</p>
      
      <ol>
        <li><strong>Validate her feelings</strong> - Instead of saying "don't worry" or "it's not a big deal," I learned to acknowledge her anxiety as real and understandable.</li>
        <li><strong>Create a worry scale</strong> - We made a 1-10 scale where Emma could identify how anxious she was feeling, making her emotions more manageable.</li>
        <li><strong>Practice gradual exposure</strong> - We started with having Emma speak up in safe situations (like ordering her own food at restaurants) before working up to classroom participation.</li>
        <li><strong>Develop coping techniques</strong> - Helia suggested specific breathing exercises and positive self-talk phrases Emma could use when feeling anxious.</li>
      </ol>
      
      <h3>Coordinating with Her Teacher</h3>
      
      <p>I also used Helia Sunbeam's confidence-building advice to work with Emma's teacher. We arranged for Emma to answer questions she knew well in advance, gradually building her comfort with speaking in class without putting her on the spot.</p>
      
      <h3>Seeing Results</h3>
      
      <p>The transformation wasn't overnight, but within three weeks, Emma's morning stomachaches had disappeared. By six weeks, she was voluntarily raising her hand again in class. The most touching moment came when she was chosen as "Student of the Week" and had to present about her favorite hobby. The night before, she was nervous but used the techniques we'd practiced. She came home beaming, proudly telling me, "I did it, Mom! And nobody laughed!"</p>
      
      <h3>What Made the Difference</h3>
      
      <p>What I appreciate most about Helia's guidance was that it wasn't just about getting Emma to speak up in class. The approach acknowledged her emotions, built genuine confidence, and taught her skills she could use throughout life. The advice was specific to her situation and age-appropriate.</p>
      
      <p>I've continued using Helia for other parenting challenges, but helping Emma overcome her social anxiety remains the most significant impact it's had on our family. Now, six months later, you'd never know she had struggled with speaking up. In fact, she recently volunteered for the school play!</p>
      
      <p>If your child is struggling with anxiety of any kind, I can't recommend Helia enough as a resource. The personalized guidance makes all the difference in addressing your child's specific needs.</p>
    `,
    author: "Rebecca T.",
    date: "May 15, 2023",
    readTime: "5 min read",
    views: 1245,
  },
  "2": {
    id: 2,
    title: "Screen Time Strategies That Actually Work According to Experts",
    content: `
      <p>As a father of two tech-savvy kids (ages 8 and 11), managing screen time had become the biggest source of conflict in our household. Every day ended with arguments about "just five more minutes" that would stretch into battles lasting longer than the screen time itself.</p>
      
      <p>I tried everything from strict time limits to taking devices away completely, but nothing worked long-term. Either I'd cave to their persistent requests, or they'd find sneaky ways to get more screen time when I wasn't looking.</p>
      
      <h3>A Different Approach with Helia</h3>
      
      <p>When I first engaged with Helia's Sun Shield specialist about our screen time struggles, I expected the usual advice about setting firm boundaries. Instead, Helia asked something no other parenting resource had: "What are your children getting from their screen time that they value so much?"</p>
      
      <p>This question changed my entire perspective. Through our conversation, I realized my son uses gaming to connect with friends, while my daughter enjoys creative expression through digital art. They weren't just mindlessly staring at screens—they were meeting genuine needs.</p>
      
      <h3>Research-Backed Strategies That Transformed Our Home</h3>
      
      <p>Based on Helia's guidance, we implemented these approaches that genuinely worked for our family:</p>
      
      <h4>1. Quality Over Quantity</h4>
      
      <p>Rather than focusing solely on time limits, Helia suggested evaluating the content itself. Now we distinguish between high-quality screen activities (educational content, creative applications, social connection with friends) and low-quality screen time (mindless scrolling, certain types of videos).</p>
      
      <p>This approach is backed by research showing that content quality matters more than strict time limits. My children now get more flexibility with high-quality activities.</p>
      
      <h4>2. Collaborative Rule-Setting</h4>
      
      <p>Following Helia's advice, we held a family meeting where the kids helped create our screen time guidelines. This was revolutionary! Because they participated in making the rules, they felt ownership and became surprisingly self-regulating.</p>
      
      <p>Our collaborative agreement includes:</p>
      <ul>
        <li>Screen-free zones (dining table, bedrooms)</li>
        <li>Screen-free times (morning before school, one hour before bedtime)</li>
        <li>Required activities before screens (homework, chores, outdoor play)</li>
        <li>Weekend vs. weekday allowances</li>
      </ul>
      
      <h4>3. Transition Warnings</h4>
      
      <p>Helia explained that children struggle with transitions, especially away from highly engaging activities. Now I give a 10-minute and 5-minute warning before screen time ends, which has dramatically reduced resistance.</p>
      
      <h4>4. Modeling Healthy Habits</h4>
      
      <p>Perhaps the most humbling realization came when Helia gently pointed out that children follow our example. I had to admit that while limiting their screen time, I was constantly checking my phone. Creating "device-free family time" where I put my phone away too has made a tremendous difference.</p>
      
      <h3>The Results: Beyond My Expectations</h3>
      
      <p>Within three weeks of implementing these strategies, our daily battles had virtually disappeared. What surprised me most was that my children sometimes choose to end screen time early on their own when they have ownership over their allotted time.</p>
      
      <p>The most telling moment came when my son actually turned off his game to join a family board game night without complaint—something unimaginable just months earlier.</p>
      
      <h3>A Balanced Approach</h3>
      
      <p>What makes Helia's screen time guidance different is that it's not about demonizing technology but finding healthy balance. Technology is part of our children's future, and learning to manage it is an essential skill.</p>
      
      <p>By focusing on teaching self-regulation rather than imposing rigid external control, we're helping our children develop habits that will serve them throughout life. And as an unexpected bonus, our whole family is more present and connected, even during our tech time.</p>
    `,
    author: "Michael K.",
    date: "April 28, 2023",
    readTime: "4 min read",
    views: 982,
  }
};

const BlogPost = () => {
  const { id } = useParams();
  const post = BLOG_POSTS[id as keyof typeof BLOG_POSTS];
  
  if (!post) {
    return (
      <>
        <Navbar />
        <section className="helia-section">
          <div className="helia-container">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-6">Blog Post Not Found</h1>
              <p className="text-xl text-gray-700 mb-8">
                The blog post you're looking for doesn't exist.
              </p>
              <Link to="/blog">
                <Button className="helia-btn-primary">Return to Blog</Button>
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      {/* Blog Post Header */}
      <section className="bg-gradient-to-b from-helia-blue/30 to-white pt-16 pb-16">
        <div className="helia-container">
          <div className="max-w-3xl mx-auto">
            <Link to="/blog" className="text-primary hover:underline flex items-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {post.title}
            </h1>
            
            <div className="flex items-center text-gray-600 mb-4">
              <span>{post.author}</span>
              <span className="mx-2">•</span>
              <span>{post.date}</span>
              <span className="mx-2">•</span>
              <span>{post.readTime}</span>
              <span className="mx-2">•</span>
              <span>{post.views} views</span>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="helia-section bg-white">
        <div className="helia-container">
          <div className="max-w-3xl mx-auto">
            <article className="prose lg:prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
            
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-bold mb-4">Share this post</h3>
              <div className="flex space-x-4">
                <Button variant="outline" className="rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                  </svg>
                  <span className="ml-2">Twitter</span>
                </Button>
                <Button variant="outline" className="rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                  </svg>
                  <span className="ml-2">Facebook</span>
                </Button>
                <Button variant="outline" className="rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
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
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.values(BLOG_POSTS)
                .filter(relatedPost => relatedPost.id !== post.id)
                .slice(0, 2)
                .map(relatedPost => (
                  <div key={relatedPost.id} className="helia-card">
                    <Link to={`/blog/${relatedPost.id}`}>
                      <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h3>
                    </Link>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span>{relatedPost.date}</span>
                      <span className="mx-2">•</span>
                      <span>{relatedPost.readTime}</span>
                    </div>
                    <Link to={`/blog/${relatedPost.id}`} className="text-primary font-medium hover:underline">
                      Read this post
                    </Link>
                  </div>
                ))}
            </div>
            
            <div className="mt-8 text-center">
              <Link to="/blog">
                <Button variant="outline" className="helia-btn-outline">View All Blog Posts</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default BlogPost;
