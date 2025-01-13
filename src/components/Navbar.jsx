import { useState } from 'react';
import { Menu, X, ChevronDown, FileText, Video, Home, Users, Phone, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      y: -5,
      transition: {
        duration: 0.2
      }
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2
      }
    },
    exit: {
      opacity: 0,
      y: -5,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <img src="/logo.jpeg" alt="Logo" className="h-12 w-12 rounded-full shadow-md" />
              <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-sky-950 to-cyan-500 text-transparent bg-clip-text">
                HealthCare
              </span>
            </div>
          </div>

          {/* Navigation - Center */}
          <div className="hidden md:flex justify-center flex-1 mx-8">
            <div className="flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-sky-700 transition-colors duration-300 font-medium flex items-center gap-2">
                <Home size={18} />
                Beranda
              </a>
              
              {/* Desktop Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setActiveDropdown('media')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  className="text-gray-600 hover:text-sky-700 transition-colors duration-300 flex items-center group font-medium"
                >
                  Media Edukasi
                  <ChevronDown 
                    className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                      activeDropdown === 'media' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <AnimatePresence>
                  {activeDropdown === 'media' && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={dropdownVariants}
                      className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-3 transform border border-gray-100"
                    >
                      <div className="relative">
                        <motion.a 
                          href="#" 
                          className="block px-6 py-3 text-gray-600 hover:text-sky-700 hover:bg-blue-50 transition-all duration-300 relative group"
                          whileHover={{ x: 5 }}
                        >
                          <div className="flex items-center space-x-3">
                            <FileText size={18} />
                            <span className="font-medium">Artikel</span>
                          </div>
                        </motion.a>
                        <motion.a 
                          href="#" 
                          className="block px-6 py-3 text-gray-600 hover:text-sky-700 hover:bg-blue-50 transition-all duration-300 relative group"
                          whileHover={{ x: 5 }}
                        >
                          <div className="flex items-center space-x-3">
                            <Video size={18} />
                            <span className="font-medium">Video</span>
                          </div>
                        </motion.a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <a href="#" className="text-gray-600 hover:text-sky-700 transition-colors duration-300 font-medium flex items-center gap-2">
                <Users size={18} />
                Dokter
              </a>
              <a href="#" className="text-gray-600 hover:text-sky-700 transition-colors duration-300 font-medium flex items-center gap-2">
                <Phone size={18} />
                Kontak
              </a>
            </div>
          </div>

          {/* Search Bar - Right */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-sky-500 w-48"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600 hover:text-sky-700 transition-colors duration-300" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pt-4 pb-2 overflow-hidden"
            >
              <div className="flex flex-col space-y-4">
                {/* Mobile Search */}
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Cari..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-sky-500"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>

                <a href="#" className="text-gray-600 hover:text-sky-700 font-medium flex items-center gap-2">
                  <Home size={18} />
                  Beranda
                </a>
                
                {/* Mobile Dropdown Items */}
                <div className="space-y-2">
                  <button 
                    onClick={() => setActiveDropdown(activeDropdown === 'mobile-media' ? null : 'mobile-media')}
                    className="flex items-center text-gray-600 hover:text-sky-700 font-medium"
                  >
                    Media Edukasi
                    <ChevronDown 
                      className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                        activeDropdown === 'mobile-media' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  <AnimatePresence>
                    {activeDropdown === 'mobile-media' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-8 space-y-3 py-2 border-l-2 border-blue-100"
                      >
                        <motion.a 
                          href="#" 
                          className="flex items-center gap-2 text-gray-600 hover:text-sky-700 transition-colors duration-300"
                          whileHover={{ x: 5 }}
                        >
                          <FileText size={18} />
                          Artikel
                        </motion.a>
                        <motion.a 
                          href="#" 
                          className="flex items-center gap-2 text-gray-600 hover:text-sky-700 transition-colors duration-300"
                          whileHover={{ x: 5 }}
                        >
                          <Video size={18} />
                          Video
                        </motion.a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <a href="#" className="text-gray-600 hover:text-sky-700 font-medium flex items-center gap-2">
                  <Users size={18} />
                  Dokter
                </a>
                <a href="#" className="text-gray-600 hover:text-sky-700 font-medium flex items-center gap-2">
                  <Phone size={18} />
                  Kontak
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;