import fs from "node:fs/promises";

const root = "D:/Work/resume/transkaik.github.io";

const content = {
  storage: [
    "Every summer, international boarders at Cheshire Academy face the same puzzle: where does a year of belongings go when home is a long flight away? School storage is expensive. I started Easy Storage & Transport after renting my own storage unit and realizing that the real friction was not storage itself, but the coordination around it. The service bundles storage and moving for boarders, especially international students without family nearby.",
    "At the end of every school year, the dorms fill with desk lamps, mini fridges, textbooks, and winter coats that nobody wants to carry home. Much of it is discarded, while new students buy the same items again in September. Circlo is a school-based secondhand exchange platform that connects these two groups. I started it because the problem was never a lack of useful items, only the lack of a simple way for them to change hands on campus."
  ],
  healthy: [
    "Jingdezhen has made porcelain for over 2,000 years, yet its markets are filled with near-identical bowls. At the Export Porcelain Museum, I found the opposite: pieces reshaped around how each culture ate, from wide platters for the Islamic world to creamers for British tea. I began to ask what tableware would look like if it were designed for how we eat now.",
    "My answer came from my own life. After an injury ended my figure skating training, I worked with a nutritionist and learned that eating vegetables, then protein, then carbohydrates produced a steadier blood sugar curve than the reverse. I hypothesized that if a dish made portions and order visible, people could eat a balanced meal without weighing or calculating anything.",
    "Drawing on the layered decoration of a Yuan dynasty vase and the window panels of Kraak porcelain, I designed a three-tier bowl that guides eating order and a five-section salad plate labeled with weights and calories, then hand-painted both in Jingdezhen."
  ],
  kettle: [
    "Kettle began with a question most people ask every evening: my fridge is full, so why do I have nothing to cook? At LaunchX, our team built an app that scans a user's fridge, pantry, and spice cabinet, then recommends recipes that can be made immediately, filtered by diet, nutrient goals, and skill level.",
    "I led market research, including interviews at UC San Diego. Across three rounds of testing with 40 users, we learned that most students rarely cooked and would not pay for the app. Parents were different: cooking for their children every day, they often struggled to decide what to make and what their children would eat. We pivoted to parents aged 35 to 50, where Kettle could save real time every day.",
    "The biggest lesson was to let users redefine the problem. Our first idea was right about the pain, but wrong about who felt it most."
  ],
  bpa: [
    "In the 2025 Business Professionals of America competition, our team competed in Presentation Management in the high school Classic division. We developed a proposal for a badminton company serving high-income families.",
    "I built the research foundation and designed the slides. I conducted market research, analyzed our target users, and turned raw data into the charts and evidence that anchored our argument."
  ],
  camping: [
    "Camping Club, formally Beijing Camping Club Sports Culture Communication Co., Ltd., is a sports tourism platform that supports China's outdoor industry by building campsites and hosting large-scale events. I interned with the team behind the 2026 China Jinhuashan International Camping Conference, held May 16–17 in Jinhua, Zhejiang, under the theme “New Scenes, New Consumption, New Life.”",
    "Over two weeks, I worked where Chinese camping culture meets the wider world. I translated for international guests, explained the organization's philosophy and partnerships, helped design conference activities, wrote WeChat articles, and promoted the event on social media.",
    "The internship showed me that hospitality and marketing share one goal: helping people from different backgrounds feel welcome. Whether I was translating for a visitor or writing a post, my job was to make someone want to step inside."
  ],
  marketing: [
    "For international families, boarding school life often happens on the other side of the world, in a language they may not fully follow. As a marketing intern through the Cheshire Academy Internship Program during the 2025–26 and 2026–27 school years, I worked to close that gap.",
    "My focus was connecting the school with its international community, especially Chinese-speaking families. For major events such as Family Weekend and Giving Day, I recorded videos in Chinese explaining what was happening and why it mattered. I also created welcome videos for incoming international students, giving them a first look at campus life before they arrived."
  ],
  headPrefect: [
    "At Cheshire Academy, prefects are selected through interviews from more than 60 applicants, and only juniors and seniors may serve. I was a dorm prefect in 2025–26, and this year I am one of two Head Prefects, a role open only to seniors. I lead our prefect team, support boarding students, and act as a link between students and faculty.",
    "Much of my work is mediation. I have helped roommates resolve conflicts and, when needed, worked with teachers to arrange room changes. My hardest conversation came after racist comments were directed at Chinese students. I brought in peers to show how much the community valued them, reported the incident to faculty, and helped ensure that the students responsible were held accountable.",
    "I also serve on the Citizenship Committee, one of 12 seniors chosen from over 40 applicants. Working alongside faculty, we review cases where students break school rules and decide on fair consequences. Both roles taught me that leadership is less about authority than trust: people need to feel heard before rules mean anything."
  ],
  ambassador: [
    "As Head Ambassador, I lead campus tours for prospective students and families and train new ambassadors to do the same. My goal on every tour is simple: show visitors not just our buildings, but what it actually feels like to live here.",
    "I answer families honestly, share my own experience, and leave room for the questions they may feel shy to ask. I also introduce Cheshire to visiting international educational consultants and answer questions about academics, boarding life, and support for international students.",
    "Last year, a student I had shown around decided to enroll, saying that my introduction, and seeing how happy I was here, made the difference. Helping someone else find a home here is the best way I know to share a school I love."
  ],
  writing: [
    "The Writing Center is staffed by just seven students, each selected by teacher recommendation. Our goal is not to turn a C into an A, but to help peers make their essays complete, clear, and easy to follow.",
    "Every session starts with a question: what do you want to improve? Then we read the essay together. I point out gaps, such as a missing topic sentence or a structure that loses the reader, and suggest ways to fix them. The revising is always theirs."
  ],
  calligraphy: [
    "I founded a Calligraphy Club to share one of the most beautiful parts of Chinese culture with my school. The club has more than 30 members. Each month, we hold a practice session where members learn the basics, from holding the brush to building each stroke, before creating a final piece of their own choosing.",
    "Our biggest event comes at Chinese New Year. We set up a table in the dining hall where any student can write 福 (fu), the character for good fortune, and hang it on their door. Practice paper lets first-time participants try a few strokes before writing their finished piece.",
    "For many local students, this is their first hands-on encounter with Chinese culture. Calligraphy turns something unfamiliar into something they can hold, practice, and make their own. For me, it is a way to bring a piece of home to the place that has become my second one."
  ],
  coach: [
    "I spent thirteen years as a competitive figure skater until an injury ended my training. Stepping off the ice as an athlete did not mean leaving the sport, so I returned to my team as an assistant coach.",
    "I worked with younger skaters, helping the coach run practice: leading warm-ups, breaking down jumps and spins into smaller steps, and giving each skater individual corrections.",
    "One skater kept falling on her first jump because she was afraid of it. I slowed everything down, had her practice the takeoff off-ice first, then on the ice with my hand on her back. Within a few weeks, she landed it on her own."
  ],
  teaching: [
    "In the summer of 2023, I spent two weeks teaching English at a primary school in the mountains of Guangxi, China. My class had just over ten second graders, most of whom had no exposure to English.",
    "I arrived with lesson plans built around vocabulary lists and daily conversation, but within the first day I could see they were not working. The children were shy, and memorizing words felt meaningless to them. I turned lessons into songs, games, and drawings, teaching colors, animals, and simple greetings through activities they could move and laugh through.",
    "One boy barely spoke for the first few days. During a picture game, he suddenly shouted “elephant!” before anyone else, and the whole class cheered. After that, he raised his hand almost every lesson."
  ],
  cooking: [
    "As co-founder of the school's Cooking Club, I helped build a community of more than 60 students who share one belief: food is one of the easiest ways to bring people together.",
    "During the year, members gather to make simple dishes and desserts, learning to cook side by side. For the International Food Festival, Mid-Autumn Festival, and Chinese New Year, we prepare food in large batches for students and teachers to taste.",
    "For students far from home, these dishes are a taste of family. For everyone else, they are an invitation to understand where their friends come from."
  ],
  photography: [
    "I photograph the places I travel through, mostly landscapes, from China and Japan to the United States. I rarely plan a shot. Instead, I slow down, walk, and wait until a scene feels like it is telling me something. The photographs selected here each capture one of those moments, and together they trace the places that have shaped how I see the world."
  ],
  skating: [
    "I stepped onto the ice for the first time in 2012, and for most of the next decade, the rink was my second home. Before my injury, I trained four to five times a week, two to three hours each session.",
    "Figure skating is a sport built on falling. Every new jump meant hundreds of failed attempts, bruises, and days when nothing seemed to improve. At my peak, I competed at the national level and placed seventh.",
    "Then an injury ended my competitive career. Losing the sport I had built my childhood around was the hardest setback I have faced. But I did not leave the ice. I returned as an assistant coach, took on officiating, and volunteered at competitions across China, learning the sport from every side of the boards."
  ],
  soccer: [
    "I play as a substitute forward for Cheshire Academy's girls varsity soccer team. Unlike many of my teammates, I never had formal training before high school. Everything I know about the game, I learned through our team's practices and matches.",
    "That meant starting behind. My footwork was not the best on the field, and I had to work hard just to keep up. But I found my strength in the one skill that matters most for my position: finishing. When the ball reaches me near the goal, I can place my shot with precision."
  ],
  dancing: [
    "I began studying ballet in 2012, and dance has been part of my life ever since. Alongside ballet, I trained in jazz for three years, which taught me a looser, more rhythmic way of moving."
  ]
};

