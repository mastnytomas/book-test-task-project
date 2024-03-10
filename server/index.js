const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = 3001;
const API_KEY = "d1b81264ca274c1597cd16721f40907d";
const API_URL = `https://crudcrud.com/api/${API_KEY}/books`;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/createBook", async (req, res) => {
	try {
		const book = req.body.book;
		await axios.post(API_URL, { book });
		res.status(200).send("JSON data uploaded successfully");
	} catch (error) {
		console.error("Error uploading JSON data:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.delete("/api/deleteBook/:id", async (req, res) => {
	try {
		const id = req.params.id;
		await axios.delete(`${API_URL}/${id}`);
		res.status(200).send("Book deleted successfully");
	} catch (error) {
		console.error("Error deleting book:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.put("/api/updateBook/:id", async (req, res) => {
	try {
		const id = req.params.id;
		await axios.put(`${API_URL}/${id}`, req.body);
		res.status(200).send("Book deleted successfully");
	} catch (error) {
		console.error("Error deleting book:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
