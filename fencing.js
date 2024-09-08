const { exec } = require("child_process");
const path = require("path");

const appDir = path.resolve(
  "C:/Users/moham/Documents/dock-apps/GP2(Hardware)/webapplication/fencingpi"
);

exec(`cd ${appDir} && npm start`, (error, stdout, stderr) => {
  if (error) {
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
