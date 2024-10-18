import Trycatch from "../middlewares/trycatch.js";
import { Course } from "../models/course.js";
import { Lecture } from "../models/lecture.js";
import { User } from "../models/user.js";
import { rm } from "fs";
import { instance } from "../index.js";
import * as crypto from "crypto";
import { Order } from "../models/orders.js";

export const getAllCourses = Trycatch(async (req, res) => {
  const courses = await Course.find();
  res.json({
    courses,
  });
});

export const getSingleCourse = Trycatch(async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.json({
    course,
  });
});

export const fetchLectures = Trycatch(async (req, res) => {
  const reversedLectures = await Lecture.find({ course: req.params.id }).exec(); // Resolves the query
  const lectures = reversedLectures.reverse(); // Reverse the array

  const user = await User.findById(req.user._id);

  if (user.role === "admin" || user.role === "instructor") {
    return res.json({ lectures });
  }
  if (!user.subscription.includes(req.params.id)) {
    return res.json({
      message: "you are not subscribed to this course",
    });
  }
  res.json({ lectures });
});

export const fetchLecture = Trycatch(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);
  const user = await User.findById(req.user._id);

  if (user.role === "admin" || user.role === "instructor") {
    return res.json({ lecture });
  }
  if (!user.subscription.includes(req.params.id)) {
    return res.json({
      message: "you are not subscribed to this course",
    });
  }
  res.json({ lecture });
});

export const getMycourses = Trycatch(async (req, res) => {
  const courses = await Course.find({ _id: req.user.subscription });

  res.json(courses);
});

export const checkout = Trycatch(async (req, res) => {
  const user = await User.findById(req.user._id);

  const course = await Course.findById(req.params.id);
  if (user.subscription.includes(course._id)) {
    return res.status(400).json({
      message: "you are already subscribed for this course",
    });
  }
  const options = {
    amount: Number(course.price * 100),
    currency: "INR",
  };

  const order = await instance.orders.create(options);
  res.status(201).json({ order, course });
});

export const paymentVerification = Trycatch(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;
  if (isAuthentic) {
    await Order.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    const user = await User.findById(req.user._id);
    const course = await Course.findById(req.params.id);
    user.subscription.push(course._id);
    await user.save();

    res.status(200).json({
      message: "Course purchased successfully",
    });
  } else {
    res.status(400).json({
      message: "Payment failed",
    });
  }
});

export const addItemToCart = Trycatch(async (req, res) => {
  const { count } = req.body;
  const courseId = req.params.id;

  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({
      message: "Course not found.",
    });
  }
  let cartItem = await Cart.findOne({
    user: req.user._id,
    cart_item: courseID,
  });

  if (cartItem) {
    cartItem.count += count;
    cartItem.totalPrice = cartItem.count * cartItem.price;
    await cartItem.save();
    return res.status(200).json({
      message: "Cart item updated successfully.",
      cartItem,
    });
  } else {
    cartItem = new Cart({
      user: req.user_id,
      cart_item: courseID,
      count,
      price: course.price,
    });
    await cartItem.save();
    return res.status(201).json({
      message: "Item added to cart successfully.",
      cartItem,
    });
  }
});
export const deleteItemFromCart = Trycatch(async (req, res) => {
  const courseID = req.params.id;

  const cartItem = await Cart.findOne({
    user: req.user._id,
    cart_item: courseID,
  });

  if (!cartItem) {
    return res.status(404).json({
      message: "Cart item not found.",
    });
  }

  await cartItem.remove();

  return res.status(200).json({
    message: "Item removed from cart successfully.",
  });
});

export const getCartItems = Trycatch(async (req, res) => {
  const cartItems = await Cart.find({ user: req.user._id }).populate(
    "cart_item",
  );

  if (!cartItems || cartItems.length === 0) {
    return res.status(404).json({
      message: "Your cart is empty. Please add items to your cart.",
    });
  }
  return res.status(200).json({
    message: "Cart items fetched successfully.",
    cartItems,
  });
});
export const checkoutWithCartItems = Trycatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  const cartItems = await Cart.find({ user: req.user._id }).populate(
    "cart_item",
  );
  if (cartItems.length === 0) {
    return res.status(400).json({
      message:
        "Your cart is empty. Please add items to the cart before proceeding.",
    });
  }
  let totalPrice = 0;
  for (let cartItem of cartItems) {
    const course = cartItem.cart_item;

    if (user.subscription.includes(course._id)) {
      return res.status(400).json({
        message: `You are already subscribed to the course: ${course.title}`,
      });
    }

    totalPrice += course.price * cartItem.count;
  }
  const options = {
    amount: totalPrice * 100, // Amount in paise (Razorpay expects this)
    currency: "INR",
    receipt: `order_rcptid_${Math.random()}`, // Optional receipt ID
  };
  const order = await instance.orders.create(options);
  res.status(201).json({
    message: "Checkout successful. Proceed to payment.",
    order,
    cartItems,
  });
});

export const paymentVerificationForCart = Trycatch(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;


  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {

    await Order.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    const user = await User.findById(req.user._id);
    const cartItems = await Cart.find({ user: req.user._id }).populate("cart_item");

    for (let cartItem of cartItems) {
      const course = cartItem.cart_item;
      user.subscription.push(course._id);
    }

    await user.save();


    await Cart.deleteMany({ user: req.user._id });

    res.status(200).json({
      message: "Courses purchased successfully.",
    });
  } else {
    res.status(400).json({
      message: "Payment verification failed. Please try again.",
    });
  }
});

