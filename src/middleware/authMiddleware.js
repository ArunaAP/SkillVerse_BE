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
      console.log("Decoded token:", decoded); // Debugging
      next(); // Proceed to the next middleware or route handler
    } catch (err) {
      console.error("Token verification failed:", err.message); // Debugging
      return res.status(400).json({ message: "Token is not valid" });
    }
  } else {
    return res.status(401).json({ message: "Authorization header is missing or malformed" });
  }
};


const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Access denied.' });
    next();
  });
};

const verifyDesigner = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role !== 'Designer') return res.status(403).json({ message: 'Access denied.' });
    next();
  });
};

const verifyClient = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role !== 'Client') return res.status(403).json({ message: 'Access denied.' });
    next();
  });
};

export { verifyToken, verifyAdmin ,verifyDesigner, verifyClient };
