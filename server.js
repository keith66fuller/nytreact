const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(routes);
mongoose.Promise = global.Promise;
mongoose.connect( process.env.MONGODB_URI || "mongodb://heroku_dd4djrj0:m5p567vhna2g96lba9b75dlsn4@ds141078.mlab.com:41078/heroku_dd4djrj0",{useNewUrlParser: true } );
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);
