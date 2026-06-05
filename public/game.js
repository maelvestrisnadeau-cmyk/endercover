const socket = io();

// Images Pokemon via PokeAPI (100% fiable)
const CHAR_IMGS = {
  'Pikachu':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
  'Raichu':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png',
  'Dracaufeu':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
  'Salamèche':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
  'Mewtwo':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png',
  'Mew':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png',
  'Dracolosse':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png',
  'Lucario':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png',
  'Riolu':'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/447.png',
};

function getImg(name, large) {
  const h = large ? '200px' : '64px';
  const url = CHAR_IMGS[name];
  if (url) return '<img src="' + url + '" alt="' + name + '" style="max-height:' + h + ';max-width:100%;object-fit:contain;">';
  return '<div style="font-size:' + (large?'48':'28') + 'px;display:flex;align-items:center;justify-content:center;height:' + h + '">🎭</div>';
}

let myName='', myRoom='', isHost=false, selectedVote=null, allHints=[{},{}], qrGenerated=false;
let selectedUniverses=[];
const ALL_UNIVERSES=['Naruto','Dragon Ball','One Piece','Pokemon','Attack on Titan','Demon Slayer','Fairy Tail','Bleach','One Punch Man','Black Clover','Fire Force','Jujutsu Kaisen','My Hero Academia','Solo Leveling','Blue Lock','Kuroko no Basket','Re:Zero','Dr. Stone','City Hunter'];

function initParticles(){
  const c=document.getElementById('particles');
  if(!c)return;
  for(let i=0;i<20;i++){
    const p=document.createElement('div');p.className='particle';
    const s=Math.random()*4+2;
    p.style.cssText='width:'+s+'px;height:'+s+'px;left:'+(Math.random()*100)+'%;background:hsl('+(220+Math.random()*60)+',70%,60%);animation-duration:'+(8+Math.random()*12)+'s;animation-delay:'+(Math.random()*8)+'s;';
    c.appendChild(p);
  }
}

window.addEventListener('load', function() {
  initParticles();
  selectedUniverses = ALL_UNIVERSES.slice();
  var p = new URLSearchParams(window.location.search);
  var c = p.get('code');
  if (c) document.getElementById('home-code').value = c.toUpperCase();
});

function renderUniversePanel(state) {
  var panel = document.getElementById('universe-panel');
  if (!isHost) { panel.style.display='none'; return; }
  panel.style.display = 'block';
  var active = state ? state.selectedUniverses : selectedUniverses;
  document.getElementById('uni-count').textContent = '(' + active.length + '/' + ALL_UNIVERSES.length + ')';
  document.getElementById('universe-list').innerHTML = ALL_UNIVERSES.map(function(u) {
    return '<div class="uni-chip ' + (active.indexOf(u)>=0?'active':'') + '" onclick="toggleUniverse(\'' + u + '\')">' +
      '<div class="uni-check">' + (active.indexOf(u)>=0?'✓':'') + '</div><span>' + u + '</span></div>';
  }).join('');
}

function toggleUniverse(uni) {
  if (!isHost) return;
  var idx = selectedUniverses.indexOf(uni);
  if (idx >= 0) {
    if (selectedUniverses.length <= 1) return;
    selectedUniverses.splice(idx, 1);
  } else {
    selectedUniverses.push(uni);
  }
  socket.emit('update_universes', { selectedUniverses: selectedUniverses });
  renderUniversePanel({ selectedUniverses: selectedUniverses });
}

function setupShare(code) {
  var link = window.location.origin + '?code=' + code;
  document.getElementById('share-link').textContent = link;
  if (!qrGenerated) {
    document.getElementById('qrcode').innerHTML = '';
    new QRCode(document.getElementById('qrcode'), {text:link,width:140,height:140,colorDark:'#534AB7',colorLight:'#1a1828'});
    qrGenerated = true;
  }
}

function copyLink() {
  navigator.clipboard.writeText(document.getElementById('share-link').textContent).then(function() {
    var btn = document.getElementById('copy-btn');
    btn.textContent = '✓ Copié!'; btn.style.background = '#1D9E75';
    setTimeout(function(){ btn.textContent='📋 Copier'; btn.style.background=''; }, 2000);
  });
}

