import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import spotifyLogo from "@/assets/spotify-logo.svg";

export default function WelcomePage() {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-72px)] px-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-2xl w-full"
            >
                <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="mb-8"
                >
                    <img
                        src={spotifyLogo}
                        alt="Logo"
                        className="w-16 h-16 mx-auto"
                    />
                </motion.div>

                <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tight mb-4 leading-tight">
                    Chào mừng
                    <br />
                    đến với
                    <br />
                    Portfolio của tôi
                </h1>
                <p className="text-muted-foreground text-lg mb-10">
                    Một bộ sưu tập chọn lọc về công việc, kỹ năng và kinh nghiệm
                    của tôi.
                </p>

                <div className="relative max-w-lg mx-auto mb-8">
                    <Search
                        size={20}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nhập tên của bạn để bắt đầu..."
                        className="w-full h-12 pl-12 pr-4 rounded-full bg-card text-foreground placeholder:text-muted-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                </div>

                <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate("/profile")}
                    className="h-12 px-10 rounded-full bg-spotify-green text-primary-foreground font-bold text-base hover:bg-spotify-green-hover transition-colors"
                >
                    Tiếp tục
                </motion.button>

                <div className="mt-16 flex justify-center gap-6 opacity-30">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <motion.div
                            key={i}
                            animate={{ y: [0, -6, 0] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.2,
                            }}
                            className="w-1 rounded-full bg-spotify-green"
                            style={{ height: `${20 + i * 8}px` }}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
