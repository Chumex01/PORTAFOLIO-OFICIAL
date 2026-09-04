const KNOWLEDGE_BASE = [
  {keywords:["hola","buenas","hey","hi"],response:"¡Hola! 👋 Soy el asistente virtual de Cesar. ¿En qué puedo ayudarte? Puedo contarte sobre sus servicios, cursos, tecnologías o experiencia."},
  {keywords:["servicio","servicios","ofreces","haces","trabajas"],response:"Cesar ofrece:\\n• Desarrollo de sistemas web a medida\\n• Sistemas POS inteligentes\\n• Apps con geolocalización\\n• APIs y backend\\n• Dashboards / BI\\n• Análisis de requerimientos\\n• IA / MCP"},
  {keywords:["precio","costo","cuanto","cobras"],response:"📊 Cursos:\\n• Análisis de Requerimientos: $15 USD\\n• Introducción a SQL: $20 USD\\n• Full Stack Next.js + FastAPI: $25 USD\\n\\n💻 Servicios a medida: desde $500 USD."},
  {keywords:["tecnologia","tecnologías","stack","lenguaje","programa","usa"],response:"🛠️ Stack principal:\\n• Frontend: HTML, CSS, JavaScript, React, Next.js, TypeScript, Vue\\n• Backend: FastAPI, NestJS, Node.js, Laravel\\n• DB: PostgreSQL, MySQL, SQL Server\\n• Otros: Git, Docker, Linux, MCP"},
  {keywords:["experiencia","trabajo","empresa","proyecto"],response:"💼 Experiencia:\\n• INFOCRED BI — Análisis de Sistemas\\n• UPDS — Gestión Digital / Desarrollo\\n• Bomberos de Bolivia — Desarrollo Web y geolocalización\\n• Proyectos propios de POS, BI, plataformas y asistentes IA/MCP."},
  {keywords:["contacto","email","telefono","whatsapp"],response:"📞 Contacto:\\n• Email: chumex012020@gmail.com\\n• Teléfono: +591 73054902\\n• Ubicación: La Paz, Bolivia\\n• También puedes usar el formulario de contacto."},
  {keywords:["curso","cursos","aprender","capacitacion"],response:"📚 Cursos disponibles:\\n1. Full Stack Next.js & FastAPI — $25\\n2. Análisis de Requerimientos — $15\\n3. Introducción a SQL — $20"},
  {keywords:["gracias","genial","perfecto"],response:"¡De nada! 😊 Si tienes otra duda, aquí estoy."}
];

function normalize(text){
  return text.toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g,"");
}

function getBotResponse(message){
  const text = normalize(message);
  let best = null, bestScore = 0;
  for(const item of KNOWLEDGE_BASE){
    const score = item.keywords.reduce((sum,k)=>sum + (text.includes(normalize(k)) ? 1 : 0),0);
    if(score > bestScore){bestScore=score;best=item;}
  }
  return best ? best.response : "No tengo esa información en mi base de conocimientos todavía. Puedes preguntarme por servicios, precios, cursos, tecnologías, experiencia o contacto.";
}

const chatButton=document.getElementById("chatButton");
const chatPanel=document.getElementById("chatPanel");
const closeChat=document.getElementById("closeChat");
const chatMessages=document.getElementById("chatMessages");
const chatForm=document.getElementById("chatForm");
const chatInput=document.getElementById("chatInput");

function addMessage(text,type){
  const div=document.createElement("div");
  div.className=`chat-msg ${type}`;
  div.textContent=text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop=chatMessages.scrollHeight;
}

function openChat(){
  chatPanel.classList.add("open");
  chatPanel.setAttribute("aria-hidden","false");
  chatInput.focus();
}
function hideChat(){
  chatPanel.classList.remove("open");
  chatPanel.setAttribute("aria-hidden","true");
}
chatButton.addEventListener("click",()=>chatPanel.classList.contains("open")?hideChat():openChat());
closeChat.addEventListener("click",hideChat);

chatForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  const message=chatInput.value.trim();
  if(!message)return;
  addMessage(message,"user");
  chatInput.value="";
  setTimeout(()=>addMessage(getBotResponse(message),"bot"),250);
});

document.querySelectorAll(".chat-suggestions button").forEach(btn=>{
  btn.addEventListener("click",()=>{
    chatInput.value=btn.dataset.question;
    chatForm.requestSubmit();
  });
});

const menuToggle=document.getElementById("menuToggle");
const navMenu=document.getElementById("navMenu");
menuToggle.addEventListener("click",()=>navMenu.classList.toggle("open"));
navMenu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>navMenu.classList.remove("open")));

const contactForm=document.getElementById("contactForm");
const formStatus=document.getElementById("formStatus");

contactForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  const data=new FormData(contactForm);
  const nombre=data.get("nombre");
  const email=data.get("email");
  const mensaje=data.get("mensaje");
  const subject=encodeURIComponent(`Contacto desde portafolio — ${nombre}`);
  const body=encodeURIComponent(`Nombre: ${nombre}\\nEmail: ${email}\\n\\nMensaje:\\n${mensaje}`);
  window.location.href=`mailto:chumex012020@gmail.com?subject=${subject}&body=${body}`;
  formStatus.textContent="> Preparando cliente de correo...";
});
