import IDEShell from "@/components/IDEShell";
import { normalizeContent } from "@/lib/content";
import { loadContentData, loadTabConfig } from "@/lib/data";

export default async function Page() {
  const [contentData, tabConfig] = await Promise.all([loadContentData(), loadTabConfig()]);
  const normalizedContent = normalizeContent(contentData);

  return <IDEShell normalizedContent={normalizedContent} tabConfig={tabConfig} />;
}
