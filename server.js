const cors = require('cors');
app.use(cors());
app.use(express.json());

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Database file path
const dbPath = path.join(__dirname, 'database.json');

// Initialize database if it doesn't exist
const initializeDatabase = () => {
  if (!fs.existsSync(dbPath)) {
    const defaultData = {
      users: {
        '123456789': {
          locations: [
            { city: 'New York', country: 'USA', latitude: 40.7128, longitude: -74.0060, timestamp: '2024-03-01 14:30' },
            { city: 'Los Angeles', country: 'USA', latitude: 34.0522, longitude: -118.2437, timestamp: '2024-02-28 09:15' }
          ],
          devices: [
            { deviceName: 'iPhone 14 Pro', osType: 'iOS', osVersion: '17.2', imei: '358240051111110', lastActive: '2024-03-01 14:30' },
            { deviceName: 'Samsung Galaxy S23', osType: 'Android', osVersion: '13.0', imei: '358240051111111', lastActive: '2024-02-28 09:15' }
          ]
        },
        '987654321': {
          locations: [
            { city: 'London', country: 'UK', latitude: 51.5074, longitude: -0.1278, timestamp: '2024-03-01 18:00' }
          ],
          devices: [
            { deviceName: 'iPhone 15', osType: 'iOS', osVersion: '17.3', imei: '358240051111112', lastActive: '2024-03-01 18:00' }
          ]
        }
      },
      adminPassword: 'admin123'
    };
    fs.writeFileSync(dbPath, JSON.stringify(defaultData, null, 2));
  }
};

// Load database
const loadDatabase = () => {
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
};

// Save database
const saveDatabase = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// Initialize on startup
initializeDatabase();

// API: Search for user data
app.post('/api/search', (req, res) => {
  const { facebookId } = req.body;

  if (!facebookId || facebookId.trim() === '') {
    return res.status(400).json({ error: 'Facebook ID is required' });
  }

  const db = loadDatabase();
  const userData = db.users[facebookId];

  if (userData) {
    return res.json({
      success: true,
      facebookId: facebookId,
      data: userData
    });
  }

  // Return empty result if ID not found
  return res.json({
    success: true,
    facebookId: facebookId,
    data: {
      locations: [],
      devices: []
    },
    message: 'No data found for this ID'
  });
});

// API: Add/Update user data
app.post('/api/admin/update-user', (req, res) => {
  const { password, facebookId, locations, devices } = req.body;
  const db = loadDatabase();

  if (password !== db.adminPassword) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  if (!facebookId || !locations || !devices) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  db.users[facebookId] = {
    locations: locations,
    devices: devices
  };

  saveDatabase(db);
  res.json({ success: true, message: `User ${facebookId} updated` });
});

// API: Delete user data
app.post('/api/admin/delete-user', (req, res) => {
  const { password, facebookId } = req.body;
  const db = loadDatabase();

  if (password !== db.adminPassword) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  if (!facebookId) {
    return res.status(400).json({ error: 'Facebook ID is required' });
  }

  delete db.users[facebookId];
  saveDatabase(db);
  res.json({ success: true, message: `User ${facebookId} deleted` });
});

// API: Get all users (requires password)
app.post('/api/admin/get-all-users', (req, res) => {
  const { password } = req.body;
  const db = loadDatabase();

  if (password !== db.adminPassword) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  const userIds = Object.keys(db.users);
  res.json({ success: true, users: userIds });
});

// API: Get specific user data (requires password)
app.post('/api/admin/get-user', (req, res) => {
  const { password, facebookId } = req.body;
  const db = loadDatabase();

  if (password !== db.adminPassword) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  if (!facebookId) {
    return res.status(400).json({ error: 'Facebook ID is required' });
  }

  const userData = db.users[facebookId];
  if (!userData) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({ success: true, facebookId: facebookId, data: userData });
});

// API: Change admin password
app.post('/api/admin/change-password', (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const db = loadDatabase();

  if (currentPassword !== db.adminPassword) {
    return res.status(401).json({ error: 'Current password is incorrect' });
  }

  if (!newPassword || newPassword.trim() === '') {
    return res.status(400).json({ error: 'New password cannot be empty' });
  }

  db.adminPassword = newPassword;
  saveDatabase(db);
  res.json({ success: true, message: 'Password changed successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n╔════════════════════════════════════════╗`);
  console.log(`║  User Data Tracker - Backend Server    ║`);
  console.log(`╠════════════════════════════════════════╣`);
  console.log(`║  Server running on:                    ║`);
  console.log(`║  http://localhost:${PORT}                       ║`);
  console.log(`║                                        ║`);
  console.log(`║  Admin Panel: http://localhost:${PORT}/admin.html ║`);
  console.log(`║  App: http://localhost:${PORT}                   ║`);
  console.log(`╚════════════════════════════════════════╝\n`);
  console.log('Default credentials:');
  console.log('  Admin Password: admin123');
  console.log('  Sample IDs: 123456789, 987654321\n');
});
