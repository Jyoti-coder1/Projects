# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

#Job Application Portal

A simple Job Application Portal built with React and Redux Toolkit.
Users can fill out a job application form (Name, Email, Resume, Skills) and submitted applications are displayed in a table.
All data is stored in Redux store and persisted in localStorage, so it remains even after refresh.


---

## Features

### Job Application Form with:

Name

Email (with validation)

Resume upload (dummy file, only filename stored)

Skills selection via checkboxes


### Applications displayed in a responsive table

### Data persistence using localStorage

### Fully responsive design for desktop, tablet, and mobile

### Clean UI with hover effects and modern layout



---

## Tech Stack

React – UI framework

Redux Toolkit – State management

React Redux – Redux integration

localStorage – Persistence

CSS3 – Styling and responsiveness



---

## Project Structure

job-application-form/
│
├── src/
│   ├── components/
│   │   ├── ApplicationForm.jsx
│   │   └── ApplicationTable.jsx
│   ├── redux/
│   │   ├── store.js
│   │   └── applicationSlice.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
└── README.md


---

## Installation & Setup


### Create project
npm create vite@latest job-application-form -- --template react

### Go into project
cd job-application-form

### Install dependencies
npm install
npm install @reduxjs/toolkit react-redux 
### Start development server
npm run dev


---

## How It Works

1. Fill out the application form with your details.


2. Select one or more skills and upload a resume file (dummy filename only).


3. Submit the form → Application appears in the table below.


4. Data is stored in Redux and saved to localStorage.