Set-StrictMode -Version Latest

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RootDir = Split-Path -Parent $ScriptDir
$BuildDir = Join-Path $RootDir "build"
$DistDir = Join-Path $RootDir "dist"
$WasmOutDir = Join-Path $BuildDir "wasm"
$NamJs = Join-Path $WasmOutDir "nam.js"
$NamWasm = Join-Path $WasmOutDir "nam.wasm"

Write-Host "Building NAM multi-instance WASM module..."
Write-Host "Root directory: $RootDir"

New-Item -ItemType Directory -Force -Path $BuildDir | Out-Null
Set-Location $BuildDir

Remove-Item -Path $NamJs, $NamWasm -ErrorAction SilentlyContinue -Force

Write-Host "Configuring with Emscripten..."
& emcmake cmake $RootDir -DCMAKE_BUILD_TYPE=Release

Write-Host "Building nam target..."
& cmake --build . --target nam --config Release -j4

New-Item -ItemType Directory -Force -Path $DistDir | Out-Null

Write-Host "Copying files to dist..."
Copy-Item -Path $NamJs -Destination (Join-Path $DistDir "nam.js") -Force
Copy-Item -Path $NamWasm -Destination (Join-Path $DistDir "nam.wasm") -Force

Write-Host ""
Write-Host "Build complete!"
Write-Host "Output files:"
Write-Host "  $(Join-Path $DistDir 'nam.js')"
Write-Host "  $(Join-Path $DistDir 'nam.wasm')"
