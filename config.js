const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "q1AyxJxb#Lq4re3-S0LpQk4fk8RWbU4rbMlGvLrGMj3_e48rjbP0",
  MONGODB: process.env.MONGODB || "mongodb+srv://avstamilzan15:S9bf6vhd9MnoNtTC@cluster0.9vodwx7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  OWNER_NUM: process.env.OWNER_NUM || "94720251446",
};
