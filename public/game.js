const socket = io();

const CHAR_IMAGES = {
  'Itachi':'https://static.wikia.nocookie.net/naruto/images/b/bb/Itachi_Uchiha.png',
  'Sasuke':'https://static.wikia.nocookie.net/naruto/images/2/21/Sasuke_Part_1.png',
  'Naruto':'https://static.wikia.nocookie.net/naruto/images/9/97/Naruto_Part_I.png',
  'Kakashi':'https://static.wikia.nocookie.net/naruto/images/2/27/Kakashi_Hatake.png',
  'Obito':'https://static.wikia.nocookie.net/naruto/images/8/8b/Obito_Uchiha.png',
  'Minato':'https://static.wikia.nocookie.net/naruto/images/7/7f/Minato_Namikaze.png',
  'Jiraiya':'https://static.wikia.nocookie.net/naruto/images/c/c1/Jiraiya_infobox.png',
  'Tsunade':'https://static.wikia.nocookie.net/naruto/images/b/b8/Tsunade_infobox.png',
  'Gaara':'https://static.wikia.nocookie.net/naruto/images/9/9c/Gaara_Part_II.png',
  'Rock Lee':'https://static.wikia.nocookie.net/naruto/images/5/52/Rock_Lee_Part_II.png',
  'Pain':'https://static.wikia.nocookie.net/naruto/images/2/2f/Nagato.png',
  'Madara':'https://static.wikia.nocookie.net/naruto/images/6/60/Madara_Uchiha.png',
  'Orochimaru':'https://static.wikia.nocookie.net/naruto/images/0/04/Orochimaru_infobox.png',
  'Neji':'https://static.wikia.nocookie.net/naruto/images/9/97/Neji_Part_II.png',
  'Goku':'https://static.wikia.nocookie.net/dragonball/images/5/5b/Goku_Dragon_Ball_Super.png',
  'Vegeta':'https://static.wikia.nocookie.net/dragonball/images/e/ea/Vegeta_Dragon_Ball_Super.png',
  'Gohan':'https://static.wikia.nocookie.net/dragonball/images/7/7e/Gohan_Dragon_Ball_Super.png',
  'Freezer':'https://static.wikia.nocookie.net/dragonball/images/8/8b/Frieza_Render.png',
  'Cell':'https://static.wikia.nocookie.net/dragonball/images/1/17/Cell_perfect_dragon_ball_z.png',
  'Broly':'https://static.wikia.nocookie.net/dragonball/images/b/b9/Broly_DBS.png',
  'Piccolo':'https://static.wikia.nocookie.net/dragonball/images/2/2f/Piccolo_DBS.png',
  'Boo':'https://static.wikia.nocookie.net/dragonball/images/5/55/Kid_Buu.png',
  'Trunks':'https://static.wikia.nocookie.net/dragonball/images/6/6c/Future_Trunks_DBS.png',
  'Goten':'https://static.wikia.nocookie.net/dragonball/images/3/35/Goten_DBS.png',
  'Luffy':'https://static.wikia.nocookie.net/onepiece/images/6/6d/Monkey_D._Luffy_Anime_Post_Timeskip_Infobox.png',
  'Zoro':'https://static.wikia.nocookie.net/onepiece/images/1/15/Roronoa_Zoro_Anime_Post_Timeskip_Infobox.png',
  'Sanji':'https://static.wikia.nocookie.net/onepiece/images/7/7b/Sanji_Anime_Post_Timeskip_Infobox.png',
  'Shanks':'https://static.wikia.nocookie.net/onepiece/images/f/fd/Shanks_Anime_Post_Timeskip_Infobox.png',
  'Ace':'https://static.wikia.nocookie.net/onepiece/images/0/04/Portgas_D._Ace_Anime_Post_Timeskip_Infobox.png',
  'Nami':'https://static.wikia.nocookie.net/onepiece/images/5/5c/Nami_Anime_Post_Timeskip_Infobox.png',
  'Nico Robin':'https://static.wikia.nocookie.net/onepiece/images/e/e4/Nico_Robin_Anime_Post_Timeskip_Infobox.png',
  'Barbe Blanche':'https://static.wikia.nocookie.net/onepiece/images/2/2f/Edward_Newgate_Anime_Infobox.png',
  'Trafalgar Law':'https://static.wikia.nocookie.net/onepiece/images/b/b7/Trafalgar_D._Water_Law_Anime_Post_Timeskip_Infobox.png',
  'Kaido':'https://static.wikia.nocookie.net/onepiece/images/0/04/Kaido_Anime_Infobox.png',
  'Boa Hancock':'https://static.wikia.nocookie.net/onepiece/images/b/b4/Boa_Hancock_Anime_Post_Timeskip_Infobox.png',
  'Pikachu':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
  'Raichu':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png',
  'Dracaufeu':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
  'Salamèche':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
  'Mewtwo':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png',
  'Mew':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png',
  'Sacha':'https://static.wikia.nocookie.net/pokemon/images/a/a4/Ash_anime_XY.png',
  'Gary':'https://static.wikia.nocookie.net/pokemon/images/0/07/Gary_Oak.png',
  'Dracolosse':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png',
  'Evoli':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png',
  'Darkrai':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/491.png',
  'Lucario':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png',
  'Lokhlass':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/131.png',
  'Dracovolt':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/880.png',
  'Riolu':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/447.png',
  'Eren':'https://static.wikia.nocookie.net/shingekinokyojin/images/7/76/Eren_Jaeger_%28Anime%29_character_image.png',
  'Armin':'https://static.wikia.nocookie.net/shingekinokyojin/images/a/a1/Armin_Arlert_%28Anime%29_character_image.png',
  'Levi':'https://static.wikia.nocookie.net/shingekinokyojin/images/2/2e/Levi_Ackermann_%28Anime%29_character_image.png',
  'Mikasa':'https://static.wikia.nocookie.net/shingekinokyojin/images/a/a5/Mikasa_Ackermann_%28Anime%29_character_image.png',
  'Hange':'https://static.wikia.nocookie.net/shingekinokyojin/images/8/8b/Hange_Zo%C3%AB_%28Anime%29_character_image.png',
  'Erwin':'https://static.wikia.nocookie.net/shingekinokyojin/images/d/d1/Erwin_Smith_%28Anime%29_character_image.png',
  'Reiner':'https://static.wikia.nocookie.net/shingekinokyojin/images/c/c3/Reiner_Braun_%28Anime%29_character_image.png',
  'Annie':'https://static.wikia.nocookie.net/shingekinokyojin/images/a/a8/Annie_Leonhart_%28Anime%29_character_image.png',
  'Zeke':'https://static.wikia.nocookie.net/shingekinokyojin/images/f/f6/Zeke_Jaeger_%28Anime%29_character_image.png',
  'Historia':'https://static.wikia.nocookie.net/shingekinokyojin/images/8/89/Historia_Reiss_%28Anime%29_character_image.png',
  'Tanjiro':'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/3/3e/Tanjiro_Kamado_Anime.png',
  'Zenitsu':'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/3/33/Zenitsu_Agatsuma_Anime.png',
  'Nezuko':'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/9/9b/Nezuko_Kamado_Anime.png',
  'Inosuke':'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/6/6e/Inosuke_Hashibira_Anime.png',
  'Rengoku':'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/c/c8/Kyojuro_Rengoku_Anime.png',
  'Tengen':'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/1/16/Tengen_Uzui_Anime.png',
  'Muzan':'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/7/79/Muzan_Kibutsuji_Anime.png',
  'Akaza':'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/2/2a/Akaza_Anime.png',
  'Shinobu':'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/0/0e/Shinobu_Kocho_Anime.png',
  'Kanao':'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/2/29/Kanao_Tsuyuri_Anime.png',
  'Sung Jinwoo':'https://static.wikia.nocookie.net/solo-leveling/images/1/1c/Sung_Jin-Woo_render.png',
  'Igris':'https://static.wikia.nocookie.net/solo-leveling/images/4/4c/Igris_render.png',
  'Cha Hae-In':'https://static.wikia.nocookie.net/solo-leveling/images/5/5e/Cha_Hae-In_render.png',
  'Beru':'https://static.wikia.nocookie.net/solo-leveling/images/b/b7/Beru_render.png',
  'Subaru':'https://static.wikia.nocookie.net/rezero/images/4/4e/Subaru_Natsuki_Anime.png',
  'Emilia':'https://static.wikia.nocookie.net/rezero/images/1/1b/Emilia_Anime.png',
  'Rem':'https://static.wikia.nocookie.net/rezero/images/c/c5/Rem_Anime.png',
  'Ram':'https://static.wikia.nocookie.net/rezero/images/0/0c/Ram_Anime.png',
  'Beatrice':'https://static.wikia.nocookie.net/rezero/images/5/54/Beatrice_Anime.png',
  'Ryo Saeba':'https://upload.wikimedia.org/wikipedia/en/4/4c/Ryo_Saeba.png',
  'Kaori':'https://upload.wikimedia.org/wikipedia/en/6/6e/Kaori_Makimura.png',
  'Deku':'https://static.wikia.nocookie.net/bokunoheroacademia/images/8/8a/Izuku_Midoriya_Anime_Season_5.png',
  'Bakugo':'https://static.wikia.nocookie.net/bokunoheroacademia/images/0/04/Katsuki_Bakugo_Anime_Season_5.png',
  'Todoroki':'https://static.wikia.nocookie.net/bokunoheroacademia/images/7/74/Shoto_Todoroki_Anime_Season_5.png',
  'All Might':'https://static.wikia.nocookie.net/bokunoheroacademia/images/3/30/All_Might_Anime_Season_5.png',
  'Uraraka':'https://static.wikia.nocookie.net/bokunoheroacademia/images/4/47/Ochaco_Uraraka_Anime_Season_5.png',
  'Shigaraki':'https://static.wikia.nocookie.net/bokunoheroacademia/images/2/27/Tomura_Shigaraki_Anime_Season_5.png',
  'Hawks':'https://static.wikia.nocookie.net/bokunoheroacademia/images/c/c2/Hawks_Anime_Season_5.png',
  'Senku':'https://static.wikia.nocookie.net/dr-stone/images/c/cc/Senku_anime.png',
  'Tsukasa':'https://static.wikia.nocookie.net/dr-stone/images/4/43/Tsukasa_anime.png',
  'Chrome':'https://static.wikia.nocookie.net/dr-stone/images/b/b9/Chrome_anime.png',
  'Kohaku':'https://static.wikia.nocookie.net/dr-stone/images/3/3c/Kohaku_anime.png',
  'Itadori':'https://static.wikia.nocookie.net/jujutsu-kaisen/images/b/b5/Yuji_Itadori_Anime.png',
  'Megumi':'https://static.wikia.nocookie.net/jujutsu-kaisen/images/2/2e/Megumi_Fushiguro_Anime.png',
  'Gojo':'https://static.wikia.nocookie.net/jujutsu-kaisen/images/e/e9/Satoru_Gojo_Anime.png',
  'Sukuna':'https://static.wikia.nocookie.net/jujutsu-kaisen/images/1/19/Sukuna_Anime.png',
  'Nobara':'https://static.wikia.nocookie.net/jujutsu-kaisen/images/5/52/Nobara_Kugisaki_Anime.png',
  'Nanami':'https://static.wikia.nocookie.net/jujutsu-kaisen/images/7/7e/Kento_Nanami_Anime.png',
  'Yuta':'https://static.wikia.nocookie.net/jujutsu-kaisen/images/6/63/Yuta_Okkotsu_Anime.png',
  'Mahito':'https://static.wikia.nocookie.net/jujutsu-kaisen/images/1/10/Mahito_Anime.png',
  'Isagi':'https://static.wikia.nocookie.net/blue-lock/images/0/0e/Yoichi_Isagi_Anime.png',
  'Bachira':'https://static.wikia.nocookie.net/blue-lock/images/7/77/Meguru_Bachira_Anime.png',
  'Rin':'https://static.wikia.nocookie.net/blue-lock/images/b/b4/Rin_Itoshi_Anime.png',
  'Nagi':'https://static.wikia.nocookie.net/blue-lock/images/5/5a/Seishiro_Nagi_Anime.png',
  'Kuroko':'https://static.wikia.nocookie.net/kurokonobasuke/images/a/a5/Tetsuya_Kuroko_Anime.png',
  'Kagami':'https://static.wikia.nocookie.net/kurokonobasuke/images/f/f7/Taiga_Kagami_Anime.png',
  'Aomine':'https://static.wikia.nocookie.net/kurokonobasuke/images/0/01/Daiki_Aomine_Anime.png',
  'Akashi':'https://static.wikia.nocookie.net/kurokonobasuke/images/e/e2/Seijuro_Akashi_Anime.png',
  'Kise':'https://static.wikia.nocookie.net/kurokonobasuke/images/6/6e/Ryota_Kise_Anime.png',
  'Midorima':'https://static.wikia.nocookie.net/kurokonobasuke/images/7/7c/Shintaro_Midorima_Anime.png',
};

