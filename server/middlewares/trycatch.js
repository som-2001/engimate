const Trycatch = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      console.error("Error caught in TryCatch middleware:", error);
      const statusCode = error.status || 500;
      res.status(statusCode).json({
        message: error.message || "Internal Server Error",
      });
    }
  };
};

export default Trycatch;
