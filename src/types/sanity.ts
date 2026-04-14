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

export interface PortfolioPageData {
    _id: string;
    tabs?: PortfolioTabs;
    projectsSection?: ProjectsSectionLabels;
    projects?: ProjectItem[];
}
