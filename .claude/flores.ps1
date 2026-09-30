# Gera imagens PROVISÓRIAS da fase do jardim (ela vai trocar pela arte dela)
Add-Type -AssemblyName System.Drawing
$pasta = Split-Path $PSScriptRoot -Parent
New-Item -ItemType Directory -Force $pasta | Out-Null
$jpg = [Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$par = New-Object Drawing.Imaging.EncoderParameters 1
$par.Param[0] = New-Object Drawing.Imaging.EncoderParameter ([Drawing.Imaging.Encoder]::Quality, [long]90)

function Nova { $b = New-Object Drawing.Bitmap 800, 600; $g = [Drawing.Graphics]::FromImage($b); $g.SmoothingMode = 'AntiAlias'; $g.TextRenderingHint = 'AntiAliasGridFit'; $g.Clear([Drawing.Color]::FromArgb(250, 244, 234)); return @($b, $g) }
function Salvar($b, $nome) { $b.Save((Join-Path $pasta $nome), $jpg, $par); $b.Dispose() }
$tinta = New-Object Drawing.Pen ([Drawing.Color]::FromArgb(30, 30, 36)), 5

function Caule($g, $x) { $g.DrawLine($tinta, $x, 560, $x, 330); $g.DrawBezier($tinta, $x, 470, $x - 50, 440, $x - 70, 470, $x, 490) }

# flower.jpg: três brotinhos fechados
$b, $g = Nova
foreach ($x in 250, 400, 550) { Caule $g $x; $g.FillEllipse([Drawing.Brushes]::White, $x - 22, 280, 44, 60); $g.DrawEllipse($tinta, $x - 22, 280, 44, 60) }
Salvar $b 'flowerbud.jpg'

function Flor($g, $colorida) {
  Caule $g 400
  $cores = '#e8575a', '#f29f4b', '#f5d547', '#6cc27a', '#4aa6d8', '#9a6ad6'
  for ($i = 0; $i -lt 6; $i++) {
    $a = $i * [Math]::PI / 3; $cx = 400 + 95 * [Math]::Cos($a); $cy = 250 + 95 * [Math]::Sin($a)
    if ($colorida) { $g.FillEllipse((New-Object Drawing.SolidBrush ([Drawing.ColorTranslator]::FromHtml($cores[$i]))), $cx - 70, $cy - 70, 140, 140) }
    else { $g.FillEllipse([Drawing.Brushes]::White, $cx - 70, $cy - 70, 140, 140) }
    $g.DrawEllipse($tinta, $cx - 70, $cy - 70, 140, 140)
  }
  $g.FillEllipse([Drawing.Brushes]::White, 300, 150, 200, 200); $g.DrawEllipse($tinta, 300, 150, 200, 200)
}
function Palavra($g, $texto) {
  $f = New-Object Drawing.Font 'Georgia', 32, ([Drawing.FontStyle]::Bold)
  $fmt = New-Object Drawing.StringFormat; $fmt.Alignment = 'Center'; $fmt.LineAlignment = 'Center'
  $g.DrawString($texto, $f, (New-Object Drawing.SolidBrush ([Drawing.Color]::FromArgb(30, 30, 36))), (New-Object Drawing.RectangleF 300, 150, 200, 200), $fmt)
}

# color.jpg: flor colorida (armadilha, sem texto)
$b, $g = Nova; Flor $g $true; Salvar $b 'color.jpg'
# blank.jpg: flor sem cor (leva pra fase 2)
$b, $g = Nova; Flor $g $false; Salvar $b 'blank.jpg'
Write-Host 'ok'
