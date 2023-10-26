import { createClient } from "$lib/prismicio"

export const prerender = true

/** @type {import('./$types').EntryGenerator} */
export function entries() {
  // Ensure this list contains all the pages you want to render
  return [{ uid: "privacy" }, { uid: "terms-of-service" }]
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const client = createClient()

  const page = await client.getByUID("page", params.uid)

  return {
    page,
  }
}
