"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Tab,
  Tabs,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import type { Item, TabConfig, TabContent, TableTabContent } from "@/lib/types";

interface BottomTabsProps {
  item?: Item;
  tabConfig: TabConfig;
}

const MissingTabMessage = ({ label }: { label: string }) => (
  <Box className="flex h-full items-center justify-center px-4 text-center">
    <Typography color="text.secondary">
      No content found for the "{label}" tab.
    </Typography>
  </Box>
);

const renderTable = (content: TableTabContent) => (
  <Paper
    elevation={0}
    sx={{
      width: "100%",
      height: "100%",
      overflow: "auto",
      backgroundColor: "transparent"
    }}
  >
    <Table size="small" stickyHeader>
      <TableHead>
        <TableRow>
          {content.columns.map((column) => (
            <TableCell
              key={column.field}
              align={column.align ?? "left"}
              sx={{ fontWeight: 600, backgroundColor: "rgba(15, 23, 42, 0.6)" }}
            >
              {column.headerName}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {content.rows.map((row, rowIndex) => (
          <TableRow key={rowIndex} hover>
            {content.columns.map((column) => (
              <TableCell key={`${rowIndex}-${column.field}`} align={column.align ?? "left"}>
                {String(row[column.field] ?? "")}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

const renderTabContent = (content: TabContent): JSX.Element => {
  switch (content.type) {
    case "markdown":
      return (
        <Box className="prose prose-invert max-w-none overflow-y-auto" sx={{ p: 2 }}>
          <ReactMarkdown>{content.content}</ReactMarkdown>
        </Box>
      );
    case "log":
    case "tree":
      return (
        <Box
          component="pre"
          sx={{
            m: 0,
            px: 2,
            py: 2,
            height: "100%",
            overflow: "auto",
            fontFamily: "'Fira Code', 'Source Code Pro', monospace",
            whiteSpace: "pre-wrap"
          }}
        >
          {content.content}
        </Box>
      );
    case "html":
      return (
        <Box
          sx={{
            px: 2,
            py: 2,
            height: "100%",
            overflow: "auto"
          }}
          dangerouslySetInnerHTML={{ __html: content.content }}
        />
      );
    case "json":
      return (
        <Box
          component="pre"
          sx={{
            m: 0,
            px: 2,
            py: 2,
            height: "100%",
            overflow: "auto",
            fontFamily: "'Fira Code', 'Source Code Pro', monospace"
          }}
        >
          {JSON.stringify(content.content, null, 2)}
        </Box>
      );
    case "table":
      return renderTable(content);
    case "text":
    default:
      return (
        <Box sx={{ px: 2, py: 2, height: "100%", overflow: "auto" }}>
          <Typography sx={{ whiteSpace: "pre-wrap" }}>{content.content}</Typography>
        </Box>
      );
  }
};

const BottomTabs = ({ item, tabConfig }: BottomTabsProps) => {
  const [activeTab, setActiveTab] = useState<string | undefined>();

  const configEntry = useMemo(() => {
    if (!item) {
      return undefined;
    }
    return tabConfig.items[item.type];
  }, [item, tabConfig]);

  useEffect(() => {
    if (!configEntry) {
      setActiveTab(undefined);
      return;
    }

    const availableTabs = configEntry.tabs.map((tab) => tab.id);
    if (activeTab && availableTabs.includes(activeTab)) {
      return;
    }

    const nextTab = configEntry.defaultTab && availableTabs.includes(configEntry.defaultTab)
      ? configEntry.defaultTab
      : availableTabs[0];
    setActiveTab(nextTab);
  }, [configEntry, activeTab]);

  if (!item || !configEntry || configEntry.tabs.length === 0) {
    return (
      <Box className="flex h-full items-center justify-center" sx={{ borderTop: "1px solid rgba(148, 163, 184, 0.2)" }}>
        <Typography color="text.secondary">
          Select an item to view contextual details.
        </Typography>
      </Box>
    );
  }

  const currentTab = configEntry.tabs.find((tab) => tab.id === activeTab) ?? configEntry.tabs[0];
  const tabContent = item.tabContents?.[currentTab.id];

  return (
    <Box display="flex" flexDirection="column" height="100%" sx={{ borderTop: "1px solid rgba(148, 163, 184, 0.2)" }}>
      <Tabs
        value={currentTab.id}
        onChange={(_event, value) => setActiveTab(value)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          minHeight: 0,
          "& .MuiTabs-indicator": {
            backgroundColor: "#6366f1"
          }
        }}
      >
        {configEntry.tabs.map((tab) => (
          <Tab
            key={tab.id}
            value={tab.id}
            label={tab.label}
            sx={{
              textTransform: "none",
              minHeight: 0,
              color: "text.secondary",
              "&.Mui-selected": {
                color: "#fff"
              }
            }}
          />
        ))}
      </Tabs>
      <Box sx={{ flex: 1, overflow: "hidden" }}>
        {tabContent ? renderTabContent(tabContent) : <MissingTabMessage label={currentTab.label} />}
      </Box>
    </Box>
  );
};

export default BottomTabs;
