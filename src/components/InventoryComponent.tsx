import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { type ProductWithUser, statusProduct } from "@/lib/constants.ts";
import { useAuth } from "@/context/ContextProvider.tsx";
import React, { useEffect, useState } from "react";

interface InventoryComponentProps {
	product?: ProductWithUser;
	setFormProduct: React.Dispatch<React.SetStateAction<ProductWithUser | undefined>>;
}

function InventoryComponent({ product, setFormProduct }: InventoryComponentProps) {
	const { users, types } = useAuth();

	const [name, setName] = useState(product?.name ?? "");
	const [inventNumber, setInventNumber] = useState(product?.inventNumber ?? "");
	const [typeId, setTypeId] = useState(product?.typeId ?? product?.type?.id ?? null);
	const [serialNumber, setSerialNumber] = useState(product?.serialNumber ?? "");
	const [userId, setUserId] = useState(product?.userId ?? product?.user?.id ?? null);
	const [expiryDate, setExpiryDate] = useState(product?.expiryDate ?? "");
	const [status, setStatus] = useState(product?.status ?? "");
	const [img, setImg] = useState(product?.img ?? "");

	useEffect(() => {
		setFormProduct({
			...(product ? { id: product.id } : {}),
			name,
			inventNumber,
			typeId,
			serialNumber,
			userId,
			expiryDate,
			status,
			img,
			user: users.find((u) => u.id === userId) ?? null,
			type: types.find((t) => t.id === typeId) ?? null,
		} as ProductWithUser);
	}, [
		product,
		name,
		inventNumber,
		typeId,
		serialNumber,
		userId,
		expiryDate,
		status,
		img,
		users,
		types,
		setFormProduct,
	]);

	return (
		<div className="flex flex-col gap-5 mt-5">
			<div className="flex flex-row justify-between">
				<Label className="text-base">Наименование</Label>
				<Input className="w-6/10 h-11" value={name} onChange={(e) => setName(e.target.value)} />
			</div>

			<div className="flex flex-row justify-between">
				<Label className="text-base">Инвентарный номер</Label>
				<Input className="w-6/10 h-11" value={inventNumber ?? ""} onChange={(e) => setInventNumber(e.target.value)} />
			</div>

			<div className="flex flex-row justify-between">
				<Label className="text-base">Тип</Label>
				<select className="w-6/10 h-11 border rounded-lg" value={typeId ?? ""} onChange={(e) => setTypeId(Number(e.target.value))}>
					<option value="" disabled>Выберите тип</option>
					{types.map((item) => (
						<option key={item.id} value={item.id}>{item.typeName}</option>
					))}
				</select>
			</div>

			<div className="flex flex-row justify-between">
				<Label className="text-base">Серийный номер</Label>
				<Input className="w-6/10 h-11" value={serialNumber ?? ""} onChange={(e) => setSerialNumber(e.target.value)} />
			</div>

			<div className="flex flex-row justify-between">
				<Label className="text-base">Ответственный</Label>
				<select className="w-6/10 h-11 border rounded-lg" value={userId ?? ""} onChange={(e) => setUserId(Number(e.target.value))}>
					<option value="" disabled>Выберите ответственного</option>
					{users.map((item) => (
						<option key={item.id} value={item.id}>{item.fullName}</option>
					))}
				</select>
			</div>

			<div className="flex flex-row justify-between">
				<Label className="text-base">Дата добавления</Label>
				<Input type="date" className="w-6/10 h-11" value={expiryDate ?? ""} onChange={(e) => setExpiryDate(e.target.value)} />
			</div>

			<div className="flex flex-row justify-between">
				<Label className="text-base">Статус</Label>
				<select className="w-6/10 h-11 border rounded-lg" value={status} onChange={(e) => setStatus(e.target.value)}>
					<option value="" disabled>Выберите статус</option>
					{statusProduct.map((item) => (
						<option key={item} value={item}>{item}</option>
					))}
				</select>
			</div>

			<div className="flex flex-row justify-between">
				<Label className="text-base">URL изображения</Label>
				<Input className="w-6/10 h-11" value={img ?? ""} onChange={(e) => setImg(e.target.value)} />
			</div>
		</div>
	);
}

export default InventoryComponent;