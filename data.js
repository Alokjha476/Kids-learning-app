// Content Data for LKG and UKG Learning Application

const KIDS_DATA = {
  english: {
    lkg: {
      title: "LKG English",
      subtitle: "Alphabets, Phonics & Letters Tracing",
      sections: [
        { id: "english_exercise", name: "English Practice Exercise ✏️", icon: "📝" },
        { id: "alphabet", name: "Alphabet (A-Z)", icon: "🔤" },
        { id: "phonics", name: "Phonics & Words", icon: "🍎" },
        { id: "sight_words", name: "Simple Sight Words", icon: "👀" },
        { id: "tracing", name: "Letter Tracing Canvas", icon: "✏️" }
      ],
      alphabets: [
        { letter: "A", small: "a", word: "Apple", phonic: "ae", emoji: "🍎", imageText: "Red crisp apple" },
        { letter: "B", small: "b", word: "Ball", phonic: "buh", emoji: "⚽", imageText: "Bouncy soccer ball" },
        { letter: "C", small: "c", word: "Cat", phonic: "cuh", emoji: "🐱", imageText: "Cute furry cat" },
        { letter: "D", small: "d", word: "Dog", phonic: "duh", emoji: "🐶", imageText: "Friendly puppy dog" },
        { letter: "E", small: "e", word: "Elephant", phonic: "eh", emoji: "🐘", imageText: "Big gray elephant" },
        { letter: "F", small: "f", word: "Fish", phonic: "ff", emoji: "🐟", imageText: "Swimming little fish" },
        { letter: "G", small: "g", word: "Grapes", phonic: "guh", emoji: "🍇", imageText: "Juicy purple grapes" },
        { letter: "H", small: "h", word: "Hat", phonic: "huh", emoji: "🎩", imageText: "Fancy black hat" },
        { letter: "I", small: "i", word: "Ice Cream", phonic: "ih", emoji: "🍦", imageText: "Sweet cold ice cream" },
        { letter: "J", small: "j", word: "Jug", phonic: "juh", emoji: "🏺", imageText: "Water pitcher jug" },
        { letter: "K", small: "k", word: "Kite", phonic: "kuh", emoji: "🪁", imageText: "Flying colorful kite" },
        { letter: "L", small: "l", word: "Lion", phonic: "ll", emoji: "🦁", imageText: "Roaring brave lion" },
        { letter: "M", small: "m", word: "Monkey", phonic: "mm", emoji: "🐒", imageText: "Playful brown monkey" },
        { letter: "N", small: "n", word: "Nest", phonic: "nn", emoji: "🪹", imageText: "Bird nest with eggs" },
        { letter: "O", small: "o", word: "Orange", phonic: "oh", emoji: "🍊", imageText: "Sweet citrus orange" },
        { letter: "P", small: "p", word: "Parrot", phonic: "puh", emoji: "🦜", imageText: "Green talking parrot" },
        { letter: "Q", small: "q", word: "Queen", phonic: "kwah", emoji: "👑", imageText: "Royal queen with crown" },
        { letter: "R", small: "r", word: "Rabbit", phonic: "err", emoji: "🐰", imageText: "Cute hopping rabbit" },
        { letter: "S", small: "s", word: "Sun", phonic: "ss", emoji: "☀️", imageText: "Bright shining sun" },
        { letter: "T", small: "t", word: "Tiger", phonic: "tuh", emoji: "🐯", imageText: "Striped wild tiger" },
        { letter: "U", small: "u", word: "Umbrella", phonic: "uh", emoji: "☂️", imageText: "Rainy day umbrella" },
        { letter: "V", small: "v", word: "Van", phonic: "vv", emoji: "🚐", imageText: "Yellow school van" },
        { letter: "W", small: "w", word: "Watch", phonic: "wah", emoji: "⌚", imageText: "Wrist clock watch" },
        { letter: "X", small: "x", word: "Xylophone", phonic: "ks", emoji: "🎼", imageText: "Musical xylophone" },
        { letter: "Y", small: "y", word: "Yak", phonic: "yuh", emoji: "🐂", imageText: "Hairy mountain yak" },
        { letter: "Z", small: "z", word: "Zebra", phonic: "zz", emoji: "🦓", imageText: "Black & white zebra" }
      ],
      sightWords: [
        { word: "AM", meaning: "I am happy", emoji: "😊" },
        { word: "AT", meaning: "At home", emoji: "🏠" },
        { word: "GO", meaning: "Go fast!", emoji: "🏃" },
        { word: "IN", meaning: "In the box", emoji: "📦" },
        { word: "IS", meaning: "This is a cat", emoji: "🐱" },
        { word: "IT", meaning: "It is fun", emoji: "🎉" },
        { word: "ME", meaning: "Look at me", emoji: "👧" },
        { word: "MY", meaning: "My toy", emoji: "🧸" },
        { word: "NO", meaning: "No running", emoji: "✋" },
        { word: "ON", meaning: "On the bed", emoji: "🛏️" },
        { word: "TO", meaning: "Go to school", emoji: "🏫" },
        { word: "UP", meaning: "Look up!", emoji: "☝️" },
        { word: "WE", meaning: "We are friends", emoji: "👫" },
        { word: "HE", meaning: "He is a boy", emoji: "👦" }
      ]
    },
    ukg: {
      title: "UKG English",
      subtitle: "3-Letter Words, Vowels, Opposites & Sentences",
      sections: [
        { id: "english_exercise", name: "English Practice Exercise ✏️", icon: "📝" },
        { id: "cvc", name: "3-Letter Words (CVC)", icon: "🔤" },
        { id: "vowels", name: "Vowels (A, E, I, O, U)", icon: "🌟" },
        { id: "opposites", name: "Opposites Words", icon: "↔️" },
        { id: "actions", name: "Action Words", icon: "🏃" }
      ],
      cvcWords: [
        { category: "-AT Words", items: [
          { word: "CAT", emoji: "🐱" }, { word: "BAT", emoji: "🦇" }, { word: "MAT", emoji: "🧹" }, { word: "HAT", emoji: "🎩" }, { word: "RAT", emoji: "🐀" }
        ]},
        { category: "-AN Words", items: [
          { word: "FAN", emoji: "🌀" }, { word: "VAN", emoji: "🚐" }, { word: "PAN", emoji: "🍳" }, { word: "MAN", emoji: "👨" }, { word: "CAN", emoji: "🥫" }
        ]},
        { category: "-IG Words", items: [
          { word: "PIG", emoji: "🐷" }, { word: "WIG", emoji: "💇" }, { word: "FIG", emoji: "🫒" }, { word: "DIG", emoji: "⛏️" }, { word: "BIG", emoji: "🐘" }
        ]},
        { category: "-OP Words", items: [
          { word: "TOP", emoji: "🪀" }, { word: "MOP", emoji: "🧹" }, { word: "HOP", emoji: "🐰" }, { word: "POP", emoji: "🍿" }, { word: "COP", emoji: "👮" }
        ]},
        { category: "-UG Words", items: [
          { word: "BUG", emoji: "🐛" }, { word: "MUG", emoji: "☕" }, { word: "RUG", emoji: "🛋️" }, { word: "JUG", emoji: "🏺" }, { word: "HUG", emoji: "🤗" }
        ]}
      ],
      vowels: [
        { letter: "A", sound: "Short /a/", examples: [{ word: "APPLE", emoji: "🍎" }, { word: "ANT", emoji: "🐜" }, { word: "AXE", emoji: "🪓" }] },
        { letter: "E", sound: "Short /e/", examples: [{ word: "EGG", emoji: "🥚" }, { word: "ELEPHANT", emoji: "🐘" }, { word: "ENGINE", emoji: "🚂" }] },
        { letter: "I", sound: "Short /i/", examples: [{ word: "IGLOO", emoji: "🛖" }, { word: "INK", emoji: "✒️" }, { word: "INSECT", emoji: "🐞" }] },
        { letter: "O", sound: "Short /o/", examples: [{ word: "OWL", emoji: "🦉" }, { word: "ORANGE", emoji: "🍊" }, { word: "OCTOPUS", emoji: "🐙" }] },
        { letter: "U", sound: "Short /u/", examples: [{ word: "UMBRELLA", emoji: "☂️" }, { word: "UP", emoji: "⬆️" }, { word: "UNCLE", emoji: "👨" }] }
      ],
      opposites: [
        { word1: "BIG", emoji1: "🐘", word2: "SMALL", emoji2: "Ant 🐜" },
        { word1: "HOT", emoji1: "☕", word2: "COLD", emoji2: "Ice 🧊" },
        { word1: "HAPPY", emoji1: "😄", word2: "SAD", emoji2: "😢" },
        { word1: "UP", emoji1: "☝️", word2: "DOWN", emoji2: "👇" },
        { word1: "IN", emoji1: "📥", word2: "OUT", emoji2: "📤" },
        { word1: "DAY", emoji1: "☀️", word2: "NIGHT", emoji2: "🌙" },
        { word1: "TALL", emoji1: "🦒", word2: "SHORT", emoji2: "🦔" },
        { word1: "FAST", emoji1: "🐆", word2: "SLOW", emoji2: "🐢" }
      ],
      actions: [
        { word: "RUN", emoji: "🏃", description: "Running fast in the park" },
        { word: "JUMP", emoji: "🦘", description: "Jumping high up" },
        { word: "EAT", emoji: "🍎", description: "Eating yummy food" },
        { word: "SLEEP", emoji: "😴", description: "Sleeping in cozy bed" },
        { word: "PLAY", emoji: "⚽", description: "Playing with friends" },
        { word: "READ", emoji: "📚", description: "Reading colorful storybooks" },
        { word: "SING", emoji: "🎤", description: "Singing happy songs" },
        { word: "SWIM", emoji: "🏊", description: "Swimming in cool water" }
      ]
    }
  },

  hindi: {
    lkg: {
      title: "एल०के०जी० हिंदी (LKG Hindi)",
      subtitle: "स्वर (Swar - Vowels) और अक्षर अभ्यास",
      sections: [
        { id: "hindi_exercise", name: "हिंदी अभ्यास (Practice Exercise) ✏️", icon: "📝" },
        { id: "swar", name: "स्वर (अ से अः)", icon: "🗣️" },
        { id: "swar_words", name: "चित्र और शब्द", icon: "🖼️" },
        { id: "hindi_tracing", name: "अक्षर ट्रेसिंग (Tracing)", icon: "✍️" }
      ],
      swar: [
        { letter: "अ", english: "A", word: "अनार", englishWord: "Anar (Pomegranate)", emoji: "🍎" },
        { letter: "आ", english: "Aa", word: "आम", englishWord: "Aam (Mango)", emoji: "🥭" },
        { letter: "इ", english: "I", word: "इमली", englishWord: "Imli (Tamarind)", emoji: "🟤" },
        { letter: "ई", english: "Ee", word: "ईख", englishWord: "Eekh (Sugarcane)", emoji: "🎋" },
        { letter: "उ", english: "U", word: "उल्लू", englishWord: "Ullu (Owl)", emoji: "🦉" },
        { letter: "ऊ", english: "Oo", word: "ऊन", englishWord: "Oon (Wool)", emoji: "🧶" },
        { letter: "ऋ", english: "Ri", word: "ऋषि", englishWord: "Rishi (Sage)", emoji: "🧘" },
        { letter: "ए", english: "E", word: "एड़ी", englishWord: "Eedi (Heel)", emoji: "🦶" },
        { letter: "ऐ", english: "Ai", word: "ऐनक", englishWord: "Ainak (Spectacles)", emoji: "👓" },
        { letter: "ओ", english: "O", word: "ओखली", englishWord: "Okhli (Mortar)", emoji: "🥣" },
        { letter: "औ", english: "Au", word: "औरत", englishWord: "Aurat (Woman)", emoji: "👩" },
        { letter: "अं", english: "Ang", word: "अंगूर", englishWord: "Angoor (Grapes)", emoji: "🍇" },
        { letter: "अः", english: "Aha", word: "खाली", englishWord: "Khaali (Empty)", emoji: "🌟" }
      ]
    },
    ukg: {
      title: "यू०के०जी० हिंदी (UKG Hindi)",
      subtitle: "व्यंजन (Vyanjan) तथा २ व ३ अक्षर वाले शब्द",
      sections: [
        { id: "hindi_exercise", name: "हिंदी अभ्यास (Practice Exercise) ✏️", icon: "📝" },
        { id: "vyanjan", name: "व्यंजन (क से ज्ञ)", icon: "🔡" },
        { id: "words2", name: "२ अक्षर शब्द", icon: "2️⃣" },
        { id: "words3", name: "३ अक्षर शब्द", icon: "3️⃣" }
      ],
      vyanjan: [
        { letter: "क", word: "कमल", englishWord: "Lotus", emoji: "🪷" },
        { letter: "ख", word: "खरगोश", englishWord: "Rabbit", emoji: "🐰" },
        { letter: "ग", word: "गमला", englishWord: "Flower Pot", emoji: "🪴" },
        { letter: "घ", word: "घर", englishWord: "House", emoji: "🏠" },
        { letter: "ङ", word: "खाली", englishWord: "Blank", emoji: "✨" },
        { letter: "च", word: "चरखा", englishWord: "Spinning Wheel", emoji: "🎡" },
        { letter: "छ", word: "छतरी", englishWord: "Umbrella", emoji: "☂️" },
        { letter: "ज", word: "जग", englishWord: "Jug", emoji: "🏺" },
        { letter: "झ", word: "झंडा", englishWord: "Flag", emoji: "🚩" },
        { letter: "ञ", word: "खाली", englishWord: "Blank", emoji: "✨" },
        { letter: "ट", word: "टमाटर", englishWord: "Tomato", emoji: "🍅" },
        { letter: "ठ", word: "ठठेरा", englishWord: "Tinker", emoji: "🔨" },
        { letter: "ड", word: "डमरू", englishWord: "Drum", emoji: "🥁" },
        { letter: "ढ", word: "ढक्कन", englishWord: "Lid", emoji: "🪞" },
        { letter: "ण", word: "खाली", englishWord: "Blank", emoji: "✨" },
        { letter: "त", word: "तरबूज", englishWord: "Watermelon", emoji: "🍉" },
        { letter: "थ", word: "थरमस", englishWord: "Thermos", emoji: "🍾" },
        { letter: "द", word: "दवात", englishWord: "Inkpot", emoji: "✒️" },
        { letter: "ध", word: "धनुष", englishWord: "Bow", emoji: "🏹" },
        { letter: "न", word: "नल", englishWord: "Tap", emoji: "🚰" },
        { letter: "प", word: "पतंग", englishWord: "Kite", emoji: "🪁" },
        { letter: "फ", word: "फल", englishWord: "Fruits", emoji: "🍎" },
        { letter: "ब", word: "बस", englishWord: "Bus", emoji: "🚌" },
        { letter: "भ", word: "भालू", englishWord: "Bear", emoji: "🐻" },
        { letter: "म", word: "मछली", englishWord: "Fish", emoji: "🐟" },
        { letter: "य", word: "यज्ञ", englishWord: "Yajna", emoji: "🔥" },
        { letter: "र", word: "रथ", englishWord: "Chariot", emoji: "🛞" },
        { letter: "ल", word: "लट्टू", englishWord: "Spinning Top", emoji: "🪀" },
        { letter: "व", word: "वक", englishWord: "Stork", emoji: "🦩" },
        { letter: "श", word: "शलजम", englishWord: "Turnip", emoji: "🧅" },
        { letter: "ष", word: "षट्कोण", englishWord: "Hexagon", emoji: "🛑" },
        { letter: "स", word: "सेब", englishWord: "Apple", emoji: "🍎" },
        { letter: "ह", word: "हाथी", englishWord: "Elephant", emoji: "🐘" },
        { letter: "क्ष", word: "क्षत्रिय", englishWord: "Warrior", emoji: "⚔️" },
        { letter: "त्र", word: "त्रिशूल", englishWord: "Trident", emoji: "🔱" },
        { letter: "ज्ञ", word: "ज्ञानी", englishWord: "Scholar", emoji: "👨‍🏫" }
      ],
      words2Letter: [
        { word: "नल", breakdown: "न + ल", meaning: "Tap / Water Tap", emoji: "🚰" },
        { word: "फल", breakdown: "फ + ल", meaning: "Fruits", emoji: "🍎" },
        { word: "घर", breakdown: "घ + र", meaning: "Home / House", emoji: "🏠" },
        { word: "जल", breakdown: "ज + ल", meaning: "Water", emoji: "💧" },
        { word: "बस", breakdown: "ब + स", meaning: "Bus", emoji: "🚌" },
        { word: "खत", breakdown: "ख + त", meaning: "Letter", emoji: "✉️" },
        { word: "गज", breakdown: "ग + ज", meaning: "Elephant", emoji: "🐘" },
        { word: "जग", breakdown: "ज + ग", meaning: "Jug", emoji: "🏺" }
      ],
      words3Letter: [
        { word: "कमल", breakdown: "क + म + ल", meaning: "Lotus flower", emoji: "🪷" },
        { word: "बटन", breakdown: "ब + ट + न", meaning: "Shirt Button", emoji: "🔘" },
        { word: "मटर", breakdown: "म + ट + र", meaning: "Green Peas", emoji: "🫛" },
        { word: "कलम", breakdown: "क + ल + म", meaning: "Pen / Pencil", emoji: "🖊️" },
        { word: "सड़क", breakdown: "स + ड़ + क", meaning: "Road / Street", emoji: "🛣️" },
        { word: "भवन", breakdown: "भ + व + न", meaning: "Building", emoji: "🏢" },
        { word: "मगर", breakdown: "म + ग + र", meaning: "Crocodile", emoji: "🐊" }
      ]
    }
  },

  math: {
    lkg: {
      title: "LKG Mathematics",
      subtitle: "Numbers 1-20, Visual Counting, Shapes & Colors",
      sections: [
        { id: "math_exercise", name: "Math Practice Exercise ✏️", icon: "📝" },
        { id: "numbers", name: "Numbers (1-20)", icon: "🔢" },
        { id: "counting", name: "Fun Object Counting", icon: "🧮" },
        { id: "shapes", name: "2D Shapes", icon: "📐" },
        { id: "colors", name: "Primary & Bright Colors", icon: "🎨" }
      ],
      numbers: Array.from({ length: 20 }, (_, i) => {
        const num = i + 1;
        const words = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
                       "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty"];
        const emojis = ["🍎", "🎈", "⭐", "🚗", "🐶", "🌺", "🦆", "🐟", "🍬", "🐥", "🍦", "🍪", "🚀", "🐝", "🍓", "🎁", "⚽", "🦋", "🍄", "🍉"];
        return {
          val: num,
          name: words[i],
          emoji: emojis[i],
          items: Array(num).fill(emojis[i])
        };
      }),
      shapes: [
        { name: "Circle", emoji: "🔴", desc: "Round with no corners like a ball or wheel!", examples: "Coin, Clock, Sun" },
        { name: "Square", emoji: "🟦", desc: "4 equal straight sides and 4 square corners!", examples: "Chessboard, Box, Window" },
        { name: "Triangle", emoji: "🔺", desc: "3 sharp corners and 3 straight sides!", examples: "Pizza slice, Traffic sign" },
        { name: "Rectangle", emoji: "🟧", desc: "4 sides: 2 long sides & 2 short sides!", examples: "Door, TV screen, Book" },
        { name: "Star", emoji: "⭐", desc: "5 shiny points glowing bright in the sky!", examples: "Night star, Sea star" },
        { name: "Heart", emoji: "❤️", desc: "Cute shape representing love and joy!", examples: "Greeting card, Balloon" }
      ],
      colors: [
        { name: "Red", hex: "#EF4444", emoji: "🍎", example: "Apple, Strawberries, Fire Engine" },
        { name: "Blue", hex: "#3B82F6", emoji: "🌊", example: "Ocean Water, Clear Sky, Blueberries" },
        { name: "Yellow", hex: "#F59E0B", emoji: "🍌", example: "Ripe Banana, Sun, Sunflower" },
        { name: "Green", hex: "#10B981", emoji: "🍃", example: "Fresh Leaf, Grass, Frog" },
        { name: "Pink", hex: "#EC4899", emoji: "🌸", example: "Lotus, Flamingos, Cotton Candy" },
        { name: "Orange", hex: "#F97316", emoji: "🍊", example: "Orange fruit, Pumpkin, Carrot" },
        { name: "Purple", hex: "#8B5CF6", emoji: "🍇", example: "Grapes, Brinjal, Lavender" }
      ]
    },
    ukg: {
      title: "UKG Mathematics",
      subtitle: "Addition, Subtraction, Comparing & Number Patterns",
      sections: [
        { id: "math_exercise", name: "Math Practice Exercise ✏️", icon: "📝" },
        { id: "addition", name: "Visual Addition (+)", icon: "➕" },
        { id: "subtraction", name: "Visual Subtraction (-)", icon: "➖" },
        { id: "multiplication", name: "Multiplication (×)", icon: "✖️" },
        { id: "division", name: "Division (÷)", icon: "➗" },
        { id: "comparing", name: "More or Less (< > =)", icon: "🐊" },
        { id: "patterns", name: "Missing Numbers", icon: "🚂" }
      ],
      addition: [
        { num1: 2, num2: 1, sum: 3, item: "🍎", text: "2 Apples + 1 Apple = 3 Apples" },
        { num1: 3, num2: 2, sum: 5, item: "🎈", text: "3 Balloons + 2 Balloons = 5 Balloons" },
        { num1: 4, num2: 3, sum: 7, item: "⭐", text: "4 Stars + 3 Stars = 7 Stars" },
        { num1: 5, num2: 4, sum: 9, item: "🐤", text: "5 Ducks + 4 Ducks = 9 Ducks" },
        { num1: 6, num2: 2, sum: 8, item: "🍬", text: "6 Candies + 2 Candies = 8 Candies" },
        { num1: 5, num2: 5, sum: 10, item: "🖐️", text: "5 Fingers + 5 Fingers = 10 Fingers" }
      ],
      subtraction: [
        { num1: 3, num2: 1, rem: 2, item: "🍦", text: "3 Ice Creams - 1 eaten = 2 left" },
        { num1: 5, num2: 2, rem: 3, item: "🎈", text: "5 Balloons - 2 popped = 3 left" },
        { num1: 7, num2: 3, rem: 4, item: "🍪", text: "7 Cookies - 3 eaten = 4 left" },
        { num1: 6, num2: 4, rem: 2, item: "🚗", text: "6 Cars - 4 parked = 2 left" },
        { num1: 8, num2: 3, rem: 5, item: "🐟", text: "8 Fish - 3 swam away = 5 left" },
        { num1: 10, num2: 5, rem: 5, item: "🍓", text: "10 Strawberries - 5 shared = 5 left" }
      ],
      multiplication: [
        { num1: 2, num2: 2, prod: 4, item: "🍎", text: "2 groups of 2 Apples = 4 Apples (2 × 2 = 4)" },
        { num1: 3, num2: 2, prod: 6, item: "🎈", text: "3 groups of 2 Balloons = 6 Balloons (3 × 2 = 6)" },
        { num1: 4, num2: 2, prod: 8, item: "⭐", text: "4 groups of 2 Stars = 8 Stars (4 × 2 = 8)" },
        { num1: 5, num2: 2, prod: 10, item: "🍬", text: "5 groups of 2 Candies = 10 Candies (5 × 2 = 10)" },
        { num1: 3, num2: 3, prod: 9, item: "🍦", text: "3 groups of 3 Ice Creams = 9 (3 × 3 = 9)" },
        { num1: 5, num2: 3, prod: 15, item: "🍓", text: "5 groups of 3 Strawberries = 15 (5 × 3 = 15)" }
      ],
      division: [
        { total: 4, group: 2, ans: 2, item: "🍎", text: "4 Apples shared into 2 groups = 2 each (4 ÷ 2 = 2)" },
        { total: 6, group: 2, ans: 3, item: "🎈", text: "6 Balloons shared into 2 groups = 3 each (6 ÷ 2 = 3)" },
        { total: 8, group: 4, ans: 2, item: "⭐", text: "8 Stars shared into 4 groups = 2 each (8 ÷ 4 = 2)" },
        { total: 10, group: 2, ans: 5, item: "🍬", text: "10 Candies shared into 2 groups = 5 each (10 ÷ 2 = 5)" },
        { total: 9, group: 3, ans: 3, item: "🍦", text: "9 Ice Creams shared into 3 groups = 3 each (9 ÷ 3 = 3)" },
        { total: 12, group: 3, ans: 4, item: "🍪", text: "12 Cookies shared into 3 groups = 4 each (12 ÷ 3 = 4)" }
      ],
      comparison: [
        { a: 5, b: 3, relation: ">", symbolText: "is Greater than", emoji: "🐊", explanation: "5 is bigger than 3! Crocodile eats 5." },
        { a: 2, b: 7, relation: "<", symbolText: "is Less than", emoji: "🐊", explanation: "7 is bigger than 2! Crocodile eats 7." },
        { a: 4, b: 4, relation: "=", symbolText: "is Equal to", emoji: "⚖️", explanation: "Both sides have 4! They are equal." },
        { a: 9, b: 6, relation: ">", symbolText: "is Greater than", emoji: "🐊", explanation: "9 is bigger than 6!" },
        { a: 3, b: 8, relation: "<", symbolText: "is Less than", emoji: "🐊", explanation: "8 is bigger than 3!" }
      ],
      patterns: [
        { train: [1, 2, null, 4, 5], missing: 3, options: [2, 3, 6] },
        { train: [5, 6, 7, null, 9], missing: 8, options: [4, 8, 10] },
        { train: [10, 11, null, 13, 14], missing: 12, options: [12, 15, 9] },
        { train: [2, 4, 6, null, 10], missing: 8, options: [7, 8, 9] },
        { train: [5, 10, 15, null, 25], missing: 20, options: [18, 20, 30] }
      ]
    }
  }
};
