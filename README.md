# Next.js IDE Demo

This project scaffolds a Visual Studio–style interface using Next.js (App Router), Tailwind CSS, MUI, and Monaco Editor. A recursive tree view on the left drives the Monaco code editor and a configurable tabbed panel on the right.

## Getting started

```bash
pnpm install
pnpm dev
```

The demo reads content and tab metadata from `public/data/content.json` and `public/data/tab-config.json`. Selecting items in the tree loads their content into the Monaco editor and renders contextual tabs below using the configuration file.

## Tech stack

- Next.js 14 App Router + TypeScript
- Tailwind CSS for utility-first styling
- MUI v5 TreeView and layout components
- Monaco Editor via `@monaco-editor/react`
- Markdown rendering with `react-markdown`

## Project structure

```
app/
├─ layout.tsx          # Root layout and theme wiring
├─ page.tsx            # IDE shell entry point
components/
├─ BottomTabs.tsx      # Config-driven contextual tabs
├─ EditorPane.tsx      # Monaco editor wrapper
├─ IDEShell.tsx        # High-level layout shell
├─ ThemeRegistry.tsx   # MUI theme provider
└─ TreeNav.tsx         # Recursive MUI TreeView
lib/
├─ data.ts             # JSON loading + normalization helpers
└─ types.ts            # Shared TypeScript types
public/data/
├─ content.json        # Tree + file metadata
└─ tab-config.json     # Tab configuration per item type
```

Feel free to extend the content or add new tabs by updating the JSON files—no component changes are required for additional tabs as long as their IDs map to the available renderers.
