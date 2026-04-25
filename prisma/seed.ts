import "dotenv/config";
import {PrismaClient} from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
	connectionString: process.env.DIRECT_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
	console.log("Seeding...");

	// 1. Roles
	await prisma.role.createMany({
		data: [
			{ id: 1, name: "Администратор", description: "Полный доступ к системе" },
			{ id: 2, name: "Техник", description: "Просмотр" },
		],
		skipDuplicates: true,
	});

	// 2. Types
	await prisma.typeInventory.createMany({
		data: [
			{ id: 1, typeName: "Ноутбук", description: "Переносной компьютер" },
			{ id: 2, typeName: "Принтер", description: "Печать и тд" },
		],
		skipDuplicates: true,
	});

	// 3. Users
	await prisma.user.createMany({
		data: [
			{
				id: 1,
				fullName: "Иванов И.И",
				email: "ivanov@company.ru",
				phone: "+79001234567",
				status: "Активен",
				roleId: 1,
			},
			{
				id: 2,
				fullName: "Сидорова А.А.",
				email: "sidorova@company.ru",
				phone: "+79005556677",
				status: "Активен",
				roleId: 2,
			},
			{
				id: 3,
				fullName: "Кузнецов А.А.",
				email: "kuznetsov@company.ru",
				phone: "+79003334455",
				status: "Активен",
			},
		],
		skipDuplicates: true,
	});

	// 4. Inventory (products)
	await prisma.inventory.createMany({
		data: [
			{
				id: 1,
				name: "Dell Latitude 5042",
				inventNumber: "INV-001",
				serialNumber: "SN-1000001",
				expiryDate: "2026-03-05",
				status: "В эксплуатации",
				userId: 1,
				typeId: 1,
			},
			{
				id: 2,
				name: "Lenovo ThinkPad T14",
				inventNumber: "INV-003",
				serialNumber: "SN-1000003",
				expiryDate: "05.09.2024",
				status: "В эксплуатации",
				userId: 2,
				typeId: 1,
			},
			{
				id: 3,
				name: "HP LaserJet Pro M404",
				inventNumber: "INV-004",
				serialNumber: "SN-1000004",
				expiryDate: "11.01.2023",
				status: "В ремонте",
				img: "http://mokky.dev/uploaded/dfnhxiq6j/image/upload/v1774282622/file_fb93vi.jpg",
				userId: 1,
				typeId: 1,
			},
			{
				id: 4,
				name: "gfdgfd",
				inventNumber: "fhgdfh",
				serialNumber: "hfdhdfhdf",
				expiryDate: "2026-03-05",
				status: "В эксплуатации",
				img: "http://mokky.dev/uploaded/dfnhxiq6j/image/upload/v1774282644/file_jmvssq.jpg",
				userId: 1,
				typeId: 1,
			},
			{
				id: 5,
				name: "jhjkgh",
				inventNumber: "kjhkjhk",
				serialNumber: "jkjhkhj",
				expiryDate: "2026-02-26",
				status: "В эксплуатации",
				userId: 1,
				typeId: 2,
			},
		],
		skipDuplicates: true,
	});

	// 5. Suppliers
	await prisma.supplier.createMany({
		data: [
			{
				id: 1,
				companyName: "ООО Созвездие",
				contactPerson: "Ваня Бондарь",
				contactNumber: "+79103223232",
				email: "medved2230@gmail.com",
				contractType: "Активный",
				contractDate: "12-12-2012",
			},
		],
		skipDuplicates: true,
	});

	// 6. Orders (частично, чтобы не перегружать)
	await prisma.order.createMany({
		data: [
			{
				purchaseNumber: "ZK-001",
				supplier: "ООО Созвездие",
				expireDate: "12.03.2024",
				positionNumber: 5,
				sum: 250000,
				status: "Подтвержден",
			},
			{
				purchaseNumber: "ZK-002",
				supplier: "Digital Trade",
				expireDate: "20.03.2024",
				positionNumber: 3,
				sum: 120000,
				status: "В обработке",
			},
			{
				purchaseNumber: "ZK-003",
				supplier: "IT Supply",
				expireDate: "01.04.2024",
				positionNumber: 7,
				sum: 315000,
				status: "Подтвержден",
			},
		],
		skipDuplicates: true,
	});

	console.log("Seed completed 🚀");
}

main()
	.catch((e) => {
		console.error(e);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});