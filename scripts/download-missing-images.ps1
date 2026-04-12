$outputDir = "D:\theuaecareer\frontend\public\article-images"
$headers = @{ "User-Agent" = "Mozilla/5.0" }

# Remaining missing files (cleaner + driver already done)
$missing = @(
  # hotel front desk — use a different known ID
  @{ file = "dubai-hotel-jobs-inline.jpg";  id = "1551882935-02ff2b3e5c3e"; wh = "w=800&h=500" }
  # resume on desk
  @{ file = "gulf-cv-format-hero.jpg";      id = "1632152053988-e94d3d77829b"; wh = "w=1200&h=630" }
  # man on laptop
  @{ file = "gulf-cv-format-inline.jpg";    id = "1542744094-24638eff58bb"; wh = "w=800&h=500" }
  # job interview
  @{ file = "walk-in-vs-online-inline.jpg"; id = "1758518731694-41ea7fa6a2d9"; wh = "w=800&h=500" }
)

foreach ($item in $missing) {
  $url  = "https://images.unsplash.com/photo-$($item.id)?auto=format&fit=crop&$($item.wh)&q=80"
  $dest = Join-Path $outputDir $item.file

  Write-Host "Downloading $($item.file)..."
  $wc = New-Object System.Net.WebClient
  $wc.Headers.Add("User-Agent", "Mozilla/5.0")
  try {
    $wc.DownloadFile($url, $dest)
    $kb = [math]::Round((Get-Item $dest).Length / 1024)
    Write-Host "  OK - $kb KB"
  } catch {
    Write-Host "  FAILED: $($_.Exception.Message)"
  }
  $wc.Dispose()
  Start-Sleep -Milliseconds 200
}

Write-Host ""
$all = Get-ChildItem $outputDir -Filter "*.jpg" | Sort-Object Name
Write-Host "Total JPGs: $($all.Count)"
$all | ForEach-Object {
  $kb = [math]::Round($_.Length / 1024)
  Write-Host "  $($_.Name) - $kb KB"
}
