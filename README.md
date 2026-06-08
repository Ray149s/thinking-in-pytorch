# Thinking in PyTorch — PWA

A bite-sized syntax trainer for Python, NumPy, and PyTorch. Installs to your phone like a native app and works offline.

## What this is

A fill-in-the-blank drill app focused on the syntax you actually use in an ML workflow. Exercises are **in context** — the answers you assemble land inside realistic snippets (a real training loop, a real model definition) so the muscle memory attaches to the pattern, not just the isolated function name.

**How it teaches (the part that makes it stick):** the app is built on the learning science from *Make It Stick* — retrieval beats re-reading, and spacing beats cramming.

- **Recall ladder.** A concept starts as tap-the-chip (low friction), then graduates to a wider pool of distractors (you have to *discriminate*, not just slot-fill), then to typing it from memory. Scaffolds withdraw as you prove you remember — *desirable difficulty*.
- **Spaced review.** Every step becomes a flashcard scheduled at expanding intervals (1 → 3 → 7 → 16 → 35 days). A **Daily Review** resurfaces what's due, **interleaved** across topics so you can't coast on one block.
- **Misconception feedback.** Get one wrong and the app explains *why* the right answer is right — feedback is where the learning happens, not the ✗.
- **Calibration.** In review you call your confidence before the reveal; the You tab shows the gap between *felt sure* and *actually right* — the cure for the illusion of fluency.
- **Mastery, not clicks.** A lesson counts as *mastered* only once its cards survive spaced recall across sessions — not the first time you tap through it.

**Honest scope:** this builds *syntax recall and pattern familiarity* — recognizing `optimizer.zero_grad()` in its proper place, knowing `dim=` vs `axis=`, remembering the five-step training loop. It is **not** a substitute for actually training models. That skill is built in a real notebook with a real GPU. This app makes that work less bewildering by drilling the vocabulary first — durably.

## Curriculum

12 levels, 58 lessons:

1. **Python for ML** — lists, slicing, comprehensions, dicts, f-strings
2. **NumPy Basics** — arrays, dtypes, shape, indexing, boolean masks
3. **NumPy Operations** — elementwise math, the axis argument, broadcasting, reshaping
4. **Tensors** — creating, dtypes, devices (CPU/GPU), the NumPy bridge
5. **Tensor Operations** — reshape/view, permute, squeeze, matmul, reductions
6. **Autograd** — requires_grad, backward(), reading .grad, no_grad()
7. **Building Models** — nn.Module, nn.Linear, forward, activations, Sequential
8. **Loss & Optimizers** — loss functions, optimizers, zero_grad/step, learning rate
9. **The Training Loop** — forward, loss, backward, step, and the full canonical loop
10. **Data Handling** — Dataset, DataLoader, iterating batches, transforms
11. **Inference & Evaluation** — eval(), predictions, accuracy, save/load
12. **pandas Essentials** — DataFrames, column selection, filtering, to-tensor

Each level ends with a review, and a separate cross-session **Daily Review** mixes items from everywhere. Level 9 (the training loop) is the heart of the course — everything builds toward internalizing that five-step skeleton.

## Features

- **Daily Review** — a spaced, interleaved retrieval session that resurfaces due cards at the recall difficulty each one has earned. Capped each day so it ends; you finish "caught up," never doom-scrolling.
- **Recall ladder** — chips → wider distractor pool → type-from-memory, withdrawing scaffolds as cards mature.
- **Misconception feedback + calibration** — explanations on every check, and a felt-sure-vs-actually-right readout on the You tab.
- **Offline tutor** — ask a question, get an instant answer from a local knowledge base. Unanswered questions are saved so you can add your own answer later.
- **Streaks** with shields that protect one missed day; a review counts as a day of practice.
- **Rewards tied to real learning** — XP for hard recalls (not for showing up), plus badges including Spaced Out, Total Recall, and Durable.
- **Onboarding** that sets your goal, reminder time, and names your mascot (Tora, the snake)
- All progress saved locally on your device

## Run locally

Needs Node.js 18+.

```bash
npm install
npm run dev
```

## Build & deploy

```bash
npm run build      # outputs to dist/
```

Deploy `dist/` to Vercel (easiest), Netlify, or GitHub Pages. Push to GitHub, connect the repo on vercel.com, and it auto-detects Vite — no config needed.

## Install on your phone

Once deployed, open the URL on your phone:

- **iPhone (Safari):** share icon then "Add to Home Screen"
- **Android (Chrome):** three-dot menu then "Install app"

## Tech

React 18 + Vite + Tailwind + vite-plugin-pwa. Single-file React app (~3200 lines) plus generated icons.

## License

Build whatever you want with it.
