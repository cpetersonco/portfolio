import * as prismic from "@prismicio/client";
// Prismic API endpoint
export const endpoint = process.env.PRISMIC_URL;

// Access Token if the repository is not public
// Generate a token in your dashboard and configure it here if your repository is private
export const accessToken = process.env.PRISMIC_TOKEN;

// Client method to query Prismic
export const client = prismic.createClient(endpoint, { accessToken });
