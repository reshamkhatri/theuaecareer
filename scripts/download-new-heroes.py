import urllib.request
from bs4 import BeautifulSoup
import re
import sys
import subprocess
import os

def scrape_pexels(query):
    url = f"https://www.pexels.com/search/{urllib.parse.quote(query)}/"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        soup = BeautifulSoup(html, 'html.parser')
        imgs = soup.find_all('img')
        urls = []
        for img in imgs:
            src = img.get('src', '')
            if 'images.pexels.com/photos/' in src:
                base_url = src.split('?')[0]
                urls.append(base_url + "?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop")
        
        return list(dict.fromkeys(urls))[:2]
    except Exception as e:
        print(f"Error {query}: {e}")
        return []

tasks = {
  "driver-interview-questions-in-qatar": "driving car steering wheel POV",
  "how-to-get-uae-driving-licence-2026": "driving instructor car test highway",
  "self-introduction-for-walk-in-interview-in-uae": "job interview talking professional confidence",
  "cv-for-housekeeping-jobs-dubai-sample": "housekeeping cleaning hotel room",
  "what-to-carry-for-walk-in-interview-in-uae": "resume cv documents folder office",
  "what-to-carry-for-walk-in-interview-uae": "resume cv documents folder office",
  "documents-for-walk-in-interview-dubai": "documents contract folder office",
  "front-office-interview-questions-dubai-hotels": "hotel reception desk receptionist",
  "walk-in-interview-checklist-uae": "checklist clipboard pen tasks",
  "best-remittance-options-uae-2026": "mobile banking money transfer phone app",
  "hospitality-jobs-in-dubai-what-employers-want-2026": "restaurant waiter waitress hospitality",
  "verified-dubai-jobs-open-now-direct-employer-march-2026": "hiring recruiting office team meeting"
}

# The images that need replacing are in slugFeaturedImages
target_dir = r"d:\theuaecareer\frontend\public\article-images"

replacements = {
  "driver-interview-questions-in-qatar": "driver-qatar",
  "how-to-get-uae-driving-licence-2026": "uae-driving-licence",
  "self-introduction-for-walk-in-interview-in-uae": "self-introduction-uae",
  "cv-for-housekeeping-jobs-dubai-sample": "cv-housekeeping-dubai",
  "what-to-carry-for-walk-in-interview-in-uae": "what-to-carry-walk-in",
  "what-to-carry-for-walk-in-interview-uae": "what-to-carry-walk-in",
  "documents-for-walk-in-interview-dubai": "documents-walk-in-dubai",
  "front-office-interview-questions-dubai-hotels": "front-office-interview",
  "walk-in-interview-checklist-uae": "walk-in-interview-checklist",
  "best-remittance-options-uae-2026": "remittance-uae",
  "hospitality-jobs-in-dubai-what-employers-want-2026": "dubai-hotel-jobs",
  "verified-dubai-jobs-open-now-direct-employer-march-2026": "verified-dubai-jobs"
}

downloaded_bases = set()

for slug, keyword in tasks.items():
    base_name = replacements[slug]
    if base_name in downloaded_bases:
        continue
    
    print(f"Scraping for {base_name} ({keyword})...")
    urls = scrape_pexels(keyword)
    if len(urls) >= 2:
        hero_path = os.path.join(target_dir, f"{base_name}-hero.jpg")
        inline_path = os.path.join(target_dir, f"{base_name}-inline.jpg")
        
        try:
            print(f"Downloading {base_name}-hero.jpg...")
            urllib.request.urlretrieve(urls[0], hero_path)
            print(f"Downloading {base_name}-inline.jpg...")
            urllib.request.urlretrieve(urls[1], inline_path)
            downloaded_bases.add(base_name)
            print(f"Success for {base_name}!")
        except Exception as e:
            print(f"Download failed for {base_name}: {e}")
    else:
        print(f"Not enough images found for {keyword}")
