const express = require('express')
var cors = require('cors');
const fs = require('fs')
const app = express()
const port = 3000

const BUDGETIZER_JSON_DIR = './data'

app.use(express.json());
app.use(cors());

app.put('/:user/:type', (req, res) => {
	console.log(JSON.stringify(req.body));
	fs.writeFile(`${BUDGETIZER_JSON_DIR}/${req.params.user}-${req.params.type}.json`, JSON.stringify(req.body), function(err) {
    if(err) {
        console.log(err);
				throw new Error(err);
    }
    res.send("OK");
}); 
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})