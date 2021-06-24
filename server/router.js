const express = require("express");
const app = express();
const config = require("./config");
const cors = require("cors");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
// CORS
const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:4000",
  `http://localhost:${config.app.PORT}`
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
// Routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ type: "application/*+json" }));
app.use(express.raw());
app.use(morgan('dev'));
var restream = function (proxyReq, req, res, options) {
  if (req.body) {
    let bodyData = JSON.stringify(req.body);
    // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
    proxyReq.setHeader("Content-Type", "application/json");
    proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
    // stream the content
    proxyReq.write(bodyData);
  }
};

app.use(
  "/api",
  createProxyMiddleware({
    target: config.app.URL,
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      [`^/api`]: "",
    },
    onProxyReq: restream
  })
);

// error page request
module.exports = app;
