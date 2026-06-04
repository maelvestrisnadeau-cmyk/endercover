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
server.listen(PORT, () => console.log(`Endercover lancé sur http://localhost:${PORT}`));

// ===================== MODE QUI EST-CE =====================
const guessRooms = {};

function generateGuessCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return 'G' + code;
}

const ALL_CHARS = [...new Set([
  'Itachi','Sasuke','Naruto','Kakashi','Obito','Minato','Jiraiya','Tsunade','Gaara','Rock Lee','Pain','Madara','Orochimaru','Neji','Shikamaru','Hinata','Sakura','Hashirama','Tobirama','Kisame',
  'Goku','Vegeta','Gohan','Freezer','Cell','Broly','Piccolo','Boo','Trunks','Goten','Krilin','Bardock','Whis','Beerus','Hit','Jiren','Goku Black','Zamasu','Cooler','Android 17','Android 18',
  'Luffy','Zoro','Sanji','Nami','Robin','Shanks','Ace','Barbe Blanche','Trafalgar Law','Kaido','Boa Hancock','Usopp','Chopper','Brook','Franky','Jinbe','Yamato','Crocodile','Doflamingo','Katakuri','Rayleigh','Mihawk','Sabo','Marco','Garp','Akainu','Aokiji','Big Mom','Blackbeard',
  'Pikachu','Raichu','Dracaufeu','Salamèche','Mewtwo','Mew','Dracolosse','Evoli','Darkrai','Lucario','Lokhlass','Reshiram','Zekrom','Kyogre','Groudon','Arceus','Gengar','Dialga','Giratina','Ho-Oh','Lugia',
  'Eren','Levi','Mikasa','Armin','Hange','Erwin','Reiner','Annie','Zeke','Historia','Connie','Sasha','Jean','Gabi','Falco','Ymir','Kenny','Grisha',
  'Tanjiro','Nezuko','Zenitsu','Inosuke','Rengoku','Tengen','Muzan','Akaza','Shinobu','Kanao','Genya','Mitsuri','Obanai','Muichiro','Gyomei','Sanemi','Douma','Kokushibo','Yoriichi',
  'Natsu','Lucy','Erza','Gray','Makarov','Gildarts','Laxus','Zeref','Acnologia','Wendy','Jellal','Mirajane','Mystogan','Elfman','Cana','Gajeel','Levy','Ultear','Kagura','Sting','Rogue',
  'Ichigo','Rukia','Aizen','Byakuya','Zaraki','Renji','Orihime','Uryu','Urahara','Yoruichi','Yhwach','Grimmjow','Ulquiorra','Toshiro','Shunsui','Gin','Nelliel','Starrk',
  'Saitama','Genos','Garou','Bang','Tornado','Metal Bat','King','Flashy Flash','Boros','Zombieman','Fubuki','Mumen Rider','Darkshine','Speed-o-Sound Sonic','Atomic Samurai',
  'Asta','Yuno','Yami','Noelle','Julius','Luck','Magna','Mereoleona','Zagred','Zenon','Finral','Secre','Vanessa','Dante','Vanica','Licht','Liebe','Lucius',
  'Shinra','Arthur','Tamaki','Obi','Maki','Burns','Joker','Sho','Benimaru','Viktor','Nataku','Inca','Kurono','Konro','Vulcan','Giovanni',
  'Itadori','Megumi','Gojo','Sukuna','Nobara','Nanami','Yuta','Mahito','Hakari','Choso','Toge','Panda','Maki JJK','Todo','Geto','Jogo','Hanami','Kenjaku',
  'Deku','Bakugo','Todoroki','All Might','Uraraka','Shigaraki','All For One','Hawks','Endeavor','Iida','Tsuyu','Denki','Eijiro','Momo','Twice','Toga','Dabi','Overhaul','Mirko','Eraser Head',
  'Sung Jinwoo','Igris','Cha Hae-In','Beru','Thomas Andre','Ashborn','Antares','Go Gunhee','Kaisel','Bellion',
  'Isagi','Rin','Bachira','Chigiri','Reo','Nagi','Kaiser','Barou','Shidou','Yukimiya','Sae','Karasu','Ego',
  'Kuroko','Kagami','Aomine','Kise','Midorima','Murasakibara','Akashi','Hyuga','Momoi','Kiyoshi','Himuro',
  'Subaru','Emilia','Rem','Ram','Beatrice','Roswaal','Reinhard','Echidna','Puck','Otto','Garfiel','Regulus',
  'Senku','Tsukasa','Chrome','Kohaku','Gen','Ryusui','Suika','Taiju','Ukyo','Hyoga',
  'Ryo Saeba','Kaori','Umibozu',
])];

