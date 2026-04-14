import { useQuery } from "@tanstack/react-query";
import { sanityClient } from "@/lib/sanity";
import { projectByIdQuery } from "@/lib/sanityQueries";
import type { ProjectItem } from "@/types/sanity";

export function useProjectById(id?: string) {
    return useQuery<ProjectItem | null>({
        queryKey: ["projectById", id],
        queryFn: async () => {
            return sanityClient.fetch<ProjectItem | null>(projectByIdQuery, {
                id,
            });
        },
        enabled: Boolean(id),
    });
}
