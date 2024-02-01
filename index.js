const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const notesRoutes = require("./routes/notes");
const db = require("./db/connection");

const app = express();
const port = 8000;

// template engine
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.get("/", async (req, res) => {
  const notes = await db.getDb().db().collection("notes").find({}).toArray();
  res.render("home", { notes });
});

app.use("/notes", notesRoutes);

db.initiateDb((error, db) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Banco conectado com sucesso");
    app.listen(port, () => {
      console.log(`Aplicação rodando na porta: ${port}`);
    });
  }
});
