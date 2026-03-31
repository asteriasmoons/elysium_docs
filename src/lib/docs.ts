import docsData from "./docs-data.json";

export type DocEntry = {
  slug: string[];
  content: string;
};

export async function getAllDocs(): Promise<DocEntry[]> {
  return docsData as DocEntry[];
}
