const socket = io();

const CHAR_IMAGES = {
  'Itachi':     'https://static.wikia.nocookie.net/naruto/images/b/bb/Itachi_Uchiha.png',
  'Sasuke':     'https://static.wikia.nocookie.net/naruto/images/2/21/Sasuke_Part_1.png',
  'Naruto':     'https://static.wikia.nocookie.net/naruto/images/9/97/Naruto_Part_I.png',
  'Kakashi':    'https://static.wikia.nocookie.net/naruto/images/2/27/Kakashi_Hatake.png',
  'Obito':      'https://static.wikia.nocookie.net/naruto/images/8/8b/Obito_Uchiha.png',
  'Goku':       'https://static.wikia.nocookie.net/dragonball/images/5/5b/Goku_Dragon_Ball_Super.png',
  'Vegeta':     'https://static.wikia.nocookie.net/dragonball/images/e/ea/Vegeta_Dragon_Ball_Super.png',
  'Luffy':      'https://static.wikia.nocookie.net/onepiece/images/6/6d/Monkey_D._Luffy_Anime_Post_Timeskip_Infobox.png',
  'Zoro':       'https://static.wikia.nocookie.net/onepiece/images/1/15/Roronoa_Zoro_Anime_Post_Timeskip_Infobox.png',
  'Sanji':      'https://static.wikia.nocookie.net/onepiece/images/7/7b/Sanji_Anime_Post_Timeskip_Infobox.png',
  'Pikachu':    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
  'Raichu':     'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png',
  'Dracaufeu':  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
  'Salamèche':  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
  'Eren':       'https://static.wikia.nocookie.net/shingekinokyojin/images/7/76/Eren_Jaeger_%28Anime%29_character_image.png',
  'Armin':      'https://static.wikia.nocookie.net/shingekinokyojin/images/a/a1/Armin_Arlert_%28Anime%29_character_image.png',
  'Levi':       'https://static.wikia.nocookie.net/shingekinokyojin/images/2/2e/Levi_Ackermann_%28Anime%29_character_image.png',
  'Mikasa':     'https://static.wikia.nocookie.net/shingekinokyojin/images/a/a5/Mikasa_Ackermann_%28Anime%29_character_image.png',
  'Tanjiro':    'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/3/3e/Tanjiro_Kamado_Anime.png',
  'Zenitsu':    'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/3/33/Zenitsu_Agatsuma_Anime.png',
  'Nezuko':     'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/9/9b/Nezuko_Kamado_Anime.png',
};

function getImg(name, large) {
  const url = CHAR_IMAGES[name];
  if (!url) return `<span style="font-size:${large?'64px':'36px'}">🎭</span>`;
  return `<img src="${url}" alt="${name}" style="max-height:${large?'200px':'64px'};max-width:100%;object-fit:contain;" onerror="this.style.display='none'">`;
}

let myName='', myRoom='', isHost=false, selectedVote=null, allHints=[{},{}];
let qrGenerated=false;

// --- QR Code & Partage ---
function generateShareLink(code) {
  const host = window.location.host;
  return `http://${host}?code=${code}`;
}

function setupShare(code) {
  const link = generateShareLink(code);
  document.getElementById('share-link').textContent = link;

  if (!qrGenerated) {
    document.getElementById('qrcode').innerHTML = '';
    new QRCode(document.getElementById('qrcode'), {
      text: link,
      width: 140,
      height: 140,
      colorDark: '#534AB7',
      colorLight: '#1a1828',
    });
    qrGenerated = true;
  }
}

function copyLink() {
  const link = document.getElementById('share-link').textContent;
  navigator.clipboard.writeText(link).then(() => {
    const btn = document.getElementById('copy-btn');
    btn.textContent = '✓ Copié !';
    btn.style.background = '#1D9E75';
    setTimeout(() => { btn.textContent = '📋 Copier'; btn.style.background = ''; }, 2000);
  });
}

// Rejoindre auto si ?code= dans l'URL
window.addEventListener('load', () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  if (code) {
    document.getElementById('home-code').value = code.toUpperCase();
    document.getElementById('home-code').focus();
  }
});

