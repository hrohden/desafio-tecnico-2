const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(
        "/viacep",
        proxy({
            target: "http://viacep.com.br/ws",
            changeOrigin: true,
            pathRewrite: {
                "^/viacep": "/"
            }
        })
    );
    app.use(
        "/api",
        proxy({
            target: "http://localhost:8080",
            changeOrigin: true,
            pathRewrite: {
                "^/api": "/"
            }
        })
    );
}