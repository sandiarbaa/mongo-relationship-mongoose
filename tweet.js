const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1/relationship_db")
  .then((result) => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.error(err);
  });

const userSchema = new mongoose.Schema({
  username: String,
  age: Number,
});

const tweetSchema = new mongoose.Schema({
  text: String,
  like: Number,
  user: {
    // properti relasi yg menggunakan schema/collection users
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);

const makeTweet = async () => {
  // kalau user nya sudah dibuat
  const user = await User.findOne({
    username: "Johndoe",
  });

  // misal user nya belum di buat, dan gunakan method save
  // const user = new User({
  //   username: "Johndoe",
  //   age: 20,
  // });
  const tweet = new Tweet({
    text: "Hello World 2",
    like: 0,
  });
  tweet.user = user;
  // user.save();
  tweet.save();
};

// makeTweet();

const showTweets = async () => {
  const tweets = await Tweet.findById("66d412afdee35bccd739ddc1").populate(
    "user",
    "username"
  );
  console.log(tweets);
};

showTweets();

// one to squillions
// yaitu parent entitas akan memiliki banyak sekali data dari suatu entitas
// jadi di tuker posisi siapa yg akan kita letakan foreign_key nya
