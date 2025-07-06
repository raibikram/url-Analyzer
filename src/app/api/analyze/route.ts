import { NextRequest, NextResponse } from "next/server";
import got from "got";
import * as cheerio from "cheerio";

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  if (!url || !url.startsWith("http")) {
    return NextResponse.json(
      { error: "Invalid URL. Must start with http or https." },
      { status: 400 }
    );
  }

  try {
    const start = Date.now();

    // Download the page HTML
    const htmlRes = await got(url);
    const html = htmlRes.body;

    const $ = cheerio.load(html);

    // Collect asset URLs
    let assetUrls: string[] = [];

    $("script[src]").each((_, el) => {
      const src = $(el).attr("src");
      if (src) assetUrls.push(new URL(src, url).href);
    });

    $("link[rel='stylesheet']").each((_, el) => {
      const href = $(el).attr("href");
      if (href) assetUrls.push(new URL(href, url).href);
    });

    $("img[src]").each((_, el) => {
      const src = $(el).attr("src");
      if (src) assetUrls.push(new URL(src, url).href);
    });

    // Remove duplicates
    assetUrls = [...new Set(assetUrls)];

    let totalSize = 0;

    await Promise.all(
      assetUrls.map(async (assetUrl) => {
        try {
          const res = await got(assetUrl, { method: "HEAD" });
          const sizeStr = res.headers["content-length"];
          if (sizeStr) {
            totalSize += parseInt(sizeStr, 10);
          }
        } catch (e) {
          console.log("Error:", e);
        }
      })
    );

    const end = Date.now();
    const loadTimeMs = end - start;

    return NextResponse.json({
      loadTimeMs,
      totalSizeKB: (totalSize / 1024).toFixed(2),
      numRequests: assetUrls.length,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to analyze URL. The site might block scraping." },
      { status: 500 }
    );
  }
}
