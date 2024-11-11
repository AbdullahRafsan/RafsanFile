const fs = require("fs");
const os = require("os");
const path = require("path");

function cd(frontendDir) {
  process.chdir(backendify(frontendDir));
  return 200;
}

// convert /Heack/Yeah/dir to ~/dir
function frontendify(dir) {
  const home = getHome();
  if (dir.startsWith(home)) {
    return fs.existsSync(dir) ? dir.replace(home, "~") : "~";
  }
  return "~/Fallback/dir";
}

function getHome() {
  return process.env.RFS_HOME;
}

// convert ~/dir to /Heack/Yeah/dir
function backendify(dir) {
  const home = getHome();
  if (dir[0] != "~" || dir[0] == "/") return home;
  const dirElements = dir.split("/");
  const distilledDirElements = dirElements.map((item) =>
    item == ".." ? "" : item
  );
  distilledDirElements[0] = home;
  const distilledPath = distilledDirElements.join("/");
  return fs.existsSync(distilledPath) ? distilledPath : home;
}

function ls(dir) {
  let ls_data = [];
  const file_path_for_listing = process.cwd();
  console.log(file_path_for_listing);
  const files = fs.readdirSync(file_path_for_listing);
  files.forEach((item) => {
    let abs_path = file_path_for_listing + "/" + item;
    let file_stat = fs.statSync(abs_path);
    let folder = file_stat.isDirectory();
    let name = item;
    let path = frontendify(abs_path);
    let size = !folder ? file_stat.size : -1;
    ls_data.push({ name, path, size, folder });
  });
  return {
    cwd: frontendify(file_path_for_listing),
    items: ls_data,
  };
}

function download(req, res) {
  const file = backendify(req.query.file);
  if (fs.existsSync(file)) {
    res.download(file);
  } else {
    res.sendStatus(404);
  }
}

function get_ip_addr() {
  let ip_addr = [];
  let device_list = os.networkInterfaces();
  for (let device in device_list) {
    let dev = device_list[device];
    if (dev == undefined) return [];
    for (let ip of dev) {
      if (ip.internal) continue;
      if (ip.family == "IPv4") {
        ip_addr.push(ip.address);
      }
    }
  }
  return ip_addr;
}

function run_stat() {
  let port = process.env.PORT || 5000;
  let localhost = `http://localhost:${port}`;
  let net_stat = get_ip_addr();
  console.log(`Server is started ! Home: ${process.env.RFS_HOME} `);
  console.log("Available at:");
  console.log(`On this device: \n\t${localhost}`);
  console.log("On local network: ");
  net_stat.forEach((ip) => {
    console.log(`\thttp://${ip}:${port}`);
  });
}

module.exports = {
  cd,
  ls,
  download,
  run_stat,
};
