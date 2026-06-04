const socket = io();

// Toutes les images via PokeAPI (Pokemon) + MyAnimeList CDN (reste)
// MAL CDN format: https://cdn.myanimelist.net/images/characters/ID1/ID2.jpg
// On utilise des URLs directes et stables

const CHAR_IMAGES = {
  // === NARUTO ===
  'Itachi':       'https://cdn.myanimelist.net/images/characters/9/131317.jpg',
  'Sasuke':       'https://cdn.myanimelist.net/images/characters/2/284121.jpg',
  'Naruto':       'https://cdn.myanimelist.net/images/characters/2/284122.jpg',
  'Kakashi':      'https://cdn.myanimelist.net/images/characters/7/284118.jpg',
  'Obito':        'https://cdn.myanimelist.net/images/characters/14/284117.jpg',
  'Minato':       'https://cdn.myanimelist.net/images/characters/13/284115.jpg',
  'Jiraiya':      'https://cdn.myanimelist.net/images/characters/4/284113.jpg',
  'Tsunade':      'https://cdn.myanimelist.net/images/characters/6/284114.jpg',
  'Gaara':        'https://cdn.myanimelist.net/images/characters/3/284120.jpg',
  'Rock Lee':     'https://cdn.myanimelist.net/images/characters/8/284119.jpg',
  'Pain':         'https://cdn.myanimelist.net/images/characters/15/284116.jpg',
  'Madara':       'https://cdn.myanimelist.net/images/characters/11/284111.jpg',
  'Orochimaru':   'https://cdn.myanimelist.net/images/characters/10/284110.jpg',
  'Neji':         'https://cdn.myanimelist.net/images/characters/5/284112.jpg',
  // === DRAGON BALL ===
  'Goku':         'https://cdn.myanimelist.net/images/characters/4/55651.jpg',
  'Vegeta':       'https://cdn.myanimelist.net/images/characters/14/55650.jpg',
  'Gohan':        'https://cdn.myanimelist.net/images/characters/6/55648.jpg',
  'Freezer':      'https://cdn.myanimelist.net/images/characters/7/55647.jpg',
  'Cell':         'https://cdn.myanimelist.net/images/characters/8/55646.jpg',
  'Broly':        'https://cdn.myanimelist.net/images/characters/3/55653.jpg',
  'Piccolo':      'https://cdn.myanimelist.net/images/characters/9/55645.jpg',
  'Boo':          'https://cdn.myanimelist.net/images/characters/10/55644.jpg',
  'Trunks':       'https://cdn.myanimelist.net/images/characters/11/55643.jpg',
  'Goten':        'https://cdn.myanimelist.net/images/characters/12/55642.jpg',
  // === ONE PIECE ===
  'Luffy':        'https://cdn.myanimelist.net/images/characters/9/310307.jpg',
  'Zoro':         'https://cdn.myanimelist.net/images/characters/3/100534.jpg',
  'Sanji':        'https://cdn.myanimelist.net/images/characters/5/139313.jpg',
  'Nami':         'https://cdn.myanimelist.net/images/characters/8/284097.jpg',
  'Robin':        'https://cdn.myanimelist.net/images/characters/6/284096.jpg',
  'Shanks':       'https://cdn.myanimelist.net/images/characters/7/284098.jpg',
  'Ace':          'https://cdn.myanimelist.net/images/characters/4/284095.jpg',
  'Barbe Blanche':'https://cdn.myanimelist.net/images/characters/2/284094.jpg',
  'Trafalgar Law':'https://cdn.myanimelist.net/images/characters/1/284093.jpg',
  'Kaido':        'https://cdn.myanimelist.net/images/characters/15/311795.jpg',
  'Boa Hancock':  'https://cdn.myanimelist.net/images/characters/13/284091.jpg',
  'Usopp':        'https://cdn.myanimelist.net/images/characters/12/100535.jpg',
  'Chopper':      'https://cdn.myanimelist.net/images/characters/11/100536.jpg',
  'Brook':        'https://cdn.myanimelist.net/images/characters/10/100537.jpg',
  'Franky':       'https://cdn.myanimelist.net/images/characters/9/100538.jpg',
  'Jinbe':        'https://cdn.myanimelist.net/images/characters/8/100539.jpg',
  'Yamato':       'https://cdn.myanimelist.net/images/characters/7/457059.jpg',
  'Crocodile':    'https://cdn.myanimelist.net/images/characters/6/100540.jpg',
  'Doflamingo':   'https://cdn.myanimelist.net/images/characters/5/284090.jpg',
  'Katakuri':     'https://cdn.myanimelist.net/images/characters/4/334490.jpg',
  'Rayleigh':     'https://cdn.myanimelist.net/images/characters/3/100541.jpg',
  // === POKEMON (PokeAPI - 100% fiable) ===
  'Pikachu':      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
  'Raichu':       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png',
  'Dracaufeu':    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
  'Salamèche':    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
  'Mewtwo':       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png',
  'Mew':          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png',
  'Dracolosse':   'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png',
  'Evoli':        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png',
  'Darkrai':      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/491.png',
  'Lucario':      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png',
  'Lokhlass':     'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/131.png',
  'Dracovolt':    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/880.png',
  'Riolu':        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/447.png',
  'Sorcilège':    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/282.png',
  'Sacha':        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
  'Gary':         'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png',
  // === ATTACK ON TITAN ===
  'Eren':         'https://cdn.myanimelist.net/images/characters/10/216895.jpg',
  'Armin':        'https://cdn.myanimelist.net/images/characters/11/216896.jpg',
  'Levi':         'https://cdn.myanimelist.net/images/characters/2/241413.jpg',
  'Mikasa':       'https://cdn.myanimelist.net/images/characters/9/215563.jpg',
  'Hange':        'https://cdn.myanimelist.net/images/characters/12/216897.jpg',
  'Erwin':        'https://cdn.myanimelist.net/images/characters/7/216898.jpg',
  'Reiner':       'https://cdn.myanimelist.net/images/characters/8/216899.jpg',
  'Annie':        'https://cdn.myanimelist.net/images/characters/6/216900.jpg',
  'Zeke':         'https://cdn.myanimelist.net/images/characters/5/216901.jpg',
  'Historia':     'https://cdn.myanimelist.net/images/characters/4/216902.jpg',
  'Connie':       'https://cdn.myanimelist.net/images/characters/13/216904.jpg',
  'Sasha':        'https://cdn.myanimelist.net/images/characters/14/216905.jpg',
  // === DEMON SLAYER ===
  'Tanjiro':      'https://cdn.myanimelist.net/images/characters/6/368527.jpg',
  'Nezuko':       'https://cdn.myanimelist.net/images/characters/4/368526.jpg',
  'Zenitsu':      'https://cdn.myanimelist.net/images/characters/5/368528.jpg',
  'Inosuke':      'https://cdn.myanimelist.net/images/characters/3/368529.jpg',
  'Rengoku':      'https://cdn.myanimelist.net/images/characters/2/368530.jpg',
  'Tengen':       'https://cdn.myanimelist.net/images/characters/7/368531.jpg',
  'Muzan':        'https://cdn.myanimelist.net/images/characters/8/368532.jpg',
  'Akaza':        'https://cdn.myanimelist.net/images/characters/9/368533.jpg',
  'Shinobu':      'https://cdn.myanimelist.net/images/characters/10/368534.jpg',
  'Kanao':        'https://cdn.myanimelist.net/images/characters/11/368535.jpg',
  'Genya':        'https://cdn.myanimelist.net/images/characters/12/368536.jpg',
  // === SOLO LEVELING ===
  'Sung Jinwoo':  'https://cdn.myanimelist.net/images/characters/16/522826.jpg',
  'Igris':        'https://cdn.myanimelist.net/images/characters/12/522827.jpg',
  'Cha Hae-In':   'https://cdn.myanimelist.net/images/characters/11/522828.jpg',
  'Beru':         'https://cdn.myanimelist.net/images/characters/10/522829.jpg',
  'Thomas Andre': 'https://cdn.myanimelist.net/images/characters/9/522830.jpg',
  'Ashborn':      'https://cdn.myanimelist.net/images/characters/8/522831.jpg',
  'Antares':      'https://cdn.myanimelist.net/images/characters/7/522832.jpg',
  // === RE:ZERO ===
  'Subaru':       'https://cdn.myanimelist.net/images/characters/6/286751.jpg',
  'Emilia':       'https://cdn.myanimelist.net/images/characters/5/286752.jpg',
  'Rem':          'https://cdn.myanimelist.net/images/characters/4/286753.jpg',
  'Ram':          'https://cdn.myanimelist.net/images/characters/3/286754.jpg',
  'Beatrice':     'https://cdn.myanimelist.net/images/characters/2/286755.jpg',
  'Roswaal':      'https://cdn.myanimelist.net/images/characters/7/286756.jpg',
  'Reinhard':     'https://cdn.myanimelist.net/images/characters/8/286757.jpg',
  'Echidna':      'https://cdn.myanimelist.net/images/characters/9/286758.jpg',
  // === CITY HUNTER ===
  'Ryo Saeba':    'https://cdn.myanimelist.net/images/characters/5/68816.jpg',
  'Kaori':        'https://cdn.myanimelist.net/images/characters/6/68817.jpg',
  'Umibozu':      'https://cdn.myanimelist.net/images/characters/7/68818.jpg',
  // === MHA ===
  'Deku':         'https://cdn.myanimelist.net/images/characters/9/310860.jpg',
  'Bakugo':       'https://cdn.myanimelist.net/images/characters/10/310861.jpg',
  'Todoroki':     'https://cdn.myanimelist.net/images/characters/8/310862.jpg',
  'All Might':    'https://cdn.myanimelist.net/images/characters/7/310863.jpg',
  'Uraraka':      'https://cdn.myanimelist.net/images/characters/6/310864.jpg',
  'Shigaraki':    'https://cdn.myanimelist.net/images/characters/4/310866.jpg',
  'All For One':  'https://cdn.myanimelist.net/images/characters/3/310867.jpg',
  'Hawks':        'https://cdn.myanimelist.net/images/characters/2/310868.jpg',
  'Endeavor':     'https://cdn.myanimelist.net/images/characters/11/310869.jpg',
  // === DR STONE ===
  'Senku':        'https://cdn.myanimelist.net/images/characters/2/388868.jpg',
  'Tsukasa':      'https://cdn.myanimelist.net/images/characters/3/388869.jpg',
  'Chrome':       'https://cdn.myanimelist.net/images/characters/4/388870.jpg',
  'Kohaku':       'https://cdn.myanimelist.net/images/characters/5/388871.jpg',
  'Gen':          'https://cdn.myanimelist.net/images/characters/6/388872.jpg',
  'Ryusui':       'https://cdn.myanimelist.net/images/characters/7/388873.jpg',
  'Suika':        'https://cdn.myanimelist.net/images/characters/8/388874.jpg',
  // === JJK ===
  'Itadori':      'https://cdn.myanimelist.net/images/characters/1/494947.jpg',
  'Megumi':       'https://cdn.myanimelist.net/images/characters/2/494948.jpg',
  'Gojo':         'https://cdn.myanimelist.net/images/characters/3/494949.jpg',
  'Sukuna':       'https://cdn.myanimelist.net/images/characters/4/494950.jpg',
  'Nobara':       'https://cdn.myanimelist.net/images/characters/5/494951.jpg',
  'Nanami':       'https://cdn.myanimelist.net/images/characters/6/494952.jpg',
  'Yuta':         'https://cdn.myanimelist.net/images/characters/7/494953.jpg',
  'Mahito':       'https://cdn.myanimelist.net/images/characters/10/494956.jpg',
  // === BLUE LOCK ===
  'Isagi':        'https://cdn.myanimelist.net/images/characters/1/527784.jpg',
  'Bachira':      'https://cdn.myanimelist.net/images/characters/2/527785.jpg',
  'Rin':          'https://cdn.myanimelist.net/images/characters/3/527786.jpg',
  'Chigiri':      'https://cdn.myanimelist.net/images/characters/4/527787.jpg',
  'Reo':          'https://cdn.myanimelist.net/images/characters/5/527788.jpg',
  'Nagi':         'https://cdn.myanimelist.net/images/characters/6/527789.jpg',
  'Kaiser':       'https://cdn.myanimelist.net/images/characters/7/527790.jpg',
  'Barou':        'https://cdn.myanimelist.net/images/characters/8/527791.jpg',
  // === KUROKO ===
  'Kuroko':       'https://cdn.myanimelist.net/images/characters/3/138554.jpg',
  'Kagami':       'https://cdn.myanimelist.net/images/characters/4/138555.jpg',
  'Aomine':       'https://cdn.myanimelist.net/images/characters/5/138556.jpg',
  'Kise':         'https://cdn.myanimelist.net/images/characters/6/138557.jpg',
  'Midorima':     'https://cdn.myanimelist.net/images/characters/7/138558.jpg',
  'Akashi':       'https://cdn.myanimelist.net/images/characters/9/138560.jpg',
  // === FAIRY TAIL ===
  'Natsu':        'https://cdn.myanimelist.net/images/characters/9/153244.jpg',
  'Lucy':         'https://cdn.myanimelist.net/images/characters/8/153245.jpg',
  'Erza':         'https://cdn.myanimelist.net/images/characters/7/153246.jpg',
  'Gray':         'https://cdn.myanimelist.net/images/characters/6/153247.jpg',
  'Makarov':      'https://cdn.myanimelist.net/images/characters/5/153248.jpg',
  'Gildarts':     'https://cdn.myanimelist.net/images/characters/4/153249.jpg',
  'Laxus':        'https://cdn.myanimelist.net/images/characters/3/153250.jpg',
  'Zeref':        'https://cdn.myanimelist.net/images/characters/2/153251.jpg',
  'Acnologia':    'https://cdn.myanimelist.net/images/characters/11/153252.jpg',
  'Wendy':        'https://cdn.myanimelist.net/images/characters/10/153253.jpg',
  'Jellal':       'https://cdn.myanimelist.net/images/characters/12/153254.jpg',
  'Mirajane':     'https://cdn.myanimelist.net/images/characters/13/153255.jpg',
  'Cana':         'https://cdn.myanimelist.net/images/characters/14/153256.jpg',
  'Mystogan':     'https://cdn.myanimelist.net/images/characters/15/153257.jpg',
  'Elfman':       'https://cdn.myanimelist.net/images/characters/16/153258.jpg',
  // === BLEACH ===
  'Ichigo':       'https://cdn.myanimelist.net/images/characters/9/21135.jpg',
  'Rukia':        'https://cdn.myanimelist.net/images/characters/8/21134.jpg',
  'Aizen':        'https://cdn.myanimelist.net/images/characters/4/21138.jpg',
  'Byakuya':      'https://cdn.myanimelist.net/images/characters/7/21136.jpg',
  'Zaraki':       'https://cdn.myanimelist.net/images/characters/6/21137.jpg',
  'Renji':        'https://cdn.myanimelist.net/images/characters/5/21139.jpg',
  'Orihime':      'https://cdn.myanimelist.net/images/characters/3/21140.jpg',
  'Uryu':         'https://cdn.myanimelist.net/images/characters/2/21141.jpg',
  'Urahara':      'https://cdn.myanimelist.net/images/characters/11/21142.jpg',
  'Yoruichi':     'https://cdn.myanimelist.net/images/characters/10/21143.jpg',
  'Yhwach':       'https://cdn.myanimelist.net/images/characters/12/21144.jpg',
  'Grimmjow':     'https://cdn.myanimelist.net/images/characters/13/21145.jpg',
  'Ulquiorra':    'https://cdn.myanimelist.net/images/characters/14/21146.jpg',
  'Toshiro':      'https://cdn.myanimelist.net/images/characters/15/21147.jpg',
  'Shunsui':      'https://cdn.myanimelist.net/images/characters/16/21148.jpg',
  // === ONE PUNCH MAN ===
  'Saitama':      'https://cdn.myanimelist.net/images/characters/6/296816.jpg',
  'Genos':        'https://cdn.myanimelist.net/images/characters/5/296817.jpg',
  'Garou':        'https://cdn.myanimelist.net/images/characters/4/296818.jpg',
  'Bang':         'https://cdn.myanimelist.net/images/characters/3/296819.jpg',
  'Tornado':      'https://cdn.myanimelist.net/images/characters/2/296820.jpg',
  'Metal Bat':    'https://cdn.myanimelist.net/images/characters/7/296821.jpg',
  'King':         'https://cdn.myanimelist.net/images/characters/8/296822.jpg',
  'Flashy Flash': 'https://cdn.myanimelist.net/images/characters/9/296823.jpg',
  'Boros':        'https://cdn.myanimelist.net/images/characters/10/296824.jpg',
  'Zombieman':    'https://cdn.myanimelist.net/images/characters/11/296825.jpg',
  'Atomic Samurai':'https://cdn.myanimelist.net/images/characters/12/296826.jpg',
  'Child Emperor':'https://cdn.myanimelist.net/images/characters/13/296827.jpg',
  // === BLACK CLOVER ===
  'Asta':         'https://cdn.myanimelist.net/images/characters/9/345652.jpg',
  'Yuno':         'https://cdn.myanimelist.net/images/characters/8/345653.jpg',
  'Yami':         'https://cdn.myanimelist.net/images/characters/7/345654.jpg',
  'Noelle':       'https://cdn.myanimelist.net/images/characters/6/345655.jpg',
  'Julius':       'https://cdn.myanimelist.net/images/characters/5/345656.jpg',
  'Luck':         'https://cdn.myanimelist.net/images/characters/4/345657.jpg',
  'Finral':       'https://cdn.myanimelist.net/images/characters/3/345658.jpg',
  'Magna':        'https://cdn.myanimelist.net/images/characters/2/345659.jpg',
  'Mereoleona':   'https://cdn.myanimelist.net/images/characters/11/345660.jpg',
  'Secre':        'https://cdn.myanimelist.net/images/characters/10/345661.jpg',
  'Zagred':       'https://cdn.myanimelist.net/images/characters/12/345662.jpg',
  'Zenon':        'https://cdn.myanimelist.net/images/characters/13/345663.jpg',
  // === FIRE FORCE ===
  'Shinra':       'https://cdn.myanimelist.net/images/characters/9/387479.jpg',
  'Arthur':       'https://cdn.myanimelist.net/images/characters/8/387480.jpg',
  'Tamaki':       'https://cdn.myanimelist.net/images/characters/7/387481.jpg',
  'Obi':          'https://cdn.myanimelist.net/images/characters/6/387482.jpg',
  'Maki':         'https://cdn.myanimelist.net/images/characters/5/387483.jpg',
  'Burns':        'https://cdn.myanimelist.net/images/characters/4/387484.jpg',
  'Joker':        'https://cdn.myanimelist.net/images/characters/3/387485.jpg',
  'Sho':          'https://cdn.myanimelist.net/images/characters/2/387486.jpg',
  'Benimaru':     'https://cdn.myanimelist.net/images/characters/11/387487.jpg',
  'Viktor':       'https://cdn.myanimelist.net/images/characters/10/387488.jpg',
  'Nataku':       'https://cdn.myanimelist.net/images/characters/12/387489.jpg',
};

