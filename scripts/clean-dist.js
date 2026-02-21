import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const dist = path.join(projectRoot, "dist")

try {
    await fs.rm(dist, { recursive: true, force: true })
    console.log("Removed dist/ directory")
} catch (error) {
    console.warn("dist/ directory already clean")
}
