const express = require("express");

const router = express.Router();

const {
    movies,
    userinfos,
    goods,
    usercartinfos,
    userorders,
    addressinfos
} = require("./utils/schema")

const {
    keys,
    aesEncrypt,
    aesDecrypt
} = require("./utils");

router.get("/index", (req, res) => {
    res.send("这是一个 vue 项目的 路由接口")
})


router.get("/movies", (req, res) => {
    const {
        limit
    } = req.query

    movies.find({}, {}).limit(parseInt(limit)).sort({
        _id: -1
    }).then(result => {
            res.json({
                code: 200,
                msg: "获取电影数据成功",
                result
            })
        }

    )
})

router.post("/register", (req, res) => {
    const body = req.body;

    userinfos.findOne({
        $or: [{
                username: body.username,
            },
            {
                usertel: body.usertel
            }
        ]
    }).then(result => {
        if (result) {
            res.json({
                code: 200,
                msg: "注册失败,用户名或手机号已存在",
                type: 0
            })
        } else {
            userinfos.insertMany(body).then(result => {
                res.json({
                    code: 200,
                    msg: "注册成功...",
                    type: 1
                })
            })
        }
    })
})


router.post("/login", (req, res) => {
    const body = req.body;
    console.log(body)
    userinfos.findOne({
        username: body.username,
    }).then(result => {
        if (result) {

            if (result.userpwd == body.userpwd) {
                const token = aesEncrypt(result.username, keys);
                req.session.token = token;
                console.log(req.session + "aaaa")
                res.json({
                    code: 200,
                    msg: "登录成功",
                    type: 1,
                    token,
                    result
                })
            } else {
                res.json({
                    code: 200,
                    msg: "密码错误",
                    type: 0
                })
            }
        } else {
            res.json({
                code: 200,
                msg: "用户名不存在",
                type: 0
            })
        }
    })
})

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/avatar');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + 'wh' + file.originalname);
    }
})

// 创建上传对象
const upload = multer({
    storage
}).any();

// 上传头像 
router.post("/uploadavatar", upload, (req, res) => {
    var pic = req.files[0].path;
    pic = pic.replace(/public/, "http://47.93.16.53:4100");
    console.log(req.session)
    var username = aesDecrypt(req.session.token, keys);
    userinfos.updateOne({
        username
    }, {
        $set: {
            pic
        }
    }).then(result => {
        res.json({
            code: 200,
            msg: "修改图像成功",
            pic
        })
    })
})

// router.post("/updatauserpic", (req, res) => {
//     let {
//         username,
//         pic
//     } = req.body
//     userinfos.updateOne({
//         username
//     }, {
//         $set: {
//             pic
//         }
//     }).then(result => {
//         res.json({
//             msg: "头像上传成功",
//             code: 200,
//             pic,
//             result
//         })
//     })
// })


router.get("/getgoods", (req, res) => {
    let {
        limit,
        keyword
    } = req.query
    limit = limit * 1 || 0;
    var obj = {};
    if (keyword) {
        obj = {

            $or: [{
                    name: new RegExp(keyword)
                },
                {
                    type: new RegExp(keyword)
                }
            ]
        }
    }
    goods.find(obj).sort({
        _id: 1
    }).limit(limit).then(result => {
        res.json({
            code: 200,
            msg: "获取商品数据成功",
            result
        })
    })
})

// 获取商品分类的内容
router.get("/getgoodtypes", (req, res) => {
    goods.distinct("type").then(result => {
        res.json({
            code: 200,
            msg: "获取商品分类成功",
            result
        })
    })
})

router.get("/getgooddetail", (req, res) => {
    const {
        goodId
    } = req.query;
    console.log(goodId)

    goods.findOne({
        _id: goodId
    }).then(result => {
        res.json({
            code: 200,
            msg: "获取商品详情数据成功",
            result
        })
    })
})

router.post("/addshopcar", (req, res) => {
    let {
        username,
        goodsid,
        goodstitle,
        goodsprice,
        goodssize,
        goodimg,
        buynum
    } = req.body;
    console.log(username)
    usercartinfos.findOne({
        username,
        goodsid,
        goodssize
    }).then(result => {
        if (result) {
            usercartinfos.updateOne({
                username,
                goodsid,
                goodssize
            }, {
                $inc: {
                    buynum: buynum * 1
                },
                $set: {
                    time: Date.now()
                }
            }).then(updata => {
                res.json({
                    code: 200,
                    msg: "新增成功",
                    updata
                })
            })
        } else {
            usercartinfos.insertMany({
                username,
                goodsid,
                goodstitle,
                goodsprice,
                goodssize,
                buynum,
                goodimg,
                time: Date.now()
            }).then(add => {
                res.json({
                    code: 200,
                    msg: "加入成功",
                })
            })
        }
    })
})







router.post("/getusercarinfo", (req, res) => {
    const {
        username
    } = req.body;
    console.log(username)
    usercartinfos.find({
        username
    }, {}).sort({
        time: -1
    }).then(result => {
        if (result) {
            let total = 0;
            result.forEach(item => {
                total += item.buynum * 1;
            })
            res.json({
                code: 200,
                msg: '获取购物车信息成功',
                carList: result,
                total
            })
        } else {
            res.json({
                code: 200,
                msg: '购物车空空如也',
                carList: null
            })
        }
    })
})


