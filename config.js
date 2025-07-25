const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "C0JDgKra#B0DfrsIOPbckhUH0Z8dLBh5iXu8UbwiNCoM1dmk93k8",
  MONGODB: process.env.MONGODB || "mongodb+srv://avstamilzan15:S9bf6vhd9MnoNtTC@cluster0.9vodwx7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  OWNER_NUM: process.env.OWNER_NUM || "94720251446",
};
