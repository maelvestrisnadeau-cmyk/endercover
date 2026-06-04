const socket = io();

// IDs MAL des personnages - chargés dynamiquement via Jikan API dans le navigateur
const CHAR_MAL_IDS = {
  // Naruto
  'Naruto':17,'Sasuke':13,'Itachi':5,'Kakashi':85,'Obito':10,
  'Minato':1,'Jiraiya':9,'Tsunade':8,'Gaara':42,'Rock Lee':64,
  'Pain':3932,'Madara':11,'Orochimaru':7,'Neji':65,'Shikamaru':63,
  'Hinata':98,'Sakura':105,'Hashirama':2,'Tobirama':3,'Kisame':11791,
  'Deidara':12,'Sasori':2153,'Konan':3131,'Temari':40,'Kankuro':41,
  'Choji':67,'Ino':68,'Kiba':66,'Shino':69,'Kurama':3134,
  'Killer Bee':10,$10:'Asuma',Asuma:107,'Danzo':3135,
  // Dragon Ball
  'Goku':246,'Vegeta':247,'Gohan':248,'Freezer':249,'Cell':250,
  'Broly':251,'Piccolo':252,'Boo':253,'Trunks':254,'Goten':255,
  'Krilin':256,'Bulma':257,'Bardock':258,'Beerus':259,'Whis':260,
  'Jiren':261,'Goku Black':262,'Zamasu':263,'Android 17':264,'Android 18':265,
  // One Piece
  'Luffy':40,'Zoro':60,'Sanji':62,'Nami':61,'Robin':63,
  'Shanks':64,'Ace':65,'Barbe Blanche':66,'Trafalgar Law':67,'Kaido':68,
  'Boa Hancock':69,'Usopp':70,'Chopper':71,'Brook':72,'Franky':73,
  'Jinbe':74,'Yamato':75,'Mihawk':76,'Sabo':77,'Garp':78,
  'Akainu':79,'Big Mom':80,'Blackbeard':81,'Doflamingo':82,'Katakuri':83,
  // Attack on Titan
  'Eren':1163,'Levi':1409,'Mikasa':1164,'Armin':1165,'Hange':1410,
  'Erwin':1411,'Reiner':1412,'Annie':1166,'Zeke':1413,'Historia':1414,
  'Connie':1415,'Sasha':1416,'Jean':1417,
  // Demon Slayer
  'Tanjiro':163268,'Nezuko':163269,'Zenitsu':163270,'Inosuke':163271,
  'Rengoku':163272,'Tengen':163273,'Muzan':163274,'Akaza':163275,
  'Shinobu':163276,'Kanao':163277,'Genya':163278,'Mitsuri':163279,
  'Obanai':163280,'Muichiro':163281,'Gyomei':163282,'Sanemi':163283,
  'Douma':163284,'Kokushibo':163285,'Yoriichi':163286,
  // JJK
  'Itadori':177947,'Megumi':177948,'Gojo':177949,'Sukuna':177950,
  'Nobara':177951,'Nanami':177952,'Yuta':177953,'Mahito':177954,
  'Hakari':177955,'Choso':177956,'Toge':177957,'Panda':177958,
  'Todo':177959,'Geto':177960,'Jogo':177961,'Kenjaku':177962,
  // MHA
  'Deku':57337,'Bakugo':57338,'Todoroki':57339,'All Might':57340,
  'Uraraka':57341,'Shigaraki':57342,'All For One':57343,'Hawks':57344,
  'Endeavor':57345,'Iida':57346,'Tsuyu':57347,'Twice':57348,
  'Toga':57349,'Dabi':57350,'Mirko':57351,'Eraser Head':57352,
  // Fairy Tail
  'Natsu':11920,'Lucy':11921,'Erza':11922,'Gray':11923,
  'Makarov':11924,'Gildarts':11925,'Laxus':11926,'Zeref':11927,
  'Acnologia':11928,'Wendy':11929,'Jellal':11930,'Mirajane':11931,
  'Mystogan':11932,'Elfman':11933,'Cana':11934,'Gajeel':11935,
  // Bleach
  'Ichigo':2,'Rukia':3,'Aizen':4,'Byakuya':5,'Zaraki':6,
  'Renji':7,'Orihime':8,'Uryu':9,'Urahara':10,'Yoruichi':11,
  'Yhwach':12,'Grimmjow':13,'Ulquiorra':14,'Toshiro':15,'Shunsui':16,
  'Gin':17,'Nelliel':18,'Starrk':19,'Chad':20,
  // One Punch Man
  'Saitama':137663,'Genos':137664,'Garou':137665,'Bang':137666,
  'Tornado':137667,'Metal Bat':137668,'King':137669,'Flashy Flash':137670,
  'Boros':137671,'Zombieman':137672,'Fubuki':137673,'Mumen Rider':137674,
  'Darkshine':137675,'Speed-o-Sound Sonic':137676,'Atomic Samurai':137677,
  // Black Clover
  'Asta':148448,'Yuno':148449,'Yami':148450,'Noelle':148451,
  'Julius':148452,'Luck':148453,'Magna':148454,'Mereoleona':148455,
  'Zenon':148456,'Vanessa':148457,'Dante':148458,'Licht':148459,
  // Fire Force
  'Shinra':170149,'Arthur':170150,'Tamaki':170151,'Obi':170152,
  'Maki':170153,'Burns':170154,'Joker':170155,'Sho':170156,
  'Benimaru':170157,'Viktor':170158,
  // Solo Leveling
  'Sung Jinwoo':254571,'Igris':254572,'Cha Hae-In':254573,'Beru':254574,
  'Thomas Andre':254575,'Ashborn':254576,
  // Blue Lock
  'Isagi':192900,'Rin':192901,'Bachira':192902,'Chigiri':192903,
  'Reo':192904,'Nagi':192905,'Kaiser':192906,'Barou':192907,
  'Shidou':192908,'Sae':192909,'Ego':192910,
  // Kuroko
  'Kuroko':54231,'Kagami':54232,'Aomine':54233,'Kise':54234,
  'Midorima':54235,'Murasakibara':54236,'Akashi':54237,'Hyuga':54238,
  'Momoi':54239,'Kiyoshi':54240,
  // Re:Zero
  'Subaru':118399,'Emilia':118400,'Rem':118401,'Ram':118402,
  'Beatrice':118403,'Roswaal':118404,'Reinhard':118405,'Echidna':118406,
  'Puck':118407,'Otto':118408,'Garfiel':118409,
  // Dr Stone
  'Senku':179073,'Tsukasa':179074,'Chrome':179075,'Kohaku':179076,
  'Gen':179077,'Ryusui':179078,'Suika':179079,'Taiju':179080,
  // City Hunter
  'Ryo Saeba':1263,'Kaori':1264,'Umibozu':1265,
};

