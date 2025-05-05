import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-helia-soft-gray py-12">
      <div className="helia-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-[#FF6347] w-10 h-10 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">HS</span>
              </div>
              <span className="text-xl font-display font-semibold text-[#FF6347]">
                Heliosensium
              </span>
            </Link>
            <p className="mt-4 text-gray-600 max-w-md">
              Empowering parents with personalized guidance from our AI
              assistant Helia Chat. Supporting families with digital safety,
              emotional growth, child development, and parental mindfulness.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Pages</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-gray-600 hover:text-primary"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-primary">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Get Started</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/chat" className="text-gray-600 hover:text-primary">
                  Open Helia Chat
                </Link>
              </li>
              <li>
                <Link
                  to="/blog/submit"
                  className="text-gray-600 hover:text-primary"
                >
                  Submit a Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-gray-600 hover:text-primary"
                >
                  Free Credits
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center mt-10 mb-6">
          <div className="flex space-x-4">
            <a
              href="https://facebook.com/heliosensium"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-2 rounded-full text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://twitter.com/heliosensium"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-2 rounded-full text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://instagram.com/heliosensium"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-2 rounded-full text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://linkedin.com/company/heliosensium"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-2 rounded-full text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://youtube.com/c/heliosensium"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-2 rounded-full text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors"
              aria-label="YouTube"
            >
              <Youtube size={20} />
            </a>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Heliosensium. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-primary">
              Terms
            </a>
            <a href="#" className="text-gray-500 hover:text-primary">
              Privacy
            </a>
            <a href="#" className="text-gray-500 hover:text-primary">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
