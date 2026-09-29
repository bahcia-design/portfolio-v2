# Servidor local só para testar (imita a Vercel: URLs sem .html, 404.html e /api/mare)
$raiz = Split-Path $PSScriptRoot -Parent
$porta = 5323
$espera = 7 * 60 * 1000
if ($env:ESPERA_MS) { $espera = [int]$env:ESPERA_MS }
$segredo = [Text.Encoding]::UTF8.GetBytes('teste-local')
$hmac = New-Object System.Security.Cryptography.HMACSHA256 (, $segredo)
function Assinar($ts) { (($hmac.ComputeHash([Text.Encoding]::UTF8.GetBytes("$ts")) | ForEach-Object { $_.ToString('x2') }) -join '').Substring(0, 32) }

$tipos = @{ '.html' = 'text/html; charset=utf-8'; '.css' = 'text/css'; '.js' = 'application/javascript'; '.png' = 'image/png'; '.jpg' = 'image/jpeg'; '.svg' = 'image/svg+xml'; '.wav' = 'audio/wav'; '.mp3' = 'audio/mpeg' }
$l = New-Object System.Net.HttpListener
$l.Prefixes.Add("http://localhost:$porta/")
$l.Start()
Write-Host "rodando em http://localhost:$porta"
while ($l.IsListening) {
  $c = $l.GetContext(); $req = $c.Request; $res = $c.Response
  $caminho = [Uri]::UnescapeDataString($req.Url.AbsolutePath)
  $status = 200; $corpo = $null; $tipo = 'text/html; charset=utf-8'
  if ($caminho -eq '/api/mare') {
    $agora = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
    $t = $req.QueryString['t']; $ok = $false
    if ($t -and $t.Contains('.')) { $p = $t.Split('.'); $ok = (Assinar $p[0]) -eq $p[1] }
    if (-not $ok) { $json = "{`"t`":`"$agora.$(Assinar $agora)`",`"p`":0}" }
    else {
      $passou = $agora - [long]$p[0]
      if ($passou -ge $espera) { $json = "{`"t`":`"$t`",`"p`":1,`"palavra`":`"portfolio`"}" }
      else { $json = "{`"t`":`"$t`",`"p`":$([string]($passou / $espera)).Replace(',', '.')}" }
    }
    $corpo = [Text.Encoding]::UTF8.GetBytes($json); $tipo = 'application/json'
  } else {
    if ($caminho -eq '/') { $caminho = '/index.html' }
    $arq = Join-Path $raiz $caminho.TrimStart('/')
    if (-not [IO.Path]::HasExtension($arq)) { $arq = "$arq.html" }
    if (-not (Test-Path $arq -PathType Leaf)) { $arq = Join-Path $raiz '404.html'; $status = 404 }
    $corpo = [IO.File]::ReadAllBytes($arq)
    $ext = [IO.Path]::GetExtension($arq); if ($tipos[$ext]) { $tipo = $tipos[$ext] }
  }
  $res.StatusCode = $status; $res.ContentType = $tipo; $res.Headers.Add('Cache-Control', 'no-store')
  $res.OutputStream.Write($corpo, 0, $corpo.Length); $res.Close()
}
