import fs from "node:fs/promises";
import path from "node:path";
import { Workbook, SpreadsheetFile } from "@oai/artifact-tool";

const root = "D:/Work/resume/transkaik.github.io";
const outDir = path.join(root, "outputs/material-content-checklist");
const outputPath = "C:/Users/chu/.codex/visualizations/2026/09/23/01a0cee1-4715-7f30-b567-695fe16fff7a/Eleanor_Zhang_website_content_material_checklist.xlsx";
const font = "Arial";

const rows = [
  [1,"首页 Home","首屏个人定位 Hero","index.html · Hero","Hello, I'm Eleanor Zhang. Curious Builder · Empathetic Leader · Visual Storyteller · Disciplined Athlete","确认姓名、毕业年份；补充1句更有个人辨识度的英文定位或保留现有定位。","暂无独立首屏素材","横版或竖版主视觉照片1张（自然、清晰、可裁切）；如不用照片请确认。","图片建议≥2000px；说明拍摄时间、地点、摄影者及使用授权。","","","高","待补充","",""],
  [2,"首页 Home","个人简介 Short bio","index.html · Home","[SHORT BIO — 150–250 words about background, interests, character, and what the student hopes to explore. Keep this specific and personal rather than résumé-like.]","英文个人简介150–250词：成长背景、核心兴趣、性格特点、希望继续探索的方向；避免简历式罗列。","Head Prefect.jpg（当前作为个人照片）","自然肖像2–3张；可选童年/生活照1张。","提供每张图片的英文说明、年份、地点、人物关系及优先顺序。","","","高","待补充","",""],
  [3,"首页 Home","学生代表演讲 Student Representative Speech","index.html · Home","A concise edited clip that introduces Eleanor's voice, values, and relationship with her school community.","英文简介80–120词：演讲场合、听众、主题、本人角色、核心观点与反思；确认视频英文标题。","student-representative-highlights.mp4；2张封面图","完整演讲或字幕文件；活动照片2–4张；演讲稿/活动证明（可选）。","视频建议1080p；提供英文字幕或逐字稿；确认能否公开。","","","高","部分已有","",""],
  [4,"首页 Home","联系信息 Contact","index.html · Closing","Builder · Leader · Storyteller · Athlete · Explorer","确认展示用邮箱、毕业年份、简历文件版本、页脚更新时间。","resume.pdf","最新版英文简历PDF；可选个人头像或二维码。","文件名建议简洁；检查个人隐私信息与公开权限。","","","高","待确认","",""],
  [5,"创业实践 Ventures","Storage Platform & Secondhand Trading","ventures.html · 02.01","[PROBLEM, USERS, YOUR ROLE, HOW THE PLATFORM WORKED, EVIDENCE OF USE, AND WHAT YOU WOULD IMPROVE.]","英文项目介绍150–220词：问题、目标用户、发起原因、个人职责、方案/流程、使用数据或结果、复盘改进。","网页目前误用Writing Center Tutor2.jpg、Calligraphy Club2.jpg","产品界面/流程图3–6张；团队或用户调研照；运营数据截图；项目演示视频；方案PDF。","须提供结果数据口径；界面截图隐藏个人信息；标注本人具体贡献。","","","高","待补充","","当前素材疑似占位，需替换"],
  [6,"创业实践 Ventures","Healthy Bowl","ventures.html · 02.02","[HOW CERAMICS, PORTION DESIGN, AND HEALTH BEHAVIOR CAME TOGETHER.]","英文项目介绍150–220词：洞察、健康行为假设、景德镇/陶瓷背景、设计过程、测试反馈、成果与反思。","bowls.png；Porcelain portion-bowls.JPG；SavorSlim Logo.jpg；减肥碗.pdf","原型迭代照片；调研/访谈记录；使用场景；获奖或展示证明；品牌说明。","说明每版原型差异；PDF若中文需英文摘要。","","","高","部分已有","",""],
  [7,"创业实践 Ventures","Kettle Recipe","ventures.html · 02.03","[THE IDEA, TESTING PROCESS, AND WHAT YOU LEARNED ABOUT USERS OR FOOD.]","英文项目介绍120–180词：创意来源、目标用户、测试次数、配方/产品迭代、用户反馈和学习。","当前误用Healthy Bowl素材","配方步骤图；实验/测试照片；成品图；用户反馈；过程记录或PDF。","明确与Healthy Bowl是否为同一项目；若不是必须提供独立素材。","","","中","待补充","","当前素材疑似占位，需替换"],
  [8,"创业实践 Ventures","BPA","ventures.html · 02.04","[COMPETITION CATEGORY, TEAM ROLE, PREPARATION, RESULT, AND REFLECTION.]","英文项目介绍150–220词：比赛全称/组别、题目、团队分工、准备过程、个人贡献、全国铜奖结果、反思。","IMG_1268.JPG；IMG_1269.JPG；IMG_7479.HEIC；IMG_7489.JPG；IMG_7510.PNG；BPA证书PDF；全国铜奖PDF","英文版项目摘要；演示文稿；比赛现场照片；个人职责证明；获奖信息英文翻译。","注明比赛年份、级别、奖项官方英文名称；HEIC建议另存JPG。","","","高","部分已有","",""],
  [9,"创业实践 Ventures","China Camping Club","ventures.html · 02.05","[WHY YOU STARTED OR JOINED, HOW THE COMMUNITY GREW, AND WHAT YOU ORGANIZED.]","英文项目介绍120–180词：成立/加入原因、社群规模、组织活动、风险与后勤管理、社区影响和个人收获。","campingclub.png；campingclub2.png；campingclub.mp4","活动时间线；路线/活动海报；成员合照；参与数据；安全说明或活动手册。","提供照片人物授权；说明本人是发起人、组织者还是成员。","","","中","部分已有","",""],
  [10,"创业实践 Ventures","Marketing Intern","ventures.html · 02.06","[ORGANIZATION, AUDIENCE, RESPONSIBILITIES, CAMPAIGN WORK, AND RESULTS.]","英文项目介绍150–220词：机构、岗位与时间、目标受众、负责内容、代表活动、可量化结果、技能与反思。","网页目前误用Calligraphy Club3.jpg","工作样例3–6项；活动/广告截图；数据结果；实习证明；主管反馈或推荐语（可选）。","先确认保密要求；对客户/数据做脱敏；明确本人贡献。","","","高","待补充","","当前素材疑似占位，需替换"],
  [11,"领导力 Leadership","Head Prefect","leadership.html · 03.01","[WHAT THE ROLE MEANT, WHAT YOU HANDLED, WHAT CHANGED, AND WHAT YOU LEARNED.]","英文介绍150–220词：任期、选拔方式、职责、代表性事件、困难对话、改进结果和领导力反思。","Head Prefect.jpg；演讲视频及2张封面","任命/荣誉证明；活动照片；学生代表演讲；项目成果或数据；推荐语（可选）。","用具体事件代替泛泛职责；说明影响范围和结果。","","","高","部分已有","",""],
  [12,"领导力 Leadership","Head Ambassador","leadership.html · 03.02","[HOW YOU WELCOMED, REPRESENTED, OR CONNECTED PEOPLE.]","英文介绍120–180词：服务对象、主要活动、沟通方式、一次具体故事、产生的连接或改变。","网页目前复用Head Prefect.jpg","校园开放日/接待照片；演讲视频；活动手册；项目数据或反馈。","明确与Head Prefect的区别，避免内容重复。","","","中","待补充","","当前素材不足"],
  [13,"领导力 Leadership","Writing Center Tutor","leadership.html · 03.03","[A STORY ABOUT LISTENING, FEEDBACK, AND HELPING ANOTHER WRITER.]","英文介绍120–180词：辅导对象、方法、一次代表性辅导、如何给予反馈、对方变化与本人反思。","Writing Center Tutor1–4（4张）","匿名化的修改前后样例；培训证明；服务时长/人数；学生反馈（经许可）。","写作样例必须匿名；不要公开他人未经许可的作品。","","","中","部分已有","",""],
  [14,"领导力 Leadership","Calligraphy Club","leadership.html · 03.04","[HOW THE CLUB WAS ORGANIZED AND WHAT MEMBERS MADE TOGETHER.]","英文介绍120–180词：创办/职务、成员规模、活动组织、教学或创作方式、共同成果、文化意义。","Club照片1–4；Calligraphy work 1–5（共9张）","活动海报；成员作品精选；展览/比赛证明；社团数据；英文作品说明。","每件作品补充英文题名、创作者、媒介、年份；区分本人作品与成员作品。","","","中","部分已有","",""],
  [15,"领导力 Leadership","Assistance Coach","leadership.html · 03.05","[TEAM, RESPONSIBILITIES, AND HOW YOU SUPPORTED OTHERS' DEVELOPMENT.]","英文介绍120–180词：项目/队伍、辅导对象、训练职责、支持他人成长的实例、观察到的变化。","网页目前使用soccer3.jpg","训练照片/视频；训练计划；教练或学员反馈；资格/服务证明。","确认英文名称建议为Assistant Coach；说明具体运动项目。","","","高","待补充","","标题英文建议修正"],
  [16,"领导力 Leadership","Volunteer Teaching","leadership.html · 03.06","[WHAT YOU TAUGHT, HOW YOU ADAPTED, AND WHAT STUDENTS TAUGHT YOU.]","英文介绍150–220词：地点、时间、学生年龄/人数、教学内容、课程调整、具体课堂故事、互相学习与影响。","Volunteer Teaching1.jpg；2.jpg；3.jpeg","教案；课堂照片；服务证明；学生作品/反馈；项目背景说明。","保护未成年人隐私；确认照片授权；不要披露敏感地点与身份。","","","高","部分已有","",""],
  [17,"领导力 Leadership","Cooking Club","leadership.html · 03.07","[A SPECIFIC STORY ABOUT FOOD, TEAMWORK, CULTURE, AND COMMUNITY.]","英文介绍120–180词：社团角色、活动形式、一道代表菜/一次活动、分工与文化交流、社群影响。","网页目前复用Healthy Bowl图片","烹饪活动照片；成品图；菜单/食谱；活动海报；成员合照。","明确与Healthy Bowl项目的区别；补充英文菜名与文化背景。","","","中","待补充","","当前素材疑似占位，需替换"],
  [18,"视觉创作 Visual","摄影 Photography","visual.html · 04.01","Award-winning work, travel observations from Tibet and elsewhere, and quieter photographs from school and daily life.","英文总述80–120词：视觉兴趣、常拍主题、观察方法、器材/后期（如重要）、作品选择逻辑。每张作品补英文题名、年份、地点、简短说明和奖项。","6张JPG作品；多份获奖/投稿PDF","每张作品原图；奖项名称与年份；比赛链接/证书；作品说明；摄影者本人确认。","原图建议长边≥3000px；统一色彩与文件名；确认所有作品均为本人拍摄。","","","高","部分已有","",""],
  [19,"视觉创作 Visual","获奖摄影 Award-winning","visual.html · 04.01A","A rainbow suspended over the Grand Canyon; The beauty of prism; The path of blessing","每件作品英文说明40–80词：拍摄背景、构图/光线、作品意图、奖项及级别。","3张JPG；相关PDF若干","获奖证书/官方页面；原始高分辨率文件；作品参赛信息。","奖项须写官方英文名、主办方、年份和级别。","","","高","部分已有","",""],
  [20,"视觉创作 Visual","旅行摄影 Tibet & Travel","visual.html · 04.01B","Gates of Heaven; Silk Road; Embrace in the Silence","系列英文说明80–120词；每张作品补地点、年份、人物/场景背景与拍摄意图。","3张JPG；Gates of Heaven及Embrace相关PDF","更多同系列候选图；旅行背景说明；人物授权（如可识别）。","核对地名英文拼写；避免暴露敏感个人信息。","","","中","部分已有","",""],
  [21,"视觉创作 Visual","校园与日常 Campus & Everyday Life","visual.html · 04.01C","Campus & everyday life","英文系列说明60–100词；每张作品补题名、年份、地点、场景故事。","网页当前重复使用The beauty of prism与The path of blessing","独立校园/日常作品4–8张；活动背景和图片说明。","不建议与获奖摄影重复；优先选择能体现日常观察力的作品。","","","中","待补充","","当前图片重复"],
  [22,"视觉创作 Visual","纪录片 Documentary","visual.html · 04.02","[THE SUBJECT, CENTRAL QUESTION, YOUR ROLE, ETHICAL APPROACH, AND WHAT THE PROCESS REVEALED.]","英文介绍180–260词：主题、中心问题、人物/社区、本人角色、制作过程、伦理处理、发现与反思。","网页当前使用Volunteer Teaching照片3张","影片文件/链接；海报；剧照6–10张；幕后照；导演阐述；字幕；Press kit PDF。","视频建议1080p；提供英文字幕；确认人物肖像、音乐和场地版权。","","","高","待补充","","需确认纪录片是否与支教项目相关"],
  [23,"体育 Sports","Figure Skating","sports.html · 05.01","[SKATING JOURNEY, TRAINING ROUTINE, COMPETITIONS, SETBACKS, AND DEVELOPMENT.]","英文介绍180–260词：起始时间、训练频率、级别/比赛、挑战与挫折、关键突破、坚持带来的成长。","比赛照片7张；教学助理照片2张；3个视频；3篇媒体报道","比赛成绩/证书；训练时间线；教练信息/推荐语（可选）；媒体英文摘要。","列明比赛官方名称、日期、组别、名次；确认媒体链接长期可访问。","","","高","大部分已有","",""],
  [24,"体育 Sports","Skating Teaching Assistant","sports.html · 05.01A","Teaching assistant","英文介绍100–160词：辅导对象、职责、教学方法、安全管理、帮助学员进步的具体例子。","2张照片；Skating Teaching Assistant.mp4","训练计划；学员/教练反馈；服务时长或证明。","保护未成年人隐私；确认视频公开许可。","","","中","部分已有","",""],
  [25,"体育 Sports","Soccer","sports.html · 05.02","[TEAM, POSITION, TRAINING, A MEMORABLE MATCH, AND WHAT THE SPORT TAUGHT YOU.]","英文介绍120–180词：球队、位置、训练、代表比赛、个人/团队结果、从运动中学到的内容。","soccer1–4（4张）","球队合照；比赛视频；赛程/成绩；教练反馈；奖项或参赛证明。","注明年份、赛事与本人位置；挑选能辨认本人的图片。","","","中","部分已有","",""],
  [26,"体育 Sports","Dancing","sports.html · 05.03","[JAZZ AND BALLET TRAINING, REHEARSAL PROCESS, AND PERFORMANCE EXPERIENCE.]","英文介绍120–180词：舞种、学习年限、排练过程、演出经历、挑战、舞蹈对表达与纪律的影响。","dancing1.png；dancing2.png；dancing3.jpg","演出视频；节目单；舞台照；培训/比赛证明；作品名称与本人角色。","当前页面提示视频待补；注明舞种、演出名称、年份和场地。","","","高","部分已有","","缺少舞蹈视频"],
];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...await walk(p)); else files.push(p);
  }
  return files;
}

