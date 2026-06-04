const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

const ALL_PAIRS = [
  // ===================== NARUTO (40) =====================
  {ally:{name:'Itachi',uni:'Naruto'},spy:{name:'Sasuke',uni:'Naruto'}},
  {ally:{name:'Sasuke',uni:'Naruto'},spy:{name:'Itachi',uni:'Naruto'}},
  {ally:{name:'Naruto',uni:'Naruto'},spy:{name:'Sasuke',uni:'Naruto'}},
  {ally:{name:'Kakashi',uni:'Naruto'},spy:{name:'Obito',uni:'Naruto'}},
  {ally:{name:'Minato',uni:'Naruto'},spy:{name:'Naruto',uni:'Naruto'}},
  {ally:{name:'Jiraiya',uni:'Naruto'},spy:{name:'Orochimaru',uni:'Naruto'}},
  {ally:{name:'Tsunade',uni:'Naruto'},spy:{name:'Jiraiya',uni:'Naruto'}},
  {ally:{name:'Gaara',uni:'Naruto'},spy:{name:'Naruto',uni:'Naruto'}},
  {ally:{name:'Rock Lee',uni:'Naruto'},spy:{name:'Neji',uni:'Naruto'}},
  {ally:{name:'Pain',uni:'Naruto'},spy:{name:'Itachi',uni:'Naruto'}},
  {ally:{name:'Madara',uni:'Naruto'},spy:{name:'Obito',uni:'Naruto'}},
  {ally:{name:'Orochimaru',uni:'Naruto'},spy:{name:'Kabuto',uni:'Naruto'}},
  {ally:{name:'Neji',uni:'Naruto'},spy:{name:'Rock Lee',uni:'Naruto'}},
  {ally:{name:'Kabuto',uni:'Naruto'},spy:{name:'Orochimaru',uni:'Naruto'}},
  {ally:{name:'Shikamaru',uni:'Naruto'},spy:{name:'Naruto',uni:'Naruto'}},
  {ally:{name:'Hinata',uni:'Naruto'},spy:{name:'Naruto',uni:'Naruto'}},
  {ally:{name:'Sakura',uni:'Naruto'},spy:{name:'Hinata',uni:'Naruto'}},
  {ally:{name:'Obito',uni:'Naruto'},spy:{name:'Kakashi',uni:'Naruto'}},
  {ally:{name:'Kaguya',uni:'Naruto'},spy:{name:'Madara',uni:'Naruto'}},
  {ally:{name:'Hashirama',uni:'Naruto'},spy:{name:'Madara',uni:'Naruto'}},
  {ally:{name:'Tobirama',uni:'Naruto'},spy:{name:'Hashirama',uni:'Naruto'}},
  {ally:{name:'Kisame',uni:'Naruto'},spy:{name:'Itachi',uni:'Naruto'}},
  {ally:{name:'Deidara',uni:'Naruto'},spy:{name:'Sasori',uni:'Naruto'}},
  {ally:{name:'Sasori',uni:'Naruto'},spy:{name:'Deidara',uni:'Naruto'}},
  {ally:{name:'Konan',uni:'Naruto'},spy:{name:'Pain',uni:'Naruto'}},
  {ally:{name:'Temari',uni:'Naruto'},spy:{name:'Gaara',uni:'Naruto'}},
  {ally:{name:'Kankuro',uni:'Naruto'},spy:{name:'Gaara',uni:'Naruto'}},
  {ally:{name:'Choji',uni:'Naruto'},spy:{name:'Shikamaru',uni:'Naruto'}},
  {ally:{name:'Ino',uni:'Naruto'},spy:{name:'Sakura',uni:'Naruto'}},
  {ally:{name:'Kiba',uni:'Naruto'},spy:{name:'Naruto',uni:'Naruto'}},
  {ally:{name:'Shino',uni:'Naruto'},spy:{name:'Kiba',uni:'Naruto'}},
  {ally:{name:'Kurama',uni:'Naruto'},spy:{name:'Naruto',uni:'Naruto'}},
  {ally:{name:'Nagato',uni:'Naruto'},spy:{name:'Pain',uni:'Naruto'}},
  {ally:{name:'Yahiko',uni:'Naruto'},spy:{name:'Nagato',uni:'Naruto'}},
  {ally:{name:'Killer Bee',uni:'Naruto'},spy:{name:'Naruto',uni:'Naruto'}},
  {ally:{name:'A Raikage',uni:'Naruto'},spy:{name:'Killer Bee',uni:'Naruto'}},
  {ally:{name:'Mei Terumi',uni:'Naruto'},spy:{name:'Tsunade',uni:'Naruto'}},
  {ally:{name:'Onoki',uni:'Naruto'},spy:{name:'Madara',uni:'Naruto'}},
  {ally:{name:'Danzo',uni:'Naruto'},spy:{name:'Orochimaru',uni:'Naruto'}},
  {ally:{name:'Asuma',uni:'Naruto'},spy:{name:'Kakashi',uni:'Naruto'}},
  // ===================== DRAGON BALL (40) =====================
  {ally:{name:'Goku',uni:'Dragon Ball'},spy:{name:'Vegeta',uni:'Dragon Ball'}},
  {ally:{name:'Vegeta',uni:'Dragon Ball'},spy:{name:'Goku',uni:'Dragon Ball'}},
  {ally:{name:'Gohan',uni:'Dragon Ball'},spy:{name:'Goku',uni:'Dragon Ball'}},
  {ally:{name:'Freezer',uni:'Dragon Ball'},spy:{name:'Cell',uni:'Dragon Ball'}},
  {ally:{name:'Broly',uni:'Dragon Ball'},spy:{name:'Vegeta',uni:'Dragon Ball'}},
  {ally:{name:'Piccolo',uni:'Dragon Ball'},spy:{name:'Gohan',uni:'Dragon Ball'}},
  {ally:{name:'Cell',uni:'Dragon Ball'},spy:{name:'Freezer',uni:'Dragon Ball'}},
  {ally:{name:'Boo',uni:'Dragon Ball'},spy:{name:'Cell',uni:'Dragon Ball'}},
  {ally:{name:'Trunks',uni:'Dragon Ball'},spy:{name:'Vegeta',uni:'Dragon Ball'}},
  {ally:{name:'Goten',uni:'Dragon Ball'},spy:{name:'Goku',uni:'Dragon Ball'}},
  {ally:{name:'Krilin',uni:'Dragon Ball'},spy:{name:'Goku',uni:'Dragon Ball'}},
  {ally:{name:'Tenshinhan',uni:'Dragon Ball'},spy:{name:'Krilin',uni:'Dragon Ball'}},
  {ally:{name:'Yamcha',uni:'Dragon Ball'},spy:{name:'Krilin',uni:'Dragon Ball'}},
  {ally:{name:'Bulma',uni:'Dragon Ball'},spy:{name:'Chi-Chi',uni:'Dragon Ball'}},
  {ally:{name:'Chi-Chi',uni:'Dragon Ball'},spy:{name:'Bulma',uni:'Dragon Ball'}},
  {ally:{name:'Raditz',uni:'Dragon Ball'},spy:{name:'Vegeta',uni:'Dragon Ball'}},
  {ally:{name:'Nappa',uni:'Dragon Ball'},spy:{name:'Vegeta',uni:'Dragon Ball'}},
  {ally:{name:'Gotenks',uni:'Dragon Ball'},spy:{name:'Gohan',uni:'Dragon Ball'}},
  {ally:{name:'Vegeto',uni:'Dragon Ball'},spy:{name:'Goku',uni:'Dragon Ball'}},
  {ally:{name:'Gogeta',uni:'Dragon Ball'},spy:{name:'Vegeto',uni:'Dragon Ball'}},
  {ally:{name:'Bardock',uni:'Dragon Ball'},spy:{name:'Goku',uni:'Dragon Ball'}},
  {ally:{name:'Whis',uni:'Dragon Ball'},spy:{name:'Beerus',uni:'Dragon Ball'}},
  {ally:{name:'Beerus',uni:'Dragon Ball'},spy:{name:'Whis',uni:'Dragon Ball'}},
  {ally:{name:'Hit',uni:'Dragon Ball'},spy:{name:'Goku',uni:'Dragon Ball'}},
  {ally:{name:'Jiren',uni:'Dragon Ball'},spy:{name:'Goku',uni:'Dragon Ball'}},
  {ally:{name:'Toppo',uni:'Dragon Ball'},spy:{name:'Jiren',uni:'Dragon Ball'}},
  {ally:{name:'Cabba',uni:'Dragon Ball'},spy:{name:'Vegeta',uni:'Dragon Ball'}},
  {ally:{name:'Kale',uni:'Dragon Ball'},spy:{name:'Broly',uni:'Dragon Ball'}},
  {ally:{name:'Caulifla',uni:'Dragon Ball'},spy:{name:'Kale',uni:'Dragon Ball'}},
  {ally:{name:'Zamasu',uni:'Dragon Ball'},spy:{name:'Goku Black',uni:'Dragon Ball'}},
  {ally:{name:'Goku Black',uni:'Dragon Ball'},spy:{name:'Zamasu',uni:'Dragon Ball'}},
  {ally:{name:'Cooler',uni:'Dragon Ball'},spy:{name:'Freezer',uni:'Dragon Ball'}},
  {ally:{name:'Android 17',uni:'Dragon Ball'},spy:{name:'Android 18',uni:'Dragon Ball'}},
  {ally:{name:'Android 18',uni:'Dragon Ball'},spy:{name:'Android 17',uni:'Dragon Ball'}},
  {ally:{name:'Janemba',uni:'Dragon Ball'},spy:{name:'Boo',uni:'Dragon Ball'}},
  {ally:{name:'Paragus',uni:'Dragon Ball'},spy:{name:'Broly',uni:'Dragon Ball'}},
  {ally:{name:'Golden Freezer',uni:'Dragon Ball'},spy:{name:'Freezer',uni:'Dragon Ball'}},
  {ally:{name:'Ultra Instinct Goku',uni:'Dragon Ball'},spy:{name:'Goku',uni:'Dragon Ball'}},
  {ally:{name:'Super Vegeta',uni:'Dragon Ball'},spy:{name:'Vegeta',uni:'Dragon Ball'}},
  {ally:{name:'Kami',uni:'Dragon Ball'},spy:{name:'Piccolo',uni:'Dragon Ball'}},
  // ===================== ONE PIECE (40) =====================
  {ally:{name:'Luffy',uni:'One Piece'},spy:{name:'Naruto',uni:'Naruto'}},
  {ally:{name:'Zoro',uni:'One Piece'},spy:{name:'Sanji',uni:'One Piece'}},
  {ally:{name:'Sanji',uni:'One Piece'},spy:{name:'Zoro',uni:'One Piece'}},
  {ally:{name:'Nami',uni:'One Piece'},spy:{name:'Robin',uni:'One Piece'}},
  {ally:{name:'Robin',uni:'One Piece'},spy:{name:'Nami',uni:'One Piece'}},
  {ally:{name:'Shanks',uni:'One Piece'},spy:{name:'Luffy',uni:'One Piece'}},
  {ally:{name:'Ace',uni:'One Piece'},spy:{name:'Luffy',uni:'One Piece'}},
  {ally:{name:'Barbe Blanche',uni:'One Piece'},spy:{name:'Shanks',uni:'One Piece'}},
  {ally:{name:'Trafalgar Law',uni:'One Piece'},spy:{name:'Zoro',uni:'One Piece'}},
  {ally:{name:'Kaido',uni:'One Piece'},spy:{name:'Barbe Blanche',uni:'One Piece'}},
  {ally:{name:'Boa Hancock',uni:'One Piece'},spy:{name:'Nami',uni:'One Piece'}},
  {ally:{name:'Usopp',uni:'One Piece'},spy:{name:'Nami',uni:'One Piece'}},
  {ally:{name:'Chopper',uni:'One Piece'},spy:{name:'Usopp',uni:'One Piece'}},
  {ally:{name:'Brook',uni:'One Piece'},spy:{name:'Zoro',uni:'One Piece'}},
  {ally:{name:'Franky',uni:'One Piece'},spy:{name:'Brook',uni:'One Piece'}},
  {ally:{name:'Jinbe',uni:'One Piece'},spy:{name:'Luffy',uni:'One Piece'}},
  {ally:{name:'Yamato',uni:'One Piece'},spy:{name:'Kaido',uni:'One Piece'}},
  {ally:{name:'Crocodile',uni:'One Piece'},spy:{name:'Kaido',uni:'One Piece'}},
  {ally:{name:'Doflamingo',uni:'One Piece'},spy:{name:'Crocodile',uni:'One Piece'}},
  {ally:{name:'Katakuri',uni:'One Piece'},spy:{name:'Doflamingo',uni:'One Piece'}},
  {ally:{name:'Rayleigh',uni:'One Piece'},spy:{name:'Shanks',uni:'One Piece'}},
  {ally:{name:'Mihawk',uni:'One Piece'},spy:{name:'Zoro',uni:'One Piece'}},
  {ally:{name:'Sabo',uni:'One Piece'},spy:{name:'Ace',uni:'One Piece'}},
  {ally:{name:'Marco',uni:'One Piece'},spy:{name:'Ace',uni:'One Piece'}},
  {ally:{name:'Garp',uni:'One Piece'},spy:{name:'Shanks',uni:'One Piece'}},
  {ally:{name:'Akainu',uni:'One Piece'},spy:{name:'Kaido',uni:'One Piece'}},
  {ally:{name:'Aokiji',uni:'One Piece'},spy:{name:'Akainu',uni:'One Piece'}},
  {ally:{name:'Kizaru',uni:'One Piece'},spy:{name:'Aokiji',uni:'One Piece'}},
  {ally:{name:'Big Mom',uni:'One Piece'},spy:{name:'Kaido',uni:'One Piece'}},
  {ally:{name:'Dragon',uni:'One Piece'},spy:{name:'Luffy',uni:'One Piece'}},
  {ally:{name:'Ivankov',uni:'One Piece'},spy:{name:'Dragon',uni:'One Piece'}},
  {ally:{name:'Coby',uni:'One Piece'},spy:{name:'Luffy',uni:'One Piece'}},
  {ally:{name:'Smoker',uni:'One Piece'},spy:{name:'Akainu',uni:'One Piece'}},
  {ally:{name:'Vivi',uni:'One Piece'},spy:{name:'Nami',uni:'One Piece'}},
  {ally:{name:'Perona',uni:'One Piece'},spy:{name:'Robin',uni:'One Piece'}},
  {ally:{name:'Carrot',uni:'One Piece'},spy:{name:'Nami',uni:'One Piece'}},
  {ally:{name:'Koby',uni:'One Piece'},spy:{name:'Luffy',uni:'One Piece'}},
  {ally:{name:'Shanks Junior',uni:'One Piece'},spy:{name:'Shanks',uni:'One Piece'}},
  {ally:{name:'Lucci',uni:'One Piece'},spy:{name:'Crocodile',uni:'One Piece'}},
  {ally:{name:'Blackbeard',uni:'One Piece'},spy:{name:'Shanks',uni:'One Piece'}},
  // ===================== POKEMON (35) =====================
  {ally:{name:'Pikachu',uni:'Pokémon'},spy:{name:'Raichu',uni:'Pokémon'}},
  {ally:{name:'Dracaufeu',uni:'Pokémon'},spy:{name:'Salamèche',uni:'Pokémon'}},
  {ally:{name:'Mewtwo',uni:'Pokémon'},spy:{name:'Mew',uni:'Pokémon'}},
  {ally:{name:'Dracolosse',uni:'Pokémon'},spy:{name:'Dracaufeu',uni:'Pokémon'}},
  {ally:{name:'Evoli',uni:'Pokémon'},spy:{name:'Pikachu',uni:'Pokémon'}},
  {ally:{name:'Darkrai',uni:'Pokémon'},spy:{name:'Mewtwo',uni:'Pokémon'}},
  {ally:{name:'Lucario',uni:'Pokémon'},spy:{name:'Riolu',uni:'Pokémon'}},
  {ally:{name:'Lokhlass',uni:'Pokémon'},spy:{name:'Pikachu',uni:'Pokémon'}},
  {ally:{name:'Dracovolt',uni:'Pokémon'},spy:{name:'Dracaufeu',uni:'Pokémon'}},
  {ally:{name:'Sorcilège',uni:'Pokémon'},spy:{name:'Evoli',uni:'Pokémon'}},
  {ally:{name:'Méga Rayquaza',uni:'Pokémon'},spy:{name:'Dracolosse',uni:'Pokémon'}},
  {ally:{name:'Reshiram',uni:'Pokémon'},spy:{name:'Zekrom',uni:'Pokémon'}},
  {ally:{name:'Zekrom',uni:'Pokémon'},spy:{name:'Reshiram',uni:'Pokémon'}},
  {ally:{name:'Kyogre',uni:'Pokémon'},spy:{name:'Groudon',uni:'Pokémon'}},
  {ally:{name:'Groudon',uni:'Pokémon'},spy:{name:'Kyogre',uni:'Pokémon'}},
  {ally:{name:'Ho-Oh',uni:'Pokémon'},spy:{name:'Lugia',uni:'Pokémon'}},
  {ally:{name:'Lugia',uni:'Pokémon'},spy:{name:'Ho-Oh',uni:'Pokémon'}},
  {ally:{name:'Dialga',uni:'Pokémon'},spy:{name:'Palkia',uni:'Pokémon'}},
  {ally:{name:'Giratina',uni:'Pokémon'},spy:{name:'Darkrai',uni:'Pokémon'}},
  {ally:{name:'Arceus',uni:'Pokémon'},spy:{name:'Mewtwo',uni:'Pokémon'}},
  {ally:{name:'Ditto',uni:'Pokémon'},spy:{name:'Mewtwo',uni:'Pokémon'}},
  {ally:{name:'Gengar',uni:'Pokémon'},spy:{name:'Darkrai',uni:'Pokémon'}},
  {ally:{name:'Mackogneur',uni:'Pokémon'},spy:{name:'Lucario',uni:'Pokémon'}},
  {ally:{name:'Tyranocif',uni:'Pokémon'},spy:{name:'Dracolosse',uni:'Pokémon'}},
  {ally:{name:'Ectoplasma',uni:'Pokémon'},spy:{name:'Gengar',uni:'Pokémon'}},
  {ally:{name:'Électhor',uni:'Pokémon'},spy:{name:'Raichu',uni:'Pokémon'}},
  {ally:{name:'Léviator',uni:'Pokémon'},spy:{name:'Lokhlass',uni:'Pokémon'}},
  {ally:{name:'Drattak',uni:'Pokémon'},spy:{name:'Dracolosse',uni:'Pokémon'}},
  {ally:{name:'Noctali',uni:'Pokémon'},spy:{name:'Evoli',uni:'Pokémon'}},
  {ally:{name:'Espeon',uni:'Pokémon'},spy:{name:'Noctali',uni:'Pokémon'}},
  {ally:{name:'Umbreon',uni:'Pokémon'},spy:{name:'Noctali',uni:'Pokémon'}},
  {ally:{name:'Sulfura',uni:'Pokémon'},spy:{name:'Ho-Oh',uni:'Pokémon'}},
  {ally:{name:'Artikodin',uni:'Pokémon'},spy:{name:'Lugia',uni:'Pokémon'}},
  {ally:{name:'Mélodie',uni:'Pokémon'},spy:{name:'Mew',uni:'Pokémon'}},
  {ally:{name:'Togekiss',uni:'Pokémon'},spy:{name:'Mélodie',uni:'Pokémon'}},
  // ===================== ATTACK ON TITAN (30) =====================
  {ally:{name:'Eren',uni:'Attack on Titan'},spy:{name:'Armin',uni:'Attack on Titan'}},
  {ally:{name:'Levi',uni:'Attack on Titan'},spy:{name:'Mikasa',uni:'Attack on Titan'}},
  {ally:{name:'Mikasa',uni:'Attack on Titan'},spy:{name:'Levi',uni:'Attack on Titan'}},
  {ally:{name:'Armin',uni:'Attack on Titan'},spy:{name:'Eren',uni:'Attack on Titan'}},
  {ally:{name:'Hange',uni:'Attack on Titan'},spy:{name:'Levi',uni:'Attack on Titan'}},
  {ally:{name:'Erwin',uni:'Attack on Titan'},spy:{name:'Levi',uni:'Attack on Titan'}},
  {ally:{name:'Reiner',uni:'Attack on Titan'},spy:{name:'Eren',uni:'Attack on Titan'}},
  {ally:{name:'Annie',uni:'Attack on Titan'},spy:{name:'Mikasa',uni:'Attack on Titan'}},
  {ally:{name:'Zeke',uni:'Attack on Titan'},spy:{name:'Eren',uni:'Attack on Titan'}},
  {ally:{name:'Historia',uni:'Attack on Titan'},spy:{name:'Mikasa',uni:'Attack on Titan'}},
  {ally:{name:'Connie',uni:'Attack on Titan'},spy:{name:'Armin',uni:'Attack on Titan'}},
  {ally:{name:'Sasha',uni:'Attack on Titan'},spy:{name:'Connie',uni:'Attack on Titan'}},
  {ally:{name:'Bertholdt',uni:'Attack on Titan'},spy:{name:'Reiner',uni:'Attack on Titan'}},
  {ally:{name:'Jean',uni:'Attack on Titan'},spy:{name:'Armin',uni:'Attack on Titan'}},
  {ally:{name:'Floch',uni:'Attack on Titan'},spy:{name:'Eren',uni:'Attack on Titan'}},
  {ally:{name:'Pieck',uni:'Attack on Titan'},spy:{name:'Reiner',uni:'Attack on Titan'}},
  {ally:{name:'Porco',uni:'Attack on Titan'},spy:{name:'Reiner',uni:'Attack on Titan'}},
  {ally:{name:'Falco',uni:'Attack on Titan'},spy:{name:'Armin',uni:'Attack on Titan'}},
  {ally:{name:'Gabi',uni:'Attack on Titan'},spy:{name:'Annie',uni:'Attack on Titan'}},
  {ally:{name:'Yelena',uni:'Attack on Titan'},spy:{name:'Zeke',uni:'Attack on Titan'}},
  {ally:{name:'Onyankopon',uni:'Attack on Titan'},spy:{name:'Armin',uni:'Attack on Titan'}},
  {ally:{name:'Moblit',uni:'Attack on Titan'},spy:{name:'Hange',uni:'Attack on Titan'}},
  {ally:{name:'Nile',uni:'Attack on Titan'},spy:{name:'Erwin',uni:'Attack on Titan'}},
  {ally:{name:'Pixis',uni:'Attack on Titan'},spy:{name:'Erwin',uni:'Attack on Titan'}},
  {ally:{name:'Rod Reiss',uni:'Attack on Titan'},spy:{name:'Historia',uni:'Attack on Titan'}},
  {ally:{name:'Kenny',uni:'Attack on Titan'},spy:{name:'Levi',uni:'Attack on Titan'}},
  {ally:{name:'Grisha',uni:'Attack on Titan'},spy:{name:'Eren',uni:'Attack on Titan'}},
  {ally:{name:'Carla',uni:'Attack on Titan'},spy:{name:'Eren',uni:'Attack on Titan'}},
  {ally:{name:'Ymir',uni:'Attack on Titan'},spy:{name:'Historia',uni:'Attack on Titan'}},
  {ally:{name:'Uri Reiss',uni:'Attack on Titan'},spy:{name:'Erwin',uni:'Attack on Titan'}},
  // ===================== DEMON SLAYER (30) =====================
  {ally:{name:'Tanjiro',uni:'Demon Slayer'},spy:{name:'Zenitsu',uni:'Demon Slayer'}},
  {ally:{name:'Nezuko',uni:'Demon Slayer'},spy:{name:'Tanjiro',uni:'Demon Slayer'}},
  {ally:{name:'Zenitsu',uni:'Demon Slayer'},spy:{name:'Inosuke',uni:'Demon Slayer'}},
  {ally:{name:'Inosuke',uni:'Demon Slayer'},spy:{name:'Tanjiro',uni:'Demon Slayer'}},
  {ally:{name:'Rengoku',uni:'Demon Slayer'},spy:{name:'Tanjiro',uni:'Demon Slayer'}},
  {ally:{name:'Tengen',uni:'Demon Slayer'},spy:{name:'Rengoku',uni:'Demon Slayer'}},
  {ally:{name:'Muzan',uni:'Demon Slayer'},spy:{name:'Akaza',uni:'Demon Slayer'}},
  {ally:{name:'Akaza',uni:'Demon Slayer'},spy:{name:'Muzan',uni:'Demon Slayer'}},
  {ally:{name:'Shinobu',uni:'Demon Slayer'},spy:{name:'Kanao',uni:'Demon Slayer'}},
  {ally:{name:'Kanao',uni:'Demon Slayer'},spy:{name:'Shinobu',uni:'Demon Slayer'}},
  {ally:{name:'Genya',uni:'Demon Slayer'},spy:{name:'Inosuke',uni:'Demon Slayer'}},
  {ally:{name:'Mitsuri',uni:'Demon Slayer'},spy:{name:'Shinobu',uni:'Demon Slayer'}},
  {ally:{name:'Obanai',uni:'Demon Slayer'},spy:{name:'Mitsuri',uni:'Demon Slayer'}},
  {ally:{name:'Muichiro',uni:'Demon Slayer'},spy:{name:'Tanjiro',uni:'Demon Slayer'}},
  {ally:{name:'Gyomei',uni:'Demon Slayer'},spy:{name:'Rengoku',uni:'Demon Slayer'}},
  {ally:{name:'Sanemi',uni:'Demon Slayer'},spy:{name:'Gyomei',uni:'Demon Slayer'}},
  {ally:{name:'Douma',uni:'Demon Slayer'},spy:{name:'Akaza',uni:'Demon Slayer'}},
  {ally:{name:'Kokushibo',uni:'Demon Slayer'},spy:{name:'Muzan',uni:'Demon Slayer'}},
  {ally:{name:'Gyutaro',uni:'Demon Slayer'},spy:{name:'Akaza',uni:'Demon Slayer'}},
  {ally:{name:'Daki',uni:'Demon Slayer'},spy:{name:'Gyutaro',uni:'Demon Slayer'}},
  {ally:{name:'Hantengu',uni:'Demon Slayer'},spy:{name:'Kokushibo',uni:'Demon Slayer'}},
  {ally:{name:'Gyokko',uni:'Demon Slayer'},spy:{name:'Hantengu',uni:'Demon Slayer'}},
  {ally:{name:'Yoriichi',uni:'Demon Slayer'},spy:{name:'Kokushibo',uni:'Demon Slayer'}},
  {ally:{name:'Sakonji',uni:'Demon Slayer'},spy:{name:'Tanjiro',uni:'Demon Slayer'}},
  {ally:{name:'Aoi',uni:'Demon Slayer'},spy:{name:'Kanao',uni:'Demon Slayer'}},
  {ally:{name:'Makomo',uni:'Demon Slayer'},spy:{name:'Kanao',uni:'Demon Slayer'}},
  {ally:{name:'Sabito',uni:'Demon Slayer'},spy:{name:'Tanjiro',uni:'Demon Slayer'}},
  {ally:{name:'Susamaru',uni:'Demon Slayer'},spy:{name:'Nezuko',uni:'Demon Slayer'}},
  {ally:{name:'Yahaba',uni:'Demon Slayer'},spy:{name:'Susamaru',uni:'Demon Slayer'}},
  {ally:{name:'Kaigaku',uni:'Demon Slayer'},spy:{name:'Zenitsu',uni:'Demon Slayer'}},
  // ===================== FAIRY TAIL (30) =====================
  {ally:{name:'Natsu',uni:'Fairy Tail'},spy:{name:'Gray',uni:'Fairy Tail'}},
  {ally:{name:'Lucy',uni:'Fairy Tail'},spy:{name:'Erza',uni:'Fairy Tail'}},
  {ally:{name:'Erza',uni:'Fairy Tail'},spy:{name:'Lucy',uni:'Fairy Tail'}},
  {ally:{name:'Gray',uni:'Fairy Tail'},spy:{name:'Natsu',uni:'Fairy Tail'}},
  {ally:{name:'Makarov',uni:'Fairy Tail'},spy:{name:'Natsu',uni:'Fairy Tail'}},
  {ally:{name:'Gildarts',uni:'Fairy Tail'},spy:{name:'Natsu',uni:'Fairy Tail'}},
  {ally:{name:'Laxus',uni:'Fairy Tail'},spy:{name:'Gildarts',uni:'Fairy Tail'}},
  {ally:{name:'Zeref',uni:'Fairy Tail'},spy:{name:'Natsu',uni:'Fairy Tail'}},
  {ally:{name:'Acnologia',uni:'Fairy Tail'},spy:{name:'Zeref',uni:'Fairy Tail'}},
  {ally:{name:'Wendy',uni:'Fairy Tail'},spy:{name:'Lucy',uni:'Fairy Tail'}},
  {ally:{name:'Jellal',uni:'Fairy Tail'},spy:{name:'Erza',uni:'Fairy Tail'}},
  {ally:{name:'Mirajane',uni:'Fairy Tail'},spy:{name:'Erza',uni:'Fairy Tail'}},
  {ally:{name:'Mystogan',uni:'Fairy Tail'},spy:{name:'Laxus',uni:'Fairy Tail'}},
  {ally:{name:'Elfman',uni:'Fairy Tail'},spy:{name:'Gray',uni:'Fairy Tail'}},
  {ally:{name:'Cana',uni:'Fairy Tail'},spy:{name:'Lucy',uni:'Fairy Tail'}},
  {ally:{name:'Gajeel',uni:'Fairy Tail'},spy:{name:'Natsu',uni:'Fairy Tail'}},
  {ally:{name:'Panther Lily',uni:'Fairy Tail'},spy:{name:'Gajeel',uni:'Fairy Tail'}},
  {ally:{name:'Levy',uni:'Fairy Tail'},spy:{name:'Lucy',uni:'Fairy Tail'}},
  {ally:{name:'Happy',uni:'Fairy Tail'},spy:{name:'Natsu',uni:'Fairy Tail'}},
  {ally:{name:'Lisanna',uni:'Fairy Tail'},spy:{name:'Mirajane',uni:'Fairy Tail'}},
  {ally:{name:'Ultear',uni:'Fairy Tail'},spy:{name:'Jellal',uni:'Fairy Tail'}},
  {ally:{name:'Meredy',uni:'Fairy Tail'},spy:{name:'Ultear',uni:'Fairy Tail'}},
  {ally:{name:'Kagura',uni:'Fairy Tail'},spy:{name:'Erza',uni:'Fairy Tail'}},
  {ally:{name:'Minerva',uni:'Fairy Tail'},spy:{name:'Erza',uni:'Fairy Tail'}},
  {ally:{name:'Rogue',uni:'Fairy Tail'},spy:{name:'Sting',uni:'Fairy Tail'}},
  {ally:{name:'Sting',uni:'Fairy Tail'},spy:{name:'Natsu',uni:'Fairy Tail'}},
  {ally:{name:'Brandish',uni:'Fairy Tail'},spy:{name:'Erza',uni:'Fairy Tail'}},
  {ally:{name:'August',uni:'Fairy Tail'},spy:{name:'Zeref',uni:'Fairy Tail'}},
  {ally:{name:'Irene',uni:'Fairy Tail'},spy:{name:'Erza',uni:'Fairy Tail'}},
  {ally:{name:'Dimaria',uni:'Fairy Tail'},spy:{name:'Minerva',uni:'Fairy Tail'}},
  // ===================== BLEACH (30) =====================
  {ally:{name:'Ichigo',uni:'Bleach'},spy:{name:'Rukia',uni:'Bleach'}},
  {ally:{name:'Rukia',uni:'Bleach'},spy:{name:'Ichigo',uni:'Bleach'}},
  {ally:{name:'Aizen',uni:'Bleach'},spy:{name:'Ichigo',uni:'Bleach'}},
  {ally:{name:'Byakuya',uni:'Bleach'},spy:{name:'Ichigo',uni:'Bleach'}},
  {ally:{name:'Zaraki',uni:'Bleach'},spy:{name:'Ichigo',uni:'Bleach'}},
  {ally:{name:'Renji',uni:'Bleach'},spy:{name:'Ichigo',uni:'Bleach'}},
  {ally:{name:'Orihime',uni:'Bleach'},spy:{name:'Rukia',uni:'Bleach'}},
  {ally:{name:'Uryu',uni:'Bleach'},spy:{name:'Ichigo',uni:'Bleach'}},
  {ally:{name:'Urahara',uni:'Bleach'},spy:{name:'Aizen',uni:'Bleach'}},
  {ally:{name:'Yoruichi',uni:'Bleach'},spy:{name:'Urahara',uni:'Bleach'}},
  {ally:{name:'Yhwach',uni:'Bleach'},spy:{name:'Aizen',uni:'Bleach'}},
  {ally:{name:'Grimmjow',uni:'Bleach'},spy:{name:'Aizen',uni:'Bleach'}},
  {ally:{name:'Ulquiorra',uni:'Bleach'},spy:{name:'Aizen',uni:'Bleach'}},
  {ally:{name:'Toshiro',uni:'Bleach'},spy:{name:'Byakuya',uni:'Bleach'}},
  {ally:{name:'Shunsui',uni:'Bleach'},spy:{name:'Urahara',uni:'Bleach'}},
  {ally:{name:'Chad',uni:'Bleach'},spy:{name:'Ichigo',uni:'Bleach'}},
  {ally:{name:'Isshin',uni:'Bleach'},spy:{name:'Ichigo',uni:'Bleach'}},
  {ally:{name:'Unohana',uni:'Bleach'},spy:{name:'Zaraki',uni:'Bleach'}},
  {ally:{name:'Komamura',uni:'Bleach'},spy:{name:'Byakuya',uni:'Bleach'}},
  {ally:{name:'Shinji',uni:'Bleach'},spy:{name:'Ichigo',uni:'Bleach'}},
  {ally:{name:'Gin',uni:'Bleach'},spy:{name:'Aizen',uni:'Bleach'}},
  {ally:{name:'Kaname',uni:'Bleach'},spy:{name:'Aizen',uni:'Bleach'}},
  {ally:{name:'Nnoitora',uni:'Bleach'},spy:{name:'Grimmjow',uni:'Bleach'}},
  {ally:{name:'Starrk',uni:'Bleach'},spy:{name:'Ulquiorra',uni:'Bleach'}},
  {ally:{name:'Barragan',uni:'Bleach'},spy:{name:'Starrk',uni:'Bleach'}},
  {ally:{name:'Halibel',uni:'Bleach'},spy:{name:'Orihime',uni:'Bleach'}},
  {ally:{name:'Nelliel',uni:'Bleach'},spy:{name:'Orihime',uni:'Bleach'}},
  {ally:{name:'Mask',uni:'Bleach'},spy:{name:'Yhwach',uni:'Bleach'}},
  {ally:{name:'Bazz-B',uni:'Bleach'},spy:{name:'Yhwach',uni:'Bleach'}},
  {ally:{name:'Askin',uni:'Bleach'},spy:{name:'Yhwach',uni:'Bleach'}},
  // ===================== ONE PUNCH MAN (30) =====================
  {ally:{name:'Saitama',uni:'One Punch Man'},spy:{name:'Genos',uni:'One Punch Man'}},
  {ally:{name:'Genos',uni:'One Punch Man'},spy:{name:'Saitama',uni:'One Punch Man'}},
  {ally:{name:'Garou',uni:'One Punch Man'},spy:{name:'Saitama',uni:'One Punch Man'}},
  {ally:{name:'Bang',uni:'One Punch Man'},spy:{name:'Saitama',uni:'One Punch Man'}},
  {ally:{name:'Tornado',uni:'One Punch Man'},spy:{name:'Saitama',uni:'One Punch Man'}},
  {ally:{name:'Metal Bat',uni:'One Punch Man'},spy:{name:'Garou',uni:'One Punch Man'}},
  {ally:{name:'King',uni:'One Punch Man'},spy:{name:'Saitama',uni:'One Punch Man'}},
  {ally:{name:'Flashy Flash',uni:'One Punch Man'},spy:{name:'Garou',uni:'One Punch Man'}},
  {ally:{name:'Boros',uni:'One Punch Man'},spy:{name:'Garou',uni:'One Punch Man'}},
  {ally:{name:'Zombieman',uni:'One Punch Man'},spy:{name:'Saitama',uni:'One Punch Man'}},
  {ally:{name:'Atomic Samurai',uni:'One Punch Man'},spy:{name:'Bang',uni:'One Punch Man'}},
  {ally:{name:'Child Emperor',uni:'One Punch Man'},spy:{name:'Genos',uni:'One Punch Man'}},
  {ally:{name:'Drive Knight',uni:'One Punch Man'},spy:{name:'Genos',uni:'One Punch Man'}},
  {ally:{name:'Pig God',uni:'One Punch Man'},spy:{name:'King',uni:'One Punch Man'}},
  {ally:{name:'Superalloy',uni:'One Punch Man'},spy:{name:'Bang',uni:'One Punch Man'}},
  {ally:{name:'Tank Top Master',uni:'One Punch Man'},spy:{name:'Metal Bat',uni:'One Punch Man'}},
  {ally:{name:'Puri Puri',uni:'One Punch Man'},spy:{name:'Saitama',uni:'One Punch Man'}},
  {ally:{name:'Metal Knight',uni:'One Punch Man'},spy:{name:'Genos',uni:'One Punch Man'}},
  {ally:{name:'Amai Mask',uni:'One Punch Man'},spy:{name:'Saitama',uni:'One Punch Man'}},
  {ally:{name:'Speed-o-Sound Sonic',uni:'One Punch Man'},spy:{name:'Garou',uni:'One Punch Man'}},
  {ally:{name:'Fubuki',uni:'One Punch Man'},spy:{name:'Tornado',uni:'One Punch Man'}},
  {ally:{name:'Mumen Rider',uni:'One Punch Man'},spy:{name:'Saitama',uni:'One Punch Man'}},
  {ally:{name:'Darkshine',uni:'One Punch Man'},spy:{name:'Saitama',uni:'One Punch Man'}},
  {ally:{name:'Homeless Emperor',uni:'One Punch Man'},spy:{name:'Boros',uni:'One Punch Man'}},
  {ally:{name:'Psykos',uni:'One Punch Man'},spy:{name:'Tornado',uni:'One Punch Man'}},
  {ally:{name:'Orochi',uni:'One Punch Man'},spy:{name:'Boros',uni:'One Punch Man'}},
  {ally:{name:'Gouketsu',uni:'One Punch Man'},spy:{name:'Garou',uni:'One Punch Man'}},
  {ally:{name:'Carnage Kabuto',uni:'One Punch Man'},spy:{name:'Boros',uni:'One Punch Man'}},
  {ally:{name:'Black Sperm',uni:'One Punch Man'},spy:{name:'Orochi',uni:'One Punch Man'}},
  {ally:{name:'Evil Natural Water',uni:'One Punch Man'},spy:{name:'Orochi',uni:'One Punch Man'}},
  // ===================== BLACK CLOVER (30) =====================
  {ally:{name:'Asta',uni:'Black Clover'},spy:{name:'Yuno',uni:'Black Clover'}},
  {ally:{name:'Yuno',uni:'Black Clover'},spy:{name:'Asta',uni:'Black Clover'}},
  {ally:{name:'Yami',uni:'Black Clover'},spy:{name:'Asta',uni:'Black Clover'}},
  {ally:{name:'Noelle',uni:'Black Clover'},spy:{name:'Asta',uni:'Black Clover'}},
  {ally:{name:'Julius',uni:'Black Clover'},spy:{name:'Yami',uni:'Black Clover'}},
  {ally:{name:'Luck',uni:'Black Clover'},spy:{name:'Asta',uni:'Black Clover'}},
  {ally:{name:'Magna',uni:'Black Clover'},spy:{name:'Luck',uni:'Black Clover'}},
  {ally:{name:'Mereoleona',uni:'Black Clover'},spy:{name:'Yami',uni:'Black Clover'}},
  {ally:{name:'Zagred',uni:'Black Clover'},spy:{name:'Yuno',uni:'Black Clover'}},
  {ally:{name:'Zenon',uni:'Black Clover'},spy:{name:'Zagred',uni:'Black Clover'}},
  {ally:{name:'Finral',uni:'Black Clover'},spy:{name:'Yuno',uni:'Black Clover'}},
  {ally:{name:'Secre',uni:'Black Clover'},spy:{name:'Noelle',uni:'Black Clover'}},
  {ally:{name:'Gordon',uni:'Black Clover'},spy:{name:'Magna',uni:'Black Clover'}},
  {ally:{name:'Gauche',uni:'Black Clover'},spy:{name:'Luck',uni:'Black Clover'}},
  {ally:{name:'Grey',uni:'Black Clover'},spy:{name:'Noelle',uni:'Black Clover'}},
  {ally:{name:'Zora',uni:'Black Clover'},spy:{name:'Asta',uni:'Black Clover'}},
  {ally:{name:'Henry',uni:'Black Clover'},spy:{name:'Yami',uni:'Black Clover'}},
  {ally:{name:'Sol',uni:'Black Clover'},spy:{name:'Noelle',uni:'Black Clover'}},
  {ally:{name:'Mimosa',uni:'Black Clover'},spy:{name:'Noelle',uni:'Black Clover'}},
  {ally:{name:'Leopold',uni:'Black Clover'},spy:{name:'Yuno',uni:'Black Clover'}},
  {ally:{name:'Rill',uni:'Black Clover'},spy:{name:'Yuno',uni:'Black Clover'}},
  {ally:{name:'Charlotte',uni:'Black Clover'},spy:{name:'Mereoleona',uni:'Black Clover'}},
  {ally:{name:'Vanessa',uni:'Black Clover'},spy:{name:'Noelle',uni:'Black Clover'}},
  {ally:{name:'Dante',uni:'Black Clover'},spy:{name:'Zenon',uni:'Black Clover'}},
  {ally:{name:'Vanica',uni:'Black Clover'},spy:{name:'Dante',uni:'Black Clover'}},
  {ally:{name:'Moris',uni:'Black Clover'},spy:{name:'Dante',uni:'Black Clover'}},
  {ally:{name:'Lumiere',uni:'Black Clover'},spy:{name:'Julius',uni:'Black Clover'}},
  {ally:{name:'Licht',uni:'Black Clover'},spy:{name:'Lumiere',uni:'Black Clover'}},
  {ally:{name:'Liebe',uni:'Black Clover'},spy:{name:'Asta',uni:'Black Clover'}},
  {ally:{name:'Lucius',uni:'Black Clover'},spy:{name:'Julius',uni:'Black Clover'}},
  // ===================== FIRE FORCE (30) =====================
  {ally:{name:'Shinra',uni:'Fire Force'},spy:{name:'Arthur',uni:'Fire Force'}},
  {ally:{name:'Arthur',uni:'Fire Force'},spy:{name:'Shinra',uni:'Fire Force'}},
  {ally:{name:'Tamaki',uni:'Fire Force'},spy:{name:'Shinra',uni:'Fire Force'}},
  {ally:{name:'Obi',uni:'Fire Force'},spy:{name:'Shinra',uni:'Fire Force'}},
  {ally:{name:'Maki',uni:'Fire Force'},spy:{name:'Tamaki',uni:'Fire Force'}},
  {ally:{name:'Burns',uni:'Fire Force'},spy:{name:'Obi',uni:'Fire Force'}},
  {ally:{name:'Joker',uni:'Fire Force'},spy:{name:'Burns',uni:'Fire Force'}},
  {ally:{name:'Sho',uni:'Fire Force'},spy:{name:'Shinra',uni:'Fire Force'}},
  {ally:{name:'Benimaru',uni:'Fire Force'},spy:{name:'Burns',uni:'Fire Force'}},
  {ally:{name:'Viktor',uni:'Fire Force'},spy:{name:'Joker',uni:'Fire Force'}},
  {ally:{name:'Nataku',uni:'Fire Force'},spy:{name:'Shinra',uni:'Fire Force'}},
  {ally:{name:'Hibachi',uni:'Fire Force'},spy:{name:'Obi',uni:'Fire Force'}},
  {ally:{name:'Rekka',uni:'Fire Force'},spy:{name:'Burns',uni:'Fire Force'}},
  {ally:{name:'Flail',uni:'Fire Force'},spy:{name:'Arthur',uni:'Fire Force'}},
  {ally:{name:'Arrow',uni:'Fire Force'},spy:{name:'Tamaki',uni:'Fire Force'}},
  {ally:{name:'Haumea',uni:'Fire Force'},spy:{name:'Shinra',uni:'Fire Force'}},
  {ally:{name:'Inca',uni:'Fire Force'},spy:{name:'Tamaki',uni:'Fire Force'}},
  {ally:{name:'Kurono',uni:'Fire Force'},spy:{name:'Benimaru',uni:'Fire Force'}},
  {ally:{name:'Konro',uni:'Fire Force'},spy:{name:'Benimaru',uni:'Fire Force'}},
  {ally:{name:'Karim',uni:'Fire Force'},spy:{name:'Arthur',uni:'Fire Force'}},
  {ally:{name:'Foien',uni:'Fire Force'},spy:{name:'Obi',uni:'Fire Force'}},
  {ally:{name:'Vulcan',uni:'Fire Force'},spy:{name:'Viktor',uni:'Fire Force'}},
  {ally:{name:'Lisa',uni:'Fire Force'},spy:{name:'Maki',uni:'Fire Force'}},
  {ally:{name:'Pan',uni:'Fire Force'},spy:{name:'Tamaki',uni:'Fire Force'}},
  {ally:{name:'Giovanni',uni:'Fire Force'},spy:{name:'Viktor',uni:'Fire Force'}},
  {ally:{name:'Ritsu',uni:'Fire Force'},spy:{name:'Haumea',uni:'Fire Force'}},
  {ally:{name:'Hajiki',uni:'Fire Force'},spy:{name:'Arthur',uni:'Fire Force'}},
  {ally:{name:'Feeler',uni:'Fire Force'},spy:{name:'Shinra',uni:'Fire Force'}},
  {ally:{name:'Tempe',uni:'Fire Force'},spy:{name:'Sho',uni:'Fire Force'}},
  {ally:{name:'Charon',uni:'Fire Force'},spy:{name:'Burns',uni:'Fire Force'}},
  // ===================== JJK (30) =====================
  {ally:{name:'Itadori',uni:'Jujutsu Kaisen'},spy:{name:'Megumi',uni:'Jujutsu Kaisen'}},
  {ally:{name:'Gojo',uni:'Jujutsu Kaisen'},spy:{name:'Itadori',uni:'Jujutsu Kaisen'}},
  {ally:{name:'Sukuna',uni:'Jujutsu Kaisen'},spy:{name:'Gojo',uni:'Jujutsu Kaisen'}},
  {ally:{name:'Nobara',uni:'Jujutsu Kaisen'},spy:{name:'Itadori',uni:'Jujutsu Kaisen'}},
  {ally:{name:'Nanami',uni:'Jujutsu Kaisen'},spy:{name:'Gojo',uni:'Jujutsu Kaisen'}},
  {ally:{name:'Yuta',uni:'Jujutsu Kaisen'},spy:{name:'Gojo',uni:'Jujutsu Kaisen'}},
  {ally:{name:'Mahito',uni:'Jujutsu Kaisen'},spy:{name:'Sukuna',uni:'Jujutsu Kaisen'}},
  {ally:{name:'Hakari',uni:'Jujutsu Kaisen'},spy:{name:'Yuta',uni:'Jujutsu Kaisen'}},
  {ally:{name:'Choso',uni:'Jujutsu Kaisen'},spy:{name:'Itadori',uni:'Jujutsu Kaisen'}},
  {ally:{name:'Toge',uni:'Jujutsu Kaisen'},spy:{name:'Megumi',uni:'Jujutsu Kaisen'}},
  {ally:{name:'Panda',uni:'Jujutsu Kaisen'},spy:{name:'Toge',uni:'Jujutsu Kaisen'}},
  {ally:{name:'Maki',uni:'Jujutsu Kaisen'},spy:{name:'Nobara',uni:'Jujutsu Kaisen'}},
  {ally:{name:'Mai',uni:'Jujutsu Kaisen'},spy:{name:'Maki',uni:'Jujutsu Kaisen'}},
  {ally:{name:'Todo',uni:'Jujutsu Kaisen'},spy:{name:'Itadori',uni:'Jujutsu Kaisen'}},
  {ally:{name:'Mechamaru',uni:'Jujutsu Kaisen'},spy:{name:'Panda',uni:'Jujutsu Kaisen'}},
  {ally:{name:'Geto',uni:'Jujutsu Kaisen'},spy:{name:'Gojo',uni:'Jujutsu Kaisen'}},
  {ally:{name:'Uraume',uni:'Jujutsu Kaisen'},spy:{name:'Sukuna',uni:'Jujutsu Kaisen'}},
  {ally:{name:'Jogo',uni:'Jujutsu Kaisen'},spy:{name:'Mahito',uni:'Jujutsu Kaisen'}},
  {ally:{name:'Hanami',uni:'Jujutsu Kaisen'},spy:{name:'Jogo',uni:'Jujutsu Kaisen'}},
  {ally:{name:'Dagon',uni:'Jujutsu Kaisen'},spy:{name:'Hanami',uni:'Jujutsu Kaisen'}},
  {ally:{name:'Naoya',uni:'Jujutsu Kaisen'},spy:{name:'Megumi',uni:'Jujutsu Kaisen'}},
  {ally:{name:'Noritoshi',uni:'Jujutsu Kaisen'},spy:{name:'Choso',uni:'Jujutsu Kaisen'}},
  {ally:{name:'Suguru',uni:'Jujutsu Kaisen'},spy:{name:'Gojo',uni:'Jujutsu Kaisen'}},
  {ally:{name:'Tsumiki',uni:'Jujutsu Kaisen'},spy:{name:'Megumi',uni:'Jujutsu Kaisen'}},
  {ally:{name:'Yuki',uni:'Jujutsu Kaisen'},spy:{name:'Yuta',uni:'Jujutsu Kaisen'}},
  {ally:{name:'Tengen',uni:'Jujutsu Kaisen'},spy:{name:'Gojo',uni:'Jujutsu Kaisen'}},
  {ally:{name:'Kusakabe',uni:'Jujutsu Kaisen'},spy:{name:'Nanami',uni:'Jujutsu Kaisen'}},
  {ally:{name:'Ino',uni:'Jujutsu Kaisen'},spy:{name:'Nanami',uni:'Jujutsu Kaisen'}},
  {ally:{name:'Ijichi',uni:'Jujutsu Kaisen'},spy:{name:'Gojo',uni:'Jujutsu Kaisen'}},
  {ally:{name:'Kenjaku',uni:'Jujutsu Kaisen'},spy:{name:'Sukuna',uni:'Jujutsu Kaisen'}},
  // ===================== MHA (30) =====================
  {ally:{name:'Deku',uni:'My Hero Academia'},spy:{name:'Bakugo',uni:'My Hero Academia'}},
  {ally:{name:'Bakugo',uni:'My Hero Academia'},spy:{name:'Deku',uni:'My Hero Academia'}},
  {ally:{name:'Todoroki',uni:'My Hero Academia'},spy:{name:'Deku',uni:'My Hero Academia'}},
  {ally:{name:'All Might',uni:'My Hero Academia'},spy:{name:'Deku',uni:'My Hero Academia'}},
  {ally:{name:'Uraraka',uni:'My Hero Academia'},spy:{name:'Deku',uni:'My Hero Academia'}},
  {ally:{name:'Shigaraki',uni:'My Hero Academia'},spy:{name:'All For One',uni:'My Hero Academia'}},
  {ally:{name:'All For One',uni:'My Hero Academia'},spy:{name:'Shigaraki',uni:'My Hero Academia'}},
  {ally:{name:'Hawks',uni:'My Hero Academia'},spy:{name:'Todoroki',uni:'My Hero Academia'}},
  {ally:{name:'Endeavor',uni:'My Hero Academia'},spy:{name:'Todoroki',uni:'My Hero Academia'}},
  {ally:{name:'Iida',uni:'My Hero Academia'},spy:{name:'Deku',uni:'My Hero Academia'}},
  {ally:{name:'Tsuyu',uni:'My Hero Academia'},spy:{name:'Uraraka',uni:'My Hero Academia'}},
  {ally:{name:'Denki',uni:'My Hero Academia'},spy:{name:'Bakugo',uni:'My Hero Academia'}},
  {ally:{name:'Eijiro',uni:'My Hero Academia'},spy:{name:'Bakugo',uni:'My Hero Academia'}},
  {ally:{name:'Momo',uni:'My Hero Academia'},spy:{name:'Todoroki',uni:'My Hero Academia'}},
  {ally:{name:'Fumikage',uni:'My Hero Academia'},spy:{name:'Todoroki',uni:'My Hero Academia'}},
  {ally:{name:'Mineta',uni:'My Hero Academia'},spy:{name:'Deku',uni:'My Hero Academia'}},
  {ally:{name:'Ojiro',uni:'My Hero Academia'},spy:{name:'Deku',uni:'My Hero Academia'}},
  {ally:{name:'Sero',uni:'My Hero Academia'},spy:{name:'Iida',uni:'My Hero Academia'}},
  {ally:{name:'Twice',uni:'My Hero Academia'},spy:{name:'Shigaraki',uni:'My Hero Academia'}},
  {ally:{name:'Toga',uni:'My Hero Academia'},spy:{name:'Uraraka',uni:'My Hero Academia'}},
  {ally:{name:'Dabi',uni:'My Hero Academia'},spy:{name:'Todoroki',uni:'My Hero Academia'}},
  {ally:{name:'Compress',uni:'My Hero Academia'},spy:{name:'Shigaraki',uni:'My Hero Academia'}},
  {ally:{name:'Muscular',uni:'My Hero Academia'},spy:{name:'Dabi',uni:'My Hero Academia'}},
  {ally:{name:'Overhaul',uni:'My Hero Academia'},spy:{name:'Shigaraki',uni:'My Hero Academia'}},
  {ally:{name:'Gentle',uni:'My Hero Academia'},spy:{name:'Deku',uni:'My Hero Academia'}},
  {ally:{name:'Mirko',uni:'My Hero Academia'},spy:{name:'Hawks',uni:'My Hero Academia'}},
  {ally:{name:'Eraser Head',uni:'My Hero Academia'},spy:{name:'All Might',uni:'My Hero Academia'}},
  {ally:{name:'Present Mic',uni:'My Hero Academia'},spy:{name:'Eraser Head',uni:'My Hero Academia'}},
  {ally:{name:'Recovery Girl',uni:'My Hero Academia'},spy:{name:'All Might',uni:'My Hero Academia'}},
  {ally:{name:'Nezu',uni:'My Hero Academia'},spy:{name:'All Might',uni:'My Hero Academia'}},
  // ===================== SOLO LEVELING (30) =====================
  {ally:{name:'Sung Jinwoo',uni:'Solo Leveling'},spy:{name:'Igris',uni:'Solo Leveling'}},
  {ally:{name:'Igris',uni:'Solo Leveling'},spy:{name:'Sung Jinwoo',uni:'Solo Leveling'}},
  {ally:{name:'Cha Hae-In',uni:'Solo Leveling'},spy:{name:'Sung Jinwoo',uni:'Solo Leveling'}},
  {ally:{name:'Beru',uni:'Solo Leveling'},spy:{name:'Igris',uni:'Solo Leveling'}},
  {ally:{name:'Thomas Andre',uni:'Solo Leveling'},spy:{name:'Sung Jinwoo',uni:'Solo Leveling'}},
  {ally:{name:'Ashborn',uni:'Solo Leveling'},spy:{name:'Sung Jinwoo',uni:'Solo Leveling'}},
  {ally:{name:'Antares',uni:'Solo Leveling'},spy:{name:'Ashborn',uni:'Solo Leveling'}},
  {ally:{name:'Go Gunhee',uni:'Solo Leveling'},spy:{name:'Thomas Andre',uni:'Solo Leveling'}},
  {ally:{name:'Choi Jong-In',uni:'Solo Leveling'},spy:{name:'Thomas Andre',uni:'Solo Leveling'}},
  {ally:{name:'Baek Yoonho',uni:'Solo Leveling'},spy:{name:'Cha Hae-In',uni:'Solo Leveling'}},
  {ally:{name:'Min Byung-Gu',uni:'Solo Leveling'},spy:{name:'Sung Jinwoo',uni:'Solo Leveling'}},
  {ally:{name:'Sung Il-Hwan',uni:'Solo Leveling'},spy:{name:'Sung Jinwoo',uni:'Solo Leveling'}},
  {ally:{name:'Kamish',uni:'Solo Leveling'},spy:{name:'Beru',uni:'Solo Leveling'}},
  {ally:{name:'Kaisel',uni:'Solo Leveling'},spy:{name:'Igris',uni:'Solo Leveling'}},
  {ally:{name:'Bellion',uni:'Solo Leveling'},spy:{name:'Igris',uni:'Solo Leveling'}},
  {ally:{name:'Goto Ryuji',uni:'Solo Leveling'},spy:{name:'Thomas Andre',uni:'Solo Leveling'}},
  {ally:{name:'Jonas',uni:'Solo Leveling'},spy:{name:'Thomas Andre',uni:'Solo Leveling'}},
  {ally:{name:'Liu Zhigang',uni:'Solo Leveling'},spy:{name:'Thomas Andre',uni:'Solo Leveling'}},
  {ally:{name:'Yoo Myung-Han',uni:'Solo Leveling'},spy:{name:'Sung Jinwoo',uni:'Solo Leveling'}},
  {ally:{name:'Woo Jinchul',uni:'Solo Leveling'},spy:{name:'Sung Jinwoo',uni:'Solo Leveling'}},
  {ally:{name:'Cha Haein Mom',uni:'Solo Leveling'},spy:{name:'Cha Hae-In',uni:'Solo Leveling'}},
  {ally:{name:'Park Jongsoo',uni:'Solo Leveling'},spy:{name:'Sung Jinwoo',uni:'Solo Leveling'}},
  {ally:{name:'Hwang Dongsuk',uni:'Solo Leveling'},spy:{name:'Sung Jinwoo',uni:'Solo Leveling'}},
  {ally:{name:'Kang Taeshik',uni:'Solo Leveling'},spy:{name:'Sung Jinwoo',uni:'Solo Leveling'}},
  {ally:{name:'Song Chiyul',uni:'Solo Leveling'},spy:{name:'Woo Jinchul',uni:'Solo Leveling'}},
  {ally:{name:'Yoo Jinho',uni:'Solo Leveling'},spy:{name:'Sung Jinwoo',uni:'Solo Leveling'}},
  {ally:{name:'Kim Chul',uni:'Solo Leveling'},spy:{name:'Sung Jinwoo',uni:'Solo Leveling'}},
  {ally:{name:'Joh Kyunghoon',uni:'Solo Leveling'},spy:{name:'Woo Jinchul',uni:'Solo Leveling'}},
  {ally:{name:'Iron',uni:'Solo Leveling'},spy:{name:'Igris',uni:'Solo Leveling'}},
  {ally:{name:'Tank',uni:'Solo Leveling'},spy:{name:'Beru',uni:'Solo Leveling'}},
  // ===================== BLUE LOCK (30) =====================
  {ally:{name:'Isagi',uni:'Blue Lock'},spy:{name:'Bachira',uni:'Blue Lock'}},
  {ally:{name:'Rin',uni:'Blue Lock'},spy:{name:'Isagi',uni:'Blue Lock'}},
  {ally:{name:'Bachira',uni:'Blue Lock'},spy:{name:'Isagi',uni:'Blue Lock'}},
  {ally:{name:'Chigiri',uni:'Blue Lock'},spy:{name:'Isagi',uni:'Blue Lock'}},
  {ally:{name:'Reo',uni:'Blue Lock'},spy:{name:'Rin',uni:'Blue Lock'}},
  {ally:{name:'Nagi',uni:'Blue Lock'},spy:{name:'Reo',uni:'Blue Lock'}},
  {ally:{name:'Kaiser',uni:'Blue Lock'},spy:{name:'Rin',uni:'Blue Lock'}},
  {ally:{name:'Barou',uni:'Blue Lock'},spy:{name:'Kaiser',uni:'Blue Lock'}},
  {ally:{name:'Kunigami',uni:'Blue Lock'},spy:{name:'Chigiri',uni:'Blue Lock'}},
  {ally:{name:'Ego',uni:'Blue Lock'},spy:{name:'Kaiser',uni:'Blue Lock'}},
  {ally:{name:'Shidou',uni:'Blue Lock'},spy:{name:'Rin',uni:'Blue Lock'}},
  {ally:{name:'Yukimiya',uni:'Blue Lock'},spy:{name:'Isagi',uni:'Blue Lock'}},
  {ally:{name:'Aryu',uni:'Blue Lock'},spy:{name:'Kaiser',uni:'Blue Lock'}},
  {ally:{name:'Gagamaru',uni:'Blue Lock'},spy:{name:'Isagi',uni:'Blue Lock'}},
  {ally:{name:'Iemon',uni:'Blue Lock'},spy:{name:'Bachira',uni:'Blue Lock'}},
  {ally:{name:'Sendou',uni:'Blue Lock'},spy:{name:'Kunigami',uni:'Blue Lock'}},
  {ally:{name:'Naruhaya',uni:'Blue Lock'},spy:{name:'Isagi',uni:'Blue Lock'}},
  {ally:{name:'Zantetsu',uni:'Blue Lock'},spy:{name:'Chigiri',uni:'Blue Lock'}},
  {ally:{name:'Otoya',uni:'Blue Lock'},spy:{name:'Bachira',uni:'Blue Lock'}},
  {ally:{name:'Hiori',uni:'Blue Lock'},spy:{name:'Isagi',uni:'Blue Lock'}},
  {ally:{name:'Loki',uni:'Blue Lock'},spy:{name:'Kaiser',uni:'Blue Lock'}},
  {ally:{name:'Niko',uni:'Blue Lock'},spy:{name:'Kaiser',uni:'Blue Lock'}},
  {ally:{name:'Sae',uni:'Blue Lock'},spy:{name:'Rin',uni:'Blue Lock'}},
  {ally:{name:'Karasu',uni:'Blue Lock'},spy:{name:'Isagi',uni:'Blue Lock'}},
  {ally:{name:'Aiku',uni:'Blue Lock'},spy:{name:'Sae',uni:'Blue Lock'}},
  {ally:{name:'Nishioka',uni:'Blue Lock'},spy:{name:'Isagi',uni:'Blue Lock'}},
  {ally:{name:'Tabito',uni:'Blue Lock'},spy:{name:'Nagi',uni:'Blue Lock'}},
  {ally:{name:'Lorenzo',uni:'Blue Lock'},spy:{name:'Kaiser',uni:'Blue Lock'}},
  {ally:{name:'Alexis',uni:'Blue Lock'},spy:{name:'Kaiser',uni:'Blue Lock'}},
  {ally:{name:'Chris',uni:'Blue Lock'},spy:{name:'Kaiser',uni:'Blue Lock'}},
  // ===================== KUROKO (30) =====================
  {ally:{name:'Kuroko',uni:'Kuroko no Basket'},spy:{name:'Kagami',uni:'Kuroko no Basket'}},
  {ally:{name:'Kagami',uni:'Kuroko no Basket'},spy:{name:'Aomine',uni:'Kuroko no Basket'}},
  {ally:{name:'Aomine',uni:'Kuroko no Basket'},spy:{name:'Kuroko',uni:'Kuroko no Basket'}},
  {ally:{name:'Kise',uni:'Kuroko no Basket'},spy:{name:'Aomine',uni:'Kuroko no Basket'}},
  {ally:{name:'Midorima',uni:'Kuroko no Basket'},spy:{name:'Kise',uni:'Kuroko no Basket'}},
  {ally:{name:'Murasakibara',uni:'Kuroko no Basket'},spy:{name:'Aomine',uni:'Kuroko no Basket'}},
  {ally:{name:'Akashi',uni:'Kuroko no Basket'},spy:{name:'Aomine',uni:'Kuroko no Basket'}},
  {ally:{name:'Hyuga',uni:'Kuroko no Basket'},spy:{name:'Kagami',uni:'Kuroko no Basket'}},
  {ally:{name:'Riko',uni:'Kuroko no Basket'},spy:{name:'Kuroko',uni:'Kuroko no Basket'}},
  {ally:{name:'Momoi',uni:'Kuroko no Basket'},spy:{name:'Riko',uni:'Kuroko no Basket'}},
  {ally:{name:'Kiyoshi',uni:'Kuroko no Basket'},spy:{name:'Kagami',uni:'Kuroko no Basket'}},
  {ally:{name:'Izuki',uni:'Kuroko no Basket'},spy:{name:'Kuroko',uni:'Kuroko no Basket'}},
  {ally:{name:'Koganei',uni:'Kuroko no Basket'},spy:{name:'Hyuga',uni:'Kuroko no Basket'}},
  {ally:{name:'Mitobe',uni:'Kuroko no Basket'},spy:{name:'Kiyoshi',uni:'Kuroko no Basket'}},
  {ally:{name:'Tsuchida',uni:'Kuroko no Basket'},spy:{name:'Kagami',uni:'Kuroko no Basket'}},
  {ally:{name:'Wakamatsu',uni:'Kuroko no Basket'},spy:{name:'Aomine',uni:'Kuroko no Basket'}},
  {ally:{name:'Imayoshi',uni:'Kuroko no Basket'},spy:{name:'Aomine',uni:'Kuroko no Basket'}},
  {ally:{name:'Sakurai',uni:'Kuroko no Basket'},spy:{name:'Kise',uni:'Kuroko no Basket'}},
  {ally:{name:'Hanamiya',uni:'Kuroko no Basket'},spy:{name:'Akashi',uni:'Kuroko no Basket'}},
  {ally:{name:'Nijimura',uni:'Kuroko no Basket'},spy:{name:'Akashi',uni:'Kuroko no Basket'}},
  {ally:{name:'Ogiwara',uni:'Kuroko no Basket'},spy:{name:'Kuroko',uni:'Kuroko no Basket'}},
  {ally:{name:'Himuro',uni:'Kuroko no Basket'},spy:{name:'Murasakibara',uni:'Kuroko no Basket'}},
  {ally:{name:'Tatsuya',uni:'Kuroko no Basket'},spy:{name:'Kagami',uni:'Kuroko no Basket'}},
  {ally:{name:'Mayuzumi',uni:'Kuroko no Basket'},spy:{name:'Kuroko',uni:'Kuroko no Basket'}},
  {ally:{name:'Mibuchi',uni:'Kuroko no Basket'},spy:{name:'Akashi',uni:'Kuroko no Basket'}},
  {ally:{name:'Nebuya',uni:'Kuroko no Basket'},spy:{name:'Murasakibara',uni:'Kuroko no Basket'}},
  {ally:{name:'Hayama',uni:'Kuroko no Basket'},spy:{name:'Aomine',uni:'Kuroko no Basket'}},
  {ally:{name:'Furihata',uni:'Kuroko no Basket'},spy:{name:'Kuroko',uni:'Kuroko no Basket'}},
  {ally:{name:'Fukuda',uni:'Kuroko no Basket'},spy:{name:'Kise',uni:'Kuroko no Basket'}},
  {ally:{name:'Takao',uni:'Kuroko no Basket'},spy:{name:'Midorima',uni:'Kuroko no Basket'}},
  // ===================== RE:ZERO (30) =====================
  {ally:{name:'Subaru',uni:'Re:Zero'},spy:{name:'Emilia',uni:'Re:Zero'}},
  {ally:{name:'Emilia',uni:'Re:Zero'},spy:{name:'Rem',uni:'Re:Zero'}},
  {ally:{name:'Rem',uni:'Re:Zero'},spy:{name:'Ram',uni:'Re:Zero'}},
  {ally:{name:'Ram',uni:'Re:Zero'},spy:{name:'Rem',uni:'Re:Zero'}},
  {ally:{name:'Beatrice',uni:'Re:Zero'},spy:{name:'Emilia',uni:'Re:Zero'}},
  {ally:{name:'Roswaal',uni:'Re:Zero'},spy:{name:'Subaru',uni:'Re:Zero'}},
  {ally:{name:'Reinhard',uni:'Re:Zero'},spy:{name:'Wilhelm',uni:'Re:Zero'}},
  {ally:{name:'Wilhelm',uni:'Re:Zero'},spy:{name:'Reinhard',uni:'Re:Zero'}},
  {ally:{name:'Felt',uni:'Re:Zero'},spy:{name:'Emilia',uni:'Re:Zero'}},
  {ally:{name:'Crusch',uni:'Re:Zero'},spy:{name:'Emilia',uni:'Re:Zero'}},
  {ally:{name:'Priscilla',uni:'Re:Zero'},spy:{name:'Emilia',uni:'Re:Zero'}},
  {ally:{name:'Echidna',uni:'Re:Zero'},spy:{name:'Beatrice',uni:'Re:Zero'}},
  {ally:{name:'Anastasia',uni:'Re:Zero'},spy:{name:'Emilia',uni:'Re:Zero'}},
  {ally:{name:'Elsa',uni:'Re:Zero'},spy:{name:'Rem',uni:'Re:Zero'}},
  {ally:{name:'Meili',uni:'Re:Zero'},spy:{name:'Elsa',uni:'Re:Zero'}},
  {ally:{name:'Puck',uni:'Re:Zero'},spy:{name:'Beatrice',uni:'Re:Zero'}},
  {ally:{name:'Julius',uni:'Re:Zero'},spy:{name:'Reinhard',uni:'Re:Zero'}},
  {ally:{name:'Ferris',uni:'Re:Zero'},spy:{name:'Crusch',uni:'Re:Zero'}},
  {ally:{name:'Ricardo',uni:'Re:Zero'},spy:{name:'Anastasia',uni:'Re:Zero'}},
  {ally:{name:'Otto',uni:'Re:Zero'},spy:{name:'Subaru',uni:'Re:Zero'}},
  {ally:{name:'Garfiel',uni:'Re:Zero'},spy:{name:'Subaru',uni:'Re:Zero'}},
  {ally:{name:'Frederica',uni:'Re:Zero'},spy:{name:'Rem',uni:'Re:Zero'}},
  {ally:{name:'Petelgeuse',uni:'Re:Zero'},spy:{name:'Subaru',uni:'Re:Zero'}},
  {ally:{name:'Regulus',uni:'Re:Zero'},spy:{name:'Petelgeuse',uni:'Re:Zero'}},
  {ally:{name:'Sirius',uni:'Re:Zero'},spy:{name:'Regulus',uni:'Re:Zero'}},
  {ally:{name:'Capella',uni:'Re:Zero'},spy:{name:'Elsa',uni:'Re:Zero'}},
  {ally:{name:'Sekhmet',uni:'Re:Zero'},spy:{name:'Echidna',uni:'Re:Zero'}},
  {ally:{name:'Typhon',uni:'Re:Zero'},spy:{name:'Echidna',uni:'Re:Zero'}},
  {ally:{name:'Minerva',uni:'Re:Zero'},spy:{name:'Echidna',uni:'Re:Zero'}},
  {ally:{name:'Daphne',uni:'Re:Zero'},spy:{name:'Echidna',uni:'Re:Zero'}},
  // ===================== DR STONE (30) =====================
  {ally:{name:'Senku',uni:'Dr. Stone'},spy:{name:'Tsukasa',uni:'Dr. Stone'}},
  {ally:{name:'Tsukasa',uni:'Dr. Stone'},spy:{name:'Senku',uni:'Dr. Stone'}},
  {ally:{name:'Chrome',uni:'Dr. Stone'},spy:{name:'Senku',uni:'Dr. Stone'}},
  {ally:{name:'Kohaku',uni:'Dr. Stone'},spy:{name:'Chrome',uni:'Dr. Stone'}},
  {ally:{name:'Gen',uni:'Dr. Stone'},spy:{name:'Senku',uni:'Dr. Stone'}},
  {ally:{name:'Ryusui',uni:'Dr. Stone'},spy:{name:'Senku',uni:'Dr. Stone'}},
  {ally:{name:'Suika',uni:'Dr. Stone'},spy:{name:'Kohaku',uni:'Dr. Stone'}},
  {ally:{name:'Magma',uni:'Dr. Stone'},spy:{name:'Tsukasa',uni:'Dr. Stone'}},
  {ally:{name:'Kinro',uni:'Dr. Stone'},spy:{name:'Chrome',uni:'Dr. Stone'}},
  {ally:{name:'Ginro',uni:'Dr. Stone'},spy:{name:'Kinro',uni:'Dr. Stone'}},
  {ally:{name:'Yo',uni:'Dr. Stone'},spy:{name:'Gen',uni:'Dr. Stone'}},
  {ally:{name:'Ibara',uni:'Dr. Stone'},spy:{name:'Tsukasa',uni:'Dr. Stone'}},
  {ally:{name:'Xeno',uni:'Dr. Stone'},spy:{name:'Tsukasa',uni:'Dr. Stone'}},
  {ally:{name:'Stanley',uni:'Dr. Stone'},spy:{name:'Xeno',uni:'Dr. Stone'}},
  {ally:{name:'Francois',uni:'Dr. Stone'},spy:{name:'Ryusui',uni:'Dr. Stone'}},
  {ally:{name:'Luna',uni:'Dr. Stone'},spy:{name:'Kohaku',uni:'Dr. Stone'}},
  {ally:{name:'Minami',uni:'Dr. Stone'},spy:{name:'Luna',uni:'Dr. Stone'}},
  {ally:{name:'Ukyo',uni:'Dr. Stone'},spy:{name:'Chrome',uni:'Dr. Stone'}},
  {ally:{name:'Taiju',uni:'Dr. Stone'},spy:{name:'Senku',uni:'Dr. Stone'}},
  {ally:{name:'Yuzuriha',uni:'Dr. Stone'},spy:{name:'Taiju',uni:'Dr. Stone'}},
  {ally:{name:'Homura',uni:'Dr. Stone'},spy:{name:'Tsukasa',uni:'Dr. Stone'}},
  {ally:{name:'Hyoga',uni:'Dr. Stone'},spy:{name:'Tsukasa',uni:'Dr. Stone'}},
  {ally:{name:'Kaseki',uni:'Dr. Stone'},spy:{name:'Senku',uni:'Dr. Stone'}},
  {ally:{name:'Ruri',uni:'Dr. Stone'},spy:{name:'Kohaku',uni:'Dr. Stone'}},
  {ally:{name:'Amaryllis',uni:'Dr. Stone'},spy:{name:'Kohaku',uni:'Dr. Stone'}},
  {ally:{name:'Mozu',uni:'Dr. Stone'},spy:{name:'Ibara',uni:'Dr. Stone'}},
  {ally:{name:'Oarashi',uni:'Dr. Stone'},spy:{name:'Ibara',uni:'Dr. Stone'}},
  {ally:{name:'Moz',uni:'Dr. Stone'},spy:{name:'Ibara',uni:'Dr. Stone'}},
  {ally:{name:'Kirisame',uni:'Dr. Stone'},spy:{name:'Ibara',uni:'Dr. Stone'}},
  {ally:{name:'Chelsea',uni:'Dr. Stone'},spy:{name:'Senku',uni:'Dr. Stone'}},
  // ===================== CITY HUNTER (30) =====================
  {ally:{name:'Ryo Saeba',uni:'City Hunter'},spy:{name:'Kaori',uni:'City Hunter'}},
  {ally:{name:'Kaori',uni:'City Hunter'},spy:{name:'Ryo Saeba',uni:'City Hunter'}},
  {ally:{name:'Umibozu',uni:'City Hunter'},spy:{name:'Ryo Saeba',uni:'City Hunter'}},
  {ally:{name:'Saeko',uni:'City Hunter'},spy:{name:'Kaori',uni:'City Hunter'}},
  {ally:{name:'Falcon',uni:'City Hunter'},spy:{name:'Ryo Saeba',uni:'City Hunter'}},
  {ally:{name:'Michael',uni:'City Hunter'},spy:{name:'Ryo Saeba',uni:'City Hunter'}},
  {ally:{name:'Reika',uni:'City Hunter'},spy:{name:'Kaori',uni:'City Hunter'}},
  {ally:{name:'Makimura',uni:'City Hunter'},spy:{name:'Ryo Saeba',uni:'City Hunter'}},
  {ally:{name:'Mick',uni:'City Hunter'},spy:{name:'Umibozu',uni:'City Hunter'}},
  {ally:{name:'Leica',uni:'City Hunter'},spy:{name:'Umibozu',uni:'City Hunter'}},
  {ally:{name:'Rafe',uni:'City Hunter'},spy:{name:'Falcon',uni:'City Hunter'}},
  {ally:{name:'Kei',uni:'City Hunter'},spy:{name:'Ryo Saeba',uni:'City Hunter'}},
  {ally:{name:'Nagare',uni:'City Hunter'},spy:{name:'Ryo Saeba',uni:'City Hunter'}},
  {ally:{name:'Roy',uni:'City Hunter'},spy:{name:'Ryo Saeba',uni:'City Hunter'}},
  {ally:{name:'Joker CH',uni:'City Hunter'},spy:{name:'Ryo Saeba',uni:'City Hunter'}},
  {ally:{name:'Professor CH',uni:'City Hunter'},spy:{name:'Umibozu',uni:'City Hunter'}},
  {ally:{name:'Union Teese',uni:'City Hunter'},spy:{name:'Falcon',uni:'City Hunter'}},
  {ally:{name:'Shin',uni:'City Hunter'},spy:{name:'Ryo Saeba',uni:'City Hunter'}},
  {ally:{name:"Cat's Eye",uni:'City Hunter'},spy:{name:'Kaori',uni:'City Hunter'}},
  {ally:{name:'Fong Li',uni:'City Hunter'},spy:{name:'Ryo Saeba',uni:'City Hunter'}},
  {ally:{name:'Sean',uni:'City Hunter'},spy:{name:'Umibozu',uni:'City Hunter'}},
  {ally:{name:'Jim',uni:'City Hunter'},spy:{name:'Ryo Saeba',uni:'City Hunter'}},
  {ally:{name:'Remy',uni:'City Hunter'},spy:{name:'Falcon',uni:'City Hunter'}},
  {ally:{name:'Hyde',uni:'City Hunter'},spy:{name:'Ryo Saeba',uni:'City Hunter'}},
  {ally:{name:'Bruce',uni:'City Hunter'},spy:{name:'Umibozu',uni:'City Hunter'}},
  {ally:{name:'Amuro',uni:'City Hunter'},spy:{name:'Ryo Saeba',uni:'City Hunter'}},
  {ally:{name:'Julia',uni:'City Hunter'},spy:{name:'Kaori',uni:'City Hunter'}},
  {ally:{name:'Anna',uni:'City Hunter'},spy:{name:'Kaori',uni:'City Hunter'}},
  {ally:{name:'Mina',uni:'City Hunter'},spy:{name:'Reika',uni:'City Hunter'}},
  {ally:{name:'Nicky',uni:'City Hunter'},spy:{name:'Ryo Saeba',uni:'City Hunter'}},
];

