const mongoose = require("mongoose");
let Inventories = mongoose.model("inventories");


const getReviewById = (req, res) => {


  const inventoryId = req.params.inventoryId;
  const reviewId = req.params.reviewId;

  console.log(inventoryId)
  console.log(reviewId)

Inventories.where('reviews._id')

  Inventories.find({ "_id": inventoryId }, (error, data) => {

    if (error) return res.status(404).json(err)
    res.status(200).json(data)

  });

}

const getInventories = function (req, res) {

  Inventories.find().exec(function (err, data) {
    if (err) {
      res.status(404)
        .json(err)
      return;
    }
    res
      .status(200)
      .json(data)
  });
};

const createInventory = function (req, res) {

  Inventories.create({

    name: req.body.name,
    category: req.body.category,
    type: req.body.type,
    isAvailable: req.body.isAvailable,
    imageUrl: req.body.imageUrl,
    quantity: req.body.quantity,

    reviews: req.body.reviews

  }, (err, data) => {
    console.log("data : ", data);

    if (err) {

      res.status(400).json(err)
    } else {

      res.status(200).json(data)
    }
  })
};


const getSingleInventory = function (req, res) {
  if (!req.params.inventoryid) {
    res
      .status(404)
      .json({
        "message": "Not found, inventoryid is required"
      });
    return;
  }
  Inventories.findById(req.params.inventoryid)
    .exec((err, data) => {
      if (!data) {
        res
          .json(404)
          .status({
            "message": "Inventory data not found"
          });
      }
      else if (err) {
        res
          .status(400)
          .json(err);
        return;
      }
      else {
        res
          .status(200)
          .json(data)
      }
    });
};


const deleteInventory = function (req, res) {
  const inventoryid = req.params.inventoryid;

  if (inventoryid) {
    Inventories
      .findByIdAndRemove(inventoryid)
      .exec((err, data) => {
        if (err) {
          res
            .status(404)
            .json(err);
          return;
        }
        res
          .status(204)
          .json(null);
      });
  } else {
    res
      .status(404)
      .json({ "message": "No inventoryid" });

  }
};

module.exports = {
  getInventories,
  createInventory,
  getSingleInventory,
  deleteInventory,
  getReviewById
}