const paraHtml = paragraphs => paragraphs.map(p => `<p>${p}</p>`).join("");

function updateModule(html, id, paragraphs) {
  const pattern = new RegExp(`(<article id="${id}"[\\s\\S]*?<div class="detail-module-copy">)[\\s\\S]*?(<div class="resource-links">)`);
  if (!pattern.test(html)) throw new Error(`Module not found: ${id}`);
  return html.replace(pattern, `$1${paraHtml(paragraphs)}$2`);
}

function updateCopyOnly(html, id, paragraphs) {
  const pattern = new RegExp(`(<article id="${id}"[\\s\\S]*?<div class="detail-module-copy">)[\\s\\S]*?(</div></header>)`);
  if (!pattern.test(html)) throw new Error(`Copy block not found: ${id}`);
  return html.replace(pattern, `$1${paraHtml(paragraphs)}$2`);
}

function replaceRequired(text, from, to, label) {
  if (!text.includes(from)) throw new Error(`Text not found: ${label}`);
  return text.replace(from, to);
}

async function updateFile(name, fn) {
  const file = `${root}/${name}`;
  const before = await fs.readFile(file, "utf8");
  const after = fn(before);
  if (before === after) return;
  await fs.writeFile(file, after, "utf8");
}

await updateFile("ventures.html", html => {
  html = updateModule(html, "storage-platform", content.storage);
  html = updateModule(html, "healthy-bowl", content.healthy);
  html = updateModule(html, "kettle-recipe", content.kettle);
  html = updateModule(html, "bpa", content.bpa);
  html = updateModule(html, "china-camping-club", content.camping);
  html = updateModule(html, "marketing-intern", content.marketing);
  html = html.replaceAll("./assets/leadership/Writing Center Tutor/Writing Center Tutor2.jpg", "./assets/home/missing.png")
    .replaceAll("./assets/leadership/Calligraphy Club/Calligraphy Club2.jpg", "./assets/home/missing.png")
    .replaceAll("./assets/ventures/China Camping Club/campingclub.png\" alt=\"Storage platform project presentation", "./assets/home/missing.png\" alt=\"Storage platform material pending")
    .replace("./assets/ventures/Jingdezhen Health Bowl/Porcelain portion-bowls .JPG\" alt=\"Kettle Recipe process", "./assets/home/missing.png\" alt=\"Kettle project material pending")
    .replace("./assets/leadership/Head Prefect/Head Prefect.jpg\" alt=\"BPA competition presentation", "./assets/ventures/BPA/IMG_7489.JPG\" alt=\"BPA competition presentation")
    .replace("./assets/leadership/Calligraphy Club/Calligraphy Club3.jpg\" alt=\"Marketing internship work", "./assets/home/missing.png\" alt=\"Marketing internship material pending");
  html = html.replace("Project overview · [YEAR]", "Project material pending")
    .replace("User research · [YEAR]", "Project material pending");
  return html;
});