var timerInterval=null, timerLeft=0;
function startTimer(s){clearInterval(timerInterval);timerLeft=s;updateTimerUI();timerInterval=setInterval(function(){timerLeft--;updateTimerUI();if(timerLeft<=0){clearInterval(timerInterval);autoSubmitHint();}},1000);}
function stopTimer(){clearInterval(timerInterval);var b=document.getElementById('timer-bar');if(b)b.style.display='none';}
function updateTimerUI(){var bar=document.getElementById('timer-bar'),txt=document.getElementById('timer-text'),fill=document.getElementById('timer-fill');if(!bar)return;bar.style.display='block';txt.textContent=timerLeft+'s';fill.style.width=(timerLeft/35*100)+'%';fill.style.background=timerLeft<=10?'#E24B4A':timerLeft<=20?'#EF9F27':'#534AB7';}
function autoSubmitHint(){socket.emit('submit_hint',{hint:document.getElementById('round-hint-input').value.trim()||'...'});}

function sendChat(){var i=document.getElementById('chat-input'),m=i.value.trim();if(!m)return;socket.emit('chat_message',{message:m});i.value='';}
document.addEventListener('keydown',function(e){if(e.key==='Enter'&&document.activeElement.id==='chat-input')sendChat();});
socket.on('chat_message',function(d){var box=document.getElementById('chat-messages');if(!box)return;var el=document.createElement('div');el.className='chat-msg'+(d.name===myName?' mine':'');el.innerHTML='<strong>'+d.name+'</strong>'+d.message;box.appendChild(el);box.scrollTop=box.scrollHeight;});

var localStream=null,peers={},voiceEnabled=false;
async function toggleVoice(){var btn=document.getElementById('voice-btn');if(!voiceEnabled){try{localStream=await navigator.mediaDevices.getUserMedia({audio:true,video:false});voiceEnabled=true;btn.textContent='🎤 Vocal ON';btn.style.background='#1D9E75';socket.emit('voice_join',{room:myRoom});}catch(e){alert('Micro indispo: '+e.message);}}else{voiceEnabled=false;if(localStream)localStream.getTracks().forEach(function(t){t.stop();});localStream=null;Object.values(peers).forEach(function(p){p.close();});peers={};btn.textContent='🎤 Vocal OFF';btn.style.background='';socket.emit('voice_leave',{room:myRoom});}}

function show(id){document.querySelectorAll('.screen').forEach(function(s){s.classList.remove('active');});document.getElementById('screen-'+id).classList.add('active');}
function setError(id,msg){var el=document.getElementById(id);if(el){el.textContent=msg;setTimeout(function(){el.textContent='';},3000);}}
var AV=['av-purple','av-teal','av-coral','av-blue','av-amber'];
function avatar(name,i){return'<div class="avatar '+AV[i%5]+'">'+name.slice(0,2).toUpperCase()+'</div>';}

function createRoom(){
  myName=document.getElementById('home-name').value.trim();
  var rounds=parseInt(document.getElementById('home-rounds').value)||3;
  if(!myName)return setError('home-error','Entre ton pseudo !');
  socket.emit('create_room',{playerName:myName,totalRounds:rounds,selectedUniverses:selectedUniverses});
}
function joinRoom(){
  myName=document.getElementById('home-name').value.trim();
  var code=document.getElementById('home-code').value.trim().toUpperCase();
  if(!myName)return setError('home-error','Entre ton pseudo !');
  if(code.length!==4)return setError('home-error','Code = 4 caractères.');
  socket.emit('join_room',{code:code,playerName:myName});
}
function startGame(){socket.emit('start_game');}
function markReady(){document.getElementById('reveal-ready-btn').style.display='none';document.getElementById('reveal-waiting-others').style.display='block';socket.emit('player_ready');}
function submitHint(){var val=document.getElementById('round-hint-input').value.trim();if(!val)return;stopTimer();socket.emit('submit_hint',{hint:val});document.getElementById('round-hint-input').value='';}
function submitVote(){if(!selectedVote)return;socket.emit('submit_vote',{votedName:selectedVote});document.getElementById('vote-confirm-btn').disabled=true;document.querySelectorAll('.vote-btn').forEach(function(b){b.disabled=true;});}
function nextRound(){socket.emit('next_round');}
function restart(){qrGenerated=false;socket.emit('restart');}
function quitGame(){stopTimer();if(localStream)localStream.getTracks().forEach(function(t){t.stop();});socket.disconnect();location.reload();}

