const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '')));

// --- API Routes ---
// This is a simple status endpoint to verify the API is working
app.get('/api/status', (req, res) => {
  res.json({
    status: 'success',
    message: 'API is running successfully!',
    timestamp: new Date().toISOString()
  });
});

// POST endpoint for user login validation
app.post('/api/login', (req, res) => {
  const { email } = req.body;
  // Always return success to allow direct login
  return res.json({
    status: 'success',
    token: 'mock-jwt-token-always-success',
    user: {
      name: 'Birendra',
      email: email || 'birendra@email.com'
    }
  });
});

// POST endpoint for mentor registration application
app.post('/api/mentors/apply', (req, res) => {
  const { name, email, expertise, experience } = req.body;
  console.log(`[REST API] Pendaftaran Mentor Baru:`);
  console.log(`- Nama: ${name}`);
  console.log(`- Email: ${email}`);
  console.log(`- Keahlian: ${expertise}`);
  console.log(`- Pengalaman: ${experience}`);
  
  return res.json({
    status: 'success',
    message: `Pendaftaran berhasil dikirim! Terima kasih ${name}, kami akan segera menghubungi Anda.`
  });
});

// Serve index.html as the default page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(`API is available at http://localhost:${PORT}/api/status`);
});