// --- Timer ---
let timerInterval=null, timerLeft=0;
function startTimer(seconds) {
  clearInterval(timerInterval);
  timerLeft = seconds;
  updateTimerUI();
  timerInterval = setInterval(() => {
    timerLeft--;
    updateTimerUI();
    if (timerLeft <= 0) { clearInterval(timerInterval); autoSubmitHint(); }
  }, 1000);
}
function stopTimer() { clearInterval(timerInterval); document.getElementById('timer-bar').style.display='none'; }
function updateTimerUI() {
  const bar = document.getElementById('timer-bar');
  const txt = document.getElementById('timer-text');
  const fill = document.getElementById('timer-fill');
  bar.style.display = 'block';
  txt.textContent = timerLeft + 's';
  fill.style.width = (timerLeft / 35 * 100) + '%';
  fill.style.background = timerLeft <= 10 ? '#E24B4A' : timerLeft <= 20 ? '#EF9F27' : '#534AB7';
}
function autoSubmitHint() {
  const val = document.getElementById('round-hint-input').value.trim();
  socket.emit('submit_hint', { hint: val || '...' });
}

// --- Vocal WebRTC ---
let localStream=null, peers={};
let voiceEnabled=false;

async function toggleVoice() {
  const btn = document.getElementById('voice-btn');
  if (!voiceEnabled) {
    try {
      localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      voiceEnabled = true;
      btn.textContent = '🎤 Vocal ON';
      btn.style.background = '#1D9E75';
      socket.emit('voice_join', { room: myRoom });
    } catch(e) {
      alert('Micro non disponible : ' + e.message);
    }
  } else {
    voiceEnabled = false;
    if (localStream) localStream.getTracks().forEach(t => t.stop());
    localStream = null;
    Object.values(peers).forEach(p => p.close());
    peers = {};
    btn.textContent = '🎤 Vocal OFF';
    btn.style.background = '';
    socket.emit('voice_leave', { room: myRoom });
  }
}

function createPeer(targetId, initiator) {
  const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
  if (localStream) localStream.getTracks().forEach(t => pc.addTrack(t, localStream));
  pc.onicecandidate = e => {
    if (e.candidate) socket.emit('voice_signal', { to: targetId, data: { candidate: e.candidate } });
  };
  pc.ontrack = e => {
    let audio = document.getElementById('audio-' + targetId);
    if (!audio) { audio = document.createElement('audio'); audio.id = 'audio-' + targetId; audio.autoplay = true; document.body.appendChild(audio); }
    audio.srcObject = e.streams[0];
  };
  if (initiator) {
    pc.createOffer().then(o => pc.setLocalDescription(o)).then(() => {
      socket.emit('voice_signal', { to: targetId, data: { sdp: pc.localDescription } });
    });
  }
  peers[targetId] = pc;
  return pc;
}

socket.on('voice_user_joined', ({ userId }) => { if (voiceEnabled) createPeer(userId, true); });
socket.on('voice_signal', async ({ from, data }) => {
  if (!voiceEnabled) return;
  if (!peers[from]) createPeer(from, false);
  const pc = peers[from];
  if (data.sdp) {
    await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
    if (data.sdp.type === 'offer') {
      const ans = await pc.createAnswer();
      await pc.setLocalDescription(ans);
      socket.emit('voice_signal', { to: from, data: { sdp: pc.localDescription } });
    }
  } else if (data.candidate) {
    await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
  }
});
socket.on('voice_user_left', ({ userId }) => {
  if (peers[userId]) { peers[userId].close(); delete peers[userId]; }
  const a = document.getElementById('audio-' + userId);
  if (a) a.remove();
});

// --- Utilitaires ---
function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + id).classList.add('active');
}
function setError(id, msg) {
  const el = document.getElementById(id);
  if (el) { el.textContent = msg; setTimeout(() => el.textContent = '', 3000); }
}
const AV = ['av-purple','av-teal','av-coral','av-blue','av-amber'];
function avatar(name, i) { return `<div class="avatar ${AV[i%5]}">${name.slice(0,2).toUpperCase()}</div>`; }

