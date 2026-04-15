import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { usePortfolioPage } from "@/hooks/usePortfolioPage";
import { getProjectCardEmoji, getProjectCardGradient } from "@/lib/projectCard";

export default function ProjectsPage() {
    const navigate = useNavigate();
    const { data, isLoading, isError, refetch } = usePortfolioPage();

    const projects = data?.projects ?? [];
    const heading = data?.projectsSection?.heading || "Dự án";
    const description =
        data?.projectsSection?.description ||
        "Tuyển chọn những công việc tốt nhất";
    const nextButtonLabel =
        data?.projectsSection?.nextButtonLabel || "Tiếp theo";

    if (isLoading) {
        return (
            <div className="p-6 md:p-10">
                <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-2">
                    {heading}
                </h1>
                <p className="text-muted-foreground mb-8">
                    Đang tải dữ liệu từ Sanity...
                </p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-6 md:p-10 space-y-4">
                <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                    {heading}
                </h1>
                <p className="text-muted-foreground">
                    Không thể tải dữ liệu dự án. Vui lòng thử lại.
                </p>
                <button
                    onClick={() => refetch()}
                    className="h-11 px-6 rounded-full bg-spotify-green text-primary-foreground font-bold text-sm hover:bg-spotify-green-hover transition-colors"
                >
                    Tải lại
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-10">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-2">
                    {heading}
                </h1>
                <p className="text-muted-foreground mb-8">{description}</p>

                {projects.length === 0 ? (
                    <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
                        Chưa có dự án nào được liên kết trong Portfolio Page.
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {projects.map((project, i) => (
                            <motion.button
                                key={project._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() =>
                                    navigate(`/project/${project._id}`)
                                }
                                className="group text-left rounded-lg bg-card hover:bg-surface-elevated p-4 transition-colors"
                            >
                                {project.thumbnail?.asset?.url ? (
                                    <img
                                        src={project.thumbnail.asset.url}
                                        alt={project.title}
                                        loading="lazy"
                                        decoding="async"
                                        className="aspect-square w-full rounded-md object-cover mb-4 shadow-lg group-hover:shadow-xl transition-shadow"
                                    />
                                ) : (
                                    <div
                                        className={`aspect-square rounded-md bg-linear-to-b ${getProjectCardGradient(project.cardGradient, i)} mb-4 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}
                                    >
                                        <span className="text-4xl opacity-60">
                                            {getProjectCardEmoji(
                                                project.cardEmoji,
                                                i,
                                            )}
                                        </span>
                                    </div>
                                )}
                                <h3 className="text-foreground font-bold text-sm truncate">
                                    {project.title}
                                </h3>
                                <p className="text-muted-foreground text-xs mt-1 truncate">
                                    {project.meta}
                                </p>
                            </motion.button>
                        ))}
                    </div>
                )}
                {/* Next button */}
                <div className="flex justify-end mt-10">
                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate("/thanks")}
                        className="flex items-center gap-2 h-11 px-8 rounded-full bg-spotify-green text-primary-foreground font-bold text-sm hover:bg-spotify-green-hover transition-colors"
                    >
                        {nextButtonLabel} <ChevronRight size={18} />
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}
