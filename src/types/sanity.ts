export interface ProjectItem {
    _id: string;
    title: string;
    meta: string;
    categoryYear?: string;
    description?: string;
    metadata?: string;
    listHeaderLabel?: string;
    results?: string[];
    cardGradient?: string;
    cardEmoji?: string;
}

export interface PortfolioTabs {
    home?: string;
    profile?: string;
    projects?: string;
    contact?: string;
}

export interface ProjectsSectionLabels {
    heading?: string;
    description?: string;
    nextButtonLabel?: string;
}

export interface HeroSection {
    heading?: string;
    subheading?: string;
    inputPlaceholder?: string;
    buttonContinue?: string;
}

export interface ProfileIntroSection {
    label?: string;
    heading?: string;
    body?: string;
    buttonSkills?: string;
    buttonNext?: string;
    profileAvatar?: {
        asset?: {
            url?: string;
        };
    };
}

export interface SkillEntry {
    key?: string;
    value?: string;
}

export interface SkillsSection {
    title?: string;
    items?: SkillEntry[];
}

export interface ContactSection {
    heading?: string;
    body?: string;
    linkedinUrl?: string;
    instagramUrl?: string;
    emailUrl?: string;
    facebookUrl?: string;
    phoneNumber?: string;
    subtext?: string;
}

export interface MusicPlayerSection {
    trackTitle?: string;
    artistName?: string;
}

export interface PortfolioPageData {
    _id: string;
    tabs?: PortfolioTabs;
    hero?: HeroSection;
    profileIntro?: ProfileIntroSection;
    skills?: SkillsSection;
    projectsSection?: ProjectsSectionLabels;
    contact?: ContactSection;
    musicPlayer?: MusicPlayerSection;
    projects?: ProjectItem[];
}
