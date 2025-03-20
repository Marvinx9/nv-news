import {
  createClient as baseCreateClient,
  type Route,
} from "@prismicio/client";
import {
  enableAutoPreviews,
  type CreateClientConfig,
} from "@prismicio/next/pages";
import sm from "../slicemachine.config.json";

export const repositoryName = sm.repositoryName;

const routes: Route[] = [{ type: "publication", path: "/pages/posts" }];

export function createClient({
  req,
  previewData,
  ...config
}: CreateClientConfig = {}) {
  const client = baseCreateClient(repositoryName, {
    routes,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    ...config,
  });

  enableAutoPreviews({ client, req, previewData });

  return client;
}
