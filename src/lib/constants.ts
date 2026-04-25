import {
	Backpack,
	CircleUser,
	DatabaseBackup,
	Home,
	LogOutIcon,
	Package,
	Settings, ShoppingBag,
	User, UserKey,
} from "lucide-react";

export interface RoleStat {
	id: number;
	name: string;
	description: string | null;
}

export interface User {
	id: number;
	fullName: string;
	email: string;
	phone: string | null;
	roleId: number | null;
	status: "Активен" | "Заблокирован";
	createdAt: string;
}

export type TypeInventory = {
	id: number;
	typeName: string;
	description: string | null;
};

export interface RoleWithUsers extends RoleStat {
	users?: User[];
	user?: User; // оставь пока, чтобы старый UI не падал
}

export interface UserWithRole extends User {
	role?: RoleStat | null;
}

export type Product = {
	id: number;
	name: string;
	img: string | null;
	inventNumber: string | null;
	typeId: number | null;
	serialNumber: string | null;
	userId: number | null;
	expiryDate: string | null;
	status: string;
};

export interface ProductWithUser extends Product {
	user?: User | null;
	type?: TypeInventory | null;
}

export type Supplier = {
	id: number;
	companyName: string;
	contactPerson: string | null;
	contactNumber: string | null;
	email: string | null;
	contractType: string | null;
	contractDate: string | null;
};

export type Order = {
	id: number;
	purchaseNumber: string;
	supplier: string | null;
	expireDate: string | null;
	positionNumber: number | null;
	sum: number | null;
	status: string;
};

export type BackupRecord = {
	id: number;
	name: string;
	createdAt: string;
	size: string | null;
	type: string | null;
	data: {
		products: ProductWithUser[];
		orders: Order[];
		suppliers: Supplier[];
		users: UserWithRole[];
		roles: RoleWithUsers[];
		types: TypeInventory[];
	};
};
export const statusOrder = ['Подтвержден', 'Завершен', 'В обработке', 'Отменен'];
export const statusContract = ['Активный', 'Закрыт'];
export const statusProduct = ['В эксплуатации', 'В ремонте', 'На складе'];
export const statusUser = ['Активен', 'Заблокирован'];
export const buttonsMenu = [
	{
		name: 'Главная',
		icon: Home,
		link: '/',
	},
	{
		name: 'Оборудование',
		icon: Backpack,
		link: '/inventory',
	},
	{
		name: 'Поставщики',
		icon: CircleUser,
		link: '/suppliers',
	},
	{
		name: 'Заказы',
		icon: Package,
		link: '/orders',
	},
	{
		name: 'Настройки',
		icon: Settings,
		link: '/settings',
	},
	{
		name: 'Выход',
		icon: LogOutIcon,
		action: "logout",
	}
]
export const menuButtons = [
	{ name: "Пользователи", icon: User, link: "/settings/users" },
	{ name: "Роли и права", icon: UserKey, link: "/settings/role" },
	{ name: "Типы оборудования", icon: ShoppingBag, link: "/settings/types" },
	{ name: "Резервное копирование", icon: DatabaseBackup, link: "/settings/backup" },
];
export const filterLinks = ['по возрастанию','по имени', 'по типу', 'по пользователю'];