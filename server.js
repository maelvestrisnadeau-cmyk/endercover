const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

const PAIRS = [
  { ally: { name: 'Itachi',    uni: 'Naruto',          emoji: '🔴' }, spy: { name: 'Sasuke',    uni: 'Naruto',          emoji: '⚡' } },
  { ally: { name: 'Naruto',    uni: 'Naruto',          emoji: '🍜' }, spy: { name: 'Goku',      uni: 'Dragon Ball',     emoji: '🐉' } },
  { ally: { name: 'Kakashi',   uni: 'Naruto',          emoji: '📖' }, spy: { name: 'Obito',     uni: 'Naruto',          emoji: '🌀' } },
  { ally: { name: 'Goku',      uni: 'Dragon Ball',     emoji: '🐉' }, spy: { name: 'Luffy',     uni: 'One Piece',       emoji: '🍖' } },
  { ally: { name: 'Vegeta',    uni: 'Dragon Ball',     emoji: '👑' }, spy: { name: 'Goku',      uni: 'Dragon Ball',     emoji: '🐉' } },
  { ally: { name: 'Luffy',     uni: 'One Piece',       emoji: '🍖' }, spy: { name: 'Naruto',    uni: 'Naruto',          emoji: '🍜' } },
  { ally: { name: 'Zoro',      uni: 'One Piece',       emoji: '⚔️' }, spy: { name: 'Sanji',     uni: 'One Piece',       emoji: '🔥' } },
  { ally: { name: 'Pikachu',   uni: 'Pokemon',         emoji: '⚡' }, spy: { name: 'Raichu',    uni: 'Pokemon',         emoji: '🌩️' } },
  { ally: { name: 'Dracaufeu', uni: 'Pokemon',         emoji: '🔥' }, spy: { name: 'Salamèche', uni: 'Pokemon',         emoji: '🦎' } },
  { ally: { name: 'Eren',      uni: 'Attack on Titan', emoji: '🏚️' }, spy: { name: 'Armin',     uni: 'Attack on Titan', emoji: '📜' } },
  { ally: { name: 'Levi',      uni: 'Attack on Titan', emoji: '🗡️' }, spy: { name: 'Mikasa',    uni: 'Attack on Titan', emoji: '🧣' } },
  { ally: { name: 'Tanjiro',   uni: 'Demon Slayer',    emoji: '💧' }, spy: { name: 'Zenitsu',   uni: 'Demon Slayer',    emoji: '⚡' } },
  { ally: { name: 'Nezuko',    uni: 'Demon Slayer',    emoji: '🌸' }, spy: { name: 'Tanjiro',   uni: 'Demon Slayer',    emoji: '💧' } },
  { ally: { name: 'Sasuke',    uni: 'Naruto',          emoji: '⚡' }, spy: { name: 'Vegeta',    uni: 'Dragon Ball',     emoji: '👑' } },
  { ally: { name: 'Zoro',      uni: 'One Piece',       emoji: '⚔️' }, spy: { name: 'Levi',      uni: 'Attack on Titan', emoji: '🗡️' } },
];

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
    players: room.players.map(p => ({ name: p.name, ready: p.ready })),
    phase: room.phase,
    round: room.round,
    hints: room.hints,
    votes: room.votes,
  };
}

io.on('connection', (socket) => {

  socket.on('create_room', ({ playerName }) => {
    let code;
    do { code = generateCode(); } while (rooms[code]);
    rooms[code] = {
      code, players: [{ id: socket.id, name: playerName, ready: false }],
      host: socket.id, phase: 'lobby', round: 0, currentPlayerIdx: 0,
      pair: null, spyId: null, hints: [{}, {}], votes: {},
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
    if (room.phase !== 'lobby') return socket.emit('error', { msg: 'Partie déjà en cours.' });
    room.players.push({ id: socket.id, name: playerName, ready: false });
    socket.join(code);
    socket.data.room = code;
    socket.data.name = playerName;
    socket.emit('room_joined', { code });
    io.to(code).emit('room_update', getRoomState(code));
  });

  socket.on('start_game', () => {
    const code = socket.data.room;
    const room = rooms[code];
    if (!room || room.host !== socket.id) return;
    if (room.players.length < 3) return socket.emit('error', { msg: 'Il faut au moins 3 joueurs.' });
    room.pair = PAIRS[Math.floor(Math.random() * PAIRS.length)];
    room.spyId = room.players[Math.floor(Math.random() * room.players.length)].id;
    room.phase = 'reveal';
    room.round = 1;
    room.currentPlayerIdx = 0;
    room.hints = [{}, {}];
    room.votes = {};
    room.players.forEach(p => {
      const char = p.id === room.spyId ? room.pair.spy : room.pair.ally;
      io.to(p.id).emit('your_role', { char, isSpy: p.id === room.spyId });
    });
    io.to(code).emit('room_update', getRoomState(code));
    io.to(code).emit('phase_change', { phase: 'reveal' });
  });

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
      io.to(code).emit('phase_change', {
        phase: 'round', round: room.round,
        currentPlayer: room.players[room.currentPlayerIdx].name,
      });
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
        room.round++;
        room.currentPlayerIdx = 0;
        io.to(code).emit('phase_change', {
          phase: 'round', round: room.round,
          currentPlayer: room.players[0].name,
        });
      } else {
        room.phase = 'vote';
        io.to(code).emit('phase_change', {
          phase: 'vote', hints: room.hints,
          players: room.players.map(p => p.name),
        });
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
      room.phase = 'result';
      io.to(code).emit('game_result', {
        spyCaught: accused === spy.name,
        spyName: spy.name, accusedName: accused,
        allyChar: room.pair.ally, spyChar: room.pair.spy,
        votes: room.votes,
      });
    } else {
      io.to(code).emit('vote_update', { votesIn: Object.keys(room.votes).length, total: room.players.length });
    }
  });

  socket.on('restart', () => {
    const code = socket.data.room;
    const room = rooms[code];
    if (!room || room.host !== socket.id) return;
    room.phase = 'lobby';
    room.players.forEach(p => p.ready = false);
    io.to(code).emit('room_update', getRoomState(code));
    io.to(code).emit('phase_change', { phase: 'lobby' });
  });

  // Vocal WebRTC
  socket.on('voice_join', ({ room }) => {
    const roomData = rooms[room];
    if (!roomData) return;
    roomData.players.forEach(p => {
      if (p.id !== socket.id) io.to(p.id).emit('voice_user_joined', { userId: socket.id });
    });
  });

  socket.on('voice_signal', ({ to, data }) => {
    io.to(to).emit('voice_signal', { from: socket.id, data });
  });

  socket.on('voice_leave', ({ room }) => {
    const roomData = rooms[room];
    if (!roomData) return;
    roomData.players.forEach(p => {
      if (p.id !== socket.id) io.to(p.id).emit('voice_user_left', { userId: socket.id });
    });
  });

  socket.on('disconnect', () => {
    const code = socket.data.room;
    if (!code || !rooms[code]) return;
    const room = rooms[code];
    room.players = room.players.filter(p => p.id !== socket.id);
    if (room.players.length === 0) {
      delete rooms[code];
    } else {
      if (room.host === socket.id) room.host = room.players[0].id;
      io.to(code).emit('player_left', { name: socket.data.name });
      io.to(code).emit('room_update', getRoomState(code));
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Endercover lancé sur http://localhost:${PORT}`));
