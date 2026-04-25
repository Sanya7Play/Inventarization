import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { type Product, statusProduct } from "@/lib/constants.ts";
import { useAuth } from "@/context/ContextProvider.tsx";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface InventoryComponentProps {
	product?: Product;
	setFormProduct: React.Dispatch<React.SetStateAction<Product | undefined>>;
}

function InventoryComponent({ product, setFormProduct }: InventoryComponentProps) {
	const { productDashboards, users, types } = useAuth();

	const [id] = useState<number>(product?.id || productDashboards.length + 1);
	const [name, setName] = useState<string>(product?.name || "");
	const [inventNumber, setInventNumber] = useState<string>(product?.inventNumber || "");
	const [type_id, setType] = useState<number>(product?.type_id || types[0]?.id || 1);
	const [serialNumber, setSerialNumber] = useState<string>(product?.serialNumber || "");
	const [user_id, setResponsible] = useState<number>(product?.user_id || 1);
	const [expiryDate, setExpireDate] = useState<string>(product?.expiryDate || "");
	const [status, setStatus] = useState<string>(product?.status || "");

	const [image, setImage] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string>(product?.img || "");
	const [imageUrl, setImageUrl] = useState<string>(product?.img || "");

	const handleInputImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] ?? null;
		setImage(file);

		if (file) {
			const previewUrl = URL.createObjectURL(file);
			setImagePreview(previewUrl);
		}
	};

	const uploadImage = async (): Promise<string | null> => {
		if (!image) return imageUrl || null;

		try {
			const formData = new FormData();
			formData.append("file", image);

			const response = await axios.post(
				"https://d05b239fd7c26df7.mokky.dev/uploads",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			const uploadedUrl = response.data.url;
			setImageUrl(uploadedUrl);
			console.log(uploadedUrl);
			return uploadedUrl;
		} catch (error) {
			console.error("Ошибка загрузки изображения:", error);
			return null;
		}
	};

	useEffect(() => {
		setFormProduct({
			id,
			name,
			inventNumber,
			type_id,
			serialNumber,
			user_id,
			expiryDate,
			status,
			img: imageUrl,
		});
	}, [
		id,
		name,
		inventNumber,
		type_id,
		serialNumber,
		user_id,
		expiryDate,
		status,
		imageUrl,
		setFormProduct,
	]);

	return (
		<>
			<div className="flex flex-row gap-5 items-center justify-center" key={product?.id}>
				<div className="border-2 border-muted-foreground/30 border-dashed w-30 h-30 rounded-lg overflow-hidden flex items-center justify-center">
					{imagePreview ? (
						<img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
					) : null}
				</div>

				<div className="flex flex-col items-center justify-center">
					<span className="text-muted-foreground text-sm">Перетащите изображение сюда</span>
					<p className="text-muted-foreground text-sm">или</p>
					<div className="flex items-center justify-center">
						<Input
							type="file"
							className="text-blue-600 cursor-pointer text-sm border-0 w-3/4"
							accept="image/*"
							onChange={handleInputImage}
						/>
					</div>
				</div>
			</div>
			<div className="flex justify-end">
				<button
					type="button"
					onClick={() => void uploadImage()}
					className="px-4 py-2 bg-blue-500 text-white rounded-md"
				>
					Загрузить изображение
				</button>
			</div>

			<div className="flex flex-col gap-5 mt-5">
				<div className="flex flex-row justify-between">
					<Label htmlFor="name" className="text-base">Наименование</Label>
					<Input
						onChange={(e) => setName(e.target.value)}
						placeholder="Введите наименование"
						className="w-6/10 h-11"
						value={name}
					/>
				</div>

				<div className="flex flex-row justify-between">
					<Label htmlFor="id" className="text-base">Инвентарный номер</Label>
					<Input
						onChange={(e) => setInventNumber(e.target.value)}
						placeholder="Введите инвентарный номер"
						className="w-6/10 h-11"
						value={inventNumber}
					/>
				</div>

				<div className="flex flex-row justify-between">
					<Label htmlFor="category" className="text-base">Тип</Label>
					<select
						onChange={(e) => setType(Number(e.target.value))}
						value={type_id}
						className="w-6/10 h-11 text-sm border-1 border-muted-foreground/20 rounded-lg"
					>
						<option value="" disabled>Выберите тип</option>
						{types.map((item) => (
							<option key={item.id} className="text-sm" value={item.id}>
								{item.typeName}
							</option>
						))}
					</select>
				</div>

				<div className="flex flex-row justify-between">
					<Label htmlFor="price" className="text-base">Серийный номер</Label>
					<Input
						onChange={(e) => setSerialNumber(e.target.value)}
						placeholder="Введите серийный номер"
						className="w-6/10 h-11"
						value={serialNumber}
					/>
				</div>

				<div className="flex flex-row justify-between">
					<Label htmlFor="quantity" className="text-base">Ответственный</Label>
					<select
						onChange={(e) => setResponsible(Number(e.target.value))}
						value={user_id}
						className="w-6/10 h-11 text-sm border-1 border-muted-foreground/20 rounded-lg"
					>
						<option value="" disabled>Выберите ответственного</option>
						{users.map((item) => (
							<option key={item.id} className="text-sm" value={item.id}>
								{item.fullName}
							</option>
						))}
					</select>
				</div>

				<div className="flex flex-row justify-between">
					<Label htmlFor="unit" className="text-base">Дата добавления</Label>
					<Input
						onChange={(e) => setExpireDate(e.target.value)}
						type="date"
						className="w-6/10 h-11"
						value={expiryDate}
					/>
				</div>

				<div className="flex flex-row justify-between">
					<Label htmlFor="date" className="text-base">Статус</Label>
					<select
						onChange={(e) => setStatus(e.target.value)}
						value={status}
						className="w-6/10 h-11 text-sm border-1 border-muted-foreground/20 rounded-lg"
					>
						<option value="" disabled>Выберите статус</option>
						{statusProduct.map((item) => (
							<option key={item} className="text-sm" value={item}>
								{item}
							</option>
						))}
					</select>
				</div>
			</div>
		</>
	);
}

export default InventoryComponent;