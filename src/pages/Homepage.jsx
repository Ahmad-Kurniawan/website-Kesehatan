import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
        className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
      >
        {category}
      </motion.span>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{preview}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{date}</span>
        <motion.button
          whileHover={{ x: 5 }}
          className="text-blue-600 font-semibold inline-flex items-center group-hover:gap-2 transition-all"
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

  const DoctorCard = ({ image, name, specialization, quote }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center"
    >
      {/* Foto dan Nama di Bagian Atas */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold text-gray-900 text-lg">{name}</h4>
          <p className="text-gray-600 text-sm">{specialization}</p>
        </div>
      </div>
      {/* Konten di Bagian Bawah */}
      <p className="text-gray-700 text-center italic">{quote}</p>
    </motion.div>
  );

  const doctors = [
    {
      name: " Dr. Terawan Agus Putranto",
      specialization: "Spesialisasi: Radiologi dan Terapi Inovatif",
      image: "/Doktor1.webp",
      quote:
        "Kesehatan adalah investasi terbesar dalam hidup. Jangan pernah abaikan sinyal dari tubuh Anda, karena tubuh yang sehat adalah kunci kebahagiaan sejati.",
    },
    {
      name: "Dr. Siti Fadilah Supari",
      specialization: "Spesialisasi: Penyakit Dalam dan Kesehatan Publik",
      image: "/Doktor2.webp",
      quote:
      "Pencegahan lebih baik daripada pengobatan. Dengan edukasi kesehatan yang baik, kita dapat memutus rantai penyakit sebelum terlambat."
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

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
              <span className="text-cyan-200">Prioritas</span> Kami
            </h1>
            <p className="text-blue-50 text-lg mb-8">
              Dapatkan layanan kesehatan terbaik dengan dokter-dokter
              berpengalaman. Kami siap melayani 24/7 untuk kesehatan Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg">
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
            <button className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:gap-4 transition-all">
              Lihat Semua Artikel
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <ArticleCard key={index} {...article} index={index} />
            ))}
          </div>

          <button className="md:hidden w-full mt-8 text-blue-600 font-semibold flex items-center justify-center gap-2">
            Lihat Semua Artikel
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="bg-slate-50 py-24"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Tim Dokter Profesional Kami
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {doctors.map((doctor, index) => (
              <DoctorCard key={index} {...doctor} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-slate-50"
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-12 rounded-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Butuh Konsultasi?
            </h2>
            <p className="text-blue-50 text-lg mb-8 max-w-2xl mx-auto">
              Hubungi kami sekarang untuk mendapatkan penanganan medis terbaik
              dari tim dokter profesional kami
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg inline-flex items-center group">
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
