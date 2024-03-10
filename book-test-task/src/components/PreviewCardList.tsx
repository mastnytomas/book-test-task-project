import { Col, Row } from "antd";
import { getBooks } from "../utils/utils";
import useAdminStore from "../zustand/adminStore";
import useBooksStore from "../zustand/booksStore";
import PreviewCard from "./PreviewCard";
import PreviewCardNew from "./PreviewCardNew";

const PreviewCardList = () => {
	const { database } = useBooksStore();
	const { isAdminMode } = useAdminStore();
	const books = getBooks(database ?? []);
	return (
		<Row gutter={[16, 16]}>
			{books &&
				books.map((book, index) => (
					<Col
						xs={24}
						sm={12}
						md={8}
						lg={6}
						xl={4}
						key={index}
						style={{ marginBottom: 50 }}
					>
						<PreviewCard book={book} />
					</Col>
				))}
			{isAdminMode && (
				<Col xs={24} sm={12} md={8} lg={6} xl={4} key={"newCard"}>
					<PreviewCardNew />
				</Col>
			)}
		</Row>
	);
};

export default PreviewCardList;
