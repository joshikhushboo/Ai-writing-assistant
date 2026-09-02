# ✨ AI Writing Assistant

An AI-powered writing assistant that helps users improve their writing through **spelling correction, grammar correction, and intelligent sentence rephrasing** with multiple writing styles.

## 🚀 Live Demo

**Frontend:** https://ai-writing-assistant-hazel-six.vercel.app/

**Backend:** https://ai-writing-assistant-ivde.onrender.com/

## ✨ Features

* 📝 AI-powered text editor
* ✅ Spelling correction
* ✍️ Grammar correction
* 🔄 Sentence rephrasing
* 🎨 Multiple rephrasing styles:

  * Professional
  * Friendly
  * Casual
  * Creative
* 💡 Generates multiple rephrased suggestions
* ✔️ Accept suggestions and save them to the corrected sentences section
* 🔐 Authentication with Privy
* 📱 Responsive UI
* ⚡ React + Vite frontend
* 🚀 Deployed on Vercel and Render

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Icons
* Privy Authentication

### Backend

* Node.js
* Express.js
* Axios
* Google Gemini API

### Deployment

* Vercel — Frontend
* Render — Backend

## 📂 Project Structure

```text
Ai-writing-assistant/
│
├── client/
│   └── vite_project/
│       ├── src/
│       ├── public/
│       ├── package.json
│       └── vite.config.js
│
├── server/
│   ├── routes/
│   ├── app.js
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

## ⚙️ Environment Variables

### Frontend

Create a `.env` file inside:

```text
client/vite_project/
```

```env
VITE_API_URL=http://localhost:8000
```

For production, the `VITE_API_URL` is configured through Vercel environment variables.

### Backend

Create a `.env` file inside:

```text
server/
```

```env
PORT=8000
GEMINI_API_KEY=your_gemini_api_key
PRIVY_APP_ID=your_privy_app_id
PRIVY_APP_SECRET=your_privy_app_secret
```

> Never commit `.env` files or API keys to GitHub.

## ▶️ Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/joshikhushboo/Ai-writing-assistant.git
cd Ai-writing-assistant
```

### 2. Start the backend

```bash
cd server
npm install
node app.js
```

Backend runs locally on:

```text
http://localhost:8000
```

### 3. Start the frontend

Open another terminal:

```bash
cd client/vite_project
npm install
npm run dev
```

Frontend runs locally on:

```text
http://localhost:5173
```

## 🔄 How It Works

1. User enters text into the editor.
2. User selects an AI writing operation.
3. The React frontend sends the request to the Express backend.
4. The backend processes the request using the Gemini API.
5. AI-generated corrections or rephrased suggestions are returned.
6. Users can review and accept the suggestions.
7. Accepted suggestions appear in the **Corrected Sentences** section.

## 🌐 Deployment

The application is deployed using:

* **Frontend:** Vercel
* **Backend:** Render

The frontend communicates with the deployed backend through the `VITE_API_URL` environment variable.

## 🔒 Security

* API keys are stored in environment variables.
* `.env` files are excluded from Git using `.gitignore`.
* Authentication is handled using Privy.
* Production API communication uses HTTPS.

## 📌 Future Improvements

* 📊 Writing quality score
* 📚 Vocabulary enhancement
* 🎯 Tone detection
* 📖 Text summarization
* 🌍 Multi-language support
* 💾 Save writing history
* 📈 Writing analytics

## 👩‍💻 Author

**Khushboo Joshi**

Full Stack Developer (MERN)

---

⭐ If you find this project useful, consider giving the repository a star!
