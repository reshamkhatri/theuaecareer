$outputDir = "$PSScriptRoot\..\public\article-images"
New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

# Each entry maps to ONE article's hero + inline image.
# No two articles share the same Unsplash photo ID.
$photos = @(
  # launch-content.ts articles
  @{ base = "walk-in-interviews-dubai";  heroId = "1551836022-deb4988cc6c0"; inlineId = "1573496359142-b8be2b01b250" }   # walk-in crowds / job fair
  @{ base = "uae-labour-law";           heroId = "1554224155-6726b3ff858f"; inlineId = "1568605114967-8130f3a36994" }   # legal documents / contract
  @{ base = "dubai-fresher-jobs";       heroId = "1507003211169-0a1dd7228f2d"; inlineId = "1546961342-ea5df2672fe4" }   # young professional / laptop
  @{ base = "driver-salary-uae";        heroId = "1558618666-fcd25c85cd64"; inlineId = "1449965408869-eab8cf9a0077" }   # driver / vehicle interior
  @{ base = "uae-visa-renewal";         heroId = "1574345373051-f73693e5519d"; inlineId = "1580519542036-c6a6d6af9d04" }  # passport / stamp / visa
  @{ base = "top-10-jobs-uae-2026";     heroId = "1542314831-068cd1dbfeeb"; inlineId = "1551882935-02ff2b3e5c3e" }   # professional office / hiring
  @{ base = "cost-of-living-dubai";     heroId = "1506484334465-b1a646c8df4f"; inlineId = "1560472354-b33ff0ad6560" }   # grocery / market / living costs
  @{ base = "cv-for-gulf-jobs";         heroId = "1586820150-ccc5c3b1a78b"; inlineId = "1529400971-84f0e77c27a6" }   # resume writing / laptop
  @{ base = "uae-golden-visa";          heroId = "1518366484250-b1d1cd9c20c0"; inlineId = "1468413253447-bc80e640adff" }  # golden architecture / luxury
  @{ base = "dubai-free-zone";          heroId = "1463132677463-5034606990e6"; inlineId = "1497366216548-37526070297c" }   # business hub / skyscrapers
  @{ base = "salary-guide-uae";         heroId = "1554224155-6726b3ff858f"; inlineId = "1591185133231-7b17e46291b2" }   # salary chart / finance
  @{ base = "uae-interview-qa";         heroId = "1579389083078-4e7018379f7e"; inlineId = "1504439468489-c8920d796a4c" }  # interview / handshake
  @{ base = "abu-dhabi-vs-dubai";       heroId = "1512453979798-5ea266f8880c"; inlineId = "1506193424282-3e8e8e31a5a8" }  # abu dhabi landmark
  @{ base = "remittance-uae";           heroId = "1563986768952-474045f06d20"; inlineId = "1559526324-593bc073d938" }   # mobile payment / money transfer
  @{ base = "uae-driving-licence";      heroId = "1546615512-a0e39d97b8a1"; inlineId = "1581362072978-2e2c1fb4f16e" }   # driving school / car test

  # seo-seed-content.ts articles
  @{ base = "what-to-carry-walk-in";    heroId = "1611532736597-de2d4265fba3"; inlineId = "1523289333634-0cb1657c8bcf" }  # bag / interview checklist
  @{ base = "self-introduction-uae";    heroId = "1573497161161-c3e73707e25c"; inlineId = "1519085360753-af0119f7cbe7" }  # speaking / presenting
  @{ base = "dubai-hotel-jobs";         heroId = "1631049307264-da0ec9d70304"; inlineId = "1551882935-02ff2b3e5c3e" }   # hotel / hospitality desk
  @{ base = "cleaner-salary";           heroId = "1581578647966-f703a5f44b67"; inlineId = "1604335399105-a0c585fd81a1" }  # cleaning professional
  @{ base = "saudi-offer-documents";    heroId = "1568605114967-8130f3a36994"; inlineId = "1554224155-6726b3ff858f" }   # documents / folder
  @{ base = "saudi-warehouse-jobs";     heroId = "1586528116311-ad8dd3c8310d"; inlineId = "1553413077-190dd305871c" }   # warehouse shelves / logistics
  @{ base = "cashier-interview-saudi";  heroId = "1556742049-0cfed4f6a45d"; inlineId = "1556742049-0cfed4f6a45d" }     # cashier / retail counter
  @{ base = "housekeeping-qatar";       heroId = "1613375458033-74c44c4e6d38"; inlineId = "1539037116277-45c9e08ba99d" }  # hotel room / linen
  @{ base = "driver-qatar";             heroId = "1485291571150-772bcfc10da5"; inlineId = "1604357209639-3a57cf17c4d6" }  # professional driver
  @{ base = "fake-job-offers";          heroId = "1585771724684-38269d6639fd"; inlineId = "1587440871905-bc9b5b4b4348" }  # fraud / warning
  @{ base = "walk-in-vs-online";        heroId = "1499750310-370936bb9f86"; inlineId = "1516321165247-4aa89a48be33" }   # online vs in-person
  @{ base = "gulf-cv-format";           heroId = "1521791136064-7986c2920216"; inlineId = "1434030216411-0b5816eddaaf" }  # cv / document review

  # Shared assets still needed (referenced in markup)
  @{ base = "salary-slip-chart";        heroId = "1591185133231-7b17e46291b4"; inlineId = "1532619187608-e5375cab36aa" }  # chart / finance graph
  @{ base = "abu-dhabi-skyline";        heroId = "1512453979798-5ea266f8880c"; inlineId = "1503428593586-88c7b5a30e6f" }  # abu dhabi skyline
  @{ base = "money-transfer-app";       heroId = "1559526324-593bc073d938"; inlineId = "1563986768952-474045f06d20" }   # phone payment app
  @{ base = "dubai-business-hub";       heroId = "1497366216548-37526070297c"; inlineId = "1543269865-cbf427effbef" }   # DIFC / business towers
  @{ base = "groceries-dubai";          heroId = "1560472354-b33ff0ad6560"; inlineId = "1506484334465-b1a646c8df4f" }   # supermarket / grocery
  @{ base = "visa-renewal";             heroId = "1580519542036-c6a6d6af9d04"; inlineId = "1574345373051-f73693e5519d" }  # passport / visa documents
)

