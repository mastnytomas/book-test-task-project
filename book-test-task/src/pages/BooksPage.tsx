import Title from "antd/es/typography/Title";
import PreviewCardList from "../components/PreviewCardList";

const BooksPage = () => {
	return (
		<div>
			<Title level={2} style={{ textAlign: "center" }}>
				Books list
			</Title>
			<PreviewCardList />
		</div>
	);
};

export default BooksPage;
