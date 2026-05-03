import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
	connectionString: process.env.DIRECT_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
	console.log("Seeding...");

	// ROLES
	await prisma.role.createMany({
		data: [
			{ id: 1, name: "Администратор", description: "Полный доступ" },
			{ id: 2, name: "Техник", description: "Работа с оборудованием" },
			{ id: 3, name: "Менеджер", description: "Работа с заказами" },
		],
		skipDuplicates: true,
	});

	// TYPES
	await prisma.typeInventory.createMany({
		data: [
			{ id: 1, typeName: "Ноутбук", description: "Переносной ПК" },
			{ id: 2, typeName: "Принтер", description: "Печать" },
			{ id: 3, typeName: "Монитор", description: "Экран" },
			{ id: 4, typeName: "Сервер", description: "Серверное оборудование" },
			{ id: 5, typeName: "Телефон", description: "Связь" },
		],
		skipDuplicates: true,
	});

	// USERS
	await prisma.user.createMany({
		data: [
			{ id: 1, fullName: "Иванов Иван", email: "ivanov@mail.ru", phone: "+79000000001", status: "Активен", roleId: 1 },
			{ id: 2, fullName: "Петров Петр", email: "petrov@mail.ru", phone: "+79000000002", status: "Активен", roleId: 2 },
			{ id: 3, fullName: "Сидорова Анна", email: "anna@mail.ru", phone: "+79000000003", status: "Активен", roleId: 2 },
			{ id: 4, fullName: "Кузнецов Алексей", email: "alex@mail.ru", phone: "+79000000004", status: "Активен", roleId: 3 },
			{ id: 5, fullName: "Морозова Ольга", email: "olga@mail.ru", phone: "+79000000005", status: "Активен", roleId: 3 },
			{ id: 6, fullName: "Смирнов Дима", email: "dima@mail.ru", phone: "+79000000006", status: "Активен", roleId: 2 },
			{ id: 7, fullName: "Орлов Максим", email: "max@mail.ru", phone: "+79000000007", status: "Активен", roleId: 2 },
			{ id: 8, fullName: "Белова Юлия", email: "julia@mail.ru", phone: "+79000000008", status: "Активен", roleId: 3 },
		],
		skipDuplicates: true,
	});

	// SUPPLIERS
	await prisma.supplier.createMany({
		data: [
			{ id: 1, companyName: "TechSupply", contactPerson: "Иван", contactNumber: "+79001111111", email: "tech@mail.ru", contractType: "Активный", contractDate: "2023-01-01" },
			{ id: 2, companyName: "Digital Trade", contactPerson: "Петр", contactNumber: "+79002222222", email: "digital@mail.ru", contractType: "Активный", contractDate: "2023-02-01" },
			{ id: 3, companyName: "IT World", contactPerson: "Анна", contactNumber: "+79003333333", email: "it@mail.ru", contractType: "Активный", contractDate: "2023-03-01" },
			{ id: 4, companyName: "SoftLine", contactPerson: "Алексей", contactNumber: "+79004444444", email: "soft@mail.ru", contractType: "Активный", contractDate: "2023-04-01" },
			{ id: 5, companyName: "OfficeTech", contactPerson: "Ольга", contactNumber: "+79005555555", email: "office@mail.ru", contractType: "Активный", contractDate: "2023-05-01" },
		],
		skipDuplicates: true,
	});

	// INVENTORY
	const inventoryData = Array.from({ length: 20 }).map((_, i) => ({
		id: i + 1,
		name: `Оборудование ${i + 1}`,
		inventNumber: `INV-${100 + i}`,
		serialNumber: `SN-${100000 + i}`,
		expiryDate: "2026-12-31",
		status: ["В эксплуатации", "В ремонте", "На складе"][i % 3],
		userId: (i % 8) + 1,
		typeId: (i % 5) + 1,
	}));

	await prisma.inventory.createMany({
		data: inventoryData,
		skipDuplicates: true,
	});

	// ORDERS
	const orderData = Array.from({ length: 15 }).map((_, i) => ({
		purchaseNumber: `ZK-${100 + i}`,
		supplier: ["TechSupply", "Digital Trade", "IT World"][i % 3],
		expireDate: "2024-12-31",
		positionNumber: Math.floor(Math.random() * 10) + 1,
		sum: Math.floor(Math.random() * 500000) + 50000,
		status: ["Подтвержден", "В обработке", "Завершен"][i % 3],
	}));

	await prisma.order.createMany({
		data: orderData,
		skipDuplicates: true,
	});

	await prisma.role.createMany({
		data: [
			{
				id: 1,
				name: "Администратор",
				description: "Полный доступ",
				permissions: [
					"users.read",
					"users.create",
					"users.update",
					"users.delete",
					"inventory.read",
					"inventory.create",
					"inventory.update",
					"inventory.delete",
					"orders.read",
					"orders.create",
					"orders.update",
					"orders.delete",
					"suppliers.read",
					"suppliers.create",
					"suppliers.update",
					"suppliers.delete",
				],
			},
			{
				id: 2,
				name: "Техник",
				description: "Работа с оборудованием",
				permissions: [
					"inventory.read",
					"inventory.create",
					"inventory.update",
					"orders.read",
				],
			},
			{
				id: 3,
				name: "Менеджер",
				description: "Работа с заказами",
				permissions: [
					"orders.read",
					"orders.create",
					"orders.update",
					"suppliers.read",
				],
			},
		],
		skipDuplicates: true,
	});
	console.log("Seed completed 🚀");
}

main()
	.catch(console.error)
	.finally(async () => {
		await prisma.$disconnect();
	});