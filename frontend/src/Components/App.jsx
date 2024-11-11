import FileBar from "./FileBar.jsx";
import FileList from "./FileList.jsx";
import {
  createLightTheme,
  FluentProvider,
  createDarkTheme,
} from "@fluentui/react-components";
import "../Styles/App.css"
import { useState } from "react";

const myTheme = {
  10: "#0B0001",
  20: "#360009",
  30: "#510014",
  40: "#670018",
  50: "#7D001C",
  60: "#95001E",
  70: "#AD001E",
  80: "#C6001B",
  90: "#E00015",
  100: "#FA0005",
  110: "#FF4419",
  120: "#FF6A35",
  130: "#FF8751",
  140: "#FF9F6E",
  150: "#FFB68C",
  160: "#FFCCAB",
};

const lightTheme = {
  ...createLightTheme(myTheme),
};

const darkTheme = {
  ...createDarkTheme(myTheme),
};

darkTheme.colorBrandForeground1 = myTheme[110];
darkTheme.colorBrandForeground2 = myTheme[120];

document.documentElement.style.background = window.matchMedia("(prefers-color-scheme: light)").matches ? "#ffffff" : "#2a2a2a"

export default function App() {

  const [light, setLight] = useState(window.matchMedia("(prefers-color-scheme: light)").matches)

  const myTheme = {
    10: "#0B0001",
    20: "#360009",
    30: "#510014",
    40: "#670018",
    50: "#7D001C",
    60: "#95001E",
    70: "#AD001E",
    80: "#C6001B",
    90: "#E00015",
    100: "#FA0005",
    110: "#FF4419",
    120: "#FF6A35",
    130: "#FF8751",
    140: "#FF9F6E",
    150: "#FFB68C",
    160: "#FFCCAB",
  };
  
  const lightTheme = {
    ...createLightTheme(myTheme),
  };
  
  const darkTheme = {
    ...createDarkTheme(myTheme),
  };
  
  darkTheme.colorBrandForeground1 = myTheme[110];
  darkTheme.colorBrandForeground2 = myTheme[120];
  
  window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", (event) => {
    setLight(event.matches)
  })
  
  document.documentElement.style.background = light ? "#ffffff" : "#2a2a2a"

  return (
    <FluentProvider theme={light ? lightTheme : darkTheme}>
      <FileBar />
      <FileList />
    </ FluentProvider>
  )
}