function assetMeta(file) {
  const rel = path.relative(root, file).replaceAll("\\", "/");
  const parts = rel.split("/");
  const ext = path.extname(file).slice(1).toUpperCase();
  let major = "其他";
  if (parts[1] === "home") major = "首页 Home";
  if (parts[1] === "ventures") major = "创业实践 Ventures";
  if (parts[1] === "leadership") major = "领导力 Leadership";
  if (parts[1] === "visual") major = "视觉创作 Visual";
  if (parts[1] === "sports") major = "体育 Sports";
  if (parts[1] === "documents") major = "通用文件 Documents";
  const sub = parts.length > 3 ? parts[2] : (parts[2] || "");
  const mediaType = ["JPG","JPEG","PNG","HEIC"].includes(ext) ? "图片" : ext === "MP4" ? "视频" : ext === "PDF" ? "PDF" : "其他";
  return [major, sub, path.basename(file), mediaType, rel, "已在素材目录", "请核对是否最终版本、是否可公开、是否需要英文说明"];
}

const assetFiles = (await walk(path.join(root, "assets"))).filter(f=>!path.basename(f).startsWith(".")).sort((a,b)=>a.localeCompare(b));
const assetRows = assetFiles.map(assetMeta);
const wb = Workbook.create();
const main = wb.worksheets.add("内容与素材清单");
const assets = wb.worksheets.add("现有素材索引");
const guide = wb.worksheets.add("填写说明");