io.on('connection_guess', () => {});

// Écouter les events guess sur la même connexion io
const origOn = io.on.bind(io);
io.on('connection', (socket) => {
  // Créer salle Qui est-ce
  socket.on('guess_create', ({ playerName, selectedUniverses }) => {
    let code;
    do { code = generateGuessCode(); } while (guessRooms[code]);
    guessRooms[code] = {
      code, host: socket.id,
      players: [{ id: socket.id, name: playerName, char: null, ready: false, questions: 0 }],
      phase: 'lobby',
      selectedUniverses: selectedUniverses || [],
      winner: null,
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
    if (room.players.length >= 2) return socket.emit('error', { msg: 'Salle pleine (2 joueurs max).' });
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
    player.char = charName;
    player.ready = true;
    io.to(code).emit('guess_update', room);
    if (room.players.length === 2 && room.players.every(p => p.ready)) {
      room.phase = 'playing';
      room.currentTurn = room.players[0].id;
      room.players.forEach(p => {
        const opponent = room.players.find(o => o.id !== p.id);
        io.to(p.id).emit('guess_start', {
          myChar: p.char,
          opponentName: opponent.name,
          currentTurn: room.currentTurn,
        });
      });
    }
  });

  socket.on('guess_random_char', ({ universe }) => {
    const code = socket.data.guessRoom;
    const room = guessRooms[code];
    if (!room) return;
    const pool = universe
      ? ALL_CHARS.filter(c => {
          // On pourrait filtrer par univers si on avait le mapping, simplifié ici
          return true;
        })
      : ALL_CHARS;
    const charName = pool[Math.floor(Math.random() * pool.length)];
    socket.emit('guess_random_result', { charName });
  });

  socket.on('guess_question', ({ question }) => {
    const code = socket.data.guessRoom;
    const room = guessRooms[code];
    if (!room || room.phase !== 'playing') return;
    if (room.currentTurn !== socket.id) return;
    const player = room.players.find(p => p.id === socket.id);
    player.questions++;
    io.to(code).emit('guess_question_sent', {
      from: socket.data.name,
      question,
      questionCount: player.questions,
    });
  });

  socket.on('guess_answer', ({ answer }) => {
    const code = socket.data.guessRoom;
    const room = guessRooms[code];
    if (!room || room.phase !== 'playing') return;
    const asker = room.players.find(p => p.id === room.currentTurn);
    io.to(code).emit('guess_answer_sent', {
      from: socket.data.name,
      answer,
    });
    // Après réponse, c'est au tour de l'autre de poser une question OU de deviner
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
      room.winner = guesser.name;
      io.to(code).emit('guess_finished', {
        winner: guesser.name,
        loser: opponent.name,
        winnerChar: opponent.char,
        loserChar: guesser.char,
        questions: guesser.questions,
      });
    } else {
      io.to(code).emit('guess_wrong', {
        from: guesser.name,
        guess,
      });
      // Mauvaise réponse = perd son tour
      room.currentTurn = opponent.id;
      io.to(code).emit('guess_turn', { currentTurn: room.currentTurn });
    }
  });

  socket.on('guess_restart', () => {
    const code = socket.data.guessRoom;
    const room = guessRooms[code];
    if (!room || room.host !== socket.id) return;
    room.phase = 'lobby';
    room.winner = null;
    room.players.forEach(p => { p.char = null; p.ready = false; p.questions = 0; });
    io.to(code).emit('guess_update', room);
  });
});
