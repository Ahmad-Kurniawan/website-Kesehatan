import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    FileText,
    FolderOpen,
    LogOut,
    Menu,
    X,
} from "lucide-react";
import { useState } from "react";

const AdminSidebar = ({ isMobileOpen, setIsMobileOpen }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
        { icon: FileText, label: "Artikel", path: "/admin/articles" },
        { icon: FolderOpen, label: "Kategori", path: "/admin/categories" },
    ];

    const handleLogout = () => {
        localStorage.removeItem("adminAuth");
        localStorage.removeItem("token");
        navigate("/admin/login");
    };

    const SidebarContent = () => (
        <>
            {/* Logo */}
            <div className="p-6 border-b border-gray-700">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">K</span>
                    </div>
                    <div>
                        <h1 className="text-white font-bold text-lg">Admin Panel</h1>
                        <p className="text-gray-400 text-xs">KeluargaSehat</p>
                    </div>
                </div>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                ? "bg-emerald-600 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-gray-700">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-all"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-gray-800 min-h-screen">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar */}
            {isMobileOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        onClick={() => setIsMobileOpen(false)}
                    />
                    <motion.aside
                        initial={{ x: -280 }}
                        animate={{ x: 0 }}
                        exit={{ x: -280 }}
                        className="fixed top-0 left-0 w-64 bg-gray-800 min-h-screen z-50 lg:hidden flex flex-col"
                    >
                        <SidebarContent />
                    </motion.aside>
                </>
            )}
        </>
    );
};

export default AdminSidebar;
