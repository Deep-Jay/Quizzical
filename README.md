# Quizzical

Quizzical is a small trivia quiz app built with React and Vite. It pulls five randomized Science & Nature questions from the [Open Trivia Database](https://opentdb.com/), lets you answer, and grades your attempt instantly.

[Live demo](https://quizzical-three-flame.vercel.app)

## Features

- **Five-question quiz** — a fresh set of Science & Nature questions on every round
- **Shuffled answers** — options are randomized with a Fisher–Yates shuffle
- **Instant grading** — correct, incorrect, and checked answers are color-coded per option, with a final score summary
- **Responsive layout** — fluid type and spacing via `clamp()`, a one-column option list on mobile that becomes a two-column grid on wider screens, and a sticky results bar
- **Design-system styling** — every color, radius, and elevation is a CSS custom property in `:root`; tints and alpha variants are derived with `color-mix()`. No UI framework.
- **Accessible** — keyboard focus rings, `role="group"` answer groups, and `prefers-reduced-motion` support
- **Loading and error states** — handles the API request lifecycle explicitly

## Tech stack

- React 19
- Vite 8
- CSS (custom properties, native nesting, `:has()`, `color-mix()`)
- [html-entities](https://github.com/mathiasbynens/html-entities)

## How it works

1. On mount, the app requests five questions from the Open Trivia DB (`opentdb.com`).
2. Each question's answers are shuffled so the correct answer isn't always first.
3. Answers are submitted with a click, and the checked radio value is read for each question and compared against the correct answer.
4. The submission state is rendered entirely in CSS — `:has(input:checked)` drives the selected style, and `data-correct` attributes drive the correct/incorrect feedback after grading.
5. "Play again" resets the round and fetches a new question set.

## Running locally

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run preview  # preview the production build
npm run lint     # oxlint
```

## Roadmap

- Add multiple-answer (boolean) and timed questions
- Persist best scores with `localStorage`
- Extract and unit-test the grading logic
- Let users choose category and difficulty

## Data source

Questions are fetched from the [Open Trivia Database](https://opentdb.com/), a free trivia API. All questions are the API provider's content.