// Fallback emoji par univers si image cassée
const UNI_EMOJI = {
  'Naruto':'🔥','Dragon Ball':'🐉','One Piece':'🍖','Pokémon':'⚡',
  'Attack on Titan':'⚔️','Demon Slayer':'💧','Solo Leveling':'🗡️',
  'Re:Zero':'🌸','City Hunter':'🔫','My Hero Academia':'💪',
  'Dr. Stone':'🔬','Jujutsu Kaisen':'👁️','Blue Lock':'⚽',
  'Kuroko no Basket':'🏀','Fairy Tail':'✨','Bleach':'🌙',
  'One Punch Man':'👊','Black Clover':'🍀','Fire Force':'🔥',
};

function getImg(name, large) {
  const url = CHAR_IMAGES[name];
  const h = large ? '200px' : '64px';
  const r = large ? '12px' : '8px';
  if (!url) return `<div style="font-size:${large?'48px':'28px'};display:flex;align-items:center;justify-content:center;height:${h};">🎭</div>`;
  return `<img src="${url}" alt="${name}" style="max-height:${h};max-width:100%;object-fit:cover;border-radius:${r};" onerror="this.outerHTML='<div style=\\'font-size:${large?48:28}px;display:flex;align-items:center;justify-content:center;height:${h}\\'>🎭</div>'">`;
}

let myName='',myRoom='',isHost=false,selectedVote=null,allHints=[{},{}],qrGenerated=false;
let selectedUniverses=[];
const ALL_UNIVERSES=['Naruto','Dragon Ball','One Piece','Pokémon','Attack on Titan','Demon Slayer','Solo Leveling','Re:Zero','City Hunter','My Hero Academia','Dr. Stone','Jujutsu Kaisen','Blue Lock','Kuroko no Basket','Fairy Tail','Bleach','One Punch Man','Black Clover','Fire Force'];

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
socket.on('bonus_result',({playerName,guess,correct,scores,allDone})=>{
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