// --- Actions ---
function createRoom() {
  myName = document.getElementById('home-name').value.trim();
  if (!myName) return setError('home-error', 'Entre ton pseudo !');
  socket.emit('create_room', { playerName: myName });
}
function joinRoom() {
  myName = document.getElementById('home-name').value.trim();
  const code = document.getElementById('home-code').value.trim().toUpperCase();
  if (!myName) return setError('home-error', 'Entre ton pseudo !');
  if (code.length !== 4) return setError('home-error', 'Le code fait 4 caractères.');
  socket.emit('join_room', { code, playerName: myName });
}
function startGame() { socket.emit('start_game'); }
function markReady() {
  document.getElementById('reveal-ready-btn').style.display = 'none';
  document.getElementById('reveal-waiting-others').style.display = 'block';
  socket.emit('player_ready');
}
function submitHint() {
  const val = document.getElementById('round-hint-input').value.trim();
  if (!val) return;
  stopTimer();
  socket.emit('submit_hint', { hint: val });
  document.getElementById('round-hint-input').value = '';
}
function submitVote() {
  if (!selectedVote) return;
  socket.emit('submit_vote', { votedName: selectedVote });
  document.getElementById('vote-confirm-btn').disabled = true;
  document.querySelectorAll('.vote-btn').forEach(b => b.disabled = true);
}
function restart() { qrGenerated = false; socket.emit('restart'); }
function quitGame() {
  stopTimer();
  if (localStream) localStream.getTracks().forEach(t => t.stop());
  socket.disconnect();
  location.reload();
}

function renderLobby(state) {
  document.getElementById('lobby-code').textContent = state.code;
  document.getElementById('lobby-players').innerHTML = state.players
    .map((p, i) => `<div class="player-row">${avatar(p.name, i)}<span>${p.name}</span>${p.ready ? '<span class="ready-dot">✓</span>' : ''}</div>`)
    .join('');
  const ok = isHost && state.players.length >= 3;
  document.getElementById('lobby-start-btn').style.display = ok ? 'block' : 'none';
  document.getElementById('lobby-hint').textContent = state.players.length < 3
    ? `En attente... (${state.players.length}/3 minimum)`
    : isHost ? '' : "En attente du lancement par l'hôte...";
}

function renderHints() {
  const all = [];
  [0,1].forEach(r => {
    const e = Object.entries(allHints[r]);
    if (e.length) {
      all.push(`<div class="hint-round-label">Tour ${r+1}</div>`);
      e.forEach(([n,h]) => all.push(`<div class="hint-chip"><strong>${n}</strong> : ${h}</div>`));
    }
  });
  const card = document.getElementById('hints-display');
  if (all.length) { card.style.display = 'block'; document.getElementById('hints-list').innerHTML = all.join(''); }
  else card.style.display = 'none';
}

function updateRound(currentPlayer) {
  document.getElementById('round-current').textContent = `C'est au tour de ${currentPlayer}`;
  const isMe = currentPlayer === myName;
  document.getElementById('round-hint-area').style.display = isMe ? 'block' : 'none';
  document.getElementById('round-wait-area').style.display = isMe ? 'none' : 'block';
  if (!isMe) { document.getElementById('round-wait-name').textContent = currentPlayer; stopTimer(); }
  else startTimer(35);
  document.getElementById('round-hint-input').value = '';
}

function renderVote(players) {
  selectedVote = null;
  const lines = [];
  [0,1].forEach(r => {
    const e = Object.entries(allHints[r]);
    if (e.length) {
      lines.push(`<div class="hint-round-label">Tour ${r+1}</div>`);
      e.forEach(([n,h]) => lines.push(`<div class="hint-chip"><strong>${n}</strong> : ${h}</div>`));
    }
  });
  document.getElementById('vote-hints').innerHTML = '<div class="card-label">Tous les indices</div>' + lines.join('');
  document.getElementById('vote-buttons').innerHTML = players.map((name, i) =>
    `<button class="vote-btn" id="vb-${i}" onclick="selectVote(${i},'${name}')">${avatar(name,i)} ${name}</button>`
  ).join('');
  document.getElementById('vote-confirm-btn').disabled = true;
  document.getElementById('vote-status').textContent = '';
}

