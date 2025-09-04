import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isResourcesOpenMobile, setIsResourcesOpenMobile] = useState(false);
  const location = useLocation();
  const logoImports = import.meta.glob('/src/assets/SoAI_logo.svg', { eager: true }) as Record<string, { default: string }>;
  const logoUrl = logoImports['/src/assets/SoAI_logo.svg']?.default ?? `${import.meta.env.BASE_URL}SoAI_logo.svg`;

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Membership', href: '/membership' },
    { name: 'Contact', href: '/contact' },
  ];

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
              alt="Soc-AI - Society of Algorithmic Intelligence" 
              className="h-12"
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
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-[#003d7b] ${
                  isActive(item.href)
                    ? 'text-[#003d7b] border-b-2 border-[#003d7b] pb-1'
                    : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="relative">
              <button
                className="text-sm font-medium text-gray-700 hover:text-[#003d7b] inline-flex items-center gap-1"
                onClick={() => setIsResourcesOpen((v) => !v)}
                aria-expanded={isResourcesOpen}
              >
                Resources <ChevronDown className={`h-4 w-4 transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isResourcesOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md border bg-white shadow-lg p-2">
                  <Link to="/resources/conferences" className="block px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-50" onClick={() => setIsResourcesOpen(false)}>Conferences</Link>
                  <Link to="/resources/workshops" className="block px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-50" onClick={() => setIsResourcesOpen(false)}>Workshops</Link>
                  <Link to="/resources/research-papers" className="block px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-50" onClick={() => setIsResourcesOpen(false)}>Research Papers</Link>
                  <Link to="/resources/community-forum" className="block px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-50" onClick={() => setIsResourcesOpen(false)}>Community Forum</Link>
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
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-[#003d7b] px-2 py-1 ${
                    isActive(item.href) ? 'text-[#003d7b]' : 'text-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button
                className="text-left text-sm font-medium transition-colors hover:text-[#003d7b] px-2 py-1 flex items-center gap-1"
                onClick={() => setIsResourcesOpenMobile((v) => !v)}
                aria-expanded={isResourcesOpenMobile}
              >
                Resources <ChevronDown className={`h-4 w-4 transition-transform ${isResourcesOpenMobile ? 'rotate-180' : ''}`} />
              </button>
              {isResourcesOpenMobile && (
                <div className="pl-4 space-y-2">
                  <Link to="/resources/conferences" className="block text-sm text-gray-700 hover:text-[#003d7b]" onClick={() => setIsMenuOpen(false)}>Conferences</Link>
                  <Link to="/resources/workshops" className="block text-sm text-gray-700 hover:text-[#003d7b]" onClick={() => setIsMenuOpen(false)}>Workshops</Link>
                  <Link to="/resources/research-papers" className="block text-sm text-gray-700 hover:text-[#003d7b]" onClick={() => setIsMenuOpen(false)}>Research Papers</Link>
                  <Link to="/resources/community-forum" className="block text-sm text-gray-700 hover:text-[#003d7b]" onClick={() => setIsMenuOpen(false)}>Community Forum</Link>
                </div>
              )}
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