const EMOJIS = ['🔥','⚡','🌀','💧','🌸','⚔️','🐉','👑','🕵️','🎭','🌟','💫'];

function getImg(name,large){
  const url=CHAR_IMAGES[name];
  if(!url)return`<span style="font-size:${large?'64px':'36px'}">🎭</span>`;
  return`<img src="${url}" alt="${name}" style="max-height:${large?'200px':'64px'};max-width:100%;object-fit:contain;" onerror="this.style.display='none'">`;
}

let myName='',myRoom='',isHost=false,selectedVote=null,allHints=[{},{}],qrGenerated=false;
let selectedUniverses=[];
const ALL_UNIVERSES=['Naruto','Dragon Ball','One Piece','Pokémon','Attack on Titan','Demon Slayer','Solo Leveling','Re:Zero','City Hunter','My Hero Academia','Dr. Stone','Jujutsu Kaisen','Blue Lock','Kuroko no Basket'];

// --- Animations page d'accueil ---
function initParticles(){
  const container=document.getElementById('particles');
  for(let i=0;i<20;i++){
    const p=document.createElement('div');
    p.className='particle';
    const size=Math.random()*4+2;
    p.style.cssText=`width:${size}px;height:${size}px;left:${Math.random()*100}%;background:hsl(${220+Math.random()*60},70%,60%);animation-duration:${8+Math.random()*12}s;animation-delay:${Math.random()*8}s;`;
    container.appendChild(p);
  }
}