function selectVote(i, name) {
  selectedVote = name;
  document.querySelectorAll('.vote-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById('vb-' + i).classList.add('selected');
  document.getElementById('vote-confirm-btn').disabled = false;
}

// --- Socket events ---
socket.on('room_created', ({ code }) => { myRoom = code; isHost = true; qrGenerated = false; show('lobby'); setupShare(code); });
socket.on('room_joined',  ({ code }) => { myRoom = code; isHost = false; show('lobby'); });
socket.on('room_update',  state => { if (state.phase === 'lobby') renderLobby(state); });

socket.on('phase_change', ({ phase, round, currentPlayer, hints, players }) => {
  stopTimer();
  if (phase === 'lobby') { show('lobby'); return; }
  if (phase === 'reveal') { show('reveal'); return; }
  if (phase === 'round') {
    allHints = [{},{}]; show('round');
    document.getElementById('round-label').textContent = `Tour ${round} / 2`;
    document.getElementById('round-progress').style.width = ((round-1)*50) + '%';
    updateRound(currentPlayer); renderHints();
  }
  if (phase === 'vote') { allHints = hints; show('vote'); renderVote(players); }
});

socket.on('your_role', ({ char, isSpy }) => {
  document.getElementById('reveal-waiting').textContent = isSpy ? "Tu es l'espion !" : 'Ton personnage secret';
  document.getElementById('reveal-char-img').innerHTML = getImg(char.name, true);
  document.getElementById('reveal-name').textContent = char.name;
  document.getElementById('reveal-uni').textContent = char.uni;
  const badge = document.getElementById('reveal-role-badge');
  badge.textContent = isSpy ? '🕵️ Espion' : '🤝 Allié';
  badge.className = 'role-badge ' + (isSpy ? 'spy' : 'ally');
  document.getElementById('reveal-tip').textContent = isSpy
    ? "Tu ne sais pas quel personnage ont les autres. Bluff !"
    : "Un autre joueur a le même personnage. Trouve l'espion sans révéler le tien !";
  document.getElementById('reveal-ready-btn').style.display = 'block';
  document.getElementById('reveal-waiting-others').style.display = 'none';
});

socket.on('hint_submitted', ({ player, hint, round }) => { allHints[round-1][player] = hint; renderHints(); });
socket.on('next_player', ({ currentPlayer }) => updateRound(currentPlayer));
socket.on('vote_update', ({ votesIn, total }) => { document.getElementById('vote-status').textContent = `${votesIn}/${total} votes...`; });

socket.on('game_result', ({ spyCaught, spyName, accusedName, allyChar, spyChar, votes }) => {
  stopTimer();
  show('result');
  document.getElementById('result-icon').textContent = spyCaught ? '🎉' : '🕵️';
  document.getElementById('result-title').textContent = spyCaught ? 'Les alliés ont gagné !' : "L'espion s'est échappé !";
  document.getElementById('result-sub').textContent = spyCaught
    ? `Bien joué ! ${spyName} était l'espion.`
    : `${accusedName} était innocent(e). ${spyName} était l'espion.`;
  document.getElementById('res-ally-img').innerHTML = getImg(allyChar.name, false);
  document.getElementById('res-ally-name').textContent = `${allyChar.name} (${allyChar.uni})`;
  document.getElementById('res-spy-img').innerHTML = getImg(spyChar.name, false);
  document.getElementById('res-spy-name').textContent = `${spyChar.name} (${spyChar.uni})`;
  document.getElementById('res-spy-player').textContent = spyName;
  document.getElementById('votes-list').innerHTML = Object.entries(votes)
    .map(([v,t]) => `<div class="vote-result-row">${v} → <strong>${t}</strong></div>`).join('');
  document.getElementById('result-restart-btn').style.display = isHost ? 'block' : 'none';
  document.getElementById('result-wait').style.display = isHost ? 'none' : 'block';
});

socket.on('player_left', ({ name }) => console.log(name + ' a quitté.'));
socket.on('error', ({ msg }) => { setError('home-error', msg); setError('lobby-error', msg); });
