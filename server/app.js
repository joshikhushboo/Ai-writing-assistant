
const express = require("express");
const cors = require("cors");
require("dotenv").config()


const app = express();
const analyzeRoute = require("./routes/analyze");
const grammarCheckRoute = require("./routes/grammarcheck");
const spellCheckRoute = require("./routes/spellcheck");
const PORT = process.env.PORT || 8000;

//https://api.openai.com/v1/chat/completions
//mIDDLEWARES
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({
extended:true
}));


//Routes
app.use("/api/analyze",analyzeRoute);
app.use("/api/grammarcheck",grammarCheckRoute);
app.use("/api/spellcheck",spellCheckRoute);

//start server
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}....`);
});
    