function initFloatingChars(){
  const container=document.getElementById('floating-chars');
  const chars=Object.keys(CHAR_IMAGES).slice(0,20);
  chars.forEach((name,i)=>{
    const el=document.createElement('div');
    el.className='float-char';
    el.style.cssText=`left:${5+Math.random()*90}%;top:${10+Math.random()*80}%;animation-duration:${6+Math.random()*8}s;animation-delay:${Math.random()*6}s;`;
    el.innerHTML=getImg(name,false);
    el.style.fontSize='20px';
    container.appendChild(el);
  });
}

window.addEventListener('load',()=>{
  initParticles();
  initFloatingChars();
  selectedUniverses=[...ALL_UNIVERSES];
  const params=new URLSearchParams(window.location.search);
  const code=params.get('code');
  if(code) document.getElementById('home-code').value=code.toUpperCase();
});

// --- Univers ---
function renderUniversePanel(state){
  const panel=document.getElementById('universe-panel');
  if(!isHost){panel.style.display='none';return;}
  panel.style.display='block';
  const active=state?state.selectedUniverses:selectedUniverses;
  document.getElementById('uni-count').textContent=`(${active.length}/${ALL_UNIVERSES.length})`;
  document.getElementById('universe-list').innerHTML=ALL_UNIVERSES.map(u=>`
    <div class="uni-chip ${active.includes(u)?'active':''}" onclick="toggleUniverse('${u}')">
      <div class="uni-check">${active.includes(u)?'✓':''}</div>
      <span>${u}</span>
    </div>`).join('');
}

