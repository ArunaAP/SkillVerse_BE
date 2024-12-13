import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  let token;

  // Extract the Authorization header
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied!" });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach the decoded user payload to the request object
      console.log("The decoded user:", req.user);
      next(); // Proceed to the next middleware or route handler
    } catch (err) {
      return res.status(400).json({ message: "Token is not valid" });
    }
  } else {
    return res.status(401).json({ message: "Authorization header is missing or malformed" });
  }
};

export { verifyToken };
