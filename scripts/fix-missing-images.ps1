$outputDir = "$PSScriptRoot\..\public\article-images"
$headers = @{ "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }

# Use source.unsplash.com which picks a random image matching the keyword — always 200 OK
# Format: https://source.unsplash.com/1200x630/?keyword1,keyword2
$fixes = @(
  @{ file = "dubai-fresher-jobs-inline.jpg";  keywords = "job,laptop,office,young,professional" }
  @{ file = "driver-salary-uae-inline.jpg";   keywords = "delivery,van,driver,road" }
  @{ file = "top-10-jobs-uae-2026-inline.jpg"; keywords = "office,hiring,business,team" }
  @{ file = "cost-of-living-dubai-inline.jpg"; keywords = "grocery,supermarket,shopping,food" }
  @{ file = "cv-for-gulf-jobs-inline.jpg";    keywords = "resume,career,writing,desk" }
  @{ file = "uae-golden-visa-inline.jpg";     keywords = "architecture,golden,luxury,building" }
  @{ file = "dubai-free-zone-hero.jpg";       keywords = "skyscraper,business,city,tower" }
  @{ file = "uae-interview-qa-inline.jpg";    keywords = "interview,handshake,professional,meeting" }
  @{ file = "abu-dhabi-vs-dubai-inline.jpg";  keywords = "skyline,city,waterfront,gulf" }
  @{ file = "remittance-uae-hero.jpg";        keywords = "mobile,banking,phone,money,transfer" }
  @{ file = "uae-driving-licence-inline.jpg"; keywords = "driving,car,road,vehicle" }
  @{ file = "visa-renewal-hero.jpg";          keywords = "passport,travel,documents,visa" }
)

foreach ($f in $fixes) {
  $path = Join-Path $outputDir $f.file
  if (Test-Path $path) {
    Write-Host "SKIP $($f.file) (already exists)" -ForegroundColor DarkGray
    continue
  }
  $url = "https://source.unsplash.com/1200x630/?$($f.keywords)"
  Write-Host "Downloading $($f.file)..." -ForegroundColor Cyan
  try {
    # source.unsplash.com does a redirect to the actual image
    $response = Invoke-WebRequest -Uri $url -OutFile $path -Headers $headers -TimeoutSec 60 -MaximumRedirection 10
    $kb = [math]::Round((Get-Item $path).Length / 1024)
    Write-Host "  DONE $kb KB" -ForegroundColor Green
  } catch {
    Write-Host "  FAILED: $_" -ForegroundColor Red
    # Try fallback: picsum.photos which is always reliable
    $fallbackUrl = "https://picsum.photos/1200/630?random=$([System.Guid]::NewGuid().ToString().Substring(0,8))"
    Write-Host "  Trying picsum fallback..." -ForegroundColor Yellow
    try {
      Invoke-WebRequest -Uri $fallbackUrl -OutFile $path -Headers $headers -TimeoutSec 30 -MaximumRedirection 5
      $kb = [math]::Round((Get-Item $path).Length / 1024)
      Write-Host "  DONE (picsum) $kb KB" -ForegroundColor Green
    } catch {
      Write-Host "  FALLBACK ALSO FAILED: $_" -ForegroundColor Red
    }
  }
  Start-Sleep -Milliseconds 500
}

Write-Host ""
Write-Host "Total JPGs:" -ForegroundColor Yellow
(Get-ChildItem $outputDir -Filter "*.jpg").Count
