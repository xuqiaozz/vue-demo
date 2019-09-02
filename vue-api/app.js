const express = require("express");
const port = 4100;
const hostname = "0.0.0.0";
const http = require("http");
const app = express();

const server = http.createServer(app);

const connection = require("./utils/db")

const vue = require("./vue")

const cors = require("cors");
app.use(cors()); // cors 解决跨域问题  jsonp 代理  

app.use(express.static('public'));
//设置public为静态资源目录

app.use(express.json()); // from-data 
app.use(express.urlencoded({
    extended: false
})); // x-www-form-urlencoded  获取 POST 请求 获取 参数数据

app.get("/index", (req, res) => {
    res.json({
        code: 200,
        msg: "查看 服务器信息",
        query: req.query,
        headers: req.headers,
    })
});

const session = require("express-session");
app.use(session({
    secret: "test",
    name: "appTest",
    cookie: {
        maxAge: 60 * 60 * 1000
    }, // session 记录数据的时长 
    resave: false,
    saveUninitialized: true
}))

const {
    checkToken
} = require("./utils");

// app.use(checkToken);

app.use("/vue", vue)


app.get("/demo", (req, res) => {
    res.send("这是一个后台接口")
})

server.listen(port, hostname, () => {
    console.log(`my server running in http://${hostname}:${port}`)
})