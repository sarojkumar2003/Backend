const express = require('express');
const routes = express.Router();

const Menu = require('./../module/Menu');

// Get Method for Menu
routes.get('/', async (req, res) => {
  try {
    const MenuData = await Menu.find();
    console.log('Menu Find');
    res.status(200).json(MenuData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error!!' });
  }
})

// POST Mehod for Menu
routes.post('/', async (req, res) => {
  try {
    const data = req.body; // ✅ use different variable name
    const newMenu = new Menu(data); // ✅ keep model Menu
    const response = await newMenu.save(); // ✅ save to DB
    console.log('Menu Data Saved!!');
    res.status(201).json(response); // ✅ success code
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error!!' });
  }
});

routes.get('/:taste', async (req, res) => {
  try {
    const taste = req.params.taste.toLowerCase();

    if (['sweet', 'spicy', 'sour'].includes(taste)) {
      const response = await Menu.find({ taste: taste });  // ✅ fixed field
      console.log("Response Fetched!!");

      if (response.length === 0) {
        return res.status(404).json({ error: 'No items found for this taste' });
      }

      res.status(200).json(response);
    } else {
      res.status(400).json({ error: 'Invalid taste type' }); // ✅ better error
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error!!' });
  }
});




module.exports = routes;