main.showGridlines = false;
main.getRange("A2:O2").merge();
main.getRange("A2").values = [["网站英文内容与素材补充清单"]];
main.getRange("A2").format = { font:{name:font,size:16,bold:true,color:"#18212F"}, verticalAlignment:"center" };
main.getRange("A3:O3").merge();
main.getRange("A3").values = [["依据当前网站页面与 assets 目录整理｜黄色列为协作填写区｜更新日期：2026-09-23"]];
main.getRange("A3").format = { font:{name:font,size:10,italic:true,color:"#5B6472"} };
main.getRange("A4:O4").format.borders = { bottom:{style:"thin",color:"#B8C0CC"} };
main.getRange("A5:H5").values = [["总条目",rows.length,"待补充/待确认","=COUNTIF(M8:M200,\"待补充\")+COUNTIF(M8:M200,\"待确认\")","已有一定素材","=COUNTIF(M8:M200,\"部分已有\")+COUNTIF(M8:M200,\"大部分已有\")","高优先级","=COUNTIF(L8:L200,\"高\")"]];
main.getRange("A5:H5").format = { font:{name:font,size:10,bold:true,color:"#FFFFFF"}, fill:"#27364A", verticalAlignment:"center" };
main.getRange("B5,D5,F5,H5").format = { font:{name:font,size:11,bold:true,color:"#18212F"}, fill:"#DDE7F2", horizontalAlignment:"center" };
const headers = ["序号","大模块","子模块","页面位置","现有英文介绍 / 占位提示","需要补充的英文内容清单","现有素材清单","建议补充素材清单","素材规格 / 注意事项","内容负责人","素材负责人","优先级","状态","截止日期","反馈 / 备注"];
main.getRange("A7:O7").values = [headers];
main.getRange(`A8:O${7+rows.length}`).values = rows;
main.getRange("A7:O7").format = { fill:"#1F4E78", font:{name:font,size:10,bold:true,color:"#FFFFFF"}, horizontalAlignment:"center", verticalAlignment:"center", wrapText:true, borders:{preset:"inside",style:"thin",color:"#FFFFFF"} };
main.getRange(`A8:O${7+rows.length}`).format = { font:{name:font,size:10,color:"#202936"}, verticalAlignment:"top", wrapText:true, borders:{bottom:{style:"thin",color:"#D9DEE6"}} };
main.getRange(`A8:A${7+rows.length}`).format.horizontalAlignment = "center";
main.getRange(`J8:O${7+rows.length}`).format.fill = "#FFF4CC";
main.getRange(`L8:M${7+rows.length}`).format.horizontalAlignment = "center";
main.getRange(`N8:N${7+rows.length}`).format.numberFormat = "yyyy-mm-dd";
main.getRange(`L8:L${7+rows.length}`).dataValidation = { rule:{type:"list",values:["高","中","低"]} };
main.getRange(`M8:M${7+rows.length}`).dataValidation = { rule:{type:"list",values:["待补充","待确认","部分已有","大部分已有","已完成","不适用"]} };
main.getRange(`M8:M${7+rows.length}`).conditionalFormats.add("containsText",{text:"待补充",format:{fill:"#FDE8E7",font:{color:"#B42318",bold:true}}});
main.getRange(`M8:M${7+rows.length}`).conditionalFormats.add("containsText",{text:"待确认",format:{fill:"#FFF0D6",font:{color:"#9A4E00",bold:true}}});
main.getRange(`M8:M${7+rows.length}`).conditionalFormats.add("containsText",{text:"已完成",format:{fill:"#E5F4EA",font:{color:"#1D6B3A",bold:true}}});
main.getRange(`L8:L${7+rows.length}`).conditionalFormats.add("containsText",{text:"高",format:{fill:"#FADBD8",font:{color:"#A61B1B",bold:true}}});
main.getRange("A7:O7").format.rowHeight = 34;
main.getRange(`A8:O${7+rows.length}`).format.rowHeight = 86;
const widths = [7,18,25,20,44,50,38,42,38,14,14,10,14,14,24];
widths.forEach((w,i)=>main.getRangeByIndexes(0,i,7+rows.length,1).format.columnWidth=w);
main.freezePanes.freezeRows(7);
main.freezePanes.freezeColumns(3);
const mainTable = main.tables.add(`A7:O${7+rows.length}`,true,"ContentMaterialChecklist");
mainTable.style = "TableStyleMedium2";

