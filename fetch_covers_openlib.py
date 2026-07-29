import urllib.request
import urllib.parse
import os
import re

script_path = "script.js"
with open(script_path, "r", encoding="utf-8") as f:
    content = f.read()

os.makedirs("images", exist_ok=True)

lines = content.split('\n')
for line in lines:
    if 'title: "' in line:
        title_match = re.search(r'title:\s*"([^"]+)"', line)
        if title_match:
            title = title_match.group(1)
            filename = re.sub(r'[^a-z0-9]', '-', title.lower()) + ".jpg"
            filepath = os.path.join("images", filename)
            
            if not os.path.exists(filepath):
                query = urllib.parse.quote(title.lower())
                url = f"https://covers.openlibrary.org/b/title/{query}-M.jpg?default=false"
                try:
                    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
                    with urllib.request.urlopen(req) as response:
                        with open(filepath, 'wb') as out_file:
                            out_file.write(response.read())
                        print(f"Saved {filepath}")
                except Exception as e:
                    print(f"Failed to download {title}: {e}")

print("Done Open Library fetch.")
