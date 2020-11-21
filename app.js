const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const Nexmo = require("nexmo");
const socketio = require("socket.io");
const { apiKey, apiSecret } = require("./apidetailes");

// Init Nexmo
const nexmo = new Nexmo(
  {
    apiKey,
    apiSecret,
  },
  { debug: true }
);

// Init app
const app = express();

// Templete engine setup
app.set("view engine", "html");
app.engine("html", ejs.renderFile);

app.use(express.static(__dirname + "/public"));

// Bodyparser middlerware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Index route
app.get("/", (req, res) => {
  res.render("index");
});
app.post("/", (req, res) => {
  //   res.send(req.body);
  //   console.log(req.body);
  const number = req.body.number;
  const text = req.body.text;
  nexmo.message.sendSms(
    "Dev Text App",
    number,
    text,
    { type: "unicode" },
    (error, res) => {
      if (error) {
        console.log(error);
      } else {
        // console.dir(res);
        const data = {
          id: res.messages[0]["message-id"],
          number: res.messages[0]["to"],
        };
        io.emit("smsData", data);
      }
    }
  );
});

const port = 3000;
const server = app.listen(port, () => {
  console.log(`Server is up at port ${port}`);
});

// socket.io setup
const io = socketio(server);
io.on("connection", (socket) => {
  console.log("Connected");
  io.on("dosconnect", () => {
    console.log("Disconnected");
  });
});
