import { Home, User, FolderOpen, Heart } from "lucide-react";
import { usePortfolioPage } from "@/hooks/usePortfolioPage";
import { useLocation, useNavigate } from "react-router-dom";

const pageMap: Record<string, number> = {
    "/": 1,
    "/profile": 2,
    "/projects": 3,
    "/thanks": 5,
};

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { data } = usePortfolioPage();

    const navItems = [
        { icon: Home, label: data?.tabs?.home || "Trang chủ", path: "/" },
        { icon: User, label: data?.tabs?.profile || "Hồ sơ", path: "/profile" },
        {
            icon: FolderOpen,
            label: data?.tabs?.projects || "Dự án",
            path: "/projects",
        },
        {
            icon: Heart,
            label: data?.tabs?.contact || "Liên hệ",
            path: "/thanks",
        },
    ];

    const currentPage = pageMap[location.pathname] || 4;
    const isProject = location.pathname.startsWith("/project/");

    return (
        <>
            {/* Desktop sidebar */}
            <aside className="hidden md:flex flex-col w-60 min-w-60 bg-sidebar h-screen sticky top-0 z-30">
                <div className="p-6 pb-2">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-full bg-spotify-green flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-sm">
                                P
                            </span>
                        </div>
                        <span className="font-bold text-foreground text-lg tracking-tight">
                            Hồ sơ năng lực
                        </span>
                    </div>
                    <p className="text-muted-foreground text-xs mt-1">
                        Page {isProject ? 4 : currentPage} of 5
                    </p>
                </div>

                <nav className="flex-1 px-2 py-4 space-y-1">
                    {navItems.map((item) => {
                        const active = location.pathname === item.path;
                        return (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center gap-4 px-4 py-3 rounded-md text-sm font-semibold transition-colors ${
                                    active
                                        ? "text-foreground bg-sidebar-accent"
                                        : "text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                <item.icon
                                    size={24}
                                    strokeWidth={active ? 2.5 : 1.5}
                                />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>
            </aside>

            {/* Mobile bottom nav */}
            <nav className="md:hidden fixed bottom-18 left-0 right-0 bg-sidebar border-t border-sidebar-border z-40 flex justify-around py-2">
                {navItems.map((item) => {
                    const active = location.pathname === item.path;
                    return (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`flex flex-col items-center gap-1 p-2 text-xs font-semibold transition-colors ${
                                active
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                            }`}
                        >
                            <item.icon
                                size={20}
                                strokeWidth={active ? 2.5 : 1.5}
                            />
                            {item.label}
                        </button>
                    );
                })}
            </nav>
        </>
    );
}
