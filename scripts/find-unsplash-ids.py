import urllib.request
import urllib.parse
import re

def search_unsplash_ids(query):
    try:
        q = urllib.parse.quote(f"site:unsplash.com/photos {query}")
        url = f"https://html.duckduckgo.com/html/?q={q}"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        html = urllib.request.urlopen(req).read().decode('utf-8')
        
        # Look for unsplash.com/photos/ URLs and extract the ID at the end
        matches = re.findall(r'unsplash\.com/photos/[a-zA-Z0-9-]+-([a-zA-Z0-9_-]{10,12})', html)
        if not matches:
            matches = re.findall(r'unsplash\.com/photos/([a-zA-Z0-9_-]{10,12})', html)
            
        unique = list(dict.fromkeys(matches))
        return unique[:3]
    except Exception as e:
        print(f"Error {query}: {e}")
        return []

print("hotel reception:", search_unsplash_ids("hotel reception desk"))
print("documents:", search_unsplash_ids("documents folder office"))
print("checklist:", search_unsplash_ids("checklist clipboard"))
print("driving in uae:", search_unsplash_ids("driving car steering wheel"))
print("remittance:", search_unsplash_ids("mobile banking money transfer"))
print("hospitality:", search_unsplash_ids("restaurant waiter waitress hotel"))
print("hiring:", search_unsplash_ids("job interview hiring office"))
print("cleaning:", search_unsplash_ids("cleaning hotel room"))
