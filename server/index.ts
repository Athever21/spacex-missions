import express, { Response } from "express";
import template from "./template";
import path from "path";
import { promises as fs } from "fs";

const cwd = process.cwd();
const app = express();

let src = `<script src="/build/dist.js"></script>`;
if (process.env.NODE_ENV === "production") {
  src = "";
  (async () => {
    const dir = await fs.readdir(path.join(cwd, "build"));
    for (const filename of dir) {
      if (filename.includes("dist") && !filename.includes(".txt")) {
        src += `\n\t<script src="/build/${filename}"></script>`;
      }
    }
  })();
}

if (process.env.NODE_ENV === "development") {
  require("./devBundle").default(app);
}

app.use("/build/", express.static(path.join(cwd, "build")));
app.get("*", (_: any, res: Response) => {
  // @ts-ignore ?????
  return res.send(template(src));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server listening at PORT ${PORT}`));
