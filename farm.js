const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1/relationship_db")
  .then((result) => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.error(err);
  });

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  season: {
    type: String,
    enum: ["spring", "summer", "fall", "winter"],
  },
});

const farmSchema = new mongoose.Schema({
  name: String,
  city: String,
  products: [
    {
      type: mongoose.Schema.Types.ObjectId, // data ini berisikan kumpulan id-id
      ref: "Product", // referensi dokumen yg ingin di ambil object id nya, dimana itu bentuk singular dari collection di dalam mongodbnya, di collections ada products jadi ya Product
    },
  ],
});

const Product = mongoose.model("Product", productSchema);
const Farm = mongoose.model("Farm", farmSchema);

// MEMBUAT DATA PRODUCTS
// Product.insertMany([
//   {
//     name: "Mellon",
//     price: 9,
//     season: "summer",
//   },
//   {
//     name: "Watermelon",
//     price: 11,
//     season: "summer",
//   },
//   {
//     name: "Kiwi",
//     price: 12,
//     season: "summer",
//   },
// ]);

// MENAMBAHKAN FARM BARU, SEKALIGUS DENGAN DATA PRODUCTNYA
// const makeFarm = async () => {
//   const farm = new Farm({
//     name: "Farm",
//     city: "Jakarta",
//   });
//   const melon = await Product.findOne({ name: "Mellon" });
//   // ingin di masukan ke document Farm, lalu ambil properti products yg akan berisi/menyimpan kumpulan id dari product
//   // farm.products.push(melon._id)
//   farm.products.push(melon);
//   await farm.save();
//   console.log(farm);
// };

// makeFarm();

//  MENAMBAHKAN PRODUCT KE FARM YG SUDAH ADA
// const addProduct = async (id) => {
//   const farm = await Farm.findById(id); // cari dari model. Cari document farm yg ingin ditambahkan data product nya
//   const watermelon = await Product.findOne({ name: "Watermelon" }); // cari product yg ingin di tambahkan ke collections farm
//   farm.products.push(watermelon); // masukan document product ke collections farm
//   await farm.save(); // save agar datanya masuk ke dalam collection farm
//   console.log(farm);
// };

// addProduct("66d4026c5d85dda3764047a4");

Farm.findOne({ name: "Farm" })
  // parameter 1 => populate ini berisi field mana yg menyimpan kumpulan id dari document yg berelasi, harus persis penulisan fieldnya namanya
  // parameter 2 => field mana yang ingin ditampilkan
  .populate("products", "name")
  .then((farm) => {
    console.log(farm);
    // for (product of farm.products) {
    //   console.log(product.name);
    // }
  });
