import urllib.request
import re
import sys

def get_ids(query):
    url = f"https://unsplash.com/s/photos/{query}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        # match patterns like: "id":"aBcD1eF2G"
        ids = re.findall(r'"id":"([a-zA-Z0-9_-]{10,12})"', html)
        unique_ids = list(dict.fromkeys(ids))
        return unique_ids[:5]
    except Exception as e:
        print(e)
        return []

print("hotel-reception:", get_ids("hotel-reception"))
print("housekeeping:", get_ids("housekeeping"))
print("documents:", get_ids("documents"))
print("clipboard:", get_ids("clipboard"))
print("office-meeting:", get_ids("office-meeting"))
print("modern-office:", get_ids("modern-office"))
