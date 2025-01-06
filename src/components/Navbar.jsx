// components/Navbar.jsx
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-md fixed w-full z-50"
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="/logo.jpeg" alt="Logo" className="h-12 w-12 rounded-full" />
            <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
              HealthCare
            </span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Beranda</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Layanan</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Dokter</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Kontak</a>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden pt-4 pb-2"
          >
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-gray-600 hover:text-blue-600">Beranda</a>
              <a href="#" className="text-gray-600 hover:text-blue-600">Layanan</a>
              <a href="#" className="text-gray-600 hover:text-blue-600">Dokter</a>
              <a href="#" className="text-gray-600 hover:text-blue-600">Kontak</a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;