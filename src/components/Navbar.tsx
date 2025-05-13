import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, Menu, X } from "lucide-react";

const CHAT_APP_URL = "https://chat.heliosensium.com";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="py-4 bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b border-border">
      <div className="helia-container">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-[#FF6347] w-12 h-12 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">HS</span>
            </div>
            <span className="text-2xl font-display font-semibold text-[#FF6347]">
              Heliosensium
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={`font-medium transition-colors ${
                isActive("/")
                  ? "text-primary"
                  : "text-foreground/80 hover:text-primary"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`font-medium transition-colors ${
                isActive("/about")
                  ? "text-primary"
                  : "text-foreground/80 hover:text-primary"
              }`}
            >
              About
            </Link>
            <Link
              to="/pricing"
              className={`font-medium transition-colors ${
                isActive("/pricing")
                  ? "text-primary"
                  : "text-foreground/80 hover:text-primary"
              }`}
            >
              Pricing
            </Link>
            <Link
              to="/blog"
              className={`font-medium transition-colors ${
                isActive("/blog")
                  ? "text-primary"
                  : "text-foreground/80 hover:text-primary"
              }`}
            >
              Blog
            </Link>
            <a href={CHAT_APP_URL} target="_blank" rel="noopener noreferrer">
              <Button className="helia-btn-primary flex items-center gap-2">
                <MessageCircle size={18} />
                <span>Helia Chat</span>
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button className="text-foreground" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-[72px] bg-background/95 backdrop-blur-sm shadow-md pt-4 pb-6 px-4 border-b border-border animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                onClick={toggleMenu}
                className={`font-medium py-2 transition-colors ${
                  isActive("/")
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={toggleMenu}
                className={`font-medium py-2 transition-colors ${
                  isActive("/about")
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                About
              </Link>
              <Link
                to="/pricing"
                onClick={toggleMenu}
                className={`font-medium py-2 transition-colors ${
                  isActive("/pricing")
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                Pricing
              </Link>
              <Link
                to="/blog"
                onClick={toggleMenu}
                className={`font-medium py-2 transition-colors ${
                  isActive("/blog")
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                Blog
              </Link>
              <a
                href={CHAT_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button className="helia-btn-primary w-full flex items-center gap-2 justify-center">
                  <MessageCircle size={18} />
                  <span>Helia Chat</span>
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
