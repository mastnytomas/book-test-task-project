import { TBook, TDatabeItem } from "../types/types";

export const setIsAdminModeToLocalStorage = (value: boolean): void => {
	localStorage.setItem("isAdminMode", JSON.stringify(value));
};

export const loadIsAdminModeFromLocalStorage = (): boolean => {
	const value = localStorage.getItem("isAdminMode");
	return value ? JSON.parse(value) : false;
};

export const getBooks = (database: TDatabeItem[]): TBook[] | undefined => {
	return database ? database.map((item: TDatabeItem) => item.book) : undefined;
};

export const getDatabaseIdByBookId = (
	id: string,
	database: TDatabeItem[]
): string | undefined => {
	const item = database.find((item) => item.book.id === id);
	return item ? item._id : undefined;
};

export function areObjectSame(obj1: TBook, obj2: TBook): boolean {
	return JSON.stringify(obj1) === JSON.stringify(obj2);
}
