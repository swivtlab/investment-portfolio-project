const app = require("./router");
const http = require("http").Server(app);
const config = require("./config");

app.use((err, req, res, next) => {
  // if(config.app.ENV==="dev") console.error(err)
  res.status(err.status || 500);
  return res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

http.listen(config.app.PORT, () => {
  console.log("listening on http://localhost:" + config.app.PORT);
});
