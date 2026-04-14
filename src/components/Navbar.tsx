import {
    Home,
    User,
    FolderOpen,
    Heart,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import spotifyLogo from "@/assets/spotify-logo.svg";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
    { icon: Home, label: "Trang chủ", path: "/" },
    { icon: User, label: "Hồ sơ", path: "/profile" },
    { icon: FolderOpen, label: "Dự án", path: "/projects" },
    { icon: Heart, label: "Liên hệ", path: "/thanks" },
];

const orderedPaths = ["/", "/profile", "/projects", "/thanks"];

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();

    const currentIndex = orderedPaths.indexOf(location.pathname);

    const goBack = () => {
        if (currentIndex > 0) navigate(orderedPaths[currentIndex - 1]);
        else window.history.back();
    };

    const goForward = () => {
        if (currentIndex >= 0 && currentIndex < orderedPaths.length - 1)
            navigate(orderedPaths[currentIndex + 1]);
        else window.history.forward();
    };

    return (
        <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border">
            <div className="flex items-center justify-between h-16 px-4 md:px-8 max-w-7xl mx-auto">
                {/* Left – Nav arrows */}
                <div className="flex items-center gap-1 shrink-0">
                    <button
                        onClick={goBack}
                        className="w-8 h-8 rounded-full bg-surface-elevated/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={goForward}
                        className="w-8 h-8 rounded-full bg-surface-elevated/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>

                {/* Center – Tabs */}
                <nav className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => {
                        const active = location.pathname === item.path;
                        return (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                                    active
                                        ? "text-foreground bg-surface-elevated"
                                        : "text-muted-foreground hover:text-foreground hover:bg-surface-elevated/50"
                                }`}
                            >
                                <item.icon
                                    size={18}
                                    strokeWidth={active ? 2.5 : 1.5}
                                />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                {/* Right – Logo + Portfolio */}
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 shrink-0"
                >
                    <span className="font-bold text-foreground text-lg tracking-tight hidden sm:inline">
                        Hồ sơ năng lực
                    </span>
                    <img src={spotifyLogo} alt="Logo" className="w-8 h-8" />
                </button>
            </div>

            {/* Mobile bottom nav */}
            <nav className="md:hidden fixed bottom-[72px] left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border z-40 flex justify-around py-2">
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
        </header>
    );
}
