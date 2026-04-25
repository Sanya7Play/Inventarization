import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import type { RoleStat, RoleWithUsers, TypeInventory } from "@/lib/constants.ts";
import AddRole from "@/components/AddRole.tsx";
import React from "react";
import {useAuth} from "@/context/ContextProvider.tsx";
import AddType from "@/components/AddType.tsx";
import {supabase} from "@/supabase.ts";

interface IProps {
	type?: TypeInventory;
	role?: RoleStat;
	formRoles?: RoleWithUsers | undefined;
	formTypes?: TypeInventory | undefined;
	setFormRoles?: React.Dispatch<React.SetStateAction<RoleWithUsers | undefined>>;
	setFormTypes?: React.Dispatch<React.SetStateAction<TypeInventory | undefined>>;
	children?: React.ReactNode;
}

function EditDialogWindow({
							  children,
							  role,
							  formRoles,
							  formTypes,
							  setFormRoles,
							  type,
							  setFormTypes,
						  }: IProps) {
	const {fetchData} = useAuth();
	const submitButton = async () => {
		try {
			// изменить тип
			if (type && formTypes) {
				const { error } = await supabase
					.from("types")
					.update({
						typeName: formTypes.typeName,
						description: formTypes.description,
					})
					.eq("id", type.id);

				if (error) throw error;

				await fetchData();
				return;
			}

			// создать тип
			if (!type && formTypes) {
				const { error } = await supabase
					.from("types")
					.insert({
						typeName: formTypes.typeName,
						description: formTypes.description,
					});

				if (error) throw error;

				await fetchData();
				return;
			}

			// изменить роль
			if (role && formRoles) {
				const { error } = await supabase
					.from("roles")
					.update({
						name: formRoles.name,
						description: formRoles.description,
					})
					.eq("id", role.id);

				if (error) throw error;

				await fetchData();
				return;
			}

			// создать роль
			if (!role && formRoles) {
				const { error } = await supabase
					.from("roles")
					.insert({
						name: formRoles.name,
						description: formRoles.description,
					});

				if (error) throw error;

				await fetchData();
			}
		} catch (error) {
			console.error("Ошибка при сохранении:", error);
		}
	};

	return (
		<Dialog>
			<form>
				<DialogTrigger asChild>{children}</DialogTrigger>
				<DialogContent className="sm:max-w-lg">
					<DialogHeader>
						<DialogTitle>{role?.name || type?.typeName || "Редактирование"}</DialogTitle>
						<DialogDescription />
					</DialogHeader>
					{type ? (
						<AddType
							type={type}
							setFormTypes={setFormTypes}
						/>
					) : (
						<AddRole
							role={role}
							setFormRoles={setFormRoles}
						/>
					)}


					<DialogFooter className="mt-5 sm:mt-6">
						<DialogClose asChild>
							<Button variant="outline" className="cursor-pointer border text-sm">
								Закрыть
							</Button>
						</DialogClose>

						<Button
							onClick={(e) => {
								e.preventDefault();
								void submitButton();
							}}
							type="submit"
							variant="outline"
							size="default"
							className="bg-blue-500 text-white cursor-pointer text-sm"
						>
							{role ? "Изменить роль" : "Изменить тип"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
}

export default EditDialogWindow;