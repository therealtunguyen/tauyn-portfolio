import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Heart, MoreHorizontal, Clock, ArrowLeft } from "lucide-react";

const projectData: Record<
    string,
    {
        title: string;
        subtitle: string;
        description: string;
        tracks: { title: string; duration: string }[];
    }
> = {
    "campus-fest": {
        title: "Lễ hội âm nhạc Campus",
        subtitle: "Marketing & Sự kiện – 2025",
        description:
            "Dẫn dắt chiến lược marketing toàn diện cho lễ hội âm nhạc quy mô lớn trong khuôn viên trường, phối hợp với nhiều tổ chức sinh viên và quản lý mọi hoạt động quảng bá từ ý tưởng đến thực thi.",
        tracks: [
            {
                title: "Xây dựng chiến lược marketing sự kiện toàn diện",
                duration: "3:42",
            },
            { title: "Phối hợp với 12 tổ chức sinh viên", duration: "4:15" },
            {
                title: "Quản lý chiến dịch truyền thông (5K+ tiếp cận)",
                duration: "2:58",
            },
            {
                title: "Thiết kế tài liệu quảng cáo và poster",
                duration: "3:20",
            },
            {
                title: "Tổ chức hậu cần ngày diễn ra cho 500+ người tham dự",
                duration: "5:01",
            },
        ],
    },
    "brand-launch": {
        title: "Chiến dịch ra mắt thương hiệu",
        subtitle: "Chiến lược truyền thông – 2025",
        description:
            "Xây dựng và triển khai ra mắt thương hiệu toàn diện trên nhiều nền tảng xã hội, tăng mức độ tương tác của khán giả và thiết lập bản sắc hình ảnh nhất quán.",
        tracks: [
            {
                title: "Xây dựng bộ nhận diện thương hiệu và hướng dẫn sử dụng",
                duration: "4:10",
            },
            {
                title: "Sản xuất kế hoạch nội dung cho 3 nền tảng mạng xã hội",
                duration: "3:33",
            },
            {
                title: "Tăng lượng người theo dõi lên 40% trong vòng 2 tháng",
                duration: "2:45",
            },
            {
                title: "Điều phối quan hệ đối tác với các KOLs/Influencers",
                duration: "3:55",
            },
        ],
    },
    "charity-gala": {
        title: "Đêm tiệc Gala Từ thiện",
        subtitle: "Tổ chức sự kiện – 2024",
        description:
            "Lên kế hoạch và thực hiện đêm gala từ thiện trang trọng cho 200 khách mời, quản lý tài trợ, nhà cung cấp và giải trí để vượt mục tiêu gây quỹ.",
        tracks: [
            {
                title: "Lên kế hoạch toàn diện cho gala 200 khách",
                duration: "5:22",
            },
            { title: "Huy động tài trợ tổng cộng $5,000", duration: "3:10" },
            {
                title: "Quản lý tiệc, âm thanh ánh sáng và giải trí",
                duration: "4:05",
            },
            { title: "Gây quỹ vượt mục tiêu 30%", duration: "2:50" },
        ],
    },
    "digital-marketing": {
        title: "Tăng tốc Marketing Kỹ thuật số",
        subtitle: "Phân tích & Nội dung – 2024",
        description:
            "Thực hiện chiến dịch marketing kỹ thuật số tập trung tối ưu hóa phễu chuyển đổi thông qua A/B testing, phân tích dữ liệu và sáng tạo nội dung SEO.",
        tracks: [
            {
                title: "Chạy A/B testing cho chiến dịch email",
                duration: "3:15",
            },
            {
                title: "Phân tích dữ liệu người dùng để tối ưu chuyển đổi",
                duration: "4:30",
            },
            { title: "Sáng tạo nội dung blog tối ưu SEO", duration: "3:48" },
            {
                title: "Xây dựng báo cáo phân tích hàng tháng",
                duration: "2:55",
            },
        ],
    },
    "podcast-series": {
        title: "Chuỗi Podcast sinh viên",
        subtitle: "Sản xuất & Thương hiệu – 2024",
        description:
            "Sản xuất trọn bộ 10 tập podcast từ ý tưởng đến phát hành, phụ trách sản xuất âm thanh, xây dựng thương hiệu và phát triển khán giả.",
        tracks: [
            { title: "Sản xuất mùa 10 tập", duration: "4:20" },
            {
                title: "Thiết kế ảnh bìa và tài sản thương hiệu",
                duration: "3:05",
            },
            {
                title: "Biên tập và mastering toàn bộ âm thanh",
                duration: "5:10",
            },
            {
                title: "Phát triển lượng nghe đạt 1,200 lượt tải",
                duration: "2:40",
            },
        ],
    },
    "design-workshop": {
        title: "Hội thảo Tư duy thiết kế",
        subtitle: "Điều phối & UX – 2025",
        description:
            "Điều phối các hội thảo tư duy thiết kế cho nhiều đối tượng tham gia, phát triển chương trình và dẫn dắt các buổi brainstorm và prototype thực hành.",
        tracks: [
            {
                title: "Điều phối hội thảo cho 40 người tham gia",
                duration: "4:45",
            },
            {
                title: "Phát triển chương trình và tài liệu hoạt động",
                duration: "3:30",
            },
            {
                title: "Dẫn dắt các buổi brainstorm và prototype",
                duration: "3:55",
            },
            { title: "Thu thập phản hồi và cải tiến format", duration: "2:35" },
        ],
    },
};

