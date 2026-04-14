import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { useState } from "react";
import { usePortfolioPage } from "@/hooks/usePortfolioPage";
import { useLocation, useNavigate } from "react-router-dom";

const orderedPaths = ["/", "/profile", "/projects", "/thanks"];

export default function BottomPlayer() {
    const [playing, setPlaying] = useState(true);
    const { data } = usePortfolioPage();
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

    const trackTitle =
        data?.musicPlayer?.trackTitle || "Đang khám phá Portfolio";
    const artistName = data?.musicPlayer?.artistName || "Phạm Hoàng Thảo Uyên";

    return (
        <footer className="fixed bottom-0 left-0 right-0 h-18 bg-card border-t border-border z-50 flex items-center px-4 md:px-6">
            {/* Now playing */}
            <div className="flex items-center gap-3 w-1/3 min-w-0">
                <div className="w-10 h-10 rounded bg-spotify-green animate-pulse-green shrink-0 flex items-center justify-center">
                    <span className="text-primary-foreground text-lg">♫</span>
                </div>
                <div className="min-w-0">
                    <p className="text-foreground text-sm font-semibold truncate">
                        {trackTitle}
                    </p>
                    <p className="text-muted-foreground text-xs truncate">
                        {artistName}
                    </p>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 flex-1">
                <button
                    onClick={goBack}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                >
                    <SkipBack size={18} />
                </button>
                <button
                    onClick={() => setPlaying(!playing)}
                    className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center hover:scale-105 transition-transform"
                >
                    {playing ? (
                        <Pause size={18} className="text-background" />
                    ) : (
                        <Play size={18} className="text-background ml-0.5" />
                    )}
                </button>
                <button
                    onClick={goForward}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                >
                    <SkipForward size={18} />
                </button>
            </div>

            {/* Volume (desktop) */}
            <div className="hidden md:flex items-center gap-2 w-1/3 justify-end">
                <Volume2 size={18} className="text-muted-foreground" />
                <div className="w-24 h-1 bg-border rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-foreground rounded-full hover:bg-spotify-green transition-colors" />
                </div>
            </div>
        </footer>
    );
}
