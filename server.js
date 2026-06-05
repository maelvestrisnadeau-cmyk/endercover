const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

const ALL_PAIRS = [
  {ally:{name:'Itachi',uni:'Naruto'},spy:{name:'Sasuke',uni:'Naruto'}},
  {ally:{name:'Naruto',uni:'Naruto'},spy:{name:'Sasuke',uni:'Naruto'}},
  {ally:{name:'Kakashi',uni:'Naruto'},spy:{name:'Obito',uni:'Naruto'}},
  {ally:{name:'Minato',uni:'Naruto'},spy:{name:'Naruto',uni:'Naruto'}},
  {ally:{name:'Jiraiya',uni:'Naruto'},spy:{name:'Orochimaru',uni:'Naruto'}},
  {ally:{name:'Tsunade',uni:'Naruto'},spy:{name:'Jiraiya',uni:'Naruto'}},
  {ally:{name:'Gaara',uni:'Naruto'},spy:{name:'Naruto',uni:'Naruto'}},
  {ally:{name:'Rock Lee',uni:'Naruto'},spy:{name:'Neji',uni:'Naruto'}},
  {ally:{name:'Pain',uni:'Naruto'},spy:{name:'Itachi',uni:'Naruto'}},
  {ally:{name:'Madara',uni:'Naruto'},spy:{name:'Obito',uni:'Naruto'}},
  {ally:{name:'Shikamaru',uni:'Naruto'},spy:{name:'Naruto',uni:'Naruto'}},
  {ally:{name:'Hinata',uni:'Naruto'},spy:{name:'Naruto',uni:'Naruto'}},
  {ally:{name:'Hashirama',uni:'Naruto'},spy:{name:'Madara',uni:'Naruto'}},
  {ally:{name:'Kisame',uni:'Naruto'},spy:{name:'Itachi',uni:'Naruto'}},
  {ally:{name:'Goku',uni:'Dragon Ball'},spy:{name:'Vegeta',uni:'Dragon Ball'}},
  {ally:{name:'Vegeta',uni:'Dragon Ball'},spy:{name:'Goku',uni:'Dragon Ball'}},
  {ally:{name:'Gohan',uni:'Dragon Ball'},spy:{name:'Goku',uni:'Dragon Ball'}},
  {ally:{name:'Freezer',uni:'Dragon Ball'},spy:{name:'Cell',uni:'Dragon Ball'}},
  {ally:{name:'Broly',uni:'Dragon Ball'},spy:{name:'Vegeta',uni:'Dragon Ball'}},
  {ally:{name:'Piccolo',uni:'Dragon Ball'},spy:{name:'Gohan',uni:'Dragon Ball'}},
  {ally:{name:'Cell',uni:'Dragon Ball'},spy:{name:'Freezer',uni:'Dragon Ball'}},
  {ally:{name:'Boo',uni:'Dragon Ball'},spy:{name:'Cell',uni:'Dragon Ball'}},
  {ally:{name:'Trunks',uni:'Dragon Ball'},spy:{name:'Vegeta',uni:'Dragon Ball'}},
  {ally:{name:'Beerus',uni:'Dragon Ball'},spy:{name:'Goku',uni:'Dragon Ball'}},
  {ally:{name:'Luffy',uni:'One Piece'},spy:{name:'Zoro',uni:'One Piece'}},
  {ally:{name:'Zoro',uni:'One Piece'},spy:{name:'Sanji',uni:'One Piece'}},
  {ally:{name:'Shanks',uni:'One Piece'},spy:{name:'Luffy',uni:'One Piece'}},
  {ally:{name:'Ace',uni:'One Piece'},spy:{name:'Luffy',uni:'One Piece'}},
  {ally:{name:'Nami',uni:'One Piece'},spy:{name:'Robin',uni:'One Piece'}},
  {ally:{name:'Robin',uni:'One Piece'},spy:{name:'Nami',uni:'One Piece'}},
  {ally:{name:'Barbe Blanche',uni:'One Piece'},spy:{name:'Shanks',uni:'One Piece'}},
  {ally:{name:'Trafalgar Law',uni:'One Piece'},spy:{name:'Zoro',uni:'One Piece'}},
  {ally:{name:'Kaido',uni:'One Piece'},spy:{name:'Barbe Blanche',uni:'One Piece'}},
  {ally:{name:'Mihawk',uni:'One Piece'},spy:{name:'Zoro',uni:'One Piece'}},
  {ally:{name:'Blackbeard',uni:'One Piece'},spy:{name:'Shanks',uni:'One Piece'}},
  {ally:{name:'Pikachu',uni:'Pokemon'},spy:{name:'Raichu',uni:'Pokemon'}},
  {ally:{name:'Dracaufeu',uni:'Pokemon'},spy:{name:'Salamèche',uni:'Pokemon'}},
  {ally:{name:'Mewtwo',uni:'Pokemon'},spy:{name:'Mew',uni:'Pokemon'}},
  {ally:{name:'Dracolosse',uni:'Pokemon'},spy:{name:'Dracaufeu',uni:'Pokemon'}},
  {ally:{name:'Lucario',uni:'Pokemon'},spy:{name:'Riolu',uni:'Pokemon'}},
  {ally:{name:'Eren',uni:'Attack on Titan'},spy:{name:'Armin',uni:'Attack on Titan'}},
  {ally:{name:'Levi',uni:'Attack on Titan'},spy:{name:'Mikasa',uni:'Attack on Titan'}},
  {ally:{name:'Hange',uni:'Attack on Titan'},spy:{name:'Levi',uni:'Attack on Titan'}},
  {ally:{name:'Erwin',uni:'Attack on Titan'},spy:{name:'Levi',uni:'Attack on Titan'}},
  {ally:{name:'Reiner',uni:'Attack on Titan'},spy:{name:'Eren',uni:'Attack on Titan'}},
  {ally:{name:'Annie',uni:'Attack on Titan'},spy:{name:'Mikasa',uni:'Attack on Titan'}},
  {ally:{name:'Tanjiro',uni:'Demon Slayer'},spy:{name:'Zenitsu',uni:'Demon Slayer'}},
  {ally:{name:'Nezuko',uni:'Demon Slayer'},spy:{name:'Tanjiro',uni:'Demon Slayer'}},
  {ally:{name:'Rengoku',uni:'Demon Slayer'},spy:{name:'Tanjiro',uni:'Demon Slayer'}},
  {ally:{name:'Muzan',uni:'Demon Slayer'},spy:{name:'Akaza',uni:'Demon Slayer'}},
  {ally:{name:'Kokushibo',uni:'Demon Slayer'},spy:{name:'Muzan',uni:'Demon Slayer'}},
  {ally:{name:'Natsu',uni:'Fairy Tail'},spy:{name:'Gray',uni:'Fairy Tail'}},
  {ally:{name:'Erza',uni:'Fairy Tail'},spy:{name:'Lucy',uni:'Fairy Tail'}},
  {ally:{name:'Zeref',uni:'Fairy Tail'},spy:{name:'Natsu',uni:'Fairy Tail'}},
  {ally:{name:'Acnologia',uni:'Fairy Tail'},spy:{name:'Zeref',uni:'Fairy Tail'}},
  {ally:{name:'Laxus',uni:'Fairy Tail'},spy:{name:'Natsu',uni:'Fairy Tail'}},
  {ally:{name:'Ichigo',uni:'Bleach'},spy:{name:'Rukia',uni:'Bleach'}},
  {ally:{name:'Aizen',uni:'Bleach'},spy:{name:'Ichigo',uni:'Bleach'}},
  {ally:{name:'Byakuya',uni:'Bleach'},spy:{name:'Ichigo',uni:'Bleach'}},
  {ally:{name:'Grimmjow',uni:'Bleach'},spy:{name:'Ichigo',uni:'Bleach'}},
  {ally:{name:'Ulquiorra',uni:'Bleach'},spy:{name:'Aizen',uni:'Bleach'}},
  {ally:{name:'Saitama',uni:'One Punch Man'},spy:{name:'Genos',uni:'One Punch Man'}},
  {ally:{name:'Garou',uni:'One Punch Man'},spy:{name:'Saitama',uni:'One Punch Man'}},
  {ally:{name:'Tornado',uni:'One Punch Man'},spy:{name:'Saitama',uni:'One Punch Man'}},
  {ally:{name:'Boros',uni:'One Punch Man'},spy:{name:'Saitama',uni:'One Punch Man'}},
  {ally:{name:'Asta',uni:'Black Clover'},spy:{name:'Yuno',uni:'Black Clover'}},
  {ally:{name:'Yami',uni:'Black Clover'},spy:{name:'Asta',uni:'Black Clover'}},
  {ally:{name:'Noelle',uni:'Black Clover'},spy:{name:'Asta',uni:'Black Clover'}},
  {ally:{name:'Shinra',uni:'Fire Force'},spy:{name:'Arthur',uni:'Fire Force'}},
  {ally:{name:'Benimaru',uni:'Fire Force'},spy:{name:'Shinra',uni:'Fire Force'}},
  {ally:{name:'Itadori',uni:'Jujutsu Kaisen'},spy:{name:'Megumi',uni:'Jujutsu Kaisen'}},
  {ally:{name:'Gojo',uni:'Jujutsu Kaisen'},spy:{name:'Itadori',uni:'Jujutsu Kaisen'}},
  {ally:{name:'Sukuna',uni:'Jujutsu Kaisen'},spy:{name:'Gojo',uni:'Jujutsu Kaisen'}},
  {ally:{name:'Nobara',uni:'Jujutsu Kaisen'},spy:{name:'Itadori',uni:'Jujutsu Kaisen'}},
  {ally:{name:'Deku',uni:'My Hero Academia'},spy:{name:'Bakugo',uni:'My Hero Academia'}},
  {ally:{name:'Todoroki',uni:'My Hero Academia'},spy:{name:'Deku',uni:'My Hero Academia'}},
  {ally:{name:'All Might',uni:'My Hero Academia'},spy:{name:'Deku',uni:'My Hero Academia'}},
  {ally:{name:'Shigaraki',uni:'My Hero Academia'},spy:{name:'All For One',uni:'My Hero Academia'}},
  {ally:{name:'Sung Jinwoo',uni:'Solo Leveling'},spy:{name:'Igris',uni:'Solo Leveling'}},
  {ally:{name:'Cha Hae-In',uni:'Solo Leveling'},spy:{name:'Sung Jinwoo',uni:'Solo Leveling'}},
  {ally:{name:'Isagi',uni:'Blue Lock'},spy:{name:'Bachira',uni:'Blue Lock'}},
  {ally:{name:'Rin',uni:'Blue Lock'},spy:{name:'Isagi',uni:'Blue Lock'}},
  {ally:{name:'Kaiser',uni:'Blue Lock'},spy:{name:'Rin',uni:'Blue Lock'}},
  {ally:{name:'Kuroko',uni:'Kuroko no Basket'},spy:{name:'Kagami',uni:'Kuroko no Basket'}},
  {ally:{name:'Aomine',uni:'Kuroko no Basket'},spy:{name:'Kuroko',uni:'Kuroko no Basket'}},
  {ally:{name:'Akashi',uni:'Kuroko no Basket'},spy:{name:'Aomine',uni:'Kuroko no Basket'}},
  {ally:{name:'Subaru',uni:'Re:Zero'},spy:{name:'Emilia',uni:'Re:Zero'}},
  {ally:{name:'Rem',uni:'Re:Zero'},spy:{name:'Ram',uni:'Re:Zero'}},
  {ally:{name:'Beatrice',uni:'Re:Zero'},spy:{name:'Emilia',uni:'Re:Zero'}},
  {ally:{name:'Senku',uni:'Dr. Stone'},spy:{name:'Tsukasa',uni:'Dr. Stone'}},
  {ally:{name:'Chrome',uni:'Dr. Stone'},spy:{name:'Senku',uni:'Dr. Stone'}},
  {ally:{name:'Ryo Saeba',uni:'City Hunter'},spy:{name:'Kaori',uni:'City Hunter'}},
];

