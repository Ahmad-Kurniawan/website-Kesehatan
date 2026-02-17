import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Search, Eye, Loader2 } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import { articlesAPI } from "../services/api";

const AdminArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async (search = "") => {
        try {
            setLoading(true);
            const data = await articlesAPI.getAll({ search });
            setArticles(data);
        } catch (err) {
            console.error("Failed to fetch articles:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        // Debounce search
        clearTimeout(window._searchTimeout);
        window._searchTimeout = setTimeout(() => {
            fetchArticles(query);
        }, 300);
    };

    const handleDelete = async (id) => {
        if (!confirm("Yakin ingin menghapus artikel ini?")) return;

        try {
            await articlesAPI.delete(id);
            await fetchArticles(searchQuery);
        } catch (err) {
            alert(err.message || "Gagal menghapus artikel");
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Artikel</h1>
                        <p className="text-gray-600">Kelola artikel blog</p>
                    </div>
                    <Link
                        to="/admin/articles/new"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        Artikel Baru
                    </Link>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearch}
                            placeholder="Cari artikel..."
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center py-16">
                            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                            Judul
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                            Kategori
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                            Tanggal
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                            Views
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {articles.map((article) => (
                                        <motion.tr
                                            key={article.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <p className="font-medium text-gray-800 line-clamp-1">
                                                    {article.title}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                                                    {article.category?.name || "—"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {new Date(article.created_at).toLocaleDateString(
                                                    "id-ID"
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Eye className="w-4 h-4" />
                                                    <span className="text-sm font-medium">
                                                        {(article.views || 0).toLocaleString()}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-medium ${article.status === "published"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-amber-100 text-amber-700"
                                                        }`}
                                                >
                                                    {article.status === "published"
                                                        ? "Published"
                                                        : "Draft"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        to={`/admin/articles/${article.id}`}
                                                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(article.id)}
                                                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {!loading && articles.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-gray-500">Tidak ada artikel ditemukan</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminArticles;