const UNIVERSES = ['Naruto','Dragon Ball','One Piece','Pokémon','Attack on Titan','Demon Slayer','Fairy Tail','Bleach','One Punch Man','Black Clover','Fire Force','Jujutsu Kaisen','My Hero Academia','Solo Leveling','Blue Lock','Kuroko no Basket','Re:Zero','Dr. Stone','City Hunter'];

const rooms = {};

const guessRooms = {};

function generateGuessCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return 'G' + code;
}

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

// ===================== MODE DETECTIVE MULTIJOUEUR =====================
const CHARACTERS = {
  'Naruto': [
    {name:'Naruto',hints:['Personnage principal','Cheveux blonds','Rêve de devenir Hokage','Porte une veste orange','Maîtrise le Rasengan','Jinchuriki du Renard à neuf queues','Son père est le 4ème Hokage','A grandi sans parents','Utilise le mode Ermite','Surnom : le ninja le plus bruyant']},
    {name:'Sasuke',hints:['Membre du clan Uchiha','Rival du personnage principal','Yeux noirs au début','Utilise le Sharingan','Cherche à venger son clan','Cheveux noirs en pointe','Son grand frère l\'a traumatisé','Maîtrise le Chidori','Déserteur de Konoha','Développe le Rinnegan']},
    {name:'Itachi',hints:['Membre du clan Uchiha','Porte un manteau noir à nuages rouges','A massacré son propre clan','Appartient à l\'Akatsuki','Yeux qui saignent parfois','Grand frère de Sasuke','Utilise le Mangekyô Sharingan','Sa technique ultime crée une flamme noire','Était en réalité un espion','Considéré comme un héros à titre posthume']},
    {name:'Kakashi',hints:['Porte un masque sur le visage','Sensei de l\'équipe 7','Cheveux gris','Lit des romans pour adultes','Utilise le Sharingan sans être un Uchiha','Surnommé "Le ninja copieur"','A perdu son ami d\'enfance Obito','Devient le 6ème Hokage','Toujours en retard','Expert du Mille Éclairs']},
    {name:'Madara',hints:['Fondateur légendaire de Konoha','Rival d\'Hashirama Senju','Leader des Uchiha','Utilise le Susanoo complet','Ressuscité pendant la Grande Guerre','Possède le Rinnegan','Veut créer un monde d\'illusion','Utilise les météorites comme armes','Considéré comme le ninja le plus puissant de son époque','Devient le réceptacle du Dix-Queues']},
    {name:'Gaara',hints:['Jinchuriki du Sable','Gouverneur de Sunagakure','Cercles noirs autour des yeux','N\'a jamais dormi','Voulait tuer pour prouver son existence','Combat avec le sable','Tatouage "amour" sur le front','Finit par devenir ami avec Naruto','Sœur nommée Temari','Devient Kazekage']},
    {name:'Minato',hints:['Surnommé "l\'Éclair Jaune de Konoha"','4ème Hokage','Père de Naruto','Cheveux blonds','Inventeur du Rasengan','Utilise des kunais spéciaux','Maîtrise le jutsu de téléportation','Mort en scellant le Renard en Naruto','Mari de Kushina','A sauvé Konoha en sacrifiant sa vie']},
    {name:'Pain',hints:['Dirige l\'Akatsuki','A plusieurs corps','Yeux représentent des anneaux concentriques','Originaire du Village de la Pluie','Cherche à apporter la paix par la souffrance','Peut repousser tout ce qui l\'entoure','A détruit tout le village de Konoha','Son vrai nom est Nagato','Partage la même vision que Jiraiya au départ','Finit par ressusciter ses victimes']},
    {name:'Rock Lee',hints:['Incapable d\'utiliser le chakra naturellement','Spécialiste du Taijutsu','Sourcils très épais','Porte une tenue verte','Maître Guy est son sensei','Peut ouvrir les Portes Célestes','Imite le style de son maître','A un bandeau sur la hanche','Fait des pompes comme entraînement','Prouve que le travail acharne bat le talent']},
    {name:'Jiraiya',hints:['Un des trois Sannins légendaires','Surnommé "l\'Ermite des Crapauds"','Parrain de Naruto','Auteur de romans populaires','Long cheveux blancs attachés','Maître de Minato','Invoque des crapauds géants','Disciple de Naruto','Mort en combattant Pain','Son vrai caractère est celui d\'un pervers mais avec un cœur d\'or']},
  ],
  'Dragon Ball': [
    {name:'Goku',hints:['Saïyen envoyé sur Terre bébé','Cheveux noirs et dressés','Porte un gi orange','Transformation légendaire en Super Saïyen','Mange énormément','Son père est Bardock','Marié à Chi-Chi','A un fils nommé Gohan','Utilise le Kamehameha','Atteint l\'Ultra Instinct']},
    {name:'Vegeta',hints:['Prince des Saïyens','Orgueil démesuré','Cheveux dressés en pointe','Rival de Goku','Porte souvent une armure de combat','Père de Trunks','Utilise le Big Bang Attack','Voulait détruire la Terre au départ','Marié à Bulma','Atteint Ultra Ego']},
    {name:'Freezer',hints:['Tyran de l\'espace','Responsable de la destruction de la planète Vegeta','Forme finale la plus puissante','Corps blanc et violet','Capable de survivre dans l\'espace','A tué le père de Vegeta','Coupé en deux par son propre disque','Ressuscité plusieurs fois','Transformation Golden','Rival emblématique de Goku']},
    {name:'Gohan',hints:['Fils de Goku','Demi-Saïyen','Premier à devenir Super Saïyen 2','Élève assidu et studieux','Porte des lunettes en civil','Adopte l\'identité de "Grand Saïyen"','Son potentiel libéré par le Grand Kaioshin','A une fille nommée Pan','Entraîné par Piccolo','Vainqueur de Cell']},
    {name:'Vegeto',hints:['Fusion par les Potaras','Combinaison de Goku et Vegeta','Personnage le plus puissant de l\'univers 7','Cheveux mélangés des deux Saïyens','Fusion permanente à l\'origine','Combat Zamasu dans Future Trunks arc','Très confiant en lui-même','Peut se transformer en Super Saïyen Blue','Capable de déchirer l\'espace-temps','Très rare apparition dans la série']},
    {name:'Broly',hints:['Légendaire Super Saïyen','Né avec un niveau de puissance colossal','Cheveux noirs longs dans sa forme de base','Rugissement impressionnant','Trauma causé par les pleurs de Kakarot','Armure violette dans le film original','Reboot en 2018 avec une histoire différente','Son père Paragus le manipulait','Transformation verte légendaire','Considéré comme le Saïyen le plus puissant']},
    {name:'Piccolo',hints:['Namékien','Rival de Goku devenu allié','Peau verte et antennes','Mentor de Gohan','Peut régénérer ses membres','Fusion avec Nail et Kami','Créateur du Makankosappo','Protège les humains','Devient le Gardien de la Terre','Sage et stratège']},
    {name:'Jiren',hints:['Guerrier le plus puissant de l\'Univers 11','Muscles impressionnants','Yeux gris percants','Appartient aux Soldats de l\'Orgueil','A perdu sa famille et ses amis','Résiste à l\'Ultra Instinct de Goku longtemps','Frappe avec la puissance de son cœur','Pas de transformation visible','Très solitaire au départ','Finit par s\'ouvrir aux autres']},
    {name:'Beerus',hints:['Dieu de la Destruction de l\'Univers 7','Chat violet','Très difficile à réveiller','Cherchait le Super Saïyen Dieu','Accompagné de Whis son entraîneur','Détruit des planètes par caprice','Gourmet et amateur de bonne cuisine','Peut détruire l\'univers en éternuant','Son contraire est Champa','Ancien ennemi devenu allié neutre']},
    {name:'Goku Black',hints:['Ressemble exactement à Goku','Vêtements noirs et gris','Vient du futur de Trunks','Possède une boucle d\'oreille Potara','Peut créer une faux d\'énergie rose','Son vrai nom est Zamasu','A volé le corps de Goku','Veut exterminer les humains','Fusion avec son alter ego','Son aura est rosée']},
  ],
  'One Piece': [
    {name:'Luffy',hints:['Capitaine des Pirates au Chapeau de Paille','A mangé un fruit du démon caoutchouc','Porte un chapeau de paille','Rêve de devenir Roi des Pirates','Ne sait pas nager','Cicatrice sous l\'œil gauche','Frère de Ace et Sabo','Grand-père est Garp le Marine','Maîtrise le Haki des Rois','Quatrième Empereur de la mer']},
    {name:'Zoro',hints:['Combattant à trois sabres','Rêve de devenir le meilleur épéiste du monde','Porte un foulard vert','Se perd tout le temps','Premier officier des Pirates au Chapeau de Paille','Rival de Mihawk','Cicatrice sur l\'œil gauche','Utilise la technique Trois Sabres','A sacrifié sa douleur pour Luffy','A appris le Haki de l\'armement']},
    {name:'Shanks',hints:['Yonko aux cheveux rouges','A offert son chapeau de paille à Luffy','Perdu un bras à cause de Luffy','Ancienne équipe de Roger','N\'a pas mangé de fruit du démon','Haki des Rois surpuissant','Capitaine des Pirates aux Cheveux Rouges','A arrêté la guerre de Marineford','Ancêtre spirituel de Luffy','Mystère sur ses origines']},
    {name:'Trafalgar Law',hints:['Capitaine des Pirates du Cœur','A mangé le fruit Ope Ope','Peut créer une sphère de manipulation spatiale','Tatoué sur tout le corps','Alliance avec Luffy contre Kaido','Chirurgien de la Mort','Chapeau blanc à fourrure','Voulait se venger de Doflamingo','Donquichotte Rosinante l\'a sauvé','Vrai nom : Trafalgar D. Water Law']},
    {name:'Ace',hints:['Fils de Roger le Roi des Pirates','Frère adoptif de Luffy','A mangé le fruit Flamme Flamme','Tatouage ASCE dans le dos','Capitaine des Pirates du Poing de Feu','Commandant de Barbe Blanche','Mort lors de la guerre de Marineford','Sauver par Luffy mais tué par Akainu','Chapeau de cow-boy orange','Sourire toujours au visage']},
    {name:'Mihawk',hints:['Le meilleur épéiste du monde','Yeux jaunes perçants','Porte une cape noire','Sabre le plus grand du monde : Yoru','Ancienne rival de Shanks','Appartient aux Shichibukai','Vit sur l\'île des Chauves-souris','A formé Zoro pendant deux ans','Très peu de personnalité expressive','Co-fondateur des Révolutionnaires non']},
    {name:'Kaido',hints:['L\'être vivant le plus fort du monde','A mangé un fruit dragon mythique','Très difficile à tuer','A essayé de se suicider de nombreuses fois','Gouverneur général des pirates Cent Bêtes','Cicatrice sur l\'œil droit','Ancien membre des Rocks','Son équipage utilise des SMILE','Défaite finale par Luffy','Surnommé le Roi des Bêtes']},
    {name:'Boa Hancock',hints:['Impératrice de l\'île des femmes','A mangé le fruit Amour Amour','Peut pétrifier ceux qui la regardent','Surnommée la Femme la Plus Belle du Monde','Ancienne Shichibukai','Amoureuse de Luffy','Ancienne esclave des Hommes-poissons','Dirige les pirates de Kuja','Sœurs portant le tatouage du soleil','A aidé Luffy pendant la guerre']},
    {name:'Blackbeard',hints:['A mangé deux fruits du démon','Ancien membre de Barbe Blanche','Vise à devenir Roi des Pirates','A trahi Barbe Blanche','Responsable de l\'emprisonnement d\'Ace','Tient Ace jusqu\'à sa mort','Recrute les pires criminels','A capturé Vegapunk','Cicatrices sur le visage faites par Shanks','Surnommé Marshall D. Teach']},
    {name:'Nami',hints:['Navigatrice des Pirates au Chapeau de Paille','Experte en météorologie','Vole facilement les trésors','A grandi dans un village sous l\'emprise d\'Arlong','Tatouage au bras','Utilise un bâton climatique','Rêve de cartographier tout le monde','Chevelure orange','Ancien officier d\'Arlong','La plus avare de l\'équipage']},
  ],
  'Jujutsu Kaisen': [
    {name:'Itadori',hints:['Hôte de Sukuna','Physique impressionnant','Lycéen au départ','Grand-père lui a dit de mourir entouré','Rejoint le lycée de sorcellerie','Peut contrôler Sukuna parfois','Cherche à avaler tous les doigts de Sukuna','Poing droit très puissant','Ami de Megumi et Nobara','Utilise le Divergent Fist']},
    {name:'Gojo',hints:['Sorcier le plus puissant du monde','Yeux bleus cachés par un bandeau','Cheveux blancs','Domaine l\'Infini Vide','Maîtrise les six yeux','Professeur au lycée de Kyoto','Technique des creux et pleins','A été scellé dans la Prison Fermée','Oncle spirituel des élèves','Né lors du soir de la même nuit que Geto']},
    {name:'Sukuna',hints:['Roi des Fléaux','Tatoué sur tout le corps','Possède Itadori comme hôte','Quatre bras et deux visages','Le plus puissant des Fléaux','Son domaine : Bûcher Funèbre','Peut cracher du feu','Très cruel et sadique','Combat avec des lames invisibles','A pris le corps de Megumi']},
    {name:'Megumi',hints:['Utilise la technique des dix ombres','Invoque des shikigamis','Famille Zenin par le sang','Protégé de Gojo','Cheveux noirs en bataille','Son shikigami préféré : Chien de Divine Chiens','Peut invoquer Mahoraga','Père est Toji Fushiguro','Sœur adoptive Tsumiki','Visage impassible permanent']},
    {name:'Nobara',hints:['Utilise un marteau et des clous','Technique du Resonance','Vient de la campagne','Très directe et franche','Amie d\'Itadori','Combat les fléaux avec des poupées vokodou','Cheveux auburn coupés court','A failli mourir face à Mahito','Très fière de son style','Personnalité brutale mais attachante']},
    {name:'Mahito',hints:['Fléau humanoïde','Peut remodeler les âmes','Cause la mort de nombreux personnages','Yeux hétérochromes','Trait de couture sur le visage','Associé à Geto','Adore tourmenter les humains','Responsable de la mort de Junpei','A failli tuer Nobara','Vaincu par Itadori et Todo']},
    {name:'Yuta',hints:['Utilisateur de Rika','Ancêtre de Michizane Sugawara','Très fort en copiage de techniques','Cheveux noirs coupés court','Considéré comme l\'un des quatre spéciaux de grade 1','A étudié à l\'étranger','Maîtrise l\'infini de Gojo','A failli être exécuté au départ','Rika était sa fiancée décédée','Finit par libérer Rika']},
    {name:'Nanami',hints:['Ancien salarié devenu sorcier','Très méthodique et calme','Porte des lunettes et un costume','Technique des proportions','Coupe les fléaux à 7/3 de leur corps','Mentor informel d\'Itadori','Déteste faire des heures supplémentaires','Mort lors de la Shibuya Incident','Avait envisagé de partir en retraite','Très apprécié des fans']},
    {name:'Todo',hints:['Spécialiste en Taijutsu','Technique d\'échange de position','Très grand et musclé','Parle souvent de son type de femme idéal','Appelle Itadori son meilleur ami','Cheveux longs attachés','Élève du lycée de Kyoto','A aidé Itadori contre Mahito','Perdu sa main contre Mahito','Aime Takada-chan']},
    {name:'Kenjaku',hints:['A vécu des milliers d\'années','Prend possession de différents corps','Cicatrice sur le front pour changer de corps','A pris le corps de Geto','Responsable des Nuit d\'Halloween de Shibuya','Objectif de fusionner Tengen avec les humains','Très manipulateur','A séparé les humains du Japon','S\'appelait Noritoshi Kamo dans le passé','Son plan est l\'évolution de l\'humanité']},
  ],
  'Demon Slayer': [
    {name:'Tanjiro',hints:['Porte une boucle d\'oreille à motifs','Cicatrice sur le front','Respiration de l\'Eau','Cheveux bordeaux','Cherche à guérir sa sœur','Odeur très développé','Apprend la Respiration du Soleil','Fils d\'un danseur Hinokami','Très empathique même envers les démons','Vainqueur de Muzan']},
    {name:'Nezuko',hints:['Sœur de Tanjiro transformée en démon','Dort dans une boîte en bois','Porte un bâillon en bambou','Peut réduire ou agrandir sa taille','N\'attaque jamais les humains','Développe une flamme particulière','Résiste au soleil','Cheveux longs noirs','Yeux roses','Finit par redevenir humaine']},
    {name:'Zenitsu',hints:['Peureux et pleurnichard','Dort pour se battre efficacement','Cheveux blonds après avoir été frappé par la foudre','Respiration du Tonnerre','Maîtrise uniquement la première technique','Amoureux de toutes les filles','Cri aigu permanent','En vrai très fort','A perdu son maître','Développe une 7ème forme de Tonnerre']},
    {name:'Rengoku',hints:['Pilier de la Flamme','Cheveux rouge et jaune','Toujours enthousiaste','Dit souvent "Umai !"','Combat dans le train de l\'Infini','Famille de Piliers','Mort au combat contre Akaza','Frère Senjuro','Livre de son père sur les respirations','Dernier souffle pour protéger ses passagers']},
    {name:'Muzan',hints:['Roi des démons','Premier et plus puissant démon','Ressemble à Michael Jackson','Peut changer d\'apparence','A créé tous les Douze Lunes','Seul à pouvoir transformer des humains','Allergique au soleil','Cherche quelqu\'un résistant au soleil','Voulait que Nezuko lui appartienne','Vaincu à l\'aube après combat marathon']},
    {name:'Akaza',hints:['Lune Supérieure Trois','Extrêmement fort en combat à mains nues','Refuse de tuer les femmes','A un passé tragique','Tatouages sur le visage','Technique du style Destructeur','A tué Rengoku','Cheveaux rose','Finit par se souvenir de son passé humain','Se détruit lui-même par remords']},
    {name:'Kokushibo',hints:['Lune Supérieure Un','Frère jumeau de Yoriichi','Portait autrefois le prénom Michikatsu','Utilise la Respiration de la Lune','Corps couvert de yeux sur son sabre','Le plus ancien des démons après Muzan','Voulait le même talent que son frère','Combat les Piliers en même temps','A créé son propre style de Respiration','Finit par se détruire lui-même']},
    {name:'Shinobu',hints:['Pilier de l\'Insecte','Sourit toujours','Ne peut pas couper la tête des démons','Utilise du poison','Robe aux motifs de papillon','Sœur de Kanae','Technique d\'injection de poison concentré','Sacrifiée pour empoisonner Doma','La plus légère des Piliers','Voix douce cachant une rage profonde']},
    {name:'Yoriichi',hints:['Créateur de la Respiration du Soleil','Le plus grand pourfendeur de tous les temps','A failli tuer Muzan seul','Marque rouge sur le front','Jumeau de Kokushibo','Porteur de la marque de Transparence','Sa technique n\'a jamais pu être parfaitement reproduite','Portait les boucles d\'oreilles de Tanjiro','A vécu jusqu\'à un âge avancé','Considéré comme un dieu par ses pairs']},
    {name:'Mitsuri',hints:['Pilier de l\'Amour','Cheveux roses et verts','Muscles très denses malgré son apparence','Respiration de l\'Amour','Sabre très fin et flexible','Très affectueuse avec tout le monde','Mange énormément','Tenue courte de Pilier','Amoureuse secrète d\'Obanai','Survit aux combats de la finale']},
  ],
  'Bleach': [
    {name:'Ichigo',hints:['Cheveux orange naturels','Substitut Shinigami','Porte un grand sabre noir','Mi-humain mi-Shinigami','Père est un ancien Capitaine','Peut se transformer en Hollow','Sa Bankaï divise son sabre en mille lames','Combat pour protéger ses proches','Père du capitaine Kazui','Vainqueur de Yhwach']},
    {name:'Aizen',hints:['Ancien capitaine de la 5ème Division','Portait des lunettes au départ','Traître de Soul Society','Crée des illusions avec son sabre','Cerveau de toute l\'intrigue pendant longtemps','Cheveux bruns puis blancs','S\'est transformé avec le Hōgyoku','Emprisonné pendant des siècles','Parle toujours de manière condescendante','Alliance forcée avec Ichigo à la fin']},
    {name:'Byakuya',hints:['Capitaine de la 6ème Division','Clan Kuchiki noble','Cheveux noirs avec des ornements blancs','Frère adoptif de Rukia','Très froid et distant','Bankaï : mille pétales de cerisier','A condamné Rukia à mort lui-même','Finit par reconnaître ses erreurs','Très élégant dans ses mouvements','Combat As Nodt lors de la guerre']},
    {name:'Zaraki',hints:['Capitaine de la 11ème Division','Adore se battre','Cheveux en piques avec des cloches','Eyepatch pour limiter sa puissance','N\'a pas appris le nom de son sabre longtemps','Sa lieutenant est Yachiru','Peut couper n\'importe quoi','A appris le Kendo et s\'est affaibli','Son Zanpakutô s\'appelle Nozarashi','Combat Unohana pour apprendre à tuer']},
    {name:'Grimmjow',hints:['6ème Espada','Cheveux bleus','Très agressif et combatif','Blessure sur la joue','Considère Ichigo comme son rival','A tué les proches d\'Orihime','Sa forme finale est un grand félin bleu','A été désactivé par Nnoitora','Collabore avec Ichigo contre Yhwach','Son rêve est d\'être le plus fort']},
    {name:'Ulquiorra',hints:['4ème Espada','Marques noires sous les yeux','Très nihiliste','Capable de régénérer ses organes','Surveille Orihime au Hueco Mundo','Peut montrer son cœur à Orihime','Deuxième forme Resurreccion unique','Tué par Ichigo en mode Hollow','Se demande ce qu\'est le cœur','L\'un des Espada les plus populaires']},
    {name:'Urahara',hints:['Propriétaire d\'une boutique de bonbons','Chapeau rayé et tenue de bois','Ancien Capitaine de la 12ème Division','Inventeur du Hōgyoku','Entraîneur caché d\'Ichigo','Très décontracté en apparence','Génie de l\'ingénierie spirituelle','Exilé de Soul Society injustement','Cheveux blonds sous le chapeau','A tout planifié depuis le début']},
    {name:'Yoruichi',hints:['Peut se transformer en chat noir','Ancienne Capitaine de la 2ème Division','Très rapide en flash-step','Ancienne amie de Byakuya','Peau sombre','Entraîne Ichigo et Orihime','A aidé Urahara à s\'évader','Se montre souvent nue sans gêne','Maîtrise l\'électricité dans sa transformation ultime','Surnommée "Déesse du Flash"']},
    {name:'Yhwach',hints:['Père de tous les Quincy','Peut voler les pouvoirs','Voulait détruire Soul Society et le monde des Humains','S\'est battu contre le Roi Esprit','A tué Yamamoto','Peut voir toutes les futurs possibles','Son vrai nom est "A"','Vaincu par Ichigo et les autres','A séparé ses pouvoirs en Sternritter','Fils du Roi Esprit']},
    {name:'Toshiro',hints:['Capitaine de la 10ème Division','Plus jeune Capitaine de l\'histoire','Cheveux blancs en pics','Maîtrise la glace','Bankaï : dragon de glace','Ressemble à un enfant','Grand-mère vit dans le Monde des Vivants','Sensible aux remarques sur sa taille','A été transformé en zombie','Vainqueur de Cang Du']},
  ],
  'One Punch Man': [
    {name:'Saitama',hints:['Chauve','Un seul coup pour vaincre n\'importe qui','S\'ennuie de ne plus trouver d\'adversaires dignes','Porte une tenue jaune et rouge','A perdu ses cheveux à force de s\'entraîner','Classe C puis B puis S','Vit à City Z','Ne fait pas partie d\'une organisation','A vaincu Boros','Son problème : personne ne le reconnaît']},
    {name:'Genos',hints:['Cyborg','Disciple de Saitama','Héros de classe S','Blond aux yeux dorés','Cherche l\'être qui a détruit son village','Peut tirer des rayons d\'incandium','Se fait souvent démanteler en combat','Très dévoué à Saitama','Prend des notes sur tout ce que dit Saitama','Constamment amélioré par Dr Kuseno']},
    {name:'Garou',hints:['Héros chasseur','Ancien disciple de Bang','Veut devenir un monstre absolu','Très grand et musclé','Copie les styles de combat qu\'il voit','Empathie pour les monstres exclus','Combat toute la classe S','Transformation finale monstrueuse','Vaincu finalement par Saitama','Philosophie du monstre incompris']},
    {name:'Tornado',hints:['Rang 2 de la classe S','Télékinésie surpuissante','Cheveux verts en tresses','Très petite et enfantine','Sœur de Fubuki','Très arrogante','Peut voler','Appelle les autres "bébé"','A failli tuer Genos par erreur','Reconnue comme la plus forte de classe S après Blast']},
    {name:'Boros',hints:['Extraterrestre le plus puissant jamais rencontré','A cherché pendant des siècles un adversaire digne','Porte une armure violette','Peut se régénérer','Attaque finale : Cannon Meteoric Burst','Vaincu par Saitama d\'un seul coup malgré tout','Solitaire de son espèce','Oeil unique','Chef d\'une armée interstellaire','A dit que Saitama était comparable à lui']},
    {name:'Bang',hints:['Rang 3 de classe S','Maître du Water Stream Rock Smashing Fist','Très vieux mais extrêmement fort','Cheveux blancs','Frère de Bomb','A formé Garou','Propriétaire d\'un dojo','Détruit son dojo pour combattre','Se bat uniquement à mains nues','Très calme et sage']},
    {name:'King',hints:['Rang 7 de classe S','En réalité très faible','Reçoit tout le crédit des victoires de Saitama','Cicatrice à l\'oeil gauche','Son bruit de cœur terrifie les ennemis','Joue aux jeux vidéo avec Saitama','A mentalement écrasé des ennemis','Considéré comme le plus fort par tous','Très anxieux en réalité','Son secret connu uniquement de Saitama']},
    {name:'Fubuki',hints:['Rang 1 de classe B','Sœur de Tornado','Télékinésie','Groupe de héros "Blizzard"','Cheveux courts noirs','Tente de recruter Saitama','Très compétitive avec sa sœur','Porte souvent un manteau de fourrure','A renoncé à grimper à la classe S','Finit par faire confiance à Saitama']},
    {name:'Flashy Flash',hints:['Rang 13 de classe S','Vitesse surhumaine','Cheveux blancs longs','Ninja d\'élite','Ancien de l\'organisation Ninja','Tue ses anciens camarades','Très arrogant sur sa vitesse','A rencontré Saitama dans les labyrinthes','Ne comprend pas pourquoi Saitama le dépasse','Combat aux deux sabres']},
    {name:'Metal Bat',hints:['Rang 15 de classe S','Combat avec une batte de métal','Plus il est blessé plus il est fort','Protège sa petite sœur Zenko','Accent populaire','Très direct et bagarreur','Humain sans pouvoirs spéciaux','A combattu les membres de Garo','Zenko peut l\'arrêter d\'un mot','Ne recule jamais devant un ennemi']},
  ],
  'My Hero Academia': [
    {name:'Deku',hints:['Né sans Alter','A reçu le One For All','Porte un costume vert','Idole All Might depuis enfance','Cheveux verts bouclés','A 6 Alters supplémentaires','Carnets de notes sur tous les héros','Surnom donné par Bakugo','Développe le Blackwhip','Futur numéro 1']},
    {name:'Bakugo',hints:['Alter explosions','Cheveux blonds en épis','Très agressif','Rival de Deku','Appelle Deku "Deku"','Top de sa classe au lycée','Alter est la sueur de ses paumes','Kidnappé par la Ligue des Vilains','Veut être meilleur qu\'All Might','Finit par admettre respecter Deku']},
    {name:'Todoroki',hints:['Fils d\'Endeavor','Moitié gauche feu moitié droite glace','Cheveux bicolores','A longtemps refusé d\'utiliser le feu','Trauma familial important','Mère lui a versé de l\'eau bouillante','Alter Half Cold Half Hot','Match mémorable contre Deku','Réconciliation avec son père','Devenu héros professionnel rapidement']},
    {name:'All Might',hints:['Symbole de la Paix','Forme musclée et forme maigre','A transmis One For All à Deku','Sourire emblématique','A combattu All For One deux fois','Ne peut plus utiliser son Alter','Alter One For All','Professeur au lycée U.A.','Son vrai nom Toshinori Yagi','Révèle son secret à la nation']},
    {name:'Shigaraki',hints:['Chef de la Ligue des Vilains','Alter Désintégration au toucher','Mains sur tout le corps','Petit-fils de Nana Shimura','Élevé par All For One','Veut détruire la société héroïque','Reçoit le pouvoir All For One','Cheveux bleu clair','Gratte son cou quand stressé','Transformation en monstre surpuissant']},
    {name:'Hawks',hints:['Rang 2 des héros professionnels','Alter : grandes ailes de faucon','Peut contrôler chaque plume','A grandi dans la misère','Espion infiltré dans la Ligue','Blond aux yeux dorés','Trop fort pour son âge','A tué Twice en mission','Relation complexe avec Dabi','Son vrai nom est Keigo Takami']},
    {name:'Toga',hints:['Membre de la Ligue des Vilains','Alter : se transforme en buvant du sang','Obsédée par Deku et Ochaco','Crochets à cheveux jaunes','Très sanguinaire mais joviale','Voulait juste être normale','Aime sincèrement ses amis de la Ligue','A infiltré l\'armée de héros','Yeux globuleux caractéristiques','Sa philosophie : aimer à sa façon']},
    {name:'Dabi',hints:['Flammes bleues','Alter : cryogénèse bleue','Coutures sur tout le visage','En réalité Touya Todoroki','Fils aîné d\'Endeavor','Voulait la reconnaissance de son père','A révélé son identité en direct','Brûle de l\'intérieur littéralement','Membre de la Ligue des Vilains','Survit à son combat final']},
    {name:'Eraser Head',hints:['Professeur de la classe 1-A','Alter : efface les Alters','Bandages autour du cou','Toujours fatigué','Sacs de couchage partout','Capture avec des bandages blancs','Peut combattre sans Alter','A adopté Eri','Ami de Present Mic depuis l\'enfance','Style de combat très pragmatique']},
    {name:'Mirko',hints:['Rang 5 des héros professionnels','Oreilles et queue de lapin','Alter jambes de lapin','Très indépendante','Ne veut pas de sidekicks','A perdu un bras contre des Nomu','Cicatrices après combats','Combat avec les jambes uniquement','Sourit même dans les situations graves','Symbole de la force brute féminine']},
  ],
  'Fairy Tail': [
    {name:'Natsu',hints:['Dragon Slayer du Feu','Mange les flammes','Cheveux roses','Partenaire Happy le chat bleu','Veut retrouver son père le dragon Igneel','Toujours partant pour se battre','Ami rival de Gray','Aime les défis','En réalité Etherious E.N.D.','Vainqueur de Zeref et Acnologia']},
    {name:'Erza',hints:['Magie de l\'Armure Requip','Peut changer d\'armure instantanément','Cheveux rouges','Œil droit artificiel','A grandi comme esclave','Très stricte mais juste','Surnommée Erza la Terrible','Amie d\'enfance de Jellal','Représentante de Fairy Tail','Une des mages les plus puissantes']},
    {name:'Gray',hints:['Magie du Modelage de Glace','Se déshabille inconsciemment','Rival de Natsu','Maître Ur était son professeur','A appris à faire le sacrifice ultime','Cheveux noirs','Père adoptif Silver','Tatouage de démon après arc','Aime Lucy en secret peut-être','Expert en modèles de glace complexes']},
    {name:'Zeref',hints:['Mage le plus noir de l\'histoire','Immortel et maudit','Créateur des Démons du Livre de Zeref','Amoureux de Mavis Vermillion','Cherchait la mort depuis des siècles','En réalité frère de Natsu','Yeux noirs expressifs','A créé E.N.D. pour le tuer','Vaincu par Natsu finalement','Reset par la magie d\'Aqua Aera']},
    {name:'Gildarts',hints:['Mage le plus fort de Fairy Tail','Magie de la Fragmentation','Parti en quête de 100 ans','Père de Cana','Peut fragmenter n\'importe quoi','A perdu un bras et une jambe','Devient 5ème Maître de Fairy Tail','Très décontracté hors combat','Affrontement mémorable contre Natsu','Symbole de la puissance absolue']},
    {name:'Laxus',hints:['Dragon Slayer de la Foudre','Petit-fils de Makarov','Très arrogant au début','Cheveux blonds','Tatouage de Zeref sur le visage','Exclu temporairement de Fairy Tail','Magie de la Foudre surpuissante','Finit par protéger vraiment la guilde','Combat final contre Hades','Devient membre des Dix Chevaliers Magiques']},
    {name:'Jellal',hints:['Ancien ami d\'Erza','Magie des Étoiles','Tour de Paradis','Possédé par Zeref longtemps','Cherche à se racheter','Co-fondateur de Crime Sorcière','Ressemble à Siegrain','A failli tuer Erza plusieurs fois','Aime Erza mais refuse d\'être avec elle','Cheveux bleus avec tatouage']},
    {name:'Mirajane',hints:['Magie Prise d\'Âme démoniaque','Ancienne délinquante à la guilde','Serveuse au bar de Fairy Tail','Cheveux blancs','Sœur d\'Elfman et Lisanna','Très douce en apparence','Transformation en forme démoniaque','Très forte en combat','Posait pour des magazines','Peut se transformer en démon complet']},
    {name:'Acnologia',hints:['Dragon Roi','Transformé en dragon par la magie des Dragons Slayers','Détruit tout sur son passage','Responsable de la disparition des dragons','Deux formes : humaine et draconique','Couleur noire et bleue','Veut détruire tous les Dragons Slayers','Dévoré par le temps de Wendy','Vaincu par tous les Dragon Slayers ensemble','Le plus grand antagoniste de la série']},
    {name:'August',hints:['Roi des Brandish','Fils de Zeref et Mavis','Ne sait pas qui sont ses parents','Le mage humain le plus puissant','Peut copier toute magie','Long bâton de marche','Vieux général des Spriggan 12','Abandonne son combat en découvrant la vérité','Prénom signifie "majestueux"','Meurt pour venger Zeref']},
  ],
  'Solo Leveling': [
    {name:'Sung Jinwoo',hints:['Chasseur le plus faible au départ','Rang E au début','Seul joueur du système','Devient le Monarque des Ombres','Peut invoquer des soldats d\'ombre','Père était un chasseur S','Cheveux noirs','Ses yeux changent en violet','Vainqueur de tous les Monarques','Devient le plus fort du monde']},
    {name:'Cha Hae-In',hints:['Unique chasseuse rang S de Corée','Odeur particulière la dérange chez les chasseurs','Cheveux blonds','Épéiste redoutable','Seule à trouver Jinwoo agréable','Finit par être amoureuse de Jinwoo','Très respectée de ses pairs','Combat au sabre','Rejoint l\'équipe de Jinwoo','Épouse de Jinwoo dans le futur']},
    {name:'Igris',hints:['Premier grand shadow de Jinwoo','Chevalier en armure rouge','Garde silencieux','Toujours à côté de Jinwoo','A été un roi dans sa vie passée','Extrêmement loyal','Combat à l\'épée','Le plus fort de l\'armée d\'ombre au début','Évolue avec Jinwoo','Symbolise la fidélité absolue']},
    {name:'Ashborn',hints:['Le plus grand Monarque','Monarque des Ombres originel','A choisi Jinwoo comme successeur','Dernier de son espèce','Était autrefois du côté des Souverains','S\'est retourné contre les Souverains','A protégé la Terre de loin','Transmis tout son pouvoir à Jinwoo','Son âme vit en Jinwoo','Consideré comme un dieu']},
    {name:'Thomas Andre',hints:['Chasseur rang national américain','Le plus fort humain avant Jinwoo','Musculature impressionnante','Capacité de durcir sa peau','Combat Jinwoo dans une arène','Reconnaît la supériorité de Jinwoo après','Chef de la guilde Scavenger','Très confiant en sa puissance','Manque de Jinwoo de peu','Survit à leurs affrontements']},
  ],
  'Blue Lock': [
    {name:'Isagi',hints:['Vision spatiale au-dessus de la normale','But décisif lors du match final','Cheveux noirs mi-longs','Arme : la précision du tir','Ego l\'a remarqué immédiatement','S\'améliore à chaque match','Dévore les compétences des adversaires','Rival de Rin','Score décisif contre le Japon','Devenir le meilleur numéro 9 du monde']},
    {name:'Rin',hints:['Frère de Sae Itoshi','Très froid et distant','Cheveux bleu-vert','Technique chirurgicale de tir','A décidé de surpasser son frère','Ancienne équipe de Blue Lock abandonné','Revient plus fort','Rival principal d\'Isagi','Yeux perçants caractéristiques','Considéré comme le meilleur de Blue Lock']},
    {name:'Bachira',hints:['Dribble instinctif','Ami de Isagi','Cheveux bouclés','Imagine un monstre qui joue avec lui','Très créatif et imprévisible','Rejoins Kaiser à l\'étranger','Sourire toujours affiché','Influence positive sur Isagi','Premier vrai ami de Blue Lock','Magie dans ses pieds']},
    {name:'Nagi',hints:['Talent naturel phénoménal','Était paresseux avant','Ami de Reo','Très grand et lent','Premier contrôle parfait vu dans la série','Recrutement par Reo','Cheveux blancs','Améliore la technique de Reo','Rejoint une équipe étrangère','Peut contrôler n\'importe quelle balle']},
    {name:'Kaiser',hints:['Allemand','Ego surpuissant','Cheveux blonds','Devenir le meilleur joueur mondial','Ses coéquipiers sont des outils','Technique du Kaiser Impact','Chef de l\'équipe du Bayern fictif','Rival final d\'Isagi','Très calculateur','Finit par voir Isagi comme un vrai rival']},
  ],
  'Kuroko no Basket': [
    {name:'Kuroko',hints:['Présence presque invisible','Passe fantôme','Ancien membre de la Génération des Miracles','Cheveux bleu clair','Joue à Seirin','Partenaire de Kagami','Ne peut pas shooter directement','Utilise la misdirection','Déterminé malgré sa faiblesse physique','Sa force vient de faire briller les autres']},
    {name:'Aomine',hints:['As de la Génération des Miracles','Vitesse et instinct surhumains','Ancien ami de Kuroko','Peut shooter dans des positions impossibles','Très arrogant','Dit que personne ne peut le battre','Son style sans forme','Cheveux bleus foncés','Sa partenaire Momoi est amoureuse de lui','Finalement vaincu par Kagami et Kuroko']},
    {name:'Akashi',hints:['Capitaine de la Génération des Miracles','Yeux hétérochromes','Peut prédire les mouvements','Inviolable Zone','Très manipulateur au début','Deux personnalités','Victorieux depuis l\'enfance','Mène Rakuzan au sommet','Finalement vaincu par Seirin','Retrouve sa vraie personnalité']},
    {name:'Kise',hints:['Peut copier n\'importe quel style','Ancien mannequin','Joue à Kaijo','Très populaire','Cheveux blonds','Admirateur de Kuroko et Aomine','Copie parfaite encore plus forte','Perd mais grandit toujours','Version améliorée appelée Perfect Copy','Très expressif émotionnellement']},
    {name:'Midorima',hints:['Tir à trois points parfait','Porte des objets porte-bonheur','Lunettes rondes','Joue à Shutoku','Archer de la Génération des Miracles','Peut tirer depuis n\'importe où','Croît aux horoscopes','Teikou était son lycée','Toujours bandé les doigts','Finit par respecter la façon de jouer de Seirin']},
  ],
  'Re:Zero': [
    {name:'Subaru',hints:['Transporté dans un autre monde','Capacité : Retour par la Mort','Tenue de survêtement','Très attaché à Emilia','Meurt des dizaines de fois','Ni guerrier ni mage','Force mentale impressionnante','Devient le chevalier d\'Emilia','Ami de Rem notamment','Déterminé jusqu\'à la folie']},
    {name:'Rem',hints:['Oni aux cheveux bleus','Ancienne ennemie de Subaru','Amoureuse de Subaru','Détruit les démons avec sa chaîne','A grandi dans l\'ombre de Ram','Effacée de la mémoire de tous','Se réveille dans le dernier arc','Diligente et dévouée','Sa corne d\'oni se régénère','Considérée comme le personnage le plus aimé']},
    {name:'Emilia',hints:['Demi-Elfe aux cheveux argentés','Candidate au trône de Lugunica','Ressemble à la Sorcière de la Jalousie','Partenaire Puck le chat-esprit','Très bienveillante','A grandi dans une forêt gelée','Surmonter son passé traumatique','Magie de glace','Aimée par Subaru','Finit par reconnaître ses sentiments']},
    {name:'Beatrice',hints:['Esprit qui garde une bibliothèque','Parle avec un tic "I suppose"','Cheveux bouclés en nattes','Tenue de lolita victorienne','A attendu quelqu\'un pendant 400 ans','Ce quelqu\'un était Subaru','Contrat avec Subaru à la fin','Peut lancer des ennemis dans des dimensions','Solitaire au fond','Très attachante malgré son caractère']},
    {name:'Echidna',hints:['Sorcière de la Gourmandise','Vit dans un château de rêves','Désire tout connaître','Teste Subaru lors des épreuves','Thé fait avec ses fluides corporels','Mort il y a 400 ans','Alliance avec Roswaal','Très curieuse de Subaru','Cœur froid malgré l\'intérêt qu\'elle montre','Considérée comme très séduisante']},
  ],
  'Dr. Stone': [
    {name:'Senku',hints:['Génie scientifique absolu','Compte les secondes en pierre','Cheveux vert et blanc','Plan pour reconstruire la civilisation','Ne croit qu\'en la science','Ami de Taiju depuis l\'enfance','Crée la pierre de nitrique','Son plan: 10 milliards de % de certitude','Fabriqué la radio, téléphone, fusée','Le plus grand antagoniste devient allié']},
    {name:'Tsukasa',hints:['L\'homme le plus fort du nouveau monde','Voulait un monde sans adultes corrompus','Cassé les statues pétrifiées des adultes','Très beau physiquement','Chasseur exceptionnel','A tué Senku (pensait-il)','Sœur Mirai était pétrifiée','Finit par s\'allier à Senku','Combat final contre Hyoga','Symbole de la force physique pure']},
    {name:'Chrome',hints:['Autodidacte en science','Villageois de Ishigami','Ami de Ruri','A découvert le magnétisme seul','Cheveux roux','Rejoint immédiatement Senku','Très débrouillard','Capture des Prouesses étranges','Prisonnier de Tsukasa à un moment','Le scientifique du monde de pierre']},
    {name:'Kohaku',hints:['Guerrière du village d\'Ishigami','Très forte pour une fille','Cheveux blonds','Sœur de Ruri','A aidé Senku secrètement','Confond la science avec de la magie au début','Toujours prête au combat','Protège Senku physiquement','Chasseuse extraordinaire','Devenue alliée clé de Kingdom of Science']},
  ],
  'City Hunter': [
    {name:'Ryo Saeba',hints:['Meilleur tireur de City Hunter','Chasseur d\'hommes à Shinjuku','Pervers notoire avec les femmes','Meilleur ami de Makimura','Partenaire de Kaori','Pistolet Colt Python 357','Accent venu d\'un pays en guerre','Passé traumatisant','Intraitable au combat mais comique au quotidien','Protège toujours son client']},
    {name:'Kaori',hints:['Partenaire de Ryo Saeba','Amoureuse de Ryo','Porte un marteau de 100kg','Frappe Ryo à chaque fois qu\'il drague','Sœur adoptive de Makimura','Souvent jalouse des clientes','Apprend à tirer peu à peu','Très loyale','Meurt dans la version originale du manga','La seule qui contrôle vraiment Ryo']},
    {name:'Umibozu',hints:['Rival puis ami de Ryo','Géant aux lunettes noires','Tireur d\'élite de niveau équivalent','Surnom : le Monstre Marin','Terrifiant en apparence mais doux avec sa femme','Sa femme est Leica','Fait équipe occasionnellement avec Ryo','Se bat souvent contre Ryo','Très solitaire au départ','Protège sa femme Leica par-dessus tout']},
  ],
  'Black Clover': [
    {name:'Asta',hints:['Né sans magie','Utilise des grimoires à cinq feuilles','Muscles développés à force de s\'entraîner','Cheveux blancs','Épées anti-magie','Rêve de devenir l\'Empereur-Mage','Rival de Yuno','Fait partie des Black Bulls','Forme démon','Petit mais très déterminé']},
    {name:'Yuno',hints:['Meilleur ami d\'Asta','Magie du Vent','Esprit Sylphe','Grimoire à quatre feuilles','En réalité prince du Royaume de Spade','Très talentueux','Membre des Golden Dawn','Rival d\'Asta','Transformation avec Lumière et Vent','Calme et stratégique']},
    {name:'Yami',hints:['Capitaine des Black Bulls','Vient du pays de l\'Est (Japon)','Magie des Ténèbres','Toujours sur ses toilettes pendant les urgences','Très fort physiquement','Défie ses ennemis à "dépasser ses limites"','Fume toujours','Amoureux de Charlotte en secret','Capturé par Zenon','Libéré par Asta']},
    {name:'Noelle',hints:['Princesse du clan Silva','A du mal à contrôler sa magie au début','Magie de l\'Eau','Amoureuse d\'Asta mais le nie','Cheveux argent-rose','Famille noble qui la méprisait','Crée une armure d\'eau Undine','Devient très puissante','Membre des Black Bulls','Héritage de sa mère défunte']},
    {name:'Gojo',hints:['Julius Novachrono est son vrai antagoniste non','Voir Julius','Non Gojo est de JJK']},
    {name:'Lucius',hints:['Vrai identité de Julius Novachrono','Quatre âmes en une','Magie du Temps et de l\'Âme','Plan pour un monde parfait','Considéré comme le plus grand antagoniste','Transforme des humains en paladin','Frère de Morgen','Avait attendu ce moment des années','Combat Asta en finale','Voulait un paradis sans mal']},
  ],
  'Fire Force': [
    {name:'Shinra',hints:['Pieds qui s\'enflamment','Sourire nerveux qu\'on prend pour méchant','Membre de la 8ème Compagnie','Surnommé "Le Pied du Diable"','Cherche à retrouver son frère Sho','Peut atteindre la vitesse de la lumière','Découvre la vérité sur les Infernaux','Son frère Sho est dans l\'Adolla','Devient héros légendaire','Recréer le monde après la destruction']},
    {name:'Arthur',hints:['Se prend pour un chevalier','Épée de flammes appelée Excalibur','Rival de Shinra','Très bête en dehors des combats','Mais excellent au combat','Maîtrise le plasma','Membre de la 8ème Compagnie','Cheveux blonds','Battre Shinra est son obsession','En réalité ses origines sont mystérieuses']},
    {name:'Benimaru',hints:['Capitaine de la 7ème Compagnie','Hibana l\'aime en secret','Utilisateur de flammes et de sort','Très fort malgré son apparence jeune','Protège son quartier Asakusa','Kabuki style de combat','Mi-humain mi-Adolla peut-être','Très indépendant','Rejoint les autres pour combattre l\'Église','Un des combattants les plus puissants']},
    {name:'Burns',hints:['Capitaine de la 1ère Compagnie','A perdu un œil et un bras','Flammes surpuissantes','Cache des secrets sur l\'Évangile','Connaissait le père de Shinra','Trahison apparente mais raison cachée','Sacrifice final pour la vérité','Très sérieux et autoritaire','Affronte Shinra plusieurs fois','Révèle la vérité sur l\'Adolla à la fin']},
    {name:'Joker',hints:['Double agent mystérieux','Fume des cartes à jouer','Ni héros ni villain','Aide Shinra de son propre chef','Connaît la vérité sur l\'Église','Apparaît à des moments clés','Compétences de combat extrêmes','Informateur indépendant','Cheveux blancs et cicatrice','Son passé lié à l\'Adolla']},
  ],
};

