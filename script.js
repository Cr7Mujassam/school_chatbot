const data = window.SCHOOL_DATA;
const $ = (id) => document.getElementById(id);
const safe = (v) => String(v ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
$("statClasses").textContent = data.totalClasses;
$("statTeachers").textContent = data.totalTeachers;
$("statStudents").textContent = data.totalStudents;
$("statYear").textContent = data.established;
$("schoolIntro").textContent = data.intro;
$("schoolAddress").textContent = data.address;
$("schoolPhone").textContent = data.phone;
$("schoolEmail").textContent = data.email;
$("schoolTiming").textContent = "School timing: " + data.schoolTiming;
$("transportTiming").textContent = "Transport: " + data.transportTiming;
$("transportInfo").textContent = data.transport;
$("currentYear").textContent = new Date().getFullYear();

$("classCards").innerHTML = data.classes.map((c,i)=>`<article class="academic-card"><span>LEARNING · 0${i+1}</span><h3>${safe(c.name)}</h3><b>${safe(c.range)}</b><p>${safe(c.detail)}</p></article>`).join("");
$("facultyGrid").innerHTML = data.teachers.map(t=>`<article class="faculty-card"><div class="faculty-avatar">${safe(t.name.split(" ").map(x=>x[0]).slice(0,2).join("").toUpperCase())}</div><h3>${safe(t.name)}</h3><p>${safe(t.subject)}</p><small>${safe(t.qualification)}</small></article>`).join("");
function notices(items,id){$(id).innerHTML=items.map(x=>`<article class="notice-item"><div class="date-box"><b>${safe(x.day)}</b><small>${safe(x.month)}</small></div><div><h4>${safe(x.title)}</h4><p>${safe(x.detail)}</p></div></article>`).join("")}
notices(data.events,"eventList");notices(data.exams,"examList");

$("menuToggle").addEventListener("click",()=>$("mainNav").classList.toggle("show"));
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>$("mainNav").classList.remove("show")));
$("enquiryForm").addEventListener("submit",e=>{e.preventDefault();$("formMessage").textContent="Thank you! This is a demo. Connect a form backend to receive enquiries.";e.target.reset()});

