const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1/relationship_db")
  .then((result) => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.error(err);
  });

const userSchema = mongoose.Schema({
  name: String,
  addresses: [
    {
      _id: false,
      street: String,
      city: String,
      country: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

// const makeUser = async () => {
//   // definisikan objek user
//   const user = new User({
//     name: "John Doe",
//   });
//   user.addresses.push({
//     street: "Jl. Al-Muhajirin",
//     city: "Tangerang",
//     country: "Indonesia",
//   });
//   const res = await user.save();
//   console.log(res);
// };

// makeUser();

const addAddress = async (id) => {
  const user = await User.findById(id);
  user.addresses.push({
    street: "Jl. Benteng Betawi",
    city: "Tangerang",
    country: "Indonesia",
  });
  const res = await user.save();
  console.log(res);
};

addAddress("66d3b377628242cad4285921");

// ini implementasi relationship menggunakan mongoose
// ini relationship one to few(many)
// jadi 1 entitas/schema user bisa memiliki banyak data, tapi masih di simpan di dalam 1 document yg sama
// contohnya 1 user memiliki banyak alamat
