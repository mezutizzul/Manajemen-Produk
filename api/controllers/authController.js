const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

// REGISTER USER
exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword
      }
    });

    res.status(201).json({ message: 'User berhasil terdaftar', user });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({
      message: 'Gagal register',
      error: err.message || String(err)
    });
  }
};

// LOGIN USER
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Mencari user...");
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      console.log("User tidak ditemukan.");
      return res.status(400).json({ message: "Email tidak ditemukan" });
    }

    console.log("User ditemukan:", user.email);
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("Password salah.");
      return res.status(400).json({ message: "Password salah" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    console.log("Login berhasil. Token dikirim.");
    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      message: "Gagal login",
      error: err.message || String(err)
    });
  }
};
