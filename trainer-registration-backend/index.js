const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const app = express();
const fs = require('fs');
const { exec } = require('child_process');
// Middleware
app.use(cors({
  origin: 'https://better-hotel-service.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Multer setup for file uploads


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = Date.now() + ext;
    cb(null, name);
  },
});
const upload = multer({ storage });
const upload = multer({ storage });
app.use('/uploads', (req, res, next) => {
  const fileExt = path.extname(req.path).toLowerCase();
  const videoTypes = ['.mp4', '.mov', '.webm', '.ogg'];

  if (videoTypes.includes(fileExt)) {
    res.setHeader('Content-Type', `video/${fileExt.replace('.', '')}`);
  }
  next();
}, express.static('uploads'));

// Connect to MongoDB
mongoose.connect('mongodb+srv://desalegnsefiw2:kXuopHwMq4ZVgnei@cluster0.xauvfp5.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Registration Schema
const RegistrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  services: [{ type: String }],
  type: {
  type: String,
  enum: ['Individual', 'Organization'],
  required: function () {
    return this.services && this.services.includes('Take Training');
  },
}

  });
const Registration = mongoose.model('Registration', RegistrationSchema, 'registrations');

// JWT Middleware
const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(403);
  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// CEO Login (Hardcoded)
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const ceoEmail = 'ceo@betterhotel.com';
  const ceoPassword = 'ceopassword123';

  if (email === ceoEmail && password === ceoPassword) {
    const token = jwt.sign({ email, isCEO: true }, 'your_jwt_secret', { expiresIn: '1h' });
    return res.json({ token, isCEO: true });
  }

  return res.status(403).json({ message: 'Access denied. CEO only.' });
});

// Trainer Registration
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, phone, services, type } = req.body;
    const existingUser = await Registration.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const newRegistration = new Registration({ name, email, phone, services, type });
    await newRegistration.save();
    res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Trainer Management Endpoints
app.get('/api/trainers', authenticateJWT, async (req, res) => {
  try {
    const trainers = await Registration.find();
    res.status(200).json(trainers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching trainers' });
  }
});

app.post('/api/trainers', authenticateJWT, async (req, res) => {
  try {
    const { name, email, phone, services, type } = req.body;
    const existingUser = await Registration.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const newTrainer = new Registration({ name, email, phone, services, type });
    await newTrainer.save(); // ❗ Error likely thrown here if `type` is invalid or missing
    res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
  console.error('Error Adding Trainer:', err); // <== Add this
  res.status(500).json({ message: 'Error Adding Trainer', error: err.message });
}

});


app.put('/api/trainers/:id', authenticateJWT, async (req, res) => {
  try {
    const updatedTrainer = await Registration.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTrainer) return res.status(404).json({ message: 'Trainer not found' });
    res.status(200).json(updatedTrainer);
  } catch (err) {
    res.status(500).json({ message: 'Error updating trainer' });
  }
});

app.delete('/api/trainers/:id', authenticateJWT, async (req, res) => {
  try {
    const trainer = await Registration.findByIdAndDelete(req.params.id);
    if (!trainer) return res.status(404).json({ message: 'Trainer not found' });
    res.status(200).json({ message: 'Trainer deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting trainer' });
  }
});

// Stats Endpoint
app.get('/api/stats', async (req, res) => {
  try {
    const count = await Registration.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching stats' });
  }
});

// Post Schema & Model
const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  filePath: String,
  createdAt: { type: Date, default: Date.now },
});
const Post = mongoose.model('Post', PostSchema, 'posts');

// Create Post
app.post('/api/posts', upload.single('file'), async (req, res) => {
  const { title, content } = req.body;
  const filePath = req.file ? `/uploads/${req.file.filename}` : '';

  const newPost = new Post({ title, content, filePath });
  await newPost.save();
  res.status(201).json(newPost);
});


// Update Post
app.put('/api/posts/:id', authenticateJWT, upload.single('file'), async (req, res) => {
  try {
    const { title, content } = req.body;
    const filePath = req.file ? `/uploads/${req.file.filename}` : '';

    const updateData = { title, content };
    if (filePath) updateData.filePath = filePath;

    const post = await Post.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!post) return res.status(404).send('Post not found');

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Delete Post
app.delete('/api/posts/:id', authenticateJWT, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).send('Post not found');
    res.status(200).send('Post deleted');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get Posts From Last 8 Days Only
app.get('/api/posts', async (req, res) => {
  try {
    const eightDaysAgo = new Date();
    eightDaysAgo.setDate(eightDaysAgo.getDate() - 8);

    const posts = await Post.find({ createdAt: { $gte: eightDaysAgo } }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
