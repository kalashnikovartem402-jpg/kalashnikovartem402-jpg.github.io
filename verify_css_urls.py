import os
import re

base_dir = r"C:\Users\kalas\.gemini\antigravity\scratch\optikayug_site"
css_dir = os.path.join(base_dir, "css")

total_urls = 0
missing = []
found = []

for css_file in os.listdir(css_dir):
    if not css_file.endswith(".css"):
        continue
    css_path = os.path.join(css_dir, css_file)
    with open(css_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    urls = re.findall(r'url\s*\(\s*[\'"]?([^\'"\)]+)[\'"]?\s*\)', content)
    for u in urls:
        if u.startswith("data:"):
            continue
        total_urls += 1
        clean = u.split("?")[0].split("#")[0]
        # Resolve relative to css_dir
        resolved = os.path.normpath(os.path.join(css_dir, clean))
        if os.path.exists(resolved):
            found.append((u, resolved))
        else:
            missing.append((css_file, u, resolved))

print(f"Total CSS url() entries: {total_urls}")
print(f"Successfully resolved: {len(found)}")
if missing:
    print(f"Missing {len(missing)} entries in CSS:")
    for cf, u, p in missing[:10]:
        print(f"  [{cf}] {u} -> {p}")
else:
    print(">>> 100% SUCCESS: All CSS url(...) references resolve cleanly! <<<")