// Cache des images déjà chargées
const imgCache = {};

// Pokemon via PokeAPI (100% fiable, pas besoin de Jikan)
const POKEMON_IMGS = {
  'Pikachu':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
  'Raichu':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png',
  'Dracaufeu':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
  'Salamèche':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
  'Mewtwo':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png',
  'Mew':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png',
  'Dracolosse':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png',
  'Evoli':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png',
  'Darkrai':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/491.png',
  'Lucario':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png',
  'Lokhlass':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/131.png',
  'Dracovolt':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/880.png',
  'Riolu':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/447.png',
  'Sorcilège':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/282.png',
  'Sacha':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
  'Gary':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png',
  'Méga Rayquaza':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/384.png',
  'Reshiram':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/643.png',
  'Zekrom':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/644.png',
  'Kyogre':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/382.png',
  'Groudon':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/383.png',
  'Ho-Oh':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/250.png',
  'Lugia':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/249.png',
  'Dialga':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/483.png',
  'Giratina':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/487.png',
  'Arceus':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/493.png',
  'Ditto':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png',
  'Gengar':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png',
  'Tyranocif':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/248.png',
  'Léviator':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/130.png',
  'Drattak':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/148.png',
  'Noctali':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/197.png',
  'Espeon':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/196.png',
  'Umbreon':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/197.png',
  'Sulfura':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/146.png',
  'Artikodin':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/144.png',
  'Togekiss':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/468.png',
  'Mackogneur':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/68.png',
  'Électhor':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/145.png',
};

