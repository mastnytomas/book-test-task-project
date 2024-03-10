import { Layout as LayoutAntd } from "antd";
import { useEffect } from "react";
import useBooksStore from "../zustand/booksStore";
import Navigation from "./Navigation";
import Router from "./Router";

const { Header, Content } = LayoutAntd;

const Layout = () => {
	const { database, loadDatabase } = useBooksStore();

	useEffect(() => {
		if (!database) {
			loadDatabase();
		}
	}, [database, loadDatabase]);

	return (
		<LayoutAntd className="layout">
			<Header>
				<Navigation />
			</Header>
			<Content style={{ padding: "0 50px" }}>
				<Router />
			</Content>
		</LayoutAntd>
	);
};

export default Layout;
