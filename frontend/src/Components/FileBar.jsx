import { Title2 } from "@fluentui/react-components";
import "../Styles/FileBar.css";
import FileUpload from "./FileUpload.jsx";

export default function FileBar() {
  return (
    <div className="file_bar">
      <Title2>
        Rafsan <span className="file_bar_color_title">File</span>
      </Title2>
      <div className="file_bar_spacer"></div>
      <FileUpload />
    </div>
  );
}
