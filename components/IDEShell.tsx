"use client";

import { useMemo, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import BottomTabs from "@/components/BottomTabs";
import EditorPane from "@/components/EditorPane";
import TreeNav from "@/components/TreeNav";
import type { Item, NormalizedContent, TabConfig } from "@/lib/types";
import { isFolder } from "@/lib/content";

interface IDEShellProps {
  normalizedContent: NormalizedContent;
  tabConfig: TabConfig;
}

const findInitialSelection = (root: Item): string => {
  if (!isFolder(root)) {
    return root.id;
  }

  const stack = [...root.children];
  while (stack.length) {
    const node = stack.shift();
    if (!node) continue;
    if (node.type === "file") {
      return node.id;
    }
    if (isFolder(node)) {
      stack.push(...node.children);
    }
  }

  return root.id;
};

const IDEShell = ({ normalizedContent, tabConfig }: IDEShellProps) => {
  const { root, itemMap } = normalizedContent;
  const [selectedId, setSelectedId] = useState<string>(() => findInitialSelection(root));

  const selectedItem = useMemo(() => itemMap[selectedId], [itemMap, selectedId]);

  return (
    <Box sx={{ height: "100vh", display: "flex", bgcolor: "#0f172a" }}>
      <Box
        sx={{
          flex: "0 0 20%",
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid rgba(148, 163, 184, 0.2)",
          backgroundColor: "rgba(15, 23, 42, 0.85)"
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle2" color="text.secondary" textTransform="uppercase" letterSpacing={1.2}>
            Explorer
          </Typography>
        </Box>
        <Divider sx={{ borderColor: "rgba(148, 163, 184, 0.2)" }} />
        <Box sx={{ flex: 1, overflow: "auto", px: 1 }}>
          <TreeNav root={root} selectedId={selectedId} onSelect={setSelectedId} />
        </Box>
      </Box>
      <Box sx={{ flex: "0 0 80%", display: "flex", flexDirection: "column" }}>
        <Box sx={{ flex: "0 0 80%", p: 2 }}>
          <Box sx={{ height: "100%", borderRadius: 1, border: "1px solid rgba(148, 163, 184, 0.2)", overflow: "hidden" }}>
            <EditorPane item={selectedItem} />
          </Box>
        </Box>
        <Box sx={{ flex: "0 0 20%", px: 2, pb: 2 }}>
          <Box sx={{ height: "100%", borderRadius: 1, backgroundColor: "rgba(17, 24, 39, 0.9)", border: "1px solid rgba(148, 163, 184, 0.2)", overflow: "hidden" }}>
            <BottomTabs item={selectedItem} tabConfig={tabConfig} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default IDEShell;
