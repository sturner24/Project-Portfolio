# Copies the newest Resume.pdf from Downloads into the site and pushes it.
# Run manually after downloading a new Resume.pdf.

$ErrorActionPreference = 'Stop'
$repo = Split-Path -Parent $PSScriptRoot
$target = Join-Path $repo 'public\Resume.pdf'
$downloads = Join-Path $env:USERPROFILE 'Downloads'
$log = Join-Path $env:LOCALAPPDATA 'portfolio-resume-sync.log'

function Write-Log($msg) {
  "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')  $msg" | Out-File -FilePath $log -Append -Encoding utf8
}

try {
  # Browsers save re-downloads as "Resume (1).pdf" if Resume.pdf already exists,
  # so take the newest of Resume.pdf / Resume (N).pdf.
  $newest = Get-ChildItem -Path $downloads -File -ErrorAction SilentlyContinue |
    Where-Object { $_.Name -match '^Resume( \(\d+\))?\.pdf$' } |
    Sort-Object LastWriteTime -Descending |
    Select-Object -First 1
  if (-not $newest) { exit 0 }

  if ((Test-Path $target) -and
      (Get-FileHash $newest.FullName).Hash -eq (Get-FileHash $target).Hash) { exit 0 }

  Copy-Item $newest.FullName $target -Force

  # Version the link so browsers don't show a cached old copy.
  $ver = (Get-FileHash $target).Hash.Substring(0, 8).ToLower()
  $index = Join-Path $repo 'public\index.html'
  $html = [IO.File]::ReadAllText($index)
  $html = $html -replace 'href="Resume\.pdf(\?v=[0-9a-f]+)?"', "href=`"Resume.pdf?v=$ver`""
  [IO.File]::WriteAllText($index, $html)

  Set-Location $repo
  git add -- public/Resume.pdf public/index.html
  git commit -q -m "Update resume" -- public/Resume.pdf public/index.html
  if ($LASTEXITCODE -ne 0) { throw "git commit failed" }
  git push -q
  if ($LASTEXITCODE -ne 0) { throw "git push failed" }
  Write-Log "Updated resume from $($newest.Name)"
}
catch {
  Write-Log "ERROR: $_"
  exit 1
}
