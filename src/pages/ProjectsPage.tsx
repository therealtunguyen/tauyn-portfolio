import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const projects = [
    {
        id: "campus-fest",
        title: "Lễ hội âm nhạc Campus",
        subtitle: "Marketing & Sự kiện – 2025",
        color: "from-green-900/60 to-background",
    },
    {
        id: "brand-launch",
        title: "Chiến dịch ra mắt thương hiệu",
        subtitle: "Chiến lược truyền thông – 2025",
        color: "from-emerald-900/60 to-background",
    },
    {
        id: "charity-gala",
        title: "Đêm tiệc Gala Từ thiện",
        subtitle: "Tổ chức sự kiện – 2024",
        color: "from-teal-900/60 to-background",
    },
    {
        id: "digital-marketing",
        title: "Tăng tốc Marketing Kỹ thuật số",
        subtitle: "Phân tích & Nội dung – 2024",
        color: "from-lime-900/60 to-background",
    },
    {
        id: "podcast-series",
        title: "Chuỗi Podcast sinh viên",
        subtitle: "Sản xuất & Thương hiệu – 2024",
        color: "from-cyan-900/60 to-background",
    },
    {
        id: "design-workshop",
        title: "Hội thảo Tư duy thiết kế",
        subtitle: "Điều phối & UX – 2025",
        color: "from-sky-900/60 to-background",
    },
];

export default function ProjectsPage() {
    const navigate = useNavigate();

    return (
        <div className="p-6 md:p-10">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-2">
                    Dự án
                </h1>
                <p className="text-muted-foreground mb-8">
                    Tuyển chọn những công việc tốt nhất
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {projects.map((project, i) => (
                        <motion.button
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate(`/project/${project.id}`)}
                            className="group text-left rounded-lg bg-card hover:bg-surface-elevated p-4 transition-colors"
                        >
                            <div
                                className={`aspect-square rounded-md bg-gradient-to-b ${project.color} mb-4 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}
                            >
                                <span className="text-4xl opacity-60">🎵</span>
                            </div>
                            <h3 className="text-foreground font-bold text-sm truncate">
                                {project.title}
                            </h3>
                            <p className="text-muted-foreground text-xs mt-1 truncate">
                                {project.subtitle}
                            </p>
                        </motion.button>
                    ))}
                </div>
                {/* Next button */}
                <div className="flex justify-end mt-10">
                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate("/thanks")}
                        className="flex items-center gap-2 h-11 px-8 rounded-full bg-spotify-green text-primary-foreground font-bold text-sm hover:bg-spotify-green-hover transition-colors"
                    >
                        Tiếp theo <ChevronRight size={18} />
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}
