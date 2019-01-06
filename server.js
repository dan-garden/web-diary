const express = require('express');
const app = express();
const port = 3000;


const jsonObject = {
    firstName: "Dan",
    lastName: "Garden"
};

app.use('/', express.static('public'));

app.get('/data', (req, res) => res.json(jsonObject));


app.listen(port, () => console.log(`App running on localhost:${port}`));