assets.showGridlines = false;
assets.getRange("A2:G2").merge();
assets.getRange("A2").values = [["现有素材索引"]];
assets.getRange("A2").format = {font:{name:font,size:16,bold:true,color:"#18212F"}};
assets.getRange("A3:G3").merge();
assets.getRange("A3").values = [[`自动盘点 assets 目录，共 ${assetRows.length} 个文件。请在使用前确认版本、版权和公开权限。`]];
assets.getRange("A3").format = {font:{name:font,size:10,italic:true,color:"#5B6472"}};
assets.getRange("A5:G5").values = [["大模块","素材文件夹 / 对应项目","文件名","类型","相对路径","当前状态","核对事项"]];
assets.getRange(`A6:G${5+assetRows.length}`).values = assetRows;
assets.getRange("A5:G5").format = {fill:"#1F4E78",font:{name:font,size:10,bold:true,color:"#FFFFFF"},horizontalAlignment:"center",verticalAlignment:"center",wrapText:true,borders:{preset:"inside",style:"thin",color:"#FFFFFF"}};
assets.getRange(`A6:G${5+assetRows.length}`).format = {font:{name:font,size:10,color:"#202936"},verticalAlignment:"top",wrapText:false,borders:{bottom:{style:"thin",color:"#E3E7ED"}}};
[20,28,34,12,68,16,44].forEach((w,i)=>assets.getRangeByIndexes(0,i,5+assetRows.length,1).format.columnWidth=w);
assets.getRange("A5:G5").format.rowHeight = 32;
assets.freezePanes.freezeRows(5);
assets.freezePanes.freezeColumns(2);
const assetTable = assets.tables.add(`A5:G${5+assetRows.length}`,true,"AssetInventory");
assetTable.style = "TableStyleMedium2";