// Fonction principale pour récupérer une image
async function loadCharImage(name) {
  if (imgCache[name]) return imgCache[name];

  // Pokemon : PokeAPI direct
  if (POKEMON_IMGS[name]) {
    imgCache[name] = POKEMON_IMGS[name];
    return POKEMON_IMGS[name];
  }

  // Autres : Jikan API (chargé dans le navigateur, pas depuis le serveur)
  const malId = CHAR_MAL_IDS[name];
  if (malId) {
    try {
      const r = await fetch(`https://api.jikan.moe/v4/characters/${malId}`, {
        headers: { 'Accept': 'application/json' }
      });
      if (r.ok) {
        const d = await r.json();
        const url = d.data?.images?.jpg?.image_url;
        if (url) { imgCache[name] = url; return url; }
      }
    } catch(e) {}
  }

  return null;
}

function getImg(name, large) {
  const h = large ? '200px' : '64px';
  const r = large ? '12px' : '8px';
  const id = `img-${name.replace(/[^a-zA-Z0-9]/g,'_')}-${large?'lg':'sm'}`;

  // Si déjà en cache, retourner directement
  if (imgCache[name]) {
    return `<img src="${imgCache[name]}" alt="${name}" style="max-height:${h};max-width:100%;object-fit:cover;border-radius:${r};" onerror="this.outerHTML='<div style=\\'font-size:${large?48:28}px;display:flex;align-items:center;justify-content:center;height:${h}\\'>🎭</div>'">`;
  }

  // Sinon placeholder + chargement async
  const placeholder = `<div id="${id}" style="height:${h};display:flex;align-items:center;justify-content:center;font-size:${large?'32px':'20px'};color:var(--muted);">⏳</div>`;

  // Charger l'image en arrière-plan
  loadCharImage(name).then(url => {
    const el = document.getElementById(id);
    if (el && url) {
      el.outerHTML = `<img src="${url}" alt="${name}" style="max-height:${h};max-width:100%;object-fit:cover;border-radius:${r};" onerror="this.outerHTML='<div style=\\'font-size:${large?48:28}px;display:flex;align-items:center;justify-content:center;height:${h}\\'>🎭</div>'">`;
    } else if (el) {
      el.textContent = '🎭';
      el.style.fontSize = large ? '48px' : '28px';
    }
  });

  return placeholder;
}

let myName='',myRoom='',isHost=false,selectedVote=null,allHints=[{},{}],qrGenerated=false;
let selectedUniverses=[];
const ALL_UNIVERSES=['Naruto','Dragon Ball','One Piece','Pokémon','Attack on Titan','Demon Slayer','Fairy Tail','Bleach','One Punch Man','Black Clover','Fire Force','Jujutsu Kaisen','My Hero Academia','Solo Leveling','Blue Lock','Kuroko no Basket','Re:Zero','Dr. Stone','City Hunter'];

function initParticles(){const c=document.getElementById('particles');if(!c)return;for(let i=0;i<20;i++){const p=document.createElement('div');p.className='particle';const s=Math.random()*4+2;p.style.cssText=`width:${s}px;height:${s}px;left:${Math.random()*100}%;background:hsl(${220+Math.random()*60},70%,60%);animation-duration:${8+Math.random()*12}s;animation-delay:${Math.random()*8}s;`;c.appendChild(p);}}

function initFloatingChars(){const c=document.getElementById('floating-chars');if(!c)return;['Pikachu','Dracaufeu','Mewtwo','Goku','Luffy','Naruto','Gojo','Tanjiro','Deku','Isagi','Levi','Kuroko','Ichigo','Natsu','Saitama','Asta'].forEach(name=>{const el=document.createElement('div');el.className='float-char';el.style.cssText=`left:${5+Math.random()*90}%;top:${10+Math.random()*80}%;animation-duration:${6+Math.random()*8}s;animation-delay:${Math.random()*6}s;`;el.innerHTML=getImg(name,false);c.appendChild(el);});}

