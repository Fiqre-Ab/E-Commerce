const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET Route for All Categories
router.get('/', (req, res) => {
  Category.findAll({
    include: Product, // Include associated Products
  })
    .then((categoriesData) => {
      res.status(200).json(categoriesData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// GET Route for a Specific Category by ID
router.get('/:id', (req, res) => {
  Category.findByPk(req.params.id, {
    include: Product, // Include associated Products
  })
    .then((categoryData) => {
      if (!categoryData) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }
      res.status(200).json(categoryData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// POST Route for Creating a New Category
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
    .then((newCategory) => {
      res.status(201).json(newCategory);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});



// PUT Route for Updating a Category by ID
router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCategory) => {
      if (updatedCategory[0] === 0) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }
      res.status(200).json({ message: 'Category updated successfully' });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// DELETE Route for Deleting a Category by ID
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCategory) => {
      if (!deletedCategory) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }
      res.status(200).json({ message: 'Category deleted successfully' });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