guide.showGridlines = false;
guide.getRange("A2:F2").merge();
guide.getRange("A2").values = [["填写说明"]];
guide.getRange("A2").format = {font:{name:font,size:16,bold:true,color:"#18212F"}};
guide.getRange("A4:B4").values = [["区域","填写要求"]];
guide.getRange("A5:B12").values = [
  ["内容负责人","负责收集事实、起草或审核英文介绍的人。"],
  ["素材负责人","负责查找、筛选、导出并确认素材授权的人。"],
  ["优先级","高：直接影响网站主要页面或当前存在明显占位；中：已有基础但需补全；低：可后续优化。"],
  ["状态","待补充、待确认、部分已有、大部分已有、已完成或不适用。"],
  ["英文内容","请提供可核实的时间、地点、角色、行动、结果与反思；避免只写形容词。"],
  ["图片","优先原图，保留高分辨率；同时提供英文题名、年份、地点、人物和摄影者/版权信息。"],
  ["视频","建议1080p；提供英文标题、封面、字幕/逐字稿、时长和公开权限。"],
  ["证明文件","证书、奖项、项目PDF如为中文，另提供官方英文名或100词以内英文摘要。"],
];
guide.getRange("D4:F4").values = [["交付建议","推荐命名","示例"]];
guide.getRange("D5:F10").values = [
  ["英文文案","模块_子模块_EnglishCopy_v01.docx","Leadership_HeadPrefect_EnglishCopy_v01.docx"],
  ["图片","模块_子模块_序号_年份.jpg","Sports_FigureSkating_01_2025.jpg"],
  ["视频","模块_子模块_内容_年份.mp4","Home_StudentSpeech_Highlights_2026.mp4"],
  ["字幕","与视频同名_en.srt","Home_StudentSpeech_Highlights_2026_en.srt"],
  ["证明文件","模块_子模块_证明类型_年份.pdf","Ventures_BPA_AwardCertificate_2026.pdf"],
  ["版本管理","文件名末尾使用v01、v02；最终版标记FINAL","Visual_Documentary_DirectorsNote_FINAL.docx"],
];
guide.getRange("A4:B4").format = guide.getRange("D4:F4").format = {fill:"#1F4E78",font:{name:font,size:10,bold:true,color:"#FFFFFF"},horizontalAlignment:"center",verticalAlignment:"center"};
guide.getRange("A5:B12").format = guide.getRange("D5:F10").format = {font:{name:font,size:10,color:"#202936"},verticalAlignment:"top",wrapText:true,borders:{bottom:{style:"thin",color:"#D9DEE6"}}};
[18,72,5,20,42,52].forEach((w,i)=>guide.getRangeByIndexes(0,i,12,1).format.columnWidth=w);
guide.getRange("A5:B12").format.rowHeight = 44;
guide.getRange("D5:F10").format.rowHeight = 44;

