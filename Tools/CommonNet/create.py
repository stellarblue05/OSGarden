import json

from pathlib import Path
from datetime import datetime

data = Path(__file__).resolve().parents[2] / "main" / "src" / "Data" / "CommonnetData"

USERS  = data / "Users.json"
POSTS = data / "Posts.json"

#COPY THIS 
# cd tools\CommonNet
# py create.py


def read_json(file):
    try:
          with open(file, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
         print(e)
         return []

def save_json(file, data):
    with open(file, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)         

def create_user():

    users_data = read_json(USERS)

    print("==== Create User ====")
    print("Blank = auto")

    uid_input = input("ID (number): ")

    if uid_input:
        uid = int(uid_input)
    else:
        uid = max((user["id"] for user in users_data), default=0) + 1

    username = input("Username: ").strip()

    if not username:
        username = f"User{uid}"

    while len(username) < 3 or len(username) > 20:
        print("Username must be 3-20 characters.")
        username = input("Username: ").strip()

    name = input("Name: ").strip() or username

    username = username.replace(" ", "_")
    
    bio = input("Bio: ").strip()

    print("""
\n--- Role? ---

0. avarage joe
1. admin
2. company
3. influencer
4. news/memes
5. adult 
6. kid
7. educational
8. goverment
9. bot / scammer
           
""")
    dwag = input("> ")

    match dwag:
        case "1":
            role="admin"
        case "2":
            role="com"
        case "3":
            role="influ"
        case "4":
            role="news"
        case "5":
            role="adult"
        case "6":
            role = "kid"
        case "7":
            role = "edu"
        case "8":
            role = "gov"
        case "9":
            role = "bot" 
        case _:
            role = "avg"

    try:
        follower = int(input("Followers: ") or 0)
    except ValueError:
        follower = 0

    try:
        following = int(input("Following: ") or 0)
    except ValueError:
        following = 0

    print("Verified? (Y/N)")
    ver = input("> ")
    verified = ver.lower() in ["y", "yes", "1"]

    print("Example NewYork, USA")
    location = input(">")

    #WHAT IS THIS FOR????? WHY?????? HUHHHHHHHH
    if location is None:
        location = None

    user = {
        "id": uid,
        "n": name,
        "un": username,
        "bio": bio,
        "pfp": f"https://picsum.photos/200?random={uid}",
        "fer": follower,
        "ing": following,
        "t": datetime.now().strftime("%Y-%m-%dT%H:%M:%S"),
        "ver": verified,
        "loc": location,
        "role": role
    }

    users_data.append(user)

    save_json(USERS, users_data)

    print(f"✓ User created ({uid})")

    print("Do you want to create a post for this account? (y/n)")
    sigma_skibidi = input(">")

    joe = sigma_skibidi.lower() in ["y", "yes", "1"]

    if joe:
        create_post()
    else:
        return uid
    


def create_post():
    posts_data = read_json(POSTS)
    users_data = read_json(USERS)

    print("\n === Create Post ===")

    uid = int(input("User ID: "))
    
    valid_ids = [u["id"] for u in users_data]

    if uid not in valid_ids:
        print("\n User not found.")

        if input("Create user? (y/n): ").lower() == "y" or "1":
            uid = create_user()
        else:
            return
        
    content = input("Post Content: ")
    tag = input("Tag (Ex: #Cat #Dog type=> Cat, Dog): ")
    
    media=[]

    while True:
        add = input("\n add media? (y/n): ").lower()

        if add != "y":
            break
        else:
         print("""
== Add images ===
1. Image URL
2. Random Image
              
(Not showing, crash = URL broken)
""")
        tungtungtungsahur = input(">")

        if tungtungtungsahur == "1":
            media.append({
                "t": "img",
                "s": input("Image URL:")
            })
        elif tungtungtungsahur == "2":
            media.append({
                "t": "img",
                "s": "https://picsum.photos/200",
            }),
    
    like = int(input("Likes: ").strip() or 0)
    dislike = int(input("Dislikes: ").strip() or 0)
    shere = int(input("Share: ").strip() or 0)
    views = int(input("Views: ").strip() or 0)

    comments = []

    while True:
        MeNoNoSleep = input("\n Add comments? (y/n): ").lower()

        if MeNoNoSleep != "y":
            break
        else:
         comments.append({
            "id": len(comments) + 1,
            "uid": int(input("Comment User ID (Blank, Not real = Random): ") or 0 ),
            "c": input("Comment: "),
            "l": int(input("Likes: ") or 0),
            "t": datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
        })
        
    pid = max([p["id"] for p in posts_data], default=0) + 1



    if views < max(like, dislike):
        views = views + max(like, dislike)
    

    post = {
        "id": pid,
        "uid": uid,
        "c": content,
        "l": like,
        "dl": dislike,
        "s": shere,
        "v": views,
        "tag": tag,
        "t": datetime.now().isoformat(),
        "m": media,
        "com": comments
    }

    print("\n========== PREVIEW ==========")
    print(json.dumps(post, indent=2, ensure_ascii=False))
    print("=============================")
        
    posts_data.append(post)
    save_json(POSTS, posts_data)

    print(f"\n✓ Post {pid} saved")

#========= MENU ===========

while True:

    print("""
======== CommonNet Creator ======= 

1. Create User
2. Create Post
3. Exit 
          """)
    
    choice = input("> ")

    if choice == "1":
        create_user();
    elif choice == "2":
        create_post();
    elif choice == "3":
        break