window.addEventListener('load',()=>{initParticles();initFloatingChars();selectedUniverses=[...ALL_UNIVERSES];const p=new URLSearchParams(window.location.search);const c=p.get('code');if(c)document.getElementById('home-code').value=c.toUpperCase();});

function renderUniversePanel(state){const panel=document.getElementById('universe-panel');if(!isHost){panel.style.display='none';return;}panel.style.display='block';const active=state?state.selectedUniverses:selectedUniverses;document.getElementById('uni-count').textContent=`(${active.length}/${ALL_UNIVERSES.length})`;document.getElementById('universe-list').innerHTML=ALL_UNIVERSES.map(u=>`<div class="uni-chip ${active.includes(u)?'active':''}" onclick="toggleUniverse('${u}')"><div class="uni-check">${active.includes(u)?'✓':''}</div><span>${u}</span></div>`).join('');}

function toggleUniverse(uni){if(!isHost)return;if(selectedUniverses.includes(uni)){if(selectedUniverses.length<=1)return;selectedUniverses=selectedUniverses.filter(u=>u!==uni);}else selectedUniverses.push(uni);socket.emit('update_universes',{selectedUniverses});renderUniversePanel({selectedUniverses});}

function setupShare(code){const link=`${window.location.origin}?code=${code}`;document.getElementById('share-link').textContent=link;if(!qrGenerated){document.getElementById('qrcode').innerHTML='';new QRCode(document.getElementById('qrcode'),{text:link,width:140,height:140,colorDark:'#534AB7',colorLight:'#1a1828'});qrGenerated=true;}}
function copyLink(){navigator.clipboard.writeText(document.getElementById('share-link').textContent).then(()=>{const btn=document.getElementById('copy-btn');btn.textContent='✓ Copié!';btn.style.background='#1D9E75';setTimeout(()=>{btn.textContent='📋 Copier';btn.style.background='';},2000);});}

let timerInterval=null,timerLeft=0;
function startTimer(s){clearInterval(timerInterval);timerLeft=s;updateTimerUI();timerInterval=setInterval(()=>{timerLeft--;updateTimerUI();if(timerLeft<=0){clearInterval(timerInterval);autoSubmitHint();}},1000);}
function stopTimer(){clearInterval(timerInterval);const b=document.getElementById('timer-bar');if(b)b.style.display='none';}
function updateTimerUI(){const bar=document.getElementById('timer-bar'),txt=document.getElementById('timer-text'),fill=document.getElementById('timer-fill');if(!bar)return;bar.style.display='block';txt.textContent=timerLeft+'s';fill.style.width=(timerLeft/35*100)+'%';fill.style.background=timerLeft<=10?'#E24B4A':timerLeft<=20?'#EF9F27':'#534AB7';}
function autoSubmitHint(){socket.emit('submit_hint',{hint:document.getElementById('round-hint-input').value.trim()||'...'});}

function sendChat(){const i=document.getElementById('chat-input'),m=i.value.trim();if(!m)return;socket.emit('chat_message',{message:m});i.value='';}
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&document.activeElement.id==='chat-input')sendChat();});
socket.on('chat_message',({name,message})=>{const box=document.getElementById('chat-messages');if(!box)return;const d=document.createElement('div');d.className='chat-msg'+(name===myName?' mine':'');d.innerHTML=`<strong>${name}</strong>${message}`;box.appendChild(d);box.scrollTop=box.scrollHeight;});