function toggleUniverse(uni){
  if(!isHost)return;
  if(selectedUniverses.includes(uni)){
    if(selectedUniverses.length<=1)return;
    selectedUniverses=selectedUniverses.filter(u=>u!==uni);
  }else{
    selectedUniverses.push(uni);
  }
  socket.emit('update_universes',{selectedUniverses});
  renderUniversePanel({selectedUniverses});
}

// --- Share ---
function setupShare(code){
  const link=`${window.location.origin}?code=${code}`;
  document.getElementById('share-link').textContent=link;
  if(!qrGenerated){
    document.getElementById('qrcode').innerHTML='';
    new QRCode(document.getElementById('qrcode'),{text:link,width:140,height:140,colorDark:'#534AB7',colorLight:'#1a1828'});
    qrGenerated=true;
  }
}
function copyLink(){
  navigator.clipboard.writeText(document.getElementById('share-link').textContent).then(()=>{
    const btn=document.getElementById('copy-btn');
    btn.textContent='✓ Copié!';btn.style.background='#1D9E75';
    setTimeout(()=>{btn.textContent='📋 Copier';btn.style.background='';},2000);
  });
}

// --- Timer ---
let timerInterval=null,timerLeft=0;
function startTimer(s){clearInterval(timerInterval);timerLeft=s;updateTimerUI();timerInterval=setInterval(()=>{timerLeft--;updateTimerUI();if(timerLeft<=0){clearInterval(timerInterval);autoSubmitHint();}},1000);}
function stopTimer(){clearInterval(timerInterval);const b=document.getElementById('timer-bar');if(b)b.style.display='none';}
function updateTimerUI(){const bar=document.getElementById('timer-bar'),txt=document.getElementById('timer-text'),fill=document.getElementById('timer-fill');if(!bar)return;bar.style.display='block';txt.textContent=timerLeft+'s';fill.style.width=(timerLeft/35*100)+'%';fill.style.background=timerLeft<=10?'#E24B4A':timerLeft<=20?'#EF9F27':'#534AB7';}
function autoSubmitHint(){socket.emit('submit_hint',{hint:document.getElementById('round-hint-input').value.trim()||'...'});}

