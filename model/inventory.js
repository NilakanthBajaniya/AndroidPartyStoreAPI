var mongoose = require("mongoose");


let reviewSchema = new mongoose.Schema({

    userId: { type: mongoose.mongo.ObjectId, required: true },
    description: { type: String, minlength: 1, required: true },
    image: { type: String, required: false }
});


var inventorySchema = new mongoose.Schema({

    name: { type: String, required: true, minlength: 2 },
    category: { type: String, required: true, minlength: 1 },
    imageUrl: { type: String, required: true, minlength: 4 },
    type: { type: String, required: true, minlength: 2 },
    isAvailable: { type: Boolean, required: true },
    quantity: { type: Number, required: true },

    reviews: [reviewSchema]

});
let invetoryModel = mongoose.model("inventories", inventorySchema);
module.exports = invetoryModel;