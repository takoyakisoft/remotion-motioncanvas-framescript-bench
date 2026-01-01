param(
  [int]$Runs = 10
)

$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)

function Get-Stats([double[]]$values) {
  $n = $values.Count
  $min = ($values | Measure-Object -Minimum).Minimum
  $max = ($values | Measure-Object -Maximum).Maximum
  $avg = ($values | Measure-Object -Average).Average
  $var = 0.0
  foreach ($v in $values) {
    $var += [math]::Pow($v - $avg, 2)
  }
  $std = if ($n -gt 1) { [math]::Sqrt($var / ($n - 1)) } else { 0 }

  return [pscustomobject]@{
    Runs = $n
    Min = [math]::Round($min, 2)
    Max = [math]::Round($max, 2)
    Mean = [math]::Round($avg, 2)
    StdDev = [math]::Round($std, 2)
  }
}

$configs = @(
  @{ Name = 'FrameScript Default'; Script = 'scripts\render_framescript_default.ps1' },
  @{ Name = 'FrameScript Fast'; Script = 'scripts\render_framescript_fast.ps1' }
  # @{ Name = 'Remotion Default'; Script = 'scripts\render_remotion_default.ps1' },
  # @{ Name = 'Remotion Fast'; Script = 'scripts\render_remotion_fast.ps1' },
  # @{ Name = 'Revideo Default'; Script = 'scripts\render_revideo_default.ps1' },
)

# Ensure FrameScript dev server is running before starting those runs.
$fsNeeded = $configs | Where-Object { $_.Name -like 'FrameScript*' }
if ($fsNeeded.Count -gt 0) {
  $fsReady = Test-NetConnection -ComputerName "localhost" -Port 5174 -InformationLevel Quiet
  if (-not $fsReady) {
    throw "FrameScript render dev server is not running at http://localhost:5174/render. Start it before running this script."
  }
}

$summary = @()

foreach ($config in $configs) {
  $times = @()
  $scriptPath = Join-Path $root $config.Script

  Write-Host "\n== $($config.Name) =="
  for ($i = 1; $i -le $Runs; $i += 1) {
    Write-Host "Run $i/$Runs"
    $elapsed = (Measure-Command { & $scriptPath }).TotalSeconds
    $times += [double]$elapsed
    Write-Host ("  {0:N2}s" -f $elapsed)
  }

  $stats = Get-Stats -values $times
  $summary += [pscustomobject]@{
    Name = $config.Name
    Runs = $stats.Runs
    Min = $stats.Min
    Max = $stats.Max
    Mean = $stats.Mean
    StdDev = $stats.StdDev
  }
}

Write-Host "\nSummary (seconds)"
$summary | Format-Table -AutoSize
