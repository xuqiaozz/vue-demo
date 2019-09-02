//vue 相关配置文件  脚手架

module.exports = {
    publicPath: "", //设置项目的公共路径 打包上线
    devServer: {
        host: '0.0.0.0',
        port: 8080, //设置端口
        open: true,
        proxy: { //代理   跨域
            "/vue": {
                target: "http://47.93.16.53:4100",
                changeOrigin: true,
            }
        }
    }
}


// // vue/cli 相关配置文件  脚手架  
// module.exports = {
//     publicPath:"",  // 设置项目的公共路径 打包上线 ,

//     devServer:{
//         host:"0.0.0.0",
//         port:4100,
//         open:true,   // 自动打开浏览器 
//         proxy:{    //  代理 
//             "/vue": {
//                 target:"http://localhost:1906",
//                 changeOrigin: true,
//             },
//             "/avatar": {
//                 target:"http://localhost:1906",
//                 changeOrigin: true,
//             }
//         }  
//     },
// }