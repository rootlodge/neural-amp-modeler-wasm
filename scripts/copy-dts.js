import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const src = path.join(projectRoot, "src", "nam.d.ts")
const dist = path.join(projectRoot, "dist")

await fs.mkdir(dist, { recursive: true })
await fs.copyFile(src, path.join(dist, "nam.d.ts"))
console.log("Copied nam.d.ts to dist/ ")
