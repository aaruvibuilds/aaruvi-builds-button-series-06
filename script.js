const btn=document.getElementById("deleteBtn"),app=document.getElementById("app"),caption=document.getElementById("caption"),count=document.getElementById("count"),particles=document.getElementById("particles");
let busy=false,pressed=false;
const vectors=[[-92,-58,-32],[-68,-104,25],[-38,-72,-12],[-15,-116,41],[20,-94,-26],[52,-110,18],[86,-63,-36],[-105,-8,22],[-72,22,-40],[-42,66,18],[-8,94,-28],[34,76,35],[73,52,-18],[106,9,28],[-96,42,14],[96,-29,-31],[-55,-18,44],[57,28,-45],[-25,51,30],[27,-45,-25],[115,55,15],[-116,-35,-18]];
function makeParticles(){particles.innerHTML="";vectors.forEach(([x,y,r])=>{const p=document.createElement("span");p.className="particle";p.style.setProperty("--x",x+"px");p.style.setProperty("--y",y+"px");p.style.setProperty("--r",r+"deg");particles.appendChild(p)})}
function label(t){btn.querySelector(".label").textContent=t}
function reset(){app.classList.remove("deleting","deleted","finish");btn.classList.remove("pressed","loading","success");btn.disabled=false;label("Delete");count.textContent="12";caption.textContent="DELETE SELECTED FILE";busy=false;pressed=false}
function start(){if(busy)return;busy=true;pressed=false;btn.classList.remove("pressed");btn.classList.add("loading");btn.disabled=true;label("Deleting");caption.textContent="REMOVING FILE";makeParticles();app.classList.add("deleting");
setTimeout(()=>caption.textContent="DISINTEGRATING",650);
setTimeout(()=>{btn.classList.remove("loading");btn.classList.add("success");label("Deleted");app.classList.add("deleted","finish");count.textContent="11";caption.textContent="FILE DELETED"},1500);
setTimeout(reset,4300)}
btn.addEventListener("pointerdown",()=>{if(busy)return;pressed=true;btn.classList.add("pressed");label("Release")});
btn.addEventListener("pointerup",()=>{if(pressed&&!busy)start()});
btn.addEventListener("pointercancel",()=>{pressed=false;btn.classList.remove("pressed");label("Delete")});
btn.addEventListener("pointerleave",()=>{if(!busy&&pressed){pressed=false;btn.classList.remove("pressed");label("Delete")}});
btn.addEventListener("keydown",e=>{if((e.key===" "||e.key==="Enter")&&!busy&&!e.repeat){e.preventDefault();btn.classList.add("pressed");label("Release")}});
btn.addEventListener("keyup",e=>{if(e.key===" "||e.key==="Enter"){e.preventDefault();if(!busy&&btn.classList.contains("pressed"))start()}});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&busy)reset()});
btn.addEventListener("pointermove",e=>{if(busy)return;const r=btn.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;btn.style.setProperty("--mx",x*.08+"px");btn.style.setProperty("--my",y*.08+"px")});
btn.addEventListener("pointerleave",()=>{btn.style.setProperty("--mx","0px");btn.style.setProperty("--my","0px")});