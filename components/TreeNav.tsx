"use client";

import { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import { TreeItem, TreeView } from "@mui/x-tree-view";
import type { FolderItem, Item } from "@/lib/types";
import { isFolder } from "@/lib/content";

interface TreeNavProps {
  root: FolderItem;
  selectedId?: string;
  onSelect: (id: string) => void;
}

const getDefaultExpanded = (root: Item): string[] => {
  const expanded: string[] = [];
  const traverse = (node: Item) => {
    if (isFolder(node)) {
      expanded.push(node.id);
      node.children.forEach(traverse);
    }
  };
  traverse(root);
  return expanded;
};

const TreeNav = ({ root, selectedId, onSelect }: TreeNavProps) => {
  const defaultExpanded = useMemo(() => getDefaultExpanded(root), [root]);

  const renderTree = (node: Item) => {
    const isDir = isFolder(node);

    return (
      <TreeItem
        key={node.id}
        itemID={node.id}
        label={<Box display="flex" alignItems="center" gap={1} py={0.5}>
          {isDir ? (
            <FolderIcon fontSize="small" className="text-blue-300" />
          ) : (
            <DescriptionIcon fontSize="small" className="text-emerald-300" />
          )}
          <Typography variant="body2">{node.name}</Typography>
        </Box>}
        sx={{
          "& .MuiTreeItem-label": {
            borderRadius: "0.375rem",
            paddingY: 0.25,
            paddingX: 0.5,
            "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
              backgroundColor: "rgba(99, 102, 241, 0.25)",
            }
          }
        }} nodeId={""}      >
        {isDir ? node.children.map(renderTree) : null}
      </TreeItem>
    );
  };

  return (
    <TreeView
      aria-label="Project navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      selected={selectedId}
      defaultExpanded={defaultExpanded}
      onNodeSelect={(_event, nodeId) => onSelect(nodeId)}
      sx={{
        flexGrow: 1,
        overflow: "auto",
        color: "inherit",
        "& .MuiTreeItem-content": {
          paddingY: 0.25
        }
      }}
    >
      {renderTree(root)}
    </TreeView>
  );
};

export default TreeNav;
