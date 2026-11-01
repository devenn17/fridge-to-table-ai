"""
Comprehensive fridge/pantry food vocabulary — used both as open-vocabulary
prompts for YOLO-World detection and as the canonical name/category lookup
used in post-processing. Includes common Indian grocery staples alongside
general fridge items.
"""

CATEGORY_DISPLAY = {
    "vegetable": "Vegetable",
    "fruit": "Fruit",
    "dairy": "Dairy",
    "egg": "Egg",
    "drink": "Drink",
    "bakery": "Bakery",
    "frozen": "Frozen",
    "condiment": "Condiment",
    "meat": "Meat",
    "seafood": "Seafood",
    "other": "Other",
}

VALID_CATEGORIES = set(CATEGORY_DISPLAY.values())

ALIASES = {
    # packaging / phrasing variants -> canonical name
    "bell pepper": "capsicum",
    "chili pepper": "green chili",
    "chilli": "green chili",
    "green chilli": "green chili",
    "cottage cheese": "paneer",
    "paneer block": "paneer",
    "curd": "yogurt",
    "curd cup": "yogurt",
    "dahi": "yogurt",
    "buttermilk": "chaas",
    "soft drink": "cold drink",
    "soda": "cold drink",
    "coca cola": "cold drink",
    "pepsi": "cold drink",
    "sprite": "cold drink",
    "fanta": "cold drink",
    "thums up": "cold drink",
    "milk packet": "milk",
    "milk bottle": "milk",
    "milk carton": "milk",
    "amul milk": "milk",
    "juice bottle": "juice",
    "juice box": "juice",
    "juice carton": "juice",
    "water bottle": "water",
    "mineral water": "water",
    "egg carton": "eggs",
    "egg tray": "eggs",
    "egg": "eggs",
    "loaf of bread": "bread",
    "bread loaf": "bread",
    "pav": "bread",
    "tomato sauce": "ketchup",
    "chocolate bar": "chocolate",
    "frozen pizza": "pizza",
    "chicken breast": "chicken",
    "deli meat": "meat",
    "dairy product": "milk",
    "food container": "leftover food",
    "tiffin box": "leftover food",
    "achaar": "pickle",
    "can of food": "canned food",
    "frozen vegetables": "frozen peas",
    "frozen food": "frozen mixed vegetables",
    "peanut butter jar": "peanut butter",
    "spice jar": "spice packet",
    "masala packet": "spice packet",
    "atta packet": "atta",
    "flour": "atta",
    "rice bag": "rice",
    "dal packet": "dal",
    "lentils": "dal",
    "prawns": "shrimp",
    "prawn": "shrimp",
}


def _canonical_name(prompt: str) -> str:
    return ALIASES.get(prompt.lower().strip(), prompt.lower().strip())


FOOD_VOCABULARY = {
    "vegetable": [
        "onion", "potato", "tomato", "cucumber", "carrot", "cabbage",
        "cauliflower", "spinach", "capsicum", "bell pepper", "broccoli",
        "garlic", "ginger", "green chili", "chili pepper", "mushroom",
        "corn", "peas", "beetroot", "radish", "pumpkin", "okra", "eggplant",
        "lettuce", "beans", "zucchini", "celery", "spring onion",
        "bottle gourd", "bitter gourd", "ridge gourd", "drumstick",
        "sweet potato", "raw banana", "coriander leaves", "curry leaves",
        "mint leaves", "fenugreek leaves",
    ],
    "fruit": [
        "apple", "banana", "orange", "mango", "grapes", "watermelon",
        "lemon", "lime", "kiwi", "strawberry", "pineapple", "papaya",
        "pear", "avocado", "pomegranate", "cherry", "blueberry",
        "guava", "muskmelon", "custard apple", "sapota", "coconut",
        "dragon fruit", "plum", "fig", "dates",
    ],
    "dairy": [
        "milk", "milk packet", "milk bottle", "milk carton", "butter",
        "paneer", "paneer block", "cottage cheese", "cheese", "cheese slice",
        "yogurt", "curd", "curd cup", "dahi", "cream", "ghee", "chaas",
        "buttermilk", "lassi", "condensed milk",
    ],
    "egg": ["egg", "eggs", "egg carton", "egg tray"],
    "drink": [
        "coca cola", "pepsi", "sprite", "fanta", "thums up", "soft drink",
        "soda", "juice", "juice bottle", "juice box", "juice carton",
        "water bottle", "mineral water", "water", "energy drink",
        "milkshake", "cold drink", "beer can", "tea", "coffee",
        "tender coconut water",
    ],
    "bakery": [
        "bread", "loaf of bread", "bread loaf", "pav", "bun", "burger bun",
        "cake", "pastry", "cookies", "biscuit", "rusk", "toast",
        "croissant", "muffin", "cupcake", "doughnut",
    ],
    "frozen": [
        "chicken nuggets", "frozen peas", "frozen food",
        "frozen mixed vegetables", "ice cream", "ice cream tub",
        "frozen pizza", "frozen vegetables", "frozen paratha",
        "frozen samosa", "frozen fries",
    ],
    "condiment": [
        "ketchup", "tomato sauce", "mayonnaise", "soy sauce",
        "chili sauce", "hot sauce", "pickle", "achaar", "jam", "honey",
        "mustard", "vinegar", "cooking sauce", "peanut butter",
        "chocolate spread", "chutney", "spice packet", "masala packet",
        "salt", "sugar",
    ],
    "meat": [
        "chicken", "chicken breast", "meat", "sausage",
        "bacon", "deli meat", "mutton", "minced meat",
    ],
    "seafood": [
        "fish", "shrimp", "prawns", "prawn", "crab", "seafood",
        "fish fillet", "salmon",
    ],
    "other": [
        "cooked rice", "rice", "rice bag", "dal", "dal packet", "lentils",
        "atta", "atta packet", "flour", "besan", "maida", "poha", "sooji",
        "pizza", "chocolate", "chocolate bar", "snack", "chips",
        "namkeen", "sev", "papad", "sandwich", "pasta", "noodles", "tofu",
        "salad", "canned food", "dairy product", "leftover food",
    ],
}

CANONICAL_MAP = {}
for _category, _items in FOOD_VOCABULARY.items():
    for _item in _items:
        CANONICAL_MAP[_item.lower().strip()] = {
            "name": _canonical_name(_item),
            "category": CATEGORY_DISPLAY[_category],
        }

# Every unique prompt the detector looks for in a single combined pass.
ALL_PROMPTS = sorted(CANONICAL_MAP.keys())

# Kept for compatibility with any code that iterates "passes" — now just one.
DETECTION_PASSES = [
    {"name": "all_food_items", "prompts": ALL_PROMPTS},
]


def normalize_detection(label: str, default_category: str = "Other") -> dict:
    key = label.lower().strip()
    if key in CANONICAL_MAP:
        return CANONICAL_MAP[key]

    for alias, canonical in ALIASES.items():
        if alias in key or key in alias:
            cat = CANONICAL_MAP.get(alias, {}).get("category", default_category)
            return {"name": canonical, "category": cat}

    for prompt, meta in CANONICAL_MAP.items():
        if prompt in key or key in prompt:
            return meta

    return {"name": _canonical_name(key), "category": default_category}