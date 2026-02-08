// Test data for seeding the app
// Run this by importing and calling seedTestData() in App.jsx once

import { useIngredientsStore, useRecipesStore } from './store';

// Comprehensive test ingredients - Estonian cuisine focused
const TEST_INGREDIENTS = [
    // Köögiviljad
    { name: 'Kartul', emoji: '🥔', unit: 'g', caloriesPerUnit: 0.77, healthiness: 6 },
    { name: 'Sibul', emoji: '🧅', unit: 'pc', caloriesPerUnit: 40, healthiness: 7 },
    { name: 'Punane sibul', emoji: '🧅', unit: 'pc', caloriesPerUnit: 40, healthiness: 8 },
    { name: 'Porrulauk', emoji: '🧅', unit: 'pc', caloriesPerUnit: 54, healthiness: 8 },
    { name: 'Šalott', emoji: '🧅', unit: 'pc', caloriesPerUnit: 7, healthiness: 8 },
    { name: 'Porgand', emoji: '🥕', unit: 'g', caloriesPerUnit: 0.41, healthiness: 9 },
    { name: 'Tomat', emoji: '🍅', unit: 'g', caloriesPerUnit: 0.18, healthiness: 9 },
    { name: 'Kirsstomat', emoji: '🍅', unit: 'g', caloriesPerUnit: 0.18, healthiness: 9 },
    { name: 'Kurk', emoji: '🥒', unit: 'g', caloriesPerUnit: 0.15, healthiness: 9 },
    { name: 'Marineeritud kurk', emoji: '🥒', unit: 'g', caloriesPerUnit: 0.11, healthiness: 6 },
    { name: 'Paprika', emoji: '🫑', unit: 'pc', caloriesPerUnit: 31, healthiness: 9 },
    { name: 'Küüslauk', emoji: '🧄', unit: 'pc', caloriesPerUnit: 4, healthiness: 9 },
    { name: 'Spinat', emoji: '🥬', unit: 'g', caloriesPerUnit: 0.23, healthiness: 10 },
    { name: 'Brokkoli', emoji: '🥦', unit: 'g', caloriesPerUnit: 0.34, healthiness: 10 },
    { name: 'Lillkapsas', emoji: '🥦', unit: 'g', caloriesPerUnit: 0.25, healthiness: 9 },
    { name: 'Kapsas', emoji: '🥬', unit: 'g', caloriesPerUnit: 0.25, healthiness: 9 },
    { name: 'Hapukapsas', emoji: '🥬', unit: 'g', caloriesPerUnit: 0.19, healthiness: 8 },
    { name: 'Peet', emoji: '🍠', unit: 'g', caloriesPerUnit: 0.43, healthiness: 8 },
    { name: 'Seller', emoji: '🥬', unit: 'pc', caloriesPerUnit: 6, healthiness: 9 },
    { name: 'Suvikõrvits', emoji: '🥒', unit: 'g', caloriesPerUnit: 0.17, healthiness: 9 },
    { name: 'Baklažaan', emoji: '🍆', unit: 'pc', caloriesPerUnit: 35, healthiness: 8 },
    { name: 'Seened', emoji: '🍄', unit: 'g', caloriesPerUnit: 0.22, healthiness: 8 },
    { name: 'Šampinjonid', emoji: '🍄', unit: 'g', caloriesPerUnit: 0.22, healthiness: 8 },
    { name: 'Redis', emoji: '🥬', unit: 'pc', caloriesPerUnit: 1, healthiness: 9 },
    { name: 'Avokaado', emoji: '🥑', unit: 'pc', caloriesPerUnit: 240, healthiness: 9 },

    // Puuviljad
    { name: 'Õun', emoji: '🍎', unit: 'pc', caloriesPerUnit: 95, healthiness: 9 },
    { name: 'Banaan', emoji: '🍌', unit: 'pc', caloriesPerUnit: 105, healthiness: 7 },
    { name: 'Sidrun', emoji: '🍋', unit: 'pc', caloriesPerUnit: 17, healthiness: 8 },
    { name: 'Laim', emoji: '🍋', unit: 'pc', caloriesPerUnit: 20, healthiness: 8 },
    { name: 'Apelsin', emoji: '🍊', unit: 'pc', caloriesPerUnit: 62, healthiness: 9 },
    { name: 'Maasikad', emoji: '🍓', unit: 'g', caloriesPerUnit: 0.32, healthiness: 9 },
    { name: 'Mustikad', emoji: '🫐', unit: 'g', caloriesPerUnit: 0.57, healthiness: 10 },
    { name: 'Vaarikad', emoji: '🍇', unit: 'g', caloriesPerUnit: 0.52, healthiness: 9 },
    { name: 'Viinamarjad', emoji: '🍇', unit: 'g', caloriesPerUnit: 0.69, healthiness: 7 },
    { name: 'Pirn', emoji: '🍐', unit: 'pc', caloriesPerUnit: 102, healthiness: 8 },
    { name: 'Ananass', emoji: '🍍', unit: 'g', caloriesPerUnit: 0.50, healthiness: 8 },
    { name: 'Mango', emoji: '🥭', unit: 'pc', caloriesPerUnit: 202, healthiness: 8 },

    // Liha
    { name: 'Kanafilee', emoji: '🍗', unit: 'g', caloriesPerUnit: 1.65, healthiness: 8 },
    { name: 'Kanakoivad', emoji: '🍗', unit: 'pc', caloriesPerUnit: 180, healthiness: 7 },
    { name: 'Kanatiivad', emoji: '🍗', unit: 'pc', caloriesPerUnit: 80, healthiness: 6 },
    { name: 'Hakkliha sega', emoji: '🥩', unit: 'g', caloriesPerUnit: 2.32, healthiness: 5 },
    { name: 'Hakkliha veise', emoji: '🥩', unit: 'g', caloriesPerUnit: 2.54, healthiness: 5 },
    { name: 'Sealiha', emoji: '🥩', unit: 'g', caloriesPerUnit: 2.42, healthiness: 5 },
    { name: 'Seakarbonaad', emoji: '🥩', unit: 'g', caloriesPerUnit: 1.43, healthiness: 6 },
    { name: 'Veiseliha', emoji: '🥩', unit: 'g', caloriesPerUnit: 2.50, healthiness: 6 },
    { name: 'Lambaliha', emoji: '🍖', unit: 'g', caloriesPerUnit: 2.94, healthiness: 6 },
    { name: 'Peekon', emoji: '🥓', unit: 'g', caloriesPerUnit: 5.41, healthiness: 3 },
    { name: 'Sink', emoji: '🥓', unit: 'g', caloriesPerUnit: 1.45, healthiness: 4 },
    { name: 'Vorst', emoji: '🌭', unit: 'g', caloriesPerUnit: 3.01, healthiness: 3 },
    { name: 'Suitsuvorst', emoji: '🌭', unit: 'g', caloriesPerUnit: 2.89, healthiness: 3 },

    // Kala ja mereannid
    { name: 'Lõhe', emoji: '🐟', unit: 'g', caloriesPerUnit: 2.08, healthiness: 9 },
    { name: 'Suitsulõhe', emoji: '🐟', unit: 'g', caloriesPerUnit: 1.17, healthiness: 8 },
    { name: 'Forell', emoji: '🐟', unit: 'g', caloriesPerUnit: 1.48, healthiness: 9 },
    { name: 'Tursafilee', emoji: '🐟', unit: 'g', caloriesPerUnit: 0.82, healthiness: 9 },
    { name: 'Räim', emoji: '🐟', unit: 'g', caloriesPerUnit: 2.03, healthiness: 8 },
    { name: 'Kilu', emoji: '🐟', unit: 'g', caloriesPerUnit: 2.17, healthiness: 7 },
    { name: 'Krevetid', emoji: '🦐', unit: 'g', caloriesPerUnit: 0.99, healthiness: 8 },
    { name: 'Tuunikala', emoji: '🐟', unit: 'g', caloriesPerUnit: 1.32, healthiness: 8 },

    // Piimatooted
    { name: 'Piim 2.5%', emoji: '🥛', unit: 'ml', caloriesPerUnit: 0.50, healthiness: 7 },
    { name: 'Piim 3.5%', emoji: '🥛', unit: 'ml', caloriesPerUnit: 0.64, healthiness: 6 },
    { name: 'Täispiim', emoji: '🥛', unit: 'ml', caloriesPerUnit: 0.62, healthiness: 6 },
    { name: 'Laktoosivaba piim', emoji: '🥛', unit: 'ml', caloriesPerUnit: 0.46, healthiness: 7 },
    { name: 'Kaerapiim', emoji: '🥛', unit: 'ml', caloriesPerUnit: 0.43, healthiness: 7 },
    { name: 'Kookospiim', emoji: '🥥', unit: 'ml', caloriesPerUnit: 1.97, healthiness: 6 },
    { name: 'Koor 10%', emoji: '🥛', unit: 'ml', caloriesPerUnit: 1.19, healthiness: 5 },
    { name: 'Koor 20%', emoji: '🥛', unit: 'ml', caloriesPerUnit: 2.05, healthiness: 4 },
    { name: 'Koor 35%', emoji: '🥛', unit: 'ml', caloriesPerUnit: 3.40, healthiness: 4 },
    { name: 'Vahukoor', emoji: '🥛', unit: 'ml', caloriesPerUnit: 3.45, healthiness: 3 },
    { name: 'Hapukoor 20%', emoji: '🥛', unit: 'ml', caloriesPerUnit: 2.04, healthiness: 5 },
    { name: 'Kreeka jogurt', emoji: '🥛', unit: 'g', caloriesPerUnit: 0.97, healthiness: 8 },
    { name: 'Maitsestamata jogurt', emoji: '🥛', unit: 'g', caloriesPerUnit: 0.59, healthiness: 7 },
    { name: 'Kohupiim', emoji: '🧀', unit: 'g', caloriesPerUnit: 0.98, healthiness: 7 },
    { name: 'Toorjuust', emoji: '🧀', unit: 'g', caloriesPerUnit: 3.42, healthiness: 5 },
    { name: 'Või', emoji: '🧈', unit: 'g', caloriesPerUnit: 7.17, healthiness: 3 },
    { name: 'Margariin', emoji: '🧈', unit: 'g', caloriesPerUnit: 7.19, healthiness: 2 },

    // Juustud
    { name: 'Juust', emoji: '🧀', unit: 'g', caloriesPerUnit: 4.02, healthiness: 5 },
    { name: 'Cheddar', emoji: '🧀', unit: 'g', caloriesPerUnit: 4.03, healthiness: 5 },
    { name: 'Mozzarella', emoji: '🧀', unit: 'g', caloriesPerUnit: 2.80, healthiness: 6 },
    { name: 'Parmesani juust', emoji: '🧀', unit: 'g', caloriesPerUnit: 4.31, healthiness: 5 },
    { name: 'Feta', emoji: '🧀', unit: 'g', caloriesPerUnit: 2.64, healthiness: 6 },
    { name: 'Gouda', emoji: '🧀', unit: 'g', caloriesPerUnit: 3.56, healthiness: 5 },
    { name: 'Brie', emoji: '🧀', unit: 'g', caloriesPerUnit: 3.34, healthiness: 5 },
    { name: 'Sulatatud juust', emoji: '🧀', unit: 'g', caloriesPerUnit: 2.76, healthiness: 4 },
    { name: 'Ricotta', emoji: '🧀', unit: 'g', caloriesPerUnit: 1.74, healthiness: 6 },
    { name: 'Mascarpone', emoji: '🧀', unit: 'g', caloriesPerUnit: 4.29, healthiness: 4 },

    // Munad
    { name: 'Muna', emoji: '🥚', unit: 'pc', caloriesPerUnit: 72, healthiness: 7 },
    { name: 'Munakollane', emoji: '🥚', unit: 'pc', caloriesPerUnit: 55, healthiness: 6 },
    { name: 'Munavalge', emoji: '🥚', unit: 'pc', caloriesPerUnit: 17, healthiness: 8 },
    { name: 'Vutimunad', emoji: '🥚', unit: 'pc', caloriesPerUnit: 14, healthiness: 7 },

    // Jahud
    { name: 'Nisujahu', emoji: '🌾', unit: 'g', caloriesPerUnit: 3.64, healthiness: 4 },
    { name: 'Täisteranisujahu', emoji: '🌾', unit: 'g', caloriesPerUnit: 3.40, healthiness: 6 },
    { name: 'Rukkijahu', emoji: '🌾', unit: 'g', caloriesPerUnit: 3.25, healthiness: 6 },
    { name: 'Kaerajahu', emoji: '🌾', unit: 'g', caloriesPerUnit: 3.89, healthiness: 7 },
    { name: 'Riisijahu', emoji: '🌾', unit: 'g', caloriesPerUnit: 3.66, healthiness: 5 },
    { name: 'Mandlijahu', emoji: '🌰', unit: 'g', caloriesPerUnit: 5.76, healthiness: 7 },
    { name: 'Kookosejahu', emoji: '🥥', unit: 'g', caloriesPerUnit: 4.43, healthiness: 6 },
    { name: 'Maisijahu', emoji: '🌽', unit: 'g', caloriesPerUnit: 3.61, healthiness: 5 },
    { name: 'Kartulitärklis', emoji: '🥔', unit: 'g', caloriesPerUnit: 3.33, healthiness: 4 },
    { name: 'Maisitärklis', emoji: '🌽', unit: 'g', caloriesPerUnit: 3.81, healthiness: 4 },

    // Teravili ja pasta
    { name: 'Riis', emoji: '🍚', unit: 'g', caloriesPerUnit: 1.30, healthiness: 6 },
    { name: 'Basmati riis', emoji: '🍚', unit: 'g', caloriesPerUnit: 1.21, healthiness: 6 },
    { name: 'Pruun riis', emoji: '🍚', unit: 'g', caloriesPerUnit: 1.11, healthiness: 7 },
    { name: 'Spagetid', emoji: '🍝', unit: 'g', caloriesPerUnit: 1.31, healthiness: 5 },
    { name: 'Penne', emoji: '🍝', unit: 'g', caloriesPerUnit: 1.31, healthiness: 5 },
    { name: 'Fusilli', emoji: '🍝', unit: 'g', caloriesPerUnit: 1.31, healthiness: 5 },
    { name: 'Lasanjeplaadid', emoji: '🍝', unit: 'pc', caloriesPerUnit: 57, healthiness: 5 },
    { name: 'Nuudlid', emoji: '🍜', unit: 'g', caloriesPerUnit: 1.37, healthiness: 5 },
    { name: 'Kuskus', emoji: '🌾', unit: 'g', caloriesPerUnit: 1.12, healthiness: 6 },
    { name: 'Kinoa', emoji: '🌾', unit: 'g', caloriesPerUnit: 1.20, healthiness: 8 },
    { name: 'Tatar', emoji: '🌾', unit: 'g', caloriesPerUnit: 0.92, healthiness: 8 },
    { name: 'Kaerahelbed', emoji: '🌾', unit: 'g', caloriesPerUnit: 3.89, healthiness: 8 },
    { name: 'Leib', emoji: '🍞', unit: 'pc', caloriesPerUnit: 79, healthiness: 5 },
    { name: 'Sai', emoji: '🥖', unit: 'pc', caloriesPerUnit: 120, healthiness: 4 },
    { name: 'Sepik', emoji: '🍞', unit: 'g', caloriesPerUnit: 2.06, healthiness: 6 },

    // Maitseained
    { name: 'Sool', emoji: '🧂', unit: 'tsp', caloriesPerUnit: 0, healthiness: 4 },
    { name: 'Must pipar', emoji: '🌶️', unit: 'tsp', caloriesPerUnit: 6, healthiness: 6 },
    { name: 'Paprikapulber', emoji: '🌶️', unit: 'tsp', caloriesPerUnit: 6, healthiness: 6 },
    { name: 'Karripulber', emoji: '🌶️', unit: 'tsp', caloriesPerUnit: 6, healthiness: 6 },
    { name: 'Kaneel', emoji: '🌰', unit: 'tsp', caloriesPerUnit: 6, healthiness: 7 },
    { name: 'Ingver', emoji: '🫚', unit: 'tsp', caloriesPerUnit: 2, healthiness: 9 },
    { name: 'Värske ingver', emoji: '🫚', unit: 'g', caloriesPerUnit: 0.80, healthiness: 9 },
    { name: 'Kurkum', emoji: '🌶️', unit: 'tsp', caloriesPerUnit: 8, healthiness: 9 },
    { name: 'Köömen', emoji: '🌿', unit: 'tsp', caloriesPerUnit: 8, healthiness: 7 },
    { name: 'Oregano', emoji: '🌿', unit: 'tsp', caloriesPerUnit: 3, healthiness: 8 },
    { name: 'Basiilik', emoji: '🌿', unit: 'tsp', caloriesPerUnit: 1, healthiness: 8 },
    { name: 'Värske basiilik', emoji: '🌿', unit: 'g', caloriesPerUnit: 0.22, healthiness: 9 },
    { name: 'Till', emoji: '🌿', unit: 'tsp', caloriesPerUnit: 3, healthiness: 8 },
    { name: 'Värske till', emoji: '🌿', unit: 'g', caloriesPerUnit: 0.43, healthiness: 9 },
    { name: 'Petersell', emoji: '🌿', unit: 'tsp', caloriesPerUnit: 1, healthiness: 8 },
    { name: 'Värske petersell', emoji: '🌿', unit: 'g', caloriesPerUnit: 0.36, healthiness: 9 },
    { name: 'Rosmariin', emoji: '🌿', unit: 'tsp', caloriesPerUnit: 4, healthiness: 8 },
    { name: 'Tüümian', emoji: '🌿', unit: 'tsp', caloriesPerUnit: 3, healthiness: 8 },
    { name: 'Loorberilehed', emoji: '🌿', unit: 'pc', caloriesPerUnit: 2, healthiness: 7 },
    { name: 'Murulauk', emoji: '🌿', unit: 'g', caloriesPerUnit: 0.30, healthiness: 8 },
    { name: 'Muskaatpähkel', emoji: '🌰', unit: 'pinch', caloriesPerUnit: 5, healthiness: 6 },
    { name: 'Vaniiljeekstrakt', emoji: '🍦', unit: 'tsp', caloriesPerUnit: 12, healthiness: 5 },
    { name: 'Vanillishuhkur', emoji: '🍦', unit: 'tbsp', caloriesPerUnit: 23, healthiness: 3 },

    // Õlid ja äädikas
    { name: 'Oliiviõli', emoji: '🫒', unit: 'tbsp', caloriesPerUnit: 119, healthiness: 8 },
    { name: 'Päevalilleõli', emoji: '🌻', unit: 'tbsp', caloriesPerUnit: 120, healthiness: 5 },
    { name: 'Rapsiõli', emoji: '🫒', unit: 'tbsp', caloriesPerUnit: 120, healthiness: 6 },
    { name: 'Kookosõli', emoji: '🥥', unit: 'tbsp', caloriesPerUnit: 121, healthiness: 5 },
    { name: 'Seesamiõli', emoji: '🫒', unit: 'tsp', caloriesPerUnit: 40, healthiness: 7 },
    { name: 'Valge veiniäädikas', emoji: '🍾', unit: 'tbsp', caloriesPerUnit: 3, healthiness: 6 },
    { name: 'Balsamicoäädikas', emoji: '🍾', unit: 'tbsp', caloriesPerUnit: 14, healthiness: 6 },
    { name: 'Õunaäädikas', emoji: '🍎', unit: 'tbsp', caloriesPerUnit: 3, healthiness: 7 },

    // Magusained
    { name: 'Suhkur', emoji: '🍬', unit: 'g', caloriesPerUnit: 3.87, healthiness: 2 },
    { name: 'Pruun suhkur', emoji: '🍬', unit: 'g', caloriesPerUnit: 3.80, healthiness: 2 },
    { name: 'Tuhksuhkur', emoji: '🍬', unit: 'g', caloriesPerUnit: 3.89, healthiness: 2 },
    { name: 'Mesi', emoji: '🍯', unit: 'tbsp', caloriesPerUnit: 64, healthiness: 5 },
    { name: 'Siirup', emoji: '🍯', unit: 'tbsp', caloriesPerUnit: 52, healthiness: 3 },
    { name: 'Vahtrasiirup', emoji: '🍁', unit: 'tbsp', caloriesPerUnit: 52, healthiness: 4 },

    // Šokolaad ja magusad
    { name: 'Tume šokolaad', emoji: '🍫', unit: 'g', caloriesPerUnit: 5.46, healthiness: 5 },
    { name: 'Piimašokolaad', emoji: '🍫', unit: 'g', caloriesPerUnit: 5.35, healthiness: 3 },
    { name: 'Valge šokolaad', emoji: '🍫', unit: 'g', caloriesPerUnit: 5.39, healthiness: 2 },
    { name: 'Kakaopulber', emoji: '🍫', unit: 'tbsp', caloriesPerUnit: 12, healthiness: 6 },

    // Pähklid ja seemned
    { name: 'Mandlid', emoji: '🌰', unit: 'g', caloriesPerUnit: 5.76, healthiness: 8 },
    { name: 'Kreeka pähklid', emoji: '🌰', unit: 'g', caloriesPerUnit: 6.54, healthiness: 8 },
    { name: 'Sarapuupähklid', emoji: '🌰', unit: 'g', caloriesPerUnit: 6.28, healthiness: 8 },
    { name: 'Maapähklid', emoji: '🥜', unit: 'g', caloriesPerUnit: 5.67, healthiness: 7 },
    { name: 'Maapähklivõi', emoji: '🥜', unit: 'tbsp', caloriesPerUnit: 94, healthiness: 6 },
    { name: 'Kašupähklid', emoji: '🌰', unit: 'g', caloriesPerUnit: 5.53, healthiness: 7 },
    { name: 'Päevalilleseemned', emoji: '🌻', unit: 'g', caloriesPerUnit: 5.84, healthiness: 7 },
    { name: 'Seesamiseemned', emoji: '🌰', unit: 'tbsp', caloriesPerUnit: 52, healthiness: 7 },
    { name: 'Linaseemned', emoji: '🌰', unit: 'tbsp', caloriesPerUnit: 37, healthiness: 9 },
    { name: 'Chia seemned', emoji: '🌰', unit: 'tbsp', caloriesPerUnit: 58, healthiness: 9 },
    { name: 'Kõrvitsaseemned', emoji: '🎃', unit: 'g', caloriesPerUnit: 5.59, healthiness: 8 },

    // Kaunviljad
    { name: 'Herned', emoji: '🫛', unit: 'g', caloriesPerUnit: 0.81, healthiness: 8 },
    { name: 'Kikerhernes', emoji: '🫘', unit: 'g', caloriesPerUnit: 1.64, healthiness: 8 },
    { name: 'Punased oad', emoji: '🫘', unit: 'g', caloriesPerUnit: 1.27, healthiness: 8 },
    { name: 'Valged oad', emoji: '🫘', unit: 'g', caloriesPerUnit: 1.39, healthiness: 8 },
    { name: 'Läätsed', emoji: '🫘', unit: 'g', caloriesPerUnit: 1.16, healthiness: 9 },
    { name: 'Tofu', emoji: '🧈', unit: 'g', caloriesPerUnit: 0.76, healthiness: 8 },

    // Kastmed ja lisandid
    { name: 'Ketšup', emoji: '🍅', unit: 'tbsp', caloriesPerUnit: 17, healthiness: 3 },
    { name: 'Majonees', emoji: '🥚', unit: 'tbsp', caloriesPerUnit: 94, healthiness: 3 },
    { name: 'Sinep', emoji: '🌭', unit: 'tsp', caloriesPerUnit: 3, healthiness: 5 },
    { name: 'Sojakaste', emoji: '🥢', unit: 'tbsp', caloriesPerUnit: 9, healthiness: 4 },
    { name: 'Worcesteri kaste', emoji: '🍾', unit: 'tsp', caloriesPerUnit: 4, healthiness: 4 },
    { name: 'Sriracha', emoji: '🌶️', unit: 'tsp', caloriesPerUnit: 5, healthiness: 5 },
    { name: 'Pesto', emoji: '🌿', unit: 'tbsp', caloriesPerUnit: 80, healthiness: 6 },
    { name: 'Tomatipasta', emoji: '🍅', unit: 'tbsp', caloriesPerUnit: 13, healthiness: 6 },
    { name: 'Tomatikaste', emoji: '🍅', unit: 'tbsp', caloriesPerUnit: 10, healthiness: 6 },
    { name: 'Puljong', emoji: '🍲', unit: 'ml', caloriesPerUnit: 0.05, healthiness: 5 },
    { name: 'Kanakuubik', emoji: '🍗', unit: 'pc', caloriesPerUnit: 11, healthiness: 3 },
    { name: 'Köögiviljapuljong', emoji: '🥕', unit: 'ml', caloriesPerUnit: 0.03, healthiness: 6 },

    // Joogid
    { name: 'Valge vein', emoji: '🍷', unit: 'ml', caloriesPerUnit: 0.82, healthiness: 4 },
    { name: 'Punane vein', emoji: '🍷', unit: 'ml', caloriesPerUnit: 0.85, healthiness: 4 },
    { name: 'Õlu', emoji: '🍺', unit: 'ml', caloriesPerUnit: 0.43, healthiness: 3 },
    { name: 'Kohv', emoji: '☕', unit: 'ml', caloriesPerUnit: 0.01, healthiness: 6 },

    // Küpsetamine
    { name: 'Küpsetuspulber', emoji: '🧁', unit: 'tsp', caloriesPerUnit: 2, healthiness: 5 },
    { name: 'Söögisood', emoji: '🧁', unit: 'tsp', caloriesPerUnit: 0, healthiness: 4 },
    { name: 'Pärm', emoji: '🧁', unit: 'g', caloriesPerUnit: 2.89, healthiness: 6 },
    { name: 'Kuivpärm', emoji: '🧁', unit: 'tsp', caloriesPerUnit: 21, healthiness: 6 },
    { name: 'Želatiin', emoji: '🧁', unit: 'g', caloriesPerUnit: 3.35, healthiness: 5 },

    // Puuvili kuivatatud
    { name: 'Rosinad', emoji: '🍇', unit: 'g', caloriesPerUnit: 2.99, healthiness: 6 },
    { name: 'Kuivatatud aprikoosid', emoji: '🍑', unit: 'g', caloriesPerUnit: 2.41, healthiness: 6 },
    { name: 'Kuivatatud ploomid', emoji: '🫐', unit: 'g', caloriesPerUnit: 2.40, healthiness: 6 },
    { name: 'Kuivatatud jõhvikad', emoji: '🍇', unit: 'g', caloriesPerUnit: 3.08, healthiness: 5 },
    { name: 'Tatra', emoji: '🟤', unit: 'g', caloriesPerUnit: 3.43, healthiness: 7 },
    { name: 'Kookoshelbed', emoji: '🥥', unit: 'g', caloriesPerUnit: 6.50, healthiness: 5 },
];

