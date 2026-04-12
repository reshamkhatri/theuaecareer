import urllib.request
from bs4 import BeautifulSoup
import re
import json
import sys

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
                # Remove query params to get original or set standard size
                base_url = src.split('?')[0]
                urls.append(base_url + "?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop")
        
        # also check for JSON inside script tags
        return list(dict.fromkeys(urls))[:2]
    except Exception as e:
        print(f"Error {query}: {e}")
        return []

print(scrape_pexels("hotel reception"))
print(scrape_pexels("driving car steering wheel POV"))
print(scrape_pexels("housekeeping cleaning hotel room"))
print(scrape_pexels("documents folder resume office desk"))