await updateFile("leadership.html", html => {
  html = updateModule(html, "head-prefect", content.headPrefect);
  html = updateModule(html, "head-ambassador", content.ambassador);
  html = updateModule(html, "writing-center-tutor", content.writing);
  html = updateModule(html, "calligraphy-club", content.calligraphy);
  html = updateModule(html, "assistance-coach", content.coach);
  html = updateModule(html, "volunteer-teaching", content.teaching);
  html = updateModule(html, "cooking-club", content.cooking);
  html = html.replaceAll("Assistance Coach", "Assistant Coach")
    .replace("./assets/leadership/Calligraphy Club/Calligraphy Club1.jpg\" alt=\"Calligraphy Club work", "./assets/leadership/Calligraphy Club/Calligraphy Club5.jpg\" alt=\"Students practicing Chinese calligraphy together")
    .replace("./assets/leadership/Head Prefect/Head Prefect.jpg\" alt=\"Head Ambassador speaking to the school community", "./assets/home/missing.png\" alt=\"Head Ambassador material pending")
    .replace("./assets/sports/soccer/soccer3.jpg\" alt=\"Assistant Coach training session", "./assets/sports/fgure skating/Skating Teaching Assistant1.jpg\" alt=\"Assistant Coach working with a young skater")
    .replace("./assets/ventures/Jingdezhen Health Bowl/bowls.png\" alt=\"Cooking Club food presentation", "./assets/home/missing.png\" alt=\"Cooking Club material pending");
  return html;
});

