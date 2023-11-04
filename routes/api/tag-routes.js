const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// get all tags
router.get('/', (req, res) => {
  // find all tags and include associated Product data
  Tag.findAll({
    include: {
      model: Product,
      through: ProductTag,
    },
  })
    .then((tags) => {
      res.json(tags);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


// get a single tag by ID
router.get('/:id', (req, res) => {
  // find a tag by its ID and include associated Product data
  Tag.findByPk(req.params.id, {
    include: {
      model: Product,
      through: ProductTag,
    },
  })
    .then((tag) => {
      if (!tag) {
        res.status(404).json({ message: 'Tag not found' });
        return;
      }
      res.json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});



  // create a new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((tag) => {
      res.status(201).json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});



// update a tag's name by ID
router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((result) => {
      if (result[0] === 0) {
        res.status(404).json({ message: 'Tag not found' });
        return;
      }
      res.status(200).json({ message: 'Tag updated successfully' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete a tag by ID
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    }
  })
    .then((result) => {
      if (result === 0) {
        res.status(404).json({ message: 'Tag not found' });
        return;
      }
      res.status(200).json({ message: 'Tag deleted successfully' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;
