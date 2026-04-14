import { useQuery } from "@tanstack/react-query";
import { sanityClient } from "@/lib/sanity";
import { portfolioPageQuery } from "@/lib/sanityQueries";
import type { PortfolioPageData } from "@/types/sanity";

export function usePortfolioPage() {
    return useQuery<PortfolioPageData | null>({
        queryKey: ["portfolioPage"],
        queryFn: async () => {
            return sanityClient.fetch<PortfolioPageData | null>(
                portfolioPageQuery,
            );
        },
    });
}
