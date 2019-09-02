const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movie_schema = new Schema({
  genres: Array,
  rating: Object,
  title: String,
  casts: Array,
  directors: Array,
  images: Object,
  year: String,
  id: String
})

exports.movies = mongoose.model("movies", movie_schema);


const userinfos_schema = new Schema({
  username: String,
  usertel: String,
  userpwd: String,
  userdbpwd: String,
  pic: {
    type: String,
    default: "http://5b0988e595225.cdn.sohucs.com/images/20170907/babeea32953d4501bbb8a041e415ca5f.jpeg"
  }
})

exports.userinfos = mongoose.model("userinfos", userinfos_schema);

const goods_schema = new Schema({
  title: String,
  price: Number,
  discount: Number,
  img: String,
  type: Object
});

exports.goods = mongoose.model("goods", goods_schema);

const usercart_schema = new Schema({
  username: String,
  goodsid: String,
  goodstitle: String,
  goodsprice: String,
  goodssize: String,
  goodimg: String,
  buynum: Number,
  time: Date,
  ischecked: {
    type: Boolean,
    default: false
  }
});

exports.usercartinfos = mongoose.model("usercartinfos", usercart_schema);


const userorder_schema = new Schema({
  // username: String,
  // goodsid: String,
  // goodstitle: String,
  // goodsprice: String,
  // goodssize: String,
  // goodimg: String,
  // buynum: Number,
  // address: {
  //   type: Object,
  //   default: {}
  // },

  username: String,
  goodsinfo: Object,
  type: {
    type: Number,
    default: 0
  }
});

exports.userorders = mongoose.model("userorders", userorder_schema);




const addressinfo_schema = new Schema({
  username: String,
  name: String,
  tel: String,
  isdefault: {
    type: Boolean,
    default: false
  },
  province: String,
  city: String,
  county: String,
  addressDetail: String
});

exports.addressinfos = mongoose.model("addressinfos", addressinfo_schema);