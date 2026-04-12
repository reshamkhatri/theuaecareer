$dest = "D:\theuaecareer\frontend\public\article-images\dubai-hotel-jobs-inline.jpg"
$url  = "https://images.unsplash.com/photo-1566073771259-a711ac538e37?auto=format&fit=crop&w=800&h=500&q=80"
$wc   = New-Object System.Net.WebClient
$wc.Headers.Add("User-Agent", "Mozilla/5.0")
$wc.DownloadFile($url, $dest)
$kb   = [math]::Round((Get-Item $dest).Length / 1024)
Write-Host "OK $kb KB"
$wc.Dispose()
