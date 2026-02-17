import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, User, Eye, EyeOff } from "lucide-react";
import { authAPI } from "../services/api";

const AdminLogin = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await authAPI.login(formData.username, formData.password);
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("adminAuth", "true");
            navigate("/admin");
        } catch (err) {
            setError(err.message || "Username atau password salah");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 flex items-center justify-center p-4">
            <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative w-full max-w-md"
            >
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
                    <div className="flex justify-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
                            <span className="text-white font-bold text-2xl">K</span>
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                            Admin Login
                        </h1>
                        <p className="text-gray-500">
                            Masuk ke dashboard admin KeluargaSehat
                        </p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={formData.username}
                                    onChange={(e) =>
                                        setFormData({ ...formData, username: e.target.value })
                                    }
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    placeholder="Masukkan username"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    placeholder="Masukkan password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all disabled:opacity-50"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <div className="mt-6 p-4 bg-emerald-50 rounded-xl">
                        <p className="text-sm text-emerald-800 font-medium mb-1">
                            Demo Credentials:
                        </p>
                        <p className="text-xs text-emerald-600">
                            Username: <span className="font-mono font-semibold">admin</span>
                        </p>
                        <p className="text-xs text-emerald-600">
                            Password: <span className="font-mono font-semibold">admin123</span>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
