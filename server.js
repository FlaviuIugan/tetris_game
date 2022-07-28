const express = require("express");
const app = express();

app.use(express.static('front'))


app.get("/", (req, res) => {
    res.sendFile("/front/index.html");
})



app.listen("3000", () => {
    console.log("Server is running on port 3000")
})


/*
 *        for (let i = 0; i < 20; i++) {
            const columnElement = document.createElement("div");
            for (let j = 0; j < 10; j++) {
                const rawElement = document.createElement("span");
                rawElement.innerText = "1";
                rawElement.className = "testRaw";
                columnElement.appendChild(rawElement);
            }
            table.append(columnElement);
        }
        */