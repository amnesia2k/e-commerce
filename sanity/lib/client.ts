import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  // for netlify deployment (process.env.VERCEL_URL for vercel)
  stega: {
    studioUrl: process.env.URL
      ? `https://${process.env.URL}/studio`
      : `${process.env.NEXT_PUBLIC_BASE_URL}/studio`,
  },
});
