import {
  CodeFilled,
  DatabaseFilled,
  DocumentJavaFilled,
  DocumentLandscapeFilled,
  DocumentPdfFilled,
  FolderFilled,
  FolderZipFilled,
  HardDriveFilled,
  ImageFilled,
  JavascriptFilled,
  VideoFilled,
} from "@fluentui/react-icons";

// File handling mathods
export function returnHumanReadableFileSize(size) {
  if (size == -1) return "";
  if (size < 1000) return `${size} Bytes`;
  else if (size < 1000000) return `${Math.round(size / 1000)} KB`;
  else if (size < 1000000000) return `${Math.round(size / 1000000)} MB`;
  else if (size < 1000000000000) return `${Math.round(size / 1000000000)} GB`;
  else if (size < 1000000000000000)
    return `${Math.round(size / 1000000000000)} TB`;
  else return "Infinity bytes";
}

export function returnFileType(ext) {
  switch (ext) {
    // Folder
    case "":
      return "Folder";
    // Office Document
    case "pdf":
      return "Adobe Acrobat Document";

    // Photo
    case "jpg":
    case "jpeg":
      return "JPEG Image";
    case "png":
      return "PNG Image";
    case "svg":
      return "Scalable Vector Graphics";

    // Video
    case "mp4":
      return "MPEG Layer 4 Video";
    case "mkv":
      return "Matroska Video";
    case "webm":
      return "Web Media Video";
    case "3gp":
      return "3GP Video";

    // Disk Images
    case "iso":
      return "CD/DVD Disk Image";
    case "qcow2":
      return "QEMU Virtual Disk";
    case "vhdx":
    case "vhd":
      return "Hyper-V Virtual Disk";
    case "vmdk":
      return "VMware Virtual Disk";
    case "dmg":
      return "MacOS Disk Image";

    // Compressed Files
    case "rar":
      return "Roshal Archive";
    case "zip":
      return "Compressed ZIP File";
    case "7z":
      return "7-Zip Archive";
    case "esd":
    case "wim":
      return "Windows Imaging Format";
    case "tar":
      return "Tarball file";
    case "xz":
      return "XZ Archive";
    case "gz":
    case "gzip":
      return "GNU Zip Archive";
    case "cab":
      return "Microsoft Cabinet Archive";

    // Development file
    case "sqlite":
      return "SQLite Databse";
    case "sh":
      return "Shell Script";
    case "bat":
      return "Batch File";
    case "ps1":
      return "PowerShell Script";
    case "md":
      return "Markdown File";
    case "xml":
      return "XML File";
    case "html":
      return "HTML Web Page";
    case "js":
      return "JavaScript Source File";
    case "java":
      return "Java Source File";

    // IDK
    default:
      return "Binary File";
  }
}

export function returnFileIcon(ext) {
  switch (ext) {
    // Folder
    case "":
      return <FolderFilled />;
    // Office Document
    case "pdf":
      return <DocumentPdfFilled />;

    // Photo
    case "jpg":
    case "jpeg":
    case "png":
    case "svg":
      return <ImageFilled />;

    // Video
    case "mp4":
    case "mkv":
    case "webm":
    case "3gp":
      return <VideoFilled />;

    // Disk Images
    case "iso":
    case "qcow2":
    case "vhdx":
    case "vhd":
    case "vmdk":
    case "dmg":
      return <HardDriveFilled />;

    // Compressed Files
    case "rar":
    case "zip":
    case "7z":
    case "esd":
    case "wim":
    case "tar":
    case "xz":
    case "gz":
    case "gzip":
    case "cab":
      return <FolderZipFilled />;

    // Development file
    case "sqlite":
      return <DatabaseFilled />;
    case "sh":
    case "bat":
    case "ps1":
    case "md":
    case "xml":
    case "html":
      return <CodeFilled />;
    case "js":
      return <JavascriptFilled />;
    case "java":
      return <DocumentJavaFilled />;

    // IDK
    default:
      return <DocumentLandscapeFilled />;
  }
}

export function returnFileExtension(file) {
  if (file.folder) return "";
  const tokens = file.name.split(".");
  return tokens[tokens.length - 1].toLowerCase();
}

// Breadcrumb methods
export function returnBreadCrumb(dir) {
  const dirs = dir.split("/");
  const bread = [];
  for (let i = 0; i < dirs.length; i++) {
    bread.push({
      label: dirs[i] == "~" ? "" : dirs[i],
      path: joinItems(dirs, "/", 0, i + 1),
    });
  }
  return bread;
}
export function handleBreadCrumbAction(path, setPath) {
  console.log(`Entered: ${path}`);
  fetch("/api/cd", {
    method: "POST",
    body: JSON.stringify({
      dir: path,
    }),
  })
    .then((d) => d.text())
    .then((d) => {
      console.log(d);
    });
  setPath(path);
}

// Utilities
function joinItems(arr, joiner, start, end) {
  let y = "";
  for (let i = start; i < end; i++) {
    y = y.concat(arr[i]);
    y = y.concat(joiner);
  }
  return y;
}
