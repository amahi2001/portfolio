"""Snap generated art onto a true pixel grid.

Run in the dev box after generating raw art into .impeccable/art-raw/:

    python3 scripts/pixelize.py RAW.png site/assets/OUT.webp --width 640 [--colors 32] [--key]

--width   native grid width in art pixels; height keeps the aspect ratio
--colors  palette size after quantising (no dithering)
--key     treat flat magenta (#FF00FF) as transparent and crop to the sprite

The result is a small lossless WebP. CSS scales it with image-rendering:
pixelated, so every art pixel stays a hard square at any screen size.
"""
import argparse

from PIL import Image

ap = argparse.ArgumentParser()
ap.add_argument('src')
ap.add_argument('dst')
ap.add_argument('--width', type=int, required=True)
ap.add_argument('--colors', type=int, default=32)
ap.add_argument('--key', action='store_true')
ap.add_argument('--despill', action='store_true', help='with --key, also drop magenta-tinted edge pixels (for dark silhouettes)')
ap.add_argument('--nocrop', action='store_true', help='with --key, keep the full canvas')
a = ap.parse_args()

im = Image.open(a.src).convert('RGBA')
if a.key:
    px = im.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, _ = px[x, y]
            if (r > 180 and b > 180 and g < 90) or (a.despill and min(r, b) - g > 35):
                px[x, y] = (0, 0, 0, 0)
    if not a.nocrop:
        im = im.crop(im.getchannel('A').point(lambda v: 255 if v else 0).getbbox())

h = round(im.height * a.width / im.width)
alpha = im.getchannel('A').resize((a.width, h), Image.BOX).point(lambda v: 255 if v >= 128 else 0)
rgb = im.convert('RGB').resize((a.width, h), Image.BOX)
rgb = rgb.quantize(colors=a.colors, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE).convert('RGB')
out = rgb.convert('RGBA')
out.putalpha(alpha)
if not a.key:
    out = out.convert('RGB')
out.save(a.dst, 'WEBP', lossless=True, quality=100, method=6)
print(f'{a.dst}: {a.width}x{h}')