let localStream=null,peers={},voiceEnabled=false;
async function toggleVoice(){const btn=document.getElementById('voice-btn');if(!voiceEnabled){try{localStream=await navigator.mediaDevices.getUserMedia({audio:true,video:false});voiceEnabled=true;btn.textContent='🎤 Vocal ON';btn.style.background='#1D9E75';socket.emit('voice_join',{room:myRoom});}catch(e){alert('Micro indispo: '+e.message);}}else{voiceEnabled=false;if(localStream)localStream.getTracks().forEach(t=>t.stop());localStream=null;Object.values(peers).forEach(p=>p.close());peers={};btn.textContent='🎤 Vocal OFF';btn.style.background='';socket.emit('voice_leave',{room:myRoom});}}
function createPeer(tid,init){const pc=new RTCPeerConnection({iceServers:[{urls:'stun:stun.l.google.com:19302'}]});if(localStream)localStream.getTracks().forEach(t=>pc.addTrack(t,localStream));pc.onicecandidate=e=>{if(e.candidate)socket.emit('voice_signal',{to:tid,data:{candidate:e.candidate}});};pc.ontrack=e=>{let a=document.getElementById('audio-'+tid);if(!a){a=document.createElement('audio');a.id='audio-'+tid;a.autoplay=true;document.body.appendChild(a);}a.srcObject=e.streams[0];};if(init)pc.createOffer().then(o=>pc.setLocalDescription(o)).then(()=>socket.emit('voice_signal',{to:tid,data:{sdp:pc.localDescription}}));peers[tid]=pc;return pc;}
socket.on('voice_user_joined',({userId})=>{if(voiceEnabled)createPeer(userId,true);});
socket.on('voice_signal',async({from,data})=>{if(!voiceEnabled)return;if(!peers[from])createPeer(from,false);const pc=peers[from];if(data.sdp){await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));if(data.sdp.type==='offer'){const a=await pc.createAnswer();await pc.setLocalDescription(a);socket.emit('voice_signal',{to:from,data:{sdp:pc.localDescription}});}}else if(data.candidate)await pc.addIceCandidate(new RTCIceCandidate(data.candidate));});
socket.on('voice_user_left',({userId})=>{if(peers[userId]){peers[userId].close();delete peers[userId];}const a=document.getElementById('audio-'+userId);if(a)a.remove();});

function show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById('screen-'+id).classList.add('active');}
function setError(id,msg){const el=document.getElementById(id);if(el){el.textContent=msg;setTimeout(()=>el.textContent='',3000);}}
const AV=['av-purple','av-teal','av-coral','av-blue','av-amber'];
function avatar(name,i){return`<div class="avatar ${AV[i%5]}">${name.slice(0,2).toUpperCase()}</div>`;}

function createRoom(){myName=document.getElementById('home-name').value.trim();const rounds=parseInt(document.getElementById('home-rounds').value)||3;if(!myName)return setError('home-error','Entre ton pseudo !');socket.emit('create_room',{playerName:myName,totalRounds:rounds,selectedUniverses});}
function joinRoom(){myName=document.getElementById('home-name').value.trim();const code=document.getElementById('home-code').value.trim().toUpperCase();if(!myName)return setError('home-error','Entre ton pseudo !');if(code.length!==4)return setError('home-error','Code = 4 caractères.');socket.emit('join_room',{code,playerName:myName});}
function startGame(){socket.emit('start_game');}
function markReady(){document.getElementById('reveal-ready-btn').style.display='none';document.getElementById('reveal-waiting-others').style.display='block';socket.emit('player_ready');}
function submitHint(){const val=document.getElementById('round-hint-input').value.trim();if(!val)return;stopTimer();socket.emit('submit_hint',{hint:val});document.getElementById('round-hint-input').value='';}
function submitVote(){if(!selectedVote)return;socket.emit('submit_vote',{votedName:selectedVote});document.getElementById('vote-confirm-btn').disabled=true;document.querySelectorAll('.vote-btn').forEach(b=>b.disabled=true);}
function nextRound(){socket.emit('next_round');}
function restart(){qrGenerated=false;socket.emit('restart');}
function quitGame(){stopTimer();if(localStream)localStream.getTracks().forEach(t=>t.stop());socket.disconnect();location.reload();}

