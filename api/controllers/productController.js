const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ✅ GET all products milik user
exports.getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { userId: req.user.userId },
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil produk', error: err.message });
  }
};

// ✅ CREATE product
exports.createProduct = async (req, res) => {
  const { name, price } = req.body;
  const userId = req.user.userId;

  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        userId,
      },
    });

    res.status(201).json(newProduct); // ⬅️ pastikan ini
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menambahkan produk" });
  }
};

// ✅ UPDATE product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  try {
    const updated = await prisma.product.updateMany({
      where: { id: parseInt(id), userId: req.user.userId },
      data: { name, price: parseFloat(price) },
    });

    if (updated.count === 0) {
      return res.status(404).json({ message: 'Produk tidak ditemukan atau tidak milik user' });
    }

    res.json({ message: 'Produk berhasil diupdate' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal update produk', error: err.message });
  }
};

// ✅ DELETE product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await prisma.product.deleteMany({
      where: { id: parseInt(id), userId: req.user.userId },
    });

    if (deleted.count === 0) {
      return res.status(404).json({ message: 'Produk tidak ditemukan atau tidak milik user' });
    }

    res.json({ message: 'Produk berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal hapus produk', error: err.message });
  }
};
