import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import React, {useEffect, useState} from "react";
import {useAuth} from "@/context/ContextProvider.tsx";
import type {TypeInventory} from "@/lib/constants.ts";

interface Props {
	type?: TypeInventory;
	setFormTypes?: React.Dispatch<React.SetStateAction<TypeInventory | undefined>>;
}

function AddType({type, setFormTypes}: Props){

	const {types} = useAuth();
	const [id] = useState(type?.id || types.length + 1);
	const [typeName, setChangeType] = useState<string>(type?.typeName || "");
	const [descriptionType, setDescriptionType] = useState<string>(type?.description || "");

	useEffect(() => {
		if (setFormTypes) {
			setFormTypes({id, typeName, description: descriptionType,});
		}
	}, [ id, typeName, descriptionType, setFormTypes])

	return (
		<div className="flex flex-col gap-5 mt-5">
			<div className="flex flex-row justify-between gap-4">
				<Label htmlFor="typeName" className="text-base">
					Название типа
				</Label>
				<Input
					placeholder="Введите название типа"
					value={typeName}
					className="w-7/10 h-11"
					onChange={(e) => setChangeType(e.target.value)}
				/>
			</div>

			<div className="flex flex-row justify-between gap-4">
				<Label htmlFor="description" className="text-base">
					Описание
				</Label>
				<Input
					placeholder="Введите описание"
					className="w-7/10 h-11"
					value={descriptionType}
					onChange={(e) => setDescriptionType(e.target.value)}
				/>
			</div>
		</div>
	)
}
export default AddType;