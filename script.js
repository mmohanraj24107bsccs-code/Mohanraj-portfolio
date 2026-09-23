(function(){
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
/* loader */
const words=['Design','Create','Inspire'];let wi=0;
const wt=setInterval(()=>{wi=(wi+1)%3;const w=$('#word');w.textContent=words[wi];w.animate([{opacity:0,transform:'translateY(20px)'},{opacity:.8,transform:'none'}],{duration:400})},900);
const t0=performance.now();
function tick(t){const p=Math.min((t-t0)/2700,1),c=Math.round(p*100);
$('#count').textContent=String(c).padStart(3,'0');$('#bar i').style.transform='scaleX('+c/100+')';
if(p<1)requestAnimationFrame(tick);else setTimeout(done,400)}
requestAnimationFrame(tick);
function done(){clearInterval(wt);const l=$('#loader');l.style.opacity=0;setTimeout(()=>l.remove(),600);
if(window.gsap&&!reduce){gsap.set('.n',{opacity:0});
gsap.timeline({defaults:{ease:'power3.out'}}).fromTo('#nm',{opacity:0,y:50},{opacity:1,y:0,duration:1.2,delay:.1})
.fromTo('.n:not(#nm)',{opacity:0,y:20,filter:'blur(10px)'},{opacity:1,y:0,filter:'blur(0px)',duration:1,stagger:.1},.3)}}
/* roles */
const roles=['Web Developer','Fullstack Dev','Problem Solver','3D Enthusiast'];let ri=0;
setInterval(()=>{ri=(ri+1)%roles.length;const r=$('#role');r.textContent=roles[ri];r.style.animation='none';r.offsetWidth;r.style.animation=''},2000);
/* nav */
addEventListener('scroll',()=>$('#pill').classList.toggle('s',scrollY>100),{passive:true});
const links=$$('nav a.l'),secs=['home','skills','work','live','journey'].map(i=>document.getElementById(i));
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-45% 0px -50% 0px'});
secs.forEach(s=>so.observe(s));
/* reveal */
const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');ro.unobserve(e.target)}}),{rootMargin:'0px 0px -100px 0px'});
$$('.rv').forEach(e=>ro.observe(e));
/* marquee */
const mq=$('#mq');mq.innerHTML=mq.innerHTML.repeat(10);
if(window.gsap&&!reduce)gsap.to(mq,{xPercent:-50,duration:40,ease:'none',repeat:-1});
/* tilt cards */
$$('.tilt').forEach(c=>{
c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
c.style.transform='rotateY('+x*14+'deg) rotateX('+-y*14+'deg) translateZ(10px)'});
c.addEventListener('mouseleave',()=>c.style.transform='')});
/* three.js scenes */
function scene(cv,opts){
if(!window.THREE)return null;
const R=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});R.setPixelRatio(Math.min(devicePixelRatio,2));
const S=new THREE.Scene(),C=new THREE.PerspectiveCamera(50,1,.1,100);C.position.z=opts.z;
const g=new THREE.Group();S.add(g);if(opts.knot&&innerWidth>900)g.position.x=2.3;
const col=new THREE.Color(0x89AACC),col2=new THREE.Color(0x4E85BF);
if(opts.knot){const k=new THREE.Mesh(new THREE.TorusKnotGeometry(1.3,.38,160,20),new THREE.MeshBasicMaterial({color:col2,wireframe:true,transparent:true,opacity:.35}));g.add(k);
const ic=new THREE.Mesh(new THREE.IcosahedronGeometry(.75,1),new THREE.MeshBasicMaterial({color:col,wireframe:true,transparent:true,opacity:.6}));g.add(ic);g.userData.ic=ic;g.userData.rings=[1,2].map(i=>{const r=new THREE.Mesh(new THREE.TorusGeometry(2.1+i*.5,.012,8,160),new THREE.MeshBasicMaterial({color:i==1?col:col2,transparent:true,opacity:.7}));r.rotation.x=1+i;g.add(r);return r})}
const n=opts.n,pos=new Float32Array(n*3);for(let i=0;i<n*3;i++)pos[i]=(Math.random()-.5)*opts.spread;
const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pos,3));
const pts=new THREE.Points(pg,new THREE.PointsMaterial({color:col,size:.03,transparent:true,opacity:.8}));S.add(pts);
let mx=0,my=0;addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
function size(){const w=cv.clientWidth,h=cv.clientHeight;R.setSize(w,h,false);C.aspect=w/h;C.updateProjectionMatrix()}
size();addEventListener('resize',size);
let vis=true;new IntersectionObserver(e=>vis=e[0].isIntersecting).observe(cv);
(function loop(){requestAnimationFrame(loop);if(!vis)return;
const t=performance.now()*.0004;
g.rotation.y+=(mx*1.2+Math.sin(t)*.6-g.rotation.y)*.05;g.rotation.x+=(my*.8-g.rotation.x)*.05;
if(g.userData.rings){g.userData.rings[0].rotation.z=t*4;g.userData.rings[1].rotation.y=-t*3}if(g.userData.ic){g.userData.ic.rotation.x=-t*3;g.userData.ic.rotation.y=t*2}
pts.rotation.y=t*.6+scrollY*.0004;pts.position.y=scrollY*.0006;
R.render(S,C)})();return true}

