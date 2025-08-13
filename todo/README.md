# React ToDo App

A simple **ToDo List** application built with **React** and **Redux Toolkit**, designed to practice state management, modular components, and custom styling.

## Features

- **Add new ToDos** via an input bar and `Add` button.
- **Mark ToDos as completed** using a checkbox.
- **Double-click to edit** a ToDo’s text inline.
- **Clear all ToDos** with a single click (`Clear todos`).
- **Local state persistence** via Local Storage (no backend yet).
- **Minimal dark UI** with glassmorphism effects and smooth transitions.

## Technologies Used

- **React** – Main library for the UI.
- **Redux Toolkit** – State management (`todoSlicer.js`).
- **Custom CSS** – Dark, minimal, and responsive styling.
- **UUID** – Generate unique IDs for ToDos.


## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open the app in your browser
http://localhost:5173
```

## Next Steps

- Add **user authentication** (Passport.js + Express backend).
- Save ToDos in a **database** instead of Local Storage.
- Improve UI with animations for adding/removing items.