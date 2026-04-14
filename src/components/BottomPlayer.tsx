import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { useState } from "react";

export default function BottomPlayer() {
    const [playing, setPlaying] = useState(true);

    return (
        <footer className="fixed bottom-0 left-0 right-0 h-[72px] bg-card border-t border-border z-50 flex items-center px-4 md:px-6">
            {/* Now playing */}
            <div className="flex items-center gap-3 w-1/3 min-w-0">
                <div className="w-10 h-10 rounded bg-spotify-green animate-pulse-green flex-shrink-0 flex items-center justify-center">
                    <span className="text-primary-foreground text-lg">♫</span>
                </div>
                <div className="min-w-0">
                    <p className="text-foreground text-sm font-semibold truncate">
                        Đang khám phá Portfolio
                    </p>
                    <p className="text-muted-foreground text-xs truncate">
                        Phạm Hoàng Thảo Uyên
                    </p>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 flex-1">
                <button className="text-muted-foreground hover:text-foreground transition-colors">
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
                <button className="text-muted-foreground hover:text-foreground transition-colors">
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
