import os
import re

base_dir = r"C:\Users\kalas\.gemini\antigravity\scratch\optikayug_site"
html_path = os.path.join(base_dir, "index.html")

with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# Collect href, src, srcset
links = re.findall(r'(?:href|src|srcset)=["\'](\.[^"\']+)["\']', html)
css_urls = re.findall(r'url\s*\(\s*[\'"]?(\.[^\'"\)]+)[\'"]?\s*\)', html)
all_links = set(links + css_urls)

print(f"Total relative links found: {len(all_links)}")

missing = []
found = []
for l in sorted(all_links):
    clean = l.split("?")[0].split("#")[0]
    full_path = os.path.normpath(os.path.join(base_dir, clean))
    if os.path.exists(full_path):
        found.append((l, full_path))
    else:
        missing.append((l, full_path))

print(f"Successfully resolved: {len(found)} files")
if missing:
    print(f"Missing {len(missing)} files:")
    for l, p in missing:
        print(f"  FAILED: {l} -> {p}")
else:
    print(">>> 100% SUCCESS: All links in index.html resolve correctly with 0 missing files! <<<")
