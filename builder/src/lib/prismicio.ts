import * as prismic from "@prismicio/client"
import { enableAutoPreviews } from "@prismicio/svelte/kit"
import config from "../../slicemachine.config.json"
import { PRISMIC_ACCESS_TOKEN } from "$env/static/private"

/**
 * The project's Prismic repository name.
 */
export const repositoryName = config.repositoryName

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 *
 * @type {prismic.ClientConfig["routes"]}
 */

const routes = [
  {
    type: "page",
    path: "/:uid",
  },
]

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param {import('@prismicio/svelte/kit').CreateClientConfig} config - Configuration for the Prismic client.
 */
export const createClient = ({ cookies, ...config } = {}) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    accessToken: PRISMIC_ACCESS_TOKEN,
    ...config,
  })

  enableAutoPreviews({ client, cookies })

  return client
}
