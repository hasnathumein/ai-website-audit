# 🧠 AI Website Audit Tool

An AI-assisted smart website audit tool built with **Next.js**, **Flask**, and **Google PageSpeed Insights API**. Easily analyze any website’s performance, SEO, accessibility, and best practices with real-time scoring and a slick UI.

---

## 🔍 Features

- ✅ One-click website audits
- 🎯 Strategy toggle: Mobile or Desktop
- 📊 Live score visualization (Performance, SEO, Accessibility, Best Practices)
- ⚡ Fast and responsive UI with TailwindCSS
- 🔐 Environment-based config using .env
- 🧠 Future-ready for AI recommendations

---

## 🛠️ Tech Stack

| Frontend             | Backend               | Integration            |
|----------------------|------------------------|--------------------------|
| Next.js 14           | Python + Flask         | Google PageSpeed API     |
| React + TailwindCSS  | Flask-CORS             | Vercel / Render          |
| TypeScript           | dotenv                 | REST API + CORS setup    |

---

## 📦 Project Structure
ai-website-audit/
├── backend/
│ ├── app.py # Flask backend
│ └── .env # API Key config (not tracked)
│
├── frontend/
│ ├── app/ # Next.js App Directory (pages, components)
│ ├── public/ # Public assets (favicon, etc.)
│ └── ... # Config & styling files
│
├── .gitignore
└── README.md


---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/hasnathumein/ai-website-audit.git
cd ai-website-audit

🧩 Backend Setup
2. Configure Python Backend (Flask)

3. Add Your Google PSI API Key
Create a .env file inside /backend:

GOOGLE_PSI_API_KEY=your_api_key_here
python app.py

💻 Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm run dev
Frontend runs at: http://localhost:3000



