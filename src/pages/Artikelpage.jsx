import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Eye, Tag, Loader2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { articlesAPI } from "../services/api";

const API_URL = import.meta.env.VITE_API_URL;

const Artikelpage = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchArticle();
    }, [id]);

    const fetchArticle = async () => {
        try {
            setLoading(true);
            const data = await articlesAPI.getOne(id);
            setArticle(data);
        } catch (err) {
            setError("Artikel tidak ditemukan");
        } finally {
            setLoading(false);
        }
    };

    const imageUrl = article?.image
        ? article.image.startsWith("http")
            ? article.image
            : `${API_URL}${article.image}`
        : null;

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="flex items-center justify-center pt-40 pb-20">
                    <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="max-w-3xl mx-auto px-4 pt-40 pb-20 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        Artikel Tidak Ditemukan
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Maaf, artikel yang Anda cari tidak tersedia atau sudah dihapus.
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Kembali ke Beranda
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Hero Image */}
            {imageUrl && (
                <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/20 to-transparent"></div>
                </div>
            )}

            {/* Article Content */}
            <div className={`max-w-3xl mx-auto px-4 ${imageUrl ? "-mt-20 relative z-10" : "pt-32"}`}>
                <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-3xl shadow-lg overflow-hidden"
                >
                    <div className="p-8 md:p-12">
                        {/* Back Link */}
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-emerald-600 font-medium mb-6 hover:gap-3 transition-all"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Kembali ke Beranda
                        </Link>

                        {/* Category Badge */}
                        {article.category && (
                            <div className="mb-4">
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                                    <Tag className="w-3.5 h-3.5" />
                                    {article.category.name}
                                </span>
                            </div>
                        )}

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
                            {article.title}
                        </h1>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm mb-8 pb-8 border-b border-gray-200">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>
                                    {new Date(article.created_at).toLocaleDateString("id-ID", {
                                        weekday: "long",
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{article.read_time || 5} menit baca</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Eye className="w-4 h-4" />
                                <span>{(article.views || 0).toLocaleString()} views</span>
                            </div>
                        </div>

                        {/* Article Body */}
                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                            {article.content.split("\n").map((paragraph, i) => {
                                if (!paragraph.trim()) return null;
                                return (
                                    <p key={i} className="mb-4">
                                        {paragraph}
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                </motion.article>

                {/* Back to Home */}
                <div className="text-center py-12">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Lihat Artikel Lainnya
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Artikelpage;
