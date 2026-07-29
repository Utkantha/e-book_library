import urllib.request
import urllib.parse
import json
import re
import os
import time

script_path = "script.js"
with open(script_path, "r", encoding="utf-8") as f:
    content = f.read()

os.makedirs("images", exist_ok=True)

def get_cover_url(title):
    query = urllib.parse.quote(title)
    url = f"https://www.googleapis.com/books/v1/volumes?q=intitle:{query}&maxResults=1"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            if "items" in data and len(data["items"]) > 0:
                item = data["items"][0]
                if "volumeInfo" in item and "imageLinks" in item["volumeInfo"]:
                    # Get high res if possible, else thumbnail
                    links = item["volumeInfo"]["imageLinks"]
                    return links.get("thumbnail") or links.get("smallThumbnail")
    except Exception as e:
        print(f"Error fetching {title}: {e}")
    return None

lines = content.split('\n')
new_lines = []
for line in lines:
    if 'title: "' in line and 'image:' not in line:
        title_match = re.search(r'title:\s*"([^"]+)"', line)
        if title_match:
            title = title_match.group(1)
            filename = re.sub(r'[^a-z0-9]', '-', title.lower()) + ".jpg"
            filepath = os.path.join("images", filename)
            
            if not os.path.exists(filepath):
                print(f"Fetching cover for {title}...")
                cover_url = get_cover_url(title)
                if cover_url:
                    cover_url = cover_url.replace("http://", "https://")
                    try:
                        urllib.request.urlretrieve(cover_url, filepath)
                        print(f"Saved {filepath}")
                    except Exception as e:
                        print(f"Failed to download {cover_url}: {e}")
                else:
                    print(f"No cover found for {title}")
                time.sleep(0.5)
            
            # Inject image path into the JS object
            line = line.replace('title: "', f'image: "images/{filename}", title: "')
    new_lines.append(line)

with open(script_path, "w", encoding="utf-8") as f:
    f.write('\n'.join(new_lines))

print("Done updating script.js with images.")
