import type { GithubFile } from "../types.js";

const REPO = "w3-kit/w3-kit";
const BRANCH = "main";
const API_BASE = `https://api.github.com/repos/${REPO}/contents`;

export async function fetchGithubDirectory(path: string): Promise<GithubFile[]> {
  const url = `${API_BASE}/${path}?ref=${BRANCH}`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "w3-kit-cli",
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch from GitHub (${response.status})`);
  }
  return response.json() as Promise<GithubFile[]>;
}

export async function fetchGithubFile(downloadUrl: string): Promise<string> {
  const response = await fetch(downloadUrl, {
    headers: { "User-Agent": "w3-kit-cli" },
  });
  if (!response.ok) {
    throw new Error(`Failed to download file (${response.status})`);
  }
  return response.text();
}

export async function fetchDirectoryRecursive(path: string): Promise<{ path: string; content: string }[]> {
  const entries = await fetchGithubDirectory(path);
  const files: { path: string; content: string }[] = [];
  for (const entry of entries) {
    if (entry.type === "file" && entry.download_url) {
      const content = await fetchGithubFile(entry.download_url);
      files.push({ path: entry.path, content });
    } else if (entry.type === "dir") {
      const nested = await fetchDirectoryRecursive(entry.path);
      files.push(...nested);
    }
  }
  return files;
}
