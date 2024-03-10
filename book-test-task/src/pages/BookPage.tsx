import {
	Button,
	Card,
	Col,
	Descriptions,
	DescriptionsProps,
	Flex,
	Image,
	Input,
	InputNumber,
	Popconfirm,
	Row,
	Select,
	message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBookFromApi, updateBookInApi } from "../api/api";
import {
	CONFIG_BOOK_EDIT_REQUIRED_FIELDS,
	CONFIG_BOOK_IMG_DEFAULT,
	CONFIG_BOOK_STATUS_DATA,
} from "../config/config";
import { TBook } from "../types/types";
import { areObjectSame as areObjectsSame, getBooks } from "../utils/utils";
import useAdminStore from "../zustand/adminStore";
import useBooksStore from "../zustand/booksStore";

const BookPage = () => {
	const { Option } = Select;
	const bookId = useParams().bookId;
	const editParam = useParams().edit;
	const navigate = useNavigate();
	const { isAdminMode } = useAdminStore();
	const { database, loadDatabase } = useBooksStore();
	const books = getBooks(database ?? []);
	const selectedBook: TBook | undefined = books?.find(
		(book) => book.id === bookId
	);
	const [editMode, setEditMode] = useState(editParam ? true : false);
	const canShowInputs = isAdminMode && editMode;

	const selectedBookWithAllValues = useMemo(() => {
		return {
			...selectedBook,
			id: selectedBook?.id || "",
			isbn: selectedBook?.isbn || "",
			title: selectedBook?.title || "",
			pageCount: selectedBook?.pageCount || 0,
			thumbnailUrl: selectedBook?.thumbnailUrl || "",
			longDescription: selectedBook?.longDescription || "",
			status: selectedBook?.status || "PUBLISH",
			author: selectedBook?.author || "",
			category: selectedBook?.category || "",
		};
	}, [selectedBook]);

	const [bookEditedData, setBookEditedData] = useState<TBook>(
		selectedBookWithAllValues
	);

	useEffect(() => {
		if (bookEditedData.id !== selectedBook?.id) {
			setBookEditedData(selectedBookWithAllValues);
		}
	}, [bookEditedData.id, selectedBook, selectedBookWithAllValues]);

	if (!selectedBook) return <h1>Book not found</h1>;

	const items: DescriptionsProps["items"] = [
		{
			key: "1",
			label: "ISBN",
			children: canShowInputs ? (
				<Input
					value={bookEditedData?.isbn}
					onChange={(e) =>
						setBookEditedData({ ...bookEditedData, isbn: e.target.value })
					}
				/>
			) : (
				selectedBook?.isbn
			),
		},
		{
			key: "2",
			label: "Page count",
			children: canShowInputs ? (
				<InputNumber
					style={{ width: "100%" }}
					defaultValue={bookEditedData?.pageCount}
					onChange={(value) =>
						setBookEditedData({
							...bookEditedData,
							pageCount: value ? parseInt(value.toString()) : 0,
						})
					}
				/>
			) : (
				selectedBook?.pageCount
			),
		},
		{
			key: "3",
			label: "Status",
			children: canShowInputs ? (
				<Select
					style={{ width: "100%" }}
					value={bookEditedData?.status}
					onChange={(value) =>
						setBookEditedData({
							...bookEditedData,
							status: value as "PUBLISH" | "UNPUBLISH",
						})
					}
				>
					{CONFIG_BOOK_STATUS_DATA?.map((option) => (
						<Option key={option.value} value={option.value}>
							{option.label}
						</Option>
					))}
				</Select>
			) : (
				selectedBook?.status
			),
		},
		{
			key: "4",
			label: "Author",
			children: canShowInputs ? (
				<Input
					value={bookEditedData?.author}
					onChange={(e) =>
						setBookEditedData({
							...bookEditedData,
							author: e.target.value,
						})
					}
				/>
			) : (
				selectedBook?.author
			),
		},
		{
			key: "5",
			label: "Category",
			children: canShowInputs ? (
				<Input
					value={bookEditedData?.category}
					onChange={(e) =>
						setBookEditedData({
							...bookEditedData,
							category: e.target.value,
						})
					}
				/>
			) : (
				selectedBook?.category
			),
		},
		{
			key: "empty1",
			label: "",
			children: "",
		},
		{
			key: "6",
			label: "Description",
			children: canShowInputs ? (
				<TextArea
					value={bookEditedData?.longDescription}
					onChange={(e) =>
						setBookEditedData({
							...bookEditedData,
							longDescription: e.target.value,
						})
					}
				/>
			) : (
				selectedBook?.longDescription
			),
		},
	];

	const handleEditModeToggle = () => {
		if (editMode) {
			const hasChanges = !areObjectsSame(selectedBook, bookEditedData);
			if (bookEditedData && selectedBook && hasChanges) {
				const requiredFields = CONFIG_BOOK_EDIT_REQUIRED_FIELDS;
				const emptyRequiredFields = requiredFields.filter(
					(field) =>
						!bookEditedData[field as keyof TBook] ||
						bookEditedData[field as keyof TBook] === ""
				);
				if (emptyRequiredFields.length === 0) {
					updateBookInApi(
						selectedBook.id,
						bookEditedData,
						database ?? [],
						loadDatabase
					);
					message.success("Book edited successfully");
				} else {
					const emptyFieldsText = emptyRequiredFields.join(", ");
					message.error(
						`Please fill in the following required fields: ${emptyFieldsText}`
					);
					return;
				}
			}
		}
		setEditMode(!editMode);
	};

	const handleCancelEditMode = () => {
		setEditMode(!editMode);
	};

	const handleDeleteBook = () => {
		deleteBookFromApi(selectedBook?.id, database ?? [], loadDatabase);
		navigate("/books");
	};

	return (
		<>
			<h1>{selectedBook?.title}</h1>
			<Row gutter={12}>
				<Col xs={24} sm={24} md={12} lg={8} xl={6}>
					<Image
						style={{ borderRadius: "10%" }}
						width="100%"
						src={selectedBook?.thumbnailUrl || CONFIG_BOOK_IMG_DEFAULT}
					/>
				</Col>
				<Col xs={24} sm={24} md={12} lg={12} xl={12}>
					<Descriptions
						title="Book info"
						layout="vertical"
						items={items}
						size="small"
					/>
				</Col>
				{isAdminMode && (
					<Col xs={24} sm={24} md={24} lg={4} xl={6}>
						<Card title="Admin Panel">
							<Flex wrap="wrap" gap="middle">
								<Button type="primary" onClick={handleEditModeToggle}>
									{editMode ? "Save" : "Edit"}
								</Button>
								{editMode ? (
									<Button type="default" danger onClick={handleCancelEditMode}>
										Cancel edit mode
									</Button>
								) : (
									<Popconfirm
										title="Delete the book"
										description="Are you sure to delete this book?"
										onConfirm={handleDeleteBook}
										okText="Yes"
										cancelText="No"
									>
										<Button type="primary" danger>
											Delete book
										</Button>
									</Popconfirm>
								)}
							</Flex>
						</Card>
					</Col>
				)}
			</Row>
		</>
	);
};

export default BookPage;
