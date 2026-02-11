import type { Context } from "@netlify/functions";
import { getStore, getDeployStore } from "@netlify/blobs";

declare const Netlify: { env?: Record<string, string | undefined> } | undefined;

const getBlobStore = () => {
  return getStore("velara-data");
};

const seedJobs = () => {
  const date = new Date().toLocaleDateString();
  return [
    {
      id: "job-1",
      title: "Software Engineer",
      company: "Tech Corp",
      location: "Remote",
      type: "Full-time",
      salaryRange: "$100k-$150k",
      postedDate: date,
      source: "Verified",
    },
    {
      id: "job-2",
      title: "Product Manager",
      company: "Biz Inc",
      location: "New York",
      type: "Full-time",
      salaryRange: "$120k-$180k",
      postedDate: date,
      source: "Verified",
    },
  ];
};

const readJobs = async () => {
  const store = getBlobStore();
  const existing = await store.get("jobs", { type: "json" });
  if (Array.isArray(existing) && existing.length > 0) {
    return existing;
  }
  const seed = seedJobs();
  await store.setJSON("jobs", seed);
  return seed;
};

export default async (req: Request, _context: Context) => {
  const store = getBlobStore();
  const url = new URL(req.url);

  if (req.method === "GET") {
    const jobs = await readJobs();
    return Response.json(jobs);
  }

  if (req.method === "POST") {
    const body = await req.json().catch(() => null);
    if (!body?.job) {
      return Response.json({ error: "Job payload missing." }, { status: 400 });
    }
    const jobs = await readJobs();
    const updated = [body.job, ...jobs];
    await store.setJSON("jobs", updated);
    return Response.json(body.job, { status: 201 });
  }

  if (req.method === "DELETE") {
    const id = url.searchParams.get("id");
    if (!id) {
      return Response.json({ error: "Job id is required." }, { status: 400 });
    }
    const jobs = await readJobs();
    const updated = jobs.filter((item) => item.id !== id);
    await store.setJSON("jobs", updated);
    return Response.json({ ok: true });
  }

  return new Response("Method Not Allowed", { status: 405 });
};
