import { Route, Routes } from "react-router-dom";
import BookPage from "../pages/BookPage";
import BooksPage from "../pages/BooksPage";
import HomePage from "../pages/HomePage";
import NewBookPage from "../pages/NewBookPage";

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/books" element={<BooksPage />} />
			<Route path="/books/new" element={<NewBookPage />} />
			<Route path="/books/:bookId" element={<BookPage />} />
			<Route path="/books/:bookId/:edit" element={<BookPage />} />
		</Routes>
	);
};

export default Router;