const panel=$("chatPanel"), messages=$("chatMessages");
function openChat(){panel.classList.add("open");panel.setAttribute("aria-hidden","false");$("chatInput").focus()}
$("chatLauncher").addEventListener("click",openChat);
$("chatClose").addEventListener("click",()=>{panel.classList.remove("open");panel.setAttribute("aria-hidden","true")});
function addMessage(text,who){
 const el=document.createElement("div");
 el.className="message "+who;
 messages.appendChild(el);
 if(who==="bot"){
   let i=0;
   const speed=18; // milliseconds per character; increase for a slower typing effect
   const typeNext=()=>{
     if(i<text.length){
       el.textContent += text.charAt(i++);
       messages.scrollTop=messages.scrollHeight;
       window.setTimeout(typeNext,speed);
     }
   };
   typeNext();
 } else {
   el.textContent=text;
 }
 messages.scrollTop=messages.scrollHeight;
}
function answer(raw){
 const q = raw.toLowerCase().trim();
 const has = (...words) => words.some(w => q.includes(w));

 // School-specific answers always use the school's editable data.
 if(has("admission","apply","application","enroll","enrol")) return "For admission enquiries, please contact the school office. The official application process, eligibility, documents and dates should be confirmed directly with the school.\nPhone: "+data.phone+"\nEmail: "+data.email;
 if(has("principal","headmaster","headmistress")) return "Principal: "+data.principal+". Please contact the school office for leadership or appointment enquiries.";
 if(has("teacher","faculty","staff","qualification","subject")) return "Faculty information:\n"+data.teachers.map(t=>`${t.name} — ${t.subject}; ${t.qualification}`).join("\n");
 if(has("class","grade","standard","academic","school section")) return "Classes / learning groups:\n"+data.classes.map(c=>`${c.name}: ${c.range}`).join("\n");
 if(has("student","strength","total number")) return "The current student count has not been entered yet. Please confirm the latest figure with the school office.";
 if(has("timing","time","when school")) return "School timing: "+data.schoolTiming+". Please confirm any seasonal or exam-day changes with the school office.";
 if(has("transport","bus","van","route")) return "Transport information: "+data.transport+"\nTransport timing: "+data.transportTiming;
 if(has("event","annual day","sports","function","holiday")) return "School events:\n"+data.events.map(e=>`${e.day} ${e.month} — ${e.title}: ${e.detail}`).join("\n");
 if(has("exam","examination","test","date sheet","datesheet")) return "Examination information:\n"+data.exams.map(e=>`${e.day} ${e.month} — ${e.title}: ${e.detail}`).join("\n");
 if(has("address","location","where","reach")) return "School address: "+data.address;
 if(has("phone","contact","email","call","number")) return "Contact the school:\nAddress: "+data.address+"\nPhone: "+data.phone+"\nEmail: "+data.email;

 // General India knowledge for school-level questions.
 if(has("capital of india","capital india","indian capital")) return "The capital of India is New Delhi.";
 if(has("prime minister of india","who is the prime minister")) return "India's Prime Minister is a current-affairs fact that can change. Please verify the latest office-holder from an official Government of India source.";
 if(has("president of india","who is the president")) return "India's President is a current-affairs fact that can change. Please verify the latest office-holder from the official President of India website.";
 if(has("national animal")) return "The national animal of India is the Bengal tiger.";
 if(has("national bird")) return "The national bird of India is the Indian peacock (Indian peafowl).";
 if(has("national flower")) return "The national flower of India is the lotus.";
 if(has("national anthem")) return "India's national anthem is Jana Gana Mana, written by Rabindranath Tagore.";
 if(has("national song")) return "India's national song is Vande Mataram, written by Bankim Chandra Chatterjee.";
 if(has("independence day")) return "India celebrates Independence Day on 15 August. India became independent from British rule in 1947.";
 if(has("republic day")) return "India celebrates Republic Day on 26 January. The Constitution of India came into effect on 26 January 1950.";
 if(has("constitution of india","indian constitution")) return "The Constitution is the supreme law of India. It was adopted on 26 November 1949 and came into effect on 26 January 1950.";
 if(has("how many states","states in india","union territories")) return "India has 28 states and 8 Union Territories.";
 if(has("largest state of india","biggest state of india")) return "Rajasthan is India's largest state by area.";
 if(has("smallest state of india")) return "Goa is India's smallest state by area.";
 if(has("national river")) return "The Ganga (Ganges) is commonly described as India's national river.";
 if(has("currency of india","indian currency","money of india")) return "The currency of India is the Indian Rupee (₹).";
 if(has("isro","space agency of india")) return "ISRO stands for Indian Space Research Organisation. It is India's national space agency.";
 if(has("chandrayaan")) return "Chandrayaan is India's lunar exploration programme led by ISRO. Chandrayaan-3 successfully soft-landed near the Moon's south polar region in August 2023.";
 if(has("mangalyaan","mars orbiter")) return "Mangalyaan, also called the Mars Orbiter Mission, was India's first interplanetary mission. It entered Mars orbit in September 2014.";

 // General science: basic school-level explanations.
 if(has("photosynthesis")) return "Photosynthesis is the process by which green plants use sunlight, water and carbon dioxide to make food (glucose). Oxygen is released during this process.";
 if(has("gravity")) return "Gravity is the force of attraction between objects that have mass. Earth's gravity pulls objects towards the ground.";
 if(has("solar system","planets")) return "Our solar system has eight planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune. They orbit the Sun.";
 if(has("largest planet")) return "Jupiter is the largest planet in our solar system.";
 if(has("smallest planet")) return "Mercury is the smallest planet in our solar system.";
 if(has("red planet")) return "Mars is called the Red Planet because iron-rich minerals in its soil give it a reddish appearance.";
 if(has("human body","body parts")) return "The human body has many systems that work together. For example, the heart pumps blood, the lungs help us breathe, and the brain controls and coordinates body activities.";
 if(has("heart")) return "The heart is a muscular organ that pumps blood around the body through the circulatory system.";
 if(has("lungs","breathing","respiration")) return "The lungs help us breathe. They take oxygen from the air into the blood and remove carbon dioxide.";
 if(has("water formula","formula of water","h2o")) return "The chemical formula of water is H₂O. Each water molecule contains two hydrogen atoms and one oxygen atom.";
 if(has("boiling point of water","water boil")) return "At standard atmospheric pressure, pure water boils at about 100°C.";
 if(has("freezing point of water","water freeze")) return "At standard atmospheric pressure, pure water freezes at 0°C.";
 if(has("states of matter","solid liquid gas")) return "The three common states of matter are solid, liquid and gas. A solid keeps its shape, a liquid flows and takes the shape of its container, and a gas spreads to fill available space.";
 if(has("atom")) return "An atom is the smallest unit of an element that retains that element's chemical properties. Atoms contain protons, neutrons and electrons.";
 if(has("electricity")) return "Electricity is associated with electric charges. Electric current is the flow of electric charge through a conductor.";
 if(has("light travel","speed of light")) return "Light travels at approximately 300,000 kilometres per second in a vacuum.";
 if(has("sound travel","speed of sound")) return "Sound needs a medium such as air, water or a solid to travel. It cannot travel through a vacuum.";
 if(has("renewable energy")) return "Renewable energy comes from sources that are naturally replenished, such as sunlight, wind and flowing water.";
 if(has("environment","global warming","climate change")) return "We can help protect the environment by saving water and electricity, reducing waste, reusing and recycling materials, planting trees and choosing cleaner transport where possible.";
 if(has("dinosaur")) return "Dinosaurs were a diverse group of reptiles that lived millions of years ago. Non-avian dinosaurs became extinct about 66 million years ago.";

 if(has("hello","hi","hey","namaste")) return "Hello! 👋 I'm the Tender Hearts School Assistant. I can answer school questions, basic science questions and general India knowledge. What would you like to learn?";
 if(has("thank")) return "You're welcome! Keep asking questions and stay curious. 😊";
 return "I don't have a reliable prepared answer for that question yet. I can help with school information, basic science and general knowledge about India. Try asking in a different way, or contact the school office for school-specific information.";
}
function send(q){if(!q.trim())return;addMessage(q,"user");addMessage(answer(q),"bot")}
$("chatForm").addEventListener("submit",e=>{e.preventDefault();const q=$("chatInput").value;$("chatInput").value="";send(q)});
document.querySelectorAll(".suggestions button").forEach(b=>b.addEventListener("click",()=>send(b.dataset.question)));
