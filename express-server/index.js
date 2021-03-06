const express = require('express')
var cors = require('cors');
const fs = require('fs')
const app = express()
const port = 3000

const BUDGETIZER_JSON_DIR = './data'

app.use(express.json());
app.use(cors());

app.get('/:user/:type', (req, res) => {
	let filePath = `${BUDGETIZER_JSON_DIR}/${req.params.user}-${req.params.type}.json`;
	fs.stat(filePath , function(err, stat) {
    console.log(err, stat);
		if(err == null) {
			console.log("READ")
			fs.readFile(filePath, 'UTF-8', function(err, data) {
				if(err) {
						console.log("error", err);
						throw new Error(err);
				}
				console.log("success", data)
				res.send(data);
			});
    } else if(err.code === 'ENOENT') {
        // file does not exist
        res.send([]);
    } else {
			console.log("error", err);
			throw new Error(err);
	
    }
});
	 
})


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
