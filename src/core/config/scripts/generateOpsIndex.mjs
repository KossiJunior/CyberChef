/**
 * This script automatically generates src/core/operations/index.mjs, containing
 * imports for all operations in src/core/operations.
 *
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

/* eslint no-console: ["off"] */

import path from "path";
import fs  from "fs";
import process from "process";

const dir = path.join(process.cwd() + "/src/core/config/");
if (!fs.existsSync(dir)) {
    console.log("\nCWD: " + process.cwd());
    console.log("Error: generateOpsIndex.mjs should be run from the project root");
    console.log("Example> node --experimental-modules src/core/config/scripts/generateOpsIndex.mjs");
    process.exit(1);
}

// Find all operation files
const opObjs = [];
fs.readdirSync(path.join(dir, "../operations")).forEach(file => {
    if (!file.endsWith(".mjs") || file === "index.mjs") return;
    opObjs.push(file.split(".mjs")[0]);
});

// Construct index file
let code = `/**
 * THIS FILE IS AUTOMATICALLY GENERATED BY src/core/config/scripts/generateOpsIndex.mjs
 *
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright ${new Date().getUTCFullYear()}
 * @license Apache-2.0
 */
`;

opObjs.forEach(obj => {
    code += `import ${obj} from "./${obj}.mjs";\n`;
});

code += `
export {
`;

opObjs.forEach(obj => {
    code += `    ${obj},\n`;
});

code += "};\n";

// Write file
fs.writeFileSync(
    path.join(dir, "../operations/index.mjs"),
    code
);
console.log("Written operation index.");
