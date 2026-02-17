import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, X, FolderOpen, Loader2 } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import { categoriesAPI } from "../services/api";

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({ name: "", slug: "" });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const data = await categoriesAPI.getAll();
            setCategories(data);
        } catch (err) {
            console.error("Failed to fetch categories:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            if (editingCategory) {
                await categoriesAPI.update(editingCategory.id, formData);
            } else {
                await categoriesAPI.create(formData);
            }
            await fetchCategories();
            closeModal();
        } catch (err) {
            alert(err.message || "Gagal menyimpan kategori");
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setFormData({ name: category.name, slug: category.slug });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!confirm("Yakin ingin menghapus kategori ini?")) return;

        try {
            await categoriesAPI.delete(id);
            await fetchCategories();
        } catch (err) {
            alert(err.message || "Gagal menghapus kategori");
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingCategory(null);
        setFormData({ name: "", slug: "" });
    };

    const generateSlug = (name) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    };

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
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Kategori</h1>
                        <p className="text-gray-600">Kelola kategori artikel</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        Tambah Kategori
                    </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                                    <FolderOpen className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleEdit(category)}
                                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(category.id)}
                                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-gray-800 mb-2">
                                {category.name}
                            </h3>
                            <p className="text-sm text-gray-500 mb-3">
                                Slug: <span className="font-mono">{category.slug}</span>
                            </p>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span className="font-semibold">
                                    {category.articles?.length || 0}
                                </span>
                                <span>artikel</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {categories.length === 0 && (
                    <div className="text-center py-16">
                        <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Belum ada kategori</p>
                    </div>
                )}

                <AnimatePresence>
                    {showModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/50"
                                onClick={closeModal}
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {editingCategory ? "Edit Kategori" : "Tambah Kategori"}
                                    </h2>
                                    <button
                                        onClick={closeModal}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <X className="w-5 h-5 text-gray-500" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nama Kategori
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => {
                                                setFormData({
                                                    name: e.target.value,
                                                    slug: generateSlug(e.target.value),
                                                });
                                            }}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                            placeholder="Contoh: Kesehatan Mental"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Slug
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.slug}
                                            onChange={(e) =>
                                                setFormData({ ...formData, slug: e.target.value })
                                            }
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-sm"
                                            placeholder="kesehatan-mental"
                                            required
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            Akan otomatis di-generate dari nama
                                        </p>
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50"
                                        >
                                            {submitting
                                                ? "Menyimpan..."
                                                : editingCategory
                                                    ? "Update"
                                                    : "Simpan"}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </AdminLayout>
    );
};

export default AdminCategories;
