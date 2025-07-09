import os
import toml

MODS_DIR = "mods"
OUTPUT_FILE = "mod_list.html"



mods = []

for filename in os.listdir(MODS_DIR):
    if filename.endswith(".pw.toml"):
        path = os.path.join(MODS_DIR, filename)
        data = toml.load(path)
        name = data.get("name", filename.replace(".pw.toml", ""))

        mods.append((name))

mods.sort(key=lambda x: x[0].lower())

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    f.write("""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Minecraft Mod List</title>
<style>
body { font-family: Arial, sans-serif; background: #222; color: #eee; }
h1 { text-align: center; }
.mod-list { max-width: 700px; margin: 2em auto; }
.mod { background: #333; margin: 1em 0; padding: 1em; border-radius: 8px; }
.mod a { color: #8cf; text-decoration: none; font-weight: bold; }
.mod a:hover { text-decoration: underline; }
</style>
</head>
<body>
<h1>Minecraft Mod List</h1>
<div class="mod-list">
""")
    for name in mods:
        f.write('<div class="mod">\n')
        f.write(f'<span>{name}</span>\n')
        f.write('</div>\n')
    f.write("""
</div>
</body>
</html>
""")

print(f"Mod list generated: {OUTPUT_FILE}")