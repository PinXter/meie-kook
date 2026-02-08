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
    { name: 'Rapsiõli', emoji: '🫒', unit: 'tbsp', caloriesPerUnit: 120, healthiness: 7, category: 'oils' },
    { name: 'Kookosõli', emoji: '🥥', unit: 'tbsp', caloriesPerUnit: 121, healthiness: 5, category: 'oils' },

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
    { name: 'Punased oad', emoji: '🫘', unit: 'g', caloriesPerUnit: 1.27, healthiness: 9, category: 'legumes' } // keedetud/konserv
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

    // Comprehensive Healthy Recipes
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
        }
    ];

    for (const recipe of TEST_RECIPES) {
        // filter out invalid ingredients if any
        const validIngredients = recipe.ingredients.filter(i => i.ingredientId);
        if (validIngredients.length !== recipe.ingredients.length) {
            console.warn(`Skipping some invalid ingredients for recipe ${recipe.title}`);
        }

        await recipesStore.addRecipe({
            ...recipe,
            ingredients: validIngredients
        });
    }

    console.log('Test data seeded!');
    return true;
}