function hero(cv){
if(!window.THREE)return;
const R=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});R.setPixelRatio(Math.min(devicePixelRatio,2));
const S=new THREE.Scene(),C=new THREE.PerspectiveCamera(45,1,.1,100);C.position.z=10;
const desk=innerWidth>900,g=new THREE.Group(),h=new THREE.Group();g.position.x=h.position.x=desk?2.6:0;g.scale.setScalar(desk?1:.65);S.add(g,h);
const N=110,P=[];for(let i=0;i<N;i++){const u=Math.random()*2-1,a=Math.random()*6.283,r=2.2+Math.random()*1.1,s=Math.sqrt(1-u*u);P.push(new THREE.Vector3(s*Math.cos(a)*r,u*r,s*Math.sin(a)*r))}
const E=[],pa=[];for(let i=0;i<N;i++)for(let j=i+1;j<N;j++)if(P[i].distanceTo(P[j])<1.35){E.push([i,j]);pa.push(P[i].x,P[i].y,P[i].z,P[j].x,P[j].y,P[j].z)}
const lg=new THREE.BufferGeometry();lg.setAttribute('position',new THREE.Float32BufferAttribute(pa,3));
g.add(new THREE.LineSegments(lg,new THREE.LineBasicMaterial({color:0x4E85BF,transparent:true,opacity:.3})));
g.add(new THREE.Points(new THREE.BufferGeometry().setFromPoints(P),new THREE.PointsMaterial({color:0xBFD6EE,size:.09,transparent:true,opacity:.95})));
const M=40,pl=Array.from({length:M},()=>({e:E[Math.random()*E.length|0],t:Math.random(),v:.004+Math.random()*.008})),pp=new Float32Array(M*3),pg=new THREE.BufferGeometry();
pg.setAttribute('position',new THREE.BufferAttribute(pp,3));g.add(new THREE.Points(pg,new THREE.PointsMaterial({color:0xffffff,size:.17,transparent:true,opacity:.9})));
const K='#c792ea',T='#a5d6a7',F='#82aaff',W='#e6e6e6',Q='#7f8ea3';
function rr(x,a,b,w,hh,r){x.beginPath();x.moveTo(a+r,b);x.arcTo(a+w,b,a+w,b+hh,r);x.arcTo(a+w,b+hh,a,b+hh,r);x.arcTo(a,b+hh,a,b,r);x.arcTo(a,b,a+w,b,r);x.closePath()}
function panel(lines,w,hh,pos,ry){const c=document.createElement('canvas');c.width=512;c.height=Math.round(512*hh/w);const x=c.getContext('2d');
x.fillStyle='rgba(14,16,22,.94)';rr(x,2,2,c.width-4,c.height-4,22);x.fill();x.strokeStyle='rgba(137,170,204,.55)';x.lineWidth=3;x.stroke();
['#ff5f57','#febc2e','#28c840'].forEach((k,i)=>{x.fillStyle=k;x.beginPath();x.arc(32+i*26,34,8,0,7);x.fill()});
x.font='22px monospace';lines.forEach((l,i)=>{let px=30;l.forEach(([t,k])=>{x.fillStyle=k;x.fillText(t,px,88+i*32);px+=x.measureText(t).width})});
const m=new THREE.Mesh(new THREE.PlaneGeometry(w,hh),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(c),transparent:true,opacity:desk?.95:.35,side:THREE.DoubleSide}));
m.position.set(...pos);m.rotation.y=ry;m.userData.y=pos[1];h.add(m);return m}
const ps=[panel([[['const ',K],['dev',F],[' = {',W]],[['  name: ',W],["'Mohan Raj M'",T],[',',W]],[['  role: ',W],["'Web Developer'",T],[',',W]],[['  stack: [',W],["'React'",T],[', ',W],["'Node'",T],[',',W]],[["    'SQL'",T],[', ',W],["'Three.js'",T],[']',W]],[['};',W]]],3.3,2.1,[-1,2.6,1.6],.35),
panel([[['$ ',T],['npm run build',W]],[['✓ ',T],['build successful',Q]],[['$ ',T],['git push origin main',W]],[['✓ ',T],['deployed',Q]]],3.1,1.7,[2.3,-2.1,2.2],-.4),
panel([[['GET ',K],['/api/projects',T]],[['200 OK',F],[' · application/json',Q]],[['[{ ',W],['"id"',F],[': 1, ',W],['"live"',F],[': true }]',W]]],3,1.5,[-1.7,-2.6,2.4],.25)];
let mx=0,my=0;addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
function size(){const w=cv.clientWidth,hh=cv.clientHeight;R.setSize(w,hh,false);C.aspect=w/hh;C.updateProjectionMatrix()}size();addEventListener('resize',size);
let vis=true;new IntersectionObserver(e=>vis=e[0].isIntersecting).observe(cv);
(function loop(){requestAnimationFrame(loop);if(!vis)return;const t=performance.now()*.001;
g.rotation.y+=(t*.15+mx*.8-g.rotation.y)*.06;g.rotation.x+=(my*.5-g.rotation.x)*.06;
h.rotation.y+=(mx*.3-h.rotation.y)*.05;h.rotation.x+=(-my*.15-h.rotation.x)*.05;
ps.forEach((m,i)=>m.position.y=m.userData.y+Math.sin(t*.8+i*2)*.15);
pl.forEach((q,i)=>{q.t+=q.v;if(q.t>1){q.t=0;q.e=E[Math.random()*E.length|0]}const a=P[q.e[0]],b=P[q.e[1]];pp[i*3]=a.x+(b.x-a.x)*q.t;pp[i*3+1]=a.y+(b.y-a.y)*q.t;pp[i*3+2]=a.z+(b.z-a.z)*q.t});
pg.attributes.position.needsUpdate=true;R.render(S,C)})()}
hero($('#gl'));
scene($('#cgl'),{z:5,n:1200,spread:16,knot:false});
/* skill sphere */
const sk=['HTML5','CSS3','JavaScript','TypeScript','React','Node.js','Express','MongoDB','SQL','Tailwind','Three.js','GSAP','Git','Linux','DSA','OOP','DBMS','OS','Networks','REST','JWT','System Design','Testing','Figma'];
const sp=$('#sphere'),items=sk.map((s,i)=>{const el=document.createElement('span');el.textContent=s;sp.appendChild(el);
const y=1-(i/(sk.length-1))*2,r=Math.sqrt(1-y*y),a=i*2.399963;return{el,x:Math.cos(a)*r,y,z:Math.sin(a)*r}});
let ax=.002,ay=.004,drag=false,lx=0,ly=0;
sp.addEventListener('pointerdown',e=>{drag=true;lx=e.clientX;ly=e.clientY;sp.style.cursor='grabbing'});
addEventListener('pointerup',()=>{drag=false;sp.style.cursor='grab'});
addEventListener('pointermove',e=>{if(!drag)return;ay=(e.clientX-lx)*.0008;ax=-(e.clientY-ly)*.0008;lx=e.clientX;ly=e.clientY});
let svis=true;new IntersectionObserver(e=>svis=e[0].isIntersecting).observe(sp);
function spin(){requestAnimationFrame(spin);if(!svis)return;
const R=Math.min(sp.clientWidth,sp.clientHeight)*.38,cx=Math.cos(ax),sx=Math.sin(ax),cy=Math.cos(ay),sy=Math.sin(ay);
if(!drag){ax*=.98;ay=ay*.98+(reduce?0:.004)*.02}
items.forEach(p=>{let y=p.y*cx-p.z*sx,z=p.y*sx+p.z*cx,x=p.x*cy+z*sy;z=-p.x*sy+z*cy;p.x=x;p.y=y;p.z=z;
const s=(z+2)/3;p.el.style.transform='translate(-50%,-50%) translate3d('+x*R+'px,'+y*R+'px,'+z*R+'px) scale('+(.7+.4*s)+')';
p.el.style.opacity=.3+.7*(z+1)/2;p.el.style.zIndex=Math.round(z*10)+10})}
spin();

