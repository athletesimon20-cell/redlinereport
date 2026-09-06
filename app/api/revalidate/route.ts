import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * On-demand revalidation for Sanity content, so a Publish in the Studio shows
 * up live within seconds instead of waiting for the 5-minute time-based
 * revalidate window set on the data fetches in lib/content/products.ts.
 *
 * Wire this up (optional): in sanity.io/manage -> your project -> API ->
 * Webhooks, add a webhook to `https://yoursite.com/api/revalidate?secret=...`
 * (matching SANITY_REVALIDATE_SECRET below), triggered on "Create", "Update",
 * and "Delete" for all document types, with the URL/query string as the auth.
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  // { expire: 0 } for immediate expiration — this is called from Sanity's webhook
  // (a third-party system), not a Server Action, so updateTag() isn't an option
  // and stale-while-revalidate ("max") would still serve one stale visitor first.
  revalidateTag("reviews", { expire: 0 });
  revalidateTag("authors", { expire: 0 });
  revalidateTag("site-story", { expire: 0 });

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