await updateFile("sports.html", html => {
  html = updateCopyOnly(html, "figure-skating", content.skating);
  html = updateCopyOnly(html, "soccer", content.soccer);
  html = updateCopyOnly(html, "dancing", content.dancing);
  html = html.replace('<div class="sports-video-frame landscape media-pending"><img src="./assets/sports/dancing/dancing2.png" alt="Dancing video cover"><p>Dancing video file pending</p></div>', '<div class="sports-video-frame landscape media-pending"><img src="./assets/home/missing.png" alt="Dance performance video material pending"><p>Dancing video file pending</p></div>');
  return html;
});

await updateFile("visual.html", html => {
  html = updateModule(html, "photography", content.photography);
  html = html.replaceAll("./assets/visual/photography/The beauty of prism.jpg\" alt=\"Campus life photography", "./assets/home/missing.png\" alt=\"Campus photography material pending")
    .replaceAll("./assets/visual/photography/The path of blessing.jpg\" alt=\"Everyday life photography", "./assets/home/missing.png\" alt=\"Everyday photography material pending")
    .replaceAll("./assets/leadership/Volunteer Teaching/Volunteer Teaching2.jpg", "./assets/home/missing.png")
    .replaceAll("./assets/leadership/Volunteer Teaching/Volunteer Teaching3.jpeg", "./assets/home/missing.png")
    .replaceAll("./assets/leadership/Volunteer Teaching/Volunteer Teaching1.jpg", "./assets/home/missing.png")
    .replaceAll("Documentary still · [YEAR]", "Documentary material pending")
    .replaceAll("Behind the scenes · [YEAR]", "Behind-the-scenes material pending");
  return html;
});