export default function ProjectDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const project = projectData[id || ""];

    if (!project) {
        navigate("/projects");
        return null;
    }

    return (
        <div className="min-h-[calc(100vh-72px)] bg-gradient-to-b from-[hsl(var(--surface-elevated))] via-background to-background">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Hero Banner */}
                <div className="relative h-[35vh] min-h-[340px] md:h-[45vh] md:min-h-[440px] flex items-end px-8 pb-8 pt-20 z-10 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
                    <button
                        onClick={() => navigate("/projects")}
                        className="absolute top-4 left-4 z-30 w-8 h-8 rounded-full bg-background/60 flex items-center justify-center hover:bg-background/80 transition-colors"
                    >
                        <ArrowLeft size={16} className="text-foreground" />
                    </button>

                    <div className="flex flex-col md:flex-row gap-6 md:items-end relative z-20 w-full">
                        <div className="w-48 h-48 md:w-60 md:h-60 shadow-[0_4px_60px_rgba(0,0,0,.5)] flex-shrink-0 rounded-md overflow-hidden bg-gradient-to-br from-spotify-green/30 to-spotify-green/5 flex items-center justify-center">
                            <span className="text-6xl">🎵</span>
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className="text-sm font-bold tracking-widest text-foreground uppercase hidden md:block">
                                {project.subtitle}
                            </span>
                            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-foreground drop-shadow-lg leading-tight">
                                {project.title}
                            </h1>
                            <div className="flex items-center gap-2 mt-4 text-muted-foreground text-sm font-semibold">
                                <span className="text-foreground">
                                    Phạm Hoàng Thảo Uyên
                                </span>
                                <span className="w-1 h-1 bg-muted-foreground rounded-full mx-1" />
                                <span>2025</span>
                                <span className="w-1 h-1 bg-muted-foreground rounded-full mx-1" />
                                <span>{project.tracks.length} thành tựu</span>
                            </div>
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

                    <div className="max-w-4xl text-muted-foreground text-lg font-medium leading-relaxed mb-12">
                        <p>{project.description}</p>
                    </div>

                    <div className="mt-8">
                        <div className="flex items-center text-muted-foreground text-sm font-semibold tracking-wider uppercase pb-2 border-b border-border mb-4 px-4 sticky top-16 bg-background/95 backdrop-blur-md z-30 pt-4">
                            <div className="w-12 text-center text-lg">#</div>
                            <div className="flex-1">KẾT QUẢ ĐẠT ĐƯỢC</div>
                            <div className="w-24 text-right flex justify-end">
                                <Clock className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            {project.tracks.map((track, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.08 }}
                                    className="group flex items-center py-3 px-4 hover:bg-surface-elevated rounded-md transition duration-200 cursor-default"
                                >
                                    <div className="w-12 text-center text-muted-foreground font-medium text-base group-hover:hidden">
                                        {index + 1}
                                    </div>
                                    <div className="w-12 text-center text-foreground hidden group-hover:flex justify-center">
                                        <Play className="w-4 h-4 fill-current cursor-pointer" />
                                    </div>
                                    <div className="flex-1">
                                        <span className="text-foreground font-semibold text-base group-hover:underline cursor-pointer">
                                            {track.title}
                                        </span>
                                    </div>
                                    <div className="w-24 text-right text-muted-foreground text-sm font-medium">
                                        {track.duration}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
