import { createClient } from "@sanity/client";

export const sanityClient = createClient({
    projectId: "samzbux6",
    dataset: "production",
    apiVersion: "2025-01-01",
    useCdn: false,
});
