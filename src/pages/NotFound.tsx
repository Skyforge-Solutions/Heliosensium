import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, HelpCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      
      <div className="min-h-[70vh] bg-gradient-to-b from-helia-blue/30 to-white py-20">
        <div className="helia-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#FF6347]">
                Oops! We've lost our way
              </h1>
              
              <p className="text-xl text-gray-700 mb-8">
                Even the best parents sometimes take a wrong turn. The page you're 
                looking for seems to have wandered off, but we can help you find your way back.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Button 
                  className="helia-btn-primary flex items-center gap-2" 
                  asChild
                >
                  <Link to="/">
                    <Home size={18} />
                    <span>Return Home</span>
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="helia-btn-outline flex items-center gap-2"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft size={18} />
                  <span>Go Back</span>
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <HelpCircle size={18} className="text-primary" />
                  <span>Need help finding something?</span>
                </h2>
                <p className="text-gray-700 mb-4">
                  Try one of these popular parenting resources:
                </p>
                <ul className="space-y-2">
                  <li>
                    <Link to="/about" className="text-primary hover:underline flex items-center gap-2">
                      <span>• Learn about our parenting specialists</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/pricing" className="text-primary hover:underline flex items-center gap-2">
                      <span>• Explore Helia Chat subscription plans</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="text-primary hover:underline flex items-center gap-2">
                      <span>• Browse parenting articles and stories</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-[#FF6347]/10 rounded-full flex items-center justify-center animate-pulse-slow">
                  <div className="w-48 h-48 md:w-64 md:h-64 bg-[#FF6347]/20 rounded-full flex items-center justify-center">
                    <div className="w-32 h-32 md:w-48 md:h-48 bg-[#FF6347]/30 rounded-full flex items-center justify-center">
                      <div className="text-[150px] md:text-[200px] font-bold text-[#FF6347]/40 leading-none">
                        404
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default NotFound;
