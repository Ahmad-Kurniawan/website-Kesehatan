import { motion } from "framer-motion";
import { Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const categories = [
    "Kesehatan Mental",
    "Nutrisi & Diet",
    "Olahraga",
    "Gaya Hidup Sehat",
    "Kesehatan Keluarga",
  ];

  const quickLinks = [
    { name: "Beranda", href: "#" },
    { name: "Tentang Kami", href: "#about" },
    { name: "Artikel Terbaru", href: "#articles" },
    { name: "Kontak", href: "#contact" },
    { name: "Kebijakan Privasi", href: "#privacy" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <span className="text-xl font-bold">
                Keluarga<span className="text-emerald-400">Sehat</span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Sumber informasi kesehatan terpercaya untuk Anda dan keluarga.
              Artikel berkualitas dari penulis berpengalaman.
            </p>
            <div className="flex gap-3">
              {['facebook', 'twitter', 'instagram'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <span className="text-sm capitalize">{social[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Menu</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Kategori</h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Dapatkan artikel kesehatan terbaru langsung ke inbox Anda.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Email Anda"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-emerald-500 text-white placeholder-gray-500"
              />
              <button className="w-full px-4 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} KeluargaSehat. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500" /> for healthy living
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;