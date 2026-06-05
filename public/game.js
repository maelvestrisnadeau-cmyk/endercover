const socket = io();

// Images Pokemon (fiables 100%)
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
  'Arceus':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/493.png',
  'Gengar':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png',
  'Reshiram':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/643.png',
  'Zekrom':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/644.png',
  'Kyogre':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/382.png',
  'Groudon':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/383.png',
  'Ho-Oh':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/250.png',
  'Lugia':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/249.png',
  'Dialga':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/483.png',
  'Giratina':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/487.png',
  'Togekiss':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/468.png',
  'Noctali':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/197.png',
  'Espeon':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/196.png',
  'Sulfura':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/146.png',
  'Artikodin':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/144.png',
  'Léviator':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/130.png',
  'Drattak':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/148.png',
  'Tyranocif':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/248.png',
  'Électhor':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/145.png',
  'Mackogneur':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/68.png',
  'Mélodie':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/175.png',
};

// Cache images
const imgCache = {};

// Charger image via Jikan API (pour les non-Pokemon)
async function loadCharImage(name) {
  if (imgCache[name]) return imgCache[name];
  if (POKEMON_IMGS[name]) { imgCache[name] = POKEMON_IMGS[name]; return POKEMON_IMGS[name]; }
  return null;
}

function getImg(name, large) {
  const h = large ? '200px' : '64px';
  const r = large ? '12px' : '8px';
  const id = 'img_' + name.replace(/[^a-zA-Z0-9]/g,'_') + (large?'_lg':'_sm');
  if (imgCache[name]) {
    return `<img src="${imgCache[name]}" alt="${name}" style="max-height:${h};max-width:100%;object-fit:cover;border-radius:${r};" onerror="this.outerHTML='<div style=font-size:${large?48:28}px>🎭</div>'">`;
  }
  loadCharImage(name).then(url => {
    const el = document.getElementById(id);
    if (el && url) el.outerHTML = `<img src="${url}" alt="${name}" style="max-height:${h};max-width:100%;object-fit:cover;border-radius:${r};">`;
    else if (el) { el.textContent = '🎭'; el.style.fontSize = large ? '48px' : '28px'; }
  });
  return `<div id="${id}" style="height:${h};display:flex;align-items:center;justify-content:center;font-size:20px;color:var(--muted);">⏳</div>`;
}

let myName='', myRoom='', isHost=false, selectedVote=null, allHints=[{},{}], qrGenerated=false;
let selectedUniverses=[];
const ALL_UNIVERSES=['Naruto','Dragon Ball','One Piece','Pokémon','Attack on Titan','Demon Slayer','Fairy Tail','Bleach','One Punch Man','Black Clover','Fire Force','Jujutsu Kaisen','My Hero Academia','Solo Leveling','Blue Lock','Kuroko no Basket','Re:Zero','Dr. Stone','City Hunter'];

function initParticles(){
  const c=document.getElementById('particles');
  if(!c)return;
  for(let i=0;i<20;i++){
    const p=document.createElement('div');
    p.className='particle';
    const s=Math.random()*4+2;
    p.style.cssText=`width:${s}px;height:${s}px;left:${Math.random()*100}%;background:hsl(${220+Math.random()*60},70%,60%);animation-duration:${8+Math.random()*12}s;animation-delay:${Math.random()*8}s;`;
    c.appendChild(p);
  }
}

function initFloatingChars(){
  const c=document.getElementById('floating-chars');
  if(!c)return;
  ['Pikachu','Dracaufeu','Mewtwo','Goku','Luffy','Naruto','Gojo','Tanjiro','Deku','Isagi','Levi','Kuroko','Ichigo','Natsu','Saitama','Asta'].forEach(name=>{
    const el=document.createElement('div');
    el.className='float-char';
    el.style.cssText=`left:${5+Math.random()*90}%;top:${10+Math.random()*80}%;animation-duration:${6+Math.random()*8}s;animation-delay:${Math.random()*6}s;`;
    el.innerHTML=getImg(name,false);
    c.appendChild(el);
  });
}

window.addEventListener('load',()=>{
  initParticles();
  initFloatingChars();
  selectedUniverses=[...ALL_UNIVERSES];
  const p=new URLSearchParams(window.location.search);
  const c=p.get('code');
  if(c) document.getElementById('home-code').value=c.toUpperCase();
});

function renderUniversePanel(state){
  const panel=document.getElementById('universe-panel');
  if(!isHost){panel.style.display='none';return;}
  panel.style.display='block';
  const active=state?state.selectedUniverses:selectedUniverses;
  document.getElementById('uni-count').textContent=`(${active.length}/${ALL_UNIVERSES.length})`;
  document.getElementById('universe-list').innerHTML=ALL_UNIVERSES.map(u=>`<div class="uni-chip ${active.includes(u)?'active':''}" onclick="toggleUniverse('${u}')"><div class="uni-check">${active.includes(u)?'✓':''}</div><span>${u}</span></div>`).join('');
}

function toggleUniverse(uni){
  if(!isHost)return;
  if(selectedUniverses.includes(uni)){
    if(selectedUniverses.length<=1)return;
    selectedUniverses=selectedUniverses.filter(u=>u!==uni);
  }else selectedUniverses.push(uni);
  socket.emit('update_universes',{selectedUniverses});
  renderUniversePanel({selectedUniverses});
}

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

function createRoom(){
  myName=document.getElementById('home-name').value.trim();
  const rounds=parseInt(document.getElementById('home-rounds').value)||3;
  if(!myName)return setError('home-error','Entre ton pseudo !');
  socket.emit('create_room',{playerName:myName,totalRounds:rounds,selectedUniverses});
}
function joinRoom(){
  myName=document.getElementById('home-name').value.trim();
  const code=document.getElementById('home-code').value.trim().toUpperCase();
  if(!myName)return setError('home-error','Entre ton pseudo !');
  if(code.length!==4)return setError('home-error','Code = 4 caractères.');
  socket.emit('join_room',{code,playerName:myName});
}
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
