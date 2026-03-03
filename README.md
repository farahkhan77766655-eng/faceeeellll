# 📱 User Data Tracker - Complete System

A complete backend system with admin panel to manage and display user location and device data with IMEI numbers. Works on Android with Termux, online servers, or your computer.

**Languages:** Node.js, Express, JavaScript, HTML, CSS

---

## 🎯 Features

✅ Search Facebook IDs for user information  
✅ View locations with GPS coordinates  
✅ View devices with IMEI numbers  
✅ Manage all data via admin panel  
✅ Add/Edit/Delete users  
✅ Change admin password  
✅ Works on Android (Termux)  
✅ Works on PC/Mac/Linux  
✅ Deployable online  

---

## 🚀 Quick Start - 3 Options

### Option 1: Android Phone (Termux) ⭐ Easiest
**No PC needed - run everything on your phone!**

1. Download **Termux** from Google Play Store
2. Install Node.js:
```bash
pkg install nodejs
```

3. Clone this repo or download files:
```bash
git clone https://github.com/YOUR_USERNAME/user-tracker.git
cd user-tracker/backend
```

4. Install & run:
```bash
npm install
npm start
```

5. Open browser and go to:
- **Admin Panel:** `http://localhost:3000/admin.html`
- **Search App:** `http://localhost:3000`

**Default Password:** `admin123`

---

### Option 2: Your Computer (Windows/Mac/Linux)

