import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Save, ArrowLeft, Image as ImageIcon, X, Loader2, Plus, Check } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import { articlesAPI, categoriesAPI, uploadAPI } from "../services/api";

const API_URL = import.meta.env.VITE_API_URL;

const AdminArticleForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        title: "",
        category_id: "",
        content: "",
        read_time: "",
        status: "draft",
        image: "",
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [showNewCategory, setShowNewCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [addingCategory, setAddingCategory] = useState(false);

    useEffect(() => {
        fetchCategories();
        if (id) {
            fetchArticle();
        }
    }, [id]);

    const fetchCategories = async () => {
        try {
            const data = await categoriesAPI.getAll();
            setCategories(data);
        } catch (err) {
            console.error("Failed to fetch categories:", err);
        }
    };

    const fetchArticle = async () => {
        try {
            setLoading(true);
            const article = await articlesAPI.getOne(id);
            setFormData({
                title: article.title || "",
                category_id: article.category_id || "",
                content: article.content || "",
                read_time: article.read_time || "",
                status: article.status || "draft",
                image: article.image || "",
            });
            if (article.image) {
                setImagePreview(`${API_URL}${article.image}`);
            }
        } catch (err) {
            console.error("Failed to fetch article:", err);
            alert("Artikel tidak ditemukan");
            navigate("/admin/articles");
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Show local preview
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);

        // Upload to server
        try {
            setUploading(true);
            const data = await uploadAPI.uploadImage(file);
            setFormData((prev) => ({ ...prev, image: data.url }));
        } catch (err) {
            alert("Gagal upload gambar");
            setImagePreview(null);
        } finally {
            setUploading(false);
        }
    };

    const removeImage = () => {
        setFormData((prev) => ({ ...prev, image: "" }));
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) return;
        setAddingCategory(true);
        try {
            const created = await categoriesAPI.create({ name: newCategoryName.trim() });
            await fetchCategories();
            setFormData((prev) => ({ ...prev, category_id: String(created.id) }));
            setNewCategoryName("");
            setShowNewCategory(false);
        } catch (err) {
            alert(err.message || "Gagal menambahkan kategori");
        } finally {
            setAddingCategory(false);
        }
    };

    const handleSubmit = async (e, status) => {
        e.preventDefault();
        setSubmitting(true);

        const payload = {
            title: formData.title,
            content: formData.content,
            image: formData.image || null,
            read_time: parseInt(formData.read_time) || 5,
            status: status || formData.status,
            category_id: parseInt(formData.category_id) || null,
        };

        try {
            if (id) {
                await articlesAPI.update(id, payload);
            } else {
                await articlesAPI.create(payload);
            }
            navigate("/admin/articles");
        } catch (err) {
            alert(err.message || "Gagal menyimpan artikel");
        } finally {
            setSubmitting(false);
        }
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
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate("/admin/articles")}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6 text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            {id ? "Edit Artikel" : "Artikel Baru"}
                        </h1>
                        <p className="text-gray-600">
                            {id ? "Perbarui artikel Anda" : "Buat artikel kesehatan baru"}
                        </p>
                    </div>
                </div>

                <form onSubmit={(e) => handleSubmit(e, "published")} className="space-y-6">
                    {/* Image Upload */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <label className="block text-sm font-semibold text-gray-700 mb-4">
                            Gambar Artikel
                        </label>

                        {imagePreview ? (
                            <div className="relative">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-64 object-cover rounded-xl"
                                />
                                {uploading && (
                                    <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center">
                                        <Loader2 className="w-8 h-8 text-white animate-spin" />
                                    </div>
                                )}
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition-all"
                            >
                                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 mb-2">Klik untuk upload gambar</p>
                                <p className="text-sm text-gray-500">
                                    PNG, JPG, atau WEBP (max. 2MB)
                                </p>
                            </div>
                        )}

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>

                    {/* Basic Info */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Judul Artikel *
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({ ...formData, title: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                placeholder="Contoh: 10 Cara Efektif Mengelola Stress"
                                required
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Kategori *
                                </label>
                                <select
                                    value={formData.category_id}
                                    onChange={(e) =>
                                        setFormData({ ...formData, category_id: e.target.value })
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    required
                                >
                                    <option value="">Pilih Kategori</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>

                                {/* Add New Category Inline */}
                                <AnimatePresence>
                                    {showNewCategory ? (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="mt-3 flex gap-2"
                                        >
                                            <input
                                                type="text"
                                                value={newCategoryName}
                                                onChange={(e) => setNewCategoryName(e.target.value)}
                                                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddCategory())}
                                                placeholder="Nama kategori baru"
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                                autoFocus
                                            />
                                            <button
                                                type="button"
                                                onClick={handleAddCategory}
                                                disabled={addingCategory || !newCategoryName.trim()}
                                                className="px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
                                            >
                                                {addingCategory ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <Check className="w-4 h-4" />
                                                )}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => { setShowNewCategory(false); setNewCategoryName(""); }}
                                                className="px-3 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => setShowNewCategory(true)}
                                            className="mt-2 inline-flex items-center gap-1.5 text-sm text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                            Kategori Baru
                                        </button>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Waktu Baca (menit) *
                                </label>
                                <input
                                    type="number"
                                    value={formData.read_time}
                                    onChange={(e) =>
                                        setFormData({ ...formData, read_time: e.target.value })
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    placeholder="5"
                                    min="1"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Konten Artikel *
                        </label>
                        <textarea
                            value={formData.content}
                            onChange={(e) =>
                                setFormData({ ...formData, content: e.target.value })
                            }
                            rows={15}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none font-mono text-sm"
                            placeholder={
                                "Tulis konten artikel Anda di sini...\n\nAnda bisa menggunakan paragraf untuk formatting."
                            }
                            required
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            type="button"
                            disabled={submitting}
                            onClick={(e) => handleSubmit(e, "draft")}
                            className="flex-1 px-6 py-4 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                            {submitting ? "Menyimpan..." : "Simpan sebagai Draft"}
                        </button>
                        <button
                            type="submit"
                            disabled={submitting || uploading}
                            className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            <Save className="w-5 h-5" />
                            {submitting ? "Publishing..." : "Publish Artikel"}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default AdminArticleForm;