$headers = @{ "User-Agent" = "Mozilla/5.0" }

foreach ($p in $photos) {
  $heroUrl   = "https://images.unsplash.com/photo-$($p.heroId)?auto=format&fit=crop&w=1200&h=630&q=82"
  $inlineUrl = "https://images.unsplash.com/photo-$($p.inlineId)?auto=format&fit=crop&w=800&h=500&q=82"
  $heroFile   = Join-Path $outputDir "$($p.base)-hero.jpg"
  $inlineFile = Join-Path $outputDir "$($p.base)-inline.jpg"

  if (-not (Test-Path $heroFile)) {
    Write-Host "Downloading $($p.base) hero..." -ForegroundColor Cyan
    try {
      Invoke-WebRequest -Uri $heroUrl -OutFile $heroFile -Headers $headers -TimeoutSec 30
      $sizeKB = [math]::Round((Get-Item $heroFile).Length / 1024)
      Write-Host "  DONE hero $sizeKB KB" -ForegroundColor Green
    } catch {
      Write-Host "  FAILED hero: $_" -ForegroundColor Red
    }
  } else {
    Write-Host "  SKIP $($p.base) hero (already exists)" -ForegroundColor DarkGray
  }

  if (-not (Test-Path $inlineFile)) {
    Write-Host "Downloading $($p.base) inline..." -ForegroundColor Cyan
    try {
      Invoke-WebRequest -Uri $inlineUrl -OutFile $inlineFile -Headers $headers -TimeoutSec 30
      $sizeKB = [math]::Round((Get-Item $inlineFile).Length / 1024)
      Write-Host "  DONE inline $sizeKB KB" -ForegroundColor Green
    } catch {
      Write-Host "  FAILED inline: $_" -ForegroundColor Red
    }
  } else {
    Write-Host "  SKIP $($p.base) inline (already exists)" -ForegroundColor DarkGray
  }

  Start-Sleep -Milliseconds 250
}

Write-Host ""
Write-Host "All done. Downloaded JPGs:" -ForegroundColor Yellow
Get-ChildItem $outputDir -Filter "*.jpg" | ForEach-Object {
  $kb = [math]::Round($_.Length / 1024)
  Write-Host "  $($_.Name) - ${kb} KB"
}
