$outputDir = "$PSScriptRoot\..\public\article-images"

$tasks = @(
  @{ slug = "driver-interview-questions-in-qatar"; keyword = "driver,driving,wheel" }
  @{ slug = "how-to-get-uae-driving-licence-2026"; keyword = "car,steering,test" }
  @{ slug = "self-introduction-for-walk-in-interview-in-uae"; keyword = "interview,office,applicant" }
  @{ slug = "cv-for-housekeeping-jobs-dubai-sample"; keyword = "housekeeping,cleaning,room" }
  @{ slug = "what-to-carry-for-walk-in-interview-uae"; keyword = "resume,folder,interview" }
  @{ slug = "documents-for-walk-in-interview-dubai"; keyword = "document,contract,desk" }
  @{ slug = "front-office-interview-questions-dubai-hotels"; keyword = "hotel,reception,desk" }
  @{ slug = "walk-in-interview-checklist-uae"; keyword = "checklist,clipboard,office" }
  @{ slug = "best-remittance-options-uae-2026"; keyword = "mobile,banking,app" }
  @{ slug = "hospitality-jobs-in-dubai-what-employers-want-2026"; keyword = "restaurant,waiter,hospitality" }
  @{ slug = "verified-dubai-jobs-open-now-direct-employer-march-2026"; keyword = "hiring,office,business" }
)

$replacements = @{
  "driver-interview-questions-in-qatar" = "driver-qatar"
  "how-to-get-uae-driving-licence-2026" = "uae-driving-licence"
  "self-introduction-for-walk-in-interview-in-uae" = "self-introduction-uae"
  "cv-for-housekeeping-jobs-dubai-sample" = "cv-housekeeping-dubai"
  "what-to-carry-for-walk-in-interview-uae" = "what-to-carry-walk-in"
  "documents-for-walk-in-interview-dubai" = "documents-walk-in-dubai"
  "front-office-interview-questions-dubai-hotels" = "front-office-interview"
  "walk-in-interview-checklist-uae" = "walk-in-interview-checklist"
  "best-remittance-options-uae-2026" = "remittance-uae"
  "hospitality-jobs-in-dubai-what-employers-want-2026" = "dubai-hotel-jobs"
  "verified-dubai-jobs-open-now-direct-employer-march-2026" = "verified-dubai-jobs"
}

$headers = @{ "User-Agent" = "Mozilla/5.0" }

foreach ($t in $tasks) {
  $baseName = $replacements[$t.slug]
  $keyword = $t.keyword
  
  Write-Host "Downloading for $baseName ($keyword)..." -ForegroundColor Cyan
  
  for ($i = 1; $i -le 2; $i++) {
    $suffix = if ($i -eq 1) { "hero" } else { "inline" }
    $path = Join-Path $outputDir "$baseName-$suffix.jpg"
    $url = "https://loremflickr.com/1200/630/$keyword/all?random=$i&lock=$([System.Guid]::NewGuid().ToString().Substring(0,8))"
    
    try {
      Invoke-WebRequest -Uri $url -OutFile $path -Headers $headers -TimeoutSec 30 -MaximumRedirection 10 | Out-Null
      $kb = [math]::Round((Get-Item $path).Length / 1024)
      Write-Host "  DONE $suffix ($kb KB)" -ForegroundColor Green
    } catch {
      Write-Host "  FAILED $($suffix): $_" -ForegroundColor Red
    }
  }
}
