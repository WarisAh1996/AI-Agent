import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-sm border-b border-primary/20">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.svg" alt="AI Call Agent" className="h-8 w-8" />
            <span className="text-primary font-bold text-xl">AI Call Agent</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/pricing" className="text-white hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link to="/contact" className="text-white hover:text-primary transition-colors">
              Contact
            </Link>
            <Link to="/book-demo" 
              className="bg-primary hover:bg-primary-dark text-black px-4 py-2 rounded-lg font-semibold transition-colors">
              Book Demo
            </Link>
          </div>

          <button className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
