import { useState } from "react";
import { Menu } from "lucide-react";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <AdminSidebar
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setIsMobileOpen(true)}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                        >
                            <Menu className="w-6 h-6 text-gray-600" />
                        </button>

                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-800">Admin</p>
                                <p className="text-xs text-gray-500">Administrator</p>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold">A</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
};

export default AdminLayout;
