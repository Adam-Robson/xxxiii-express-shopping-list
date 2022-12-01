const Item = require('../models/Item.js');

module.exports = async (req, res, next) => {
  try {
    const item = await Item.getById(req.params.id);
    if (item && (req.user.email === 'admin' ||
      item.user_id === req.user.id
    )) {
      next();
    } else {
      throw new Error('This page has not been found');
    }
  } catch (err) {
    err.status = 403;
    next(err);
  }
};