function renderLobby(state){document.getElementById('lobby-code').textContent=state.code;document.getElementById('lobby-players').innerHTML=state.players.map((p,i)=>`<div class="player-row">${avatar(p.name,i)}<span>${p.name}</span>${p.ready?'<span class="ready-dot">✓</span>':''}</div>`).join('');const ok=isHost&&state.players.length>=3;document.getElementById('lobby-start-btn').style.display=ok?'block':'none';document.getElementById('lobby-hint').textContent=state.players.length<3?`En attente... (${state.players.length}/3 minimum)`:isHost?'':'En attente de l\'hôte...';renderUniversePanel(state);}
function renderHints(){const all=[];[0,1].forEach(r=>{const e=Object.entries(allHints[r]);if(e.length){all.push(`<div class="hint-round-label">Tour ${r+1}</div>`);e.forEach(([n,h])=>all.push(`<div class="hint-chip"><strong>${n}</strong> : ${h}</div>`));}});const card=document.getElementById('hints-display');if(all.length){card.style.display='block';document.getElementById('hints-list').innerHTML=all.join('');}else card.style.display='none';}
function updateRound(currentPlayer){document.getElementById('round-current').textContent=`C'est au tour de ${currentPlayer}`;const isMe=currentPlayer===myName;document.getElementById('round-hint-area').style.display=isMe?'block':'none';document.getElementById('round-wait-area').style.display=isMe?'none':'block';if(!isMe){document.getElementById('round-wait-name').textContent=currentPlayer;stopTimer();}else startTimer(35);document.getElementById('round-hint-input').value='';}
function renderVote(players){selectedVote=null;const lines=[];[0,1].forEach(r=>{const e=Object.entries(allHints[r]);if(e.length){lines.push(`<div class="hint-round-label">Tour ${r+1}</div>`);e.forEach(([n,h])=>lines.push(`<div class="hint-chip"><strong>${n}</strong> : ${h}</div>`));}});document.getElementById('vote-hints').innerHTML='<div class="card-label">Tous les indices</div>'+lines.join('');document.getElementById('vote-buttons').innerHTML=players.map((name,i)=>`<button class="vote-btn" id="vb-${i}" onclick="selectVote(${i},'${name}')">${avatar(name,i)} ${name}</button>`).join('');document.getElementById('vote-confirm-btn').disabled=true;document.getElementById('vote-status').textContent='';}
function selectVote(i,name){selectedVote=name;document.querySelectorAll('.vote-btn').forEach(b=>b.classList.remove('selected'));document.getElementById('vb-'+i).classList.add('selected');document.getElementById('vote-confirm-btn').disabled=false;}
function renderScores(scores){return[...scores].sort((a,b)=>b.score-a.score).map((s,i)=>`<div class="score-row"><span class="score-rank">${i===0?'🥇':i===1?'🥈':'🥉'}</span><span>${s.name}</span><span class="score-pts">${s.score} pts</span></div>`).join('');}

socket.on('room_created',({code})=>{myRoom=code;isHost=true;qrGenerated=false;show('lobby');setupShare(code);renderUniversePanel(null);});
socket.on('room_joined',({code})=>{myRoom=code;isHost=false;show('lobby');});
socket.on('room_update',state=>{if(state.phase==='lobby')renderLobby(state);});

socket.on('phase_change',({phase,round,currentPlayer,hints,players,currentRound,totalRounds})=>{
  stopTimer();
  if(phase==='lobby'){show('lobby');return;}
  if(phase==='reveal'){show('reveal');return;}
  if(phase==='round'){allHints=[{},{}];show('round');document.getElementById('round-label').textContent=`Manche ${currentRound}/${totalRounds} — Tour ${round}/2`;document.getElementById('round-progress').style.width=((round-1)*50)+'%';document.getElementById('chat-messages').innerHTML='';updateRound(currentPlayer);renderHints();}
  if(phase==='vote'){allHints=hints;show('vote');renderVote(players);}
});

socket.on('your_role',({char,isSpy})=>{
  document.getElementById('reveal-waiting').textContent=isSpy?"Tu es l'espion !":'Ton personnage secret';
  document.getElementById('reveal-char-img').innerHTML=getImg(char.name,true);
  document.getElementById('reveal-name').textContent=char.name;
  document.getElementById('reveal-uni').textContent=char.uni;
  const badge=document.getElementById('reveal-role-badge');
  badge.textContent=isSpy?'🕵️ Espion':'🤝 Allié';
  badge.className='role-badge '+(isSpy?'spy':'ally');
  document.getElementById('reveal-tip').textContent=isSpy?"Tu ne sais pas quel personnage ont les autres. Bluff !":"Un autre joueur a le même personnage. Trouve l'espion sans révéler le tien !";
  document.getElementById('reveal-ready-btn').style.display='block';
  document.getElementById('reveal-waiting-others').style.display='none';
  const card=document.querySelector('.char-card');
  if(card){card.classList.remove('reveal-anim');void card.offsetWidth;card.classList.add('reveal-anim');}
});

