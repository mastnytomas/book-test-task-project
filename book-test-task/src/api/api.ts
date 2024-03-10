import axios from "axios";
import { CONFIG_API_KEY } from "../config/config";
import { TBook, TDatabeItem } from "../types/types";
import { getDatabaseIdByBookId } from "../utils/utils";

export function loadBooksFromApi(): Promise<TDatabeItem[]> {
	return axios
		.get(`https://crudcrud.com/api/${CONFIG_API_KEY}/books`)
		.then((response) => response.data)
		.catch((error) => {
			console.error("Error fetching books:", error);
			throw error;
		});
}

export function updateBookInApi(
	id: string,
	book: TBook,
	database: TDatabeItem[],
	loadDatabase: () => void
): Promise<void> {
	const databaseItemId = getDatabaseIdByBookId(id, database);

	return axios
		.put(`http://localhost:3001/api/updateBook/${databaseItemId}`, { book })
		.then(() => {
			loadDatabase();
		})
		.catch((error) => {
			console.error("Error updating book:", error);
			throw error;
		});
}

export function createBookInApi(book: TBook, loadDatabase: () => void) {
	return axios
		.post("http://localhost:3001/api/createBook", { book })
		.then(() => {
			loadDatabase();
		})
		.catch((error) => {
			console.error("Error creating book:", error);
			throw error;
		});
}

export function deleteBookFromApi(
	id: string | undefined,
	database: TDatabeItem[],
	loadDatabase: () => void
): Promise<void> {
	if (!id) throw new Error("Book ID is undefined");
	const databaseItemId = getDatabaseIdByBookId(id, database);
	return axios
		.delete(`http://localhost:3001/api/deleteBook/${databaseItemId}`)
		.then(() => {
			loadDatabase();
		})
		.catch((error) => {
			console.error("Error deleting book:", error);
			throw error;
		});
}
