const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Ambil token dari header Authorization
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Token tidak ditemukan' });
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // simpan ke req.user untuk digunakan di controller
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token tidak valid' });
  }
};