1. Make sure you have Node.js installed (https://nodejs.org)

2. Clone this repo:
```bash
git clone https://github.com/YOUR_USERNAME/user-tracker.git
cd user-tracker/backend
```

3. Install dependencies:
```bash
npm install
```

4. Start server:
```bash
npm start
```

5. Open browser:
- **Admin Panel:** `http://localhost:3000/admin.html`
- **Search App:** `http://localhost:3000`

---

### Option 3: Deploy Online (Free)

See **"Deploy Online"** section below for easy options.

---

## 📁 Project Structure

```
user-tracker/
├── backend/
│   ├── server.js              # Main backend server
│   ├── package.json           # Dependencies
│   ├── database.json          # User data (auto-created)
│   └── public/
│       ├── index.html         # Search app
│       └── admin.html         # Admin panel
└── README.md                  # This file
```

---

## 🔑 Default Credentials

- **Admin Password:** `admin123` (⚠️ Change this!)
- **Server Port:** `3000`
- **Admin Panel URL:** `/admin.html`
- **App URL:** `/`

---

## 📊 How to Use

### Add Users (Admin Panel)

1. Go to: `http://localhost:3000/admin.html`
2. Login with: `admin123`
3. Enter Facebook ID (e.g., `123456789`)
4. Click **+ Add Location**:
   - City: `New York`
   - Country: `USA`
   - Latitude: `40.7128`
   - Longitude: `-74.0060`
   - Timestamp: `2024-03-01 14:30`

5. Click **+ Add Device**:
   - Device Name: `iPhone 14 Pro`
   - OS Type: `iOS`
   - OS Version: `17.2`
   - IMEI: `358240051111110`
   - Last Active: `2024-03-01 14:30`

6. Click **Save User**

### Search Users (Search App)

1. Go to: `http://localhost:3000`
2. Enter Facebook ID
3. Click **Search**
4. View all locations and devices with IMEI numbers

---

## 🌐 Deploy Online (Recommended Platforms)

### 1. **Render.com** (Easiest - Free Tier) ⭐

**Step 1: Push to GitHub**
- Create GitHub account
- Create repository
- Push this code

**Step 2: Deploy on Render**
1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect GitHub repo
4. Set:
   - Runtime: Node
   - Build command: `npm install`
   - Start command: `npm start`
   - Environment: Production
5. Click "Create Web Service"

**Step 3: Get Live URL**
- Your app will be live at: `https://your-app-name.onrender.com`
- Admin: `https://your-app-name.onrender.com/admin.html`

**Cost:** Free (but sleeps after 15 min inactivity)

---

### 2. **Heroku** (Popular)

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create my-app-name`
4. Deploy: `git push heroku main`
5. Open: `heroku open`

---

### 3. **Railway.app** (Simple)

1. Go to https://railway.app
2. Connect GitHub
3. Select repo
4. Click "Deploy"
5. Get live URL automatically

---

### 4. **Glitch.com** (Beginner Friendly)

1. Go to https://glitch.com
2. Click "New Project" → "Import from GitHub"
3. Paste: `https://github.com/YOUR_USERNAME/user-tracker`
4. Done! Your app is live

---

### 5. **Vercel** (Fast)

1. Go to https://vercel.com
2. Connect GitHub
3. Import project
4. Deploy
5. Get live URL

---

## 🔗 API Endpoints

### Search User
**POST** `/api/search`
```json
{
  "facebookId": "123456789"
}
```

### Add/Update User
**POST** `/api/admin/update-user`
```json
{
  "password": "admin123",
  "facebookId": "123456789",
  "locations": [...],
  "devices": [...]
}
```

### Delete User
**POST** `/api/admin/delete-user`
```json
{
  "password": "admin123",
  "facebookId": "123456789"
}
```

### Get All Users
**POST** `/api/admin/get-all-users`
```json
{
  "password": "admin123"
}
```

---

## 🐛 Troubleshooting

### "npm: command not found"
- Install Node.js from https://nodejs.org

### "Port 3000 already in use"
- Kill process or use different port: `PORT=3001 npm start`

### "Cannot connect to localhost"
- Make sure server is running (`npm start`)
- Try: `http://127.0.0.1:3000` instead

### "Admin login fails"
- Password is: `admin123`
- Check caps lock
- Database might be corrupted - delete `database.json` and restart

### On Android (Termux)
- Keep Termux open while using app
- If "command not found", install: `pkg install nodejs`
- Restart Termux if server crashes

---

## 📱 Android + Termux Setup

**Complete Guide:**
```bash
# 1. Download & open Termux from Play Store

# 2. Install Node.js (one time only)
pkg install nodejs

# 3. Clone this repo
git clone https://github.com/YOUR_USERNAME/user-tracker.git

# 4. Go to backend
cd user-tracker/backend

# 5. Install dependencies
npm install

# 6. Run server
npm start

# 7. Open browser on phone
# Admin: http://localhost:3000/admin.html
# App: http://localhost:3000
```

**Keep Termux running while using the app!**

---

## 🔒 Security Notes

⚠️ **Important:**
- Change `admin123` password in production
- Don't expose to internet without HTTPS
- Use environment variables for sensitive data
- Database file contains all data and passwords

---

## 🚀 Production Deployment

For real-world use:

1. **Change admin password** immediately
2. **Use HTTPS/SSL** certificate
3. **Add authentication** for users
4. **Use proper database** (MongoDB, PostgreSQL)
5. **Add rate limiting** to API
6. **Use environment variables** for config

---

## 📦 Installation Summary

```bash
# Clone repo
git clone https://github.com/YOUR_USERNAME/user-tracker.git
cd user-tracker/backend

# Install
npm install

# Run
npm start

# Access
http://localhost:3000
http://localhost:3000/admin.html
```

---

## 🌟 Features Explained

### Admin Panel
- Add unlimited users
- Add unlimited locations per user
- Add unlimited devices per user
- Add IMEI numbers to devices
- Edit any data
- Delete users
- Change admin password
- View all users in database

### Search App
- Search by Facebook ID
- View all locations with coordinates
- View all devices with IMEI
- See last active times
- Clean mobile-friendly interface

### Database
- JSON file storage
- Auto-created on first run
- Persistent data
- Easy backup

---

## 💡 Example Data

```json
{
  "users": {
    "123456789": {
      "locations": [
        {
          "city": "New York",
          "country": "USA",
          "latitude": 40.7128,
          "longitude": -74.0060,
          "timestamp": "2024-03-01 14:30"
        }
      ],
      "devices": [
        {
          "deviceName": "iPhone 14 Pro",
          "osType": "iOS",
          "osVersion": "17.2",
          "imei": "358240051111110",
          "lastActive": "2024-03-01 14:30"
        }
      ]
    }
  }
}
```

---

## 📞 Support

- Check server console for errors
- Verify database.json exists
- Ensure port 3000 is available
- Check browser console (F12) for client errors
- Restart server if issues persist

---

## 📄 License

MIT License - Free to use and modify

---

## 🎉 Ready to Go!

Choose your preferred setup:
- ✅ Android (Termux) - No PC needed
- ✅ Windows/Mac/Linux - On your computer
- ✅ Online (Render/Heroku/Railway) - Live on internet

**Start now and enjoy!** 🚀
