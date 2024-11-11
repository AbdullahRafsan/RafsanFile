import { createTableColumn, TableCellLayout } from "@fluentui/react-components";
import { FolderFilled } from "@fluentui/react-icons";
import {
  returnFileIcon,
  returnFileExtension,
  returnHumanReadableFileSize,
  returnFileType,
} from "./Tools.jsx";

export const items = [
  {
    name: "Folder.op",
    folder: true,
    size: -1,
  },
  {
    name: "FILE.ISO",
    folder: false,
    size: 4449531904,
  },
  {
    name: "File.net.rar",
    folder: false,
    size: 2529649140,
  },
  {
    name: "File.dmg",
    folder: false,
    size: 565997468,
  },
  {
    name: "file.sqlite",
    folder: false,
    size: 28672,
  },
  {
    name: "File3.mp4",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.mkv",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.pdf",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.sh",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.bat",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.gz",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.gzip",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.zip",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.cab",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.wim",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.esd",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.exe",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.dll",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.dylib",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.so",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.c",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.cpp",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.py",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.js",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.rs",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.cs",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.md",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.jpg",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.jpeg",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.bmp",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.svg",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.png",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.webm",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.mov",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.csproj",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.json",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.lock",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.jsx",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.tsx",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.ts",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.xlsx",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.docx",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.pptx",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.h",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.photolibrary",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.conf",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.ini",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.srt",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.url",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.torrent",
    folder: false,
    size: 123456,
  },
  {
    name: "File3.app",
    folder: true,
    size: -1,
  },
];

export const columns = [
  createTableColumn({
    columnId: "Name",
    compare: (a, b) => {
      return a.name.localeCompare(b.name);
    },
    renderCell: (item) => {
      return (
        <TableCellLayout
          onClick={() => {
            console.log("Clicked from rendercellMethod");
          }}
          media={returnFileIcon(returnFileExtension(item))}
        >
          {item.name}
        </TableCellLayout>
      );
    },
    renderHeaderCell: () => "Name",
  }),
  createTableColumn({
    columnId: "Size",
    compare: (a, b) => {
      return a.size - b.size;
    },
    renderCell: (item) => {
      return (
        <TableCellLayout>
          {returnHumanReadableFileSize(item.size)}
        </TableCellLayout>
      );
    },
    renderHeaderCell: () => "Size",
  }),
  createTableColumn({
    columnId: "Type",

    renderCell: (item) => {
      return (
        <TableCellLayout>
          {returnFileType(returnFileExtension(item))}
        </TableCellLayout>
      );
    },
    renderHeaderCell: () => "Type",
  }),
];

export const cwd = "~/Desktop/RafsanFile/Mock";
