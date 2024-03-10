import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { useNavigate } from "react-router-dom";

const PreviewCardNew = () => {
	const navigate = useNavigate();
	return (
		<Card
			onClick={() => navigate("/books/new")}
			style={{
				width: 200,
				height: 436,
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				cursor: "pointer",
			}}
			cover={
				<img
					style={{ maxWidth: "100%", maxHeight: "100%" }}
					alt={"create new book"}
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/1200px-Plus_symbol.svg.png"
				/>
			}
		>
			<Meta
				title={"Add new book"}
				style={{ margin: "10px 0", fontWeight: "bold" }}
			/>
		</Card>
	);
};

export default PreviewCardNew;
