import { motion } from "framer-motion";
import { Link, Mail, Heart, Phone } from "lucide-react";
import { usePortfolioPage } from "@/hooks/usePortfolioPage";

export default function ThanksPage() {
    const { data } = usePortfolioPage();

    const heading = data?.contact?.heading || "Cảm ơn bạn";
    const body =
        data?.contact?.body ||
        "Cảm ơn bạn đã dành thời gian xem qua portfolio của mình. Mình luôn tìm kiếm những cơ hội mới để hợp tác và tạo ra những điều tuyệt vời. Hãy kết nối nhé!";
    const linkedinUrl =
        data?.contact?.linkedinUrl ||
        "https://www.linkedin.com/in/phamhoangthaouyên";
    const facebookUrl =
        data?.contact?.facebookUrl || "https://www.facebook.com/your-profile";
    const instagramUrl =
        data?.contact?.instagramUrl || "https://www.instagram.com/your-handle";
    const emailValue = data?.contact?.emailUrl || "thupam3012@gmail.com";
    const phoneValue = data?.contact?.phoneNumber || "0911579781";
    const subtext =
        data?.contact?.subtext ||
        "Được xây dựng bằng tâm huyết & gu thẩm mỹ tốt ♫";

    const emailHref = emailValue.startsWith("mailto:")
        ? emailValue
        : `mailto:${emailValue}`;

    const normalizedPhone = phoneValue.startsWith("tel:")
        ? phoneValue.slice(4)
        : phoneValue;

    const phoneHref = `tel:${normalizedPhone.replace(/\s+/g, "")}`;

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-72px)] px-6 text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-lg"
            >
                <Heart size={48} className="text-spotify-green mx-auto mb-6" />
                <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tight mb-4">
                    {heading}
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    {body}
                </p>

                <div className="flex flex-wrap justify-center gap-4 mb-10">
                    {[
                        {
                            icon: Link,
                            label: "LinkedIn",
                            href: linkedinUrl,
                        },
                        {
                            icon: Link,
                            label: "Facebook",
                            href: facebookUrl,
                        },
                        {
                            icon: Link,
                            label: "Instagram",
                            href: instagramUrl,
                        },
                        {
                            icon: Mail,
                            label: "Email",
                            href: emailHref,
                        },
                        {
                            icon: Phone,
                            label: phoneValue,
                            href: phoneHref,
                        },
                    ].map((link) => (
                        <motion.a
                            key={link.label}
                            href={link.href}
                            target={
                                link.href.startsWith("http")
                                    ? "_blank"
                                    : undefined
                            }
                            rel={
                                link.href.startsWith("http")
                                    ? "noopener noreferrer"
                                    : undefined
                            }
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 h-11 px-6 rounded-full bg-card hover:bg-surface-elevated text-foreground font-semibold text-sm transition-colors"
                        >
                            <link.icon size={18} />
                            {link.label}
                        </motion.a>
                    ))}
                </div>

                <p className="text-muted-foreground text-sm">{subtext}</p>
            </motion.div>
        </div>
    );
}