export async function seedTestData() {
    const ingredientsStore = useIngredientsStore.getState();
    const recipesStore = useRecipesStore.getState();

    // Only seed if no data exists
    if (ingredientsStore.ingredients.length > 0) {
        console.log('Data already exists, skipping seed');
        return false;
    }

    console.log('Seeding test data...');

    // Add ingredients and collect their IDs
    const ingredientIds = {};
    for (const ing of TEST_INGREDIENTS) {
        const added = await ingredientsStore.addIngredient(ing);
        ingredientIds[ing.name] = added.id;
    }

    // Test recipes
    const TEST_RECIPES = [
        {
            title: 'Vanaema kartulisalat',
            description: 'Klassikaline Eesti kartulisalat, mis sobib igale peole.',
            course: 'side',
            servings: 4,
            prepTime: 20,
            cookTime: 25,
            ingredients: [
                { ingredientId: ingredientIds['Kartul'], amount: 500, notes: 'keedetud' },
                { ingredientId: ingredientIds['Muna'], amount: 4, notes: 'kõvaks keedetud' },
                { ingredientId: ingredientIds['Punane sibul'], amount: 1, notes: 'peeneks hakitud' },
                { ingredientId: ingredientIds['Marineeritud kurk'], amount: 100, notes: '' },
                { ingredientId: ingredientIds['Hapukoor 20%'], amount: 100, notes: '' },
                { ingredientId: ingredientIds['Sool'], amount: 1, notes: '' },
            ],
            instructions: [
                'Keeda kartulid ja munad kõvaks.',
                'Lase jahtuda ja koori.',
                'Lõika kartulid ja munad kuubikuteks.',
                'Lisa sibul ja kurk.',
                'Sega koorega ja maitsesta soolaga.',
            ],
            tips: [
                'Kasuta uusi kartuleid parema tekstuuri saamiseks.',
                'Lase salatil vähemalt tund aega maitsestuda.',
            ],
        },
        {
            title: 'Kana karriga',
            description: 'Kreemjas ja maitsev kana karrikastmes.',
            course: 'main',
            servings: 4,
            prepTime: 15,
            cookTime: 30,
            ingredients: [
                { ingredientId: ingredientIds['Kanafilee'], amount: 500, notes: 'kuubikuteks' },
                { ingredientId: ingredientIds['Sibul'], amount: 2, notes: '' },
                { ingredientId: ingredientIds['Küüslauk'], amount: 3, notes: '' },
                { ingredientId: ingredientIds['Koor 20%'], amount: 200, notes: '' },
                { ingredientId: ingredientIds['Oliiviõli'], amount: 2, notes: '' },
                { ingredientId: ingredientIds['Karripulber'], amount: 2, notes: '' },
                { ingredientId: ingredientIds['Sool'], amount: 1, notes: '' },
            ],
            instructions: [
                'Lõika kana kuubikuteks ja maitsesta.',
                'Kuumuta pannil õli ja pruunista kana.',
                'Lisa sibul ja küüslauk, prae 2 minutit.',
                'Lisa karripulber ja sega.',
                'Vala peale koor ja keeda 10 minutit.',
            ],
            tips: [
                'Serveeri basmati riisiga.',
                'Lisa värskeid koriandrilehti serveerimise eel.',
            ],
        },
        {
            title: 'Tomati-mozzarella salat',
            description: 'Lihtne ja tervislik Caprese stiilis salat.',
            course: 'appetizer',
            servings: 2,
            prepTime: 10,
            cookTime: 0,
            ingredients: [
                { ingredientId: ingredientIds['Tomat'], amount: 300, notes: 'viilutatud' },
                { ingredientId: ingredientIds['Mozzarella'], amount: 150, notes: '' },
                { ingredientId: ingredientIds['Oliiviõli'], amount: 2, notes: '' },
                { ingredientId: ingredientIds['Värske basiilik'], amount: 10, notes: '' },
                { ingredientId: ingredientIds['Sool'], amount: 0.5, notes: '' },
                { ingredientId: ingredientIds['Must pipar'], amount: 0.5, notes: '' },
            ],
            instructions: [
                'Lõika tomatid ja mozzarella viiludeks.',
                'Aseta vaheldumisi taldrikule.',
                'Puista peale värske basiilik.',
                'Piserdab oliiviõliga.',
                'Maitsesta soola ja pipraga.',
            ],
            tips: [
                'Kasuta toatasoojusele toodud tomateid.',
                'Balsamico äädikas sobib suurepäraselt.',
            ],
            isFavorite: true,
        },
        {
            title: 'Šokolaadisufleed',
            description: 'Sametine šokolaadimagustoit vedela südamikuga.',
            course: 'dessert',
            servings: 4,
            prepTime: 15,
            cookTime: 12,
            ingredients: [
                { ingredientId: ingredientIds['Tume šokolaad'], amount: 200, notes: '' },
                { ingredientId: ingredientIds['Või'], amount: 100, notes: '' },
                { ingredientId: ingredientIds['Muna'], amount: 4, notes: '' },
                { ingredientId: ingredientIds['Suhkur'], amount: 50, notes: '' },
                { ingredientId: ingredientIds['Nisujahu'], amount: 30, notes: '' },
            ],
            instructions: [
                'Sulata šokolaad ja või vesivannil.',
                'Eralda munadest kollased.',
                'Vahusta munakollased ja suhkur kergeks.',
                'Lisa šokolaadisegu ja jahu.',
                'Vala vormidesse ja küpseta 180°C 12 minutit.',
            ],
            tips: [
                'Vormid määri võiga ja puista kakaoga.',
                'Serveeri kohe, ära lase jahtuda!',
            ],
        },
        {
            title: 'Lõhefilee ahjus',
            description: 'Mahlane lõhe küüslaugu ja sidruniga.',
            course: 'main',
            servings: 2,
            prepTime: 10,
            cookTime: 20,
            ingredients: [
                { ingredientId: ingredientIds['Lõhe'], amount: 300, notes: 'fileed' },
                { ingredientId: ingredientIds['Küüslauk'], amount: 2, notes: 'purustatud' },
                { ingredientId: ingredientIds['Sidrun'], amount: 1, notes: '' },
                { ingredientId: ingredientIds['Oliiviõli'], amount: 1, notes: '' },
                { ingredientId: ingredientIds['Värske till'], amount: 10, notes: '' },
                { ingredientId: ingredientIds['Sool'], amount: 0.5, notes: '' },
                { ingredientId: ingredientIds['Must pipar'], amount: 0.5, notes: '' },
            ],
            instructions: [
                'Eelsoojenda ahi 200°C.',
                'Aseta lõhe küpsetuspaberile.',
                'Kata küüslaugu, sidruniviilud ja oliiviõliga.',
                'Maitsesta soola ja pipraga.',
                'Küpseta 18-20 minutit.',
                'Kaunista tilliga.',
            ],
            tips: [
                'Lisa sparglid samale ahjuplaadile.',
                'Ära küpseta liiga kaua - lõhe kuivab.',
            ],
            isFavorite: true,
        },
        {
            title: 'Pannkoogid',
            description: 'Klassikalised Eesti pannkoogid, õhukesed ja maitsvad.',
            course: 'breakfast',
            servings: 4,
            prepTime: 10,
            cookTime: 20,
            ingredients: [
                { ingredientId: ingredientIds['Nisujahu'], amount: 200, notes: '' },
                { ingredientId: ingredientIds['Piim 2.5%'], amount: 500, notes: '' },
                { ingredientId: ingredientIds['Muna'], amount: 2, notes: '' },
                { ingredientId: ingredientIds['Suhkur'], amount: 30, notes: '' },
                { ingredientId: ingredientIds['Sool'], amount: 0.5, notes: '' },
                { ingredientId: ingredientIds['Või'], amount: 30, notes: 'sulatatud' },
            ],
            instructions: [
                'Sega jahu, suhkur ja sool.',
                'Lisa munad ja pool piimast, sega siledaks.',
                'Lisa ülejäänud piim ja sulatatud või.',
                'Küpseta kuumal pannil mõlemalt poolt.',
            ],
            tips: [
                'Lase taignal 30 min seista.',
                'Serveeri moosiga või Nutellaga.',
            ],
        },
        {
            title: 'Köögiviljasupp',
            description: 'Tervislik ja toitev köögiviljasupp.',
            course: 'soup',
            servings: 6,
            prepTime: 15,
            cookTime: 30,
            ingredients: [
                { ingredientId: ingredientIds['Kartul'], amount: 300, notes: 'kuubikuteks' },
                { ingredientId: ingredientIds['Porgand'], amount: 200, notes: 'viilutatud' },
                { ingredientId: ingredientIds['Sibul'], amount: 1, notes: '' },
                { ingredientId: ingredientIds['Küüslauk'], amount: 2, notes: '' },
                { ingredientId: ingredientIds['Brokkoli'], amount: 200, notes: '' },
                { ingredientId: ingredientIds['Köögiviljapuljong'], amount: 1500, notes: '' },
                { ingredientId: ingredientIds['Sool'], amount: 1, notes: '' },
                { ingredientId: ingredientIds['Must pipar'], amount: 0.5, notes: '' },
            ],
            instructions: [
                'Kuumuta potis õli ja prae sibul pehmeks.',
                'Lisa küüslauk ja prae 1 minut.',
                'Lisa kartul, porgand ja puljong.',
                'Keeda 15 minutit.',
                'Lisa brokkoli ja keeda veel 10 minutit.',
                'Maitsesta soola ja pipraga.',
            ],
            tips: [
                'Lisa lõpus värskeid ürte.',
                'Sobib hästi leivaga.',
            ],
        },
        {
            title: 'Banaani-kaerapannkoogid',
            description: 'Tervislik hommikusöögi variant ilma jahuta.',
            course: 'breakfast',
            servings: 2,
            prepTime: 5,
            cookTime: 10,
            ingredients: [
                { ingredientId: ingredientIds['Banaan'], amount: 2, notes: 'küpsed' },
                { ingredientId: ingredientIds['Muna'], amount: 2, notes: '' },
                { ingredientId: ingredientIds['Kaerahelbed'], amount: 50, notes: '' },
                { ingredientId: ingredientIds['Mesi'], amount: 1, notes: '' },
                { ingredientId: ingredientIds['Kaneel'], amount: 0.5, notes: '' },
            ],
            instructions: [
                'Muljuge banaanid kahvliga sileaks.',
                'Segage munad ja kaerahelbed juurde.',
                'Lisa kaneel.',
                'Küpsetage kuumal pannil 2-3 min mõlemalt poolt.',
                'Niisutage meega.',
            ],
            tips: [
                'Päris küpsed banaanid annavad parima maitse.',
                'Lisa mustikaid või maasikaid peale.',
            ],
        },
        {
            title: 'Kreeka salat',
            description: 'Värske ja kerge Vahemere salat.',
            course: 'appetizer',
            servings: 4,
            prepTime: 15,
            cookTime: 0,
            ingredients: [
                { ingredientId: ingredientIds['Kurk'], amount: 200, notes: 'kuubikuteks' },
                { ingredientId: ingredientIds['Tomat'], amount: 200, notes: 'kuubikuteks' },
                { ingredientId: ingredientIds['Punane sibul'], amount: 0.5, notes: 'viilutatud' },
                { ingredientId: ingredientIds['Paprika'], amount: 1, notes: 'kuubikuteks' },
                { ingredientId: ingredientIds['Feta'], amount: 150, notes: '' },
                { ingredientId: ingredientIds['Oliiviõli'], amount: 3, notes: '' },
                { ingredientId: ingredientIds['Oregano'], amount: 1, notes: '' },
                { ingredientId: ingredientIds['Sool'], amount: 0.5, notes: '' },
            ],
            instructions: [
                'Lõika köögiviljad kuubikuteks.',
                'Aseta suurde kaussi.',
                'Lisa feta tükid peale.',
                'Maitsesta oliiviõli, oregano ja soolaga.',
                'Sega õrnalt läbi.',
            ],
            tips: [
                'Lisa kalamataoliive autentsema maitse jaoks.',
                'Serveeri kohe pärast valmistamist.',
            ],
        },
        {
            title: 'Spagetid bolognese',
            description: 'Klassikaline Itaalia lihakastmega pasta.',
            course: 'main',
            servings: 4,
            prepTime: 15,
            cookTime: 45,
            ingredients: [
                { ingredientId: ingredientIds['Spagetid'], amount: 400, notes: '' },
                { ingredientId: ingredientIds['Hakkliha veise'], amount: 500, notes: '' },
                { ingredientId: ingredientIds['Sibul'], amount: 1, notes: 'peeneks' },
                { ingredientId: ingredientIds['Porgand'], amount: 1, notes: 'riivitud' },
                { ingredientId: ingredientIds['Küüslauk'], amount: 3, notes: '' },
                { ingredientId: ingredientIds['Tomatipasta'], amount: 2, notes: '' },
                { ingredientId: ingredientIds['Tomatikaste'], amount: 400, notes: '' },
                { ingredientId: ingredientIds['Punane vein'], amount: 100, notes: '' },
                { ingredientId: ingredientIds['Oregano'], amount: 1, notes: '' },
                { ingredientId: ingredientIds['Basiilik'], amount: 1, notes: '' },
                { ingredientId: ingredientIds['Parmesani juust'], amount: 50, notes: 'riivitud' },
            ],
            instructions: [
                'Prae sibul ja porgand õlis pehmeks.',
                'Lisa hakkliha ja pruunista.',
                'Lisa küüslauk ja tomatipasta.',
                'Vala peale vein ja lase aurustuda.',
                'Lisa tomatikaste ja maitseained.',
                'Hauta vaikselt 30 minutit.',
                'Keeda pasta ja serveeri kastmega.',
                'Puista parmesani.',
            ],
            tips: [
                'Mida kauem haudud, seda parem!',
                'Lisa soovi korral vähe suhkrut happuse vähendamiseks.',
            ],
        },
    ];

    // Add recipes
    for (const recipe of TEST_RECIPES) {
        await recipesStore.addRecipe(recipe);
    }

    console.log('Test data seeded successfully!');
    return true;
}