await updateFile("index.html", html => {
  const summaries = {
    "[CONTEXT — WHY — WHAT I DID — RESULT — REFLECTION]": "I created Easy Storage & Transport to coordinate storage and moving for international boarders, then developed Circlo to help useful dorm-room items change hands instead of being discarded and bought again.",
    "[What you designed, tested, or learned through the Kettle Recipe project.]": "At LaunchX, our team built Kettle, an app that recommends recipes from ingredients users already have. Three rounds of testing with 40 users led us to pivot from students to parents aged 35–50.",
    "[CONTEXT — CONTRIBUTION — RESULT — REFLECTION]": "Inspired by Jingdezhen's history of adapting porcelain to the way people eat, I designed a three-tier bowl and a sectioned plate that make balanced portions and eating order visible.",
    "[A short story about creating community outdoors.]": "During the 2026 China Jinhuashan International Camping Conference, I translated for international guests, helped design activities, wrote WeChat articles, and supported social media outreach.",
    "[What the role meant, what you actually handled, what changed, and what you learned.]": "As one of two Head Prefects, I lead the prefect team, support boarding students, mediate conflicts, and help connect students with faculty. The role has taught me that trust must come before authority.",
    "[STORY ABOUT LISTENING, FEEDBACK, AND HELPING ANOTHER WRITER.]": "As one of seven student tutors, I help peers make their essays complete, clear, and easy to follow by asking what they want to improve and guiding them through their own revisions.",
    "[HOW THE CLUB WAS ORGANIZED AND WHAT MEMBERS MADE TOGETHER.]": "I founded a 30-member Calligraphy Club that teaches brush technique through monthly practice and invites the wider school community to write 福 for Chinese New Year.",
    "[A CONCRETE STORY ABOUT WELCOMING, REPRESENTING, OR CONNECTING PEOPLE.]": "As Head Ambassador, I lead campus tours, train new ambassadors, and help prospective families understand what it feels like to live and learn at Cheshire Academy.",
    "[TEAM, RESPONSIBILITIES, AND HOW YOU SUPPORTED OTHERS' DEVELOPMENT.]": "After thirteen years as a competitive figure skater, I returned to the ice as an assistant coach, breaking down skills and helping younger skaters build confidence one step at a time.",
    "[WHAT YOU TAUGHT, HOW YOU ADAPTED, AND WHAT STUDENTS TAUGHT YOU.]": "In Guangxi, I adapted English lessons for second graders by replacing vocabulary lists with songs, games, and drawings that made students confident enough to speak.",
    "[A SMALL, SPECIFIC STORY ABOUT FOOD, TEAMWORK, OR CULTURE.]": "As co-founder of a 60-member Cooking Club, I help students cook together and share food during the International Food Festival, Mid-Autumn Festival, and Chinese New Year.",
    "Award-winning work, travel observations from Tibet and beyond, and quieter moments from school and daily life.": content.photography[0],
    "[SKATING JOURNEY — TRAINING, COMPETITION PHOTOS, MEDIA COVERAGE, AND PERFORMANCE VIDEO.]": "I trained as a competitive figure skater from 2012, four to five times a week at my peak, and placed seventh nationally. After an injury ended competition, I returned as a coach, official, and volunteer.",
    "[JAZZ AND BALLET — REHEARSAL AND PERFORMANCE VIDEOS.]": content.dancing[0],
    "[MATCH, TEAM, OR TRAINING STORY.]": "I play substitute forward for Cheshire Academy's girls varsity team. Without formal training before high school, I learned through practice and found my strength in finishing accurately near the goal."
  };
  for (const [from,to] of Object.entries(summaries)) html = html.replace(from,to);
  html = html.replace("[A concise line explaining the storage and secondhand-use problem.]", "Storage and reuse designed around the realities of international boarding life.")
    .replace("[A project connecting material, place, and health.]", "Porcelain designed around modern eating habits and visible portion guidance.")
    .replace("[Business Professionals of America — competition, role, and project focus.]", "A 2025 BPA Presentation Management proposal for a premium badminton company.")
    .replace("[CONTEXT — CONTRIBUTION — RESULT — REFLECTION]", "I led market research, analyzed target users, and designed the charts and slides that anchored our team's proposal.")
    .replace("[Organization, audience, and the marketing problem you worked on.]", "Helping international families follow school life across distance and language.")
    .replace("[WHAT I DID — RESULT — WHAT I LEARNED ABOUT AUDIENCES AND COMMUNICATION]", "During the 2025–26 and 2026–27 school years, I created Chinese-language event and welcome videos to connect Cheshire Academy with international families and incoming students.")
    .replaceAll("Assistance Coach", "Assistant Coach")
    .replaceAll("./assets/leadership/Writing Center Tutor/Writing Center Tutor2.jpg", "./assets/home/missing.png")
    .replaceAll("./assets/leadership/Calligraphy Club/Calligraphy Club2.jpg", "./assets/home/missing.png")
    .replaceAll("./assets/ventures/Jingdezhen Health Bowl/Porcelain portion-bowls .JPG\" alt=\"Kettle Recipe presentation", "./assets/home/missing.png\" alt=\"Kettle project material pending")
    .replaceAll("./assets/ventures/Jingdezhen Health Bowl/bowls.png\" alt=\"Kettle Recipe project development", "./assets/home/missing.png\" alt=\"Kettle project material pending")
    .replace("./assets/leadership/Calligraphy Club/Calligraphy Club3.jpg\" alt=\"Marketing internship project work", "./assets/home/missing.png\" alt=\"Marketing internship material pending")
    .replace("./assets/leadership/Calligraphy Club/Calligraphy Club1.jpg\" alt=\"Head Ambassador duty", "./assets/home/missing.png\" alt=\"Head Ambassador material pending")
    .replace("./assets/leadership/Calligraphy Club/Calligraphy Club1.jpg\" alt=\"Calligraphy Club work", "./assets/leadership/Calligraphy Club/Calligraphy Club5.jpg\" alt=\"Students practicing Chinese calligraphy together")
    .replace("./assets/sports/soccer/soccer3.jpg\" alt=\"Assistant Coach training session", "./assets/sports/fgure skating/Skating Teaching Assistant1.jpg\" alt=\"Assistant Coach working with a young skater")
    .replace("./assets/leadership/Calligraphy Club/Calligraphy Club1.jpg\" alt=\"Cooking Club session", "./assets/home/missing.png\" alt=\"Cooking Club material pending")
    .replaceAll("./assets/leadership/Volunteer Teaching/Volunteer Teaching1.jpg\" alt=\"Documentary", "./assets/home/missing.png\" alt=\"Documentary material pending")
    .replaceAll("Documentary · [LOCATION / YEAR]", "Documentary material pending")
    .replaceAll("Behind the scenes · [YEAR]", "Behind-the-scenes material pending")
    .replaceAll("Figure Skating Competition · [YEAR]", "National competition")
    .replaceAll("Practice · [LOCATION / YEAR]", "Training session");
  html = html.replace("[CONTEXT — WHY — WHAT I DID — RESULT — REFLECTION]", "Inspired by Jingdezhen's history of adapting porcelain to the way people eat, I designed a three-tier bowl and a sectioned plate that make balanced portions and eating order visible.")
    .replace("Storage Platform · [LOCATION / YEAR]", "Project material pending")
    .replace("Working session · [YEAR]", "Project material pending")
    .replace("Kettle Recipe · [LOCATION / YEAR]", "Kettle project material pending")
    .replace("Project development · [YEAR]", "Kettle project material pending")
    .replace(content.photography[0], "I photograph landscapes across China, Japan, and the United States, slowing down and waiting until a scene feels like it is telling me something.");
  return html;
});

for (const name of ["index.html","ventures.html","leadership.html","visual.html","sports.html"]) {
  await updateFile(name, html => html
    .replaceAll("[CLASS OF 2027]", "CLASS OF 2027")
    .replaceAll("mailto:[APPLICATION-EMAIL]", "mailto:skatingxiyue@gmail.com")
    .replaceAll("Last updated [MONTH YEAR].", "Last updated October 2026."));
}

console.log("Updated website content from workbook additions.");
