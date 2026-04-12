$brainDir = "C:\Users\Resham KC\.gemini\antigravity\brain\91960493-4ef4-447a-81b6-f01d39ccccbc"
$targetDir = "d:\theuaecareer\frontend\public\article-images"

$mapping = @(
    # 1. Driver in Qatar & Driving Licence
    @{ src = "driver_qatar_1775973005405.png"; dests = @("driver-qatar-hero.png", "driver-qatar-inline.png", "uae-driving-licence-hero.png", "uae-driving-licence-inline.png") }
    
    # 2. Self Intro
    @{ src = "self_intro_1775973023971.png"; dests = @("self-introduction-uae-hero.png", "self-introduction-uae-inline.png") }
    
    # 3. What to carry & Checklist
    @{ src = "what_to_carry_1775973075660.png"; dests = @("what-to-carry-walk-in-hero.png", "what-to-carry-walk-in-inline.png", "walk-in-interview-checklist-hero.png", "walk-in-interview-checklist-inline.png") }
    
    # 4. CV for Housekeeping
    @{ src = "cv_housekeeping_1775973100119.png"; dests = @("cv-housekeeping-dubai-hero.png", "cv-housekeeping-dubai-inline.png") }
    
    # 5. Front Office & Hospitality jobs
    @{ src = "front_office_reception_1775973139843.png"; dests = @("front-office-interview-hero.png", "front-office-interview-inline.png", "dubai-hotel-jobs-hero.png", "dubai-hotel-jobs-inline.png") }
    
    # 6. Documents Walk In & Verified Jobs
    @{ src = "documents_contract_1775973396402.png"; dests = @("documents-walk-in-dubai-hero.png", "documents-walk-in-dubai-inline.png", "verified-dubai-jobs-hero.png", "verified-dubai-jobs-inline.png") }
)

foreach ($map in $mapping) {
    $srcPath = Join-Path $brainDir $map.src
    if (Test-Path $srcPath) {
        foreach ($d in $map.dests) {
            $destPath = Join-Path $targetDir $d
            Copy-Item -Path $srcPath -Destination $destPath -Force
            Write-Host "Copied $($map.src) to $d" -ForegroundColor Green
        }
    } else {
        Write-Host "Source not found: $($map.src)" -ForegroundColor Red
    }
}
