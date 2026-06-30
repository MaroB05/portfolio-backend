const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const pageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  cmd: { type: String, required: true },
  subtitle: { type: String, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Page = mongoose.model('Page', pageSchema);

router.get('/', async (req, res) => {
  try {
    const pages = await Page.find().sort({ createdAt: -1 });
    res.json(pages);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, cmd, subtitle } = req.body;
    if (!title || !cmd || !subtitle) {
      return res.status(400).json({ error: 'title, cmd and subtitle are required' });
    }
    const page = new Page({ title, cmd, subtitle });
    await page.save();
    res.status(201).json(page);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, cmd, subtitle } = req.body;
    if (!title || !cmd || !subtitle) {
      return res.status(400).json({ error: 'title, cmd and subtitle are required' });
    }
    const page = await Page.findByIdAndUpdate(id, { title, cmd, subtitle }, { new: true, runValidators: true });
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.json(page);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) return res.status(400).json({ error: 'Invalid id' });
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const page = await Page.findByIdAndDelete(id);
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.json({ success: true });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) return res.status(400).json({ error: 'Invalid id' });
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