wb.recalculate();
const checkMain = await wb.inspect({kind:"table",range:"内容与素材清单!A2:O15",include:"values,formulas",tableMaxRows:15,tableMaxCols:15});
const checkAssets = await wb.inspect({kind:"table",range:"现有素材索引!A2:G12",include:"values,formulas",tableMaxRows:12,tableMaxCols:7});
const errors = await wb.inspect({kind:"match",searchTerm:"#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!",options:{useRegex:true,maxResults:100},summary:"final formula error scan"});
console.log(checkMain.ndjson);
console.log(checkAssets.ndjson);
console.log(errors.ndjson);
const previewDir = "C:/Users/chu/.codex/visualizations/2026/09/23/01a0cee1-4715-7f30-b567-695fe16fff7a";
const p1 = await wb.render({sheetName:"内容与素材清单",range:"A1:O18",scale:1,format:"png"});
await fs.writeFile(path.join(previewDir,"content-checklist-main.png"),new Uint8Array(await p1.arrayBuffer()));
const p2 = await wb.render({sheetName:"现有素材索引",range:"A1:G18",scale:1,format:"png"});
await fs.writeFile(path.join(previewDir,"content-checklist-assets.png"),new Uint8Array(await p2.arrayBuffer()));
const p3 = await wb.render({sheetName:"填写说明",range:"A1:F13",scale:1,format:"png"});
await fs.writeFile(path.join(previewDir,"content-checklist-guide.png"),new Uint8Array(await p3.arrayBuffer()));
const xlsx = await SpreadsheetFile.exportXlsx(wb);
await xlsx.save(outputPath);
console.log(`OUTPUT=${outputPath}`);
