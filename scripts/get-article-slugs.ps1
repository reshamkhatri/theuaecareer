$response = Invoke-WebRequest -Uri 'http://localhost:3000/blog/' -UseBasicParsing
$content = $response.Content

# Extract all blog slugs from href links
$matches = [regex]::Matches($content, 'href="/blog/([^/"]+)/')
$slugs = $matches | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique

Write-Host "Total unique article slugs found on blog page:"
Write-Host "Count: $($slugs.Count)"
Write-Host ""
$slugs | ForEach-Object { Write-Host $_ }
