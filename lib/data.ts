import { promises as fs } from "fs";
import path from "path";
import type { ContentData, TabConfig } from "@/lib/types";

const DATA_DIR = path.join(process.cwd(), "public", "data");

async function readJsonFile<T>(fileName: string): Promise<T> {
  const filePath = path.join(DATA_DIR, fileName);
  const buffer = await fs.readFile(filePath, "utf8");
  return JSON.parse(buffer) as T;
}

export async function loadContentData(): Promise<ContentData> {
  return readJsonFile<ContentData>("content.json");
}

export async function loadTabConfig(): Promise<TabConfig> {
  return readJsonFile<TabConfig>("tab-config.json");
}
