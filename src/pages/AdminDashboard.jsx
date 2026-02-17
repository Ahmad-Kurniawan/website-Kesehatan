import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, FolderOpen, Eye, TrendingUp, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import { articlesAPI, categoriesAPI } from "../services/api";

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalArticles: 0,
        totalCategories: 0,
        totalViews: 0,
        publishedCount: 0,
    });
    const [recentArticles, setRecentArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [articles, categories] = await Promise.all([
                articlesAPI.getAll(),
                categoriesAPI.getAll(),
            ]);

            const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0);
            const published = articles.filter((a) => a.status === "published");

            setStats({
                totalArticles: articles.length,
                totalCategories: categories.length,
                totalViews,
                publishedCount: published.length,
            });

            setRecentArticles(articles.slice(0, 5));
        } catch (err) {
            console.error("Failed to fetch dashboard data:", err);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            icon: FileText,
            label: "Total Artikel",
            value: stats.totalArticles,
            color: "bg-blue-500",
            link: "/admin/articles",
        },
        {
            icon: FolderOpen,
            label: "Kategori",
            value: stats.totalCategories,
            color: "bg-emerald-500",
            link: "/admin/categories",
        },
        {
            icon: Eye,
            label: "Total Views",
            value: stats.totalViews.toLocaleString(),
            color: "bg-purple-500",
        },
        {
            icon: TrendingUp,
            label: "Published",
            value: stats.publishedCount,
            color: "bg-amber-500",
        },
    ];

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
                    <p className="text-gray-600">
                        Selamat datang di admin panel KeluargaSehat
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {statCards.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div
                                        className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}
                                    >
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    {stat.link && (
                                        <Link
                                            to={stat.link}
                                            className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                                        >
                                            Lihat →
                                        </Link>
                                    )}
                                </div>
                                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Recent Articles & Quick Actions */}
                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800">
                                Artikel Terbaru
                            </h2>
                            <Link
                                to="/admin/articles"
                                className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                            >
                                Lihat Semua →
                            </Link>
                        </div>

                        {recentArticles.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">
                                Belum ada artikel
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {recentArticles.map((article) => (
                                    <div
                                        key={article.id}
                                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-800 mb-1">
                                                {article.title}
                                            </h3>
                                            <div className="flex items-center gap-3 text-sm text-gray-500">
                                                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md">
                                                    {article.category?.name || "—"}
                                                </span>
                                                <span>
                                                    {new Date(article.created_at).toLocaleDateString(
                                                        "id-ID"
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <Eye className="w-4 h-4" />
                                            <span className="text-sm font-medium">
                                                {(article.views || 0).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">
                            Quick Actions
                        </h2>
                        <div className="space-y-3">
                            <Link
                                to="/admin/articles/new"
                                className="block w-full px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-medium text-center hover:shadow-lg transition-all"
                            >
                                + Artikel Baru
                            </Link>
                            <Link
                                to="/admin/categories"
                                className="block w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium text-center hover:bg-gray-200 transition-all"
                            >
                                Kelola Kategori
                            </Link>
                            <Link
                                to="/admin/articles"
                                className="block w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium text-center hover:bg-gray-200 transition-all"
                            >
                                Lihat Semua Artikel
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
