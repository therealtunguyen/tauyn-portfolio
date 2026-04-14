import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Heart, MoreHorizontal, ArrowLeft } from "lucide-react";
import { useProjectById } from "@/hooks/useProjectById";
import { getProjectCardEmoji, getProjectCardGradient } from "@/lib/projectCard";

export default function ProjectDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: project, isLoading, isError, refetch } = useProjectById(id);

    if (isLoading) {
        return (
            <div className="min-h-[calc(100vh-72px)] flex items-center justify-center text-muted-foreground">
                Đang tải chi tiết dự án...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-[calc(100vh-72px)] flex items-center justify-center p-6">
                <div className="rounded-xl border border-border bg-card p-8 text-center space-y-4 max-w-lg">
                    <h1 className="text-2xl font-black text-foreground">
                        Không thể tải dự án
                    </h1>
                    <p className="text-muted-foreground">
                        Vui lòng thử lại hoặc quay về danh sách dự án.
                    </p>
                    <div className="flex items-center justify-center gap-3">
                        <button
                            onClick={() => refetch()}
                            className="h-11 px-6 rounded-full bg-spotify-green text-primary-foreground font-bold text-sm hover:bg-spotify-green-hover transition-colors"
                        >
                            Tải lại
                        </button>
                        <button
                            onClick={() => navigate("/projects")}
                            className="h-11 px-6 rounded-full bg-surface-elevated text-foreground font-bold text-sm hover:bg-surface-elevated/80 transition-colors"
                        >
                            Về trang dự án
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-[calc(100vh-72px)] flex items-center justify-center p-6">
                <div className="rounded-xl border border-border bg-card p-8 text-center space-y-4 max-w-lg">
                    <h1 className="text-2xl font-black text-foreground">
                        Không tìm thấy dự án
                    </h1>
                    <p className="text-muted-foreground">
                        Đường dẫn này chưa trỏ tới một dự án hợp lệ.
                    </p>
                    <button
                        onClick={() => navigate("/projects")}
                        className="h-11 px-6 rounded-full bg-spotify-green text-primary-foreground font-bold text-sm hover:bg-spotify-green-hover transition-colors"
                    >
                        Về trang dự án
                    </button>
                </div>
            </div>
        );
    }

    const results = project.results ?? [];
    const subtitle = project.categoryYear || project.meta;
    const metadataLine =
        project.metadata || `${project.meta} • ${results.length} thành tựu`;
    const listHeaderLabel = project.listHeaderLabel || "KẾT QUẢ ĐẠT ĐƯỢC";
    const cardGradient = getProjectCardGradient(project.cardGradient, 0);
    const cardEmoji = getProjectCardEmoji(project.cardEmoji, 0);

    return (
        <div className="min-h-[calc(100vh-72px)] bg-linear-to-b from-[hsl(var(--surface-elevated))] via-background to-background">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Hero Banner */}
                <div className="relative h-[35vh] min-h-85 md:h-[45vh] md:min-h-110 flex items-end px-8 pb-8 pt-20 z-10 overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent z-10" />
                    <button
                        onClick={() => navigate("/projects")}
                        className="absolute top-4 left-4 z-30 w-8 h-8 rounded-full bg-background/60 flex items-center justify-center hover:bg-background/80 transition-colors"
                    >
                        <ArrowLeft size={16} className="text-foreground" />
                    </button>

                    <div className="flex flex-col md:flex-row gap-6 md:items-end relative z-20 w-full">
                        <div
                            className={`w-48 h-48 md:w-60 md:h-60 shadow-[0_4px_60px_rgba(0,0,0,.5)] shrink-0 rounded-md overflow-hidden bg-linear-to-br ${cardGradient} flex items-center justify-center`}
                        >
                            <span className="text-6xl">{cardEmoji}</span>
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className="text-sm font-bold tracking-widest text-foreground uppercase hidden md:block">
                                {subtitle}
                            </span>
                            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-foreground drop-shadow-lg leading-tight">
                                {project.title}
                            </h1>
                            <p className="mt-4 text-muted-foreground text-sm font-semibold">
                                {metadataLine}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="px-8 mt-6 relative z-20">
                    <div className="flex items-center gap-8 mb-10">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-16 h-16 bg-spotify-green hover:bg-spotify-green-hover text-primary-foreground rounded-full flex items-center justify-center transition-colors shadow-xl"
                        >
                            <Play className="w-8 h-8 fill-current ml-2" />
                        </motion.button>
                        <button className="text-muted-foreground hover:text-foreground transition">
                            <Heart className="w-10 h-10 hover:fill-current" />
                        </button>
                        <button className="text-muted-foreground hover:text-foreground transition">
                            <MoreHorizontal className="w-8 h-8" />
                        </button>
                    </div>

                    {project.description ? (
                        <div className="max-w-4xl text-muted-foreground text-lg font-medium leading-relaxed mb-12">
                            <p>{project.description}</p>
                        </div>
                    ) : null}

                    <div className="mt-8">
                        <div className="flex items-center text-muted-foreground text-sm font-semibold tracking-wider uppercase pb-2 border-b border-border mb-4 px-4 sticky top-16 bg-background/95 backdrop-blur-md z-30 pt-4">
                            <div className="w-12 text-center text-lg">#</div>
                            <div className="flex-1">{listHeaderLabel}</div>
                        </div>

                        {results.length === 0 ? (
                            <div className="text-muted-foreground px-4 py-6 rounded-md border border-border bg-card">
                                Chưa có nội dung thành tựu cho dự án này.
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                {results.map((result, index) => (
                                    <motion.div
                                        key={`${result}-${index}`}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.08 }}
                                        className="group flex items-center py-3 px-4 hover:bg-surface-elevated rounded-md transition duration-200 cursor-default"
                                    >
                                        <div className="w-12 text-center text-muted-foreground font-medium text-base group-hover:hidden">
                                            {index + 1}
                                        </div>
                                        <div className="w-12 text-center text-foreground hidden group-hover:flex justify-center">
                                            <Play className="w-4 h-4 fill-current" />
                                        </div>
                                        <div className="flex-1">
                                            <span className="text-foreground font-semibold text-base group-hover:underline">
                                                {result}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
