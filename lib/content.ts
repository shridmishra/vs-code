import type { ContentData, FolderItem, Item, NormalizedContent } from "@/lib/types";

export const isFolder = (item: Item): item is FolderItem => item.type === "folder";

export const buildItemMap = (root: Item): Record<string, Item> => {
  const map: Record<string, Item> = {};

  const traverse = (node: Item) => {
    map[node.id] = node;
    if (isFolder(node)) {
      node.children.forEach(traverse);
    }
  };

  traverse(root);
  return map;
};

export const normalizeContent = (content: ContentData): NormalizedContent => {
  const { root } = content;
  return {
    root,
    itemMap: buildItemMap(root)
  };
};
