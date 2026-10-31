# Tender Hearts International School — demo website

A responsive static website and rule-based school FAQ chatbot for a science exhibition project.

## Run locally
Open `index.html` in a browser. No build tools or package installation are required.

## Publish with GitHub Pages
1. Create a new GitHub repository (for example `tender-hearts-school`).
2. Upload `index.html`, `style.css`, `data.js`, `script.js`, and this README to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then Save.
6. Wait for GitHub Pages to publish the site. The URL will appear in the Pages settings.

## Update school details
Edit `data.js`. Replace all sample/placeholder values with information approved by the school:
- Principal name, established year, teacher/student/class counts
- Official phone number and email
- School timings and transport routes/timings
- Real teacher names, subjects and qualifications
- Confirmed events and class-wise examination dates

The class, teacher, event and exam cards are generated from this file automatically.

## Chatbot
The assistant in `script.js` is a simple keyword/rule-based FAQ bot. It works in the browser and does not call an AI service. Add more rules in the `answer()` function to support additional questions. If it cannot match a question, it directs the visitor to the school office.

## Important demo limitations
- The enquiry form only displays a local confirmation. It does not send or store submissions. Connect a secure backend or trusted form service before using it for real enquiries.
- Parent/teacher sections are informational demo areas, not authenticated portals. Real logins, attendance, marks, fee payments and private student records need a backend, database, access controls and secure hosting.
- Do not publish children's personal information, private phone numbers, student records or unapproved photographs.
- Verify the school's official name, address, contact details, timings, classes and all dates before public launch.


## Expanded chatbot knowledge and typing effect
The chatbot now includes prepared school-level answers for general India knowledge and basic science topics (for example, Indian national symbols, important national days, ISRO/Chandrayaan, photosynthesis, gravity, planets, the human body and matter). Bot messages appear with a character-by-character typing effect. It is still a rule-based offline demo, not a live AI search engine; current affairs and unlisted questions should be checked from reliable sources.
