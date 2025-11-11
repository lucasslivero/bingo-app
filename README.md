# 🎱 Binko App

A modern and interactive application for drawing bingo numbers, built with React, Tailwind CSS, and shadcn/ui.

## 📋 Features

- **Automatic Draw**: Draws numbers from 1 to 90 without repetition
- **Letter Identification**: Displays the corresponding letter (B-I-N-G-O) for each number
- **Dual Board**: Complete visualization of numbers divided into two columns
- **Highlighted Numbers**: Drawn numbers are visually highlighted in real-time
- **Progress Counter**: Track how many numbers have been drawn (X/90)
- **Reset Button**: Restart the game at any time

## 🎨 Technologies Used

- **React** - JavaScript library for building user interfaces
- **Tailwind CSS** - Utility-first CSS framework for styling
- **shadcn/ui** - Reusable and accessible React components

## 🎯 How It Works

### Letter Correspondence

Traditional bingo divides numbers into 5 groups, each corresponding to a letter in the word "BINGO":

| Letter | Number Range | Color |
|--------|-------------|-------|
| **B** | 1 - 15 | Blue |
| **I** | 16 - 30 | Green |
| **N** | 31 - 45 | Purple |
| **G** | 46 - 60 | Orange |
| **O** | 61 - 75 | Red |

### Layout

```
┌─────────────────────────────────────────────────────┐
│                    HEADER                           │
│              Bingo Draw                             │
│         B 1-15 | I 16-30 | N 31-45...              │
└─────────────────────────────────────────────────────┘
│                                                     │
│  ┌──────────┐   ┌──────────────┐   ┌──────────┐  │
│  │  Column  │   │     BALL     │   │  Column  │  │
│  │   1-5    │   │    DRAWN     │   │   6-10   │  │
│  │          │   │              │   │          │  │
│  │ 1  2  3  │   │      N       │   │ 6  7  8  │  │
│  │ 4  5     │   │      42      │   │ 9  10    │  │
│  │11 12 13  │   │              │   │16 17 18  │  │
│  │14 15     │   │   [Draw]     │   │19 20     │  │
│  │21 22...  │   │   [Reset]    │   │26 27...  │  │
│  └──────────┘   └──────────────┘   └──────────┘  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 🚀 How to Use

1. **Draw Number**: Click the "Draw Number" button to reveal a new number
2. **Visualize**: The ball will appear with animation showing the letter and number
3. **Track**: See the highlighted numbers on the side boards
4. **Reset**: Use the "Reset" button to start a new game

## Validations

- Does not allow drawing the same number twice
- Alert when all numbers have been drawn
- Disables buttons during animation

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Run the project
npm run dev

# Deploy the project
npm run deploy
```

## 🎨 Customization

### Colors

You can customize colors by editing Tailwind classes:

- Background: `bg-gradient-to-br from-purple-600 to-blue-600`
- Ball: `bg-gradient-to-br from-gray-100 via-white to-gray-200`
- Highlight: `border-green-500`

### Animation Timing

Adjust the duration in `setTimeout`:

```javascript
/* Change these values (in milliseconds) => src/lib/constants.ts */
export const VIDEO_ANIMATION_DURATION = 2500;
export const BALL_ANIMATION_DURATION = 2500;
```

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests

## 👨‍💻 Author

Developed with ❤️ using React and Tailwind CSS

---

**Have fun playing bingo! 🎉**
