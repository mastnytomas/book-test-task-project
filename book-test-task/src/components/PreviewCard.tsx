import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Popconfirm, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteBookFromApi } from "../api/api";
import { CONFIG_BOOK_IMG_DEFAULT } from "../config/config";
import { TBook } from "../types/types";
import useAdminStore from "../zustand/adminStore";
import useBooksStore from "../zustand/booksStore";

const { Meta } = Card;

interface PreviewCardProps {
	book: TBook;
}

const PreviewCard: React.FC<PreviewCardProps> = ({ book }) => {
	const { isAdminMode } = useAdminStore();
	const { database, loadDatabase } = useBooksStore();
	const navigate = useNavigate();
	const handleOnDeleteConfirm = () => {
		deleteBookFromApi(book.id, database ?? [], loadDatabase);
	};
	const bookUrl = `/books/${book.id}`;
	const handleOnEditClick = () => {
		navigate(`/books/${book.id}/edit`);
	};

	const adminActions = [
		<EditOutlined onClick={handleOnEditClick} key="edit" />,
		<Popconfirm
			title="Delete the book"
			description="Are you sure to delete this book?"
			onConfirm={handleOnDeleteConfirm}
			okText="Yes"
			cancelText="No"
		>
			<DeleteOutlined key="delete" />
		</Popconfirm>,
	];

	return (
		<Card
			style={{ width: 200, height: 390 }}
			cover={
				<img
					style={{ cursor: "pointer", height: 300 }}
					alt={book.title}
					onClick={() => navigate(bookUrl)}
					src={book.thumbnailUrl || CONFIG_BOOK_IMG_DEFAULT}
				/>
			}
			actions={isAdminMode ? adminActions : []}
		>
			<Row style={{ height: 35, marginLeft: -10 }}>
				<Meta title={book.title} description={book.author} />
			</Row>
		</Card>
	);
};

export default PreviewCard;
