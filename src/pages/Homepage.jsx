import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DoctorCarousel from '../components/DoctorCarousel';

const slideIn = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-sky-900 text-white p-3 rounded-full shadow-lg hover:bg-sky-700 transition-colors z-50 group"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowUp className="h-6 w-6 group-hover:animate-bounce" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const ArticleCard = ({ image, category, title, preview, date, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="bg-white rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300"
  >
    <div className="relative overflow-hidden aspect-video">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <motion.span
        whileHover={{ scale: 1.05 }}
        className="absolute top-4 left-4 bg-sky-700 text-white px-3 py-1 rounded-full text-sm"
      >
        {category}
      </motion.span>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-sky-700 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{preview}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{date}</span>
        <motion.button
          whileHover={{ x: 5 }}
          className="text-sky-700 font-semibold inline-flex items-center group-hover:gap-2 transition-all"
        >
          Baca Selengkapnya
          <ChevronRight className="h-4 w-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
        </motion.button>
      </div>
    </div>
  </motion.div>
);


const Homepage = () => {
  const articles = [
    {
      image: "/keluarga2.jpg",
      category: "Kesehatan Mental",
      title: "10 Cara Efektif Mengelola Stress di Era Digital",
      preview:
        "Temukan cara-cara praktis untuk menjaga kesehatan mental Anda di tengah padatnya aktivitas digital.",
      date: "28 Des 2024",
    },
    {
      image: "/makanan-sehat.jpg",
      category: "Gaya Hidup",
      title: "Panduan Pola Makan Sehat untuk Kekebalan Tubuh",
      preview:
        "Tingkatkan sistem imun tubuh Anda dengan pola makan yang tepat dan bergizi seimbang.",
      date: "26 Des 2024",
    },
    {
      image: "/lari.jpg",
      category: "Tips Kesehatan",
      title: "Olahraga yang Tepat untuk Work from Home",
      preview:
        "Jaga kebugaran tubuh Anda dengan rutinitas olahraga yang dapat dilakukan di rumah.",
      date: "24 Des 2024",
    },
  ];


  return (
    <div className="min-h-screen bg-slate-400">
      <Navbar />
      
      <ScrollToTopButton />

      {/* Hero Section */}
      <div className="relative pt-24">
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/keluarga.jpg"
            alt="Healthcare Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-slate-700"></div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative max-w-7xl mx-auto px-4 py-16 md:py-32"
        >
          <motion.div
            variants={slideIn}
            initial="initial"
            animate="animate"
            className="md:max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-8">
              Kesehatan Anda Adalah{" "}
              <span className="text-cyan-600">Prioritas</span> Kami
            </h1>
            <p className="text-blue-50 text-lg mb-8">
              Dapatkan layanan kesehatan terbaik dengan dokter-dokter
              berpengalaman. Kami siap melayani 24/7 untuk kesehatan Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-sky-700 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg">
                Jadwalkan Konsultasi
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                Pelajari Lebih Lanjut
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Articles Section */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="relative z-10 py-12 bg-slate-50"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Artikel Kesehatan Terbaru
              </h2>
              <p className="text-gray-600 max-w-2xl">
                Temukan informasi kesehatan terpercaya dan tips hidup sehat dari
                para ahli kami
              </p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-sky-950 font-semibold hover:gap-4 transition-all">
              Lihat Semua Artikel
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <ArticleCard key={index} {...article} index={index} />
            ))}
          </div>

          <button className="md:hidden w-full mt-8 text-sky-950 font-semibold flex items-center justify-center gap-2">
            Lihat Semua Artikel
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </motion.div>

      {/* Doctors Section */}
      <DoctorCarousel />

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-slate-50"
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-gradient-to-br from-sky-950 to-cyan-400 p-12 rounded-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Butuh Konsultasi?
            </h2>
            <p className="text-blue-50 text-lg mb-8 max-w-2xl mx-auto">
              Hubungi kami sekarang untuk mendapatkan penanganan medis terbaik
              dari tim dokter profesional kami
            </p>
            <button className="bg-white text-sky-700 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg inline-flex items-center group">
              Hubungi Kami
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Homepage;