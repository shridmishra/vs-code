export type TabContentType =
  | "text"
  | "markdown"
  | "log"
  | "tree"
  | "table"
  | "html"
  | "json";

export interface TextTabContent {
  type: "text" | "markdown" | "log" | "tree" | "html";
  content: string;
}

export interface TableColumn {
  field: string;
  headerName: string;
  align?: "left" | "right" | "center";
}

export type TableRow = Record<string, string | number | boolean | null>;

export interface TableTabContent {
  type: "table";
  columns: TableColumn[];
  rows: TableRow[];
}

export interface JsonTabContent {
  type: "json";
  content: unknown;
}

export type TabContent = TextTabContent | TableTabContent | JsonTabContent;

export type TabContentMap = Record<string, TabContent>;

export interface BaseItem {
  id: string;
  name: string;
  type: "folder" | "file";
  tabContents?: TabContentMap;
}

export interface FileItem extends BaseItem {
  type: "file";
  language: string;
  content: string;
  path?: string;
}

export interface FolderItem extends BaseItem {
  type: "folder";
  children: Item[];
}

export type Item = FileItem | FolderItem;

export interface ContentData {
  root: FolderItem;
}

export interface TabDefinition {
  id: string;
  label: string;
  description?: string;
}

export interface TabConfigEntry {
  defaultTab?: string;
  tabs: TabDefinition[];
}

export interface TabConfig {
  items: Record<Item["type"], TabConfigEntry>;
}

export interface NormalizedContent {
  root: FolderItem;
  itemMap: Record<string, Item>;
}
