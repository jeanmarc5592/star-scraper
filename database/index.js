const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const dbUser = process.env.DB_USER;
const dbPw = process.env.DB_PW;
const dbName = process.env.DB_NAME;
const clusterName = process.env.CLUSTER_NAME;
const clusterURI = `mongodb+srv://${dbUser}:${dbPw}@${clusterName}.lxeo1.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(clusterURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (!err) {
    return console.log("Connected to Database");
  }
  console.log(err);
});
