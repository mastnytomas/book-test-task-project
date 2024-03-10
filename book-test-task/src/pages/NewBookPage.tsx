import Title from "antd/es/typography/Title";
import NewBookForm from "../components/forms/NewBookForm";
import useAdminStore from "../zustand/adminStore";

const NewBookPage = () => {
	const { isAdminMode } = useAdminStore();
	return (
		<>
			<Title level={2} style={{ textAlign: "center" }}>
				Create new book
			</Title>
			{isAdminMode ? (
				<NewBookForm />
			) : (
				<Title level={4} style={{ textAlign: "center" }}>
					Need to be in admin mode to create a new book
				</Title>
			)}
		</>
	);
};

export default NewBookPage;
