import create from "zustand";
import { loadBooksFromApi } from "../api/api";
import { TDatabeItem as TDatabaseItem } from "../types/types";

interface BooksStoreState {
	database: TDatabaseItem[] | undefined;
	loadDatabase: () => void;
}

const useBooksStore: () => BooksStoreState = create<BooksStoreState>((set) => ({
	database: undefined,
	loadDatabase: () => {
		loadBooksFromApi().then((items) => {
			set({ database: items });
		});
	},
}));

export default useBooksStore;
