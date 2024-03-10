import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { createBookInApi } from "../../api/api";
import { CONFIG_BOOK_STATUS_DATA } from "../../config/config";
import { FormConfig, TBook } from "../../types/types";
import useBooksStore from "../../zustand/booksStore";
import CustomForm from "./CustomForm";

const NewBookForm = () => {
	const navigate = useNavigate();
	const { loadDatabase } = useBooksStore();
	const newBookFormConfig: FormConfig = {
		fields: [
			{
				type: "input",
				label: "Title",
				name: "title",
				required: true,
				placeholder: "Enter title",
			},
			{
				type: "input",
				label: "ISBN",
				name: "isbn",
				required: true,
				placeholder: "Enter ISBN",
			},
			{
				type: "number",
				label: "Page Count",
				name: "pageCount",
				required: true,
				placeholder: "Enter page count",
			},
			{
				type: "inputImage",
				label: "Thumbnail URL",
				name: "thumbnailUrl",
				placeholder: "Enter thumbnail URL",
			},
			{
				type: "textarea",
				label: "Long Description",
				name: "longDescription",
				placeholder: "Enter long description",
			},
			{
				type: "selection",
				label: "Status",
				name: "status",
				required: true,
				options: CONFIG_BOOK_STATUS_DATA,
			},
			{
				type: "input",
				label: "Author",
				name: "author",
				required: true,
				placeholder: "Enter author",
			},
			{
				type: "input",
				label: "Category",
				name: "category",
				required: true,
				placeholder: "Enter category",
			},
		],
		onSubmit: (values: TBook) => {
			const id = uuidv4();
			const data = { ...values, id: id };
			createBookInApi(data, loadDatabase);
			navigate(`/books/${id}`);
		},
	};

	return <CustomForm {...newBookFormConfig} />;
};

export default NewBookForm;
