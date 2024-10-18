import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cart_item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  count: {
    type: Number,
    default: 1,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    default: function () {
      return this.count * this.price;
    },
  },
  addedDate: {
    type: Date,
    default: Date.now,
  },
  modifiedDate: {
    type: Date,
    default: Date.now,
  },
});
Schema.pre("save", function (next) {
  this.totalPrice = this.count * this.price;
  this.modifiedDate = Date.now();
  next();
});
const Cart = mongoose.model("Cart", Schema);
export default Cart;
