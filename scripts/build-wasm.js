import path from "node:path"
import { fileURLToPath } from "node:url"
import { spawnSync } from "node:child_process"

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const wasmDir = path.join(projectRoot, "wasm")

const platform = process.platform
const windowsFirst = platform === "win32"
const scriptName = windowsFirst ? "build-nam.ps1" : "build-nam.bash"
const scriptPath = path.join(wasmDir, scriptName)
const runner = windowsFirst ? "powershell" : "bash"
const args = windowsFirst
    ? ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", scriptPath]
    : [scriptPath]

console.log(`Platform-aware wasm build: running ${scriptName} via ${runner}`)

const result = spawnSync(runner, args, { stdio: "inherit" })
if (result.error) {
    console.error("Failed to start wasm builder", result.error)
    process.exit(1)
}
if (result.status !== 0) {
    process.exit(result.status ?? 1)
}