socket.on('hint_submitted',({player,hint,round})=>{allHints[round-1][player]=hint;renderHints();});
socket.on('next_player',({currentPlayer})=>updateRound(currentPlayer));
socket.on('vote_update',({votesIn,total})=>{document.getElementById('vote-status').textContent=`${votesIn}/${total} votes...`;});

socket.on('game_result',({spyCaught,spyName,accusedName,allyChar,spyChar,votes,scores,currentRound,totalRounds,isLastRound})=>{
  stopTimer();show('result');
  document.getElementById('result-icon').textContent=spyCaught?'🎉':'🕵️';
  document.getElementById('result-title').textContent=spyCaught?'Les alliés ont gagné !':"L'espion s'est échappé !";
  document.getElementById('result-sub').textContent=spyCaught?`Bien joué ! ${spyName} était l'espion.`:`${accusedName} était innocent(e). ${spyName} était l'espion.`;
  document.getElementById('result-round-info').textContent=`Manche ${currentRound} / ${totalRounds}`;
  document.getElementById('res-ally-img').innerHTML=getImg(allyChar.name,false);
  document.getElementById('res-ally-name').textContent=`${allyChar.name} (${allyChar.uni})`;
  document.getElementById('res-spy-img').innerHTML=getImg(spyChar.name,false);
  document.getElementById('res-spy-name').textContent=`${spyChar.name} (${spyChar.uni})`;
  document.getElementById('res-spy-player').textContent=spyName;
  document.getElementById('votes-list').innerHTML=Object.entries(votes).map(([v,t])=>`<div class="vote-result-row">${v} → <strong>${t}</strong></div>`).join('');
  document.getElementById('scores-list').innerHTML=renderScores(scores);
  document.getElementById('result-final-title').style.display=isLastRound?'block':'none';
  document.getElementById('result-next-btn').style.display=(!isLastRound&&isHost)?'block':'none';
  document.getElementById('result-restart-btn').style.display=(isLastRound&&isHost)?'block':'none';
  document.getElementById('result-wait').style.display=isHost?'none':'block';
});

let myBonusDone=false;
socket.on('bonus_phase',({isSpy,hint})=>{
  myBonusDone=false;
  document.getElementById('bonus-hint').textContent=hint;
  document.getElementById('bonus-label').textContent=isSpy?'Quel était le personnage des alliés ?':"Quel était le personnage de l'espion ?";
  document.getElementById('bonus-input').value='';
  document.getElementById('bonus-input').disabled=false;
  const btn=document.querySelector('#screen-bonus .btn-primary');if(btn)btn.disabled=false;
  document.getElementById('bonus-results').style.display='none';
  document.getElementById('bonus-results-list').innerHTML='';
  show('bonus');
});
function submitBonus(){if(myBonusDone)return;const guess=document.getElementById('bonus-input').value.trim();if(!guess)return;myBonusDone=true;socket.emit('submit_bonus',{guess});document.getElementById('bonus-input').disabled=true;const btn=document.querySelector('#screen-bonus .btn-primary');if(btn)btn.disabled=true;}
function skipBonus(){if(myBonusDone)return;myBonusDone=true;socket.emit('skip_bonus');}
socket.on('bonus_result',({playerName,guess,correct,scores})=>{
  const list=document.getElementById('bonus-results-list');
  document.getElementById('bonus-results').style.display='block';
  const div=document.createElement('div');div.className='vote-result-row';
  if(guess){div.innerHTML=correct?`<strong style="color:#5DCAA5;">${playerName}</strong> → "${guess}" ✓ +1 pt !`:`<strong>${playerName}</strong> → "${guess}" ✗`;}
  else{div.innerHTML=`<strong style="color:var(--muted);">${playerName}</strong> a passé`;}
  list.appendChild(div);
  document.getElementById('bonus-scores').innerHTML=renderScores(scores);
});

socket.on('player_left',({name})=>console.log(name+' a quitté.'));
socket.on('error',({msg})=>{setError('home-error',msg);setError('lobby-error',msg);});
