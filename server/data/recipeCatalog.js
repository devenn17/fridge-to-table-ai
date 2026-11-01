const RECIPES = [
  {
    id: "paneer-bhurji-scramble",
    title: "Paneer Bhurji Scramble",
    description: "Crumbled paneer sautéed with onions, tomatoes and warm spices for a protein-packed Indian breakfast in minutes.",
    cuisine: "Indian",
    categories: ["quick","thirty-min","breakfast","lunch","vegetarian","high-protein","indian","healthy"],
    cookTimeMinutes: 12,
    difficulty: "Easy",
    servings: 2,
    calories: 280,
    protein: 22,
    carbs: 10,
    fat: 18,
    rating: 4.6,
    isVeg: true,
    ingredients: [
      { name: "paneer", amount: "200g", staple: false },
      { name: "cherry tomatoes", amount: "6, halved", staple: false },
      { name: "onion", amount: "1/2, chopped", staple: true },
      { name: "ginger", amount: "1 tsp, grated", staple: true },
      { name: "turmeric", amount: "1/4 tsp", staple: true },
      { name: "cumin seeds", amount: "1/2 tsp", staple: true },
      { name: "chili powder", amount: "1/2 tsp", staple: true },
      { name: "cooking oil", amount: "2 tbsp", staple: true },
      { name: "cilantro", amount: "2 tbsp, chopped", staple: true },
      { name: "salt", amount: "to taste", staple: true }
    ],
    instructions: [
      "Crumble the paneer into small, bite-sized pieces with your hands and set aside.",
      "Heat oil in a pan over medium heat and add cumin seeds, letting them sizzle for 20 seconds.",
      "Add chopped onion and ginger, sautéing until the onion turns soft and translucent, about 3 minutes.",
      "Stir in the cherry tomatoes, turmeric and chili powder, cooking until the tomatoes break down into a soft masala, about 4 minutes.",
      "Fold in the crumbled paneer and salt, tossing gently so every piece is coated in the masala.",
      "Cook for another 2-3 minutes until the paneer is heated through but still soft.",
      "Garnish with fresh cilantro and serve hot with toast or paratha."
    ],
    tips: [
      "Do not overcook the paneer or it will turn rubbery — it just needs to warm through.",
      "Swap paneer for crumbled tofu for a vegan version with a similar texture."
    ]
  },
  {
    id: "chicken-tikka-masala-quick",
    title: "Quick Chicken Tikka Masala",
    description: "Tender chicken breast simmered in a creamy tomato-spice gravy, a weeknight shortcut to the classic Indian favorite.",
    cuisine: "Indian",
    categories: ["thirty-min","dinner","lunch","non-vegetarian","high-protein","indian"],
    cookTimeMinutes: 28,
    difficulty: "Medium",
    servings: 3,
    calories: 380,
    protein: 32,
    carbs: 14,
    fat: 20,
    rating: 4.7,
    isVeg: false,
    ingredients: [
      { name: "sliced chicken breast", amount: "400g", staple: false },
      { name: "cherry tomatoes", amount: "1.5 cups", staple: false },
      { name: "yogurt/curd", amount: "1/2 cup", staple: true },
      { name: "onion", amount: "1, chopped", staple: true },
      { name: "ginger", amount: "1 tsp, grated", staple: true },
      { name: "garlic", amount: "3 cloves, minced", staple: true },
      { name: "garam masala", amount: "1.5 tsp", staple: true },
      { name: "chili powder", amount: "1 tsp", staple: true },
      { name: "cream", amount: "1/4 cup", staple: true },
      { name: "butter", amount: "2 tbsp", staple: true },
      { name: "cilantro", amount: "2 tbsp, chopped", staple: true },
      { name: "salt", amount: "to taste", staple: true }
    ],
    instructions: [
      "Marinate the sliced chicken breast in yogurt, half the garam masala, chili powder and salt for 10 minutes.",
      "Melt butter in a pan over medium-high heat and sear the marinated chicken for 5-6 minutes until lightly charred and cooked through; set aside.",
      "In the same pan, sauté onion, ginger and garlic until golden, about 4 minutes.",
      "Blend the cherry tomatoes into a smooth purée and pour into the pan, simmering for 8 minutes until thickened.",
      "Stir in the remaining garam masala and simmer another 2 minutes to cook off the raw spice taste.",
      "Return the seared chicken to the pan along with cream, stirring to coat evenly.",
      "Simmer for 5 minutes until the sauce clings to the chicken and turns a rich orange-red.",
      "Finish with fresh cilantro and serve with rice or naan."
    ],
    tips: [
      "Char the chicken in a very hot pan for a smoky flavor closer to the tandoor original.",
      "Use low-fat yogurt and skip the cream for a lighter version without losing much richness."
    ]
  },
  {
    id: "palak-paneer",
    title: "Palak Paneer (Spinach Paneer Curry)",
    description: "Silky pureed spinach curry studded with soft paneer cubes, a comforting classic from North Indian kitchens.",
    cuisine: "Indian",
    categories: ["thirty-min","dinner","lunch","vegetarian","high-protein","indian","healthy"],
    cookTimeMinutes: 30,
    difficulty: "Medium",
    servings: 3,
    calories: 320,
    protein: 21,
    carbs: 12,
    fat: 22,
    rating: 4.6,
    isVeg: true,
    ingredients: [
      { name: "spinach", amount: "300g", staple: false },
      { name: "paneer", amount: "200g, cubed", staple: false },
      { name: "onion", amount: "1, chopped", staple: true },
      { name: "garlic", amount: "3 cloves", staple: true },
      { name: "ginger", amount: "1 tsp, grated", staple: true },
      { name: "cumin seeds", amount: "1 tsp", staple: true },
      { name: "garam masala", amount: "1 tsp", staple: true },
      { name: "cream", amount: "2 tbsp", staple: true },
      { name: "cooking oil", amount: "2 tbsp", staple: true },
      { name: "salt", amount: "to taste", staple: true }
    ],
    instructions: [
      "Blanch the spinach in boiling water for 2 minutes, then plunge into cold water to preserve its color.",
      "Blend the blanched spinach into a smooth, coarse purée using a little water if needed.",
      "Heat oil in a pan and add cumin seeds, letting them sizzle for 30 seconds.",
      "Add onion, garlic and ginger, sautéing until golden brown, about 5 minutes.",
      "Pour in the spinach purée and garam masala, simmering for 8 minutes to deepen the flavor.",
      "Gently fold in the paneer cubes and cream, stirring to coat without breaking the paneer.",
      "Simmer for 5 more minutes until everything is warmed through and season with salt.",
      "Serve hot with roti or steamed rice."
    ],
    tips: [
      "Blanching the spinach quickly keeps the curry vibrant green instead of dull.",
      "Lightly pan-fry the paneer cubes first for extra texture and to help them hold shape."
    ]
  },
  {
    id: "north-indian-egg-curry",
    title: "North Indian Egg Curry",
    description: "Hard-boiled eggs simmered in a spiced onion-tomato gravy, a hearty everyday curry loved across North India.",
    cuisine: "Indian",
    categories: ["thirty-min","dinner","lunch","vegetarian","high-protein","indian"],
    cookTimeMinutes: 25,
    difficulty: "Medium",
    servings: 3,
    calories: 300,
    protein: 20,
    carbs: 12,
    fat: 20,
    rating: 4.5,
    isVeg: true,
    ingredients: [
      { name: "eggs", amount: "6", staple: false },
      { name: "cherry tomatoes", amount: "1 cup", staple: false },
      { name: "onion", amount: "1, chopped", staple: true },
      { name: "ginger", amount: "1 tsp", staple: true },
      { name: "garlic", amount: "3 cloves", staple: true },
      { name: "turmeric", amount: "1/2 tsp", staple: true },
      { name: "chili powder", amount: "1 tsp", staple: true },
      { name: "garam masala", amount: "1 tsp", staple: true },
      { name: "cooking oil", amount: "2 tbsp", staple: true },
      { name: "cilantro", amount: "2 tbsp", staple: true },
      { name: "salt", amount: "to taste", staple: true }
    ],
    instructions: [
      "Boil the eggs for 10 minutes, then peel and lightly score each one with a knife so they absorb the gravy.",
      "Heat oil in a pan and shallow-fry the peeled eggs for 2 minutes until lightly golden; set aside.",
      "In the same pan, sauté onion, ginger and garlic until deep golden brown, about 6 minutes.",
      "Blend the cherry tomatoes and add to the pan along with turmeric and chili powder.",
      "Simmer the masala for 8 minutes, stirring occasionally, until it thickens and the oil separates.",
      "Add the fried eggs and garam masala, simmering for 5 minutes so the eggs soak up the gravy.",
      "Finish with fresh cilantro and serve with steamed rice or roti."
    ],
    tips: [
      "Scoring the eggs before adding them helps the spiced gravy seep in for more flavor.",
      "For extra richness, stir in a spoon of cream just before serving."
    ]
  },
  {
    id: "carrot-cucumber-raita",
    title: "Carrot Cucumber Raita",
    description: "A cooling yogurt side dish with grated carrot and cucumber, perfect for balancing spicy Indian meals.",
    cuisine: "Indian",
    categories: ["quick","thirty-min","snacks","lunch","vegetarian","indian","healthy"],
    cookTimeMinutes: 8,
    difficulty: "Easy",
    servings: 4,
    calories: 130,
    protein: 4,
    carbs: 8,
    fat: 4,
    rating: 4.3,
    isVeg: true,
    ingredients: [
      { name: "carrots", amount: "1, grated", staple: false },
      { name: "cucumber", amount: "1, grated", staple: false },
      { name: "yogurt/curd", amount: "1.5 cups", staple: true },
      { name: "cumin seeds", amount: "1/2 tsp, toasted", staple: true },
      { name: "chili powder", amount: "1/4 tsp", staple: true },
      { name: "cilantro", amount: "1 tbsp, chopped", staple: true },
      { name: "salt", amount: "to taste", staple: true }
    ],
    instructions: [
      "Squeeze the grated cucumber gently to remove excess water so the raita doesn't turn watery.",
      "Whisk the yogurt in a bowl until smooth and lump-free.",
      "Toast the cumin seeds in a dry pan for 30 seconds until fragrant, then crush lightly.",
      "Fold the grated carrot and cucumber into the whisked yogurt.",
      "Season with salt, crushed cumin and chili powder, stirring to combine.",
      "Chill for 10 minutes and garnish with cilantro before serving."
    ],
    tips: [
      "Draining the cucumber well is the key to a thick, spoonable raita.",
      "Add a pinch of roasted cumin powder on top for a more authentic street-style finish."
    ]
  },
  {
    id: "spiced-milk-orange-cooler",
    title: "Spiced Milk & Orange Cooler",
    description: "A lightly spiced chilled milk drink brightened with fresh orange, a refreshing twist on a classic Indian cooler.",
    cuisine: "Fusion",
    categories: ["quick","thirty-min","breakfast","snacks","vegetarian","healthy"],
    cookTimeMinutes: 8,
    difficulty: "Easy",
    servings: 2,
    calories: 140,
    protein: 5,
    carbs: 20,
    fat: 4,
    rating: 4.4,
    isVeg: true,
    ingredients: [
      { name: "milk", amount: "1.5 cups, chilled", staple: false },
      { name: "orange", amount: "1, peeled and segmented", staple: false },
      { name: "sugar", amount: "1 tbsp", staple: true },
      { name: "ginger", amount: "1/4 tsp, grated", staple: true },
      { name: "black pepper", amount: "pinch", staple: true },
      { name: "ice", amount: "1 cup", staple: true }
    ],
    instructions: [
      "Blend the orange segments briefly to extract their juice and pulp.",
      "Combine the chilled milk, orange pulp, sugar and grated ginger in a blender.",
      "Blend on low speed for 20 seconds, just enough to mix without curdling.",
      "Add the ice and pulse a few more times until frothy.",
      "Pour into glasses immediately and top with a pinch of black pepper.",
      "Serve right away while cold and frothy."
    ],
    tips: [
      "Blend on low speed and serve immediately — citrus can curdle milk if it sits too long.",
      "Use very cold milk and orange for the best refreshing texture."
    ]
  },
  {
    id: "vegetable-pulao",
    title: "Mixed Vegetable Pulao",
    description: "Fragrant basmati rice simmered with carrots, bell pepper and broccoli in whole-spice tempered oil.",
    cuisine: "Indian",
    categories: ["thirty-min","lunch","dinner","vegetarian","indian","healthy"],
    cookTimeMinutes: 30,
    difficulty: "Medium",
    servings: 4,
    calories: 340,
    protein: 8,
    carbs: 60,
    fat: 8,
    rating: 4.5,
    isVeg: true,
    ingredients: [
      { name: "rice", amount: "2 cups", staple: true },
      { name: "carrots", amount: "1, diced", staple: false },
      { name: "red bell pepper", amount: "1, diced", staple: false },
      { name: "broccoli", amount: "1 cup florets", staple: false },
      { name: "onion", amount: "1, sliced", staple: true },
      { name: "cumin seeds", amount: "1 tsp", staple: true },
      { name: "bay leaf", amount: "1", staple: true },
      { name: "garam masala", amount: "1 tsp", staple: true },
      { name: "cooking oil", amount: "2 tbsp", staple: true },
      { name: "salt", amount: "to taste", staple: true }
    ],
    instructions: [
      "Rinse the rice under cold water until the water runs clear, then soak for 10 minutes and drain.",
      "Heat oil in a heavy pot and add cumin seeds and bay leaf, letting them sizzle for 30 seconds.",
      "Add sliced onion and sauté until golden, about 4 minutes.",
      "Stir in carrots, bell pepper and broccoli, cooking for 3 minutes until slightly softened.",
      "Add the drained rice and garam masala, gently tossing to coat every grain in oil.",
      "Pour in 3.5 cups of water and salt, bring to a boil, then reduce heat to low and cover.",
      "Cook covered for 15 minutes without lifting the lid, then let it rest off heat for 5 minutes.",
      "Fluff gently with a fork before serving."
    ],
    tips: [
      "Soaking the rice briefly keeps the grains long and separate instead of mushy.",
      "Resist opening the lid while cooking — trapped steam is what finishes the rice evenly."
    ]
  },
  {
    id: "chicken-curry-bell-pepper",
    title: "Chicken Curry with Bell Peppers",
    description: "A robust home-style chicken curry loaded with colorful bell peppers in a deeply spiced onion-tomato base.",
    cuisine: "Indian",
    categories: ["dinner","non-vegetarian","high-protein","indian"],
    cookTimeMinutes: 35,
    difficulty: "Medium",
    servings: 3,
    calories: 360,
    protein: 34,
    carbs: 14,
    fat: 18,
    rating: 4.6,
    isVeg: false,
    ingredients: [
      { name: "sliced chicken breast", amount: "400g", staple: false },
      { name: "red bell pepper", amount: "1, sliced", staple: false },
      { name: "yellow bell pepper", amount: "1, sliced", staple: false },
      { name: "onion", amount: "1, chopped", staple: true },
      { name: "ginger", amount: "1 tsp", staple: true },
      { name: "garlic", amount: "3 cloves", staple: true },
      { name: "turmeric", amount: "1/2 tsp", staple: true },
      { name: "chili powder", amount: "1 tsp", staple: true },
      { name: "coriander powder", amount: "1 tsp", staple: true },
      { name: "cooking oil", amount: "2 tbsp", staple: true },
      { name: "cilantro", amount: "2 tbsp", staple: true },
      { name: "salt", amount: "to taste", staple: true }
    ],
    instructions: [
      "Heat oil in a heavy pot and sauté onion, ginger and garlic until golden, about 5 minutes.",
      "Add turmeric, chili powder and coriander powder, stirring for 30 seconds until fragrant.",
      "Add the sliced chicken breast and sear on medium-high heat for 5 minutes until lightly browned.",
      "Pour in 1/2 cup water, cover and simmer for 12 minutes until the chicken is nearly cooked through.",
      "Add the sliced bell peppers and cook uncovered for 6 minutes until they soften but keep some bite.",
      "Season with salt and simmer for a final 3 minutes to let the flavors meld.",
      "Garnish with cilantro and serve with rice or roti."
    ],
    tips: [
      "Adding the peppers later keeps them crisp-tender instead of turning mushy.",
      "Simmer the base curry a bit longer for a deeper flavor before adding the chicken."
    ]
  },
  {
    id: "soy-garlic-chicken-broccoli-stirfry",
    title: "Soy-Garlic Chicken & Broccoli Stir-Fry",
    description: "Crisp broccoli and juicy chicken tossed in a glossy garlic-soy sauce, ready faster than delivery.",
    cuisine: "Chinese",
    categories: ["thirty-min","dinner","non-vegetarian","high-protein","chinese"],
    cookTimeMinutes: 20,
    difficulty: "Easy",
    servings: 3,
    calories: 320,
    protein: 30,
    carbs: 16,
    fat: 14,
    rating: 4.6,
    isVeg: false,
    ingredients: [
      { name: "sliced chicken breast", amount: "350g", staple: false },
      { name: "broccoli", amount: "2 cups florets", staple: false },
      { name: "carrots", amount: "1, sliced", staple: false },
      { name: "soy sauce", amount: "3 tbsp", staple: false },
      { name: "garlic", amount: "3 cloves, minced", staple: true },
      { name: "ginger", amount: "1 tsp, minced", staple: true },
      { name: "cornstarch", amount: "1 tsp", staple: true },
      { name: "cooking oil", amount: "2 tbsp", staple: true },
      { name: "black pepper", amount: "1/4 tsp", staple: true }
    ],
    instructions: [
      "Toss the sliced chicken breast with 1 tbsp soy sauce and cornstarch, letting it sit for 10 minutes.",
      "Blanch the broccoli florets in boiling water for 90 seconds, then drain and set aside.",
      "Heat oil in a wok over high heat and stir-fry the chicken for 4-5 minutes until golden and cooked through; remove.",
      "Add garlic and ginger to the wok, stirring for 20 seconds until fragrant.",
      "Add the carrots and stir-fry for 2 minutes, then return the chicken and blanched broccoli to the wok.",
      "Pour in the remaining soy sauce and black pepper, tossing everything over high heat for 2 minutes.",
      "Serve immediately over steamed rice while everything is hot and glossy."
    ],
    tips: [
      "Blanching the broccoli first keeps its color bright and its texture crisp-tender in the final stir-fry.",
      "Cook on the highest heat your stove allows for that authentic wok-seared flavor."
    ]
  },
  {
    id: "vegetable-egg-fried-rice",
    title: "Vegetable & Egg Fried Rice",
    description: "Day-old rice fried with eggs, carrots and bell pepper in a smoky soy seasoning, a Chinese takeout staple at home.",
    cuisine: "Chinese",
    categories: ["thirty-min","lunch","dinner","vegetarian","chinese"],
    cookTimeMinutes: 18,
    difficulty: "Easy",
    servings: 3,
    calories: 380,
    protein: 14,
    carbs: 55,
    fat: 12,
    rating: 4.5,
    isVeg: true,
    ingredients: [
      { name: "rice", amount: "3 cups, cooked and cooled", staple: true },
      { name: "eggs", amount: "2", staple: false },
      { name: "carrots", amount: "1, diced small", staple: false },
      { name: "red bell pepper", amount: "1, diced small", staple: false },
      { name: "soy sauce", amount: "3 tbsp", staple: false },
      { name: "onion", amount: "1/2, chopped", staple: true },
      { name: "garlic", amount: "2 cloves, minced", staple: true },
      { name: "cooking oil", amount: "2 tbsp", staple: true },
      { name: "salt", amount: "to taste", staple: true }
    ],
    instructions: [
      "Whisk the eggs and cook them into a loose scramble in a hot wok with a little oil, then set aside.",
      "Heat the remaining oil in the wok and sauté garlic and onion for 1 minute until fragrant.",
      "Add carrots and bell pepper, stir-frying for 3 minutes until just tender.",
      "Add the cold cooked rice, breaking up any clumps with the back of a spatula.",
      "Stir-fry the rice over high heat for 4-5 minutes, tossing constantly to prevent sticking.",
      "Return the scrambled eggs to the wok and drizzle in the soy sauce, tossing to distribute evenly.",
      "Season with salt if needed and serve hot straight from the wok."
    ],
    tips: [
      "Cold, day-old rice fries up far less mushy than freshly cooked rice.",
      "Keep the wok very hot throughout to get that slightly smoky fried-rice flavor."
    ]
  },
  {
    id: "sweet-sour-bell-pepper-stirfry",
    title: "Sweet & Sour Bell Pepper Stir-Fry",
    description: "Tri-color bell peppers glazed in a tangy sweet-and-sour orange sauce, a vibrant quick Chinese side or main.",
    cuisine: "Chinese",
    categories: ["quick","thirty-min","lunch","vegetarian","chinese","healthy"],
    cookTimeMinutes: 13,
    difficulty: "Easy",
    servings: 2,
    calories: 180,
    protein: 5,
    carbs: 22,
    fat: 8,
    rating: 4.4,
    isVeg: true,
    ingredients: [
      { name: "red bell pepper", amount: "1, sliced", staple: false },
      { name: "yellow bell pepper", amount: "1, sliced", staple: false },
      { name: "orange bell pepper", amount: "1, sliced", staple: false },
      { name: "orange sauce", amount: "1/4 cup", staple: false },
      { name: "soy sauce", amount: "1 tbsp", staple: false },
      { name: "garlic", amount: "2 cloves, minced", staple: true },
      { name: "cornstarch", amount: "1 tsp", staple: true },
      { name: "cooking oil", amount: "1.5 tbsp", staple: true },
      { name: "salt", amount: "pinch", staple: true }
    ],
    instructions: [
      "Whisk the orange sauce, soy sauce and cornstarch together in a small bowl until smooth.",
      "Heat oil in a wok over high heat and add garlic, stirring for 20 seconds.",
      "Add all the sliced bell peppers and stir-fry for 3 minutes until slightly softened but still crisp.",
      "Pour in the orange-soy sauce mixture and toss to coat the peppers evenly.",
      "Cook for another 2 minutes until the sauce thickens and clings to the peppers.",
      "Season with a pinch of salt and serve immediately over rice."
    ],
    tips: [
      "Keep the peppers crisp by not overcooking — 3-4 minutes of high heat is enough.",
      "Slice all peppers the same thickness so they cook evenly and quickly."
    ]
  },
  {
    id: "chicken-manchurian",
    title: "Chicken Manchurian",
    description: "Indo-Chinese comfort food: crisp chicken tossed in a glossy, garlicky soy-brown sauce with peppers and onion.",
    cuisine: "Chinese",
    categories: ["thirty-min","dinner","non-vegetarian","high-protein","chinese"],
    cookTimeMinutes: 30,
    difficulty: "Medium",
    servings: 3,
    calories: 340,
    protein: 28,
    carbs: 20,
    fat: 16,
    rating: 4.6,
    isVeg: false,
    ingredients: [
      { name: "sliced chicken breast", amount: "350g", staple: false },
      { name: "soy sauce", amount: "3 tbsp", staple: false },
      { name: "brown sauce", amount: "2 tbsp", staple: false },
      { name: "red bell pepper", amount: "1, diced", staple: false },
      { name: "onion", amount: "1, diced", staple: true },
      { name: "garlic", amount: "3 cloves, minced", staple: true },
      { name: "ginger", amount: "1 tsp, minced", staple: true },
      { name: "cornstarch", amount: "3 tbsp", staple: true },
      { name: "cooking oil", amount: "3 tbsp", staple: true },
      { name: "salt", amount: "to taste", staple: true }
    ],
    instructions: [
      "Toss the sliced chicken breast in 2 tbsp cornstarch and a splash of soy sauce, then pan-fry in oil until golden and crisp; set aside.",
      "In the same pan, add a little more oil and sauté garlic, ginger and onion for 2 minutes.",
      "Add the diced bell pepper and stir-fry for 2 minutes until slightly softened.",
      "Whisk together the remaining soy sauce, brown sauce, remaining cornstarch and 1/2 cup water.",
      "Pour the sauce mixture into the pan and stir continuously until it thickens into a glossy glaze, about 3 minutes.",
      "Return the crispy chicken to the pan and toss to coat completely in the sauce.",
      "Cook for 2 more minutes so the chicken absorbs the sauce while staying slightly crisp.",
      "Serve hot with fried rice or noodles."
    ],
    tips: [
      "Fry the chicken until well browned for the best texture once it's coated in sauce.",
      "Add the sauce at the very end so the chicken doesn't turn soggy."
    ]
  },
  {
    id: "egg-drop-soup-spinach",
    title: "Egg Drop Soup with Spinach",
    description: "Silky ribbons of egg swirled into a light, savory broth with wilted spinach — a soothing Chinese starter.",
    cuisine: "Chinese",
    categories: ["quick","thirty-min","lunch","snacks","vegetarian","chinese","healthy"],
    cookTimeMinutes: 12,
    difficulty: "Easy",
    servings: 2,
    calories: 140,
    protein: 10,
    carbs: 6,
    fat: 8,
    rating: 4.5,
    isVeg: true,
    ingredients: [
      { name: "eggs", amount: "2, beaten", staple: false },
      { name: "spinach", amount: "1 cup, chopped", staple: false },
      { name: "stock/broth", amount: "3 cups", staple: true },
      { name: "soy sauce", amount: "1 tbsp", staple: false },
      { name: "cornstarch", amount: "1 tbsp, slurried", staple: true },
      { name: "ginger", amount: "1/2 tsp, minced", staple: true },
      { name: "salt", amount: "to taste", staple: true }
    ],
    instructions: [
      "Bring the stock to a gentle boil in a saucepan and stir in the ginger and soy sauce.",
      "Mix the cornstarch with 2 tbsp cold water to make a slurry and stir it into the simmering broth to lightly thicken it.",
      "Add the chopped spinach and simmer for 1 minute until just wilted.",
      "Reduce the heat to low so the broth is barely simmering, not boiling.",
      "Slowly drizzle in the beaten eggs in a thin stream while stirring gently in one direction to form silky ribbons.",
      "Let the eggs set for 30 seconds, then season with salt to taste and serve immediately."
    ],
    tips: [
      "A very gentle simmer, not a rolling boil, is essential for delicate egg ribbons.",
      "Stir the broth slowly in one direction while pouring the egg for the classic swirled texture."
    ]
  },
  {
    id: "chinese-smashed-cucumber-salad",
    title: "Chinese Smashed Cucumber Salad",
    description: "Cracked cucumber spears tossed in a punchy garlic-soy-vinegar dressing, a crunchy no-cook Chinese appetizer.",
    cuisine: "Chinese",
    categories: ["quick","thirty-min","snacks","vegetarian","chinese","healthy"],
    cookTimeMinutes: 8,
    difficulty: "Easy",
    servings: 2,
    calories: 130,
    protein: 2,
    carbs: 8,
    fat: 6,
    rating: 4.3,
    isVeg: true,
    ingredients: [
      { name: "cucumber", amount: "2", staple: false },
      { name: "soy sauce", amount: "2 tbsp", staple: false },
      { name: "garlic", amount: "2 cloves, minced", staple: true },
      { name: "vinegar", amount: "1 tbsp", staple: true },
      { name: "chili flakes", amount: "1/2 tsp", staple: true },
      { name: "sugar", amount: "1 tsp", staple: true },
      { name: "cooking oil", amount: "1 tbsp", staple: true },
      { name: "salt", amount: "1/2 tsp", staple: true }
    ],
    instructions: [
      "Lay the cucumbers on a cutting board and smash them lightly with the flat side of a knife or a rolling pin until slightly cracked.",
      "Cut the smashed cucumbers into bite-sized chunks and sprinkle with salt.",
      "Let the cucumbers sit for 5 minutes, then drain off the released liquid.",
      "Whisk together soy sauce, vinegar, sugar, minced garlic and chili flakes in a bowl.",
      "Heat the oil until warm and stir it into the dressing for extra aroma.",
      "Pour the dressing over the cucumbers and toss well to coat before serving."
    ],
    tips: [
      "Smashing the cucumber creates more surface area for the dressing to cling to.",
      "Chill the salad for 10 minutes before serving for the best crunch."
    ]
  },
  {
    id: "french-spinach-cheese-omelette",
    title: "French Spinach & Cheese Omelette",
    description: "A soft, folded French omelette filled with melted cheese and wilted spinach, elegant enough for any meal.",
    cuisine: "French",
    categories: ["quick","thirty-min","breakfast","vegetarian","high-protein","french"],
    cookTimeMinutes: 10,
    difficulty: "Easy",
    servings: 1,
    calories: 320,
    protein: 22,
    carbs: 4,
    fat: 24,
    rating: 4.6,
    isVeg: true,
    ingredients: [
      { name: "eggs", amount: "3", staple: false },
      { name: "spinach", amount: "1/2 cup, chopped", staple: false },
      { name: "cheese", amount: "1/3 cup, shredded", staple: false },
      { name: "butter", amount: "1 tbsp", staple: true },
      { name: "salt", amount: "to taste", staple: true },
      { name: "black pepper", amount: "to taste", staple: true }
    ],
    instructions: [
      "Beat the eggs vigorously with salt and pepper until light and slightly frothy.",
      "Melt the butter in a nonstick pan over medium-low heat, swirling to coat the surface.",
      "Wilt the chopped spinach in the pan for 1 minute, then push to one side.",
      "Pour the beaten eggs into the pan, tilting and swirling so they spread evenly and set on the bottom.",
      "As the eggs begin to set at the edges, use a spatula to gently push curds from the edges toward the center.",
      "Sprinkle the cheese and wilted spinach over one half of the omelette while the center is still slightly wet.",
      "Fold the omelette in half over the filling and cook for 30 more seconds until the cheese melts.",
      "Slide onto a plate and serve immediately."
    ],
    tips: [
      "Keep the heat gentle so the eggs stay soft and creamy rather than rubbery.",
      "Have your filling ready before you start cooking the eggs — a French omelette comes together in under a minute."
    ]
  },
  {
    id: "chicken-chasseur-style",
    title: "French-Style Chicken Chasseur",
    description: "Pan-seared chicken simmered in a rustic tomato and herb sauce, a rich rendition of the classic French hunter's dish.",
    cuisine: "French",
    categories: ["dinner","non-vegetarian","high-protein","french"],
    cookTimeMinutes: 35,
    difficulty: "Medium",
    servings: 3,
    calories: 380,
    protein: 33,
    carbs: 12,
    fat: 20,
    rating: 4.6,
    isVeg: false,
    ingredients: [
      { name: "sliced chicken breast", amount: "400g", staple: false },
      { name: "cherry tomatoes", amount: "1.5 cups", staple: false },
      { name: "onion", amount: "1, chopped", staple: true },
      { name: "garlic", amount: "2 cloves, minced", staple: true },
      { name: "all-purpose flour", amount: "1 tbsp", staple: true },
      { name: "stock/broth", amount: "1 cup", staple: true },
      { name: "butter", amount: "2 tbsp", staple: true },
      { name: "thyme", amount: "1/2 tsp", staple: true },
      { name: "bay leaf", amount: "1", staple: true },
      { name: "salt", amount: "to taste", staple: true },
      { name: "black pepper", amount: "to taste", staple: true }
    ],
    instructions: [
      "Season the sliced chicken breast with salt and pepper, then dust lightly with flour.",
      "Melt butter in a heavy pan over medium-high heat and sear the chicken for 4-5 minutes until golden; remove and set aside.",
      "Add the onion and garlic to the pan, sautéing until softened, about 4 minutes.",
      "Stir in the cherry tomatoes, thyme and bay leaf, cooking for 3 minutes until the tomatoes soften.",
      "Pour in the stock and bring to a simmer, scraping up any browned bits from the pan.",
      "Return the chicken to the pan, cover and simmer gently for 15 minutes until fully cooked and tender.",
      "Remove the bay leaf, adjust seasoning, and serve with crusty bread or mashed potatoes."
    ],
    tips: [
      "Deglazing the pan with stock lifts all the flavorful browned bits into the sauce.",
      "Let the sauce simmer uncovered for a few extra minutes if you prefer it thicker."
    ]
  },
  {
    id: "french-toast-berries",
    title: "French Toast with Mixed Berries",
    description: "Golden custard-soaked bread pan-fried to crispy perfection and piled high with strawberries and blueberries.",
    cuisine: "French",
    categories: ["thirty-min","breakfast","vegetarian","french","desserts"],
    cookTimeMinutes: 15,
    difficulty: "Easy",
    servings: 2,
    calories: 340,
    protein: 12,
    carbs: 44,
    fat: 12,
    rating: 4.7,
    isVeg: true,
    ingredients: [
      { name: "bread", amount: "4 slices", staple: true },
      { name: "eggs", amount: "2", staple: false },
      { name: "milk", amount: "1/2 cup", staple: false },
      { name: "strawberries", amount: "1/2 cup, sliced", staple: false },
      { name: "blueberries", amount: "1/2 cup", staple: false },
      { name: "vanilla extract", amount: "1/2 tsp", staple: true },
      { name: "butter", amount: "2 tbsp", staple: true },
      { name: "honey", amount: "2 tbsp", staple: true }
    ],
    instructions: [
      "Whisk the eggs, milk and vanilla extract together in a shallow dish until well combined.",
      "Dip each bread slice into the egg mixture, letting it soak for about 10 seconds per side.",
      "Melt butter in a skillet over medium heat until foaming.",
      "Cook the soaked bread slices for 2-3 minutes per side until golden brown and set in the middle.",
      "Transfer to plates and top with sliced strawberries and blueberries.",
      "Drizzle warm honey over the top and serve immediately."
    ],
    tips: [
      "Don't oversoak the bread or it will fall apart while cooking — a quick dip is enough.",
      "Use slightly stale bread for the best texture, as it absorbs the custard without turning soggy."
    ]
  },
  {
    id: "croque-monsieur",
    title: "Croque Monsieur",
    description: "A classic French grilled ham and cheese sandwich finished with a creamy bechamel-style topping.",
    cuisine: "French",
    categories: ["quick","thirty-min","lunch","snacks","non-vegetarian","french","high-protein"],
    cookTimeMinutes: 12,
    difficulty: "Easy",
    servings: 2,
    calories: 420,
    protein: 24,
    carbs: 30,
    fat: 24,
    rating: 4.6,
    isVeg: false,
    ingredients: [
      { name: "bread", amount: "4 slices", staple: true },
      { name: "rolled ham", amount: "4 slices", staple: false },
      { name: "cheese", amount: "1 cup, shredded", staple: false },
      { name: "butter", amount: "2 tbsp", staple: true },
      { name: "all-purpose flour", amount: "1 tbsp", staple: true },
      { name: "milk", amount: "1/2 cup", staple: false },
      { name: "mustard", amount: "1 tsp", staple: true }
    ],
    instructions: [
      "Melt 1 tbsp butter in a small saucepan, whisk in the flour and cook for 1 minute to form a paste.",
      "Gradually whisk in the milk and simmer for 3 minutes until it thickens into a smooth sauce; season lightly.",
      "Spread mustard on two bread slices, then layer with rolled ham and half the cheese, topping with the remaining bread.",
      "Melt the remaining butter in a skillet and grill the sandwiches for 3 minutes per side until golden.",
      "Transfer the sandwiches to a baking tray, spoon the creamy sauce over the top, and sprinkle with the rest of the cheese.",
      "Broil for 2-3 minutes until the topping is bubbling and golden brown.",
      "Slice and serve hot."
    ],
    tips: [
      "A thin bechamel topping is what separates a Croque Monsieur from a regular grilled cheese.",
      "Add a fried egg on top to turn it into a Croque Madame."
    ]
  },
  {
    id: "french-onion-cheese-soup",
    title: "French Onion & Cheese Soup",
    description: "Deeply caramelized onions in a savory broth, topped with toasted bread and bubbling melted cheese.",
    cuisine: "French",
    categories: ["dinner","lunch","vegetarian","french"],
    cookTimeMinutes: 35,
    difficulty: "Medium",
    servings: 3,
    calories: 310,
    protein: 12,
    carbs: 28,
    fat: 16,
    rating: 4.5,
    isVeg: true,
    ingredients: [
      { name: "onion", amount: "4 large, sliced", staple: true },
      { name: "cheese", amount: "1 cup, shredded", staple: false },
      { name: "carrots", amount: "1, finely diced", staple: false },
      { name: "butter", amount: "3 tbsp", staple: true },
      { name: "stock/broth", amount: "4 cups", staple: true },
      { name: "bread", amount: "4 slices", staple: true },
      { name: "thyme", amount: "1/2 tsp", staple: true },
      { name: "bay leaf", amount: "1", staple: true },
      { name: "salt", amount: "to taste", staple: true },
      { name: "black pepper", amount: "to taste", staple: true }
    ],
    instructions: [
      "Melt butter in a heavy pot over medium-low heat and add the sliced onions and diced carrots.",
      "Cook slowly, stirring occasionally, for 20 minutes until the onions turn deep golden brown and caramelized.",
      "Add thyme and bay leaf, then pour in the stock, scraping up any caramelized bits from the pot.",
      "Bring to a simmer and cook for 10 minutes, then season with salt and pepper.",
      "Toast the bread slices until crisp and lightly golden.",
      "Ladle the soup into oven-safe bowls, float a toasted bread slice on top, and pile on the cheese.",
      "Broil for 2-3 minutes until the cheese is melted and bubbling before serving."
    ],
    tips: [
      "Low and slow caramelization is the secret — rushing the onions leads to a flat-tasting soup.",
      "Use a good melting cheese so the topping goes gooey and golden under the broiler."
    ]
  },
  {
    id: "lemon-berry-clafoutis",
    title: "Lemon Berry Clafoutis",
    description: "A rustic French baked custard dessert studded with strawberries and blueberries and a hint of fresh lemon.",
    cuisine: "French",
    categories: ["desserts","vegetarian","french"],
    cookTimeMinutes: 35,
    difficulty: "Medium",
    servings: 4,
    calories: 260,
    protein: 8,
    carbs: 32,
    fat: 10,
    rating: 4.5,
    isVeg: true,
    ingredients: [
      { name: "eggs", amount: "3", staple: false },
      { name: "milk", amount: "1 cup", staple: false },
      { name: "strawberries", amount: "1 cup, halved", staple: false },
      { name: "blueberries", amount: "1 cup", staple: false },
      { name: "lemon", amount: "1, zested", staple: false },
      { name: "all-purpose flour", amount: "1/2 cup", staple: true },
      { name: "sugar", amount: "1/3 cup", staple: true },
      { name: "butter", amount: "1 tbsp, melted, plus extra for greasing", staple: true },
      { name: "vanilla extract", amount: "1/2 tsp", staple: true }
    ],
    instructions: [
      "Preheat the oven to 180°C (350°F) and butter a baking dish generously.",
      "Scatter the strawberries and blueberries evenly across the bottom of the dish.",
      "Whisk the eggs and sugar together until pale, then whisk in the milk, melted butter, vanilla and lemon zest.",
      "Sift in the flour and whisk until you have a smooth, thin batter with no lumps.",
      "Pour the batter over the berries in the baking dish.",
      "Bake for 30-35 minutes until puffed, golden and just set in the center.",
      "Let it cool for 10 minutes — it will deflate slightly, which is normal — and dust with a little extra sugar before serving."
    ],
    tips: [
      "Serve clafoutis warm or at room temperature; it firms up as it cools.",
      "A thin, pourable batter is key — it should coat the back of a spoon lightly, not sit thick."
    ]
  },
  {
    id: "caprese-salad",
    title: "Caprese-Style Cherry Tomato Salad",
    description: "Juicy cherry tomatoes and creamy cheese tossed with basil and olive oil, an Italian classic in miniature form.",
    cuisine: "Italian",
    categories: ["quick","thirty-min","lunch","snacks","vegetarian","italian","healthy"],
    cookTimeMinutes: 10,
    difficulty: "Easy",
    servings: 2,
    calories: 220,
    protein: 10,
    carbs: 8,
    fat: 16,
    rating: 4.6,
    isVeg: true,
    ingredients: [
      { name: "cherry tomatoes", amount: "2 cups, halved", staple: false },
      { name: "cheese", amount: "150g, sliced or cubed", staple: false },
      { name: "basil", amount: "10 leaves, torn", staple: true },
      { name: "olive oil", amount: "2 tbsp", staple: true },
      { name: "salt", amount: "to taste", staple: true },
      { name: "black pepper", amount: "to taste", staple: true }
    ],
    instructions: [
      "Halve the cherry tomatoes and arrange them on a serving plate with the cheese.",
      "Tear the fresh basil leaves by hand to release their aroma and scatter over the top.",
      "Drizzle generously with olive oil.",
      "Season with salt and freshly cracked black pepper.",
      "Let the salad sit for 5 minutes so the flavors mingle before serving."
    ],
    tips: [
      "Use the ripest cherry tomatoes you can find — this dish depends entirely on their sweetness.",
      "A drizzle of balsamic vinegar or honey adds a lovely extra dimension."
    ]
  },
  {
    id: "chicken-spinach-pasta",
    title: "Creamy Chicken & Spinach Pasta",
    description: "Seared chicken and wilted spinach folded into pasta with a rich, cheesy garlic cream sauce.",
    cuisine: "Italian",
    categories: ["thirty-min","dinner","non-vegetarian","high-protein","italian"],
    cookTimeMinutes: 25,
    difficulty: "Medium",
    servings: 3,
    calories: 460,
    protein: 32,
    carbs: 45,
    fat: 16,
    rating: 4.7,
    isVeg: false,
    ingredients: [
      { name: "pasta", amount: "300g", staple: true },
      { name: "sliced chicken breast", amount: "300g", staple: false },
      { name: "spinach", amount: "2 cups", staple: false },
      { name: "cheese", amount: "1/2 cup, grated", staple: false },
      { name: "cream", amount: "1/2 cup", staple: true },
      { name: "garlic", amount: "3 cloves, minced", staple: true },
      { name: "olive oil", amount: "2 tbsp", staple: true },
      { name: "salt", amount: "to taste", staple: true },
      { name: "black pepper", amount: "to taste", staple: true }
    ],
    instructions: [
      "Cook the pasta in salted boiling water until al dente, reserving 1/2 cup of the pasta water before draining.",
      "Season the sliced chicken breast with salt and pepper and sear in olive oil for 5-6 minutes until golden and cooked through; set aside.",
      "In the same pan, sauté garlic for 30 seconds, then add the spinach and wilt it for 1-2 minutes.",
      "Pour in the cream and bring to a gentle simmer, stirring in the cheese until melted and smooth.",
      "Loosen the sauce with a splash of reserved pasta water if it's too thick.",
      "Add the cooked pasta and sliced chicken back to the pan, tossing until everything is coated in sauce.",
      "Serve hot with extra grated cheese and black pepper on top."
    ],
    tips: [
      "Reserved pasta water helps the sauce cling beautifully without turning gluey.",
      "Slice the chicken thinly so it cooks quickly and stays tender."
    ]
  },
  {
    id: "cherry-tomato-bruschetta",
    title: "Cherry Tomato Bruschetta",
    description: "Crisp toasted bread piled with garlicky cherry tomatoes, fresh basil and melted cheese.",
    cuisine: "Italian",
    categories: ["quick","thirty-min","snacks","vegetarian","italian"],
    cookTimeMinutes: 12,
    difficulty: "Easy",
    servings: 3,
    calories: 180,
    protein: 6,
    carbs: 22,
    fat: 8,
    rating: 4.4,
    isVeg: true,
    ingredients: [
      { name: "bread", amount: "6 slices", staple: true },
      { name: "cherry tomatoes", amount: "1.5 cups, diced", staple: false },
      { name: "cheese", amount: "1/2 cup, shredded", staple: false },
      { name: "garlic", amount: "2 cloves, minced", staple: true },
      { name: "basil", amount: "8 leaves, chopped", staple: true },
      { name: "olive oil", amount: "3 tbsp", staple: true },
      { name: "salt", amount: "to taste", staple: true }
    ],
    instructions: [
      "Toast the bread slices until golden and crisp, either in a toaster or under the broiler.",
      "Rub each warm toast lightly with a cut garlic clove or a little minced garlic.",
      "Toss the diced cherry tomatoes with basil, olive oil and salt in a bowl.",
      "Spoon the tomato mixture generously onto each toast.",
      "Top with shredded cheese and return to the broiler for 1-2 minutes until melted.",
      "Serve warm immediately."
    ],
    tips: [
      "Dice the tomatoes small so every bite has a good mix of textures.",
      "Toast the bread just before topping so it stays crisp under the juicy tomatoes."
    ]
  },
  {
    id: "creamy-broccoli-cheese-pasta",
    title: "Creamy Broccoli & Cheese Pasta",
    description: "Tender broccoli florets tossed through pasta in a velvety garlic cheese sauce, quick comfort food.",
    cuisine: "Italian",
    categories: ["thirty-min","dinner","lunch","vegetarian","italian"],
    cookTimeMinutes: 25,
    difficulty: "Easy",
    servings: 3,
    calories: 420,
    protein: 16,
    carbs: 55,
    fat: 14,
    rating: 4.5,
    isVeg: true,
    ingredients: [
      { name: "pasta", amount: "300g", staple: true },
      { name: "broccoli", amount: "2 cups florets", staple: false },
      { name: "cheese", amount: "3/4 cup, grated", staple: false },
      { name: "cream", amount: "1/2 cup", staple: true },
      { name: "garlic", amount: "3 cloves, minced", staple: true },
      { name: "butter", amount: "2 tbsp", staple: true },
      { name: "salt", amount: "to taste", staple: true },
      { name: "black pepper", amount: "to taste", staple: true }
    ],
    instructions: [
      "Cook the pasta in salted boiling water, adding the broccoli florets for the last 3 minutes so they cook together.",
      "Drain, reserving 1/2 cup of the starchy pasta water.",
      "Melt butter in the same pot and sauté garlic for 30 seconds until fragrant.",
      "Pour in the cream and bring to a gentle simmer.",
      "Stir in the cheese until melted and smooth, thinning with reserved pasta water as needed.",
      "Return the pasta and broccoli to the pot, tossing until well coated in the sauce.",
      "Season with salt and pepper and serve immediately."
    ],
    tips: [
      "Cooking broccoli in the pasta water saves a pot and infuses a subtle flavor.",
      "Grate your own cheese for a smoother, less grainy sauce than pre-shredded varieties."
    ]
  },
  {
    id: "margherita-flatbread",
    title: "Margherita-Style Flatbread Pizza",
    description: "A crispy tortilla base topped with melty cheese, juicy cherry tomatoes and fresh basil, pizza in minutes.",
    cuisine: "Italian",
    categories: ["quick","thirty-min","lunch","snacks","vegetarian","italian"],
    cookTimeMinutes: 14,
    difficulty: "Easy",
    servings: 2,
    calories: 300,
    protein: 14,
    carbs: 30,
    fat: 14,
    rating: 4.5,
    isVeg: true,
    ingredients: [
      { name: "tortillas", amount: "2", staple: true },
      { name: "cherry tomatoes", amount: "1 cup, sliced", staple: false },
      { name: "cheese", amount: "1 cup, shredded", staple: false },
      { name: "basil", amount: "8 leaves", staple: true },
      { name: "olive oil", amount: "2 tbsp", staple: true },
      { name: "oregano", amount: "1/2 tsp", staple: true },
      { name: "salt", amount: "to taste", staple: true }
    ],
    instructions: [
      "Preheat the oven to 200°C (400°F) or heat a dry skillet over medium heat.",
      "Brush each tortilla lightly with olive oil on both sides.",
      "Scatter the shredded cheese evenly over the tortillas, leaving a small border.",
      "Arrange the sliced cherry tomatoes on top and sprinkle with oregano and salt.",
      "Bake or dry-toast for 8-10 minutes until the cheese is melted and the edges are crisp.",
      "Top with fresh basil leaves right before slicing and serving."
    ],
    tips: [
      "A dry skillet with a lid works just as well as an oven for melting the cheese and crisping the base.",
      "Add torn basil after cooking so it stays bright and fragrant instead of wilting."
    ]
  },
  {
    id: "italian-herb-grilled-chicken",
    title: "Italian Herb Grilled Chicken with Peppers",
    description: "Herb-marinated chicken breast grilled alongside sweet bell peppers for a light, protein-rich Italian dinner.",
    cuisine: "Italian",
    categories: ["thirty-min","dinner","non-vegetarian","high-protein","italian","healthy"],
    cookTimeMinutes: 28,
    difficulty: "Medium",
    servings: 3,
    calories: 300,
    protein: 34,
    carbs: 10,
    fat: 12,
    rating: 4.6,
    isVeg: false,
    ingredients: [
      { name: "sliced chicken breast", amount: "400g", staple: false },
      { name: "red bell pepper", amount: "1, sliced", staple: false },
      { name: "yellow bell pepper", amount: "1, sliced", staple: false },
      { name: "olive oil", amount: "3 tbsp", staple: true },
      { name: "garlic", amount: "2 cloves, minced", staple: true },
      { name: "oregano", amount: "1 tsp", staple: true },
      { name: "thyme", amount: "1/2 tsp", staple: true },
      { name: "salt", amount: "to taste", staple: true },
      { name: "black pepper", amount: "to taste", staple: true }
    ],
    instructions: [
      "Whisk together olive oil, garlic, oregano, thyme, salt and pepper in a bowl.",
      "Toss the sliced chicken breast in the marinade and let it sit for 10 minutes at room temperature.",
      "Heat a grill pan or skillet over medium-high heat and cook the chicken for 5-6 minutes per side until golden and cooked through.",
      "In the same pan, sauté the sliced bell peppers for 5-6 minutes until charred at the edges and tender.",
      "Rest the chicken for 3 minutes before slicing.",
      "Plate the sliced chicken over the sautéed peppers and drizzle with any remaining pan juices.",
      "Serve with a side salad or crusty bread."
    ],
    tips: [
      "Resting the chicken after cooking keeps the juices inside when you slice it.",
      "Char the peppers a little for a smoky, roasted flavor that pairs perfectly with the herbs."
    ]
  },
  {
    id: "carrot-poriyal",
    title: "Carrot & Bell Pepper Poriyal",
    description: "A lightly spiced South Indian stir-fry of grated carrot and bell pepper tempered with mustard seeds and curry leaves.",
    cuisine: "South Indian",
    categories: ["quick","thirty-min","lunch","dinner","vegetarian","south-indian","healthy"],
    cookTimeMinutes: 14,
    difficulty: "Easy",
    servings: 3,
    calories: 120,
    protein: 3,
    carbs: 14,
    fat: 7,
    rating: 4.4,
    isVeg: true,
    ingredients: [
      { name: "carrots", amount: "2, grated", staple: false },
      { name: "red bell pepper", amount: "1, finely diced", staple: false },
      { name: "mustard seeds", amount: "1/2 tsp", staple: true },
      { name: "curry leaves", amount: "8-10", staple: true },
      { name: "coconut milk", amount: "2 tbsp", staple: true },
      { name: "cooking oil", amount: "2 tbsp", staple: true },
      { name: "chili powder", amount: "1/2 tsp", staple: true },
      { name: "salt", amount: "to taste", staple: true }
    ],
    instructions: [
      "Heat oil in a pan over medium heat and add mustard seeds, letting them pop for 20 seconds.",
      "Add curry leaves and fry for 10 seconds until fragrant.",
      "Add the grated carrots and diced bell pepper, tossing to coat in the tempering.",
      "Sprinkle in chili powder and salt, then cover and cook on low heat for 6-7 minutes, stirring occasionally.",
      "Cook until the vegetables are tender but still hold their shape, not mushy.",
      "Stir in the coconut milk for a touch of richness and cook for 1 more minute.",
      "Serve warm as a side with rice and sambar."
    ],
    tips: [
      "Keep the heat low and covered so the vegetables steam in their own moisture rather than burning.",
      "Grate the carrot rather than dicing it for the traditional fine texture of a poriyal."
    ]
  },
  {
    id: "curd-rice-cucumber",
    title: "South Indian Curd Rice with Cucumber",
    description: "Cooling yogurt rice studded with cucumber and carrot, tempered with mustard seeds and curry leaves.",
    cuisine: "South Indian",
    categories: ["quick","thirty-min","lunch","vegetarian","south-indian"],
    cookTimeMinutes: 10,
    difficulty: "Easy",
    servings: 2,
    calories: 260,
    protein: 8,
    carbs: 40,
    fat: 6,
    rating: 4.4,
    isVeg: true,
    ingredients: [
      { name: "rice", amount: "2 cups, cooked", staple: true },
      { name: "cucumber", amount: "1/2, diced", staple: false },
      { name: "carrots", amount: "1/2, grated", staple: false },
      { name: "yogurt/curd", amount: "1.5 cups", staple: true },
      { name: "mustard seeds", amount: "1/2 tsp", staple: true },
      { name: "curry leaves", amount: "6-8", staple: true },
      { name: "ginger", amount: "1/2 tsp, grated", staple: true },
      { name: "cooking oil", amount: "1 tbsp", staple: true },
      { name: "salt", amount: "to taste", staple: true }
    ],
    instructions: [
      "Mash the cooked rice slightly with the back of a spoon while it's still warm.",
      "Stir in the yogurt and a splash of milk if needed to loosen the mixture to a creamy consistency.",
      "Heat oil in a small pan, add mustard seeds and let them pop, then add curry leaves and ginger, frying for 20 seconds.",
      "Pour the tempering over the curd rice and mix well.",
      "Fold in the diced cucumber and grated carrot along with salt.",
      "Chill for 10 minutes before serving for the best refreshing flavor."
    ],
    tips: [
      "Mash the rice while warm so it blends smoothly with the yogurt instead of staying clumpy.",
      "Curd rice tastes even better after a short chill in the refrigerator."
    ]
  },
  {
    id: "egg-dosa-style",
    title: "Instant Egg Dosa",
    description: "A quick pan-fried batter crepe topped with beaten egg and bell pepper, inspired by South Indian egg dosa.",
    cuisine: "South Indian",
    categories: ["thirty-min","breakfast","vegetarian","south-indian","high-protein"],
    cookTimeMinutes: 20,
    difficulty: "Medium",
    servings: 2,
    calories: 300,
    protein: 21,
    carbs: 28,
    fat: 12,
    rating: 4.5,
    isVeg: true,
    ingredients: [
      { name: "eggs", amount: "3", staple: false },
      { name: "red bell pepper", amount: "1/2, finely diced", staple: false },
      { name: "all-purpose flour", amount: "1 cup", staple: true },
      { name: "onion", amount: "1/2, finely chopped", staple: true },
      { name: "curry leaves", amount: "6, chopped", staple: true },
      { name: "chili powder", amount: "1/2 tsp", staple: true },
      { name: "cooking oil", amount: "3 tbsp", staple: true },
      { name: "salt", amount: "to taste", staple: true }
    ],
    instructions: [
      "Whisk the flour with 1.5 cups water and a pinch of salt into a thin, pourable batter.",
      "Heat a flat nonstick pan or griddle over medium heat and lightly oil the surface.",
      "Pour a ladle of batter and spread it thin in a circular motion to form a crepe.",
      "Cook for 1-2 minutes until small holes appear and the edges lift slightly.",
      "Beat one egg with a little chopped onion, bell pepper, curry leaves, chili powder and salt, then pour it over the dosa.",
      "Spread the egg mixture evenly and cook for 2 minutes until it sets and the underside turns golden.",
      "Fold the dosa in half and cook for another minute, then repeat for the remaining batter and eggs.",
      "Serve hot with chutney or ketchup."
    ],
    tips: [
      "Spread the egg quickly with the back of a spoon before it starts to set for even coverage.",
      "Keep the pan well seasoned or nonstick so the dosa releases cleanly."
    ]
  },
  {
    id: "cherry-tomato-rasam",
    title: "Cherry Tomato Rasam",
    description: "A tangy, peppery South Indian tomato broth brightened with lemon, perfect served hot over rice.",
    cuisine: "South Indian",
    categories: ["thirty-min","lunch","dinner","vegetarian","south-indian","healthy"],
    cookTimeMinutes: 25,
    difficulty: "Easy",
    servings: 3,
    calories: 125,
    protein: 3,
    carbs: 12,
    fat: 3,
    rating: 4.4,
    isVeg: true,
    ingredients: [
      { name: "cherry tomatoes", amount: "2 cups", staple: false },
      { name: "lemon", amount: "1", staple: false },
      { name: "garlic", amount: "3 cloves, crushed", staple: true },
      { name: "curry leaves", amount: "8-10", staple: true },
      { name: "mustard seeds", amount: "1/2 tsp", staple: true },
      { name: "cumin seeds", amount: "1/2 tsp", staple: true },
      { name: "coriander powder", amount: "1 tsp", staple: true },
      { name: "chili powder", amount: "1/2 tsp", staple: true },
      { name: "cilantro", amount: "2 tbsp, chopped", staple: true },
      { name: "cooking oil", amount: "1 tbsp", staple: true },
      { name: "salt", amount: "to taste", staple: true }
    ],
    instructions: [
      "Simmer the cherry tomatoes with crushed garlic and 3 cups water for 12 minutes until the tomatoes fall apart.",
      "Mash the tomatoes lightly with a spoon to release their juices into the broth.",
      "Stir in coriander powder, chili powder and salt, simmering for 5 more minutes.",
      "Heat oil in a small pan, add mustard and cumin seeds, letting them pop, then add curry leaves and fry for 15 seconds.",
      "Pour the tempering into the rasam and simmer for 2 more minutes.",
      "Remove from heat, stir in fresh lemon juice, and garnish with cilantro.",
      "Serve hot over steamed rice or sip as a warming soup."
    ],
    tips: [
      "Add the lemon juice off the heat so it stays bright and doesn't turn bitter.",
      "Mash some of the tomatoes for body while leaving a few chunks for texture."
    ]
  },
  {
    id: "broccoli-poriyal",
    title: "Broccoli & Carrot Poriyal",
    description: "Crisp broccoli and carrot tossed in a coconut-mustard tempering, a modern take on the South Indian side dish.",
    cuisine: "South Indian",
    categories: ["quick","thirty-min","lunch","dinner","vegetarian","south-indian","healthy"],
    cookTimeMinutes: 13,
    difficulty: "Easy",
    servings: 3,
    calories: 130,
    protein: 4,
    carbs: 10,
    fat: 7,
    rating: 4.4,
    isVeg: true,
    ingredients: [
      { name: "broccoli", amount: "2 cups florets", staple: false },
      { name: "carrots", amount: "1, diced small", staple: false },
      { name: "mustard seeds", amount: "1/2 tsp", staple: true },
      { name: "curry leaves", amount: "8-10", staple: true },
      { name: "coconut milk", amount: "2 tbsp", staple: true },
      { name: "cooking oil", amount: "2 tbsp", staple: true },
      { name: "chili powder", amount: "1/2 tsp", staple: true },
      { name: "salt", amount: "to taste", staple: true }
    ],
    instructions: [
      "Heat oil in a pan and add mustard seeds, letting them pop for 20 seconds.",
      "Add curry leaves and fry for 10 seconds until aromatic.",
      "Add the broccoli florets and diced carrot, tossing to coat in the oil.",
      "Sprinkle chili powder and salt, then cover and cook on low heat for 6 minutes, stirring occasionally.",
      "Uncover and cook 2 more minutes until the vegetables are tender-crisp.",
      "Stir in the coconut milk and cook for 1 minute to finish.",
      "Serve warm as a side with rice and curry."
    ],
    tips: [
      "Cut the broccoli into small, even florets so it cooks at the same rate as the carrot.",
      "Don't skip the covered steaming step — it keeps the vegetables tender without needing extra oil."
    ]
  },
  {
    id: "chicken-chettinad",
    title: "Chicken Chettinad-Style Curry",
    description: "A fiery, aromatic South Indian curry from Chettinad, packed with curry leaves, ginger-garlic and roasted spices.",
    cuisine: "South Indian",
    categories: ["dinner","non-vegetarian","high-protein","south-indian"],
    cookTimeMinutes: 35,
    difficulty: "Medium",
    servings: 3,
    calories: 360,
    protein: 34,
    carbs: 12,
    fat: 18,
    rating: 4.6,
    isVeg: false,
    ingredients: [
      { name: "sliced chicken breast", amount: "400g", staple: false },
      { name: "cherry tomatoes", amount: "1 cup", staple: false },
      { name: "onion", amount: "2, sliced", staple: true },
      { name: "curry leaves", amount: "12-15", staple: true },
      { name: "garlic", amount: "4 cloves", staple: true },
      { name: "ginger", amount: "1 tsp", staple: true },
      { name: "chili powder", amount: "1.5 tsp", staple: true },
      { name: "coriander powder", amount: "1 tsp", staple: true },
      { name: "turmeric", amount: "1/2 tsp", staple: true },
      { name: "cooking oil", amount: "2 tbsp", staple: true },
      { name: "salt", amount: "to taste", staple: true }
    ],
    instructions: [
      "Heat oil in a heavy pan and add half the curry leaves, letting them crackle for 15 seconds.",
      "Add the sliced onion and sauté until deeply golden brown, about 8 minutes.",
      "Stir in ginger and garlic, cooking for 1 minute until fragrant.",
      "Add turmeric, chili powder and coriander powder, stirring for 30 seconds to bloom the spices.",
      "Add the cherry tomatoes and cook until they break down into a thick masala, about 5 minutes.",
      "Add the sliced chicken breast and sear for 5 minutes, coating well in the masala.",
      "Pour in 1/2 cup water, cover and simmer for 12 minutes until the chicken is cooked through and the gravy thickens.",
      "Finish with the remaining curry leaves and serve with rice."
    ],
    tips: [
      "Frying the onions until truly deep golden is essential for the authentic Chettinad depth of flavor.",
      "Add curry leaves both at the start and end of cooking to layer the aroma."
    ]
  },
  {
    id: "chicken-bell-pepper-fajitas",
    title: "Chicken & Bell Pepper Fajitas",
    description: "Sizzling strips of chicken and charred bell peppers wrapped in warm tortillas with lime and spice.",
    cuisine: "Mexican",
    categories: ["thirty-min","dinner","lunch","non-vegetarian","high-protein","mexican"],
    cookTimeMinutes: 25,
    difficulty: "Easy",
    servings: 3,
    calories: 380,
    protein: 30,
    carbs: 30,
    fat: 14,
    rating: 4.7,
    isVeg: false,
    ingredients: [
      { name: "sliced chicken breast", amount: "400g", staple: false },
      { name: "red bell pepper", amount: "1, sliced", staple: false },
      { name: "yellow bell pepper", amount: "1, sliced", staple: false },
      { name: "orange bell pepper", amount: "1, sliced", staple: false },
      { name: "tortillas", amount: "6", staple: true },
      { name: "onion", amount: "1, sliced", staple: true },
      { name: "lime", amount: "1", staple: true },
      { name: "chili powder", amount: "1 tsp", staple: true },
      { name: "paprika", amount: "1 tsp", staple: true },
      { name: "cooking oil", amount: "2 tbsp", staple: true },
      { name: "salt", amount: "to taste", staple: true }
    ],
    instructions: [
      "Toss the sliced chicken breast with chili powder, paprika, salt and a squeeze of lime, letting it marinate for 10 minutes.",
      "Heat oil in a large skillet over high heat and sear the chicken for 5-6 minutes until cooked through and lightly charred; remove.",
      "Add the sliced bell peppers and onion to the same skillet, stir-frying for 6-7 minutes until charred at the edges but still crisp.",
      "Return the chicken to the skillet and toss everything together for 1-2 minutes.",
      "Warm the tortillas briefly in a dry pan or microwave.",
      "Squeeze fresh lime juice over the sizzling chicken and peppers.",
      "Serve immediately with warm tortillas for wrapping."
    ],
    tips: [
      "High heat and minimal stirring gives the peppers and onion those signature charred edges.",
      "Slice everything into similar-sized strips so it cooks evenly and looks great on the plate."
    ]
  },
  {
    id: "watermelon-lime-agua-fresca",
    title: "Watermelon Lime Agua Fresca",
    description: "A refreshing Mexican fruit cooler blending juicy watermelon with lime and a splash of sparkling water.",
    cuisine: "Mexican",
    categories: ["quick","thirty-min","snacks","desserts","vegetarian","mexican","healthy"],
    cookTimeMinutes: 8,
    difficulty: "Easy",
    servings: 4,
    calories: 120,
    protein: 1,
    carbs: 22,
    fat: 0,
    rating: 4.6,
    isVeg: true,
    ingredients: [
      { name: "watermelon", amount: "4 cups, cubed", staple: false },
      { name: "sparkling water", amount: "1 cup", staple: false },
      { name: "lime", amount: "2", staple: true },
      { name: "sugar", amount: "2 tbsp", staple: true },
      { name: "ice", amount: "2 cups", staple: true },
      { name: "chili powder", amount: "pinch, for rim garnish", staple: true },
      { name: "salt", amount: "pinch, for rim garnish", staple: true }
    ],
    instructions: [
      "Blend the cubed watermelon until completely smooth.",
      "Strain the watermelon juice through a fine sieve to remove any pulp or seeds, if desired.",
      "Stir in the juice of two limes and sugar until dissolved.",
      "Fill glasses with ice and pour in the watermelon-lime mixture.",
      "Top each glass with a splash of sparkling water for fizz.",
      "Stir gently and serve immediately while cold and bubbly."
    ],
    tips: [
      "Chill the watermelon beforehand so the drink doesn't need to be watered down with extra ice.",
      "Adjust sugar to taste depending on how ripe and sweet your watermelon already is."
    ]
  },
  {
    id: "mexican-street-style-broccoli",
    title: "Mexican Street-Style Broccoli",
    description: "Charred broccoli dressed like Mexican street corn with creamy mayo, tangy cheese, lime and chili.",
    cuisine: "Mexican",
    categories: ["quick","thirty-min","snacks","vegetarian","mexican"],
    cookTimeMinutes: 12,
    difficulty: "Easy",
    servings: 3,
    calories: 190,
    protein: 5,
    carbs: 12,
    fat: 14,
    rating: 4.4,
    isVeg: true,
    ingredients: [
      { name: "broccoli", amount: "2 cups florets", staple: false },
      { name: "cheese", amount: "1/3 cup, grated", staple: false },
      { name: "mayonnaise", amount: "3 tbsp", staple: true },
      { name: "lime", amount: "1", staple: true },
      { name: "chili powder", amount: "1/2 tsp", staple: true },
      { name: "paprika", amount: "1/2 tsp", staple: true },
      { name: "cilantro", amount: "2 tbsp, chopped", staple: true },
      { name: "cooking oil", amount: "1 tbsp", staple: true },
      { name: "salt", amount: "to taste", staple: true }
    ],
    instructions: [
      "Toss the broccoli florets with oil and salt, then roast or pan-sear over high heat for 8-9 minutes until charred at the edges.",
      "While the broccoli cooks, mix mayonnaise with a squeeze of lime juice, chili powder and paprika.",
      "Transfer the hot charred broccoli to a serving bowl.",
      "Drizzle the spiced mayo generously over the broccoli.",
      "Sprinkle with grated cheese and fresh cilantro.",
      "Finish with an extra squeeze of lime and serve immediately."
    ],
    tips: [
      "Char the broccoli well before dressing it — the smoky edges are what make this dish sing.",
      "Use a mild, crumbly cheese for the most authentic elote-style finish."
    ]
  },
  {
    id: "egg-bell-pepper-breakfast-tacos",
    title: "Egg & Bell Pepper Breakfast Tacos",
    description: "Soft scrambled eggs with sautéed bell pepper and melted cheese, wrapped in warm tortillas for breakfast.",
    cuisine: "Mexican",
    categories: ["quick","thirty-min","breakfast","vegetarian","mexican","high-protein"],
    cookTimeMinutes: 12,
    difficulty: "Easy",
    servings: 2,
    calories: 320,
    protein: 20,
    carbs: 24,
    fat: 18,
    rating: 4.5,
    isVeg: true,
    ingredients: [
      { name: "eggs", amount: "4", staple: false },
      { name: "red bell pepper", amount: "1/2, diced", staple: false },
      { name: "tortillas", amount: "4", staple: true },
      { name: "cheese", amount: "1/2 cup, shredded", staple: false },
      { name: "onion", amount: "1/4, diced", staple: true },
      { name: "cooking oil", amount: "1 tbsp", staple: true },
      { name: "chili powder", amount: "1/4 tsp", staple: true },
      { name: "salt", amount: "to taste", staple: true }
    ],
    instructions: [
      "Heat oil in a pan and sauté the diced bell pepper and onion for 3 minutes until softened.",
      "Beat the eggs with salt and chili powder, then pour into the pan with the vegetables.",
      "Cook over low-medium heat, stirring gently and frequently, until the eggs are just set and creamy, about 3 minutes.",
      "Warm the tortillas briefly in a dry pan or microwave.",
      "Divide the scrambled eggs among the tortillas.",
      "Sprinkle with shredded cheese while the eggs are still warm so it melts slightly.",
      "Fold or roll the tacos and serve immediately."
    ],
    tips: [
      "Cook the eggs low and slow for the softest, creamiest scramble.",
      "Add hot sauce or extra chili powder if you like more heat."
    ]
  },
  {
    id: "chicken-tortilla-soup",
    title: "Chicken Tortilla Soup",
    description: "A hearty Mexican soup of shredded chicken, tomatoes and crispy tortilla strips in a smoky spiced broth.",
    cuisine: "Mexican",
    categories: ["thirty-min","dinner","lunch","non-vegetarian","high-protein","mexican"],
    cookTimeMinutes: 30,
    difficulty: "Medium",
    servings: 3,
    calories: 340,
    protein: 28,
    carbs: 26,
    fat: 14,
    rating: 4.6,
    isVeg: false,
    ingredients: [
      { name: "sliced chicken breast", amount: "350g", staple: false },
      { name: "cherry tomatoes", amount: "1.5 cups", staple: false },
      { name: "tortillas", amount: "3, sliced into strips", staple: true },
      { name: "onion", amount: "1, chopped", staple: true },
      { name: "stock/broth", amount: "4 cups", staple: true },
      { name: "chili powder", amount: "1 tsp", staple: true },
      { name: "cumin seeds", amount: "1/2 tsp", staple: true },
      { name: "lime", amount: "1", staple: true },
      { name: "cilantro", amount: "2 tbsp, chopped", staple: true },
      { name: "cheese", amount: "1/3 cup, shredded", staple: false },
      { name: "cooking oil", amount: "2 tbsp", staple: true },
      { name: "salt", amount: "to taste", staple: true }
    ],
    instructions: [
      "Toss the tortilla strips with a little oil and bake or pan-fry until golden and crisp; set aside.",
      "Heat oil in a pot and sauté onion until softened, about 4 minutes.",
      "Add the cherry tomatoes, chili powder and cumin seeds, cooking for 3 minutes until the tomatoes soften.",
      "Pour in the stock and bring to a boil, then add the sliced chicken breast.",
      "Simmer for 15 minutes until the chicken is cooked through, then shred it with two forks directly in the pot.",
      "Stir in a squeeze of lime juice and season with salt.",
      "Ladle into bowls and top with crispy tortilla strips, shredded cheese and cilantro before serving."
    ],
    tips: [
      "Shredding the chicken straight in the broth lets it soak up extra flavor.",
      "Add the tortilla strips right before serving so they stay crunchy instead of going soggy."
    ]
  },
  {
    id: "cucumber-lime-salsa",
    title: "Cucumber Lime Salsa",
    description: "A crunchy, no-cook Mexican-style salsa of diced cucumber, cherry tomatoes and lime, great with tortilla chips.",
    cuisine: "Mexican",
    categories: ["quick","thirty-min","snacks","vegetarian","mexican","healthy"],
    cookTimeMinutes: 10,
    difficulty: "Easy",
    servings: 4,
    calories: 120,
    protein: 1,
    carbs: 10,
    fat: 2,
    rating: 4.3,
    isVeg: true,
    ingredients: [
      { name: "cucumber", amount: "1, diced", staple: false },
      { name: "cherry tomatoes", amount: "1 cup, diced", staple: false },
      { name: "onion", amount: "1/4, finely diced", staple: true },
      { name: "lime", amount: "1", staple: true },
      { name: "cilantro", amount: "2 tbsp, chopped", staple: true },
      { name: "chili flakes", amount: "1/2 tsp", staple: true },
      { name: "salt", amount: "to taste", staple: true }
    ],
    instructions: [
      "Dice the cucumber and cherry tomatoes into small, even pieces.",
      "Combine the cucumber, tomatoes and finely diced onion in a bowl.",
      "Squeeze fresh lime juice over the mixture.",
      "Add cilantro, chili flakes and salt, tossing everything together.",
      "Let the salsa sit for 10 minutes so the flavors combine before serving.",
      "Serve chilled with tortilla chips or as a topping for tacos."
    ],
    tips: [
      "Dice everything uniformly small for the best scoopable texture.",
      "Make it ahead — this salsa tastes even better after resting for 30 minutes in the fridge."
    ]
  },
  {
    id: "classic-grilled-cheese",
    title: "Classic Tomato Grilled Cheese",
    description: "Buttery golden bread with melted cheese and juicy cherry tomatoes, the ultimate quick comfort sandwich.",
    cuisine: "American",
    categories: ["quick","thirty-min","lunch","snacks","vegetarian"],
    cookTimeMinutes: 8,
    difficulty: "Easy",
    servings: 1,
    calories: 380,
    protein: 14,
    carbs: 32,
    fat: 22,
    rating: 4.5,
    isVeg: true,
    ingredients: [
      { name: "bread", amount: "2 slices", staple: true },
      { name: "cheese", amount: "2 slices or 1/2 cup shredded", staple: false },
      { name: "cherry tomatoes", amount: "5, sliced", staple: false },
      { name: "butter", amount: "1.5 tbsp", staple: true },
      { name: "oregano", amount: "1/4 tsp", staple: true },
      { name: "black pepper", amount: "to taste", staple: true }
    ],
    instructions: [
      "Butter one side of each bread slice.",
      "Layer the cheese and sliced cherry tomatoes between the two slices, buttered sides facing out.",
      "Heat a skillet over medium-low heat and place the sandwich in the pan.",
      "Cook for 2-3 minutes per side, pressing gently, until golden brown and the cheese is fully melted.",
      "Slice diagonally and serve hot."
    ],
    tips: [
      "Medium-low heat gives the cheese time to melt fully before the bread burns.",
      "Pat the tomato slices dry first so the bread doesn't turn soggy."
    ]
  },
  {
    id: "ham-cheese-breakfast-sandwich",
    title: "Ham & Cheese Breakfast Sandwich",
    description: "A satisfying morning sandwich layering fried egg, melted cheese and rolled ham between toasted bread.",
    cuisine: "American",
    categories: ["quick","thirty-min","breakfast","non-vegetarian","high-protein"],
    cookTimeMinutes: 10,
    difficulty: "Easy",
    servings: 1,
    calories: 400,
    protein: 24,
    carbs: 28,
    fat: 20,
    rating: 4.5,
    isVeg: false,
    ingredients: [
      { name: "bread", amount: "2 slices", staple: true },
      { name: "rolled ham", amount: "3 slices", staple: false },
      { name: "cheese", amount: "1 slice", staple: false },
      { name: "eggs", amount: "1", staple: false },
      { name: "butter", amount: "1 tbsp", staple: true },
      { name: "black pepper", amount: "to taste", staple: true }
    ],
    instructions: [
      "Toast the bread slices until golden and crisp.",
      "Melt a little butter in a pan and fry the egg to your preferred doneness, seasoning with black pepper.",
      "In the same pan, warm the rolled ham slices for about 1 minute per side.",
      "Layer the cheese on one slice of toast while it's still warm so it softens slightly.",
      "Stack the warm ham and fried egg on top of the cheese.",
      "Close the sandwich with the second slice of toast, slice in half and serve immediately."
    ],
    tips: [
      "Warming the ham briefly brings out its flavor and keeps the whole sandwich hot.",
      "Fry the egg with a slightly runny yolk for extra richness when you bite in."
    ]
  },
  {
    id: "berry-protein-smoothie-bowl",
    title: "Berry Protein Smoothie Bowl",
    description: "A thick, spoonable smoothie bowl of strawberries, blueberries and yogurt topped with oats and nuts.",
    cuisine: "Fusion",
    categories: ["quick","thirty-min","breakfast","healthy","high-protein","vegetarian"],
    cookTimeMinutes: 8,
    difficulty: "Easy",
    servings: 1,
    calories: 320,
    protein: 20,
    carbs: 40,
    fat: 8,
    rating: 4.6,
    isVeg: true,
    ingredients: [
      { name: "strawberries", amount: "1 cup, frozen or fresh", staple: false },
      { name: "blueberries", amount: "1/2 cup", staple: false },
      { name: "milk", amount: "1/4 cup", staple: false },
      { name: "yogurt/curd", amount: "1/2 cup", staple: true },
      { name: "honey", amount: "1 tbsp", staple: true },
      { name: "oats", amount: "2 tbsp", staple: true },
      { name: "nuts", amount: "1 tbsp, chopped", staple: true }
    ],
    instructions: [
      "Blend the strawberries, half the blueberries, milk and yogurt until thick and smooth.",
      "Taste and stir in honey if you want it sweeter.",
      "Pour the smoothie into a bowl, keeping the consistency thick enough to eat with a spoon.",
      "Top with the remaining blueberries, a sprinkle of oats and chopped nuts.",
      "Serve immediately while cold."
    ],
    tips: [
      "Use frozen berries for a thicker, ice-cream-like consistency without needing extra ice.",
      "Keep liquid to a minimum so the bowl stays spoonable rather than turning into a drink."
    ]
  },
  {
    id: "green-juice-detox-smoothie-bowl",
    title: "Green Juice Detox Smoothie Bowl",
    description: "A light, refreshing smoothie bowl blending green juice, spinach and orange for a nutrient-packed morning start.",
    cuisine: "Fusion",
    categories: ["quick","thirty-min","breakfast","healthy","vegetarian"],
    cookTimeMinutes: 7,
    difficulty: "Easy",
    servings: 1,
    calories: 220,
    protein: 6,
    carbs: 38,
    fat: 6,
    rating: 4.4,
    isVeg: true,
    ingredients: [
      { name: "green juice", amount: "1 cup", staple: false },
      { name: "spinach", amount: "1/2 cup", staple: false },
      { name: "orange", amount: "1, peeled", staple: false },
      { name: "oats", amount: "3 tbsp", staple: true },
      { name: "honey", amount: "1 tbsp", staple: true },
      { name: "nuts", amount: "1 tbsp, chopped", staple: true }
    ],
    instructions: [
      "Blend the green juice, spinach and orange together until completely smooth.",
      "Add the oats and blend again briefly so the mixture thickens slightly.",
      "Taste and stir in honey if needed for sweetness.",
      "Pour into a bowl.",
      "Top with chopped nuts and a few extra oats for crunch.",
      "Serve immediately while fresh."
    ],
    tips: [
      "Blending the oats into the smoothie helps thicken it into a proper bowl consistency.",
      "Use very cold green juice straight from the fridge for the most refreshing result."
    ]
  },
  {
    id: "orange-soda-float",
    title: "Orange Soda Float",
    description: "A nostalgic fizzy float combining chilled soft drink with a splash of creamy milk for a fun treat.",
    cuisine: "American",
    categories: ["quick","thirty-min","desserts","snacks","vegetarian"],
    cookTimeMinutes: 5,
    difficulty: "Easy",
    servings: 1,
    calories: 260,
    protein: 4,
    carbs: 40,
    fat: 8,
    rating: 4.3,
    isVeg: true,
    ingredients: [
      { name: "soft drink cans", amount: "1 can", staple: false },
      { name: "milk", amount: "1/4 cup, chilled", staple: false },
      { name: "vanilla extract", amount: "1/4 tsp", staple: true },
      { name: "ice", amount: "1/2 cup", staple: true },
      { name: "cream", amount: "2 tbsp", staple: true },
      { name: "sugar", amount: "1 tsp", staple: true }
    ],
    instructions: [
      "Fill a tall glass with ice.",
      "Slowly pour in the chilled soft drink, letting it settle over the ice.",
      "Whisk the milk with vanilla extract until slightly frothy.",
      "Gently pour the milk mixture over the soda, letting it swirl and float.",
      "Serve immediately with a straw or spoon before the fizz settles."
    ],
    tips: [
      "Pour the soda slowly down the side of the glass to keep more of its fizz.",
      "Use very cold soda and milk so the float stays fizzy longer."
    ]
  },
  {
    id: "sparkling-watermelon-lemonade",
    title: "Sparkling Watermelon Lemonade",
    description: "Fresh watermelon juice and tangy lemon topped with sparkling water for a bubbly summer cooler.",
    cuisine: "American",
    categories: ["quick","thirty-min","snacks","desserts","vegetarian","healthy"],
    cookTimeMinutes: 8,
    difficulty: "Easy",
    servings: 4,
    calories: 120,
    protein: 1,
    carbs: 24,
    fat: 0,
    rating: 4.6,
    isVeg: true,
    ingredients: [
      { name: "watermelon", amount: "3 cups, cubed", staple: false },
      { name: "lemon", amount: "2", staple: false },
      { name: "sparkling water", amount: "1.5 cups", staple: false },
      { name: "sugar", amount: "2 tbsp", staple: true },
      { name: "honey", amount: "1 tbsp", staple: true },
      { name: "ice", amount: "2 cups", staple: true }
    ],
    instructions: [
      "Blend the watermelon cubes until completely smooth, then strain if a smoother texture is preferred.",
      "Squeeze the juice from both lemons into the watermelon purée.",
      "Stir in sugar and honey until fully dissolved.",
      "Fill glasses with ice and pour the watermelon-lemon mixture over the top.",
      "Top each glass with sparkling water and stir gently.",
      "Serve immediately garnished with a lemon slice."
    ],
    tips: [
      "Chill all ingredients beforehand so you can serve immediately without diluting with extra ice.",
      "Add the sparkling water last and stir gently to keep as much fizz as possible."
    ]
  },
  {
    id: "grilled-chicken-spinach-salad",
    title: "Grilled Chicken & Spinach Salad",
    description: "A light, protein-packed salad of grilled chicken, fresh spinach, cherry tomatoes and cucumber in a lemon dressing.",
    cuisine: "Continental",
    categories: ["thirty-min","lunch","dinner","non-vegetarian","healthy","high-protein"],
    cookTimeMinutes: 20,
    difficulty: "Easy",
    servings: 2,
    calories: 340,
    protein: 34,
    carbs: 10,
    fat: 18,
    rating: 4.6,
    isVeg: false,
    ingredients: [
      { name: "sliced chicken breast", amount: "300g", staple: false },
      { name: "spinach", amount: "3 cups", staple: false },
      { name: "cherry tomatoes", amount: "1 cup, halved", staple: false },
      { name: "cucumber", amount: "1, sliced", staple: false },
      { name: "olive oil", amount: "3 tbsp", staple: true },
      { name: "lemon", amount: "1", staple: false },
      { name: "salt", amount: "to taste", staple: true },
      { name: "black pepper", amount: "to taste", staple: true }
    ],
    instructions: [
      "Season the sliced chicken breast with salt and pepper.",
      "Heat 1 tbsp olive oil in a grill pan and cook the chicken for 5-6 minutes per side until golden and cooked through.",
      "Rest the chicken for 3 minutes, then slice into strips.",
      "Toss the spinach, cherry tomatoes and cucumber together in a large bowl.",
      "Whisk the remaining olive oil with fresh lemon juice, salt and pepper to make a simple dressing.",
      "Pour the dressing over the salad and toss to coat evenly.",
      "Top the salad with the sliced grilled chicken and serve immediately."
    ],
    tips: [
      "Slice the chicken against the grain for the most tender bite.",
      "Dress the salad right before serving so the spinach doesn't wilt too much."
    ]
  },
  {
    id: "ham-cheese-club-sandwich",
    title: "Ham & Cheese Club Sandwich",
    description: "A stacked triple-decker sandwich with rolled ham, cheese, cherry tomatoes and crisp cucumber.",
    cuisine: "American",
    categories: ["quick","thirty-min","lunch","snacks","non-vegetarian","high-protein"],
    cookTimeMinutes: 12,
    difficulty: "Easy",
    servings: 1,
    calories: 420,
    protein: 22,
    carbs: 34,
    fat: 20,
    rating: 4.4,
    isVeg: false,
    ingredients: [
      { name: "bread", amount: "3 slices", staple: true },
      { name: "rolled ham", amount: "4 slices", staple: false },
      { name: "cheese", amount: "2 slices", staple: false },
      { name: "cherry tomatoes", amount: "5, sliced", staple: false },
      { name: "cucumber", amount: "1/2, sliced", staple: false },
      { name: "mayonnaise", amount: "2 tbsp", staple: true },
      { name: "salt", amount: "to taste", staple: true },
      { name: "black pepper", amount: "to taste", staple: true }
    ],
    instructions: [
      "Toast the bread slices lightly until just golden.",
      "Spread mayonnaise on both sides of each slice.",
      "On the first slice, layer rolled ham and cheese, then top with the second bread slice.",
      "On top of the second slice, layer sliced cucumber, cherry tomatoes, salt and pepper.",
      "Top with the final bread slice and press down gently.",
      "Secure with toothpicks and slice diagonally into halves or quarters before serving."
    ],
    tips: [
      "Toothpicks or skewers help keep a tall club sandwich from sliding apart.",
      "Pat the tomato and cucumber dry to keep the bread from getting soggy."
    ]
  },
  {
    id: "strawberry-blueberry-parfait",
    title: "Strawberry Blueberry Fruit Parfait",
    description: "Layers of creamy yogurt, fresh strawberries, blueberries and crunchy oats in a beautiful breakfast dessert.",
    cuisine: "American",
    categories: ["quick","thirty-min","breakfast","desserts","vegetarian","healthy"],
    cookTimeMinutes: 8,
    difficulty: "Easy",
    servings: 2,
    calories: 240,
    protein: 10,
    carbs: 34,
    fat: 8,
    rating: 4.6,
    isVeg: true,
    ingredients: [
      { name: "strawberries", amount: "1 cup, sliced", staple: false },
      { name: "blueberries", amount: "1 cup", staple: false },
      { name: "yogurt/curd", amount: "1.5 cups", staple: true },
      { name: "honey", amount: "2 tbsp", staple: true },
      { name: "oats", amount: "1/3 cup", staple: true },
      { name: "nuts", amount: "2 tbsp, chopped", staple: true }
    ],
    instructions: [
      "Slice the strawberries and set them aside with the blueberries.",
      "Sweeten the yogurt lightly by stirring in half the honey.",
      "In two glasses, spoon a layer of yogurt at the bottom.",
      "Add a layer of mixed berries, then a sprinkle of oats.",
      "Repeat the layering until the glasses are full, finishing with berries on top.",
      "Drizzle the remaining honey over the top and sprinkle with chopped nuts.",
      "Serve immediately or chill for 15 minutes before serving."
    ],
    tips: [
      "Layer just before serving so the oats stay crunchy instead of going soft.",
      "Use Greek-style thick yogurt for the sturdiest, most photogenic layers."
    ]
  },
  {
    id: "no-bake-lemon-cheesecake-bites",
    title: "No-Bake Lemon Cheesecake Bites",
    description: "Bite-sized creamy cheesecake cups with a bright lemon tang and a buttery crumb base, no oven required.",
    cuisine: "American",
    categories: ["thirty-min","desserts","vegetarian"],
    cookTimeMinutes: 20,
    difficulty: "Medium",
    servings: 4,
    calories: 260,
    protein: 8,
    carbs: 24,
    fat: 16,
    rating: 4.5,
    isVeg: true,
    ingredients: [
      { name: "cheese", amount: "1 cup, softened", staple: false },
      { name: "paneer", amount: "1/2 cup, mashed smooth", staple: false },
      { name: "lemon", amount: "1, juiced and zested", staple: false },
      { name: "sugar", amount: "1/3 cup", staple: true },
      { name: "butter", amount: "2 tbsp, melted", staple: true },
      { name: "breadcrumbs", amount: "1 cup", staple: true },
      { name: "vanilla extract", amount: "1/2 tsp", staple: true }
    ],
    instructions: [
      "Mix the breadcrumbs with melted butter until it resembles wet sand, then press into the bottom of small cups to form a crust.",
      "Chill the crusts in the refrigerator for 10 minutes to firm up.",
      "Beat the softened cheese and mashed paneer together until smooth and creamy.",
      "Add sugar, lemon juice, lemon zest and vanilla extract, beating until fully combined and fluffy.",
      "Spoon the lemon cheese mixture over the chilled crusts, smoothing the tops.",
      "Refrigerate for at least 2 hours, or until firm, before serving.",
      "Top with a little extra lemon zest just before serving."
    ],
    tips: [
      "Make sure the cheese is fully softened before mixing to avoid a lumpy filling.",
      "These keep well in the fridge for up to 3 days, covered."
    ]
  },
  {
    id: "watermelon-paneer-salad",
    title: "Watermelon Paneer Salad",
    description: "A sweet-savory salad pairing juicy watermelon cubes with soft paneer, lemon and fresh basil.",
    cuisine: "Fusion",
    categories: ["quick","thirty-min","snacks","lunch","vegetarian","healthy"],
    cookTimeMinutes: 10,
    difficulty: "Easy",
    servings: 2,
    calories: 210,
    protein: 10,
    carbs: 16,
    fat: 12,
    rating: 4.4,
    isVeg: true,
    ingredients: [
      { name: "watermelon", amount: "2 cups, cubed", staple: false },
      { name: "paneer", amount: "150g, cubed", staple: false },
      { name: "lemon", amount: "1", staple: false },
      { name: "olive oil", amount: "1.5 tbsp", staple: true },
      { name: "basil", amount: "8 leaves, torn", staple: true },
      { name: "black pepper", amount: "to taste", staple: true },
      { name: "salt", amount: "to taste", staple: true }
    ],
    instructions: [
      "Lightly pan-sear the paneer cubes in a splash of olive oil until golden on all sides, about 3 minutes.",
      "Let the seared paneer cool slightly to room temperature.",
      "Arrange the watermelon cubes and paneer together on a serving plate.",
      "Drizzle with olive oil and fresh lemon juice.",
      "Scatter torn basil leaves over the top.",
      "Season with salt and black pepper and serve immediately."
    ],
    tips: [
      "Searing the paneer adds a nice contrast of warm, crisp edges against the cold, juicy watermelon.",
      "Serve promptly — watermelon releases juice quickly once cut and salted."
    ]
  },
  {
    id: "orange-juice-yogurt-parfait",
    title: "Orange Juice & Yogurt Breakfast Parfait",
    description: "A bright, tangy breakfast parfait layering orange juice-soaked oats with creamy yogurt and fresh orange.",
    cuisine: "American",
    categories: ["quick","thirty-min","breakfast","vegetarian","healthy"],
    cookTimeMinutes: 6,
    difficulty: "Easy",
    servings: 2,
    calories: 200,
    protein: 8,
    carbs: 30,
    fat: 5,
    rating: 4.3,
    isVeg: true,
    ingredients: [
      { name: "orange juice", amount: "1 cup", staple: false },
      { name: "orange", amount: "1, segmented", staple: false },
      { name: "yogurt/curd", amount: "1 cup", staple: true },
      { name: "oats", amount: "1/2 cup", staple: true },
      { name: "honey", amount: "1 tbsp", staple: true },
      { name: "blueberries", amount: "1/4 cup", staple: false },
      { name: "nuts", amount: "1 tbsp, chopped", staple: true }
    ],
    instructions: [
      "Soak the oats in the orange juice for 5 minutes until slightly softened.",
      "Stir a spoon of honey into the yogurt to lightly sweeten it.",
      "Layer the soaked oats and sweetened yogurt in a glass.",
      "Top with fresh orange segments.",
      "Repeat the layers if using a taller glass, finishing with orange on top.",
      "Serve immediately while the oats still have a slight bite."
    ],
    tips: [
      "A short soak keeps the oats pleasantly chewy rather than mushy.",
      "Use fresh orange segments rather than juice on top for the best texture contrast."
    ]
  },
  {
    id: "buttermilk-blueberry-pancakes",
    title: "Buttermilk Blueberry Pancakes",
    description: "Fluffy golden pancakes studded with juicy blueberries, a weekend breakfast classic made from scratch.",
    cuisine: "American",
    categories: ["thirty-min","breakfast","vegetarian","desserts"],
    cookTimeMinutes: 20,
    difficulty: "Medium",
    servings: 3,
    calories: 380,
    protein: 10,
    carbs: 56,
    fat: 12,
    rating: 4.6,
    isVeg: true,
    ingredients: [
      { name: "all-purpose flour", amount: "1.5 cups", staple: true },
      { name: "milk", amount: "1.25 cups", staple: false },
      { name: "eggs", amount: "2", staple: false },
      { name: "blueberries", amount: "1 cup", staple: false },
      { name: "baking powder", amount: "2 tsp", staple: true },
      { name: "sugar", amount: "3 tbsp", staple: true },
      { name: "butter", amount: "2 tbsp, melted", staple: true },
      { name: "vanilla extract", amount: "1/2 tsp", staple: true }
    ],
    instructions: [
      "Whisk the flour, baking powder and sugar together in a large bowl.",
      "In a separate bowl, beat the eggs with milk, melted butter and vanilla extract.",
      "Pour the wet ingredients into the dry ingredients and stir just until combined — a few lumps are fine.",
      "Gently fold in the blueberries.",
      "Heat a lightly greased nonstick griddle over medium heat and ladle out rounds of batter.",
      "Cook for 2-3 minutes until bubbles form on the surface, then flip and cook for another 2 minutes until golden.",
      "Stack the pancakes and serve warm with extra berries or honey."
    ],
    tips: [
      "Do not overmix the batter — a few lumps guarantee fluffier pancakes.",
      "Toss the blueberries in a little flour before folding them in to prevent them from sinking."
    ]
  },
  {
    id: "egg-veggie-protein-muffins",
    title: "Protein-Packed Egg & Veggie Muffins",
    description: "Baked egg muffins loaded with spinach, bell pepper and cheese, a make-ahead high-protein breakfast.",
    cuisine: "American",
    categories: ["thirty-min","breakfast","snacks","high-protein","vegetarian","healthy"],
    cookTimeMinutes: 25,
    difficulty: "Easy",
    servings: 4,
    calories: 190,
    protein: 20,
    carbs: 6,
    fat: 12,
    rating: 4.5,
    isVeg: true,
    ingredients: [
      { name: "eggs", amount: "8", staple: false },
      { name: "spinach", amount: "1 cup, chopped", staple: false },
      { name: "red bell pepper", amount: "1, diced", staple: false },
      { name: "cheese", amount: "1/2 cup, shredded", staple: false },
      { name: "onion", amount: "1/4, diced", staple: true },
      { name: "salt", amount: "to taste", staple: true },
      { name: "black pepper", amount: "to taste", staple: true }
    ],
    instructions: [
      "Preheat the oven to 180°C (350°F) and grease a muffin tin well.",
      "Whisk the eggs in a large bowl with salt and pepper until well blended.",
      "Stir in the chopped spinach, diced bell pepper, onion and half the cheese.",
      "Divide the egg mixture evenly among 8 muffin cups.",
      "Sprinkle the remaining cheese over the tops.",
      "Bake for 18-20 minutes until the muffins are puffed and set in the center.",
      "Let cool for 5 minutes before removing from the tin and serving."
    ],
    tips: [
      "These reheat beautifully — make a batch and store in the fridge for quick breakfasts all week.",
      "Grease the muffin tin generously so the egg muffins release cleanly."
    ]
  },
  {
    id: "broccoli-cheddar-soup",
    title: "Broccoli Cheddar Soup",
    description: "A velvety, comforting soup blending tender broccoli with melted cheese for a rich, warming bowl.",
    cuisine: "American",
    categories: ["thirty-min","lunch","dinner","vegetarian"],
    cookTimeMinutes: 30,
    difficulty: "Easy",
    servings: 3,
    calories: 340,
    protein: 14,
    carbs: 20,
    fat: 22,
    rating: 4.5,
    isVeg: true,
    ingredients: [
      { name: "broccoli", amount: "3 cups florets", staple: false },
      { name: "cheese", amount: "1.5 cups, shredded", staple: false },
      { name: "milk", amount: "1 cup", staple: false },
      { name: "butter", amount: "3 tbsp", staple: true },
      { name: "all-purpose flour", amount: "3 tbsp", staple: true },
      { name: "onion", amount: "1/2, chopped", staple: true },
      { name: "garlic", amount: "2 cloves, minced", staple: true },
      { name: "stock/broth", amount: "2 cups", staple: true },
      { name: "salt", amount: "to taste", staple: true },
      { name: "black pepper", amount: "to taste", staple: true }
    ],
    instructions: [
      "Melt the butter in a pot and sauté onion and garlic until softened, about 3 minutes.",
      "Whisk in the flour and cook for 1 minute to form a light roux.",
      "Gradually whisk in the stock and milk, ensuring no lumps remain.",
      "Add the broccoli florets and simmer for 12-15 minutes until very tender.",
      "Blend the soup partially with an immersion blender for a chunky-smooth texture, or leave as is for a chunkier soup.",
      "Reduce heat to low and stir in the cheese until fully melted and smooth.",
      "Season with salt and pepper and serve hot."
    ],
    tips: [
      "Keep the heat low once the cheese goes in to prevent it from separating or turning grainy.",
      "Blend only part of the soup if you like a mix of creamy and chunky textures."
    ]
  },
  {
    id: "grilled-chicken-broccoli-bowl",
    title: "Grilled Chicken & Broccoli Power Bowl",
    description: "A balanced, high-protein bowl of grilled chicken, steamed broccoli, carrots and rice in a light soy glaze.",
    cuisine: "Continental",
    categories: ["thirty-min","dinner","lunch","non-vegetarian","high-protein","healthy"],
    cookTimeMinutes: 25,
    difficulty: "Easy",
    servings: 2,
    calories: 380,
    protein: 38,
    carbs: 22,
    fat: 14,
    rating: 4.7,
    isVeg: false,
    ingredients: [
      { name: "sliced chicken breast", amount: "350g", staple: false },
      { name: "broccoli", amount: "2 cups florets", staple: false },
      { name: "carrots", amount: "1, sliced", staple: false },
      { name: "rice", amount: "1.5 cups, cooked", staple: true },
      { name: "soy sauce", amount: "2 tbsp", staple: false },
      { name: "olive oil", amount: "2 tbsp", staple: true },
      { name: "garlic", amount: "2 cloves, minced", staple: true },
      { name: "salt", amount: "to taste", staple: true },
      { name: "black pepper", amount: "to taste", staple: true }
    ],
    instructions: [
      "Season the sliced chicken breast with salt and pepper and grill or pan-sear in 1 tbsp olive oil for 5-6 minutes until cooked through; slice.",
      "Steam or blanch the broccoli and carrots for 4-5 minutes until tender-crisp.",
      "Heat the remaining olive oil in a small pan and sauté garlic for 30 seconds, then stir in the soy sauce to make a quick glaze.",
      "Divide the cooked rice between two bowls.",
      "Top each bowl with the steamed broccoli, carrots and sliced grilled chicken.",
      "Drizzle the garlic-soy glaze over the top before serving.",
      "Serve immediately while everything is warm."
    ],
    tips: [
      "Steaming instead of boiling the vegetables keeps more nutrients and crunch intact.",
      "Meal-prep this bowl by cooking components ahead and assembling fresh each day."
    ]
  },
  {
    id: "mixed-berry-sorbet",
    title: "Mixed Berry Sorbet",
    description: "A light, icy dessert of pureed strawberries and blueberries with lemon, sweetened just enough to shine.",
    cuisine: "American",
    categories: ["thirty-min","desserts","vegetarian","healthy"],
    cookTimeMinutes: 15,
    difficulty: "Medium",
    servings: 4,
    calories: 140,
    protein: 2,
    carbs: 34,
    fat: 0,
    rating: 4.5,
    isVeg: true,
    ingredients: [
      { name: "strawberries", amount: "2 cups", staple: false },
      { name: "blueberries", amount: "1 cup", staple: false },
      { name: "lemon", amount: "1", staple: false },
      { name: "sparkling water", amount: "1/4 cup", staple: false },
      { name: "sugar", amount: "1/3 cup", staple: true },
      { name: "honey", amount: "1 tbsp", staple: true },
      { name: "ice", amount: "1/2 cup, for freezing bowl", staple: true }
    ],
    instructions: [
      "Blend the strawberries and blueberries with sugar and lemon juice until completely smooth.",
      "Stir in the sparkling water to loosen the purée slightly.",
      "Pour the mixture into a shallow freezer-safe container.",
      "Freeze for 1 hour, then scrape and stir vigorously with a fork to break up ice crystals.",
      "Return to the freezer and repeat the scraping every 45 minutes for about 3 hours total, until light and flaky.",
      "Scoop into bowls and serve immediately."
    ],
    tips: [
      "Scraping the sorbet regularly as it freezes is what gives it that light, flaky texture instead of a solid block.",
      "A shallow, wide container freezes and scrapes much more evenly than a deep one."
    ]
  },
  {
    id: "ham-egg-cheese-wrap",
    title: "Ham, Egg & Cheese Breakfast Wrap",
    description: "A quick, portable breakfast wrap packed with scrambled eggs, rolled ham and melted cheese in a soft tortilla.",
    cuisine: "American",
    categories: ["quick","thirty-min","breakfast","non-vegetarian","high-protein"],
    cookTimeMinutes: 12,
    difficulty: "Easy",
    servings: 1,
    calories: 420,
    protein: 26,
    carbs: 28,
    fat: 22,
    rating: 4.5,
    isVeg: false,
    ingredients: [
      { name: "tortillas", amount: "1 large", staple: true },
      { name: "eggs", amount: "2", staple: false },
      { name: "rolled ham", amount: "3 slices", staple: false },
      { name: "cheese", amount: "1/4 cup, shredded", staple: false },
      { name: "butter", amount: "1 tsp", staple: true },
      { name: "salt", amount: "to taste", staple: true },
      { name: "black pepper", amount: "to taste", staple: true }
    ],
    instructions: [
      "Melt the butter in a pan over medium heat and pour in the beaten eggs, seasoned with salt and pepper.",
      "Scramble gently for 2-3 minutes until just set and creamy.",
      "Warm the tortilla briefly in a dry pan or microwave until soft and pliable.",
      "Lay the rolled ham slices in the center of the tortilla.",
      "Top with the scrambled eggs and shredded cheese.",
      "Fold in the sides of the tortilla, then roll tightly from the bottom into a wrap.",
      "Slice in half and serve warm, or wrap in foil for an on-the-go breakfast."
    ],
    tips: [
      "Roll tightly and let the wrap rest seam-side down for a minute to help it hold its shape.",
      "Warming the tortilla first prevents it from cracking when you roll it."
    ]
  }
];

export default RECIPES;
