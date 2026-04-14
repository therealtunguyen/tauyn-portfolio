const gradientByToken: Record<string, string> = {
    green: "from-green-900/60 to-background",
    emerald: "from-emerald-900/60 to-background",
    teal: "from-teal-900/60 to-background",
    lime: "from-lime-900/60 to-background",
    cyan: "from-cyan-900/60 to-background",
    sky: "from-sky-900/60 to-background",
};

const fallbackGradients = Object.values(gradientByToken);
const fallbackEmojis = ["🎵", "🎧", "📣", "🚀", "🎬", "💡"];

export function getProjectCardGradient(
    cardGradient: string | undefined,
    index: number,
) {
    if (!cardGradient) {
        return fallbackGradients[index % fallbackGradients.length];
    }

    return gradientByToken[cardGradient] ?? cardGradient;
}

export function getProjectCardEmoji(
    cardEmoji: string | undefined,
    index: number,
) {
    if (cardEmoji && cardEmoji.trim()) {
        return cardEmoji;
    }

    return fallbackEmojis[index % fallbackEmojis.length];
}
