import React from 'react';
import { Heart, Phone, Clock, User, ChevronRight, ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';


const HealthLandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
            <img src="/logo.jpeg" alt="/logo.jpeg" className="h-12 w-12 rounded-full" />
              <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">HealthCare</span>
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

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden pt-4 pb-2">
              <div className="flex flex-col space-y-4">
                <a href="#" className="text-gray-600 hover:text-blue-600">Beranda</a>
                <a href="#" className="text-gray-600 hover:text-blue-600">Layanan</a>
                <a href="#" className="text-gray-600 hover:text-blue-600">Dokter</a>
                <a href="#" className="text-gray-600 hover:text-blue-600">Kontak</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-24">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="/keluarga.jpg" 
            alt="Healthcare Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 bg-gradient-to-r from-blue-800/70"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-32">
          <div className="md:max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-8">
              Kesehatan Anda Adalah <span className="text-cyan-200">Prioritas</span> Kami
            </h1>
            <p className="text-blue-50 text-lg mb-8">
              Dapatkan layanan kesehatan terbaik dengan dokter-dokter berpengalaman. 
              Kami siap melayani 24/7 untuk kesehatan Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg">
                Jadwalkan Konsultasi
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                Pelajari Lebih Lanjut
              </button>
            </div>
          </div>
        </div>
        <div className="h-32 bg-slate-50 relative"></div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 -mt-30">
        <div className="grid md:grid-cols-3 gap-8 ">
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
            <User className="h-12 w-12 text-blue-600 mb-6" />
            <h3 className="text-xl font-bold mb-4">Dokter Ahli</h3>
            <p className="text-gray-600">Tim dokter berpengalaman siap memberikan perawatan terbaik untuk Anda.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
            <Clock className="h-12 w-12 text-blue-600 mb-6" />
            <h3 className="text-xl font-bold mb-4">Layanan 24/7</h3>
            <p className="text-gray-600">Pelayanan medis tersedia 24 jam setiap hari untuk kebutuhan darurat Anda.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
            <Phone className="h-12 w-12 text-blue-600 mb-6" />
            <h3 className="text-xl font-bold mb-4">Konsultasi Online</h3>
            <p className="text-gray-600">Konsultasi kesehatan online dengan dokter terpercaya kapanpun Anda butuhkan.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-12 rounded-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Butuh Konsultasi?</h2>
            <p className="text-blue-50 text-lg mb-8 max-w-2xl mx-auto">
              Hubungi kami sekarang untuk mendapatkan penanganan medis terbaik dari tim dokter profesional kami
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg inline-flex items-center group">
              Hubungi Kami
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <Heart className="h-6 w-6 text-blue-600" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
                HealthCare
              </span>
            </div>
            <div className="flex gap-8 text-gray-600">
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
            </div>
            <p className="text-gray-600">© 2025 HealthCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HealthLandingPage;