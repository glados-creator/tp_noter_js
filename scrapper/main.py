import os
import json
import hashlib
import uuid
import requests
from bs4 import BeautifulSoup

# Function to hash passwords (if applicable)


def hash_password(password):
    return hashlib.sha1(password.encode()).hexdigest()

# Function to create the directory for cached HTML files


def ensure_cache_dir():
    if not os.path.exists("cache"):
        os.makedirs("cache")


def get_uuid():
    return "".join(str(uuid.uuid4()).split("-")[0])

# Function to download and cache a webpage


def download_page(url):
    # Clean the URL and ensure we get a valid filename for the cache
    cache_filename = f"cache/{url.split('/')[-1].replace(':', '').replace('?', '')}.html"

    # Check if the cached file exists
    if os.path.exists(cache_filename):
        print(f"Loading cached page: {cache_filename}")
        with open(cache_filename, "r", encoding="utf-8") as file:
            return file.read()
    else:
        print(f"Downloading page: {url}")
        try:
            response = requests.get(url)
            # Check if the response was successful
            response.raise_for_status()  # Will raise an exception for 4xx/5xx responses
            content = response.text

            # Write to cache file only if the page was downloaded successfully
            with open(cache_filename, "w", encoding="utf-8") as file:
                file.write(content)

            return content
        except requests.exceptions.RequestException as e:
            # Handle any error that occurs during the request
            print(f"Error downloading {url}: {e}")
            return ""


# Define categories and their corresponding links
categories = {
    "Weapons": {
        "Swords": {"url_source": "https://en.uesp.net/wiki/Skyrim:Weapons_(All)", "id": ["Swords"]},
        "War_Axes": {"url_source": "https://en.uesp.net/wiki/Skyrim:Weapons_(All)", "id": ["War Axes"]},
        "Maces": {"url_source": "https://en.uesp.net/wiki/Skyrim:Weapons_(All)", "id": ["Maces"]},
        "Daggers": {"url_source": "https://en.uesp.net/wiki/Skyrim:Weapons_(All)", "id": ["Daggers"]},
        "Greatswords": {"url_source": "https://en.uesp.net/wiki/Skyrim:Weapons_(All)", "id": ["Greatswords"]},
        "Battleaxes": {"url_source": "https://en.uesp.net/wiki/Skyrim:Weapons_(All)", "id": ["Battleaxes"]},
        "Warhammers": {"url_source": "https://en.uesp.net/wiki/Skyrim:Weapons_(All)", "id": ["Warhammers"]},
        "Bows": {"url_source": "https://en.uesp.net/wiki/Skyrim:Weapons_(All)", "id": ["Bows"]},
        "Crossbows": {"url_source": "https://en.uesp.net/wiki/Skyrim:Weapons_(All)", "id": ["Crossbows"]},
        "Shields": {"url_source": "https://en.uesp.net/wiki/Skyrim:Armor", "id": ["Shields"]},
    },
    "Armor": {
        "helmet": {"url_source": "https://en.uesp.net/wiki/Skyrim:Armor", "id": ["helmet"]},
        "chestpiece": {"url_source": "https://en.uesp.net/wiki/Skyrim:Armor", "id": ["chestpiece"]},
        "pants": {"url_source": "https://en.uesp.net/wiki/Skyrim:Armor", "id": ["pants"]},
        "boots": {"url_source": "https://en.uesp.net/wiki/Skyrim:Armor", "id": ["boots"]},
        "gloves": {"url_source": "https://en.uesp.net/wiki/Skyrim:Armor", "id": ["gloves"]},
        "necklace": {"url_source": "https://en.uesp.net/wiki/Skyrim:Armor", "id": ["necklace"]},
        "ring": {"url_source": "https://en.uesp.net/wiki/Skyrim:Armor", "id": ["ring"]},
    }
}

# Parsing the table of weapons/armor on each category page


