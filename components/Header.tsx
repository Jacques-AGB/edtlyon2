export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo à gauche */}
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold text-gray-900 dark:text-white">
              Logo
            </a>
          </div>

          {/* Liens de navigation - Desktop uniquement */}
          <nav className="hidden lg:flex items-center space-x-6">
            <a 
              href="/" 
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Home
            </a>
            <a 
              href="/features" 
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Features
            </a>
            <a 
              href="/contact" 
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Icône de menu hamburger - Mobile uniquement */}
          <button 
            className="lg:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            aria-label="Menu"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

