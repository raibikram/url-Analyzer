"use client";

import { useState } from "react";

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setResult(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">URL Analyzer</h1>

      <input
        className="border p-2 w-full mb-4"
        placeholder="Enter a URL (e.g. https://example.com)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={analyze}
        disabled={loading || !url}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {result && (
        <div className="mt-6 border-t pt-4">
          <p>✅ <strong>Load Time:</strong> {result.loadTimeMs} ms</p>
          <p>✅ <strong>Page Size:</strong> {result.totalSizeKB} KB</p>
          <p>✅ <strong>Number of Requests:</strong> {result.numRequests}</p>
        </div>
      )}
    </main>
  );
}
