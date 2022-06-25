const { response, request } = require('express');
const { Category } = require('../models');

const getCategory = async (req = request, res = response) => {
  const category = await Category.findById(req.params.id).populate(
    'user',
    'name'
  );

  res.json(category);
};

const getCategories = async (req = request, res = response) => {
  const { placeholder, limit } = req.query;
  const query = { state: true };

  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .skip(Number(placeholder))
      .limit(Number(limit))
      .populate('user', 'name'),
  ]);

  res.json({ total, categories });
};

const createCategory = async (req, res = response) => {
  const name = req.body.name.toUpperCase();
  const user = req.user._id;

  const category = new Category({
    name,
    user,
  });

  await category.save();

  res.json({
    category,
  });
};

const updateCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const { state, user, ...data } = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.user._id;

  const category = await Category.findByIdAndUpdate(id, data, { new: true });

  res.json(category);
};

const deleteCategory = async (req, res = response) => {
  const { id } = req.params;
  const category = await Category.findByIdAndUpdate(id, { state: false });

  res.json(category);
};

module.exports = {
  getCategory,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
