import { useIngredientsStore, useRecipesStore } from './store';

// Comprehensive test ingredients - Estonian cuisine focused
const TEST_INGREDIENTS = [
    // Köögiviljad
    { name: 'Kartul', emoji: '🥔', unit: 'g', caloriesPerUnit: 0.77, healthiness: 6, category: 'vegetables' }, // 77kcal/100g
    { name: 'Sibul', emoji: '🧅', unit: 'pc', caloriesPerUnit: 40, healthiness: 7, category: 'vegetables' }, // ~40kcal/tk
    { name: 'Punane sibul', emoji: '🧅', unit: 'pc', caloriesPerUnit: 40, healthiness: 8, category: 'vegetables' },
    { name: 'Porrulauk', emoji: '🧅', unit: 'pc', caloriesPerUnit: 54, healthiness: 8, category: 'vegetables' },
    { name: 'Šalott', emoji: '🧅', unit: 'pc', caloriesPerUnit: 7, healthiness: 8, category: 'vegetables' },
    { name: 'Porgand', emoji: '🥕', unit: 'g', caloriesPerUnit: 0.41, healthiness: 9, category: 'vegetables' }, // 41kcal/100g
    { name: 'Tomat', emoji: '🍅', unit: 'g', caloriesPerUnit: 0.18, healthiness: 9, category: 'vegetables' }, // 18kcal/100g
    { name: 'Kirsstomat', emoji: '🍅', unit: 'g', caloriesPerUnit: 0.18, healthiness: 9, category: 'vegetables' },
    { name: 'Kurk', emoji: '🥒', unit: 'g', caloriesPerUnit: 0.15, healthiness: 9, category: 'vegetables' }, // 15kcal/100g
    { name: 'Marineeritud kurk', emoji: '🥒', unit: 'g', caloriesPerUnit: 0.11, healthiness: 6, category: 'vegetables' },
    { name: 'Paprika', emoji: '🫑', unit: 'pc', caloriesPerUnit: 31, healthiness: 9, category: 'vegetables' }, // ~31kcal/tk
    { name: 'Küüslauk', emoji: '🧄', unit: 'pc', caloriesPerUnit: 4, healthiness: 9, category: 'vegetables' }, // ~4kcal/küüs
    { name: 'Spinat', emoji: '🥬', unit: 'g', caloriesPerUnit: 0.23, healthiness: 10, category: 'vegetables' }, // 23kcal/100g
    { name: 'Brokkoli', emoji: '🥦', unit: 'g', caloriesPerUnit: 0.34, healthiness: 10, category: 'vegetables' }, // 34kcal/100g
    { name: 'Lillkapsas', emoji: '🥦', unit: 'g', caloriesPerUnit: 0.25, healthiness: 9, category: 'vegetables' }, // 25kcal/100g
    { name: 'Kapsas', emoji: '🥬', unit: 'g', caloriesPerUnit: 0.25, healthiness: 9, category: 'vegetables' },
    { name: 'Hapukapsas', emoji: '🥬', unit: 'g', caloriesPerUnit: 0.19, healthiness: 8, category: 'vegetables' },
    { name: 'Peet', emoji: '🍠', unit: 'g', caloriesPerUnit: 0.43, healthiness: 8, category: 'vegetables' },
    { name: 'Seller', emoji: '🥬', unit: 'pc', caloriesPerUnit: 6, healthiness: 9, category: 'vegetables' },
    { name: 'Suvikõrvits', emoji: '🥒', unit: 'g', caloriesPerUnit: 0.17, healthiness: 9, category: 'vegetables' },
    { name: 'Baklažaan', emoji: '🍆', unit: 'pc', caloriesPerUnit: 35, healthiness: 8, category: 'vegetables' },
    { name: 'Seened', emoji: '🍄', unit: 'g', caloriesPerUnit: 0.22, healthiness: 8, category: 'vegetables' },
    { name: 'Šampinjonid', emoji: '🍄', unit: 'g', caloriesPerUnit: 0.22, healthiness: 8, category: 'vegetables' },
    { name: 'Redis', emoji: '🥬', unit: 'pc', caloriesPerUnit: 1, healthiness: 9, category: 'vegetables' },
    { name: 'Avokaado', emoji: '🥑', unit: 'pc', caloriesPerUnit: 240, healthiness: 9, category: 'vegetables' }, // ~240kcal/tk

    // Puuviljad
    { name: 'Õun', emoji: '🍎', unit: 'pc', caloriesPerUnit: 95, healthiness: 9, category: 'fruits' }, // ~95kcal/tk
    { name: 'Banaan', emoji: '🍌', unit: 'pc', caloriesPerUnit: 105, healthiness: 7, category: 'fruits' }, // ~105kcal/tk
    { name: 'Sidrun', emoji: '🍋', unit: 'pc', caloriesPerUnit: 17, healthiness: 8, category: 'fruits' },
    { name: 'Laim', emoji: '🍋', unit: 'pc', caloriesPerUnit: 20, healthiness: 8, category: 'fruits' },
    { name: 'Apelsin', emoji: '🍊', unit: 'pc', caloriesPerUnit: 62, healthiness: 9, category: 'fruits' },
    { name: 'Maasikad', emoji: '🍓', unit: 'g', caloriesPerUnit: 0.32, healthiness: 9, category: 'fruits' },
    { name: 'Mustikad', emoji: '🫐', unit: 'g', caloriesPerUnit: 0.57, healthiness: 10, category: 'fruits' },
    { name: 'Vaarikad', emoji: '🍇', unit: 'g', caloriesPerUnit: 0.52, healthiness: 9, category: 'fruits' },
    { name: 'Viinamarjad', emoji: '🍇', unit: 'g', caloriesPerUnit: 0.69, healthiness: 7, category: 'fruits' },
    { name: 'Pirn', emoji: '🍐', unit: 'pc', caloriesPerUnit: 102, healthiness: 8, category: 'fruits' },
    { name: 'Ananass', emoji: '🍍', unit: 'g', caloriesPerUnit: 0.50, healthiness: 8, category: 'fruits' },
    { name: 'Mango', emoji: '🥭', unit: 'pc', caloriesPerUnit: 202, healthiness: 8, category: 'fruits' },

    // Liha
    { name: 'Kanafilee', emoji: '🍗', unit: 'g', caloriesPerUnit: 1.65, healthiness: 8, category: 'meat' }, // 165kcal/100g
    { name: 'Kanakoivad', emoji: '🍗', unit: 'pc', caloriesPerUnit: 180, healthiness: 7, category: 'meat' },
    { name: 'Kanatiivad', emoji: '🍗', unit: 'pc', caloriesPerUnit: 80, healthiness: 6, category: 'meat' },
    { name: 'Hakkliha sega', emoji: '🥩', unit: 'g', caloriesPerUnit: 2.32, healthiness: 5, category: 'meat' }, // 232kcal/100g
    { name: 'Hakkliha veise', emoji: '🥩', unit: 'g', caloriesPerUnit: 2.54, healthiness: 5, category: 'meat' },
    { name: 'Sealiha', emoji: '🥩', unit: 'g', caloriesPerUnit: 2.42, healthiness: 5, category: 'meat' },
    { name: 'Seakarbonaad', emoji: '🥩', unit: 'g', caloriesPerUnit: 1.43, healthiness: 6, category: 'meat' },
    { name: 'Veiseliha', emoji: '🥩', unit: 'g', caloriesPerUnit: 2.50, healthiness: 6, category: 'meat' },
    { name: 'Lambaliha', emoji: '🍖', unit: 'g', caloriesPerUnit: 2.94, healthiness: 6, category: 'meat' },
    { name: 'Peekon', emoji: '🥓', unit: 'g', caloriesPerUnit: 5.41, healthiness: 3, category: 'meat' },
    { name: 'Sink', emoji: '🥓', unit: 'g', caloriesPerUnit: 1.45, healthiness: 4, category: 'meat' },
    { name: 'Vorst', emoji: '🌭', unit: 'g', caloriesPerUnit: 3.01, healthiness: 3, category: 'meat' },
    { name: 'Suitsuvorst', emoji: '🌭', unit: 'g', caloriesPerUnit: 2.89, healthiness: 3, category: 'meat' },

    // Kala ja mereannid
    { name: 'Lõhe', emoji: '🐟', unit: 'g', caloriesPerUnit: 2.08, healthiness: 9, category: 'fish' }, // 208kcal/100g
    { name: 'Suitsulõhe', emoji: '🐟', unit: 'g', caloriesPerUnit: 1.17, healthiness: 8, category: 'fish' },
    { name: 'Forell', emoji: '🐟', unit: 'g', caloriesPerUnit: 1.48, healthiness: 9, category: 'fish' },
    { name: 'Tursafilee', emoji: '🐟', unit: 'g', caloriesPerUnit: 0.82, healthiness: 9, category: 'fish' },
    { name: 'Räim', emoji: '🐟', unit: 'g', caloriesPerUnit: 2.03, healthiness: 8, category: 'fish' },
    { name: 'Kilu', emoji: '🐟', unit: 'g', caloriesPerUnit: 2.17, healthiness: 7, category: 'fish' },
    { name: 'Krevetid', emoji: '🦐', unit: 'g', caloriesPerUnit: 0.99, healthiness: 9, category: 'fish' },
    { name: 'Tuunikala', emoji: '🐟', unit: 'g', caloriesPerUnit: 1.32, healthiness: 9, category: 'fish' },

    // Piimatooted
    { name: 'Piim 2.5%', emoji: '🥛', unit: 'ml', caloriesPerUnit: 0.50, healthiness: 7, category: 'dairy' },
    { name: 'Piim 3.5%', emoji: '🥛', unit: 'ml', caloriesPerUnit: 0.64, healthiness: 6, category: 'dairy' },
    { name: 'Täispiim', emoji: '🥛', unit: 'ml', caloriesPerUnit: 0.62, healthiness: 6, category: 'dairy' },
    { name: 'Laktoosivaba piim', emoji: '🥛', unit: 'ml', caloriesPerUnit: 0.46, healthiness: 7, category: 'dairy' },
    { name: 'Kaerapiim', emoji: '🥛', unit: 'ml', caloriesPerUnit: 0.43, healthiness: 7, category: 'dairy' },
    { name: 'Mandelpiim', emoji: '🥛', unit: 'ml', caloriesPerUnit: 0.15, healthiness: 8, category: 'dairy' },
    { name: 'Kookospiim', emoji: '🥥', unit: 'ml', caloriesPerUnit: 1.97, healthiness: 6, category: 'dairy' },
    { name: 'Koor 10%', emoji: '🥛', unit: 'ml', caloriesPerUnit: 1.19, healthiness: 5, category: 'dairy' },
    { name: 'Koor 20%', emoji: '🥛', unit: 'ml', caloriesPerUnit: 2.05, healthiness: 4, category: 'dairy' },
    { name: 'Koor 35%', emoji: '🥛', unit: 'ml', caloriesPerUnit: 3.40, healthiness: 4, category: 'dairy' },
    { name: 'Vahukoor', emoji: '🥛', unit: 'ml', caloriesPerUnit: 3.45, healthiness: 3, category: 'dairy' },
    { name: 'Hapukoor 20%', emoji: '🥛', unit: 'ml', caloriesPerUnit: 2.04, healthiness: 5, category: 'dairy' },
    { name: 'Kreeka jogurt', emoji: '🥛', unit: 'g', caloriesPerUnit: 0.97, healthiness: 9, category: 'dairy' }, // 97kcal/100g
    { name: 'Maitsestamata jogurt', emoji: '🥛', unit: 'g', caloriesPerUnit: 0.59, healthiness: 8, category: 'dairy' },
    { name: 'Kohupiim', emoji: '🧀', unit: 'g', caloriesPerUnit: 0.98, healthiness: 9, category: 'dairy' },
    { name: 'Toorjuust', emoji: '🧀', unit: 'g', caloriesPerUnit: 3.42, healthiness: 5, category: 'dairy' },
    { name: 'Või', emoji: '🧈', unit: 'g', caloriesPerUnit: 7.17, healthiness: 3, category: 'dairy' },
    { name: 'Margariin', emoji: '🧈', unit: 'g', caloriesPerUnit: 7.19, healthiness: 2, category: 'dairy' },
    { name: 'Juust', emoji: '🧀', unit: 'g', caloriesPerUnit: 4.02, healthiness: 5, category: 'dairy' },
    { name: 'Cheddar', emoji: '🧀', unit: 'g', caloriesPerUnit: 4.03, healthiness: 5, category: 'dairy' },
    { name: 'Mozzarella', emoji: '🧀', unit: 'g', caloriesPerUnit: 2.80, healthiness: 7, category: 'dairy' },
    { name: 'Parmesani juust', emoji: '🧀', unit: 'g', caloriesPerUnit: 4.31, healthiness: 5, category: 'dairy' },
    { name: 'Feta', emoji: '🧀', unit: 'g', caloriesPerUnit: 2.64, healthiness: 6, category: 'dairy' },

    // Munad
    { name: 'Muna', emoji: '🥚', unit: 'pc', caloriesPerUnit: 72, healthiness: 8, category: 'dairy' }, // ~72kcal/tk
    { name: 'Munakollane', emoji: '🥚', unit: 'pc', caloriesPerUnit: 55, healthiness: 6, category: 'dairy' },
    { name: 'Munavalge', emoji: '🥚', unit: 'pc', caloriesPerUnit: 17, healthiness: 9, category: 'dairy' },

    // Jahud ja teravili
    { name: 'Nisujahu', emoji: '🌾', unit: 'g', caloriesPerUnit: 3.64, healthiness: 4, category: 'grains' },
    { name: 'Täisteranisujahu', emoji: '🌾', unit: 'g', caloriesPerUnit: 3.40, healthiness: 7, category: 'grains' },
    { name: 'Kaerajahu', emoji: '🌾', unit: 'g', caloriesPerUnit: 3.89, healthiness: 8, category: 'grains' },
    { name: 'Riis', emoji: '🍚', unit: 'g', caloriesPerUnit: 3.60, healthiness: 6, category: 'grains' }, // kuivaine
    { name: 'Pruun riis', emoji: '🍚', unit: 'g', caloriesPerUnit: 3.50, healthiness: 8, category: 'grains' },
    { name: 'Spagetid', emoji: '🍝', unit: 'g', caloriesPerUnit: 3.60, healthiness: 5, category: 'grains' }, // kuivaine
    { name: 'Täisterapasta', emoji: '🍝', unit: 'g', caloriesPerUnit: 3.50, healthiness: 7, category: 'grains' },
    { name: 'Kinoa', emoji: '🌾', unit: 'g', caloriesPerUnit: 3.68, healthiness: 9, category: 'grains' }, // kuivaine
    { name: 'Tatar', emoji: '🌾', unit: 'g', caloriesPerUnit: 3.43, healthiness: 9, category: 'grains' }, // kuivaine
    { name: 'Kaerahelbed', emoji: '🌾', unit: 'g', caloriesPerUnit: 3.89, healthiness: 9, category: 'grains' }, // kuivaine
    { name: 'Leib', emoji: '🍞', unit: 'pc', caloriesPerUnit: 79, healthiness: 6, category: 'grains' },
    { name: 'Sai', emoji: '🥖', unit: 'pc', caloriesPerUnit: 120, healthiness: 4, category: 'grains' },

    // Maitseained
    { name: 'Sool', emoji: '🧂', unit: 'tsp', caloriesPerUnit: 0, healthiness: 4, category: 'spices' },
    { name: 'Must pipar', emoji: '🌶️', unit: 'tsp', caloriesPerUnit: 6, healthiness: 7, category: 'spices' },
    { name: 'Basiilik', emoji: '🌿', unit: 'tsp', caloriesPerUnit: 1, healthiness: 9, category: 'spices' },
    { name: 'Oregano', emoji: '🌿', unit: 'tsp', caloriesPerUnit: 3, healthiness: 9, category: 'spices' },
    { name: 'Kaneel', emoji: '🌰', unit: 'tsp', caloriesPerUnit: 6, healthiness: 8, category: 'spices' },

    // Õlid ja rasvad
    { name: 'Oliiviõli', emoji: '🫒', unit: 'tbsp', caloriesPerUnit: 119, healthiness: 8, category: 'oils' }, // 119kcal/sl
    { name: 'Oliiviõli (extra virgin)', emoji: '🫒', unit: 'tbsp', caloriesPerUnit: 119, healthiness: 9, category: 'oils' },
    { name: 'Rapsiõli', emoji: '🫒', unit: 'tbsp', caloriesPerUnit: 120, healthiness: 7, category: 'oils' },
    { name: 'Kookosõli', emoji: '🥥', unit: 'tbsp', caloriesPerUnit: 121, healthiness: 5, category: 'oils' },
    { name: 'Seesamiõli', emoji: '🫒', unit: 'tbsp', caloriesPerUnit: 120, healthiness: 7, category: 'oils' },
    { name: 'Avokaadoõli', emoji: '🥑', unit: 'tbsp', caloriesPerUnit: 124, healthiness: 9, category: 'oils' },
    { name: 'Päevalilleõli', emoji: '🌻', unit: 'tbsp', caloriesPerUnit: 120, healthiness: 6, category: 'oils' },
    { name: 'Maisõli', emoji: '🌽', unit: 'tbsp', caloriesPerUnit: 122, healthiness: 5, category: 'oils' },
    { name: 'Linaseemneõli', emoji: '🌰', unit: 'tbsp', caloriesPerUnit: 120, healthiness: 9, category: 'oils' },
    { name: 'Kanepiseemneõli', emoji: '🌿', unit: 'tbsp', caloriesPerUnit: 126, healthiness: 9, category: 'oils' },
    { name: 'Kõrvitsaseemneõli', emoji: '🎃', unit: 'tbsp', caloriesPerUnit: 120, healthiness: 8, category: 'oils' },
    { name: 'Pähkliõli (kreeka)', emoji: '🌰', unit: 'tbsp', caloriesPerUnit: 120, healthiness: 8, category: 'oils' },
    { name: 'Mandeliõli', emoji: '🌰', unit: 'tbsp', caloriesPerUnit: 119, healthiness: 8, category: 'oils' },
    { name: 'Sarapuuõli', emoji: '🌰', unit: 'tbsp', caloriesPerUnit: 120, healthiness: 7, category: 'oils' },
    { name: 'Maapähkliõli', emoji: '🥜', unit: 'tbsp', caloriesPerUnit: 119, healthiness: 7, category: 'oils' },
    { name: 'Gränola õli (viinimarjakivid)', emoji: '🍇', unit: 'tbsp', caloriesPerUnit: 120, healthiness: 7, category: 'oils' },
    { name: 'MCTТ õli', emoji: '🥥', unit: 'tbsp', caloriesPerUnit: 115, healthiness: 7, category: 'oils' },
    { name: 'Põldsinep õli', emoji: '🌻', unit: 'tbsp', caloriesPerUnit: 124, healthiness: 6, category: 'oils' },
    { name: 'Sojaõli', emoji: '🫘', unit: 'tbsp', caloriesPerUnit: 120, healthiness: 6, category: 'oils' },
    { name: 'Palmõli', emoji: '🌴', unit: 'tbsp', caloriesPerUnit: 120, healthiness: 4, category: 'oils' },
    { name: 'Sealiha rasv (tõmme)', emoji: '🥓', unit: 'tbsp', caloriesPerUnit: 115, healthiness: 3, category: 'oils' },
    { name: 'Praadimisrasv', emoji: '🧈', unit: 'tbsp', caloriesPerUnit: 110, healthiness: 2, category: 'oils' },

    // Magusained
    { name: 'Suhkur', emoji: '🍬', unit: 'g', caloriesPerUnit: 3.87, healthiness: 2, category: 'sweeteners' },
    { name: 'Mesi', emoji: '🍯', unit: 'tbsp', caloriesPerUnit: 64, healthiness: 6, category: 'sweeteners' },
    { name: 'Vahtrasiirup', emoji: '🍁', unit: 'tbsp', caloriesPerUnit: 52, healthiness: 5, category: 'sweeteners' },

    // Pähklid ja seemned
    { name: 'Mandlid', emoji: '🌰', unit: 'g', caloriesPerUnit: 5.76, healthiness: 9, category: 'nuts' },
    { name: 'Kreeka pähklid', emoji: '🌰', unit: 'g', caloriesPerUnit: 6.54, healthiness: 9, category: 'nuts' },
    { name: 'Chia seemned', emoji: '🌰', unit: 'tbsp', caloriesPerUnit: 58, healthiness: 10, category: 'nuts' },

    // Kaunviljad
    { name: 'Kikerhernes', emoji: '🫘', unit: 'g', caloriesPerUnit: 1.64, healthiness: 9, category: 'legumes' }, // keedetud/konserv
    { name: 'Läätsed', emoji: '🫘', unit: 'g', caloriesPerUnit: 1.16, healthiness: 10, category: 'legumes' }, // keedetud
    { name: 'Punased oad', emoji: '🫘', unit: 'g', caloriesPerUnit: 1.27, healthiness: 9, category: 'legumes' }, // keedetud/konserv
    { name: 'Punaläätsed', emoji: '🫘', unit: 'g', caloriesPerUnit: 1.16, healthiness: 10, category: 'legumes' },
    { name: 'Edamame', emoji: '🫘', unit: 'g', caloriesPerUnit: 1.21, healthiness: 10, category: 'legumes' },

    // Taimne valk
    { name: 'Tofu', emoji: '🧈', unit: 'g', caloriesPerUnit: 0.76, healthiness: 9, category: 'legumes' },

    // Lisavajalikud koostisosad (retseptide jaoks)
    { name: 'Ingver', emoji: '🌿', unit: 'g', caloriesPerUnit: 0.80, healthiness: 9, category: 'spices' },
    { name: 'Heeringas', emoji: '🐟', unit: 'g', caloriesPerUnit: 2.03, healthiness: 8, category: 'fish' },
    { name: 'Kalkuniliha', emoji: '🍗', unit: 'g', caloriesPerUnit: 1.89, healthiness: 8, category: 'meat' },
    { name: 'Bulgur', emoji: '🌾', unit: 'g', caloriesPerUnit: 3.42, healthiness: 8, category: 'grains' },
    { name: 'Riisi nuudlid', emoji: '🍜', unit: 'g', caloriesPerUnit: 3.60, healthiness: 6, category: 'grains' },
    { name: 'Pasta', emoji: '🍝', unit: 'g', caloriesPerUnit: 3.60, healthiness: 5, category: 'grains' },
    { name: 'Parmesaan', emoji: '🧀', unit: 'g', caloriesPerUnit: 4.31, healthiness: 5, category: 'dairy' },
    { name: 'Piim', emoji: '🥛', unit: 'ml', caloriesPerUnit: 0.50, healthiness: 7, category: 'dairy' },
    { name: 'Kodujuust', emoji: '🧀', unit: 'g', caloriesPerUnit: 0.98, healthiness: 9, category: 'dairy' },
    { name: 'Pipar', emoji: '🌶️', unit: 'tsp', caloriesPerUnit: 6, healthiness: 7, category: 'spices' },
    { name: 'Vanilliekstrakt', emoji: '🌿', unit: 'tsp', caloriesPerUnit: 12, healthiness: 5, category: 'spices' },
    { name: 'Paprikapulber', emoji: '🌶️', unit: 'tsp', caloriesPerUnit: 6, healthiness: 8, category: 'spices' },
    { name: 'Maapähklivõi', emoji: '🥜', unit: 'tbsp', caloriesPerUnit: 94, healthiness: 7, category: 'nuts' },
    { name: 'Seesamiõli', emoji: '🫒', unit: 'tbsp', caloriesPerUnit: 120, healthiness: 7, category: 'oils' },

    // UUED KÖÖGIVILJAD
    { name: 'Lehtkapsas', emoji: '🥬', unit: 'g', caloriesPerUnit: 0.49, healthiness: 10, category: 'vegetables' },
    { name: 'Kohlrabi', emoji: '🥦', unit: 'g', caloriesPerUnit: 0.27, healthiness: 9, category: 'vegetables' },
    { name: 'Rukola', emoji: '🥬', unit: 'g', caloriesPerUnit: 0.25, healthiness: 9, category: 'vegetables' },
    { name: 'Spargel', emoji: '🎋', unit: 'g', caloriesPerUnit: 0.20, healthiness: 9, category: 'vegetables' },
    { name: 'Artisokk', emoji: '🥗', unit: 'pc', caloriesPerUnit: 60, healthiness: 9, category: 'vegetables' },
    { name: 'Maapirn', emoji: '🍠', unit: 'g', caloriesPerUnit: 0.73, healthiness: 8, category: 'vegetables' },
    { name: 'Bataat', emoji: '🍠', unit: 'g', caloriesPerUnit: 0.86, healthiness: 8, category: 'vegetables' },
    { name: 'Fenkoli', emoji: '🌿', unit: 'pc', caloriesPerUnit: 73, healthiness: 8, category: 'vegetables' },
    { name: 'Pastinaak', emoji: '🥕', unit: 'g', caloriesPerUnit: 0.75, healthiness: 8, category: 'vegetables' },
    { name: 'Ribarohi', emoji: '🌿', unit: 'g', caloriesPerUnit: 0.21, healthiness: 7, category: 'vegetables' },
    { name: 'Idandid', emoji: '🌱', unit: 'g', caloriesPerUnit: 0.30, healthiness: 10, category: 'vegetables' },
    { name: 'Lehtpeet', emoji: '🥬', unit: 'g', caloriesPerUnit: 0.19, healthiness: 9, category: 'vegetables' },
    { name: 'Okra', emoji: '🥒', unit: 'g', caloriesPerUnit: 0.33, healthiness: 8, category: 'vegetables' },
    { name: 'Kibepipar', emoji: '🌶️', unit: 'pc', caloriesPerUnit: 18, healthiness: 8, category: 'vegetables' },

    // UUED PUUVILJAD JA MARJAD
    { name: 'Karumarjad', emoji: '🍇', unit: 'g', caloriesPerUnit: 0.44, healthiness: 9, category: 'fruits' },
    { name: 'Pohl', emoji: '🔴', unit: 'g', caloriesPerUnit: 0.46, healthiness: 10, category: 'fruits' },
    { name: 'Jõhvikas', emoji: '🔴', unit: 'g', caloriesPerUnit: 0.46, healthiness: 10, category: 'fruits' },
    { name: 'Meltikas', emoji: '🫐', unit: 'g', caloriesPerUnit: 0.50, healthiness: 9, category: 'fruits' },
    { name: 'Astelpaju', emoji: '🟠', unit: 'g', caloriesPerUnit: 0.82, healthiness: 10, category: 'fruits' },
    { name: 'Granaatõun', emoji: '🍎', unit: 'pc', caloriesPerUnit: 234, healthiness: 9, category: 'fruits' },
    { name: 'Viigimari', emoji: '🍇', unit: 'pc', caloriesPerUnit: 47, healthiness: 8, category: 'fruits' },
    { name: 'Papaia', emoji: '🥭', unit: 'g', caloriesPerUnit: 0.43, healthiness: 8, category: 'fruits' },
    { name: 'Kiivi', emoji: '🥝', unit: 'pc', caloriesPerUnit: 61, healthiness: 9, category: 'fruits' },
    { name: 'Nektariin', emoji: '🍑', unit: 'pc', caloriesPerUnit: 60, healthiness: 8, category: 'fruits' },
    { name: 'Virsik', emoji: '🍑', unit: 'pc', caloriesPerUnit: 50, healthiness: 8, category: 'fruits' },
    { name: 'Ploom', emoji: '🟣', unit: 'pc', caloriesPerUnit: 30, healthiness: 8, category: 'fruits' },
    { name: 'Aprikoos', emoji: '🟠', unit: 'pc', caloriesPerUnit: 17, healthiness: 8, category: 'fruits' },
    { name: 'Greip', emoji: '🍊', unit: 'pc', caloriesPerUnit: 52, healthiness: 9, category: 'fruits' },
    { name: 'Mandariin', emoji: '🍊', unit: 'pc', caloriesPerUnit: 50, healthiness: 8, category: 'fruits' },

    // UUED LIHAD
    { name: 'Pardifilee', emoji: '🦆', unit: 'g', caloriesPerUnit: 1.90, healthiness: 6, category: 'meat' },
    { name: 'Vutimunad', emoji: '🥚', unit: 'pc', caloriesPerUnit: 14, healthiness: 8, category: 'dairy' },
    { name: 'Hirveliha', emoji: '🥩', unit: 'g', caloriesPerUnit: 1.20, healthiness: 8, category: 'meat' },
    { name: 'Küülikuliha', emoji: '🥩', unit: 'g', caloriesPerUnit: 1.70, healthiness: 8, category: 'meat' },
    { name: 'Peekon (suitsu)', emoji: '🥓', unit: 'g', caloriesPerUnit: 4.50, healthiness: 3, category: 'meat' },
    { name: 'Salami', emoji: '🍕', unit: 'g', caloriesPerUnit: 3.30, healthiness: 3, category: 'meat' },
    { name: 'Maks', emoji: '🥩', unit: 'g', caloriesPerUnit: 1.65, healthiness: 9, category: 'meat' },

    // UUED KALAD JA MEREANNID
    { name: 'Austerid', emoji: '🦪', unit: 'pc', caloriesPerUnit: 10, healthiness: 9, category: 'fish' },
    { name: 'Rannakarbid', emoji: '🐚', unit: 'g', caloriesPerUnit: 0.86, healthiness: 9, category: 'fish' },
    { name: 'Kammkarbid', emoji: '🐚', unit: 'g', caloriesPerUnit: 0.75, healthiness: 9, category: 'fish' },
    { name: 'Krabiliha', emoji: '🦀', unit: 'g', caloriesPerUnit: 0.90, healthiness: 9, category: 'fish' },
    { name: 'Sardiinid', emoji: '🐟', unit: 'g', caloriesPerUnit: 1.85, healthiness: 9, category: 'fish' },
    { name: 'Heeringas (suitsu)', emoji: '💨', unit: 'g', caloriesPerUnit: 2.10, healthiness: 7, category: 'fish' },
    { name: 'Kaheksajalg', emoji: '🐙', unit: 'g', caloriesPerUnit: 0.82, healthiness: 9, category: 'fish' },
    { name: 'Kalmaar', emoji: '🦑', unit: 'g', caloriesPerUnit: 0.92, healthiness: 8, category: 'fish' },

    // UUED PIIMATOOTED JA ALTERNATIIVID
    { name: 'Kodujuust (rasvane)', emoji: '🧀', unit: 'g', caloriesPerUnit: 1.10, healthiness: 8, category: 'dairy' },
    { name: 'Skyr', emoji: '🥛', unit: 'g', caloriesPerUnit: 0.60, healthiness: 10, category: 'dairy' },
    { name: 'Kefiir', emoji: '🥛', unit: 'ml', caloriesPerUnit: 0.50, healthiness: 9, category: 'dairy' },
    { name: 'Ribi-piim', emoji: '🥛', unit: 'ml', caloriesPerUnit: 0.35, healthiness: 10, category: 'dairy' },
    { name: 'Ricotta', emoji: '🧀', unit: 'g', caloriesPerUnit: 1.74, healthiness: 7, category: 'dairy' },
    { name: 'Mascarpone', emoji: '🧀', unit: 'g', caloriesPerUnit: 4.30, healthiness: 3, category: 'dairy' },
    { name: 'Brie juust', emoji: '🧀', unit: 'g', caloriesPerUnit: 3.30, healthiness: 5, category: 'dairy' },
    { name: 'Gorgonzola', emoji: '🧀', unit: 'g', caloriesPerUnit: 3.50, healthiness: 4, category: 'dairy' },
    { name: 'Halloumi', emoji: '🧀', unit: 'g', caloriesPerUnit: 3.20, healthiness: 5, category: 'dairy' },
    { name: 'Sojajogurt', emoji: '🥛', unit: 'g', caloriesPerUnit: 0.50, healthiness: 8, category: 'dairy' },

    // UUED TERAVILJAD JA TOOTED
    { name: 'Kuskuss', emoji: '🌾', unit: 'g', caloriesPerUnit: 1.12, healthiness: 7, category: 'grains' },
    { name: 'Hirss', emoji: '🌾', unit: 'g', caloriesPerUnit: 1.19, healthiness: 9, category: 'grains' },
    { name: 'Mais', emoji: '🌽', unit: 'g', caloriesPerUnit: 0.86, healthiness: 7, category: 'vegetables' },
    { name: 'Kaerakliid', emoji: '🌾', unit: 'g', caloriesPerUnit: 2.40, healthiness: 10, category: 'grains' },
    { name: 'Rukkileib', emoji: '🍞', unit: 'pc', caloriesPerUnit: 70, healthiness: 8, category: 'grains' },
    { name: 'Tortilla (täistera)', emoji: '🫓', unit: 'pc', caloriesPerUnit: 110, healthiness: 7, category: 'grains' },
    { name: 'Riisipaber', emoji: '📃', unit: 'pc', caloriesPerUnit: 35, healthiness: 7, category: 'grains' },

    // UUED MAITSEAINED JA KASTMED
    { name: 'Sojakaste', emoji: '🍶', unit: 'tbsp', caloriesPerUnit: 9, healthiness: 6, category: 'sauces' },
    { name: 'Kalakaste', emoji: '🍶', unit: 'tbsp', caloriesPerUnit: 10, healthiness: 5, category: 'sauces' },
    { name: 'Riisiäädikas', emoji: '🍶', unit: 'tbsp', caloriesPerUnit: 4, healthiness: 7, category: 'sauces' },
    { name: 'Balsamico', emoji: '🍶', unit: 'tbsp', caloriesPerUnit: 14, healthiness: 7, category: 'sauces' },
    { name: 'Tšillikaste (Sriracha)', emoji: '🌶️', unit: 'tbsp', caloriesPerUnit: 15, healthiness: 5, category: 'sauces' },
    { name: 'Tahini', emoji: '🍯', unit: 'tbsp', caloriesPerUnit: 90, healthiness: 9, category: 'sauces' },
    { name: 'Pesto', emoji: '🌿', unit: 'tbsp', caloriesPerUnit: 80, healthiness: 7, category: 'sauces' },
    { name: 'Sinep', emoji: '🌭', unit: 'tsp', caloriesPerUnit: 5, healthiness: 7, category: 'sauces' },
    { name: 'Mädarõigas', emoji: '🥕', unit: 'tsp', caloriesPerUnit: 5, healthiness: 9, category: 'sauces' },
    { name: 'Majonees (lahja)', emoji: '🥚', unit: 'tbsp', caloriesPerUnit: 35, healthiness: 4, category: 'sauces' },
    { name: 'Vürtsköömen', emoji: '🌿', unit: 'tsp', caloriesPerUnit: 8, healthiness: 9, category: 'spices' },
    { name: 'Kurkum', emoji: '🟡', unit: 'tsp', caloriesPerUnit: 8, healthiness: 10, category: 'spices' },
    { name: 'Koriander (kuivatatud)', emoji: '🌿', unit: 'tsp', caloriesPerUnit: 5, healthiness: 9, category: 'spices' },
    { name: 'Kardemon', emoji: '🌿', unit: 'tsp', caloriesPerUnit: 6, healthiness: 9, category: 'spices' },
    { name: 'Muskaatpähkel', emoji: '🌰', unit: 'tsp', caloriesPerUnit: 12, healthiness: 8, category: 'spices' },
    { name: 'Nelk', emoji: '🌿', unit: 'tsp', caloriesPerUnit: 6, healthiness: 9, category: 'spices' },
    { name: 'Tüümian', emoji: '🌿', unit: 'tsp', caloriesPerUnit: 1, healthiness: 10, category: 'spices' },
    { name: 'Rosmariin', emoji: '🌿', unit: 'tsp', caloriesPerUnit: 2, healthiness: 10, category: 'spices' },
    { name: 'Till (kuivatatud)', emoji: '🌿', unit: 'tsp', caloriesPerUnit: 2, healthiness: 9, category: 'spices' },

    // UUED PÄHKLID JA SEEMNED
    { name: 'India pähklid', emoji: '🌰', unit: 'g', caloriesPerUnit: 5.50, healthiness: 8, category: 'nuts' },
    { name: 'Sarapuupähklid', emoji: '🌰', unit: 'g', caloriesPerUnit: 6.20, healthiness: 8, category: 'nuts' },
    { name: 'Pistaatsiad', emoji: '🌰', unit: 'g', caloriesPerUnit: 5.60, healthiness: 8, category: 'nuts' },
    { name: 'Pekaanipähklid', emoji: '🌰', unit: 'g', caloriesPerUnit: 6.90, healthiness: 8, category: 'nuts' },
    { name: 'Kõrvitsaseemned', emoji: '🎃', unit: 'g', caloriesPerUnit: 5.60, healthiness: 10, category: 'nuts' },
    { name: 'Päevalilleseemned', emoji: '🌻', unit: 'g', caloriesPerUnit: 5.80, healthiness: 9, category: 'nuts' },
    { name: 'Seesamiseemned', emoji: '🌰', unit: 'g', caloriesPerUnit: 5.70, healthiness: 9, category: 'nuts' },
    { name: 'Linaseemned', emoji: '🌰', unit: 'g', caloriesPerUnit: 5.30, healthiness: 10, category: 'nuts' },
    { name: 'Kanepiseemned', emoji: '🌿', unit: 'g', caloriesPerUnit: 5.50, healthiness: 10, category: 'nuts' },

    // UUED MAGUSAINED JA MUU
    { name: 'Dattel', emoji: '🌴', unit: 'pc', caloriesPerUnit: 25, healthiness: 7, category: 'sweeteners' },
    { name: 'Tume šokolaad (85%)', emoji: '🍫', unit: 'g', caloriesPerUnit: 5.50, healthiness: 7, category: 'sweeteners' },
    { name: 'Kakaopulber (suhkruta)', emoji: '🍫', unit: 'tbsp', caloriesPerUnit: 12, healthiness: 9, category: 'sweeteners' },
    { name: 'Kookoshelbed', emoji: '🥥', unit: 'g', caloriesPerUnit: 6.60, healthiness: 6, category: 'nuts' },
    { name: 'Mandelhelbed', emoji: '🌰', unit: 'g', caloriesPerUnit: 5.80, healthiness: 8, category: 'nuts' },
    { name: 'Küpsetuspulber', emoji: '🥄', unit: 'tsp', caloriesPerUnit: 2, healthiness: 5, category: 'spices' },
    { name: 'Söögisooda', emoji: '🥄', unit: 'tsp', caloriesPerUnit: 0, healthiness: 5, category: 'spices' },
    { name: 'Želatiin', emoji: '🥄', unit: 'g', caloriesPerUnit: 3.40, healthiness: 6, category: 'dairy' },
    { name: 'Pärm (kuiv)', emoji: '🍞', unit: 'tsp', caloriesPerUnit: 12, healthiness: 7, category: 'spices' },

    // VEEL KAUNVILJU
    { name: 'Mustad oad', emoji: '🫘', unit: 'g', caloriesPerUnit: 1.30, healthiness: 10, category: 'legumes' },
    { name: 'Valged oad', emoji: '🫘', unit: 'g', caloriesPerUnit: 1.40, healthiness: 10, category: 'legumes' },
    { name: 'Mungoad', emoji: '🫘', unit: 'g', caloriesPerUnit: 1.05, healthiness: 10, category: 'legumes' },
    { name: 'Kollased herned', emoji: '🫛', unit: 'g', caloriesPerUnit: 1.20, healthiness: 9, category: 'legumes' },

    // KONSERVID JA PURKTOOTED
    { name: 'Tomatipaста', emoji: '🍅', unit: 'tbsp', caloriesPerUnit: 13, healthiness: 7, category: 'sauces' },
    { name: 'Tomatipüree', emoji: '🍅', unit: 'tbsp', caloriesPerUnit: 6, healthiness: 8, category: 'vegetables' },
    { name: 'Konserveeritud tomatid', emoji: '🥫', unit: 'g', caloriesPerUnit: 0.32, healthiness: 8, category: 'canned' },
    { name: 'Tomatikaste', emoji: '🍅', unit: 'tbsp', caloriesPerUnit: 15, healthiness: 6, category: 'sauces' },
    { name: 'Ketšup', emoji: '🍅', unit: 'tbsp', caloriesPerUnit: 17, healthiness: 3, category: 'sauces' },
    { name: 'BBQ kaste', emoji: '🍖', unit: 'tbsp', caloriesPerUnit: 29, healthiness: 4, category: 'sauces' },
    { name: 'Õunakaste', emoji: '🍎', unit: 'tbsp', caloriesPerUnit: 13, healthiness: 6, category: 'sauces' },
    { name: 'Kookoskoor', emoji: '🥥', unit: 'ml', caloriesPerUnit: 1.95, healthiness: 6, category: 'canned' },
    { name: 'Konserveeritud ananass', emoji: '🥫', unit: 'g', caloriesPerUnit: 0.60, healthiness: 6, category: 'canned' },
    { name: 'Konserveeritud õunad', emoji: '🥫', unit: 'g', caloriesPerUnit: 0.42, healthiness: 7, category: 'canned' },
    { name: 'Konserveeritud persik', emoji: '🥫', unit: 'g', caloriesPerUnit: 0.45, healthiness: 6, category: 'canned' },
    { name: 'Oliivid (rohelised)', emoji: '🫒', unit: 'pc', caloriesPerUnit: 5, healthiness: 7, category: 'canned' },
    { name: 'Oliivid (mustad)', emoji: '🫒', unit: 'pc', caloriesPerUnit: 7, healthiness: 7, category: 'canned' },
    { name: 'Kapers', emoji: '🌿', unit: 'tbsp', caloriesPerUnit: 2, healthiness: 8, category: 'canned' },
    { name: 'Sardellifilee', emoji: '🐟', unit: 'pc', caloriesPerUnit: 8, healthiness: 6, category: 'canned' },
    { name: 'Roositud paprika (purk)', emoji: '🫑', unit: 'g', caloriesPerUnit: 0.28, healthiness: 8, category: 'canned' },
    { name: 'Kuivatatud tomatid', emoji: '🍅', unit: 'g', caloriesPerUnit: 2.58, healthiness: 7, category: 'vegetables' },

    // JOOGID JA VEDELIKUD
    { name: 'Vesi', emoji: '💧', unit: 'ml', caloriesPerUnit: 0, healthiness: 10, category: 'drinks' },
    { name: 'Gaseeritud vesi', emoji: '💧', unit: 'ml', caloriesPerUnit: 0, healthiness: 10, category: 'drinks' },
    { name: 'Õunamahl', emoji: '🍎', unit: 'ml', caloriesPerUnit: 0.46, healthiness: 5, category: 'drinks' },
    { name: 'Apelsinimahl', emoji: '🍊', unit: 'ml', caloriesPerUnit: 0.45, healthiness: 6, category: 'drinks' },
    { name: 'Tomatimahl', emoji: '🍅', unit: 'ml', caloriesPerUnit: 0.17, healthiness: 8, category: 'drinks' },
    { name: 'Porgandiahl', emoji: '🥕', unit: 'ml', caloriesPerUnit: 0.40, healthiness: 8, category: 'drinks' },
    { name: 'Kaneelimahl', emoji: '🍇', unit: 'ml', caloriesPerUnit: 0.45, healthiness: 7, category: 'drinks' },
    { name: 'Kohv (must)', emoji: '☕', unit: 'ml', caloriesPerUnit: 0.02, healthiness: 7, category: 'drinks' },
    { name: 'Espresso', emoji: '☕', unit: 'ml', caloriesPerUnit: 0.02, healthiness: 7, category: 'drinks' },
    { name: 'Tee (roheline)', emoji: '🍵', unit: 'ml', caloriesPerUnit: 0, healthiness: 10, category: 'drinks' },
    { name: 'Tee (must)', emoji: '🍵', unit: 'ml', caloriesPerUnit: 0, healthiness: 9, category: 'drinks' },
    { name: 'Köögiviljapuljong', emoji: '🥣', unit: 'ml', caloriesPerUnit: 0.12, healthiness: 8, category: 'sauces' },
    { name: 'Kanapuljong', emoji: '🥣', unit: 'ml', caloriesPerUnit: 0.15, healthiness: 7, category: 'sauces' },
    { name: 'Veisepuljong', emoji: '🥣', unit: 'ml', caloriesPerUnit: 0.10, healthiness: 7, category: 'sauces' },
    { name: 'Valge vein', emoji: '🍷', unit: 'ml', caloriesPerUnit: 0.82, healthiness: 3, category: 'drinks' },
    { name: 'Punane vein', emoji: '🍷', unit: 'ml', caloriesPerUnit: 0.85, healthiness: 4, category: 'drinks' },

    // ŠOKOLAAD JA MAGUSAD LISANDID
    { name: 'Piimašokolaad', emoji: '🍫', unit: 'g', caloriesPerUnit: 5.35, healthiness: 3, category: 'chocolate' },
    { name: 'Valge šokolaad', emoji: '🍫', unit: 'g', caloriesPerUnit: 5.39, healthiness: 2, category: 'chocolate' },
    { name: 'Nutella', emoji: '🍫', unit: 'tbsp', caloriesPerUnit: 100, healthiness: 2, category: 'chocolate' },
    { name: 'Šokolaadilaastud (tume)', emoji: '🍫', unit: 'g', caloriesPerUnit: 5.50, healthiness: 6, category: 'chocolate' },
    { name: 'Kohupiimavõie', emoji: '🧀', unit: 'tbsp', caloriesPerUnit: 25, healthiness: 7, category: 'dairy' },
    { name: 'Moosipulber (želee)', emoji: '🍓', unit: 'g', caloriesPerUnit: 3.00, healthiness: 4, category: 'sweeteners' },
    { name: 'Moos (maasikas)', emoji: '🍓', unit: 'tbsp', caloriesPerUnit: 50, healthiness: 4, category: 'sweeteners' },
    { name: 'Moos (vaarikad)', emoji: '🍇', unit: 'tbsp', caloriesPerUnit: 50, healthiness: 4, category: 'sweeteners' },
    { name: 'Moos (mustika)', emoji: '🫐', unit: 'tbsp', caloriesPerUnit: 50, healthiness: 4, category: 'sweeteners' },

    // VEEL LIHA JA VÄRSKED TOOTED
    { name: 'Chorizo', emoji: '🌭', unit: 'g', caloriesPerUnit: 4.55, healthiness: 3, category: 'meat' },
    { name: 'Prosciutto', emoji: '🥓', unit: 'g', caloriesPerUnit: 2.50, healthiness: 4, category: 'meat' },
    { name: 'Pancetta', emoji: '🥓', unit: 'g', caloriesPerUnit: 4.58, healthiness: 3, category: 'meat' },
    { name: 'Vurstikeste', emoji: '🌭', unit: 'pc', caloriesPerUnit: 150, healthiness: 3, category: 'meat' },
    { name: 'Kanaliha (rind konditaga)', emoji: '🍗', unit: 'g', caloriesPerUnit: 2.37, healthiness: 5, category: 'meat' },

    // VEEL KÖÖGIVILJU
    { name: 'Kukeseened', emoji: '🍄', unit: 'g', caloriesPerUnit: 0.38, healthiness: 9, category: 'vegetables' },
    { name: 'Puravikud', emoji: '🍄', unit: 'g', caloriesPerUnit: 0.22, healthiness: 9, category: 'vegetables' },
    { name: 'Shitake seened', emoji: '🍄', unit: 'g', caloriesPerUnit: 0.34, healthiness: 10, category: 'vegetables' },
    { name: 'Herned (külmutatud)', emoji: '🫛', unit: 'g', caloriesPerUnit: 0.77, healthiness: 9, category: 'vegetables' },
    { name: 'Mais (külmutatud)', emoji: '🌽', unit: 'g', caloriesPerUnit: 0.86, healthiness: 7, category: 'vegetables' },
    { name: 'Brokkolikimps (külm)', emoji: '🥦', unit: 'g', caloriesPerUnit: 0.28, healthiness: 10, category: 'vegetables' },
    { name: 'Kartulipuder', emoji: '🥔', unit: 'g', caloriesPerUnit: 1.16, healthiness: 5, category: 'vegetables' },
    { name: 'Friikartulid (külm)', emoji: '🍟', unit: 'g', caloriesPerUnit: 1.72, healthiness: 3, category: 'vegetables' },
    { name: 'Kartulipüree-pulber', emoji: '🥔', unit: 'g', caloriesPerUnit: 3.50, healthiness: 4, category: 'grains' },

    // VEEL TERAVILJU JA LISANDEID
    { name: 'Riisijahu', emoji: '🌾', unit: 'g', caloriesPerUnit: 3.66, healthiness: 7, category: 'grains' },
    { name: 'Mandelijahu', emoji: '🌰', unit: 'g', caloriesPerUnit: 5.71, healthiness: 8, category: 'grains' },
    { name: 'Kookosejahu', emoji: '🥥', unit: 'g', caloriesPerUnit: 4.05, healthiness: 7, category: 'grains' },
    { name: 'Nisukliid', emoji: '🌾', unit: 'g', caloriesPerUnit: 3.40, healthiness: 9, category: 'grains' },
    { name: 'Täisterajahu (spelta)', emoji: '🌾', unit: 'g', caloriesPerUnit: 3.38, healthiness: 8, category: 'grains' },
    { name: 'Pannkoogijahu', emoji: '🥞', unit: 'g', caloriesPerUnit: 3.57, healthiness: 4, category: 'grains' },
    { name: 'Müsli (tervislik)', emoji: '🥣', unit: 'g', caloriesPerUnit: 3.71, healthiness: 8, category: 'grains' },
    { name: 'Granola', emoji: '🥣', unit: 'g', caloriesPerUnit: 4.71, healthiness: 6, category: 'grains' },
    { name: 'Cornflakes', emoji: '🌽', unit: 'g', caloriesPerUnit: 3.78, healthiness: 4, category: 'grains' },
    { name: 'Krõpsud (riis)', emoji: '🍘', unit: 'pc', caloriesPerUnit: 35, healthiness: 5, category: 'grains' },
    { name: 'Leivapuru', emoji: '🍞', unit: 'g', caloriesPerUnit: 3.95, healthiness: 5, category: 'grains' },

    // VEEL MAITSEAINEID JA LISANDEID
    { name: 'Petersell (värske)', emoji: '🌿', unit: 'g', caloriesPerUnit: 0.36, healthiness: 10, category: 'vegetables' },
    { name: 'Till (värske)', emoji: '🌿', unit: 'g', caloriesPerUnit: 0.43, healthiness: 10, category: 'vegetables' },
    { name: 'Koriander (värske)', emoji: '🌿', unit: 'g', caloriesPerUnit: 0.23, healthiness: 10, category: 'vegetables' },
    { name: 'Mündi', emoji: '🌿', unit: 'g', caloriesPerUnit: 0.44, healthiness: 9, category: 'vegetables' },
    { name: 'Loorberileht', emoji: '🍃', unit: 'pc', caloriesPerUnit: 3, healthiness: 9, category: 'spices' },
    { name: 'Tšillipulber', emoji: '🌶️', unit: 'tsp', caloriesPerUnit: 6, healthiness: 8, category: 'spices' },
    { name: 'Kaneelipulk', emoji: '🌰', unit: 'pc', caloriesPerUnit: 6, healthiness: 9, category: 'spices' },
    { name: 'Vanillisuhkur', emoji: '🌿', unit: 'tsp', caloriesPerUnit: 10, healthiness: 3, category: 'sweeteners' },
    { name: 'Vahtrasuhkur', emoji: '🍁', unit: 'g', caloriesPerUnit: 3.54, healthiness: 4, category: 'sweeteners' },
    { name: 'Pruun suhkur', emoji: '🟤', unit: 'g', caloriesPerUnit: 3.80, healthiness: 2, category: 'sweeteners' },
    { name: 'Toorسuhkur', emoji: '🟤', unit: 'g', caloriesPerUnit: 3.87, healthiness: 3, category: 'sweeteners' },
    { name: 'Sidrunkoor', emoji: '🍋', unit: 'g', caloriesPerUnit: 0.20, healthiness: 8, category: 'fruits' },
    { name: 'Apelsinikoor', emoji: '🍊', unit: 'g', caloriesPerUnit: 0.22, healthiness: 8, category: 'fruits' },
    { name: 'Veiniäädikas (valge)', emoji: '🍶', unit: 'tbsp', caloriesPerUnit: 3, healthiness: 7, category: 'sauces' },
    { name: 'Veiniäädikas (punane)', emoji: '🍶', unit: 'tbsp', caloriesPerUnit: 3, healthiness: 7, category: 'sauces' },
    { name: 'Õunaäädikas', emoji: '🍎', unit: 'tbsp', caloriesPerUnit: 3, healthiness: 9, category: 'sauces' },
    { name: 'Worcestershire kaste', emoji: '🍶', unit: 'tsp', caloriesPerUnit: 3, healthiness: 5, category: 'sauces' },


    // PÕHIROOGADE KOOSTISOSAD (LIHA JA LISANDID)
    { name: 'Sealiha (praetükk)', emoji: '🥩', unit: 'g', caloriesPerUnit: 2.50, healthiness: 5, category: 'meat' },
    { name: 'Sealiha (hakkliha)', emoji: '🥩', unit: 'g', caloriesPerUnit: 2.60, healthiness: 4, category: 'meat' },
    { name: 'Veiseliha (hakkliha)', emoji: '🥩', unit: 'g', caloriesPerUnit: 2.50, healthiness: 6, category: 'meat' },
    { name: 'Kanafilee', emoji: '🍗', unit: 'g', caloriesPerUnit: 1.65, healthiness: 8, category: 'meat' },
    { name: 'Hapukapsas', emoji: '🥬', unit: 'g', caloriesPerUnit: 0.20, healthiness: 9, category: 'vegetables' },
    { name: 'Porgand (keedetud)', emoji: '🥕', unit: 'g', caloriesPerUnit: 0.35, healthiness: 9, category: 'vegetables' },
    { name: 'Kartul (keedetud)', emoji: '🥔', unit: 'g', caloriesPerUnit: 0.77, healthiness: 8, category: 'vegetables' },
    { name: 'Ahjukartul', emoji: '🥔', unit: 'g', caloriesPerUnit: 1.30, healthiness: 6, category: 'vegetables' },

    // ALKOHOOLSED JOOGID
    { name: 'Viin', emoji: '🍸', unit: 'ml', caloriesPerUnit: 2.31, healthiness: 1, category: 'alcohol' }, // ~231kcal/100ml
    { name: 'Džinn', emoji: '🍸', unit: 'ml', caloriesPerUnit: 2.63, healthiness: 1, category: 'alcohol' },
    { name: 'Rumm (valge)', emoji: '🍹', unit: 'ml', caloriesPerUnit: 2.31, healthiness: 1, category: 'alcohol' },
    { name: 'Rumm (tume)', emoji: '🍹', unit: 'ml', caloriesPerUnit: 2.31, healthiness: 1, category: 'alcohol' },
    { name: 'Tekiila', emoji: '🌵', unit: 'ml', caloriesPerUnit: 2.31, healthiness: 1, category: 'alcohol' },
    { name: 'Viski', emoji: '🥃', unit: 'ml', caloriesPerUnit: 2.50, healthiness: 1, category: 'alcohol' },
    { name: 'Konjak', emoji: '🥃', unit: 'ml', caloriesPerUnit: 2.35, healthiness: 1, category: 'alcohol' },
    { name: 'Õlu (hele)', emoji: '🍺', unit: 'ml', caloriesPerUnit: 0.43, healthiness: 2, category: 'alcohol' },
    { name: 'Õlu (tume)', emoji: '🍺', unit: 'ml', caloriesPerUnit: 0.50, healthiness: 2, category: 'alcohol' },
    { name: 'Siider (kuiv)', emoji: '🍏', unit: 'ml', caloriesPerUnit: 0.50, healthiness: 2, category: 'alcohol' },
    { name: 'Valge vein (kuiv)', emoji: '🥂', unit: 'ml', caloriesPerUnit: 0.82, healthiness: 2, category: 'alcohol' },
    { name: 'Punane vein', emoji: '🍷', unit: 'ml', caloriesPerUnit: 0.85, healthiness: 3, category: 'alcohol' },
    { name: 'Prosecco', emoji: '🍾', unit: 'ml', caloriesPerUnit: 0.70, healthiness: 2, category: 'alcohol' },
    { name: 'Šampanja', emoji: '🍾', unit: 'ml', caloriesPerUnit: 0.80, healthiness: 2, category: 'alcohol' },
    { name: 'Likööri (Baileys)', emoji: '🥃', unit: 'ml', caloriesPerUnit: 3.27, healthiness: 1, category: 'alcohol' },
    { name: 'Likööri (Cointreau)', emoji: '🍊', unit: 'ml', caloriesPerUnit: 3.20, healthiness: 1, category: 'alcohol' },
    { name: 'Likööri (Amaretto)', emoji: '🌰', unit: 'ml', caloriesPerUnit: 3.00, healthiness: 1, category: 'alcohol' },
    { name: 'Campari', emoji: '🍷', unit: 'ml', caloriesPerUnit: 2.40, healthiness: 1, category: 'alcohol' },
    { name: 'Aperol', emoji: '🍊', unit: 'ml', caloriesPerUnit: 2.50, healthiness: 1, category: 'alcohol' },
    { name: 'Vermut (kuiv)', emoji: '🍸', unit: 'ml', caloriesPerUnit: 1.10, healthiness: 2, category: 'alcohol' },
    { name: 'Vermut (magus)', emoji: '🍸', unit: 'ml', caloriesPerUnit: 1.40, healthiness: 1, category: 'alcohol' },
    { name: 'Jägermeister', emoji: '🦌', unit: 'ml', caloriesPerUnit: 2.50, healthiness: 1, category: 'alcohol' },

    // KOKTEILI LISANDID
    { name: 'Toonik', emoji: '🥤', unit: 'ml', caloriesPerUnit: 0.34, healthiness: 2, category: 'drinks' },
    { name: 'Toonik (suhkruvaba)', emoji: '🥤', unit: 'ml', caloriesPerUnit: 0, healthiness: 5, category: 'drinks' },
    { name: 'Coca-Cola Zero', emoji: '🥤', unit: 'ml', caloriesPerUnit: 0, healthiness: 4, category: 'drinks' },
    { name: 'Sprite Zero', emoji: '🥤', unit: 'ml', caloriesPerUnit: 0, healthiness: 4, category: 'drinks' },
    { name: 'Jää', emoji: '🧊', unit: 'pc', caloriesPerUnit: 0, healthiness: 10, category: 'drinks' },
    { name: 'Münt', emoji: '🌿', unit: 'pc', caloriesPerUnit: 1, healthiness: 9, category: 'vegetables' },
    { name: 'Angostura bitter', emoji: '💧', unit: 'tsp', caloriesPerUnit: 12, healthiness: 5, category: 'alcohol' },
    { name: 'Suhkrusiirup', emoji: '🍯', unit: 'tbsp', caloriesPerUnit: 50, healthiness: 1, category: 'sweeteners' },
    { name: 'Agave siirup', emoji: '🍯', unit: 'tbsp', caloriesPerUnit: 60, healthiness: 3, category: 'sweeteners' },

    { name: 'Teriyaki kaste', emoji: '🍶', unit: 'tbsp', caloriesPerUnit: 16, healthiness: 5, category: 'sauces' },
    { name: 'Hummus', emoji: '🧆', unit: 'tbsp', caloriesPerUnit: 25, healthiness: 9, category: 'legumes' },
    { name: 'Guacamole', emoji: '🥑', unit: 'tbsp', caloriesPerUnit: 23, healthiness: 8, category: 'vegetables' },
    { name: 'Must pipar', emoji: '🧂', unit: 'tsp', caloriesPerUnit: 6, healthiness: 5, category: 'spices' },
    { name: 'Misopasta', emoji: '🥣', unit: 'tbsp', caloriesPerUnit: 34, healthiness: 9, category: 'sauces' },
    { name: 'Wakame', emoji: '🌿', unit: 'g', caloriesPerUnit: 0.45, healthiness: 10, category: 'vegetables' },
    { name: 'Täisterakukkel', emoji: '🍔', unit: 'pc', caloriesPerUnit: 150, healthiness: 7, category: 'grains' },
    { name: 'Ciabatta', emoji: '🥖', unit: 'pc', caloriesPerUnit: 120, healthiness: 5, category: 'grains' },
    { name: 'Burgeripihv (veis)', emoji: '🥩', unit: 'pc', caloriesPerUnit: 250, healthiness: 5, category: 'meat' },
    { name: 'Trühvliõli', emoji: '🍄', unit: 'tsp', caloriesPerUnit: 40, healthiness: 7, category: 'oils' },
    { name: 'Trühvlisool', emoji: '🧂', unit: 'tsp', caloriesPerUnit: 0, healthiness: 6, category: 'spices' },
    { name: 'Trühvlipasta (must)', emoji: '🍄', unit: 'tsp', caloriesPerUnit: 15, healthiness: 8, category: 'sauces' },
    { name: 'Mais (popkorn)', emoji: '🍿', unit: 'g', caloriesPerUnit: 3.87, healthiness: 7, category: 'grains' },
    { name: 'Vutimunad', emoji: '🥚', unit: 'pc', caloriesPerUnit: 14, healthiness: 8, category: 'dairy' },
];