// --- Chat ---
function sendChat(){const i=document.getElementById('chat-input'),m=i.value.trim();if(!m)return;socket.emit('chat_message',{message:m});i.value='';}
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&document.activeElement.id==='chat-input')sendChat();});
socket.on('chat_message',({name,message})=>{const box=document.getElementById('chat-messages');if(!box)return;const d=document.createElement('div');d.className='chat-msg'+(name===myName?' mine':'');d.innerHTML=`<strong>${name}</strong>${message}`;box.appendChild(d);box.scrollTop=box.scrollHeight;});

// --- Vocal ---
let localStream=null,peers={},voiceEnabled=false;
async function toggleVoice(){const btn=document.getElementById('voice-btn');if(!voiceEnabled){try{localStream=await navigator.mediaDevices.getUserMedia({audio:true,video:false});voiceEnabled=true;btn.textContent='🎤 Vocal ON';btn.style.background='#1D9E75';socket.emit('voice_join',{room:myRoom});}catch(e){alert('Micro indispo: '+e.message);}}else{voiceEnabled=false;if(localStream)localStream.getTracks().forEach(t=>t.stop());localStream=null;Object.values(peers).forEach(p=>p.close());peers={};btn.textContent='🎤 Vocal OFF';btn.style.background='';socket.emit('voice_leave',{room:myRoom});}}
function createPeer(tid,init){const pc=new RTCPeerConnection({iceServers:[{urls:'stun:stun.l.google.com:19302'}]});if(localStream)localStream.getTracks().forEach(t=>pc.addTrack(t,localStream));pc.onicecandidate=e=>{if(e.candidate)socket.emit('voice_signal',{to:tid,data:{candidate:e.candidate}});};pc.ontrack=e=>{let a=document.getElementById('audio-'+tid);if(!a){a=document.createElement('audio');a.id='audio-'+tid;a.autoplay=true;document.body.appendChild(a);}a.srcObject=e.streams[0];};if(init)pc.createOffer().then(o=>pc.setLocalDescription(o)).then(()=>socket.emit('voice_signal',{to:tid,data:{sdp:pc.localDescription}}));peers[tid]=pc;return pc;}
socket.on('voice_user_joined',({userId})=>{if(voiceEnabled)createPeer(userId,true);});
socket.on('voice_signal',async({from,data})=>{if(!voiceEnabled)return;if(!peers[from])createPeer(from,false);const pc=peers[from];if(data.sdp){await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));if(data.sdp.type==='offer'){const a=await pc.createAnswer();await pc.setLocalDescription(a);socket.emit('voice_signal',{to:from,data:{sdp:pc.localDescription}});}}else if(data.candidate)await pc.addIceCandidate(new RTCIceCandidate(data.candidate));});
socket.on('voice_user_left',({userId})=>{if(peers[userId]){peers[userId].close();delete peers[userId];}const a=document.getElementById('audio-'+userId);if(a)a.remove();});

