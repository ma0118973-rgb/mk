import type { Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

export default async (req: Request, context: Context) => {
  const store = getStore("velara-assets");
  const url = new URL(req.url);

  // Handle Image Upload
  if (req.method === "POST") {
    const contentType = req.headers.get("content-type") || "application/octet-stream";
    // Generate a unique key if filename is not unique enough or just use timestamp
    const filenameParam = url.searchParams.get("filename") || "image";
    // Sanitize filename and add timestamp
    const safeName = filenameParam.replace(/[^a-zA-Z0-9.-]/g, "_");
    const key = `${Date.now()}-${safeName}`;

    try {
      const arrayBuffer = await req.arrayBuffer();
      
      if (arrayBuffer.byteLength === 0) {
          return Response.json({ error: "Empty file" }, { status: 400 });
      }

      await store.set(key, arrayBuffer, {
        metadata: { contentType }
      });

      const publicUrl = `/.netlify/functions/media?key=${encodeURIComponent(key)}`;
      
      return Response.json({ url: publicUrl, key });
    } catch (error) {
      console.error("Upload failed:", error);
      return Response.json({ error: "Upload failed" }, { status: 500 });
    }
  }

  // Handle Image Retrieval
  if (req.method === "GET") {
    const key = url.searchParams.get("key");
    if (!key) return new Response("Missing key", { status: 400 });

    try {
      const { data, metadata } = await store.getWithMetadata(key, { type: "stream" });
      
      if (!data) {
        return new Response("Not Found", { status: 404 });
      }

      const headers = new Headers();
      if (metadata?.contentType) {
        headers.set("Content-Type", metadata.contentType);
      }
      headers.set("Cache-Control", "public, max-age=31536000, immutable");

      return new Response(data as ReadableStream, { headers });
    } catch (err) {
      console.error("Fetch failed:", err);
      return new Response("Error fetching media", { status: 500 });
    }
  }

  return new Response("Method Not Allowed", { status: 405 });
};
