import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { usePortfolioPage } from "@/hooks/usePortfolioPage";

const fallbackSkills = [
    "Tiếp thị & Chạy Ads",
    "Tổ chức sự kiện",
    "Thiết kế (Canva/CapCut)",
    "Phân tích dữ liệu",
    "Quản lý dự án",
    "Sáng tạo nội dung",
];

const RADIUS = 200;

function getPosition(angleDeg: number, radius: number) {
    const rad = (angleDeg - 90) * (Math.PI / 180);
    return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius };
}

function normalizeSkills(skills: { value?: string }[] | undefined) {
    if (!skills) {
        return [];
    }

    return skills
        .map((item) => item.value?.trim() || "")
        .filter((value) => value.length > 0);
}

export default function ProfilePage() {
    const [showSkills, setShowSkills] = useState(false);
    const navigate = useNavigate();
    const { data } = usePortfolioPage();

    const introLabel = data?.profileIntro?.label || "HỒ SƠ";
    const introHeading =
        data?.profileIntro?.heading || "Chào, mình là Phạm Hoàng Thảo Uyên";
    const introBody =
        data?.profileIntro?.body ||
        "Mình là sinh viên năm hai đam mê marketing, sự kiện và chiến lược sáng tạo. Mình thích hiện thực hóa các ý tưởng thông qua các dự án hợp tác và chiến dịch đổi mới. Mục tiêu của mình là tạo ra những trải nghiệm đáng nhớ kết nối thương hiệu với khán giả.";
    const buttonSkills = data?.profileIntro?.buttonSkills || "Xem kỹ năng";
    const buttonNext = data?.profileIntro?.buttonNext || "Tiếp theo";
    const skillsTitle = data?.skills?.title || "KỸ NĂNG CỦA TÔI";
    const profileAvatarUrl = data?.profileIntro?.profileAvatar?.asset?.url;

    const cmsSkills = normalizeSkills(data?.skills?.items);
    const skillLabels = cmsSkills.length > 0 ? cmsSkills : fallbackSkills;
    const skillAngles = skillLabels.map(
        (_, index) => (360 / skillLabels.length) * index,
    );

    return (
        <div className="p-6 md:p-10 max-w-5xl mx-auto min-h-[calc(100vh-72px-64px)]">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <AnimatePresence mode="wait">
                    {!showSkills ? (
                        <motion.div
                            key="normal"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex flex-col md:flex-row items-center gap-10 mb-12">
                                <div className="flex-1 order-2 md:order-1">
                                    <p className="text-spotify-green font-bold text-sm uppercase tracking-widest mb-2">
                                        {introLabel}
                                    </p>
                                    <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tight mb-4">
                                        {introHeading}
                                    </h1>
                                    <p className="text-muted-foreground leading-relaxed text-base mb-6">
                                        {introBody}
                                    </p>
                                    <motion.button
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => setShowSkills(true)}
                                        className="h-11 px-8 rounded-full bg-spotify-green text-primary-foreground font-bold text-sm hover:bg-spotify-green-hover transition-colors"
                                    >
                                        {buttonSkills}
                                    </motion.button>
                                </div>

                                <div className="order-1 md:order-2 shrink-0">
                                    <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-surface-elevated border-4 border-spotify-green/30 shadow-2xl flex items-center justify-center overflow-hidden">
                                        {profileAvatarUrl ? (
                                            <img
                                                src={profileAvatarUrl}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-6xl">👤</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="skills"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col items-center"
                        >
                            <p className="text-spotify-green font-bold text-sm uppercase tracking-widest mb-6">
                                {skillsTitle}
                            </p>

                            {/* Center container for photo + floating skills */}
                            <div
                                className="relative flex items-center justify-center w-full"
                                style={{ minHeight: 480 }}
                            >
                                {/* Expanded portrait profile picture */}
                                <motion.div
                                    initial={{
                                        scale: 0.5,
                                        opacity: 0,
                                        borderRadius: "50%",
                                    }}
                                    animate={{
                                        scale: 1,
                                        opacity: 1,
                                        borderRadius: "1rem",
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        type: "spring",
                                        stiffness: 100,
                                    }}
                                    className="w-44 md:w-52 aspect-9/16 bg-surface-elevated border-4 border-spotify-green/40 shadow-2xl flex items-center justify-center overflow-hidden z-10"
                                >
                                    {profileAvatarUrl ? (
                                        <img
                                            src={profileAvatarUrl}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-7xl md:text-8xl">
                                            👤
                                        </span>
                                    )}
                                </motion.div>

                                {/* Floating skill tags */}
                                {skillLabels.map((skill, i) => {
                                    const pos = getPosition(
                                        skillAngles[i],
                                        RADIUS,
                                    );
                                    return (
                                        <motion.div
                                            key={`${skill}-${i}`}
                                            initial={{
                                                opacity: 0,
                                                x: 0,
                                                y: 0,
                                                scale: 0,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                x: pos.x,
                                                y: pos.y,
                                                scale: 1,
                                            }}
                                            transition={{
                                                delay: 0.25 + i * 0.08,
                                                duration: 0.6,
                                                type: "spring",
                                                stiffness: 100,
                                            }}
                                            className="absolute flex items-center gap-2 px-4 py-2.5 rounded-full bg-card border border-border shadow-lg z-20"
                                        >
                                            <span className="w-2 h-2 rounded-full bg-spotify-green" />
                                            <span className="text-foreground font-semibold text-sm whitespace-nowrap">
                                                {skill}
                                            </span>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setShowSkills(false)}
                                className="mt-8 h-11 px-8 rounded-full bg-surface-elevated text-foreground font-bold text-sm hover:bg-surface-highlight transition-colors"
                            >
                                Ẩn kỹ năng
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Next button */}
                <div className="flex justify-end mt-8">
                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate("/projects")}
                        className="flex items-center gap-2 h-11 px-8 rounded-full bg-spotify-green text-primary-foreground font-bold text-sm hover:bg-spotify-green-hover transition-colors"
                    >
                        {buttonNext} <ChevronRight size={18} />
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}