function renderLobby(state){
  document.getElementById('lobby-code').textContent=state.code;
  document.getElementById('lobby-players').innerHTML=state.players.map(function(p,i){return'<div class="player-row">'+avatar(p.name,i)+'<span>'+p.name+'</span>'+(p.ready?'<span class="ready-dot">✓</span>':'')+'</div>';}).join('');
  var ok=isHost&&state.players.length>=3;
  document.getElementById('lobby-start-btn').style.display=ok?'block':'none';
  document.getElementById('lobby-hint').textContent=state.players.length<3?'En attente... ('+state.players.length+'/3 minimum)':isHost?'':'En attente de l\'hôte...';
  renderUniversePanel(state);
}

function renderHints(){var all=[];[0,1].forEach(function(r){var e=Object.entries(allHints[r]);if(e.length){all.push('<div class="hint-round-label">Tour '+(r+1)+'</div>');e.forEach(function(x){all.push('<div class="hint-chip"><strong>'+x[0]+'</strong> : '+x[1]+'</div>');});}});var card=document.getElementById('hints-display');if(all.length){card.style.display='block';document.getElementById('hints-list').innerHTML=all.join('');}else card.style.display='none';}

function updateRound(currentPlayer){document.getElementById('round-current').textContent='C\'est au tour de '+currentPlayer;var isMe=currentPlayer===myName;document.getElementById('round-hint-area').style.display=isMe?'block':'none';document.getElementById('round-wait-area').style.display=isMe?'none':'block';if(!isMe){document.getElementById('round-wait-name').textContent=currentPlayer;stopTimer();}else startTimer(35);document.getElementById('round-hint-input').value='';}

function renderVote(players){selectedVote=null;var lines=[];[0,1].forEach(function(r){var e=Object.entries(allHints[r]);if(e.length){lines.push('<div class="hint-round-label">Tour '+(r+1)+'</div>');e.forEach(function(x){lines.push('<div class="hint-chip"><strong>'+x[0]+'</strong> : '+x[1]+'</div>');});}});document.getElementById('vote-hints').innerHTML='<div class="card-label">Tous les indices</div>'+lines.join('');document.getElementById('vote-buttons').innerHTML=players.map(function(name,i){return'<button class="vote-btn" id="vb-'+i+'" onclick="selectVote('+i+',\''+name+'\')">'+avatar(name,i)+' '+name+'</button>';}).join('');document.getElementById('vote-confirm-btn').disabled=true;document.getElementById('vote-status').textContent='';}

function selectVote(i,name){selectedVote=name;document.querySelectorAll('.vote-btn').forEach(function(b){b.classList.remove('selected');});document.getElementById('vb-'+i).classList.add('selected');document.getElementById('vote-confirm-btn').disabled=false;}

function renderScores(scores){return scores.slice().sort(function(a,b){return b.score-a.score;}).map(function(s,i){return'<div class="score-row"><span class="score-rank">'+(i===0?'🥇':i===1?'🥈':'🥉')+'</span><span>'+s.name+'</span><span class="score-pts">'+s.score+' pts</span></div>';}).join('');}

socket.on('room_created',function(d){myRoom=d.code;isHost=true;qrGenerated=false;show('lobby');setupShare(d.code);renderUniversePanel(null);});
socket.on('room_joined',function(d){myRoom=d.code;isHost=false;show('lobby');});
socket.on('room_update',function(state){if(state.phase==='lobby')renderLobby(state);});

socket.on('phase_change',function(d){
  stopTimer();
  if(d.phase==='lobby'){show('lobby');return;}
  if(d.phase==='reveal'){show('reveal');return;}
  if(d.phase==='round'){allHints=[{},{}];show('round');document.getElementById('round-label').textContent='Manche '+d.currentRound+'/'+d.totalRounds+' — Tour '+d.round+'/2';document.getElementById('round-progress').style.width=((d.round-1)*50)+'%';document.getElementById('chat-messages').innerHTML='';updateRound(d.currentPlayer);renderHints();}
  if(d.phase==='vote'){allHints=d.hints;show('vote');renderVote(d.players);}
});

socket.on('your_role',function(d){
  document.getElementById('reveal-waiting').textContent=d.isSpy?"Tu es l'espion !":'Ton personnage secret';
  document.getElementById('reveal-char-img').innerHTML=getImg(d.char.name,true);
  document.getElementById('reveal-name').textContent=d.char.name;
  document.getElementById('reveal-uni').textContent=d.char.uni;
  var badge=document.getElementById('reveal-role-badge');
  badge.textContent=d.isSpy?'🕵️ Espion':'🤝 Allié';
  badge.className='role-badge '+(d.isSpy?'spy':'ally');
  document.getElementById('reveal-tip').textContent=d.isSpy?"Bluff ! Tu ne sais pas quel personnage ont les autres.":"Trouve l'espion sans révéler le tien !";
  document.getElementById('reveal-ready-btn').style.display='block';
  document.getElementById('reveal-waiting-others').style.display='none';
});