def parse_category_page(category_name, category_data):
    url_source = category_data['url_source']
    html = download_page(url_source)
    soup = BeautifulSoup(html, 'html.parser')

    # Progress bar setup
    # Number of tables to parse (each table = weapon/armor group)
    total_items = len(soup.find_all('table'))
    print(
        f"Parsing category: {category_name} - {total_items} items to process.")

    # Parsing the category tables
    items = []
    for idx, table in enumerate(soup.find_all('table'), start=1):
        print(f"Processing {category_name} - Item {idx}/{total_items}")
        rows = table.find_all('tr')

        for row in rows:
            # Extract weapon/armor info from each row
            name_tag = row.find("a", title=True)
            if not name_tag:
                continue  # Skip if no name

            name = name_tag.text.strip()
            img_tag = row.find("img")
            image_url = "https:" + img_tag["src"] if img_tag else ""
            stats = row.find_all("td")[2:]

            if len(stats) < 3:
                continue  # Skip rows with missing stats

            try:
                damage = int(stats[0].text.strip())
                weight = int(stats[1].text.strip())
                value = int(stats[2].text.strip())
            except ValueError:
                continue  # Skip invalid stats

            item = {
                "id": get_uuid(),  # Unique ID
                "Name": name,
                "url": image_url,
                "Damage": damage,
                "weight": weight,
                "value": value,
            }
            items.append(item)

    return items

# Main function to process categories and build JSON output


def process_categories():
    ensure_cache_dir()
    total = 0
    db = {
        "user": [
            {"username": "admin",    "password": hash_password("admin"),    "presets": [
                {
                    "id": get_uuid(),
                    "armor": [0,0,0,0,0,0,0],
                    "weapon": [0,0,0,0,0,0,0],
                    "race": "Human",
                    "wherewolf": False,
                    "vampire": False
                }
                ]},
            {"username": "visiteur", "password": hash_password("visiteur"), "presets": [
                {
                    "id": get_uuid(),
                    "armor": [0,0,0,0,0,0,0],
                    "weapon": [0,0,0,0,0,0,0],
                    "race": "Human",
                    "wherewolf": False,
                    "vampire": False
                }
            ]}
        ],
        "top_10"        : [
            {
                    "id": get_uuid(),
                    "armor": [0,0,0,0,0,0,0],
                    "weapon": [0,0,0,0,0,0,0],
                    "race": "Human",
                    "wherewolf": False,
                    "vampire": False
                }
        ],
        "categories"    : {
            "Weapons": {
                "Swords"     : "one_hand",
                "War_Axes"   : "one_hand",
                "Maces"      : "one_hand",
                "Daggers"    : "one_hand",
                "Greatswords": "two_hand",
                "Battleaxes" : "two_hand",
                "Warhammers" : "two_hand",
                "Bows"       : "archery",
                "Crossbows"  : "archery",
                "Shields"    : "one_hand",
            }
        },
        "Weapons" : {
            "Swords"     : [],
            "War_Axes"   : [],
            "Maces"      : [],
            "Daggers"    : [],
            "Greatswords": [],
            "Battleaxes" : [],
            "Warhammers" : [],
            "Bows"       : [],
            "Crossbows"  : [],
            "Shields"    : [],
        },
        "Armor" : {
            "helmet"   : [],
            "chestpiece": [],
            "pants"     : [],
            "boots"     : [],
            "gloves"    : [],
            "necklace"  : [],
            "ring"      : [],
        }
    }

    # Process each category
    for category_name, category_data in categories.items():
        print(f"\nProcessing category: {category_name}")

        for item_name, item_data in category_data.items():
            print(f"Processing item: {item_name}")
            items = parse_category_page(item_name, item_data)

            # Add parsed items to the relevant section in the db
            if category_name not in db:
                db[category_name] = {}
                print("MISSING : ", category_name)
            if item_name not in db[category_name]:
                db[category_name][item_name] = []
                print("MISSING : ", item_name)
            db[category_name][item_name] = items
            total += len(items)

    # Write the final JSON to a file
    output_file = "db.json"
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(db, f, indent=4, ensure_ascii=False)

    print(f"\nProcessed {total} items in total.")
    print(f"\n db.json created successfully!")


# Run the process
process_categories()

## TODO : FIX name "CC"
## TODO : top_10
## TODO : default_preset