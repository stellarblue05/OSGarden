#Check if the username colided (I use gimini for ts cuz lazy >p)
import json
import os

current_dir = os.path.dirname(os.path.abspath(__file__))
json_path = os.path.join(current_dir, "..","..","main", "src", "Data", "CommonnetData",  "Users.json")

try:
    with open(json_path, "r", encoding="utf-8") as file:
        data = json.load(file)
    
    # Extract all usernames (using the "un" key from your JSON)
    usernames = [item["un"] for item in data]
    
    # Use a set to find unique names and check for duplicates
    unique_usernames = set(usernames)
    
    if len(usernames) == len(unique_usernames):
        print("All usernames are unique! No duplicates found.")
    else:
        print("Duplicate usernames found:")
        # Print which usernames are repeated
        duplicates = set([name for name in usernames if usernames.count(name) > 1])
        print(list(duplicates))
        
except FileNotFoundError:
    print("File not found.")