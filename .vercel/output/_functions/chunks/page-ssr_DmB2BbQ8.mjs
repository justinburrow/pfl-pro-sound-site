import { createClient } from '@sanity/client';

const sanityClient = createClient(
  { "apiVersion": "v2023-08-24", "projectId": "z3u9veqi", "dataset": "production", "useCdn": false, "stega": { "studioUrl": "/admin" } }
);

globalThis.sanityClient = sanityClient;

export { sanityClient as s };