socket.on('hint_submitted',function(d){allHints[d.round-1][d.player]=d.hint;renderHints();});
socket.on('next_player',function(d){updateRound(d.currentPlayer);});
socket.on('vote_update',function(d){document.getElementById('vote-status').textContent=d.votesIn+'/'+d.total+' votes...';});

socket.on('game_result',function(d){
  stopTimer();show('result');
  document.getElementById('result-icon').textContent=d.spyCaught?'🎉':'🕵️';
  document.getElementById('result-title').textContent=d.spyCaught?'Les alliés ont gagné !':"L'espion s'est échappé !";
  document.getElementById('result-sub').textContent=d.spyCaught?'Bien joué ! '+d.spyName+' était l\'espion.':d.accusedName+' était innocent(e). '+d.spyName+' était l\'espion.';
  document.getElementById('result-round-info').textContent='Manche '+d.currentRound+' / '+d.totalRounds;
  document.getElementById('res-ally-img').innerHTML=getImg(d.allyChar.name,false);
  document.getElementById('res-ally-name').textContent=d.allyChar.name+' ('+d.allyChar.uni+')';
  document.getElementById('res-spy-img').innerHTML=getImg(d.spyChar.name,false);
  document.getElementById('res-spy-name').textContent=d.spyChar.name+' ('+d.spyChar.uni+')';
  document.getElementById('res-spy-player').textContent=d.spyName;
  document.getElementById('votes-list').innerHTML=Object.entries(d.votes).map(function(x){return'<div class="vote-result-row">'+x[0]+' → <strong>'+x[1]+'</strong></div>';}).join('');
  document.getElementById('scores-list').innerHTML=renderScores(d.scores);
  document.getElementById('result-final-title').style.display=d.isLastRound?'block':'none';
  document.getElementById('result-next-btn').style.display=(!d.isLastRound&&isHost)?'block':'none';
  document.getElementById('result-restart-btn').style.display=(d.isLastRound&&isHost)?'block':'none';
  document.getElementById('result-wait').style.display=isHost?'none':'block';
});

var myBonusDone=false;
socket.on('bonus_phase',function(d){
  myBonusDone=false;
  document.getElementById('bonus-hint').textContent=d.hint;
  document.getElementById('bonus-label').textContent=d.isSpy?'Quel était le personnage des alliés ?':"Quel était le personnage de l'espion ?";
  document.getElementById('bonus-input').value='';
  document.getElementById('bonus-input').disabled=false;
  var btn=document.querySelector('#screen-bonus .btn-primary');if(btn)btn.disabled=false;
  document.getElementById('bonus-results').style.display='none';
  document.getElementById('bonus-results-list').innerHTML='';
  show('bonus');
});
function submitBonus(){if(myBonusDone)return;var guess=document.getElementById('bonus-input').value.trim();if(!guess)return;myBonusDone=true;socket.emit('submit_bonus',{guess:guess});document.getElementById('bonus-input').disabled=true;var btn=document.querySelector('#screen-bonus .btn-primary');if(btn)btn.disabled=true;}
function skipBonus(){if(myBonusDone)return;myBonusDone=true;socket.emit('skip_bonus');}
socket.on('bonus_result',function(d){
  var list=document.getElementById('bonus-results-list');
  document.getElementById('bonus-results').style.display='block';
  var div=document.createElement('div');div.className='vote-result-row';
  if(d.guess){div.innerHTML=d.correct?'<strong style="color:#5DCAA5;">'+d.playerName+'</strong> → "'+d.guess+'" ✓ +1 pt !':'<strong>'+d.playerName+'</strong> → "'+d.guess+'" ✗';}
  else{div.innerHTML='<strong style="color:var(--muted);">'+d.playerName+'</strong> a passé';}
  list.appendChild(div);
  document.getElementById('bonus-scores').innerHTML=renderScores(d.scores);
});

socket.on('player_left',function(d){console.log(d.name+' a quitté.');});
socket.on('error',function(d){setError('home-error',d.msg);setError('lobby-error',d.msg);});