/* photo tilt */
const ph=$('#ph .in');addEventListener('pointermove',e=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;ph.style.transform='rotateY('+x*16+'deg) rotateX('+-y*12+'deg)'});
/* sorting visualizer */
const bars=$('#bars');let arr=[],run=false,tok=0;
function draw(h){h=h||{};bars.innerHTML=arr.map((v,i)=>'<i style="height:'+v+'%;'+(h[i]?'background:'+h[i]:'')+'"></i>').join('')}
function newArr(){tok++;run=false;$('#st').textContent=0;arr=Array.from({length:34},()=>8+Math.random()*92|0);draw()}
const sleep=()=>new Promise(r=>setTimeout(r,+$('#spd').value)),O='#f59e0b',R='#ef4444',G='#34d399';
async function* bubble(){for(let i=0;i<arr.length;i++)for(let j=0;j<arr.length-i-1;j++){yield{[j]:O,[j+1]:O};if(arr[j]>arr[j+1]){[arr[j],arr[j+1]]=[arr[j+1],arr[j]];yield{[j]:R,[j+1]:R}}}}
async function* insertion(){for(let i=1;i<arr.length;i++){let j=i;while(j>0&&arr[j-1]>arr[j]){[arr[j],arr[j-1]]=[arr[j-1],arr[j]];yield{[j]:R,[j-1]:O};j--}}}
async function* selection(){for(let i=0;i<arr.length;i++){let m=i;for(let j=i+1;j<arr.length;j++){yield{[i]:'#89AACC',[j]:O,[m]:R};if(arr[j]<arr[m])m=j}[arr[i],arr[m]]=[arr[m],arr[i]];yield{[i]:G}}}
async function* quick(lo=0,hi=arr.length-1){if(lo>=hi)return;const p=arr[hi];let i=lo;for(let j=lo;j<hi;j++){yield{[j]:O,[hi]:'#89AACC'};if(arr[j]<p){[arr[i],arr[j]]=[arr[j],arr[i]];i++;yield{[i]:R,[j]:R}}}[arr[i],arr[hi]]=[arr[hi],arr[i]];yield{[i]:G};yield*quick(lo,i-1);yield*quick(i+1,hi)}
async function go(){if(run)return;run=true;const my=++tok,g={bubble,insertion,selection,quick}[$('#alg').value]();let n=0;
for await(const h of g){if(my!==tok)return;$('#st').textContent=++n;draw(h);await sleep()}
draw(Object.fromEntries(arr.map((_,i)=>[i,G])));run=false}
$('#go').onclick=go;$('#shuf').onclick=newArr;newArr();
/* project board */
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let tasks=null;try{tasks=JSON.parse(localStorage.getItem('mr-board'))}catch(e){}
tasks=tasks||[{t:'Design database schema',s:2},{t:'Build REST API',s:1},{t:'Polish the UI',s:0}];
function board(){[0,1,2].forEach(s=>{$('#c'+s).innerHTML=tasks.map((k,i)=>k.s!==s?'':'<div class="tk"><span>'+esc(k.t)+'</span><em>'+(s>0?'<button data-i="'+i+'" data-d="-1" aria-label="Move back">←</button>':'')+(s<2?'<button data-i="'+i+'" data-d="1" aria-label="Move forward">→</button>':'')+'<button data-i="'+i+'" data-d="x" aria-label="Delete">✕</button></em></div>').join('');$('#n'+s).textContent=tasks.filter(k=>k.s===s).length});
const p=tasks.length?Math.round(tasks.filter(k=>k.s===2).length/tasks.length*100):0;$('#pg').style.width=p+'%';$('#pc').textContent=p+'%';try{localStorage.setItem('mr-board',JSON.stringify(tasks))}catch(e){}}
$('.kb').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const i=+b.dataset.i,d=b.dataset.d;if(d==='x')tasks.splice(i,1);else tasks[i].s+=+d;board()});
function add(){const v=$('#ti').value.trim();if(!v)return;tasks.push({t:v,s:0});$('#ti').value='';board()}
$('#add').onclick=add;$('#ti').addEventListener('keydown',e=>{if(e.key==='Enter')add()});board();
setInterval(()=>$('#clk').textContent='Live · '+new Date().toLocaleTimeString(),1000);
/* live dashboard */
const ser=Array.from({length:60},()=>320);let users=1200;
setInterval(()=>{users=Math.max(800,users+Math.round((Math.random()-.45)*40));const rps=Math.round(320+Math.random()*100+Math.sin(Date.now()/4000)*80);ser.push(rps);ser.shift();
$('#k1').textContent=users.toLocaleString();$('#k2').textContent=rps;$('#k3').textContent=Math.round(40+Math.random()*25)+' ms';
const xy=ser.map((v,i)=>(i*600/59).toFixed(1)+','+(150-(v-200)/320*130).toFixed(1));
$('#ln').setAttribute('points',xy.join(' '));$('#ar').setAttribute('d','M0,160 L'+xy.join(' L')+' L600,160Z')},1000);
})();
