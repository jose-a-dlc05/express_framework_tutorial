// 1. Import express and path module and body parser module
import { Request, Response } from 'express';
const express = require('express');
const path = require('path');
const Joi = require('joi');
const bodyParser = require('body-parser');
// 2. Declare const app and initialize with express function returing object
const app = express();
// 3. Use app middleware to give folder alias and using the static method to give the directory using join method
app.use('/public/', express.static(path.join(__dirname, '../static')));
// 4. Use app middleware to bring bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
// 5. Use app middleware to use the json function from bodyParser
app.use(bodyParser.json());
// 6. Use the get method with a / path to send the html static along with its css and js
app.get('/', (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, '../static', 'index.html'));
});
// 7. Use the post method to log out the entered information from the form
app.post('/', (req: Request, res: Response) => {
	console.log(req.body);
	// a. Declare a const schema and initialize it with the Joi library where it has an object function that takes in an object as an argument. The object is basically the blueprint or schema of what you want to validate.
	const schema = Joi.object({
		email: Joi.string().trim().email().required(),
		password: Joi.string().min(5).max(10).required(),
	});
	// b. Declare a result variable that is initialize with the schema's method called validate and use the request argument's body method to take in the object of what was entered from the client.
	let result = schema.validate(req.body);
	// c. Create a condition where if the result is falsy then log out the error message
	if (!result) {
		console.log(result.error?.message);
	}
	// d. log out the result if no issues
	console.log(result);
});
// 8. Use the listen method to begin running server
app.listen(3000);
