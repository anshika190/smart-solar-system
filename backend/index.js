require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const sensorRoutes = require('./routes/sensorRoutes');
const energyRoutes = require('./routes/energyRoutes');
const evRoutes = require('./routes/evRoutes');
const batteryRoutes = require('./routes/batteryRoutes');
const authRoutes = require('./routes/authRoutes');
const activityRoutes = require('./routes/activityRoutes');

const sensorService = require('./services/sensorservice');

const app = express();

app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smart-solar-system')
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

app.use('/api/sensor', sensorRoutes);
app.use('/api/energy', energyRoutes);
app.use('/api/ev', evRoutes);
app.use('/api/battery', batteryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/activity', activityRoutes);

// Start sensor simulation
sensorService.startSimulation();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('===================================');
    console.log(`✅ Backend server running`);
    console.log(`🌐 http://localhost:${PORT}`);
    console.log('===================================');
});