/* export async function seedTestData() {
    const ingredientsStore = useIngredientsStore.getState();
    const recipesStore = useRecipesStore.getState();

    // Only skip seed if we have a substantial amount of data (complete seed)
    // Use 600 as threshold since we have ~400 ingredients now
    if (ingredientsStore.ingredients.length > 600) {
        console.log('Data appears complete, skipping seed');
        return false;
    }

    console.log('Seeding test data...');
    console.log(`Starting with ${ingredientsStore.ingredients.length} existing ingredients`);

    // Add ingredients and collect their IDs
    const ingredientIds = {};
    let successCount = 0;
    let errorCount = 0;

    // Batch updates? No, store doesn't support batch add yet.
    // Reducing UI glitches by relying on App.jsx ref check

    for (const ing of TEST_INGREDIENTS) {
        try {
            const added = await ingredientsStore.addIngredient(ing);
            if (added && added.id) {
                ingredientIds[ing.name] = added.id;
                successCount++;
            } else {
                // Should not happen with updated store logic, but fallback just in case
                // Ingredient already exists, find its ID
                const current = useIngredientsStore.getState();
                const existing = current.ingredients.find(
                    i => i.name.toLowerCase().trim() === ing.name.toLowerCase().trim()
                );
                if (existing) {
                    ingredientIds[ing.name] = existing.id;
                } else {
                    console.warn(`Could not find ID for ingredient: ${ing.name}`);
                    errorCount++;
                }
            }
        } catch (err) {
            console.error(`Failed to add ingredient "${ing.name}":`, err);
            errorCount++;
        }
    }

    console.log(`Ingredients: ${successCount} added, ${errorCount} errors`);


    // Comprehensive Healthy Recipes
    const TEST_RECIPES = [
        // ==================== BAILANDO (Low-cal Cocktails) ====================
        {
            title: 'Skinny Mojito',
            description: 'Värskendav klassika ilma liigse suhkruta. Ideaalne suveõhtuks!',
            course: 'bailando',
            servings: 1,
            prepTime: 5,
            cookTime: 0,
            ingredients: [
                { ingredientId: ingredientIds['Rumm (valge)'], amount: 50, notes: '' },
                { ingredientId: ingredientIds['Münt'], amount: 10, notes: 'lehte' },
                { ingredientId: ingredientIds['Laim'], amount: 0.5, notes: 'mahlaks' },
                { ingredientId: ingredientIds['Gaseeritud vesi'], amount: 150, notes: '' },
                { ingredientId: ingredientIds['Stevia'], amount: 1, notes: 'maitse järgi' },
                { ingredientId: ingredientIds['Jää'], amount: 6, notes: 'purustatud' },
            ],
            instructions: [
                'Pane mündilehed ja laimimahl klaasi põhja.',
                'Mulju kergelt nuiaga, et maitsed vabaneks.',
                'Lisa stevia ja rumm.',
                'Täida klaas jääga ja pikenda gaseeritud veega.',
                'Sega kergelt ja kaunista mündilehega.'
            ],
            tips: ['Kasuta värsket piparmünti!', 'Ära purusta münti liiga palju, muidu muutub see kibedaks.']
        },
        {
            title: 'Skinny Gin Tonic',
            description: 'Klassikaline G&T, aga 0-kalori toonikuga. Vaid ~65 kcal!',
            course: 'bailando',
            servings: 1,
            prepTime: 2,
            cookTime: 0,
            ingredients: [
                { ingredientId: ingredientIds['Džinn'], amount: 40, notes: 'kvaliteetne' },
                { ingredientId: ingredientIds['Toonik (suhkruvaba)'], amount: 150, notes: '' },
                { ingredientId: ingredientIds['Laim'], amount: 1, notes: 'viil' },
                { ingredientId: ingredientIds['Jää'], amount: 5, notes: 'kuubikut' },
                { ingredientId: ingredientIds['Kurk'], amount: 20, notes: 'viil (soovi korral)' },
            ],
            instructions: [
                'Täida Copa klaas (või veiniklaas) jääga.',
                'Vala peale džinn.',
                'Pikenda suhkruvaba toonikuga.',
                'Kaunista laimiviilu ja kurgiga.'
            ],
            tips: ['Mida rohkem jääd, seda vähem jook lahjeneb.']
        },
        {
            title: 'Cuba Libre Zero',
            description: 'Rum ja koola, aga ilma suhkruta. Pidu sinus eneses!',
            course: 'bailando',
            servings: 1,
            prepTime: 2,
            cookTime: 0,
            ingredients: [
                { ingredientId: ingredientIds['Rumm (tume)'], amount: 50, notes: '' },
                { ingredientId: ingredientIds['Coca-Cola Zero'], amount: 150, notes: '' },
                { ingredientId: ingredientIds['Laim'], amount: 1, notes: 'sektor' },
                { ingredientId: ingredientIds['Jää'], amount: 5, notes: '' },
            ],
            instructions: [
                'Täida klaas jääga.',
                'Pigista sisse laimisektorist mahl ja viska sektor klaasi.',
                'Vala peale rumm.',
                'Pikenda Coca-Cola Zeroga.'
            ],
            tips: ['Tume rumm annab sügavama maitse kui valge.']
        },
        {
            title: 'Aperol Spritz (Light)',
            description: 'Itaalia lemmik veidi kergemas võtmes.',
            course: 'bailando',
            servings: 1,
            prepTime: 3,
            cookTime: 0,
            ingredients: [
                { ingredientId: ingredientIds['Aperol'], amount: 40, notes: '' },
                { ingredientId: ingredientIds['Prosecco'], amount: 60, notes: '' },
                { ingredientId: ingredientIds['Gaseeritud vesi'], amount: 40, notes: '' },
                { ingredientId: ingredientIds['Apelsin'], amount: 1, notes: 'viil' },
                { ingredientId: ingredientIds['Jää'], amount: 5, notes: '' },
            ],
            instructions: [
                'Täida suur veiniklaas ohtra jääga.',
                'Vala koostisosad: Prosecco, siis Aperol, lõpuks mullivesi.',
                'Sega kergelt.',
                'Kaunista apelsiniviiluga.'
            ],
            tips: ['Tavapärane suhe on 3:2:1 (Prosecco:Aperol:Vesi), aga siin on vett rohkem, et kaloreid vähendada.']
        },
        {
            title: 'Vodka Soda Lime',
            description: 'Kõige puhtam ja madalama kalorsusega jook. "Skinny Bitch".',
            course: 'bailando',
            servings: 1,
            prepTime: 2,
            cookTime: 0,
            ingredients: [
                { ingredientId: ingredientIds['Viin'], amount: 40, notes: '' },
                { ingredientId: ingredientIds['Gaseeritud vesi'], amount: 150, notes: '' },
                { ingredientId: ingredientIds['Laim'], amount: 0.5, notes: 'mahlaks' },
                { ingredientId: ingredientIds['Jää'], amount: 5, notes: '' },
            ],
            instructions: [
                'Täida klaas jääga.',
                'Vala viin.',
                'Pigista sisse poole laimi mahl.',
                'Pikenda mulliveega.',
                'Sega.'
            ],
            tips: ['Kasuta värsket laimi, mitte kontsentraati!']
        },
        { name: 'Teriyaki kaste', emoji: '🍶', unit: 'tbsp', caloriesPerUnit: 16, healthiness: 5, category: 'sauces' },
        { name: 'Hummus', emoji: '🧆', unit: 'tbsp', caloriesPerUnit: 25, healthiness: 9, category: 'legumes' },
        { name: 'Guacamole', emoji: '🥑', unit: 'tbsp', caloriesPerUnit: 23, healthiness: 8, category: 'vegetables' }

    ]; */

