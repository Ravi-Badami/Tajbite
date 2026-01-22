# Frontend-Backend Integration Guide

## ✅ What Was Done

Your frontend is now connected to your backend API with smart fallbacks!

### Files Modified:
1. **`src/config/api.js`** (NEW) - API configuration
2. **`src/utils/useRestaurantMenu.js`** - Restaurant menu API call
3. **`src/components/Body.jsx`** - Restaurant list API call
4. **`src/utils/useSearchApi.js`** - Search autocomplete API call

---

## 🔧 How It Works

### Development Mode (Local):
- Backend: `http://localhost:5000`
- Frontend uses your local backend
- Falls back to mock data if backend is down

### Production Mode:
- Backend: `https://tajbite-api.onrender.com` (deploy first!)
- Frontend uses deployed backend
- Falls back to mock data if API fails

---

## 🚀 Testing

### 1. Start Backend:
```bash
cd backend
npm run dev
```
Backend runs on: `http://localhost:5000`

### 2. Start Frontend:
```bash
npm run dev
```
Frontend runs on: `http://localhost:5173`

### 3. Test Features:
- ✅ **Home Page** - Should show 11 restaurants from backend
- ✅ **Restaurant Menu** - Click any restaurant card
- ✅ **Search** - Type in search box, see autocomplete from backend

---

## 🎛️ Toggle Backend/Mock Data

Edit `src/config/api.js`:

```javascript
development: {
  BASE_URL: 'http://localhost:5000',
  USE_BACKEND: true  // ← Change to false to use mock data
}
```

---

## 📊 API Endpoints Being Used:

| Frontend Feature | Backend Endpoint | Description |
|------------------|------------------|-------------|
| Home Page | `GET /api/restaurants` | Get all restaurants |
| Restaurant Menu | `GET /api/restaurants/:id` | Get restaurant + menu |
| Search Autocomplete | `GET /api/dishes/autocomplete?q=query` | Get search suggestions |

---

## ⚠️ Important Notes

1. **Backend must be running** on port 5000 for development
2. **CORS is configured** - frontend can access `localhost:5173`
3. **Automatic fallback** - If backend fails, uses mock data
4. **Safe for production** - Won't break if API is down

---

## 🐛 Troubleshooting

### "No restaurants showing"
- Check backend is running: `http://localhost:5000/api/restaurants`
- Check browser console for errors
- Verify CORS settings in `backend/server.js`

### "Search not working"
- Check: `http://localhost:5000/api/dishes/autocomplete?q=bir`
- Verify autocomplete endpoint returns correct format

### "Restaurant menu empty"
- Seed data issue - only 4 dishes linked
- Run: `node backend/seed.js` then `node backend/seedRestaurants.js`

---

## 🎯 Next Steps

1. **Test everything** - Browse app, search, click restaurants
2. **Fix seed data** - Ensure all 14 dishes are linked to restaurants
3. **Deploy backend** - Use Render.com (free tier)
4. **Update production URL** - Change in `src/config/api.js`

---

## 🔐 For Production Deployment

1. Deploy backend to Render/Railway/Fly.io
2. Get your production URL (e.g., `https://tajbite-api.onrender.com`)
3. Update `src/config/api.js`:
   ```javascript
   production: {
     BASE_URL: 'https://your-api-url.com',
     USE_BACKEND: true
   }
   ```
4. Build frontend: `npm run build`
5. Deploy to Vercel/Netlify

Your app will automatically use the right backend based on environment!
