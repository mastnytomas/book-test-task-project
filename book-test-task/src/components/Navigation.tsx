import { Menu, Row, Switch } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAdminStore from "../zustand/adminStore";

const Navigation = () => {
	const { isAdminMode, setIsAdminMode } = useAdminStore();
	const [isAdminModeSwitch, setIsAdminModeSwitch] = useState(isAdminMode);
	const navigate = useNavigate();
	const location = useLocation();

	const handleOnChangeAdminMode = (checked: boolean) => {
		setIsAdminModeSwitch(checked);
		setIsAdminMode(checked);
	};

	const getKeyFromPath = (path: string) => {
		if (path === "/") {
			return "";
		} else if (path.startsWith("/books/new")) {
			return "books/new";
		} else if (path.startsWith("/books")) {
			return "books";
		} else {
			return "";
		}
	};

	return (
		<Row justify="space-between" align="middle">
			<Menu
				style={{ width: "70%" }}
				theme={"dark"}
				mode="horizontal"
				selectedKeys={[getKeyFromPath(location.pathname)]}
				onClick={({ key }) => navigate(key)}
			>
				<Menu.Item key="">Home</Menu.Item>
				<Menu.Item key="books">Books</Menu.Item>
				<Menu.Item disabled={!isAdminMode} key="books/new">
					Create new book
				</Menu.Item>
			</Menu>
			<Switch
				checked={isAdminModeSwitch}
				onChange={handleOnChangeAdminMode}
				checkedChildren="Admin Mode"
				unCheckedChildren="User Mode"
			/>
		</Row>
	);
};

export default Navigation;