const CHAR_DATA_SERVER = [];
Object.entries(CHARACTERS).forEach(([uni, chars]) => {
  chars.forEach(c => {
    if(c.hints && c.hints.length >= 5) CHAR_DATA_SERVER.push({name:c.name, uni, hints:c.hints});
  });
});

const dmRooms = {};
function generateDmCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return 'D' + code;
}

function getDmPool(selectedUniverses) {
  return CHAR_DATA_SERVER.filter(c => selectedUniverses.includes(c.uni));
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }

io.on('connection', (socket) => {

  socket.on('create_room', ({ playerName, totalRounds, selectedUniverses }) => {
    let code;
    do { code = generateCode(); } while (rooms[code]);
    rooms[code] = {
      code, players: [{ id: socket.id, name: playerName, ready: false, score: 0 }],
      host: socket.id, phase: 'lobby', round: 0,
      currentRound: 1, totalRounds: totalRounds || 3,
      currentPlayerIdx: 0, pair: null, spyId: null,
      hints: [{}, {}], votes: {}, messages: [],
      selectedUniverses: selectedUniverses || UNIVERSES,
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
    if (room.phase !== 'lobby') return socket.emit('error', { msg: 'Partie déjà en cours.' });
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
    room.hints = [{}, {}]; room.votes = {}; room.messages = [];
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
      room.phase = 'round'; room.players.forEach(p => p.ready = false);
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
        io.to(p.id).emit('bonus_phase', { isSpy, hint: isSpy ? 'Devinez le personnage des alliés → +1 pt !' : "Devinez le personnage de l'espion → +1 pt !" });
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
    const totalAnswered = Object.keys(room.bonusGuesses).length + Object.keys(room.bonusSkips).length;
    io.to(code).emit('bonus_result', { playerName: player.name, guess, correct, target, scores: room.players.map(p => ({ name: p.name, score: p.score })), allDone: totalAnswered >= room.players.length });
  });

  socket.on('skip_bonus', () => {
    const code = socket.data.room;
    const room = rooms[code];
    if (!room || room.phase !== 'bonus') return;
    const player = room.players.find(p => p.id === socket.id);
    if (!player || room.bonusGuesses[player.name] || room.bonusSkips[player.name]) return;
    room.bonusSkips[player.name] = true;
    const totalAnswered = Object.keys(room.bonusGuesses).length + Object.keys(room.bonusSkips).length;
    io.to(code).emit('bonus_result', { playerName: player.name, guess: null, correct: false, target: null, scores: room.players.map(p => ({ name: p.name, score: p.score })), allDone: totalAnswered >= room.players.length });
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


  // ===================== DETECTIVE MULTI EVENTS =====================
  socket.on('dm_create', ({ playerName, totalRounds, selectedUniverses }) => {
    let code;
    do { code = generateDmCode(); } while (dmRooms[code]);
    const pool = shuffleArray(getDmPool(selectedUniverses || []));
    dmRooms[code] = {
      code, host: socket.id,
      players: [{ id: socket.id, name: playerName, score: 0 }],
      phase: 'lobby',
      totalRounds, currentRound: 0,
      selectedUniverses: selectedUniverses || [],
      pool, poolIndex: 0,
      currentChar: null, hintsRevealed: 0, maxHints: 10,
      answeredPlayers: {},
      roundWinner: null,
    };
    socket.join(code);
    socket.data.dmRoom = code;
    socket.data.name = playerName;
    socket.emit('dm_created', { code });
    io.to(code).emit('dm_update', dmRooms[code]);
  });

  socket.on('dm_join', ({ code, playerName }) => {
    const room = dmRooms[code];
    if (!room) return socket.emit('error', { msg: 'Salle introuvable.' });
    if (room.players.length >= 5) return socket.emit('error', { msg: 'Salle pleine.' });
    if (room.phase !== 'lobby') return socket.emit('error', { msg: 'Partie en cours.' });
    room.players.push({ id: socket.id, name: playerName, score: 0 });
    socket.join(code);
    socket.data.dmRoom = code;
    socket.data.name = playerName;
    socket.emit('dm_joined', { code });
    io.to(code).emit('dm_update', room);
  });

  socket.on('dm_start', () => {
    const code = socket.data.dmRoom;
    const room = dmRooms[code];
    if (!room || room.host !== socket.id) return;
    if (room.players.length < 2) return socket.emit('error', { msg: 'Il faut au moins 2 joueurs.' });
    dmStartRound(code);
  });

  function dmStartRound(code) {
    const room = dmRooms[code];
    room.currentRound++;
    room.phase = 'playing';
    room.answeredPlayers = {};
    room.roundWinner = null;
    room.hintsRevealed = 0;
    // Prendre le prochain perso du pool mélangé
    if (room.poolIndex >= room.pool.length) {
      room.pool = shuffleArray(room.pool);
      room.poolIndex = 0;
    }
    room.currentChar = room.pool[room.poolIndex++];
    room.maxHints = Math.min(10, room.currentChar.hints.length);
    io.to(code).emit('dm_round_start', {
      roundNum: room.currentRound,
      totalRounds: room.totalRounds,
      maxHints: room.maxHints,
      players: room.players,
    });
    // Révéler le premier indice automatiquement
    dmRevealHint(code);
  }

  function dmRevealHint(code) {
    const room = dmRooms[code];
    if (!room || room.hintsRevealed >= room.maxHints) return;
    room.hintsRevealed++;
    const pts = Math.max(1, room.maxHints - room.hintsRevealed + 1);
    io.to(code).emit('dm_hint', {
      hintNum: room.hintsRevealed,
      hint: room.currentChar.hints[room.hintsRevealed - 1],
      maxHints: room.maxHints,
      pts,
    });
    // Si tous les indices révélés sans gagnant, fin du round
    if (room.hintsRevealed >= room.maxHints && !room.roundWinner) {
      setTimeout(() => dmEndRound(code), 3000);
    }
  }

  socket.on('dm_reveal_hint', () => {
    const code = socket.data.dmRoom;
    const room = dmRooms[code];
    if (!room || room.host !== socket.id || room.phase !== 'playing') return;
    dmRevealHint(code);
  });

  socket.on('dm_answer', ({ answer }) => {
    const code = socket.data.dmRoom;
    const room = dmRooms[code];
    if (!room || room.phase !== 'playing') return;
    const player = room.players.find(p => p.id === socket.id);
    if (!player || room.answeredPlayers[socket.id]) return;

    const correct = answer.trim().toLowerCase() === room.currentChar.name.toLowerCase();
    if (correct) {
      const pts = Math.max(1, room.maxHints - room.hintsRevealed + 1);
      player.score += pts;
      room.answeredPlayers[socket.id] = { correct: true, pts };
      room.roundWinner = player.name;

      io.to(code).emit('dm_answer_result', {
        playerName: player.name,
        correct: true,
        pts,
        answer,
        scores: room.players,
      });

      setTimeout(() => dmEndRound(code), 2000);
    } else {
      room.answeredPlayers[socket.id] = { correct: false };
      io.to(code).emit('dm_answer_result', {
        playerName: player.name,
        correct: false,
        pts: 0,
        answer,
        scores: room.players,
      });
      // Mauvaise réponse : le joueur peut réessayer
      delete room.answeredPlayers[socket.id];
    }
  });

  function dmEndRound(code) {
    const room = dmRooms[code];
    if (!room || room.phase !== 'playing') return;
    room.phase = 'between_rounds';

    io.to(code).emit('dm_round_end', {
      answer: room.currentChar.name,
      uni: room.currentChar.uni,
      winnerName: room.roundWinner,
      scores: room.players,
      allAnswered: true,
    });

    if (room.currentRound >= room.totalRounds) {
      setTimeout(() => {
        room.phase = 'finished';
        io.to(code).emit('dm_game_end', { scores: room.players });
      }, 4000);
    } else {
      setTimeout(() => dmStartRound(code), 4000);
    }
  }

  socket.on('dm_restart', () => {
    const code = socket.data.dmRoom;
    const room = dmRooms[code];
    if (!room || room.host !== socket.id) return;
    const pool = shuffleArray(getDmPool(room.selectedUniverses));
    room.phase = 'lobby'; room.currentRound = 0;
    room.pool = pool; room.poolIndex = 0;
    room.players.forEach(p => p.score = 0);
    io.to(code).emit('dm_update', room);
  });

  // ===================== GUESS EVENTS =====================
  socket.on('guess_create', ({ playerName }) => {
    let code;
    do { code = generateGuessCode(); } while (guessRooms[code]);
    guessRooms[code] = {
      code, host: socket.id,
      players: [{ id: socket.id, name: playerName, char: null, ready: false, questions: 0 }],
      phase: 'lobby', winner: null,
    };
    socket.join(code);
    socket.data.guessRoom = code;
    socket.data.name = playerName;
    socket.emit('guess_created', { code });
    io.to(code).emit('guess_update', guessRooms[code]);
  });

  socket.on('guess_join', ({ code, playerName }) => {
    const room = guessRooms[code];
    if (!room) return socket.emit('error', { msg: 'Salle introuvable.' });
    if (room.players.length >= 2) return socket.emit('error', { msg: 'Salle pleine.' });
    room.players.push({ id: socket.id, name: playerName, char: null, ready: false, questions: 0 });
    socket.join(code);
    socket.data.guessRoom = code;
    socket.data.name = playerName;
    socket.emit('guess_joined', { code });
    io.to(code).emit('guess_update', room);
  });

  socket.on('guess_set_char', ({ charName }) => {
    const code = socket.data.guessRoom;
    const room = guessRooms[code];
    if (!room) return;
    const player = room.players.find(p => p.id === socket.id);
    if (!player) return;
    player.char = charName; player.ready = true;
    io.to(code).emit('guess_update', room);
    if (room.players.length === 2 && room.players.every(p => p.ready)) {
      room.phase = 'playing';
      room.currentTurn = room.players[0].id;
      room.players.forEach(p => {
        const opp = room.players.find(o => o.id !== p.id);
        io.to(p.id).emit('guess_start', { myChar: p.char, opponentName: opp.name, currentTurn: room.currentTurn });
      });
    }
  });

  socket.on('guess_question', ({ question }) => {
    const code = socket.data.guessRoom;
    const room = guessRooms[code];
    if (!room || room.phase !== 'playing' || room.currentTurn !== socket.id) return;
    const player = room.players.find(p => p.id === socket.id);
    player.questions++;
    io.to(code).emit('guess_question_sent', { from: socket.data.name, question, questionCount: player.questions });
  });

  socket.on('guess_answer', ({ answer }) => {
    const code = socket.data.guessRoom;
    const room = guessRooms[code];
    if (!room || room.phase !== 'playing') return;
    io.to(code).emit('guess_answer_sent', { from: socket.data.name, answer });
    room.currentTurn = room.players.find(p => p.id !== room.currentTurn).id;
    io.to(code).emit('guess_turn', { currentTurn: room.currentTurn });
  });

  socket.on('guess_final', ({ guess }) => {
    const code = socket.data.guessRoom;
    const room = guessRooms[code];
    if (!room || room.phase !== 'playing') return;
    const guesser = room.players.find(p => p.id === socket.id);
    const opponent = room.players.find(p => p.id !== socket.id);
    const correct = guess.trim().toLowerCase() === opponent.char.toLowerCase();
    if (correct) {
      room.phase = 'finished';
      io.to(code).emit('guess_finished', { winner: guesser.name, loser: opponent.name, winnerChar: opponent.char, loserChar: guesser.char, questions: guesser.questions });
    } else {
      io.to(code).emit('guess_wrong', { from: guesser.name, guess });
      room.currentTurn = opponent.id;
      io.to(code).emit('guess_turn', { currentTurn: room.currentTurn });
    }
  });

  socket.on('guess_restart', () => {
    const code = socket.data.guessRoom;
    const room = guessRooms[code];
    if (!room || room.host !== socket.id) return;
    room.phase = 'lobby'; room.winner = null;
    room.players.forEach(p => { p.char = null; p.ready = false; p.questions = 0; });
    io.to(code).emit('guess_update', room);
  });

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



  return a;
}

io.on('connection_dm', () => {});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Endercover lancé sur http://localhost:${PORT}`));
