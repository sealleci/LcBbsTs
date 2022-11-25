import { readdirSync, statSync, readFileSync, copyFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
    const src_dir = "../dist/";
    const config_path = "./config/dest.json";

    const files = readdirSync(path.join(__dirname, src_dir), { encoding: "utf-8", withFileTypes: true });
    const dest_dir = JSON.parse(readFileSync(path.join(__dirname, config_path), { encoding: "utf-8" }))["dest_dir"];

    for (let file of files) {
        const file_path = path.join(__dirname, `${src_dir}${file.name}`);
        if (statSync(file_path).isFile() && path.extname(file_path).includes("js")) {
            copyFileSync(file_path, `${dest_dir}${file.name}`);
        }
    }

    console.log(`Copied ${files.length} file${files.length > 1 ? "s" : ""}.`);
})();