router.post("/delusercart", (req, res) => {

    const {
        _id
    } = req.body;
    console.log(_id)
    usercartinfos.deleteOne({
        _id
    }).then(result => {
        res.json({
            code: 200,
            msg: "删除成功",
            result
        })
    })
})




router.post("/addone", (req, res) => {
    const {
        _id,
        buynum
    } = req.body;
    console.log(req.body)

    usercartinfos.updateOne({
        _id
    }, {
        $set: {
            buynum
        }
    }).then(result => {
        res.json({
            code: 200,
            msg: "修改成功"
        })
    })
})


router.post("/adduseroder", (req, res) => {

    userorders.insertMany(req.body).then(result => {
        res.json({
            code: 200,
            msg: "创建订单成功",
            result
        })
    })
})

//订单完成 删除购物车信息
router.post("/delcartinfo", (req, res) => {
    console.log(req.body)
    let arr = req.body._ids
    usercartinfos.deleteMany({
        $or: arr
    }).then(result => {
        res.json({
            code: 200,
            msg: "删除购物车历史成功",
        })
    })
})


router.post("/getuserorder", (req, res) => {
    console.log(req.body)
    userorders.find(req.body).then(result => {
        res.json({
            code: 200,
            msg: "获取订单成功",
            result
        })
    })
})

router.post("/updateuserorder", (req, res) => {
    const {
        _id,
        type
    } = req.body
    let msg = ''
    switch (type) {
        case -1:
            msg = "订单取消成功";
            break;
        case 1:
            msg = "订单提交成功";
            break;
    }
    console.log(_id, type)
    userorders.updateOne({
        _id
    }, {
        $set: {
            type
        }

    }).then(result => {
        res.json({
            code: 200,
            msg,
            result
        })
    })
})



router.post("/addaddress", (req, res) => {
    console.log(req.body)
    console.log(req.body.isdefault)

    addressinfos.find({
        username: req.body.username
    }).then(result => {
        if (result.length == 0) {
            req.body.isdefault = true

            if (req.body.isdefault) {
                addressinfos.updateMany({
                    username: req.body.username
                }, {
                    $set: {
                        isdefault: false
                    }
                }).then(isok => {
                    console.log(isok)
                    addressinfos.insertMany(req.body).then(result => {
                        res.json({
                            code: 200,
                            msg: "添加地址成功",
                            result
                        })
                    })
                })
            } else {
                addressinfos.insertMany(req.body).then(result => {
                    res.json({
                        code: 200,
                        msg: "添加地址成功",
                        result
                    })
                })
            }
        } else {
            if (req.body.isdefault) {
                addressinfos.updateMany({
                    username: req.body.username
                }, {
                    $set: {
                        isdefault: false
                    }
                }).then(isok => {
                    console.log(isok)
                    addressinfos.insertMany(req.body).then(result => {
                        res.json({
                            code: 200,
                            msg: "添加地址成功",
                            result
                        })
                    })
                })
            } else {
                addressinfos.insertMany(req.body).then(result => {
                    res.json({
                        code: 200,
                        msg: "添加地址成功",
                        result
                    })
                })
            }
        }
    })
})



router.post("/getaddresslist", (req, res) => {
    addressinfos.find({
        username: req.body.username
    }).then(result => {
        res.json({
            code: 200,
            msg: "获取地址列表成功",
            result
        })
    })
})


router.post("/getdefaultaddr", (req, res) => {
    addressinfos.find(req.body).then(result => {
        res.json({
            code: 200,
            msg: "获取默认地址成功",
            result
        })
    })
})


router.post("/setaddrdefault", (req, res) => {
    console.log(req.body)
    addressinfos.updateMany({
        username: req.body.username
    }, {
        $set: {
            isdefault: false
        }
    }).then(result => {
        addressinfos.updateOne({
            _id: req.body
        }, {
            $set: {
                isdefault: true
            }
        }).then(isok => {
            res.json({
                code: 200,
                msg: "设置成功"
            })
        })
    })
})


router.post("/updateaddr", (req, res) => {
    console.log(req.body)
    let {
        _id,
        name,
        tel,
        province,
        city,
        county,
        addressDetail
    } = req.body

    addressinfos.updateOne({
        _id
    }, {
        $set: {
            name,
            tel,
            province,
            city,
            county,
            addressDetail
        }
    }).then(result => {
        res.json({
            code: 200,
            msg: "修改地址成功"
        })
    })

})



router.post("/deladdr", (req, res) => {
    let {
        isdefault,
        _id,
        username
    } = req.body
    console.log(req.body)
    if (isdefault) {
        addressinfos.deleteOne({
            _id
        }).then(result => {
            console.log(result);
            addressinfos.updateOne({
                username
            }, {
                $set: {
                    isdefault: true
                }
            }).then(isok => {
                res.json({
                    code: 200,
                    msg: "删除成功"
                })
            })
        })
    } else {
        addressinfos.deleteOne({
            _id
        }).then(result => {
            res.json({
                code: 200,
                msg: "删除成功"
            })
        })
    }
})





module.exports = router;