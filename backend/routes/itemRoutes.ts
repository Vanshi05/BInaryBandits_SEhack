import express from 'express';
import multer from 'multer';
import Item from '../models/Item';

const router = express.Router();

// Set up multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// POST item with photo
router.post('/upload', upload.single('image'), async (req, res) => {
  const { title, description, category, price, location, userId } = req.body;
  const imageUrl = req.file?.path;

  try {
    const newItem = await Item.create({
      title, description, category, price, location, imageUrl, user: userId
    });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: 'Item upload failed' });
  }
});

// GET items with search
router.get('/search', async (req, res) => {
  const { category, location } = req.query;

  try {
    const items = await Item.find({
      ...(category && { category }),
      ...(location && { location }),
    }).populate('user');
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
});

export default router;
