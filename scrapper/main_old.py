import json
import uuid
import hashlib
from bs4 import BeautifulSoup

# Load the HTML file
file_path = "./WikiWeapons.html"
with open(file_path, "r", encoding="utf-8") as file:
    html = file.read()

# Hash function for SHA1 password
def hash_password(password):
    return hashlib.sha1(password.encode()).hexdigest()

# Parse the HTML
soup = BeautifulSoup(html, "html.parser")
content_div = soup.find("div", class_="mw-parser-output")

# Categories (One-Handed, Two-Handed, etc.)
category_lookup = {}  # Maps category names to IDs
weapons = []
current_category = None
category_id_counter = 1
weapon_count = 0  # Running counter

print("Processing categories and weapons...")

# Iterate through elements in the `mw-parser-output`
for element in content_div.find_all(["h2", "table"]):
    if element.name == "h2":
        # Extract category name from h2 -> span with mw-headline
        headline = element.find("span", class_="mw-headline")
        if headline:
            category_name = headline.text.strip()
            if category_name not in category_lookup:
                category_lookup[category_name] = category_id_counter
                category_id_counter += 1
            current_category = category_lookup[category_name]
            print(f"Category Found: {category_name} (ID: {current_category})")

    elif element.name == "table" and current_category is not None:
        # Extract weapon data from tables
        rows = element.find_all("tr", class_="citation")
        for row in rows:
            name_tag = row.find("a", title=True)
            if not name_tag:
                continue  # Skip if no name
            name = name_tag.text.strip()

            img_tag = row.find("img")
            image_url = "https:" + img_tag["src"] if img_tag else ""

            stats = row.find_all("td")[2:]  # Skip first two columns
            if len(stats) < 3:
                continue  # Skip rows with missing stats

            try:
                damage = int(stats[0].text.strip())
                weight = int(stats[1].text.strip())
                value = int(stats[2].text.strip())
            except ValueError:
                continue  # Skip invalid stats

            weapons.append({
                "id": str(uuid.uuid4()),  # Unique ID
                "Name": name,
                "url": image_url,
                "Damage": damage,
                "weight": weight,
                "value": value,
                "category_id": current_category  # Link to category
            })
            weapon_count += 1  # Increment weapon counter
            print(f"Processed: {name} (Total: {weapon_count})")

# JSON structure
db = {
    "user": [
        {"username": "admin", "password": hash_password("admin"), "presets": []},
        {"username": "visiteur", "password": hash_password("visiteur"), "presets": []}
    ],
    "top_10": [],
    "default_preset": [],
    "armor": { "helmet": [], "chestpiece": [], "pants": [], "boots": [], "gloves": [], "necklace": [], "ring": [] },
    "weapon": weapons,  # Parsed weapons
    "categories": category_lookup  # Category lookup table
}

# Write to db.json
output_file = "db.json"
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(db, f, indent=4, ensure_ascii=False)

print(f"\n db.json created successfully with {weapon_count} weapons and {len(category_lookup)} categories!")