// --- Utilitaires ---
function show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById('screen-'+id).classList.add('active');}
function setError(id,msg){const el=document.getElementById(id);if(el){el.textContent=msg;setTimeout(()=>el.textContent='',3000);}}
const AV=['av-purple','av-teal','av-coral','av-blue','av-amber'];
function avatar(name,i){return`<div class="avatar ${AV[i%5]}">${name.slice(0,2).toUpperCase()}</div>`;}

// --- Actions ---
function createRoom(){myName=document.getElementById('home-name').value.trim();const rounds=parseInt(document.getElementById('home-rounds').value)||3;if(!myName)return setError('home-error','Entre ton pseudo !');socket.emit('create_room',{playerName:myName,totalRounds:rounds,selectedUniverses});}
function joinRoom(){myName=document.getElementById('home-name').value.trim();const code=document.getElementById('home-code').value.trim().toUpperCase();if(!myName)return setError('home-error','Entre ton pseudo !');if(code.length!==4)return setError('home-error','Code = 4 caractères.');socket.emit('join_room',{code,playerName:myName});}
function startGame(){socket.emit('start_game');}
function markReady(){document.getElementById('reveal-ready-btn').style.display='none';document.getElementById('reveal-waiting-others').style.display='block';socket.emit('player_ready');}
function submitHint(){const val=document.getElementById('round-hint-input').value.trim();if(!val)return;stopTimer();socket.emit('submit_hint',{hint:val});document.getElementById('round-hint-input').value='';}
function submitVote(){if(!selectedVote)return;socket.emit('submit_vote',{votedName:selectedVote});document.getElementById('vote-confirm-btn').disabled=true;document.querySelectorAll('.vote-btn').forEach(b=>b.disabled=true);}
function nextRound(){socket.emit('next_round');}
function restart(){qrGenerated=false;socket.emit('restart');}
function quitGame(){stopTimer();if(localStream)localStream.getTracks().forEach(t=>t.stop());socket.disconnect();location.reload();}

function renderLobby(state){
  document.getElementById('lobby-code').textContent=state.code;
  document.getElementById('lobby-players').innerHTML=state.players.map((p,i)=>`<div class="player-row">${avatar(p.name,i)}<span>${p.name}</span>${p.ready?'<span class="ready-dot">✓</span>':''}</div>`).join('');
  const ok=isHost&&state.players.length>=3;
  document.getElementById('lobby-start-btn').style.display=ok?'block':'none';
  document.getElementById('lobby-hint').textContent=state.players.length<3?`En attente... (${state.players.length}/3 minimum)`:isHost?'':'En attente de l\'hôte...';
  renderUniversePanel(state);
}

function renderHints(){const all=[];[0,1].forEach(r=>{const e=Object.entries(allHints[r]);if(e.length){all.push(`<div class="hint-round-label">Tour ${r+1}</div>`);e.forEach(([n,h])=>all.push(`<div class="hint-chip"><strong>${n}</strong> : ${h}</div>`));}});const card=document.getElementById('hints-display');if(all.length){card.style.display='block';document.getElementById('hints-list').innerHTML=all.join('');}else card.style.display='none';}

