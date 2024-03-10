import { SelectValue } from "antd/es/select";

export type TBook = {
	id: string;
	title: string;
	isbn: string;
	pageCount: number;
	thumbnailUrl?: string;
	longDescription?: string;
	status: "PUBLISH" | "UNPUBLISH";
	author: string;
	category: string;
};

export type TDatabeItem = {
	_id: string;
	book: TBook;
};

export interface FormField {
	type: "input" | "number" | "selection" | "inputImage" | "textarea";
	label: string;
	name: string;
	required?: boolean;
	placeholder?: string;
	defaultValue?: string | SelectValue | boolean;
	options?: { label: string; value: string }[];
}

export interface FormConfig {
	fields: Array<FormField>;
	onSubmit: (values: TBook) => void;
}
