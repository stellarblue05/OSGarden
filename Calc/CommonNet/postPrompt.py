from config import all_ids
import sys

count = 20


sys.stdout.reconfigure(encoding='utf-8')

Prompt = f"""
You are generating a realistic dataset of fictional social-media users in JSON format.

Generate exactly {count} posts. And post often with comments 

JSON structure:

[
  {{
    "id": <post id>,
    "uid": <user id>,
    "c": <content>,
    "l": <like>,
    "dl": <dislike>,
    "v": <views>,
    "s": <dislike>,
     "m": [
      {{
        "t": "img", only img for now
        "s": "https://picsum.photos/800/600?random=12"
      }}
    ] OPTIONAL ,
    "t": "2026-03-02T12:00:00" <post time>,
    "tag": "#Cat ect..." (start with # one word no space can be multiple),
    "ps": optional (what you want me to add in media , image)
      "com": [
      {{
        "id": <comment id>,
        "uid": <commented user id>,
        "c": <comment content>,
        "l": <like>,
        "t": "2026-06-05T19:03:00" <comment time>
      }}
    ]
  }}
]

USER ID Rules:
    In first digit
- 1xx = Admin (always verified)
- 2xx = Company (often verified)
- 3xx = Influencer (often verified)
- 4xx = Meme
- 5xx = Adult-themed (non-explicit)
- 6xx = Kid
- 7xx = Professional/Formal 
- 8xx = Government (often verified)
- 9xx = Average user
- 0xx = Bot

    In 2nd digit
- x0x = Natural, Informational 
- x1x = Happy, Positive users
- x2x = Sad, Serious users
- x3x = Angry, Controversial users, Keyboard Warrior, wants drama
- x4x = Hype, Yippe Intence music, High energy
- x5x = Chill, Relaxed , Calm , think before typing
- x6x = Silly, :3 , yippee
- x7x = Respectful, formal
- x8x = Main Character, Think they are good
- x9x = Scammer, Scammer , needs ur money 

++++ Example: 621 means 1st digit is 6 (Kid) and 2nd digit is 2 (Sad) ++++.



1st Digits Distribution Rules:
- Very few Admin accounts.
- Very few Government accounts.
- Few Company accounts.
- Mostly Average users.
- Some Meme accounts.
- Some Influencers.
- Some Professional accounts.
- Some Kid accounts.
- Some Bot accounts.

2nd Digits Distribution Rules:
    1xx is normally with x0x ,x5x, x7x, x8x
    2xx is normally with x7x, x0x, x4x(normally a company targeted new gen) rarely with x9x, x3x
    3xx is often with x8x, x4x, x3x and rarely with x7x
    4xx is often with x4x, x1x and rarely with x5x, x7x
    5xx is sometimes with x7x, x5x and rarely with x6x
    6xx is often with x2x, x8x, x4x and rarely with x7x, x9x
    7xx is very usually with x7x, rarely with x4x, x6x, x9x
    8xx is usually with x7x, x8x  rarely with x4x, x9x  and  NO x6x
    9xx can be with any 2nd digits
    0xx is often with x9x, x0x (no personality OR have specific over saturated personality)


Post Rules:

- Posts must match the author's personality.
- Posts must match the author's age group.
- Posts must match the author's account type.
- Posts must match the author's follower count.

Examples:

Sad user (x2x):
"didn't get the internship. kinda sucks ngl"

Hype user (x4x):
"LETS GOOOOOOOO"

Chill user (x5x):
"goodmorning yall."

Main character user (x8x):
"You guys are just jealous of me. Because I'm rich lol." 

Professional user (7xx):
"Interesting report on renewable energy trends."

Government user (8xx):
"Road maintenance will begin Monday."

Scam bot (x9x):
"FREE GIFT CARD CLICK NOW 67SCAMY.com "

Meme user (4xx):
"bro paid for premium air 💀"

Age assumptions:

6xx = 8-17 years old
9xx = 18-80 years old
7xx = 22-70 years old
3xx = 16-50 years old
2xx = Organization
8xx = Organization
0xx = Automated

Boomers usually:
- join before 2022
- use proper names
- fewer internet slang
- more likely to have gardening, family, religion, travel, retirement topics

Gen Alpha usually:
- join after 2025
- many typos
- excessive emojis
- short posts

Include:
- Gen Z users
- Brainrot gen alpha users
- Millennials
- Boomers
- Tech nerds
- Artists
- Gamers
- Sports fans
- Students
- Office workers
- Parents
- Retired people
- Meme addicts
- Food lovers
- Travelers
- Musicians

Gen Z examples :
- "lowkey"
- "fr"
- "ngl"
- "its giving"
- "bro thought"
- "cooked"
- "touch grass"
- "we got X before GTA 6"
- "lmao"
- "lol"
- "blud"
- "lil bro" (When talking to stupid 6xx Execpt gen Z with x3x ids)
- "💀"
- some of gen alpha slang can be used here

Gen alpha example (usually with 6xx ,execpt 67x):
-"67"
-"Tung tung tung sahur"
-"Sigma male"
-"Rizz"
-"Skibidi"
-"Mewing"
-"Aura"
-"Ohio"
- Gen alpha or 6xx users mostly have typos and like to spam dumb emojis
- Bad grammar
- Recent Join date
- avoid 😭 or any normal happy emoji use skull 

Boomer examples:
- "GOOD MORNING EVERYONE ☕"
- "Back in my day..."
- "Kids these days..."
- "God bless."
- Excessive ellipsis ...
- Sometimes don't know that they talked to public 

Meme account examples:
- absurd usernames
- ironic bios
- internet brainrot
- random humor

Silly example (x6x): 
- Highly used emojis :3 , >w< , >:3 
- "UWU", "OWO"
- Often end word with - , ~ 
- Sometimes furry, femboys
- Can used some of gen alpha, Z slangs

Professionals:
- More formal
- Fewer emojis

Company example (2xx):
- When a company target younger people use gen Z and gen Alpha slang in a emotionless way

Scammer example (x9x):
- When 09x (scam bot) "🤖
CONGRATULATIONS DEAR FRIEND!! 🎉✨ 
You have been randomly selected as our 1,000,000th favorite user! 🏆 
You have won a free rubux 🧸✋ 

To claim your prize, please send your password, your mother middle name, and your lunch money to real-not-a-scam.website!! 
Do not wait! Offer expires in 3 seconds!! 🕒🚨"

-Often with obvious random link 

Username Rules:
- Must be unique.
- Must not equal display name.
- Can contain:
  - underscores
  - periods
  - numbers
  - old internet styles
  - modern styles
  - less than 26 characters

Examples:
- cloudy.mia
- rxin_lee
- michael1984
- xXShadowWolfXx
- toasterlord99

Timestamp Rules
Use realistic posting times.
Night owls post late.
Boomers post early morning.
Students post after school.
Office workers post before work, lunch, or evening.

Additional Realism:
- Some boring users.
- Some weird users.
- Some inactive-looking users.
- Some power users.
- Different countries.
- Different age vibes.
- Different internet cultures.
- Vary sentence length significantly. Mix very short, punchy sentences with longer, compound sentences.
- Do not use words like dive into, paradigm, game-changing, delve, furthermore, moreover, in conclusion, or testament
- Avoid stating everything as an absolute fact. Use words like might, may, probably, could, or perhaps.
- Include subtle, natural emotional commentary or opinions, and use occasional contractions (e.g., don't, it's, I'm).
- some little grammar error are allowed Ex: I => i, I'm => im 
- on bio DON'T make the personality too saturated make it complex some part sad some part happy => Avoid some bio like this (Doodling my way through life. Positivity only! 🎨✨)
- Less emoji (execpt gen alpha and bot)
Avoid these AI patterns:

DO NOT make every bio quirky.
DO NOT make every user interesting.
DO NOT make every user active.

At least:
- 15% boring users
- 10% inactive-looking users
- 10% weird users
- 5% users with empty bio
- 5% users who barely follow anyone
- 5% users who follow thousands of accounts


!!!!!!!!!!!!ONLY use user id with these {all_ids}

Output ONLY valid JSON.
Do not explain.
Do not use markdown.
Do not include comments.
Do not include text before or after the JSON.
- Never stream JSON
- Validate with JSON.parse()
- Reject and regenerate malformed outputs
- put it in lines

"""

print(Prompt)