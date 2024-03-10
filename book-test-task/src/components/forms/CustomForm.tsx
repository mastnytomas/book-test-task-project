import {
	Button,
	Col,
	Form,
	Image,
	Input,
	InputNumber,
	Row,
	Select,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { FormConfig, FormField } from "../../types/types";

const { Option } = Select;

const CustomForm: React.FC<FormConfig> = ({ fields, onSubmit }) => {
	const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
	const [form] = Form.useForm();
	const renderField = (field: FormField) => {
		const handleInputImgChange = async (
			e: React.ChangeEvent<HTMLInputElement>
		) => {
			const { value } = e.target;
			try {
				const response = await fetch(value);
				if (response.status === 200 && value.includes("http")) {
					setImageUrl(value);
				} else {
					setImageUrl(undefined);
				}
			} catch (error) {
				setImageUrl(undefined);
			}
		};
		return (
			<Form.Item
				key={field.name}
				label={field.label}
				name={field.name}
				required={field.required}
				rules={[
					{ required: field.required, message: `Please input ${field.label}!` },
				]}
			>
				{field.type === "number" && (
					<InputNumber
						placeholder={field.placeholder}
						style={{ width: "100%" }}
					/>
				)}
				{field.type === "input" && <Input placeholder={field.placeholder} />}
				{field.type === "textarea" && (
					<TextArea placeholder={field.placeholder} />
				)}
				{field.type === "inputImage" && (
					<Row gutter={8} align="middle">
						<Col>
							{imageUrl && <Image src={imageUrl} width={30} height={30} />}{" "}
						</Col>
						<Col flex="auto">
							<Input
								placeholder={field.placeholder}
								onChange={handleInputImgChange}
							/>
						</Col>
					</Row>
				)}
				{field.type === "selection" && (
					<Select placeholder={field.placeholder}>
						{field.options?.map((option) => (
							<Option key={option.value} value={option.value}>
								{option.label}
							</Option>
						))}
					</Select>
				)}
			</Form.Item>
		);
	};

	return (
		<Form form={form} onFinish={onSubmit}>
			{fields.map(renderField)}
			<Form.Item>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
};

export default CustomForm;
