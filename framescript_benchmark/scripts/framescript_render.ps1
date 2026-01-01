$repoRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$renderDir = Join-Path $repoRoot "render"
$mode = if ($args.Count -gt 0) { $args[0].ToLowerInvariant() } else { "fast" }
$cpuCount = [int]$env:NUMBER_OF_PROCESSORS
$cpuCount = if ($cpuCount -gt 0) { $cpuCount } else { 1 }
$workersFast = [Math]::Max($cpuCount, 1)
$workersDefault = [Math]::Max([int][Math]::Floor($cpuCount / 2), 1)

$fps = 60
$durationSeconds = [double]$env:BENCH_DURATION_SECONDS
if (-not [double]::IsFinite($durationSeconds) -or $durationSeconds -le 0) {
  $durationSeconds = 120
}
$durationFrames = [int]([Math]::Round($fps * $durationSeconds))

$renderArgs = if ($mode -eq "default") {
  "1920:1080:${fps}:${durationFrames}:${workersDefault}:H264:medium"
} else {
  "1920:1080:${fps}:${durationFrames}:${workersFast}:H264:ultrafast"
}

$env:RENDER_DEV_SERVER_URL = "http://localhost:5174/render"
$env:RENDER_PROGRESS_URL = "http://127.0.0.1:3000/render_progress"
$env:RENDER_CANCEL_URL = "http://127.0.0.1:3000/is_canceled"
$env:RENDER_RESET_URL = "http://127.0.0.1:3000/reset"
$env:RENDER_AUDIO_PLAN_URL = "http://127.0.0.1:3000/render_audio_plan"

$ready = $false
for ($i = 0; $i -lt 60; $i += 1) {
  if (Test-NetConnection -ComputerName "localhost" -Port 5174 -InformationLevel Quiet) {
    $ready = $true
    break
  }
  Start-Sleep -Seconds 1
}

if (-not $ready) {
  throw "framescript render dev server did not start (http://localhost:5174/render)"
}

Write-Host "Mode: $mode"
Write-Host "Render args: $renderArgs"

Push-Location $renderDir
try {
  Measure-Command {
    cargo run --release -- $renderArgs
  } | Select-Object TotalSeconds
} finally {
  Pop-Location
}
