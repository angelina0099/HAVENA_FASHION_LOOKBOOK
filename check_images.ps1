$root = Get-Location
Get-ChildItem -Filter *.html | ForEach-Object {
  $file=$_.Name; $text=Get-Content $_.FullName -Raw
  $re = [regex] '<img\s+[^>]*src="([^"]+)"'
  foreach($m in $re.Matches($text)){
    $src = $m.Groups[1].Value
    $path = Join-Path $root $src
    if(-not (Test-Path $path)){
      Write-Output "$file -> $src -> MISSING: $path"
    }
  }
}
Write-Output "Check complete"