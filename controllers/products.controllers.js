const { response, request } = require('express');
const { Product } = require('../models');

const getProduct = async (req = request, res = response) => {
  const product = await Product.findById(req.params.id).populate(
    'user',
    'name'
  );

  res.json(product);
};

const getProducts = async (req = request, res = response) => {
  const { placeholder, limit } = req.query;
  const query = { state: true };

  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .skip(Number(placeholder))
      .limit(Number(limit))
      .populate('user', 'name'),
  ]);

  res.json({ total, products });
};

const createProduct = async (req, res = response) => {
  const name = req.body.name.toUpperCase();
  const user = req.user._id;

  const product = new Product({
    name,
    user,
  });

  await product.save();

  res.json({
    product,
  });
};

const updateProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const { state, user, ...data } = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.user._id;

  const product = await Product.findByIdAndUpdate(id, data, { new: true });

  res.json(product);
};

const deleteProduct = async (req, res = response) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, { state: false });

  res.json(product);
};

module.exports = {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
