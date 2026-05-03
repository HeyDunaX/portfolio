# Personal Portfolio Template
<img width="1000" height="568" alt="image" src="https://github.com/user-attachments/assets/52e81c39-a717-47c1-9b4f-bfa8dcf5abf8" />

A modern, responsive portfolio website built with **React** and deployed on **Vercel**. This project showcases my quality services, works, skills, and blog in a clean and professional format. Designed with a focus on usability and performance, the portfolio adapts fluidly across devices, ensuring an optimal viewing experience on desktops, tablets, and mobile phones. This project allows you to create a personal portfolio with a simple configuration, enabling you to quickly build your own portfolio website. The designs only have some of my own creativity; the rest are based on inspiration from designers on various art platforms.

---

## Features
* Responsive design optimized for desktop and mobile
* Modular React components for easy customization
* Deployment-ready configuration with Vercel
* Organized project structure following best practices
* CSS styling with flexibility for theme adjustments

---

## Live demo
Visit the deployed application: https://heydunax.vercel.app/

---

## Getting started
**Prerequisites**
* Node.js  (>= 14.x)
* npm (>= 6.x) or yarn
**Installation**
Clone the repository and install dependencies:

```bash
git clone https://github.com/HeyDunaX/portfolio.git
cd portfolio
npm install
```
**Development**

Run the app locally:

```bash
npm start
```
The app will be available at http://localhost:3000.
**Production Build**
Create an optimized build:

```bash
npm run build
```
Deploy the contents of the build folder to your hosting provider (Vercel recommended).

---

## Project Structure

```bibitex
portfolio/
├── public/              # Static assets
├── src/                 # React source code
│   ├── components/      # Reusable UI components
│   ├── assets/           # Page-level components
│   └── stylesheet/          # CSS files
├── package.json         # Project metadata and dependencies
├── package-lock.json    
├── README.md            # Project documentation
└── .gitignore           # Ignored files
```

---

## Deployment
This project is configured for seamless deployment on Vercel.
Every push to the main branch triggers an automatic deployment.

## Private editor setup
The private editor now uses Supabase Auth instead of a local access key, so it works on any device.
1. Create a Supabase Auth user for yourself.
2. Insert that user's `auth.users.id` into `public.portfolio_admins` with `is_active = true`.
3. Keep `REACT_APP_SUPABASE_URL`, `REACT_APP_SUPABASE_ANON_KEY`, and `REACT_APP_SUPABASE_TABLE` configured in the frontend.
4. Sign in through the site's private login form with the same Supabase account on every machine.
5. If you change `.env.local`, restart `npm start`; if the site is deployed on Vercel, set the same env vars in Vercel Project Settings and redeploy.

---

## Contributing
Contributions are welcome. Please fork the repository and submit a pull request with improvements or bug fixes.

---

## License
MIT License

Copyright (c) 2026 HeyDunaX

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
