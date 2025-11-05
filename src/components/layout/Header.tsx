import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, Download } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isResourcesOpenMobile, setIsResourcesOpenMobile] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isAboutMobileOpen, setIsAboutMobileOpen] = useState(false);
  const aboutCloseTimeout = useRef<number | null>(null);
  const resourcesCloseTimeout = useRef<number | null>(null);
  const location = useLocation();
  const logoImports = import.meta.glob('/src/assets/SoAI_logo.svg', { eager: true }) as Record<string, { default: string }>;
  const logoUrl = logoImports['/src/assets/SoAI_logo.svg']?.default ?? `${import.meta.env.BASE_URL}SoAI_logo.svg`;


  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={logoUrl} 
              alt="SoAI - Society of Algorithmic Intelligence" 
              className="h-12"
              loading="eager"
              fetchPriority="high"
              decoding="sync"
              onError={(e) => {
                // Fallback to text logo if image fails to load
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="bg-[#003d7b] text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg hidden">
              S
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Home */}
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-[#003d7b] ${
                isActive('/') ? 'text-[#003d7b] border-b-2 border-[#003d7b] pb-1' : 'text-gray-700'
              }`}
            >
              Home
            </Link>

            

            {/* About with nested Teams */}
            <div
              className="relative"
              onMouseEnter={() => {
                if (aboutCloseTimeout.current) clearTimeout(aboutCloseTimeout.current);
                setIsAboutOpen(true);
              }}
              onMouseLeave={() => {
                if (aboutCloseTimeout.current) clearTimeout(aboutCloseTimeout.current);
                aboutCloseTimeout.current = window.setTimeout(() => setIsAboutOpen(false), 300);
              }}
              onFocus={() => {
                if (aboutCloseTimeout.current) clearTimeout(aboutCloseTimeout.current);
                setIsAboutOpen(true);
              }}
            >
              <button
                className={`text-sm font-medium inline-flex items-center gap-1 ${isActive('/about') ? 'text-[#003d7b]' : 'text-gray-700'} hover:text-[#003d7b]`}
                onClick={() => setIsAboutOpen((v) => !v)}
                aria-expanded={isAboutOpen}
                aria-haspopup="menu"
              >
                About <ChevronDown className={`h-4 w-4 transition-transform ${isAboutOpen ? 'rotate-180' : ''}`} />
              </button>
              {isAboutOpen && (
                <div
                  className="absolute left-0 mt-2 w-64 rounded-md border bg-white shadow-lg p-2"
                  onMouseEnter={() => {
                    if (aboutCloseTimeout.current) clearTimeout(aboutCloseTimeout.current);
                    setIsAboutOpen(true);
                  }}
                  onMouseLeave={() => {
                    if (aboutCloseTimeout.current) clearTimeout(aboutCloseTimeout.current);
                    aboutCloseTimeout.current = window.setTimeout(() => setIsAboutOpen(false), 300);
                  }}
                >
                  <Link to="/about#about-us" className="block px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-50" onClick={() => setIsAboutOpen(false)}>About Us</Link>
                  <Link to="/about/teams/ec" className="block px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-50" onClick={() => setIsAboutOpen(false)}>Executive Committee</Link>
                  <Link to="/about/leadership-network" className="block px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-50" onClick={() => setIsAboutOpen(false)}>Leadership Network</Link>
                  <a
                    href={`${import.meta.env.BASE_URL}Constitution_SoAI.pdf`}
                    download
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-50"
                    onClick={() => setIsAboutOpen(false)}
                  >
                    <Download className="h-4 w-4" /> Constitution (PDF)
                  </a>
                  <a
                    href={`${import.meta.env.BASE_URL}By-Laws_SoAI.pdf`}
                    download
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-50"
                    onClick={() => setIsAboutOpen(false)}
                  >
                    <Download className="h-4 w-4" /> By-Laws (PDF)
                  </a>
                </div>
              )}
            </div>

            {/* Membership */}
            <Link
              to="/membership"
              className={`text-sm font-medium transition-colors hover:text-[#003d7b] ${
                isActive('/membership') ? 'text-[#003d7b] border-b-2 border-[#003d7b] pb-1' : 'text-gray-700'
              }`}
            >
              Membership
            </Link>

            {/* Contact */}
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors hover:text-[#003d7b] ${
                isActive('/contact') ? 'text-[#003d7b] border-b-2 border-[#003d7b] pb-1' : 'text-gray-700'
              }`}
            >
              Contact
            </Link>
            {/* Resources (rightmost) */}
            <div
              className="relative"
              onMouseEnter={() => {
                if (resourcesCloseTimeout.current) clearTimeout(resourcesCloseTimeout.current);
                setIsResourcesOpen(true);
              }}
              onMouseLeave={() => {
                if (resourcesCloseTimeout.current) clearTimeout(resourcesCloseTimeout.current);
                resourcesCloseTimeout.current = window.setTimeout(() => setIsResourcesOpen(false), 300);
              }}
              onFocus={() => {
                if (resourcesCloseTimeout.current) clearTimeout(resourcesCloseTimeout.current);
                setIsResourcesOpen(true);
              }}
            >
              <button
                className="text-sm font-medium text-gray-700 hover:text-[#003d7b] inline-flex items-center gap-1"
                onClick={() => setIsResourcesOpen((v) => !v)}
                aria-expanded={isResourcesOpen}
                aria-haspopup="menu"
              >
                Resources <ChevronDown className={`h-4 w-4 transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isResourcesOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-md border bg-white shadow-lg p-2"
                  onMouseEnter={() => {
                    if (resourcesCloseTimeout.current) clearTimeout(resourcesCloseTimeout.current);
                    setIsResourcesOpen(true);
                  }}
                  onMouseLeave={() => {
                    if (resourcesCloseTimeout.current) clearTimeout(resourcesCloseTimeout.current);
                    resourcesCloseTimeout.current = window.setTimeout(() => setIsResourcesOpen(false), 300);
                  }}
                >
                  <Link to="/events" className="block px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-50" onClick={() => setIsResourcesOpen(false)}>Events</Link>
                  <Link to="/news" className="block px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-50" onClick={() => setIsResourcesOpen(false)}>News</Link>
                </div>
              )}
            </div>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button size="sm" className="bg-[#003d7b] hover:bg-[#002a5c]" asChild>
              <Link to="/membership">Join Now</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors hover:text-[#003d7b] px-2 py-1 ${
                  isActive('/') ? 'text-[#003d7b]' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              {/* About group */}
              <div className="space-y-2">
                <button
                  className="text-left text-sm font-medium transition-colors hover:text-[#003d7b] px-2 py-1 flex items-center gap-1"
                  onClick={() => setIsAboutMobileOpen((v) => !v)}
                  aria-expanded={isAboutMobileOpen}
                >
                  About <ChevronDown className={`h-4 w-4 transition-transform ${isAboutMobileOpen ? 'rotate-180' : ''}`} />
                </button>
                {isAboutMobileOpen && (
                  <div className="pl-4 space-y-2">
                    <Link to="/about#about-us" className="block text-sm text-gray-700 hover:text-[#003d7b]" onClick={() => setIsMenuOpen(false)}>About Us</Link>
                    <Link to="/about/teams/ec" className="block text-sm text-gray-700 hover:text-[#003d7b]" onClick={() => setIsMenuOpen(false)}>Executive Committees</Link>
                    <Link to="/about/leadership-network" className="block text-sm text-gray-700 hover:text-[#003d7b]" onClick={() => setIsMenuOpen(false)}>Leadership Network</Link>
                    <a
                      href={`${import.meta.env.BASE_URL}Constitution_SoAI.pdf`}
                      download
                      className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#003d7b]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Download className="h-4 w-4" /> Constitution (PDF)
                    </a>
                    <a
                      href={`${import.meta.env.BASE_URL}By-Laws_SoAI.pdf`}
                      download
                      className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#003d7b]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Download className="h-4 w-4" /> By-Laws (PDF)
                    </a>
                  </div>
                )}
              </div>
              <Link
                to="/membership"
                className={`text-sm font-medium transition-colors hover:text-[#003d7b] px-2 py-1 ${
                  isActive('/membership') ? 'text-[#003d7b]' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Membership
              </Link>
              <Link
                to="/contact"
                className={`text-sm font-medium transition-colors hover:text-[#003d7b] px-2 py-1 ${
                  isActive('/contact') ? 'text-[#003d7b]' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              {/* Resources (mobile) */}
              <div className="space-y-2">
                <button
                  className="text-left text-sm font-medium transition-colors hover:text-[#003d7b] px-2 py-1 flex items-center gap-1"
                  onClick={() => setIsResourcesOpenMobile((v) => !v)}
                  aria-expanded={isResourcesOpenMobile}
                >
                  Resources <ChevronDown className={`h-4 w-4 transition-transform ${isResourcesOpenMobile ? 'rotate-180' : ''}`} />
                </button>
                {isResourcesOpenMobile && (
                  <div className="pl-4 space-y-2">
                    <Link to="/events" className="block text-sm text-gray-700 hover:text-[#003d7b]" onClick={() => setIsMenuOpen(false)}>Events</Link>
                    <Link to="/news" className="block text-sm text-gray-700 hover:text-[#003d7b]" onClick={() => setIsMenuOpen(false)}>News</Link>
                  </div>
                )}
              </div>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Button size="sm" className="bg-[#003d7b] hover:bg-[#002a5c]" asChild>
                  <Link to="/membership">Join Now</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