export async function seedTestData() {
    const ingredientsStore = useIngredientsStore.getState();
    const recipesStore = useRecipesStore.getState();

    // Always cleanup duplicates first
    await cleanupDuplicates();

    // Only skip seed if we have a substantial amount of data (complete seed)
    // Use 250 as threshold since we have 250+ ingredients to seed
    // We must populate ingredientIds even if data exists, otherwise recipes will have missing ingredients
    console.log('Verifying ingredients and mapping IDs...');
    const currentIngredients = ingredientsStore.ingredients;

    // Add ingredients and collect their IDs
    const ingredientIds = {};
    let successCount = 0;
    let errorCount = 0;

    for (const ing of TEST_INGREDIENTS) {
        try {
            // 1. Check if it already exists in our loaded store
            const existing = currentIngredients.find(
                i => i.name.toLowerCase().trim() === ing.name.toLowerCase().trim()
            );

            if (existing) {
                ingredientIds[ing.name] = existing.id;
            } else {
                // 2. Not found, try to add it
                // console.log(`Adding missing ingredient: ${ing.name}`);
                const added = await ingredientsStore.addIngredient(ing);
                if (added) {
                    ingredientIds[ing.name] = added.id;
                    successCount++;
                } else if (added === null) {
                    // Duplicate in DB but wasn't in local store? 
                    // This creates a race condition, but usually addIngredient returns duplicate if so.
                    // If duplicate, we need to fetch its ID? 
                    // store.js returns null on duplicate. It doesn't return the existing ID.
                    // We might miss this ID. 
                    // But if it's in DB, we should have fetched it.
                }
            }
        } catch (err) {
            console.error(`Failed to add/map ingredient "${ing.name}":`, err);
            errorCount++;
        }
    }

    console.log(`Ingredients: ${successCount} added, ${errorCount} errors`);


    // Comprehensive Healthy Recipes
    const TEST_RECIPES = [
        // ==================== PÕHIROAD (Main Courses) ====================
        {
            title: 'Eesti Seapraad Hapukapsaga',
            description: 'Klassikaline Eesti jõulupraad, aga sobib igaks pimedaks õhtuks. Mahlane sealiha ja hapukapsas.',
            course: 'main',
            servings: 4,
            prepTime: 15,
            cookTime: 90,
            ingredients: [
                { ingredientId: ingredientIds['Sealiha (praetükk)'], amount: 800, notes: 'kaelakarbonaad' },
                { ingredientId: ingredientIds['Hapukapsas'], amount: 600, notes: 'toores' },
                { ingredientId: ingredientIds['Kartul (keedetud)'], amount: 800, notes: 'lisandiks' },
                { ingredientId: ingredientIds['Sool'], amount: 2, notes: 'tl' },
                { ingredientId: ingredientIds['Must pipar'], amount: 0.5, notes: 'tl' },
            ],
            instructions: [
                'Hõõru sealiha soola ja pipraga sisse.',
                'Pane liha ahjupotti, lisa veidi vett.',
                'Küpseta 180 kraadi juures ca 1.5 tundi.',
                'Poole peal lisa hapukapsas liha kõrvale hauduma.',
                'Serveeri keedetud kartulitega.'
            ],
            tips: ['Liha jääb mahlasem, kui seda küpsemise ajal praeleemega kasta.']
        },

        // ==================== BAILANDO (Low-cal Cocktails) ====================
        {
            title: 'Skinny Mojito',
            description: 'Värskendav klassika ilma liigse suhkruta. Ideaalne suveõhtuks!',
            course: 'bailando',
            servings: 1,
            prepTime: 5,
            cookTime: 0,
            ingredients: [
                { ingredientId: ingredientIds['Rumm (valge)'], amount: 50, notes: '' },
                { ingredientId: ingredientIds['Münt'], amount: 10, notes: 'lehte' },
                { ingredientId: ingredientIds['Laim'], amount: 0.5, notes: 'mahlaks' },
                { ingredientId: ingredientIds['Gaseeritud vesi'], amount: 150, notes: '' },
                { ingredientId: ingredientIds['Stevia'], amount: 1, notes: 'maitse järgi' },
                { ingredientId: ingredientIds['Jää'], amount: 6, notes: 'purustatud' },
            ],
            instructions: [
                'Pane mündilehed ja laimimahl klaasi põhja.',
                'Mulju kergelt nuiaga, et maitsed vabaneks.',
                'Lisa stevia ja rumm.',
                'Täida klaas jääga ja pikenda gaseeritud veega.',
                'Sega kergelt ja kaunista mündilehega.'
            ],
            tips: ['Kasuta värsket piparmünti!', 'Ära purusta münti liiga palju, muidu muutub see kibedaks.']
        },
        {
            title: 'Skinny Gin Tonic',
            description: 'Klassikaline G&T, aga 0-kalori toonikuga. Vaid ~65 kcal!',
            course: 'bailando',
            servings: 1,
            prepTime: 2,
            cookTime: 0,
            ingredients: [
                { ingredientId: ingredientIds['Džinn'], amount: 40, notes: 'kvaliteetne' },
                { ingredientId: ingredientIds['Toonik (suhkruvaba)'], amount: 150, notes: '' },
                { ingredientId: ingredientIds['Laim'], amount: 1, notes: 'viil' },
                { ingredientId: ingredientIds['Jää'], amount: 5, notes: 'kuubikut' },
                { ingredientId: ingredientIds['Kurk'], amount: 20, notes: 'viil (soovi korral)' },
            ],
            instructions: [
                'Täida Copa klaas (või veiniklaas) jääga.',
                'Vala peale džinn.',
                'Pikenda suhkruvaba toonikuga.',
                'Kaunista laimiviilu ja kurgiga.'
            ],
            tips: ['Mida rohkem jääd, seda vähem jook lahjeneb.']
        },
        {
            title: 'Cuba Libre Zero',
            description: 'Rum ja koola, aga ilma suhkruta. Pidu sinus eneses!',
            course: 'bailando',
            servings: 1,
            prepTime: 2,
            cookTime: 0,
            ingredients: [
                { ingredientId: ingredientIds['Rumm (tume)'], amount: 50, notes: '' },
                { ingredientId: ingredientIds['Coca-Cola Zero'], amount: 150, notes: '' },
                { ingredientId: ingredientIds['Laim'], amount: 1, notes: 'sektor' },
                { ingredientId: ingredientIds['Jää'], amount: 5, notes: '' },
            ],
            instructions: [
                'Täida klaas jääga.',
                'Pigista sisse laimisektorist mahl ja viska sektor klaasi.',
                'Vala peale rumm.',
                'Pikenda Coca-Cola Zeroga.'
            ],
            tips: ['Tume rumm annab sügavama maitse kui valge.']
        },
        {
            title: 'Aperol Spritz (Light)',
            description: 'Itaalia lemmik veidi kergemas võtmes.',
            course: 'bailando',
            servings: 1,
            prepTime: 3,
            cookTime: 0,
            ingredients: [
                { ingredientId: ingredientIds['Aperol'], amount: 40, notes: '' },
                { ingredientId: ingredientIds['Prosecco'], amount: 60, notes: '' },
                { ingredientId: ingredientIds['Gaseeritud vesi'], amount: 40, notes: '' },
                { ingredientId: ingredientIds['Apelsin'], amount: 1, notes: 'viil' },
                { ingredientId: ingredientIds['Jää'], amount: 5, notes: '' },
            ],
            instructions: [
                'Täida suur veiniklaas ohtra jääga.',
                'Vala koostisosad: Prosecco, siis Aperol, lõpuks mullivesi.',
                'Sega kergelt.',
                'Kaunista apelsiniviiluga.'
            ],
            tips: ['Tavapärane suhe on 3:2:1 (Prosecco:Aperol:Vesi), aga siin on vett rohkem, et kaloreid vähendada.']
        },
        {
            title: 'Vodka Soda Lime',
            description: 'Kõige puhtam ja madalama kalorsusega jook. "Skinny Bitch".',
            course: 'bailando',
            servings: 1,
            prepTime: 2,
            cookTime: 0,
            ingredients: [
                { ingredientId: ingredientIds['Viin'], amount: 40, notes: '' },
                { ingredientId: ingredientIds['Gaseeritud vesi'], amount: 150, notes: '' },
                { ingredientId: ingredientIds['Laim'], amount: 0.5, notes: 'mahlaks' },
                { ingredientId: ingredientIds['Jää'], amount: 5, notes: '' },
            ],
            instructions: [
                'Täida klaas jääga.',
                'Vala viin.',
                'Pigista sisse poole laimi mahl.',
                'Pikenda mulliveega.',
                'Sega.'
            ],
            tips: ['Kasuta värsket laimi, mitte kontsentraati!']
        },
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
            title: 'Kreemjas Hommikuputru',
            description: 'Tervislik ja toitev kaerahelbepuder marjadega.',
            course: 'breakfast',
            servings: 1,
            prepTime: 2,
            cookTime: 8,
            ingredients: [
                { ingredientId: ingredientIds['Kaerahelbed'], amount: 50, notes: '' },
                { ingredientId: ingredientIds['Piim 2.5%'], amount: 200, notes: '' },
                { ingredientId: ingredientIds['Mustikad'], amount: 50, notes: 'värsked või külmutatud' },
                { ingredientId: ingredientIds['Mesi'], amount: 1, notes: 'maitse järgi' },
                { ingredientId: ingredientIds['Kaneel'], amount: 0.5, notes: '' },
                { ingredientId: ingredientIds['Chia seemned'], amount: 1, notes: '' },
            ],
            instructions: [
                'Sega potis kaerahelbed ja piim.',
                'Kuumuta keemiseni ja keeda tasasel tulel 5-7 minutit.',
                'Lisa kaneel ja chia seemned.',
                'Serveeri kausis marjade ja meega.'
            ],
            tips: ['Lisa näpuotsatäis soola maitse tasakaalustamiseks.']
        },
        {
            title: 'Värske Kreeka Salat',
            description: 'Klassikaline ja värske salat palju köögiviljade ja fetaga.',
            course: 'salad',
            servings: 2,
            prepTime: 15,
            cookTime: 0,
            ingredients: [
                { ingredientId: ingredientIds['Kurk'], amount: 300, notes: 'kuubikuteks' },
                { ingredientId: ingredientIds['Tomat'], amount: 250, notes: 'sektoriteks' },
                { ingredientId: ingredientIds['Punane sibul'], amount: 1, notes: 'viiludeks' },
                { ingredientId: ingredientIds['Paprika'], amount: 1, notes: 'ribadeks' },
                { ingredientId: ingredientIds['Feta'], amount: 150, notes: 'kuubikuteks' },
                { ingredientId: ingredientIds['Oliiviõli'], amount: 2, notes: '' },
                { ingredientId: ingredientIds['Oregano'], amount: 1, notes: 'kuivatatud' },
            ],
            instructions: [
                'Haki kõik köögiviljad suurteks tükkideks.',
                'Sega kausis kergelt läbi.',
                'Lisa feta juust ja oliivid (kui on).',
                'Nirista peale oliiviõli ja puista oreganot.'
            ],
            tips: ['Ära sega liiga palju, et feta ei laguneks.']
        },
        {
            title: 'Kana ja Köögivilja Wok',
            description: 'Kiire, tervislik ja valgurikas õhtusöök.',
            course: 'main',
            servings: 2,
            prepTime: 15,
            cookTime: 10,
            ingredients: [
                { ingredientId: ingredientIds['Kanafilee'], amount: 300, notes: 'ribadeks' },
                { ingredientId: ingredientIds['Brokkoli'], amount: 200, notes: 'õisikuteks' },
                { ingredientId: ingredientIds['Porgand'], amount: 100, notes: 'ribadeks' },
                { ingredientId: ingredientIds['Paprika'], amount: 1, notes: 'ribadeks' },
                { ingredientId: ingredientIds['Küüslauk'], amount: 2, notes: 'hakitud' },
                { ingredientId: ingredientIds['Oliiviõli'], amount: 1, notes: 'praadimiseks' },
                { ingredientId: ingredientIds['Riis'], amount: 120, notes: 'lisandiks' },
            ],
            instructions: [
                'Keeda riis vastavalt juhendile.',
                'Kuumuta pannil õli ja prae kanafilee kuldseks.',
                'Lisa köögiviljad ja küüslauk, woki 5-7 minutit.',
                'Maitsesta soola ja pipraga.',
                'Serveeri riisiga.'
            ],
            tips: ['Ära köögivilju üle küpseta, need peaksid jääma krõmpsuks.']
        },
        {
            title: 'Tervislik Roheline Smuuti',
            description: 'Vitamiinipomm spinati ja puuviljadega.',
            course: 'dessert',
            servings: 1,
            prepTime: 5,
            cookTime: 0,
            ingredients: [
                { ingredientId: ingredientIds['Banaan'], amount: 1, notes: 'külmutatud parem' },
                { ingredientId: ingredientIds['Spinat'], amount: 50, notes: 'värske' },
                { ingredientId: ingredientIds['Õun'], amount: 1, notes: 'tükeldatud' },
                { ingredientId: ingredientIds['Sidrun'], amount: 0.5, notes: 'mahl' },
                { ingredientId: ingredientIds['Oliiviõli'], amount: 0, notes: 'skip' } // hack for matching index, cleaner to just omit if not needed, but code above uses exact map.
            ],
            instructions: [
                'Pane kõik koostisosad blenderisse.',
                'Blenderda ühtlaseks smuutiks.',
                'Naudi kohe.'
            ],
            tips: ['Kui smuuti on liiga paks, lisa veidi vett.']
        },
        {
            title: 'Lõhefilee Ahjujuurviljadega',
            description: 'Maitsev ja oomega-3 rikas õhtusöök.',
            course: 'main',
            servings: 2,
            prepTime: 10,
            cookTime: 25,
            ingredients: [
                { ingredientId: ingredientIds['Lõhe'], amount: 300, notes: 'filee' },
                { ingredientId: ingredientIds['Suvikõrvits'], amount: 200, notes: 'viiludeks' },
                { ingredientId: ingredientIds['Tomat'], amount: 200, notes: 'kirsstomatid' },
                { ingredientId: ingredientIds['Sidrun'], amount: 0.5, notes: 'viiludeks' },
                { ingredientId: ingredientIds['Oliiviõli'], amount: 1, notes: '' },
                { ingredientId: ingredientIds['Sool'], amount: 1, notes: '' },
            ],
            instructions: [
                'Kuumuta ahi 200 kraadini.',
                'Aseta lõhefilee ahjuvormi.',
                'Kuhja ümber köögiviljad.',
                'Nirista peale õli, maitsesta soola ja tilliga.',
                'Küpseta 20-25 minutit kuni kala on küps.'
            ],
            tips: ['Serveeri värske sidrunimahlaga.']
        },
        // ==================== SUPID (soup) ====================
        {
            title: 'Vahemere Läätsesupp',
            description: 'Toitev ja vürtsikas supp läätste ja köögiviljadega.',
            course: 'soup',
            servings: 4,
            prepTime: 15,
            cookTime: 30,
            ingredients: [
                { ingredientId: ingredientIds['Punaläätsed'], amount: 200, notes: 'pestud' },
                { ingredientId: ingredientIds['Sibul'], amount: 1, notes: 'hakitud' },
                { ingredientId: ingredientIds['Porgand'], amount: 150, notes: 'kuubikuteks' },
                { ingredientId: ingredientIds['Küüslauk'], amount: 3, notes: 'purustatud' },
                { ingredientId: ingredientIds['Tomat'], amount: 200, notes: 'purustatud' },
                { ingredientId: ingredientIds['Oliiviõli'], amount: 2, notes: '' },
                { ingredientId: ingredientIds['Sool'], amount: 1, notes: '' },
            ],
            instructions: [
                'Kuumuta õli suuremas potis.',
                'Lisa sibul ja porgand, prae 5 minutit.',
                'Lisa küüslauk, prae 1 minut.',
                'Lisa läätsed, tomatid ja 1 liiter vett.',
                'Keeda 25-30 minutit kuni läätsed on pehmed.',
                'Maitsesta soolaga.'
            ],
            tips: ['Serveeri leiva ja oliiviõliga.']
        },
        {
            title: 'Aasia Misosupp Tofuga',
            description: 'Traditsiooniline Jaapani supp kasulike omadustega.',
            course: 'soup',
            servings: 2,
            prepTime: 10,
            cookTime: 10,
            ingredients: [
                { ingredientId: ingredientIds['Tofu'], amount: 150, notes: 'kuubikuteks' },
                { ingredientId: ingredientIds['Spinat'], amount: 50, notes: 'värske' },
                { ingredientId: ingredientIds['Küüslauk'], amount: 1, notes: 'viilutatud' },
            ],
            instructions: [
                'Kuumuta 500ml vett potis.',
                'Lisa tofu ja keeda 3 minutit.',
                'Lisa spinat.',
                'Maitsesta soola ja miso pastaga (kui on).'
            ],
            tips: ['Lisa ka sojasoust maitse jaoks.']
        },
        {
            title: 'Eesti Hapukapsasupp',
            description: 'Klassikaline Eesti talvesupp hapukapsaga.',
            course: 'soup',
            servings: 6,
            prepTime: 20,
            cookTime: 45,
            ingredients: [
                { ingredientId: ingredientIds['Hapukapsas'], amount: 400, notes: '' },
                { ingredientId: ingredientIds['Sealiha'], amount: 300, notes: 'kuubikuteks' },
                { ingredientId: ingredientIds['Kartul'], amount: 300, notes: 'kuubikuteks' },
                { ingredientId: ingredientIds['Porgand'], amount: 100, notes: 'riivitud' },
                { ingredientId: ingredientIds['Sibul'], amount: 1, notes: 'hakitud' },
            ],
            instructions: [
                'Pruunista liha suuremas potis.',
                'Lisa sibul ja prae kuni kuldne.',
                'Lisa hapukapsas ja porgand.',
                'Lisa 1.5 liitrit vett ja keeda 30 min.',
                'Lisa kartulid ja keeda veel 15 min.',
            ],
            tips: ['Serveeri hapukoore ja tilliga.']
        },
        {
            title: 'Itaalia Minestrone',
            description: 'Klassikaline Itaalia köögiviljasupp pastaga.',
            course: 'soup',
            servings: 6,
            prepTime: 20,
            cookTime: 35,
            ingredients: [
                { ingredientId: ingredientIds['Sibul'], amount: 1, notes: 'hakitud' },
                { ingredientId: ingredientIds['Porgand'], amount: 150, notes: 'kuubikuteks' },
                { ingredientId: ingredientIds['Tomat'], amount: 400, notes: 'purustatud' },
                { ingredientId: ingredientIds['Suvikõrvits'], amount: 150, notes: 'kuubikuteks' },
                { ingredientId: ingredientIds['Spinat'], amount: 100, notes: 'värske' },
                { ingredientId: ingredientIds['Pasta'], amount: 100, notes: '' },
                { ingredientId: ingredientIds['Oliiviõli'], amount: 2, notes: '' },
            ],
            instructions: [
                'Kuumuta õli ja prae sibulat 3 min.',
                'Lisa porgand ja suvikõrvits.',
                'Lisa tomatid ja 1 liiter vett.',
                'Keeda 20 minutit.',
                'Lisa pasta ja keeda veel 10 min.',
                'Lisa spinat ja maitsesta.'
            ],
            tips: ['Riivi peale parmesani.']
        },
        {
            title: 'Tai Kookose-Kanasupp',
            description: 'Kreemjas ja aromaatne Tai stiilis supp.',
            course: 'soup',
            servings: 4,
            prepTime: 15,
            cookTime: 20,
            ingredients: [
                { ingredientId: ingredientIds['Kanafilee'], amount: 300, notes: 'ribadeks' },
                { ingredientId: ingredientIds['Kookospiim'], amount: 400, notes: '' },
                { ingredientId: ingredientIds['Ingver'], amount: 20, notes: 'riivitud' },
                { ingredientId: ingredientIds['Küüslauk'], amount: 2, notes: 'hakitud' },
                { ingredientId: ingredientIds['Seened'], amount: 150, notes: 'viilutatud' },
                { ingredientId: ingredientIds['Laim'], amount: 1, notes: 'mahl' },
            ],
            instructions: [
                'Kuumuta kookospiim potis.',
                'Lisa ingver ja küüslauk.',
                'Lisa kana ja keeda 10 min.',
                'Lisa seened ja keeda 5 min.',
                'Lisa laimimahl enne serveerimist.'
            ],
            tips: ['Lisa koriandrit.']
        },
        // ==================== EELROOG (appetizer) ====================
        {
            title: 'Vahemere Hummus',
            description: 'Kreemjas kikerherne dipp oliiviõli ja vürtsidega.',
            course: 'appetizer',
            servings: 6,
            prepTime: 10,
            cookTime: 0,
            ingredients: [
                { ingredientId: ingredientIds['Kikerhernes'], amount: 400, notes: 'kurnatud' },
                { ingredientId: ingredientIds['Oliiviõli'], amount: 3, notes: '' },
                { ingredientId: ingredientIds['Küüslauk'], amount: 2, notes: 'purustatud' },
                { ingredientId: ingredientIds['Sidrun'], amount: 1, notes: 'mahl' },
                { ingredientId: ingredientIds['Sool'], amount: 1, notes: '' },
            ],
            instructions: [
                'Pane kõik koostisosad blenderisse.',
                'Blenderda siledaks.',
                'Maitsesta soola ja sidruniga.',
                'Serveeri oliiviõliga.'
            ],
            tips: ['Serveeri pita leiva või köögiviljapulkadega.']
        },
        {
            title: 'Itaalia Bruschetta',
            description: 'Klassikaline Itaalia eelroog tomati ja basiilikuga.',
            course: 'appetizer',
            servings: 4,
            prepTime: 15,
            cookTime: 5,
            ingredients: [
                { ingredientId: ingredientIds['Tomat'], amount: 300, notes: 'kuubikuteks' },
                { ingredientId: ingredientIds['Küüslauk'], amount: 2, notes: 'hakitud' },
                { ingredientId: ingredientIds['Oliiviõli'], amount: 3, notes: '' },
                { ingredientId: ingredientIds['Sool'], amount: 1, notes: '' },
            ],
            instructions: [
                'Sega tomatid, küüslauk ja oliiviõli.',
                'Maitsesta soola ja pipraga.',
                'Röösti leivad.',
                'Kata tomati seguga.'
            ],
            tips: ['Lisa värsket basiilikut.']
        },
        {
            title: 'Kreeka Tzatziki',
            description: 'Värskendav Kreeka jogurtidipp kurgiga.',
            course: 'appetizer',
            servings: 4,
            prepTime: 10,
            cookTime: 0,
            ingredients: [
                { ingredientId: ingredientIds['Kreeka jogurt'], amount: 300, notes: '' },
                { ingredientId: ingredientIds['Kurk'], amount: 150, notes: 'riivitud, pressitud' },
                { ingredientId: ingredientIds['Küüslauk'], amount: 2, notes: 'purustatud' },
                { ingredientId: ingredientIds['Oliiviõli'], amount: 1, notes: '' },
                { ingredientId: ingredientIds['Sidrun'], amount: 0.5, notes: 'mahl' },
            ],
            instructions: [
                'Riivi kurk ja pressi vedelik välja.',
                'Sega jogurt, kurk, küüslauk.',
                'Lisa oliiviõli ja sidrunimahl.',
                'Jahuta vähemalt 30 min.'
            ],
            tips: ['Serveeri pita leivaga.']
        },
        {
            title: 'Aasia Kevadrullid',
            description: 'Kerged ja tervislikud Vietnami stiilis rullid.',
            course: 'appetizer',
            servings: 4,
            prepTime: 25,
            cookTime: 0,
            ingredients: [
                { ingredientId: ingredientIds['Kurk'], amount: 100, notes: 'ribadeks' },
                { ingredientId: ingredientIds['Porgand'], amount: 100, notes: 'ribadeks' },
                { ingredientId: ingredientIds['Paprika'], amount: 1, notes: 'ribadeks' },
                { ingredientId: ingredientIds['Krevetid'], amount: 150, notes: 'keedetud' },
            ],
            instructions: [
                'Leota riisipaber soojas vees.',
                'Aseta köögiviljad ja krevetid.',
                'Rulli kokku.',
                'Serveeri maapähklikastmega.'
            ],
            tips: ['Lisa ka värsket münti.']
        },
        {
            title: 'Eesti Marineeritud Heeringas',
            description: 'Traditsiooniline Eesti eelroog heeringaga.',
            course: 'appetizer',
            servings: 6,
            prepTime: 15,
            cookTime: 0,
            ingredients: [
                { ingredientId: ingredientIds['Heeringas'], amount: 300, notes: 'fileed' },
                { ingredientId: ingredientIds['Punane sibul'], amount: 1, notes: 'rõngasteks' },
                { ingredientId: ingredientIds['Hapukoor 20%'], amount: 100, notes: '' },
            ],
            instructions: [
                'Aseta heeringafileed serveerimistaldrikule.',
                'Kata sibuliga.',
                'Lisa hapukoort.'
            ],
            tips: ['Serveeri leivaga.']
        },
        // ==================== PEAROAD (main) ====================
        {
            title: 'Aasia Kana Stir-Fry',
            description: 'Kiire ja maitsev Aasia stiilis praekana köögiviljadega.',
            course: 'main',
            servings: 4,
            prepTime: 15,
            cookTime: 15,
            ingredients: [
                { ingredientId: ingredientIds['Kanafilee'], amount: 400, notes: 'ribadeks' },
                { ingredientId: ingredientIds['Brokkoli'], amount: 200, notes: 'roosikesteks' },
                { ingredientId: ingredientIds['Paprika'], amount: 2, notes: 'ribadeks' },
                { ingredientId: ingredientIds['Porgand'], amount: 100, notes: 'ribadeks' },
                { ingredientId: ingredientIds['Ingver'], amount: 15, notes: 'riivitud' },
                { ingredientId: ingredientIds['Küüslauk'], amount: 3, notes: 'hakitud' },
                { ingredientId: ingredientIds['Seesamiõli'], amount: 2, notes: '' },
            ],
            instructions: [
                'Kuumuta õli wokkpannil.',
                'Prae kana kuni kuldne.',
                'Lisa köögiviljad, prae 5 min.',
                'Lisa ingver ja küüslauk.',
                'Lisa sojakastet maitse järgi.'
            ],
            tips: ['Serveeri riisiga.']
        },
        {
            title: 'Vahemere Kana Kreeka Moodi',
            description: 'Mahlane kana oliivide ja feta juustuga.',
            course: 'main',
            servings: 4,
            prepTime: 15,
            cookTime: 25,
            ingredients: [
                { ingredientId: ingredientIds['Kanafilee'], amount: 400, notes: '' },
                { ingredientId: ingredientIds['Tomat'], amount: 200, notes: 'lõhutud' },
                { ingredientId: ingredientIds['Kurk'], amount: 100, notes: 'kuubikuteks' },
                { ingredientId: ingredientIds['Punane sibul'], amount: 1, notes: 'viiluteks' },
                { ingredientId: ingredientIds['Feta'], amount: 100, notes: 'murendatud' },
                { ingredientId: ingredientIds['Oliiviõli'], amount: 2, notes: '' },
            ],
            instructions: [
                'Maitsesta kana ja küpseta pannil.',
                'Sega tomatid, kurk, sibul ja feta.',
                'Maitsesta oliiviõliga.',
                'Serveeri kana salati peal.'
            ],
            tips: ['Lisa Kreeka oliive.']
        },
        {
            title: 'Itaalia Pasta Primavera',
            description: 'Värske köögiviljapasta kerge oliiviõli kastmega.',
            course: 'main',
            servings: 4,
            prepTime: 10,
            cookTime: 20,
            ingredients: [
                { ingredientId: ingredientIds['Pasta'], amount: 300, notes: '' },
                { ingredientId: ingredientIds['Suvikõrvits'], amount: 150, notes: 'viilutatud' },
                { ingredientId: ingredientIds['Kirsstomat'], amount: 200, notes: 'pooleks' },
                { ingredientId: ingredientIds['Küüslauk'], amount: 3, notes: 'viilutatud' },
                { ingredientId: ingredientIds['Parmesaan'], amount: 50, notes: 'riivitud' },
                { ingredientId: ingredientIds['Oliiviõli'], amount: 3, notes: '' },
            ],
            instructions: [
                'Keeda pasta al dente.',
                'Prae köögiviljad oliiviõlis.',
                'Lisa küüslauk.',
                'Sega pasta köögiviljadega.',
                'Lisa parmesani.'
            ],
            tips: ['Lisa värsket basiilikut.']
        },
        {
            title: 'Ameerika Tervislik Burger',
            description: 'Kalkuni burger avokaado ja salati.',
            course: 'main',
            servings: 4,
            prepTime: 15,
            cookTime: 15,
            ingredients: [
                { ingredientId: ingredientIds['Kalkuniliha'], amount: 400, notes: 'hakitud' },
                { ingredientId: ingredientIds['Avokaado'], amount: 1, notes: 'viilutatud' },
                { ingredientId: ingredientIds['Tomat'], amount: 1, notes: 'viilutatud' },
                { ingredientId: ingredientIds['Punane sibul'], amount: 0.5, notes: 'rõngad' },
                { ingredientId: ingredientIds['Sidrun'], amount: 0.5, notes: 'mahl' },
            ],
            instructions: [
                'Vormi hakklihast burgerid.',
                'Küpseta pannil mõlemalt poolt.',
                'Kata avokaado, tomati ja sibulaga.',
                'Serveeri täistera saiaga.'
            ],
            tips: ['Tee guacamole kastmega.']
        },
        {
            title: 'Eesti Seapraad Hapukapsaga',
            description: 'Traditsiooniline Eesti liharoog hapukapsaga.',
            course: 'main',
            servings: 6,
            prepTime: 20,
            cookTime: 90,
            ingredients: [
                { ingredientId: ingredientIds['Seakarbonaad'], amount: 800, notes: '' },
                { ingredientId: ingredientIds['Hapukapsas'], amount: 500, notes: '' },
                { ingredientId: ingredientIds['Sibul'], amount: 2, notes: 'viiluteks' },
                { ingredientId: ingredientIds['Sool'], amount: 1, notes: '' },
                { ingredientId: ingredientIds['Pipar'], amount: 1, notes: '' },
            ],
            instructions: [
                'Maitsesta liha soola ja pipraga.',
                'Pruunista pannil.',
                'Aseta ahjuvormi.',
                'Kata hapukapsaga ja sibulaga.',
                'Küpseta 180°C juures 1.5h.'
            ],
            tips: ['Serveeri kartulitega.']
        },
        // ==================== LISANDID (side) ====================
        {
            title: 'Vahemere Tabouleh Salat',
            description: 'Värske Liibanoni salat bulguri ja peterselliga.',
            course: 'side',
            servings: 6,
            prepTime: 20,
            cookTime: 15,
            ingredients: [
                { ingredientId: ingredientIds['Bulgur'], amount: 150, notes: 'keedetud' },
                { ingredientId: ingredientIds['Tomat'], amount: 200, notes: 'kuubikuteks' },
                { ingredientId: ingredientIds['Kurk'], amount: 150, notes: 'kuubikuteks' },
                { ingredientId: ingredientIds['Punane sibul'], amount: 0.5, notes: 'peeneks' },
                { ingredientId: ingredientIds['Sidrun'], amount: 1, notes: 'mahl' },
                { ingredientId: ingredientIds['Oliiviõli'], amount: 3, notes: '' },
            ],
            instructions: [
                'Keeda bulgur ja jahuta.',
                'Sega köögiviljad.',
                'Lisa bulgur.',
                'Maitsesta sidruni ja õliga.'
            ],
            tips: ['Lisa palju värsket peterselli.']
        },
        {
            title: 'Aasia Seesamiseemne Nuudlid',
            description: 'Kerged nuudlid seesamikastmes.',
            course: 'side',
            servings: 4,
            prepTime: 10,
            cookTime: 10,
            ingredients: [
                { ingredientId: ingredientIds['Riisi nuudlid'], amount: 200, notes: '' },
                { ingredientId: ingredientIds['Seesamiõli'], amount: 2, notes: '' },
                { ingredientId: ingredientIds['Porgand'], amount: 100, notes: 'ribadeks' },
                { ingredientId: ingredientIds['Kurk'], amount: 100, notes: 'ribadeks' },
            ],
            instructions: [
                'Keeda nuudlid.',
                'Sega seesamiõliga.',
                'Lisa köögiviljad.',
                'Lisa sojasoust.'
            ],
            tips: ['Puista peale seesamiseeemned.']
        },
        {
            title: 'Itaalia Caprese Salat',
            description: 'Lihtne salat mozzarella ja tomatiga.',
            course: 'side',
            servings: 4,
            prepTime: 10,
            cookTime: 0,
            ingredients: [
                { ingredientId: ingredientIds['Tomat'], amount: 300, notes: 'viilutatud' },
                { ingredientId: ingredientIds['Mozzarella'], amount: 200, notes: 'viilutatud' },
                { ingredientId: ingredientIds['Oliiviõli'], amount: 2, notes: '' },
                { ingredientId: ingredientIds['Sool'], amount: 1, notes: '' },
            ],
            instructions: [
                'Aseta tomati ja mozzarella viilud vaheldumisi.',
                'Nirista oliiviõli.',
                'Maitsesta soola ja pipraga.'
            ],
            tips: ['Lisa värsket basiilikut.']
        },
        {
            title: 'Ameerika Grillitud Spargelid',
            description: 'Kerged grillitud köögiviljad.',
            course: 'side',
            servings: 4,
            prepTime: 5,
            cookTime: 10,
            ingredients: [
                { ingredientId: ingredientIds['Brokkoli'], amount: 300, notes: '' },
                { ingredientId: ingredientIds['Oliiviõli'], amount: 2, notes: '' },
                { ingredientId: ingredientIds['Sidrun'], amount: 0.5, notes: 'mahl' },
                { ingredientId: ingredientIds['Sool'], amount: 1, notes: '' },
            ],
            instructions: [
                'Kuumuta grillpann.',
                'Kata brokkoli õli ja soolaga.',
                'Grilli 8-10 min.',
                'Nirista sidrunimahla.'
            ],
            tips: ['Serveeri kohe.']
        },
        {
            title: 'Eesti Kodujuustu Salat',
            description: 'Kerge salat kodujuustu ja köögiviljadega.',
            course: 'side',
            servings: 4,
            prepTime: 10,
            cookTime: 0,
            ingredients: [
                { ingredientId: ingredientIds['Kodujuust'], amount: 200, notes: '' },
                { ingredientId: ingredientIds['Kurk'], amount: 150, notes: 'kuubikuteks' },
                { ingredientId: ingredientIds['Tomat'], amount: 150, notes: 'kuubikuteks' },
                { ingredientId: ingredientIds['Hapukoor 20%'], amount: 2, notes: '' },
            ],
            instructions: [
                'Sega kodujuust köögiviljadega.',
                'Lisa hapukoort.',
                'Maitsesta soolaga.'
            ],
            tips: ['Lisa tilllehti.']
        },
        // ==================== MAGUSTOIDUD (dessert) ====================
        {
            title: 'Vahemere Chia Puding',
            description: 'Kreemjas ja tervislik puding.',
            course: 'dessert',
            servings: 2,
            prepTime: 10,
            cookTime: 0,
            ingredients: [
                { ingredientId: ingredientIds['Chia seemned'], amount: 40, notes: '' },
                { ingredientId: ingredientIds['Kookospiim'], amount: 250, notes: '' },
                { ingredientId: ingredientIds['Mesi'], amount: 1, notes: '' },
                { ingredientId: ingredientIds['Maasikad'], amount: 100, notes: 'kaunistuseks' },
            ],
            instructions: [
                'Sega chia seemned kookospiimaga.',
                'Lisa mett.',
                'Jahuta öö läbi.',
                'Kata marjadega.'
            ],
            tips: ['Lisa ka granoola.']
        },
        {
            title: 'Ameerika Banaani Kaerahelbe Küpsised',
            description: 'Tervislikud küpsised kahest koostisosast.',
            course: 'dessert',
            servings: 12,
            prepTime: 10,
            cookTime: 15,
            ingredients: [
                { ingredientId: ingredientIds['Banaan'], amount: 2, notes: 'küpsed, muljutud' },
                { ingredientId: ingredientIds['Kaerahelbed'], amount: 150, notes: '' },
                { ingredientId: ingredientIds['Mesi'], amount: 1, notes: 'soovi korral' },
            ],
            instructions: [
                'Muljud banaanid.',
                'Sega kaerahelvestega.',
                'Vormi küpsisteks.',
                'Küpseta 180°C 12-15 min.'
            ],
            tips: ['Lisa šokolaadilaastu.']
        },
        {
            title: 'Kreeka Jogurt Marjadega',
            description: 'Lihtne ja tervislik Kreeka stiilis magustoit.',
            course: 'dessert',
            servings: 2,
            prepTime: 5,
            cookTime: 0,
            ingredients: [
                { ingredientId: ingredientIds['Kreeka jogurt'], amount: 200, notes: '' },
                { ingredientId: ingredientIds['Mustikad'], amount: 100, notes: '' },
                { ingredientId: ingredientIds['Mesi'], amount: 1, notes: '' },
                { ingredientId: ingredientIds['Mandlid'], amount: 20, notes: 'röstitud' },
            ],
            instructions: [
                'Jaga jogurt kaussidesse.',
                'Lisa marjad.',
                'Nirista mett.',
                'Puista pähkleid.'
            ],
            tips: ['Lisa granoola.']
        },
        {
            title: 'Aasia Mango Sticky Rice',
            description: 'Klassikaline Tai magustoit.',
            course: 'dessert',
            servings: 4,
            prepTime: 30,
            cookTime: 30,
            ingredients: [
                { ingredientId: ingredientIds['Mango'], amount: 2, notes: 'viilutatud' },
                { ingredientId: ingredientIds['Riis'], amount: 200, notes: 'kleepuv riis' },
                { ingredientId: ingredientIds['Kookospiim'], amount: 200, notes: '' },
            ],
            instructions: [
                'Leota riis 30 min.',
                'Aurata küpseks.',
                'Sega kookospiimaga.',
                'Serveeri mangoga.'
            ],
            tips: ['Lisa kookoshelbed.']
        },
        {
            title: 'Eesti Kodujuustukook',
            description: 'Kerge ja tervislik kodujuustuga kook.',
            course: 'dessert',
            servings: 8,
            prepTime: 20,
            cookTime: 45,
            ingredients: [
                { ingredientId: ingredientIds['Kodujuust'], amount: 500, notes: '' },
                { ingredientId: ingredientIds['Muna'], amount: 3, notes: '' },
                { ingredientId: ingredientIds['Mesi'], amount: 3, notes: '' },
                { ingredientId: ingredientIds['Vanilliekstrakt'], amount: 1, notes: '' },
            ],
            instructions: [
                'Blenderda kodujuust siledaks.',
                'Lisa munad ükshaaval.',
                'Lisa mesi ja vanill.',
                'Küpseta 160°C 45 min.'
            ],
            tips: ['Jahuta täielikult.']
        },
        // ==================== SUUPISTED (snack) ====================
        {
            title: 'Vahemere Röstitud Kikerhernes',
            description: 'Krõbe ja valkuderikas suupiste.',
            course: 'snack',
            servings: 4,
            prepTime: 5,
            cookTime: 30,
            ingredients: [
                { ingredientId: ingredientIds['Kikerhernes'], amount: 400, notes: 'kurnatud, kuivatatud' },
                { ingredientId: ingredientIds['Oliiviõli'], amount: 2, notes: '' },
                { ingredientId: ingredientIds['Paprikapulber'], amount: 1, notes: '' },
                { ingredientId: ingredientIds['Sool'], amount: 1, notes: '' },
            ],
            instructions: [
                'Kuivata kikerhernes.',
                'Sega õli ja maitseainetega.',
                'Küpseta 200°C 25-30 min.',
                'Loksuta vahepeal.'
            ],
            tips: ['Säilub kinnises karbis paar päeva.']
        },
        {
            title: 'Ameerika Maapähklivõi Õunad',
            description: 'Lihtne ja tervislik suupiste.',
            course: 'snack',
            servings: 2,
            prepTime: 5,
            cookTime: 0,
            ingredients: [
                { ingredientId: ingredientIds['Õun'], amount: 2, notes: 'viilutatud' },
                { ingredientId: ingredientIds['Maapähklivõi'], amount: 2, notes: '' },
            ],
            instructions: [
                'Viiluta õunad.',
                'Serveeri maapähklivõiga.'
            ],
            tips: ['Lisa kaneelit.']
        },
        {
            title: 'Aasia Edamame',
            description: 'Soolatud sojaoad.',
            course: 'snack',
            servings: 4,
            prepTime: 2,
            cookTime: 5,
            ingredients: [
                { ingredientId: ingredientIds['Edamame'], amount: 300, notes: 'külmutatud' },
                { ingredientId: ingredientIds['Sool'], amount: 1, notes: 'meresoola' },
            ],
            instructions: [
                'Keeda edamame soolases vees 5 min.',
                'Kurna.',
                'Puista soola.'
            ],
            tips: ['Serveeri soojalt.']
        },
        {
            title: 'Eesti Munatoast',
            description: 'Klassikaline Eesti hommikusndvitš.',
            course: 'snack',
            servings: 2,
            prepTime: 5,
            cookTime: 5,
            ingredients: [
                { ingredientId: ingredientIds['Muna'], amount: 2, notes: 'kõvaks keedetud' },
                { ingredientId: ingredientIds['Sool'], amount: 1, notes: '' },
            ],
            instructions: [
                'Keeda munad kõvaks.',
                'Viiluta.',
                'Aseta röstitud leivale.',
                'Maitsesta soolaga.'
            ],
            tips: ['Lisa võid leivale.']
        },
        {
            title: 'Itaalia Antipastitaldrik',
            description: 'Elegantsne Itaalia snäkitaldrik.',
            course: 'snack',
            servings: 6,
            prepTime: 15,
            cookTime: 0,
            ingredients: [
                { ingredientId: ingredientIds['Mozzarella'], amount: 150, notes: 'kuulid' },
                { ingredientId: ingredientIds['Tomat'], amount: 150, notes: 'kirsstomatid' },
                { ingredientId: ingredientIds['Oliiviõli'], amount: 2, notes: '' },
            ],
            instructions: [
                'Aseta mozzarella ja tomatid taldrikule.',
                'Nirista oliiviõli.',
                'Lisa soola ja pipart.'
            ],
            tips: ['Lisa ka oliive ja sinki.']
        },
        // ==================== JOOGID (drink) ====================
        {
            title: 'Roheline Detox Smuuti',
            description: 'Värskendav vitamiinipomm.',
            course: 'drink',
            servings: 1,
            prepTime: 5,
            cookTime: 0,
            ingredients: [
                { ingredientId: ingredientIds['Spinat'], amount: 50, notes: '' },
                { ingredientId: ingredientIds['Banaan'], amount: 1, notes: 'külmutatud' },
                { ingredientId: ingredientIds['Õun'], amount: 1, notes: '' },
                { ingredientId: ingredientIds['Ingver'], amount: 10, notes: 'väike tükk' },
            ],
            instructions: [
                'Pane kõik blenderisse.',
                'Lisa pool klaasi vett.',
                'Blenderda siledaks.'
            ],
            tips: ['Naudi kohe.']
        },
        {
            title: 'Troopiline Mango Smuuti',
            description: 'Kreemjas ja magus troopiline jook.',
            course: 'drink',
            servings: 2,
            prepTime: 5,
            cookTime: 0,
            ingredients: [
                { ingredientId: ingredientIds['Mango'], amount: 1, notes: 'külmutatud tükid' },
                { ingredientId: ingredientIds['Banaan'], amount: 1, notes: '' },
                { ingredientId: ingredientIds['Kreeka jogurt'], amount: 100, notes: '' },
                { ingredientId: ingredientIds['Apelsin'], amount: 1, notes: 'mahl' },
            ],
            instructions: [
                'Blenderda mango ja banaan.',
                'Lisa jogurt.',
                'Lisa apelsinimahl.',
                'Blenderda siledaks.'
            ],
            tips: ['Lisa jääd.']
        },
        {
            title: 'Marjakokteil',
            description: 'Antioksüdantiderikas marjasmuuti.',
            course: 'drink',
            servings: 2,
            prepTime: 5,
            cookTime: 0,
            ingredients: [
                { ingredientId: ingredientIds['Maasikad'], amount: 100, notes: 'külmutatud' },
                { ingredientId: ingredientIds['Mustikad'], amount: 100, notes: 'külmutatud' },
                { ingredientId: ingredientIds['Vaarikad'], amount: 50, notes: '' },
                { ingredientId: ingredientIds['Mesi'], amount: 1, notes: '' },
            ],
            instructions: [
                'Pane marjad blenderisse.',
                'Lisa mesi ja pool klaasi vett.',
                'Blenderda siledaks.'
            ],
            tips: ['Lisa proteiinipulbrit.']
        },
        {
            title: 'Ingveri-Sidruni Vesi',
            description: 'Värskendav ja tervislik jook.',
            course: 'drink',
            servings: 4,
            prepTime: 10,
            cookTime: 5,
            ingredients: [
                { ingredientId: ingredientIds['Ingver'], amount: 30, notes: 'viilutatud' },
                { ingredientId: ingredientIds['Sidrun'], amount: 2, notes: 'viilutatud' },
                { ingredientId: ingredientIds['Mesi'], amount: 2, notes: '' },
            ],
            instructions: [
                'Keeda ingver vees 5 min.',
                'Jahuta.',
                'Lisa sidrun ja mesi.',
                'Serveeri jäise või soojana.'
            ],
            tips: ['Lisa münti.']
        },
        {
            title: 'Kaerahelbe Proteiinismuuti',
            description: 'Toitev hommikusmuuti.',
            course: 'drink',
            servings: 1,
            prepTime: 5,
            cookTime: 0,
            ingredients: [
                { ingredientId: ingredientIds['Kaerahelbed'], amount: 40, notes: '' },
                { ingredientId: ingredientIds['Banaan'], amount: 1, notes: '' },
                { ingredientId: ingredientIds['Maapähklivõi'], amount: 1, notes: '' },
                { ingredientId: ingredientIds['Piim'], amount: 250, notes: '' },
            ],
            instructions: [
                'Pane helbed ja banaan blenderisse.',
                'Lisa maapähklivõi ja piim.',
                'Blenderda siledaks.'
            ],
            tips: ['Lisa kaneelit.']
        },
        // ==================== HOMMIKUSÖÖK (breakfast) ====================
        {
            title: 'Vahemere Shakshuka',
            description: 'Vürtsikad munad tomatikastmes.',
            course: 'breakfast',
            servings: 4,
            prepTime: 10,
            cookTime: 20,
            ingredients: [
                { ingredientId: ingredientIds['Muna'], amount: 4, notes: '' },
                { ingredientId: ingredientIds['Tomat'], amount: 400, notes: 'purustatud' },
                { ingredientId: ingredientIds['Sibul'], amount: 1, notes: 'hakitud' },
                { ingredientId: ingredientIds['Paprika'], amount: 1, notes: 'kuubikuteks' },
                { ingredientId: ingredientIds['Küüslauk'], amount: 2, notes: 'hakitud' },
                { ingredientId: ingredientIds['Oliiviõli'], amount: 2, notes: '' },
            ],
            instructions: [
                'Kuumuta õli pannil.',
                'Prae sibul ja paprika.',
                'Lisa küüslauk.',
                'Lisa tomatid, keeda 10 min.',
                'Tee augud, lisa munad.',
                'Kata ja küpseta 5-7 min.'
            ],
            tips: ['Serveeri leivaga.']
        },
        {
            title: 'Ameerika Mustika Kaeraputru',
            description: 'Tervislik ja täitev hommikuputru.',
            course: 'breakfast',
            servings: 2,
            prepTime: 5,
            cookTime: 10,
            ingredients: [
                { ingredientId: ingredientIds['Kaerahelbed'], amount: 100, notes: '' },
                { ingredientId: ingredientIds['Piim'], amount: 300, notes: '' },
                { ingredientId: ingredientIds['Mustikad'], amount: 100, notes: '' },
                { ingredientId: ingredientIds['Mesi'], amount: 1, notes: '' },
                { ingredientId: ingredientIds['Mandlid'], amount: 20, notes: 'hakitud' },
            ],
            instructions: [
                'Keeda kaerahelbed piimaga.',
                'Sega vahepeal.',
                'Lisa mustikad ja mesi.',
                'Puista pähkleid.'
            ],
            tips: ['Lisa kaneeli.']
        },
        {
            title: 'Kreeka Jogurti Kausike',
            description: 'Proteiinirikas Kreeka stiilis kausike.',
            course: 'breakfast',
            servings: 1,
            prepTime: 5,
            cookTime: 0,
            ingredients: [
                { ingredientId: ingredientIds['Kreeka jogurt'], amount: 200, notes: '' },
                { ingredientId: ingredientIds['Banaan'], amount: 1, notes: 'viilutatud' },
                { ingredientId: ingredientIds['Maasikad'], amount: 50, notes: '' },
                { ingredientId: ingredientIds['Mesi'], amount: 1, notes: '' },
                { ingredientId: ingredientIds['Chia seemned'], amount: 1, notes: '' },
            ],
            instructions: [
                'Pane jogurt kaussi.',
                'Lisa puuviljad.',
                'Nirista mett.',
                'Puista chia seemned.'
            ],
            tips: ['Lisa granoola.']
        },
        {
            title: 'Aasia Congee Riisipuder',
            description: 'Hiina stiilis riisipuder.',
            course: 'breakfast',
            servings: 4,
            prepTime: 5,
            cookTime: 45,
            ingredients: [
                { ingredientId: ingredientIds['Riis'], amount: 150, notes: 'jasmiini' },
                { ingredientId: ingredientIds['Kanapuljong'], amount: 1500, notes: 'või vett' },
                { ingredientId: ingredientIds['Ingver'], amount: 20, notes: 'viilutatud' },
                { ingredientId: ingredientIds['Küüslauk'], amount: 2, notes: 'viilutatud' },
                { ingredientId: ingredientIds['Roheline sibul'], amount: 2, notes: 'hakitud' },
                { ingredientId: ingredientIds['Seesamiõli'], amount: 1, notes: 'serveerimiseks' },
                { ingredientId: ingredientIds['Sojakaste'], amount: 2, notes: 'maitse järgi' },
                { ingredientId: ingredientIds['Kanafilee'], amount: 200, notes: 'ribadeks (soovi korral)' },
            ],
            instructions: [
                'Pese riis ja pane potti koos puljongi (või veega).',
                'Lisa ingver ja küüslauk.',
                'Kuumuta keemiseni, siis alanda kuumust miinimumini.',
                'Keeda osaliselt kaetult 45-60 minutit, aeg-ajalt segades, kuni riis on täiesti pehme ja puderjas.',
                'Maitsesta sojakastmega.',
                'Serveeri rohelise sibula, seesamiõli ja soovi korral keedetud kanaga.'
            ],
            tips: ['Lisa lisandiks veel keedetud muna või praetud sibulat.']
        },
        {
            title: 'Eesti Kodujuust Pannkoogid',
            description: 'Pehmed ja proteiinirikkad pannkoogid.',
            course: 'breakfast',
            servings: 4,
            prepTime: 10,
            cookTime: 15,
            ingredients: [
                { ingredientId: ingredientIds['Kodujuust'], amount: 200, notes: '' },
                { ingredientId: ingredientIds['Muna'], amount: 2, notes: '' },
                { ingredientId: ingredientIds['Nisujahu'], amount: 50, notes: '' },
                { ingredientId: ingredientIds['Mesi'], amount: 1, notes: '' },
            ],
            instructions: [
                'Sega kodujuust ja munad.',
                'Lisa jahu.',
                'Küpseta pannil.',
                'Serveeri meega.'
            ],
            tips: ['Lisa värskeid marju.']
        },
        // ==================== UUED LISATUD RETSEPTID ====================
        {
            title: 'Aasia Misosupp Tofuga',
            description: 'Kerge ja tervislik Jaapani supp.',
            course: 'soup',
            servings: 2,
            prepTime: 5,
            cookTime: 10,
            ingredients: [
                { ingredientId: ingredientIds['Misopasta'], amount: 2, notes: '' },
                { ingredientId: ingredientIds['Tofu'], amount: 100, notes: 'kuubikuteks' },
                { ingredientId: ingredientIds['Wakame'], amount: 5, notes: 'kuivatatud' },
                { ingredientId: ingredientIds['Roheline sibul'], amount: 1, notes: 'hakitud' },
                { ingredientId: ingredientIds['Vesi'], amount: 500, notes: 'kuuma' },
            ],
            instructions: [
                'Lahusta misopasta kuumas vees.',
                'Lisa tofu ja wakame.',
                'Lase seista 2-3 minutit.',
                'Serveeri rohelise sibulaga.'
            ],
            tips: ['Ära misot keeda, see hävitab kasulikud bakterid.']
        },
        {
            title: 'Itaalia Bruschetta',
            description: 'Klassikaline Itaalia eelroog tomati ja basiilikuga.',
            course: 'appetizer',
            servings: 4,
            prepTime: 15,
            cookTime: 5,
            ingredients: [
                { ingredientId: ingredientIds['Ciabatta'], amount: 4, notes: 'viilu' },
                { ingredientId: ingredientIds['Tomat'], amount: 200, notes: 'hakitud' },
                { ingredientId: ingredientIds['Basiilik'], amount: 1, notes: 'värske' },
                { ingredientId: ingredientIds['Küüslauk'], amount: 1, notes: 'küüs' },
                { ingredientId: ingredientIds['Oliiviõli'], amount: 2, notes: '' },
            ],
            instructions: [
                'Rösti ciabatta viilud.',
                'Hõõru viilud küüslauguga.',
                'Sega hakitud tomat, basiilik ja õli.',
                'Aseta segu saiale.'
            ],
            tips: ['Kasuta kvaliteetset oliiviõli.']
        },
        {
            title: 'Itaalia Pasta Primavera',
            description: 'Kerge köögiviljapasta.',
            course: 'main',
            servings: 2,
            prepTime: 10,
            cookTime: 15,
            ingredients: [
                { ingredientId: ingredientIds['Pasta'], amount: 160, notes: 'penne või fusilli' },
                { ingredientId: ingredientIds['Brokkoli'], amount: 100, notes: 'õisikud' },
                { ingredientId: ingredientIds['Paprika'], amount: 0.5, notes: 'ribadeks' },
                { ingredientId: ingredientIds['Kirsstomat'], amount: 100, notes: 'poolitatud' },
                { ingredientId: ingredientIds['Oliiviõli'], amount: 2, notes: '' },
                { ingredientId: ingredientIds['Parmesaan'], amount: 20, notes: 'riivitud' },
            ],
            instructions: [
                'Keeda pasta al dente.',
                'Lisa brokkoli pasta keeduvette viimaseks 3 minutiks.',
                'Kurna.',
                'Sega pasta, köögiviljad ja õli.',
                'Serveeri parmesaniga.'
            ],
            tips: ['Lisa sidrunimahla värskuseks.']
        },
        {
            title: 'Ameerika Tervislik Burger',
            description: 'Kodune burger täisterakukliga.',
            course: 'main',
            servings: 1,
            prepTime: 10,
            cookTime: 10,
            ingredients: [
                { ingredientId: ingredientIds['Täisterakukkel'], amount: 1, notes: '' },
                { ingredientId: ingredientIds['Burgeripihv (veis)'], amount: 1, notes: 'või kana' },
                { ingredientId: ingredientIds['Tomat'], amount: 1, notes: 'viil' },
                { ingredientId: ingredientIds['Salatileht'], amount: 1, notes: '' },
                { ingredientId: ingredientIds['Punane sibul'], amount: 0.25, notes: 'rõngad' },
                { ingredientId: ingredientIds['Ketšup'], amount: 1, notes: '' },
            ],
            instructions: [
                'Prae või grilli pihv.',
                'Rösti kukkel.',
                'Lao burger kokku: kukkel, ketšup, salat, pihv, tomat, sibul.',
                'Naudi kohe.'
            ],
            tips: ['Lisa sinepit soovi korral.']
        },
        {
            title: 'Vahemere Kana Kreeka Moodi',
            description: 'Mahlane kana feta ja oliividega.',
            course: 'main',
            servings: 2,
            prepTime: 10,
            cookTime: 25,
            ingredients: [
                { ingredientId: ingredientIds['Kanafilee'], amount: 300, notes: '' },
                { ingredientId: ingredientIds['Feta'], amount: 50, notes: 'kuubikuteks' },
                { ingredientId: ingredientIds['Oliivid (mustad)'], amount: 10, notes: '' },
                { ingredientId: ingredientIds['Kirsstomat'], amount: 100, notes: '' },
                { ingredientId: ingredientIds['Oregano'], amount: 1, notes: '' },
                { ingredientId: ingredientIds['Oliiviõli'], amount: 1, notes: '' },
            ],
            instructions: [
                'Pruunista kana pannil õlis.',
                'Aseta ahjuvormi.',
                'Lisa tomatid, oliivid ja feta.',
                'Maitsesta oreganoga.',
                'Küpseta 200°C 15-20 min.'
            ],
            tips: ['Serveeri riisi või kartuliga.']
        },
        {
            title: 'Aasia Kana Stir-Fry',
            description: 'Kiire panniroog köögiviljadega.',
            course: 'main',
            servings: 2,
            prepTime: 15,
            cookTime: 10,
            ingredients: [
                { ingredientId: ingredientIds['Kanafilee'], amount: 300, notes: 'ribadeks' },
                { ingredientId: ingredientIds['Paprika'], amount: 1, notes: 'ribadeks' },
                { ingredientId: ingredientIds['Brokkoli'], amount: 100, notes: '' },
                { ingredientId: ingredientIds['Porgand'], amount: 1, notes: 'ribadeks' },
                { ingredientId: ingredientIds['Sojakaste'], amount: 2, notes: '' },
                { ingredientId: ingredientIds['Ingver'], amount: 10, notes: 'riivitud' },
                { ingredientId: ingredientIds['Küüslauk'], amount: 2, notes: 'hakitud' },
                { ingredientId: ingredientIds['Seesamiõli'], amount: 1, notes: '' },
            ],
            instructions: [
                'Kuumuta pannil õli.',
                'Prae kana kuldseks.',
                'Lisa köögiviljad, ingver ja küüslauk. Prae veel 5 min.',
                'Lisa sojakaste.',
                'Serveeri.'
            ],
            tips: ['Serveeri riisi või nuudlitega.']
        },
        {
            title: 'Eesti Marineeritud Heeringas',
            description: 'Klassikaline külm eelroog.',
            course: 'appetizer',
            servings: 4,
            prepTime: 10,
            cookTime: 0,
            ingredients: [
                { ingredientId: ingredientIds['Heeringas'], amount: 200, notes: 'filee' },
                { ingredientId: ingredientIds['Hapukoor 20%'], amount: 100, notes: '' },
                { ingredientId: ingredientIds['Sibul'], amount: 1, notes: 'rõngad' },
                { ingredientId: ingredientIds['Muna'], amount: 2, notes: 'keedetud' },
                { ingredientId: ingredientIds['Till (värske)'], amount: 1, notes: '' },
            ],
            instructions: [
                'Tükelda heeringas.',
                'Sega hapukoorega.',
                'Lisa sibul ja hakitud muna.',
                'Kaunista tilliga.'
            ],
            tips: ['Paku musta leivaga.']
        },
        {
            title: 'Vahemere Läätsesupp',
            description: 'Toitev ja kiudainerikas supp.',
            course: 'soup',
            servings: 4,
            prepTime: 10,
            cookTime: 30,
            ingredients: [
                { ingredientId: ingredientIds['Läätsed'], amount: 200, notes: 'kuivatatud' },
                { ingredientId: ingredientIds['Porgand'], amount: 2, notes: 'hakitud' },
                { ingredientId: ingredientIds['Sibul'], amount: 1, notes: 'hakitud' },
                { ingredientId: ingredientIds['Seller'], amount: 1, notes: 'varss' },
                { ingredientId: ingredientIds['Köögiviljapuljong'], amount: 1000, notes: '' },
                { ingredientId: ingredientIds['Tomat'], amount: 400, notes: 'purustatud' },
            ],
            instructions: [
                'Prae potis sibul, porgand ja seller.',
                'Lisa läätsed, tomatid ja puljong.',
                'Keeda 25-30 min kuni läätsed on pehmed.',
                'Maitsesta.'
            ],
            tips: ['Lisa lõpus veidi sidrunimahla.']
        },
        {
            title: 'Itaalia Minestrone',
            description: 'Rikkalik köögiviljasupp.',
            course: 'soup',
            servings: 4,
            prepTime: 15,
            cookTime: 40,
            ingredients: [
                { ingredientId: ingredientIds['Porgand'], amount: 2, notes: '' },
                { ingredientId: ingredientIds['Seller'], amount: 2, notes: '' },
                { ingredientId: ingredientIds['Sibul'], amount: 1, notes: '' },
                { ingredientId: ingredientIds['Suvikõrvits'], amount: 1, notes: '' },
                { ingredientId: ingredientIds['Kartul'], amount: 2, notes: '' },
                { ingredientId: ingredientIds['Valged oad'], amount: 400, notes: 'konserv' },
                { ingredientId: ingredientIds['Tomat'], amount: 400, notes: 'purustatud' },
                { ingredientId: ingredientIds['Köögiviljapuljong'], amount: 1500, notes: '' },
                { ingredientId: ingredientIds['Pasta'], amount: 100, notes: 'väikesed' },
            ],
            instructions: [
                'Prae köögiviljad potis.',
                'Lisa tomatid ja puljong. Keeda 20 min.',
                'Lisa oad ja pasta. Keeda veel 10 min.',
                'Maitsesta.'
            ],
            tips: ['Serveeri parmesaniga.']
        },
        {
            title: 'Eesti Hapukapsasupp',
            description: 'Hapu ja soojendav talvesupp.',
            course: 'soup',
            servings: 6,
            prepTime: 15,
            cookTime: 60,
            ingredients: [
                { ingredientId: ingredientIds['Hapukapsas'], amount: 500, notes: '' },
                { ingredientId: ingredientIds['Sealiha (praetükk)'], amount: 400, notes: 'kuubikuteks' },
                { ingredientId: ingredientIds['Kruubid'], amount: 50, notes: ' (soovi korral)' },
                { ingredientId: ingredientIds['Porgand'], amount: 1, notes: '' },
                { ingredientId: ingredientIds['Sibul'], amount: 1, notes: '' },
                { ingredientId: ingredientIds['Vesi'], amount: 2000, notes: '' },
            ],
            instructions: [
                'Pane liha külma veega keema. Riisu vaht.',
                'Lisa hapukapsas ja tang.',
                'Keeda tasasel tulel ca 1 tund.',
                'Prae sibul ja porgand, lisa supile.',
                'Keeda veel 10 min.'
            ],
            tips: ['Järgmisel päeval on veel parem.']
        },
        // ==================== TRÜHVLIERI (Truffle Special) ====================
        {
            title: 'Trühvliõliga Ahjukartulid',
            description: 'Luksuslikud, kuid lihtsad ahjukartulid.',
            course: 'side',
            servings: 4,
            prepTime: 10,
            cookTime: 40,
            ingredients: [
                { ingredientId: ingredientIds['Kartul'], amount: 800, notes: 'sektoriteks' },
                { ingredientId: ingredientIds['Oliiviõli'], amount: 2, notes: '' },
                { ingredientId: ingredientIds['Trühvliõli'], amount: 1, notes: 'lõpus niristamiseks' },
                { ingredientId: ingredientIds['Trühvlisool'], amount: 1, notes: 'maitse järgi' },
                { ingredientId: ingredientIds['Rosmariin'], amount: 1, notes: 'värske' },
            ],
            instructions: [
                'Sega kartulid oliiviõli ja rosmariiniga.',
                'Küpseta 200°C 40 minutit kuldseks.',
                'Võta ahjust, nirista peale trühvliõli ja puista trühvlisoola.',
                'Sega läbi ja serveeri kohe.'
            ],
            tips: ['Trühvliõli kaotab kuumutades maitset, lisa see alati lõpus!']
        },
        {
            title: 'Kreemjas Trühvlipasta Seentega',
            description: 'Restoranikvaliteediga pasta kodus.',
            course: 'main',
            servings: 2,
            prepTime: 15,
            cookTime: 15,
            ingredients: [
                { ingredientId: ingredientIds['Pasta'], amount: 200, notes: 'tagliatelle või linguine' },
                { ingredientId: ingredientIds['Šampinjonid'], amount: 200, notes: 'viilutatud' },
                { ingredientId: ingredientIds['Küüslauk'], amount: 2, notes: 'hakitud' },
                { ingredientId: ingredientIds['Vahukoor'], amount: 100, notes: '' },
                { ingredientId: ingredientIds['Trühvlipasta (must)'], amount: 2, notes: 'tl' },
                { ingredientId: ingredientIds['Parmesani juust'], amount: 30, notes: 'riivitud' },
                { ingredientId: ingredientIds['Või'], amount: 10, notes: 'praadimiseks' },
            ],
            instructions: [
                'Keeda pasta al dente.',
                'Prae seened võis kuldseks, lisa küüslauk.',
                'Lisa vahukoor ja trühvlipasta, kuumuta paksenemiseni.',
                'Sega pasta kastmega.',
                'Serveeri parmesaniga.'
            ],
            tips: ['Kasuta segamiseks pasta keeduvett, et kaste paremini pastale kinnituks.']
        },
        {
            title: 'Trühvli-Popkorn',
            description: 'Geniaalne filmiõhtu suupiste.',
            course: 'snack',
            servings: 2,
            prepTime: 2,
            cookTime: 5,
            ingredients: [
                { ingredientId: ingredientIds['Mais (popkorn)'], amount: 80, notes: 'terad' },
                { ingredientId: ingredientIds['Oliiviõli'], amount: 1, notes: 'praadimiseks' },
                { ingredientId: ingredientIds['Trühvliõli'], amount: 1, notes: 'pihustamiseks' },
                { ingredientId: ingredientIds['Trühvlisool'], amount: 0.5, notes: '' },
                { ingredientId: ingredientIds['Parmesani juust'], amount: 10, notes: 'peeneks riivitud' },
            ],
            instructions: [
                'Valmista popkorn potis oliiviõliga.',
                'Vala kaussi.',
                'Nirista kohe peale trühvliõli, raputa trühvlisoola ja parmesani.',
                'Raputa kaussi, et maitsed seguneksid.'
            ],
            tips: ['Parim soojalt!']
        },
        {
            title: 'Luksuslik Trühvliomlett',
            description: 'Hommikusöök voodisse.',
            course: 'breakfast',
            servings: 1,
            prepTime: 5,
            cookTime: 5,
            ingredients: [
                { ingredientId: ingredientIds['Muna'], amount: 3, notes: '' },
                { ingredientId: ingredientIds['Vahukoor'], amount: 10, notes: 'tilk' },
                { ingredientId: ingredientIds['Või'], amount: 5, notes: '' },
                { ingredientId: ingredientIds['Trühvlipasta (must)'], amount: 0.5, notes: 'tl' },
                { ingredientId: ingredientIds['Murulauk'], amount: 1, notes: 'hakitud' },
            ],
            instructions: [
                'Klopi munad koore ja trühvlipastaga lahti.',
                'Sulata pannil või.',
                'Küpseta omlett madalal kuumusel, liigutades seda pidevalt, et jääks kreemjas.',
                'Puista peale murulauku.'
            ],
            tips: ['Ära ootama jää, trühvlimuna jahtub kiiresti!']
        }
    ];





    // Helper to remove duplicate recipes
    async function cleanupDuplicates() {
        const recipesStore = useRecipesStore.getState();
        const currentRecipes = recipesStore.recipes;

        if (currentRecipes.length === 0) return;

        console.log('Checking for duplicate recipes...');
        const seenTitles = new Set();
        const duplicates = [];

        for (const recipe of currentRecipes) {
            if (seenTitles.has(recipe.title)) {
                duplicates.push(recipe.id);
            } else {
                seenTitles.add(recipe.title);
            }
        }

        if (duplicates.length > 0) {
            console.log(`Found ${duplicates.length} duplicate recipes. Cleaning up...`);
            for (const id of duplicates) {
                await recipesStore.deleteRecipe(id, true); // Permanent delete
            }
            console.log('Duplicates removed.');
        } else {
            console.log('No duplicates found.');
        }
    }




    // 2. Add new recipes if they don't exist
    for (const recipe of TEST_RECIPES) {
        // filter out invalid ingredients if any
        // WARN if ingredient ID is missing - this helps debug "missing ingredients" issues
        const validIngredients = recipe.ingredients.filter(i => {
            if (!i.ingredientId && i.ingredientId !== 0) { // Check for undefined/null
                console.warn(`WARNING: Missing ingredient ID in recipe "${recipe.title}" for an ingredient! Check spelling in testData.js or if ingredient exists.`);
                return false;
            }
            return true;
        });

        if (validIngredients.length !== recipe.ingredients.length) {
            console.warn(`Skipping some invalid ingredients for recipe ${recipe.title}`);
        }

        // Check if recipe already exists (refresh state check)
        const existing = useRecipesStore.getState().recipes.find(r => r.title === recipe.title);

        if (existing) {
            // Always ensure ingredients match the test data source of truth
            // Simple check: different count or missing ingredients
            const existingCount = existing.ingredients ? existing.ingredients.length : 0;
            const targetCount = validIngredients.length;

            if (existingCount !== targetCount || JSON.stringify(existing.ingredients) !== JSON.stringify(validIngredients)) {
                console.log(`Updating recipe to match source: ${recipe.title}`);
                await recipesStore.updateRecipe(existing.id, {
                    ingredients: validIngredients,
                    // Also refresh text content if changed in code
                    description: recipe.description,
                    instructions: recipe.instructions,
                    tips: recipe.tips,
                    prepTime: recipe.prepTime,
                    cookTime: recipe.cookTime,
                    servings: recipe.servings,
                    course: recipe.course
                });
            }
        } else {
            await recipesStore.addRecipe({
                ...recipe,
                ingredients: validIngredients
            });
        }
    }

    console.log('Test data seeded!');
    return true;
}