function updateRound(currentPlayer){document.getElementById('round-current').textContent=`C'est au tour de ${currentPlayer}`;const isMe=currentPlayer===myName;document.getElementById('round-hint-area').style.display=isMe?'block':'none';document.getElementById('round-wait-area').style.display=isMe?'none':'block';if(!isMe){document.getElementById('round-wait-name').textContent=currentPlayer;stopTimer();}else startTimer(35);document.getElementById('round-hint-input').value='';}

function renderVote(players){selectedVote=null;const lines=[];[0,1].forEach(r=>{const e=Object.entries(allHints[r]);if(e.length){lines.push(`<div class="hint-round-label">Tour ${r+1}</div>`);e.forEach(([n,h])=>lines.push(`<div class="hint-chip"><strong>${n}</strong> : ${h}</div>`));}});document.getElementById('vote-hints').innerHTML='<div class="card-label">Tous les indices</div>'+lines.join('');document.getElementById('vote-buttons').innerHTML=players.map((name,i)=>`<button class="vote-btn" id="vb-${i}" onclick="selectVote(${i},'${name}')">${avatar(name,i)} ${name}</button>`).join('');document.getElementById('vote-confirm-btn').disabled=true;document.getElementById('vote-status').textContent='';}

function selectVote(i,name){selectedVote=name;document.querySelectorAll('.vote-btn').forEach(b=>b.classList.remove('selected'));document.getElementById('vb-'+i).classList.add('selected');document.getElementById('vote-confirm-btn').disabled=false;}

function renderScores(scores){return[...scores].sort((a,b)=>b.score-a.score).map((s,i)=>`<div class="score-row"><span class="score-rank">${i===0?'🥇':i===1?'🥈':'🥉'}</span><span>${s.name}</span><span class="score-pts">${s.score} pts</span></div>`).join('');}

// --- Socket ---
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

socket.on('player_left',({name})=>console.log(name+' a quitté.'));
socket.on('error',({msg})=>{setError('home-error',msg);setError('lobby-error',msg);});

// --- Bonus phase ---
let myBonusDone = false;

socket.on('bonus_phase', ({ isSpy, hint, targetChar }) => {
  myBonusDone = false;
  document.getElementById('bonus-hint').textContent = hint;
  document.getElementById('bonus-label').textContent = isSpy
    ? 'Quel était le personnage des alliés ?'
    : "Quel était le personnage de l'espion ?";
  document.getElementById('bonus-input').value = '';
  document.getElementById('bonus-results').style.display = 'none';
  document.getElementById('bonus-results-list').innerHTML = '';
  show('bonus');
});

function submitBonus() {
  if (myBonusDone) return;
  const guess = document.getElementById('bonus-input').value.trim();
  if (!guess) return;
  myBonusDone = true;
  socket.emit('submit_bonus', { guess });
  document.getElementById('bonus-input').disabled = true;
  document.querySelector('#screen-bonus .btn-primary').disabled = true;
}

function skipBonus() {
  if (myBonusDone) return;
  myBonusDone = true;
  socket.emit('skip_bonus');
}

socket.on('bonus_result', ({ playerName, guess, correct, target, scores, allDone }) => {
  const list = document.getElementById('bonus-results-list');
  document.getElementById('bonus-results').style.display = 'block';
  if (guess !== null) {
    const div = document.createElement('div');
    div.className = 'vote-result-row';
    div.innerHTML = correct
      ? `<strong style="color:#5DCAA5;">${playerName}</strong> → "${guess}" ✓ +1 pt !`
      : `<strong>${playerName}</strong> → "${guess}" ✗`;
    list.appendChild(div);
  } else {
    const div = document.createElement('div');
    div.className = 'vote-result-row';
    div.innerHTML = `<strong style="color:var(--muted);">${playerName}</strong> a passé`;
    list.appendChild(div);
  }
  document.getElementById('bonus-scores').innerHTML = renderScores(scores);
});
