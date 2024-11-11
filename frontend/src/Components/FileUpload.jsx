import { useEffect, useRef, useState } from "react";
import {
  Body1,
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Image,
  ProgressBar,
  Subtitle1,
  Subtitle2,
} from "@fluentui/react-components";
import { CloudArrowUpFilled, DismissFilled } from "@fluentui/react-icons";

import FileUploadBG from "../Assets/FileUploadBG.svg";
import "../Styles/FileUpload.css";
import { returnHumanReadableFileSize } from "../Tools/Tools.jsx";

export default function FileUpload() {
  const [upload, setUpload] = useState(undefined);
  const uploadRef = useRef();
  uploadRef.current = upload;
  const [progress, setProgress] = useState(0);

  function handleBrowseOrCancel() {
    if (upload != undefined) {
      setUpload(undefined);
    } else {
      console.log("File browse requested !");
      let fileInput = document.getElementById("file");
      fileInput.value = null;
      fileInput.click();
      fileInput.onchange = () => {
        let file = fileInput.files.item(0);
        console.log(file.name, " selected !");
        setUpload(file);
      };
    }
  }

  function handleUpload() {
    if (uploadRef.current == undefined) {
      console.log("user canceled, returning");
      return;
    }

    const f = async function () {
      const fileInput = document.getElementById("file");
      const file = fileInput.files.item(0);
      const formData = new FormData();
      const xhr = new XMLHttpRequest();
      formData.append("file", file);
      xhr.overrideMimeType(file.type);
      xhr.open("POST", "/api/upload");
      console.log(file.name, " Uploading...");

      xhr.upload.addEventListener("error", (event) => {
        xhr.abort();
        setUpload(undefined);
      });
      xhr.upload.addEventListener(
        "progress",
        (e) => {
          if (uploadRef.current == undefined) {
            xhr.abort();
            return;
          }
          if (e.lengthComputable) {
            const per = Math.round((e.loaded * 100) / e.total);
            setProgress(per);
          }
        },
        false
      );
      xhr.upload.addEventListener(
        "load",
        (e) => {
          window.location.reload();
        },
        false
      );
      xhr.send(formData);
    };
    f();
  }

  useEffect(handleUpload, [upload]);

  return (
    <div>
      <form className="file_upload_form">
        <input id="file" name="file" type="file" />
      </form>
      <Dialog modalType="alert">
        <DialogTrigger disableButtonEnhancement>
          <Button icon={<CloudArrowUpFilled />} appearance="primary">
            Upload
          </Button>
        </DialogTrigger>
        <DialogSurface>
          <DialogBody>
            <DialogTitle
              action={
                <DialogTrigger action="close">
                  <Button
                    appearance="subtle"
                    aria-label="close"
                    icon={<DismissFilled />}
                  />
                </DialogTrigger>
              }
              style={{
                display: "flex",
              }}
              as="div"
            >
              <Subtitle2>
                Upload <span className="file_bar_color_title">File</span>
              </Subtitle2>
            </DialogTitle>
            <DialogContent>
              {upload != undefined ? (
                <div className="file_upload_uploading">
                  <div className="info">
                    <Subtitle1 align="center">{upload.name}</Subtitle1>
                    <Body1>{returnHumanReadableFileSize(upload.size)}</Body1>
                  </div>
                  <ProgressBar
                    className="progress"
                    thickness="large"
                    value={progress}
                    max={100}
                  />
                </div>
              ) : (
                <Image src={FileUploadBG} className="file_upload_box" />
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleBrowseOrCancel} appearance="primary">
                {upload != undefined ? "Cancel" : "Browse"}
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  );
}
