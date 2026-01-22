# 🚀 Deployment Guide for Tajbite

Follow these steps to host your separate Frontend and Backend comfortably.

## 1. Preparation (GitHub)
1.  **Create a GitHub Repository** (e.g., `tajbite-app`).
2.  **Push your code** to GitHub:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/tajbite-app.git
    git push -u origin main
    ```

---

## 2. Deploy Backend (Render.com)
Render is great for Node.js backends.
1.  Go to [dashboard.render.com](https://dashboard.render.com) and sign up/login.
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub repo (`tajbite-app`).
4.  **Configuration:**
    *   **Name:** `tajbite-backend` (or similar)
    *   **Root Directory:** `backend` (⚠️ IMPORTANT)
    *   **Environment:** `Node`
    *   **Build Command:** `npm install`
    *   **Start Command:** `node server.js`
    *   **Instance Type:** Free
5.  **Environment Variables:**
    *   Click "Advanced" or "Environment" tab.
    *   Add key: `MONGO_URI`, value: (Your MongoDB Atlas connection string from your local .env)
    *   Add key: `PORT`, value: `5000` (Optional, Render handles port automatically usually)
6.  Click **Create Web Service**.
7.  **Wait for deployment.** Once live, copy the URL (e.g., `https://tajbite-backend.onrender.com`).

---

## 3. Update Frontend Config
1.  Back in your code (VS Code), open `src/config/api.js`.
2.  Update the `production` section with your **NEW Render URL**:
    ```javascript
    production: {
      BASE_URL: 'https://tajbite-backend.onrender.com', // <-- PASTE YOUR RENDER URL HERE
      USE_BACKEND: true
    }
    ```
3.  Commit and push this change to GitHub:
    ```bash
    git add .
    git commit -m "Update API URL"
    git push
    ```

---

## 4. Deploy Frontend (Vercel)
Vercel is optimized for React/Vite.
1.  Go to [vercel.com](https://vercel.com) and sign up/login.
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repo (`tajbite-app`).
4.  **Configuration:**
    *   **Framework Preset:** Vite (Should detect automatically)
    *   **Root Directory:** `./` (Default is fine)
    *   **Build Command:** `npm run build`
    *   **Output Directory:** `dist`
5.  Click **Deploy**.
6.  Vercel will build and give you a URL (e.g., `https://tajbite-app.vercel.app`).

---

## 🎉 Done!
*   **Frontend:** Hosted on Vercel.
*   **Backend:** Hosted on Render.
*   **Database:** MongoDB Atlas (Cloud).

### Troubleshooting
*   **CORS Error:** If frontend fails to fetch, go to your Backend code `server.js` and allow the Vercel domain in CORS settings:
    ```javascript
    const corsoptions = {
      origin: ['http://localhost:5173', 'https://tajbite-app.vercel.app'], // Add your Vercel URL
      credentials: true
    }
    ```
    Then push headers change to GitHub. Render will auto-redeploy.
