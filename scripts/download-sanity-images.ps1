$outputDir = "$PSScriptRoot\..\public\article-images"
$headers = @{ "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }

# Download specific new images using picsum
$fixes = @(
  @{ file = "cv-housekeeping-dubai-hero.jpg"; },
  @{ file = "cv-housekeeping-dubai-inline.jpg"; },
  @{ file = "documents-walk-in-dubai-hero.jpg"; },
  @{ file = "documents-walk-in-dubai-inline.jpg"; },
  @{ file = "dubai-free-zone-comparison-hero.jpg"; },
  @{ file = "dubai-free-zone-comparison-inline.jpg"; },
  @{ file = "front-office-interview-hero.jpg"; },
  @{ file = "front-office-interview-inline.jpg"; },
  @{ file = "housekeeping-interview-hero.jpg"; },
  @{ file = "housekeeping-interview-inline.jpg"; },
  @{ file = "room-attendant-interview-hero.jpg"; },
  @{ file = "room-attendant-interview-inline.jpg"; },
  @{ file = "walk-in-interview-checklist-hero.jpg"; },
  @{ file = "walk-in-interview-checklist-inline.jpg"; },
  @{ file = "verified-dubai-jobs-hero.jpg"; },
  @{ file = "verified-dubai-jobs-inline.jpg"; }
)

foreach ($f in $fixes) {
  $path = Join-Path $outputDir $f.file
  if (Test-Path $path) {
    Write-Host "SKIP $($f.file) (already exists)" -ForegroundColor DarkGray
    continue
  }
  
  $fallbackUrl = "https://picsum.photos/1200/630?random=$([System.Guid]::NewGuid().ToString().Substring(0,8))"
  Write-Host "Downloading $($f.file)..." -ForegroundColor Cyan
  try {
    Invoke-WebRequest -Uri $fallbackUrl -OutFile $path -Headers $headers -TimeoutSec 30 -MaximumRedirection 5
    $kb = [math]::Round((Get-Item $path).Length / 1024)
    Write-Host "  DONE $kb KB" -ForegroundColor Green
  } catch {
    Write-Host "  FAILED: $_" -ForegroundColor Red
  }
  Start-Sleep -Milliseconds 200
}
