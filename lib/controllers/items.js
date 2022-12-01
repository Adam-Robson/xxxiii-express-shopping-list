const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const Item = require('../models/Item');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try {
      const item = await Item.insert({
        description: req.body.description,
        qty: req.body.qty,
        user_id: req.user.id
      });
      res.json(item);
    } catch (err) {
      next(err);
    }
  })

  .get('/', authenticate, async (req, res, next) => {
    try {
      const items = await Item.getAll(req.user.id);
      res.json(items);
    } catch (err) {
      next(err);
    }
  })

  .put('/:id', [authenticate, authorize], async (req, res, next) => {
    try {
      const item = await Item.updateById(req.params.id, req.body);
      if (!item) next();
      res.json(item);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', [authenticate, authorize], async (req, res, next) => {
    try {
      const item = await Item.delete(req.params.id);
      res.json(item);
    } catch (err) {
      next(err);
    }
  });
