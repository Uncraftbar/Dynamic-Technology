import os
import toml

MODS_DIR = "mods"
OUTPUT_FILE = "mod_list.md"

mods = []

for filename in os.listdir(MODS_DIR):
    if filename.endswith(".pw.toml"):
        path = os.path.join(MODS_DIR, filename)
        data = toml.load(path)
        name = data.get("name", filename.replace(".pw.toml", ""))
        mods.append(name)

mods.sort(key=lambda x: x.lower())

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    f.write("# Minecraft Mod List\n\n")
    for name in mods:
        f.write(f"- {name}\n")

print(f"Mod list generated: {OUTPUT_FILE}")