const UNIVERSES = ['Naruto','Dragon Ball','One Piece','Pokemon','Attack on Titan','Demon Slayer','Fairy Tail','Bleach','One Punch Man','Black Clover','Fire Force','Jujutsu Kaisen','My Hero Academia','Solo Leveling','Blue Lock','Kuroko no Basket','Re:Zero','Dr. Stone','City Hunter'];

const rooms = {};

function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

function getRoomState(code) {
  const room = rooms[code];
  if (!room) return null;
  return {
    code,
    players: room.players.map(p => ({ name: p.name, ready: p.ready, score: p.score })),
    phase: room.phase, round: room.round,
    currentRound: room.currentRound, totalRounds: room.totalRounds,
    hints: room.hints, votes: room.votes,
    selectedUniverses: room.selectedUniverses,
  };
}

io.on('connection', (socket) => {

  socket.on('create_room', ({ playerName, totalRounds, selectedUniverses }) => {
    let code;
    do { code = generateCode(); } while (rooms[code]);
    rooms[code] = {
      code,
      players: [{ id: socket.id, name: playerName, ready: false, score: 0 }],
      host: socket.id, phase: 'lobby', round: 0,
      currentRound: 1, totalRounds: totalRounds || 3,
      currentPlayerIdx: 0, pair: null, spyId: null,
      hints: [{}, {}], votes: {},
      selectedUniverses: selectedUniverses && selectedUniverses.length > 0 ? selectedUniverses : UNIVERSES,
      bonusGuesses: {}, bonusSkips: {},
    };
    socket.join(code);
    socket.data.room = code;
    socket.data.name = playerName;
    socket.emit('room_created', { code });
    io.to(code).emit('room_update', getRoomState(code));
  });

  socket.on('join_room', ({ code, playerName }) => {
    const room = rooms[code];
    if (!room) return socket.emit('error', { msg: 'Salle introuvable.' });
    if (room.players.length >= 5) return socket.emit('error', { msg: 'Salle pleine.' });
    if (room.phase !== 'lobby') return socket.emit('error', { msg: 'Partie en cours.' });
    room.players.push({ id: socket.id, name: playerName, ready: false, score: 0 });
    socket.join(code);
    socket.data.room = code;
    socket.data.name = playerName;
    socket.emit('room_joined', { code });
    io.to(code).emit('room_update', getRoomState(code));
  });

  socket.on('update_universes', ({ selectedUniverses }) => {
    const code = socket.data.room;
    const room = rooms[code];
    if (!room || room.host !== socket.id) return;
    room.selectedUniverses = selectedUniverses;
    io.to(code).emit('room_update', getRoomState(code));
  });

  socket.on('start_game', () => {
    const code = socket.data.room;
    const room = rooms[code];
    if (!room || room.host !== socket.id) return;
    if (room.players.length < 3) return socket.emit('error', { msg: 'Il faut au moins 3 joueurs.' });
    startRound(code);
  });

  function startRound(code) {
    const room = rooms[code];
    const filtered = ALL_PAIRS.filter(p => room.selectedUniverses.includes(p.ally.uni));
    const pairs = filtered.length > 0 ? filtered : ALL_PAIRS;
    room.pair = pairs[Math.floor(Math.random() * pairs.length)];
    room.spyId = room.players[Math.floor(Math.random() * room.players.length)].id;
    room.phase = 'reveal'; room.round = 1; room.currentPlayerIdx = 0;
    room.hints = [{}, {}]; room.votes = {};
    room.bonusGuesses = {}; room.bonusSkips = {};
    room.players.forEach(p => {
      const char = p.id === room.spyId ? room.pair.spy : room.pair.ally;
      io.to(p.id).emit('your_role', { char, isSpy: p.id === room.spyId });
    });
    io.to(code).emit('room_update', getRoomState(code));
    io.to(code).emit('phase_change', { phase: 'reveal' });
  }

  socket.on('player_ready', () => {
    const code = socket.data.room;
    const room = rooms[code];
    if (!room) return;
    const player = room.players.find(p => p.id === socket.id);
    if (player) player.ready = true;
    io.to(code).emit('room_update', getRoomState(code));
    if (room.players.every(p => p.ready)) {
      room.phase = 'round';
      room.players.forEach(p => p.ready = false);
      io.to(code).emit('phase_change', { phase: 'round', round: room.round, currentPlayer: room.players[0].name, currentRound: room.currentRound, totalRounds: room.totalRounds });
    }
  });

  socket.on('submit_hint', ({ hint }) => {
    const code = socket.data.room;
    const room = rooms[code];
    if (!room || room.phase !== 'round') return;
    const cur = room.players[room.currentPlayerIdx];
    if (cur.id !== socket.id) return;
    room.hints[room.round - 1][cur.name] = hint;
    io.to(code).emit('hint_submitted', { player: cur.name, hint, round: room.round });
    room.currentPlayerIdx++;
    if (room.currentPlayerIdx >= room.players.length) {
      if (room.round < 2) {
        room.round++; room.currentPlayerIdx = 0;
        io.to(code).emit('phase_change', { phase: 'round', round: room.round, currentPlayer: room.players[0].name, currentRound: room.currentRound, totalRounds: room.totalRounds });
      } else {
        room.phase = 'vote';
        io.to(code).emit('phase_change', { phase: 'vote', hints: room.hints, players: room.players.map(p => p.name) });
      }
    } else {
      io.to(code).emit('next_player', { currentPlayer: room.players[room.currentPlayerIdx].name });
    }
  });

  socket.on('submit_vote', ({ votedName }) => {
    const code = socket.data.room;
    const room = rooms[code];
    if (!room || room.phase !== 'vote') return;
    room.votes[socket.data.name] = votedName;
    if (Object.keys(room.votes).length === room.players.length) {
      const count = {};
      Object.values(room.votes).forEach(v => { count[v] = (count[v] || 0) + 1; });
      const accused = Object.entries(count).sort((a, b) => b[1] - a[1])[0][0];
      const spy = room.players.find(p => p.id === room.spyId);
      const spyCaught = accused === spy.name;
      if (spyCaught) { room.players.forEach(p => { if (p.id !== room.spyId) p.score += 2; }); }
      else { spy.score += 3; }
      room.phase = 'bonus';
      room.bonusGuesses = {}; room.bonusSkips = {};
      const isLastRound = room.currentRound >= room.totalRounds;
      io.to(code).emit('game_result', { spyCaught, spyName: spy.name, accusedName: accused, allyChar: room.pair.ally, spyChar: room.pair.spy, votes: room.votes, scores: room.players.map(p => ({ name: p.name, score: p.score })), currentRound: room.currentRound, totalRounds: room.totalRounds, isLastRound });
      room.players.forEach(p => {
        const isSpy = p.id === room.spyId;
        io.to(p.id).emit('bonus_phase', { isSpy, hint: isSpy ? 'Devinez le personnage des alliés — +1 pt !' : "Devinez le personnage de l'espion — +1 pt !" });
      });
    } else {
      io.to(code).emit('vote_update', { votesIn: Object.keys(room.votes).length, total: room.players.length });
    }
  });

  socket.on('submit_bonus', ({ guess }) => {
    const code = socket.data.room;
    const room = rooms[code];
    if (!room || room.phase !== 'bonus') return;
    const player = room.players.find(p => p.id === socket.id);
    if (!player || room.bonusGuesses[player.name] || room.bonusSkips[player.name]) return;
    const isSpy = player.id === room.spyId;
    const target = isSpy ? room.pair.ally.name : room.pair.spy.name;
    const correct = guess.trim().toLowerCase() === target.toLowerCase();
    if (correct) player.score += 1;
    room.bonusGuesses[player.name] = { guess, correct };
    const total = Object.keys(room.bonusGuesses).length + Object.keys(room.bonusSkips).length;
    io.to(code).emit('bonus_result', { playerName: player.name, guess, correct, scores: room.players.map(p => ({ name: p.name, score: p.score })), allDone: total >= room.players.length });
  });

  socket.on('skip_bonus', () => {
    const code = socket.data.room;
    const room = rooms[code];
    if (!room || room.phase !== 'bonus') return;
    const player = room.players.find(p => p.id === socket.id);
    if (!player || room.bonusGuesses[player.name] || room.bonusSkips[player.name]) return;
    room.bonusSkips[player.name] = true;
    const total = Object.keys(room.bonusGuesses).length + Object.keys(room.bonusSkips).length;
    io.to(code).emit('bonus_result', { playerName: player.name, guess: null, correct: false, scores: room.players.map(p => ({ name: p.name, score: p.score })), allDone: total >= room.players.length });
  });

  socket.on('chat_message', ({ message }) => {
    const code = socket.data.room;
    if (!code || !rooms[code]) return;
    io.to(code).emit('chat_message', { name: socket.data.name, message });
  });

  socket.on('next_round', () => {
    const code = socket.data.room;
    const room = rooms[code];
    if (!room || room.host !== socket.id) return;
    room.currentRound++;
    startRound(code);
  });

  socket.on('restart', () => {
    const code = socket.data.room;
    const room = rooms[code];
    if (!room || room.host !== socket.id) return;
    room.phase = 'lobby'; room.currentRound = 1;
    room.players.forEach(p => { p.ready = false; p.score = 0; });
    io.to(code).emit('room_update', getRoomState(code));
    io.to(code).emit('phase_change', { phase: 'lobby' });
  });

  socket.on('voice_join', ({ room }) => { const r = rooms[room]; if (!r) return; r.players.forEach(p => { if (p.id !== socket.id) io.to(p.id).emit('voice_user_joined', { userId: socket.id }); }); });
  socket.on('voice_signal', ({ to, data }) => { io.to(to).emit('voice_signal', { from: socket.id, data }); });
  socket.on('voice_leave', ({ room }) => { const r = rooms[room]; if (!r) return; r.players.forEach(p => { if (p.id !== socket.id) io.to(p.id).emit('voice_user_left', { userId: socket.id }); }); });

  socket.on('disconnect', () => {
    const code = socket.data.room;
    if (!code || !rooms[code]) return;
    const room = rooms[code];
    room.players = room.players.filter(p => p.id !== socket.id);
    if (room.players.length === 0) { delete rooms[code]; }
    else {
      if (room.host === socket.id) room.host = room.players[0].id;
      io.to(code).emit('player_left', { name: socket.data.name });
      io.to(code).emit('room_update', getRoomState(code));
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log('Endercover lance sur http://localhost:' + PORT));
