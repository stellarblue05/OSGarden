#All commonnet user data here
import json
import os

current_dir = os.path.dirname(os.path.abspath(__file__))
json_path = os.path.join(current_dir, "..","..","main", "src", "Data", "CommonnetData",  "Users.json")

try:
    with open(json_path, "r", encoding="utf-8") as file:
        data = json.load(file)
    
    all_ids = [item["id"] for item in data]
    all_ids = sorted(all_ids, key=lambda x: str(x)[0])
    print("Successfully extracted IDs:", all_ids)

    counts = {}
    
    for item in data:
        digit = str(item["id"])[0]
        counts[digit] = counts.get(digit, 0) + 1
        
    for digit in sorted(counts.keys()):
        print(f"{digit} = {counts[digit]}")
except FileNotFoundError:
    print("Noob lmao") 
