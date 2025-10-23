"use client";

import { Box, Typography } from "@mui/material";
import Editor from "@monaco-editor/react";
import type { FileItem, Item } from "@/lib/types";
import { isFolder } from "@/lib/content";

interface EditorPaneProps {
  item?: Item;
}

const EMPTY_MESSAGE = "Select a file from the explorer to view its contents.";
const FOLDER_MESSAGE = "Folders do not have previewable content. Choose a file instead.";

const EditorPane = ({ item }: EditorPaneProps) => {
  if (!item) {
    return (
      <Box
        className="flex h-full items-center justify-center"
        sx={{ bgcolor: "rgba(15, 23, 42, 0.6)", borderRadius: 1, border: "1px solid rgba(148, 163, 184, 0.15)" }}
      >
        <Typography variant="body1" color="text.secondary">
          {EMPTY_MESSAGE}
        </Typography>
      </Box>
    );
  }

  if (isFolder(item)) {
    return (
      <Box className="h-full">
        <Editor
          key={`${item.id}-folder`}
          language="plaintext"
          value={FOLDER_MESSAGE}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: "on"
          }}
          theme="vs-dark"
          height="100%"
        />
      </Box>
    );
  }

  const file = item as FileItem;

  return (
    <Box className="h-full">
      <Editor
        key={file.id}
        language={file.language || "plaintext"}
        value={file.content}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true
        }}
        theme="vs-dark"
        height="100%"
      />
    </Box>
  );
};

export default EditorPane;
