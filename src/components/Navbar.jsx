import { useState } from 'react';
import { Menu, X, ChevronDown, FileText, Video, Home, Info, Mail, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, transition: { duration: 0.2 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -5, transition: { duration: 0.2 } }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md fixed top-0 w-full z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <span className="text-xl font-bold text-gray-800">
              Keluarga<span className="text-emerald-600">Sehat</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">
              Beranda
            </a>

            {/* Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('kategori')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-gray-600 hover:text-emerald-600 transition-colors flex items-center gap-1 font-medium">
                Kategori
                <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === 'kategori' ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'kategori' && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropdownVariants}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-gray-100"
                  >
                    {['Kesehatan Mental', 'Nutrisi & Diet', 'Olahraga', 'Gaya Hidup', 'Kesehatan Keluarga'].map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="block px-4 py-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                      >
                        {item}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">
              Artikel
            </a>
            <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">
              Tentang Kami
            </a>
            <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">
              Kontak
            </a>
          </div>

          {/* Search Button */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:text-emerald-600 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="px-5 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors">
              Subscribe
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600"
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
              <div className="flex flex-col gap-4">
                <a href="#" className="text-gray-600 hover:text-emerald-600 font-medium py-2">Beranda</a>
                <a href="#" className="text-gray-600 hover:text-emerald-600 font-medium py-2">Artikel</a>
                <a href="#" className="text-gray-600 hover:text-emerald-600 font-medium py-2">Kategori</a>
                <a href="#" className="text-gray-600 hover:text-emerald-600 font-medium py-2">Tentang Kami</a>
                <a href="#" className="text-gray-600 hover:text-emerald-600 font-medium py-2">Kontak</a>
                <button className="w-full py-3 bg-emerald-600 text-white rounded-lg font-medium mt-2">
                  Subscribe
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;