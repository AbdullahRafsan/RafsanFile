import {
  Breadcrumb,
  BreadcrumbButton,
  BreadcrumbDivider,
  BreadcrumbItem,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
} from "@fluentui/react-components";
import { FolderFilled, HomeFilled } from "@fluentui/react-icons";

import { returnBreadCrumb, handleBreadCrumbAction } from "../Tools/Tools.jsx";
import { columns } from "../Tools/Data.jsx";

import "../Styles/FileList.css";
import { useEffect, useState } from "react";

export default function FileList() {
  const [data, setData] = useState({
    cwd: "",
    items: [],
  });
  const [path, setPath] = useState("");
  useEffect(() => {
    fetch("/api/ls")
      .then((res) => res.json())
      .then((da) => {
        setData(da);
      });
  }, [path]);

  console.log("DATA: ", data);
  return (
    <div>
      <Breadcrumb
        style={{
          margin: "15px 0px",
        }}
        size="large"
      >
        {returnBreadCrumb(data.cwd).map((item, index, arr) => (
          <>
            <BreadcrumbItem>
              <BreadcrumbButton
                onClick={() => {
                  console.log(`Entered: ${item.path}`);
                  fetch("/api/cd", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      dir: item.path,
                    }),
                  })
                    .then((d) => d.text())
                    .then((d) => {
                      console.log(d);
                    });
                  setPath(item.path);
                }}
                icon={item.label == "" ? <HomeFilled /> : <FolderFilled />}
              >
                {item.label}
              </BreadcrumbButton>
            </BreadcrumbItem>
            {index != arr.length - 1 ? <BreadcrumbDivider /> : <></>}
          </>
        ))}
      </Breadcrumb>
      <DataGrid
        sortable
        items={data.items}
        columns={columns}
        getRowId={(item) => item.name}
      >
        <DataGridHeader>
          <DataGridRow>
            {(headerCell) => (
              <DataGridHeaderCell>
                {headerCell.renderHeaderCell()}
              </DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody>
          {(row) => (
            <DataGridRow
              onClick={() => {
                if (row.item.folder) {
                  console.log(`Entered: ${row.item.path}`);
                  fetch("/api/cd", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      dir: row.item.path,
                    }),
                  })
                    .then((d) => d.text())
                    .then((d) => {
                      console.log(d);
                    });
                  setPath(row.item.path);
                } else {
                  const a = document.createElement("a");
                  a.href = `/api/download?file=${row.item.path}`;
                  a.click();
                }
              }}
              key={row.rowId}
            >
              {(cell) => (
                <DataGridCell>{cell.renderCell(row.item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </div>
  );
}
