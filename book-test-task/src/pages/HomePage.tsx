import { ReadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
	const navigate = useNavigate();
	return (
		<div style={{ textAlign: "center" }}>
			<Title level={1}>Managing book database app</Title>
			<Title level={5} style={{ margin: 40 }}>
				"Books are the compasses and telescopes and sextants and charts which
				other men have prepared to help us navigate the dangerous seas of human
				life." - Jesse Lee Bennett
			</Title>
			<ReadOutlined style={{ fontSize: 200 }} />
			<br />
			<Button
				type="primary"
				size="large"
				style={{ marginTop: 20 }}
				onClick={() => navigate("/books")}
			>
				Jump on books list!
			</Button>
		</div>
	);
};

export default HomePage;
