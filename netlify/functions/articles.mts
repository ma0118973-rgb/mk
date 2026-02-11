import type { Context } from "@netlify/functions";
import { getStore, getDeployStore } from "@netlify/blobs";

declare const Netlify: { env?: Record<string, string | undefined> } | undefined;

const getBlobStore = () => {
  const contextName = Netlify?.env?.CONTEXT ?? "dev";
  if (contextName === "production") {
    return getStore("velara-data", { consistency: "strong" });
  }
  return getDeployStore("velara-data");
};

const createSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const seedArticles = () => {
  const now = new Date();
  const date = now.toLocaleDateString();
  return [
    {
      id: `${now.getTime()}-1`,
      slug: createSlug("Global Briefing: The Future of Work"),
      title: "Global Briefing: The Future of Work",
      category: "News",
      content: "<p>Welcome to Velara. Fresh stories will appear here as they are published.</p>",
      date,
      author: "Editor Team",
      imageUrl:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
      likes: 0,
      views: 0,
      hashtags: "#Global #Work",
      tags: ["#Global", "#Work"],
      seoTitle: "Global Briefing: The Future of Work | VELARA",
      seoDescription: "Discover how careers and industries are evolving worldwide.",
    },
    {
      id: `${now.getTime()}-2`,
      slug: createSlug("Technology Outlook: Building in 2026"),
      title: "Technology Outlook: Building in 2026",
      category: "Technology",
      content: "<p>Explore the tools and trends shaping the next wave of innovation.</p>",
      date,
      author: "Editor Team",
      imageUrl:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200",
      likes: 0,
      views: 0,
      hashtags: "#Tech #Future",
      tags: ["#Tech", "#Future"],
      seoTitle: "Technology Outlook: Building in 2026 | VELARA",
      seoDescription: "A quick look at the platforms and ideas defining the year.",
    },
  ];
};

const readArticles = async () => {
  const store = getBlobStore();
  const existing = await store.get("articles", { type: "json" });
  if (Array.isArray(existing) && existing.length > 0) {
    return existing;
  }
  const seed = seedArticles();
  await store.setJSON("articles", seed);
  return seed;
};

export default async (req: Request, _context: Context) => {
  const store = getBlobStore();
  const url = new URL(req.url);

  if (req.method === "GET") {
    const articles = await readArticles();
    return Response.json(articles);
  }

  if (req.method === "POST") {
    const body = await req.json().catch(() => null);
    if (!body?.article) {
      return Response.json({ error: "Article payload missing." }, { status: 400 });
    }
    const articles = await readArticles();
    const updated = [body.article, ...articles];
    await store.setJSON("articles", updated);
    return Response.json(body.article, { status: 201 });
  }

  if (req.method === "PUT") {
    const body = await req.json().catch(() => null);
    if (!body?.article) {
      return Response.json({ error: "Article payload missing." }, { status: 400 });
    }
    const articles = await readArticles();
    const updated = articles.map((item) =>
      item.id === body.article.id || item.slug === body.article.slug ? body.article : item
    );
    await store.setJSON("articles", updated);
    return Response.json(body.article);
  }

  if (req.method === "DELETE") {
    const id = url.searchParams.get("id");
    if (!id) {
      return Response.json({ error: "Article id is required." }, { status: 400 });
    }
    const articles = await readArticles();
    const updated = articles.filter((item) => item.id !== id && item.slug !== id);
    await store.setJSON("articles", updated);
    return Response.json({ ok: true });
  }

  return new Response("Method Not Allowed", { status: 405 });
};
