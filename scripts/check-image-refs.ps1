$dir = "$PSScriptRoot\..\public\article-images"
$contentFiles = @(
  "$PSScriptRoot\..\lib\launch-content.ts",
  "$PSScriptRoot\..\lib\seo-seed-content.ts"
)

$refs = @()
foreach ($file in $contentFiles) {
  $content = Get-Content $file -Raw
  $matches = [regex]::Matches($content, '/article-images/([^"\\]+\.jpg)')
  foreach ($m in $matches) {
    $refs += $m.Groups[1].Value
  }
}

$unique = $refs | Sort-Object -Unique
Write-Host "Total unique image references: $($unique.Count)"
Write-Host ""

$missing = @()
foreach ($img in $unique) {
  $path = Join-Path $dir $img
  if (-not (Test-Path $path)) {
    Write-Host "MISSING: $img" -ForegroundColor Red
    $missing += $img
  } else {
    Write-Host "OK: $img" -ForegroundColor Green
  }
}

Write-Host ""
if ($missing.Count -eq 0) {
  Write-Host "All images present! Total: $($unique.Count)" -ForegroundColor Green
} else {
  Write-Host "Still missing $($missing.Count) images:" -ForegroundColor Red
  $missing | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
}
