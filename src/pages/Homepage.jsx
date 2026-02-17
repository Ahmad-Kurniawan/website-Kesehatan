import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowUp, BookOpen, TrendingUp, Users, FolderOpen, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import { articlesAPI, categoriesAPI } from "../services/api";

const API_URL = import.meta.env.VITE_API_URL;

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
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-emerald-600 to-teal-500 text-white p-4 rounded-full shadow-lg shadow-emerald-500/25 hover:shadow-xl transition-all z-50"
          whileHover={{ y: -3, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowUp className="h-6 w-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const FeaturedArticle = ({ article }) => {
  if (!article) return null;

  const imageUrl = article.image
    ? article.image.startsWith("http") ? article.image : `${API_URL}${article.image}`
    : "/keluarga.jpg";

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
    >
      <Link to={`/artikel/${article.id}`}>
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative aspect-video md:aspect-auto overflow-hidden">
            <img
              src={imageUrl}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            <span className="absolute top-4 left-4 bg-emerald-500 text-white px-4 py-1.5 rounded-full text-sm font-medium">
              Featured
            </span>
          </div>
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <span className="text-emerald-600 font-medium text-sm mb-3">
              {article.category?.name || "Umum"}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 group-hover:text-emerald-700 transition-colors leading-tight">
              {article.title}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
              {article.content?.substring(0, 200)}...
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>
                  {new Date(article.created_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <span>•</span>
                <span>{article.read_time || 5} menit baca</span>
              </div>
              <motion.span
                whileHover={{ x: 5 }}
                className="text-emerald-600 font-semibold inline-flex items-center gap-2"
              >
                Baca
                <ChevronRight className="h-4 w-4" />
              </motion.span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

const ArticleCard = ({ article, index }) => {
  const imageUrl = article.image
    ? article.image.startsWith("http") ? article.image : `${API_URL}${article.image}`
    : "/keluarga.jpg";

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500"
    >
      <Link to={`/artikel/${article.id}`}>
        <div className="relative aspect-video overflow-hidden">
          <img
            src={imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
            {article.category?.name || "Umum"}
          </span>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-emerald-700 transition-colors">
            {article.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
            {article.content?.substring(0, 120)}...
          </p>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3 text-gray-500">
              <span>
                {new Date(article.created_at).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <span>•</span>
              <span>{article.read_time || 5} min</span>
            </div>
            <motion.span
              whileHover={{ x: 3 }}
              className="text-emerald-600 font-medium"
            >
              Baca →
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

const categoryColors = [
  "bg-purple-500",
  "bg-emerald-500",
  "bg-blue-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-indigo-500",
];

const categoryIcons = [BookOpen, TrendingUp, Users, FolderOpen, BookOpen, TrendingUp];

const CategoryCard = ({ category, index }) => {
  const Icon = categoryIcons[index % categoryIcons.length];
  const color = categoryColors[index % categoryColors.length];

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group"
    >
      <div
        className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-semibold text-gray-800 mb-1">{category.name}</h3>
      <p className="text-gray-500 text-sm">
        {category.articles?.length || 0} artikel
      </p>
    </motion.div>
  );
};

const Homepage = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [articlesData, categoriesData] = await Promise.all([
        articlesAPI.getAll({ status: "published" }),
        categoriesAPI.getAll(),
      ]);
      setArticles(articlesData);
      setCategories(categoriesData);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      articlesAPI
        .getAll({ status: "published", search: searchQuery })
        .then(setArticles)
        .catch(console.error);
    } else {
      articlesAPI
        .getAll({ status: "published" })
        .then(setArticles)
        .catch(console.error);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const featuredArticle = articles.length > 0 ? articles[0] : null;
  const latestArticles = articles.slice(1, 4);

  const stats = [
    { value: `${articles.length}+`, label: "Artikel Kesehatan" },
    { value: "50K+", label: "Pembaca Aktif" },
    { value: `${categories.length}+`, label: "Topik Bahasan" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ScrollToTopButton />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-emerald-50 to-white overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-100 rounded-full blur-3xl opacity-50"></div>

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6">
              Blog Kesehatan Terpercaya
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Informasi Kesehatan{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                Terpercaya
              </span>{" "}
              untuk Anda
            </h1>
            <p className="text-gray-600 text-lg md:text-xl mb-10 leading-relaxed">
              Temukan artikel, tips, dan panduan kesehatan dari sumber terpercaya
              untuk hidup yang lebih sehat dan bahagia.
            </p>

            {/* Search Bar */}
            <div className="flex max-w-xl mx-auto">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Cari artikel kesehatan..."
                  className="w-full px-6 py-4 bg-white border border-gray-200 rounded-l-2xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
              </div>
              <button
                onClick={handleSearch}
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-semibold rounded-r-2xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
              >
                Cari
              </button>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-12 mt-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-gray-800">
                    {stat.value}
                  </div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
            </div>
          ) : featuredArticle ? (
            <FeaturedArticle article={featuredArticle} />
          ) : (
            <div className="text-center py-16 text-gray-500">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">Belum ada artikel yang dipublish</p>
              <p className="text-sm mt-2">
                Buat artikel pertama Anda melalui{" "}
                <Link to="/admin/login" className="text-emerald-600 font-medium hover:underline">
                  Admin Panel
                </Link>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-between items-end mb-10"
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Kategori Populer
                </h2>
                <p className="text-gray-600 mt-2">
                  Jelajahi artikel berdasarkan topik
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <CategoryCard category={category} index={index} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Articles */}
      {latestArticles.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-between items-end mb-10"
            >
              <div>
                <span className="text-emerald-600 font-medium text-sm mb-2 block">
                  ARTIKEL TERBARU
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Tips & Informasi Kesehatan
                </h2>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {latestArticles.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Dapatkan Info Kesehatan Terbaru
            </h2>
            <p className="text-emerald-100 text-lg mb-8">
              Berlangganan newsletter kami untuk tips kesehatan mingguan langsung
              ke inbox Anda
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="flex-1 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="px-8 py-4 bg-white text-emerald-700 font-semibold rounded-xl hover:bg-emerald-50 transition-colors">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Homepage;