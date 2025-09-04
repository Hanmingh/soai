import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Mail, Globe } from 'lucide-react';

export default function Footer() {
  const logoImports = import.meta.glob('/src/assets/SoAI_logo.svg', { eager: true }) as Record<string, { default: string }>;
  const logoUrl = logoImports['/src/assets/SoAI_logo.svg']?.default ?? `${import.meta.env.BASE_URL}SoAI_logo.svg`;
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src={logoUrl} 
                alt="Soc-AI - Society of Algorithmic Intelligence" 
                className="h-12 filter brightness-0 invert"
                onError={(e) => {
                  // Fallback to text logo if image fails to load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="bg-[#003d7b] text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg hidden">
                S
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              A global community dedicated to advancing the science and practice of intelligent algorithms. 
              We bring together leading minds from academia, industry, and government to explore the 
              frontiers of artificial intelligence and emerging technologies.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                <span>info@soc-ai.org</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Globe className="h-4 w-4 mr-2" />
                <span>www.soc-ai.org</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <nav className="space-y-3">
              <Link
                to="/"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/membership"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Membership
              </Link>
              <Link
                to="/contact"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <nav className="space-y-3">
              <Link to="/resources/conferences" className="block text-sm text-gray-300 hover:text-white transition-colors">Conferences</Link>
              <Link to="/resources/workshops" className="block text-sm text-gray-300 hover:text-white transition-colors">Workshops</Link>
              <Link to="/resources/research-papers" className="block text-sm text-gray-300 hover:text-white transition-colors">Research Papers</Link>
              <Link to="/resources/community-forum" className="block text-sm text-gray-300 hover:text-white transition-colors">Community Forum</Link>
            </nav>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            <p>&copy; 2025 Society of Algorithmic Intelligence (Soc-AI). All rights reserved.</p>
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <a href={`${import.meta.env.BASE_URL}Constitution_SoAI.pdf`} download className="hover:text-white transition-colors">Constitution</a>
            <a href={`${import.meta.env.BASE_URL}By-Laws_SoAI.pdf`} download className="hover:text-white transition-colors">By-Laws</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
