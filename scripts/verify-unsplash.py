import urllib.request
import urllib.parse
import re
from bs4 import BeautifulSoup

def find_verified_unsplash(query):
    try:
        q = urllib.parse.quote(f"site:unsplash.com {query}")
        url = f"https://html.duckduckgo.com/html/?q={q}"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        html = urllib.request.urlopen(req).read().decode('utf-8')
        
        matches = re.findall(r'unsplash\.com/photos/[a-zA-Z0-9-]+-([a-zA-Z0-9_-]{10,12})', html)
        if not matches:
            matches = re.findall(r'unsplash\.com/photos/([a-zA-Z0-9_-]{10,12})', html)
            
        unique = list(dict.fromkeys(matches))
        print(f"Results for '{query}':")
        for uid in unique[:3]:
            try:
                photo_url = f"https://unsplash.com/photos/{uid}"
                preq = urllib.request.Request(photo_url, headers={'User-Agent': 'Mozilla/5.0'})
                phtml = urllib.request.urlopen(preq).read().decode('utf-8')
                title_match = re.search(r'<title>(.*?)</title>', phtml)
                title = title_match.group(1) if title_match else "Unknown"
                print(f"  - ID: {uid} | Title: {title}")
            except Exception as e:
                pass
    except Exception as e:
        print(f"Error {query}: {e}")

find_verified_unsplash("hotel reception counter")
find_verified_unsplash("documents file folder desk")
find_verified_unsplash("checklist clipboard pen")
find_verified_unsplash("driver driving car steering wheel hands")
find_verified_unsplash("money transfer phone mobile banking")
find_verified_unsplash("resume cv paper desk")
find_verified_unsplash("job interview handshake office")
find_verified_unsplash("hotel room cleaning maid housekeeping")
find_verified_unsplash("job interview talking office meeting")
find_verified_unsplash("business formal confident professional portrait")
