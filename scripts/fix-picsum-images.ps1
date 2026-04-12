$outputDir = "$PSScriptRoot\..\public\article-images"

# Map exactly 8 specific highly-relevant existing Unsplash photos to our new 8 Sanity heroes
$copyMap = @(
  @{ source = "housekeeping-qatar-inline.jpg"; target = "cv-housekeeping-dubai-hero.jpg" }
  @{ source = "gulf-cv-format-inline.jpg"; target = "cv-housekeeping-dubai-inline.jpg" }
  
  @{ source = "saudi-offer-documents-inline.jpg"; target = "documents-walk-in-dubai-hero.jpg" }
  @{ source = "what-to-carry-walk-in-inline.jpg"; target = "documents-walk-in-dubai-inline.jpg" }
  
  @{ source = "dubai-business-hub-hero.jpg"; target = "dubai-free-zone-comparison-hero.jpg" }
  @{ source = "dubai-free-zone-inline.jpg"; target = "dubai-free-zone-comparison-inline.jpg" }
  
  @{ source = "dubai-hotel-jobs-inline.jpg"; target = "front-office-interview-hero.jpg" }
  @{ source = "uae-interview-qa-inline.jpg"; target = "front-office-interview-inline.jpg" }
  
  @{ source = "cleaner-salary-inline.jpg"; target = "housekeeping-interview-hero.jpg" }
  @{ source = "housekeeping-qatar-hero.jpg"; target = "housekeeping-interview-inline.jpg" }
  
  @{ source = "housekeeping-qatar-inline.jpg"; target = "room-attendant-interview-hero.jpg" }
  @{ source = "cleaner-salary-hero.jpg"; target = "room-attendant-interview-inline.jpg" }
  
  @{ source = "what-to-carry-walk-in-hero.jpg"; target = "walk-in-interview-checklist-hero.jpg" }
  @{ source = "gulf-cv-format-hero.jpg"; target = "walk-in-interview-checklist-inline.jpg" }
  
  @{ source = "top-10-jobs-uae-2026-hero.jpg"; target = "verified-dubai-jobs-hero.jpg" }
  @{ source = "top-10-jobs-uae-2026-inline.jpg"; target = "verified-dubai-jobs-inline.jpg" }
)

foreach ($map in $copyMap) {
  $src = Join-Path $outputDir $map.source
  $tgt = Join-Path $outputDir $map.target
  
  if (Test-Path $src) {
    Copy-Item -Path $src -Destination $tgt -Force
    Write-Host "Overwritten $($map.target) with relevant image ($($map.source))" -ForegroundColor Green
  } else {
    Write-Host "Missing source: $($map.source)" -ForegroundColor Red
  }
}
