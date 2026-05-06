import React, {
	createContext,
	useContext,
	useState,
	type ReactNode,
	useEffect,
	useCallback,
	useMemo,
} from "react";
import type {
	BackupRecord, Equipment,
	Order,
	Product,
	ProductWithUser,
	RoleStat,
	RoleWithUsers,
	Supplier,
	TypeInventory,
	UserWithRole,
} from "@/lib/constants.ts";
import { Edit, X } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import AddDialogWindow from "@/components/AddDialogWindow.tsx";
import EditDialogWindow from "@/components/EditDialog.tsx";
import DeleteDialogWindow from "@/components/DeleteDialogWindow.tsx";
import {supabase} from "@/supabase.ts";
type Column<T> = {
	title: string;
	render: (row: T) => React.ReactNode;
};

type GlobalSearchItem = {
	id: string | number;
	type: "product" | "order" | "user" | "supplier";
	title: string;
	subtitle?: string;
	path: string;
};

type AuthContextType = {
	can: (permission: string) => boolean;
	isAuth: boolean;
	login: (email: string, password: string, remember?: boolean) => Promise<void>;
	logout: () => Promise<void>;
	authUser: UserWithRole | null;

	register: (
		fullName: string,
		email: string,
		password: string,
		remember?: boolean
	) => Promise<void>;
	products: ProductWithUser[];
	suppliers: Supplier[];
	orders: Order[];
	users: UserWithRole[];
	roles: RoleWithUsers[];
	types: TypeInventory[];

	productColumns: Column<ProductWithUser>[];
	supplierColumns: Column<Supplier>[];
	orderColumns: Column<Order>[];
	userColumns: Column<UserWithRole>[];
	roleColumns: Column<RoleStat>[];
	typeColumns: Column<TypeInventory>[];

	open: boolean;
	setOpen: (open: boolean) => void;

	totalCountProductsDashboard: string[];
	topSellingCount: number;
	stocksNumber: number;
	topOrdersCategories: number;
	topCountCompleted: number;
	stocksNumberProcessing: number;
	onInventory: number;
	countCanceled: number;

	productDashboards: Product[];
	ordersDashboards: Order[];
	supplierDashboard: Supplier[];
	usersDashboard: UserWithRole[];

	formTypes: TypeInventory | undefined;
	setFormTypes: React.Dispatch<React.SetStateAction<TypeInventory | undefined>>;

	fetchData: () => Promise<void>;

	setInventorySort: React.Dispatch<React.SetStateAction<string>>;
	setSuppliersSort: React.Dispatch<React.SetStateAction<string>>;
	setOrdersSort: React.Dispatch<React.SetStateAction<string>>;
	setUsersSort: React.Dispatch<React.SetStateAction<string>>;
	setRolesSort: React.Dispatch<React.SetStateAction<string>>;

	globalSearchResults: GlobalSearchItem[];
	searchQuery: string;
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;

	setProducts: React.Dispatch<React.SetStateAction<ProductWithUser[]>>;
	setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
	setSuppliers: React.Dispatch<React.SetStateAction<Supplier[]>>;
	setUsers: React.Dispatch<React.SetStateAction<UserWithRole[]>>;
	setRoles: React.Dispatch<React.SetStateAction<RoleWithUsers[]>>;
	setTypes: React.Dispatch<React.SetStateAction<TypeInventory[]>>;


	backups: BackupRecord[];
	fetchBackups: () => Promise<void>;
	createBackup: () => Promise<BackupRecord>;
	restoreBackupByFile: (file: File) => Promise<void>;
	restoreBackupById: (id: number) => Promise<void>;
	deleteBackup: (id: number) => Promise<void>;
	downloadBackupById: (id: number) => Promise<void>;
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	equipment: Equipment[] | null;
	setEquipment: React.Dispatch<React.SetStateAction<Equipment[]>>;
	dot: boolean;
	setDot: React.Dispatch<React.SetStateAction<boolean>>;

};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [isAuth, setIsAuth] = useState(false);
	const [authUser, setAuthUser] = useState<UserWithRole | null>(null);
	const [products, setProducts] = useState<ProductWithUser[]>([]);
	const [orders, setOrders] = useState<Order[]>([]);
	const [suppliers, setSuppliers] = useState<Supplier[]>([]);
	const [users, setUsers] = useState<UserWithRole[]>([]);
	const [roles, setRoles] = useState<RoleWithUsers[]>([]);
	const [types, setTypes] = useState<TypeInventory[]>([]);
	const [backups, setBackups] = useState<BackupRecord[]>([]);

	const [productDashboards, setProductDashboards] = useState<Product[]>([]);
	const [ordersDashboards, setOrdersDashboards] = useState<Order[]>([]);
	const [supplierDashboard, setSupplierDashboards] = useState<Supplier[]>([]);
	const [usersDashboard, setUsersDashboards] = useState<UserWithRole[]>([]);

	const [open, setOpen] = useState(false);

	const [inventorySort, setInventorySort] = useState("id");
	const [suppliersSort, setSuppliersSort] = useState("id");
	const [ordersSort, setOrdersSort] = useState("id");
	const [usersSort, setUsersSort] = useState("id");
	const [rolesSort, setRolesSort] = useState("id");

	const [searchQuery, setSearchQuery] = useState("");
	const [formTypes, setFormTypes] = useState<TypeInventory | undefined>();
	const [loading, setLoading] = useState(true);
	const [equipment, setEquipment] = useState<Equipment[]>([]);
	const [dot, setDot] = useState<boolean>(false);


	useEffect(() => {
		const initAuth = async () => {
			const { data } = await supabase.auth.getSession();

			const session = data.session;

			if (!session?.user) {
				setLoading(false);
				return;
			}

			const email = session.user.email;

			const { data: user, error } = await supabase
				.from("users")
				.select("*, role:roles(*)")
				.eq("email", email)
				.single();

			if (error) {
				console.error(error);
				return;
			}

			setAuthUser(user);
			setIsAuth(true);
			setLoading(false);
		};

		initAuth();
	}, []);

	useEffect(() => {
		const { data: listener } = supabase.auth.onAuthStateChange(
			async (_event, session) => {
				if (!session?.user) {
					setIsAuth(false);
					setAuthUser(null);
					return;
				}

				const { data: user } = await supabase
					.from("users")
					.select("*, role:roles(*)")
					.eq("email", session.user.email)
					.single();

				setAuthUser(user);
				setIsAuth(true);
			}
		);

		return () => {
			listener.subscription.unsubscribe();
		};
	}, []);

	const can = useCallback(
		(permission: string) => {
			return authUser?.role?.permissions?.includes(permission) ?? false;
		},
		[authUser]

	);
	const login = async (email: string, password: string) => {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			throw new Error("Неверный email или пароль");
		}

		const { data: userProfile, error: profileError } = await supabase
			.from("users")
			.select("*, role:roles(*)")
			.eq("email", data.user.email)
			.single();

		if (profileError) {
			throw new Error("Профиль пользователя не найден");
		}

		setIsAuth(true);
		setAuthUser(userProfile);
	};
	const register = async (
		fullName: string,
		email: string,
		password: string,
	) => {
		const { data: authData, error: authError } = await supabase.auth.signUp({
			email,
			password,
		});

		if (authError) {
			throw new Error(authError.message);
		}

		if (!authData.user) {
			throw new Error("Пользователь не создан в Supabase Auth");
		}

		const { data: userProfile, error: profileError } = await supabase
			.from("users")
			.insert({
				fullName,
				email,
				status: "Активен",
				roleId: 4,
			})
			.select("*, role:roles(*)")
			.single();

		if (profileError) {
			throw new Error(profileError.message);
		}

		setIsAuth(true);
		setAuthUser(userProfile);
	};


	const logout = async () => {
		setIsAuth(false);
		setAuthUser(null);
		await supabase.auth.signOut();
	};

	const applyBackupDataToState = useCallback((backupData: Partial<BackupRecord["data"]>) => {
		const nextProducts = Array.isArray(backupData.products) ? backupData.products : [];
		const nextOrders = Array.isArray(backupData.orders) ? backupData.orders : [];
		const nextSuppliers = Array.isArray(backupData.suppliers) ? backupData.suppliers : [];
		const nextUsers = Array.isArray(backupData.users) ? backupData.users : [];
		const nextRoles = Array.isArray(backupData.roles) ? backupData.roles : [];
		const nextTypes = Array.isArray(backupData.types) ? backupData.types : [];

		setProducts(nextProducts as ProductWithUser[]);
		setOrders(nextOrders as Order[]);
		setSuppliers(nextSuppliers as Supplier[]);
		setUsers(nextUsers as UserWithRole[]);
		setRoles(nextRoles as RoleWithUsers[]);
		setTypes(nextTypes as TypeInventory[]);

		setProductDashboards(nextProducts as Product[]);
		setOrdersDashboards(nextOrders);
		setSupplierDashboards(nextSuppliers);
		setUsersDashboards(nextUsers);
	}, []);

	const fetchBackups = useCallback(async (): Promise<void> => {
		try {
			const { data, error } = await supabase
				.from("backups")
				.select("*")
				.order("createdAt", { ascending: false });

			if (error) throw error;

			setBackups(data ?? []);
		} catch (e) {
			console.error("Ошибка при загрузке резервных копий:", e);
		}
	}, []);

	const createBackup = useCallback(async (): Promise<BackupRecord> => {
		const backupData = {
			products,
			orders,
			suppliers,
			users,
			roles,
			types,
		};

		const json = JSON.stringify(backupData, null, 2);
		const size = `${Math.max(1, Math.round(new Blob([json]).size / 1024))} KB`;

		const payload = {
			name: `backup-${new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-")}.json`,
			size,
			type: "Ручная",
			data: backupData,
		};

		const { data, error } = await supabase
			.from("backups")
			.insert(payload)
			.select()
			.single();

		if (error) throw error;

		setBackups((prev) => [data, ...prev]);

		return data;
	}, [products, orders, suppliers, users, roles, types]);

	const restoreBackupByFile = useCallback(
		async (file: File): Promise<void> => {
			const text = await file.text();
			const parsed = JSON.parse(text);

			const backupData = parsed?.data ?? parsed;

			if (!backupData || typeof backupData !== "object") {
				throw new Error("Некорректный backup-файл");
			}

			applyBackupDataToState(backupData);
		},
		[applyBackupDataToState]
	);

	const restoreBackupById = useCallback(
		async (id: number): Promise<void> => {
			const { data, error } = await supabase
				.from("backups")
				.select("*")
				.eq("id", id)
				.single();

			if (error) throw error;

			const backupData = data?.data;

			if (!backupData) {
				throw new Error("Резервная копия не найдена");
			}

			applyBackupDataToState(backupData);
		},
		[applyBackupDataToState]
	);
	const deleteBackup = useCallback(async (id: number): Promise<void> => {
		const { error } = await supabase
			.from("backups")
			.delete()
			.eq("id", id);

		if (error) throw error;

		setBackups((prev) => prev.filter((item) => item.id !== id));
	}, []);

	const downloadBackupById = useCallback(
		async (id: number): Promise<void> => {
			const backup = backups.find((item) => item.id === id);

			if (!backup) {
				throw new Error("Резервная копия не найдена");
			}

			const content = {
				version: 1,
				createdAt: backup.createdAt,
				data: backup.data,
			};

			const json = JSON.stringify(content, null, 2);
			const blob = new Blob([json], { type: "application/json" });
			const url = URL.createObjectURL(blob);

			const link = document.createElement("a");
			link.href = url;
			link.download = backup.name;
			link.click();

			URL.revokeObjectURL(url);
		},
		[backups]
	);


	const totalCountProductsDashboard = [
		...new Set(products.map((product) => product.type?.typeName).filter(Boolean)),
	] as string[];

	const topSellingCount = productDashboards.filter(
		(product) => product.status === "В эксплуатации"
	).length;

	const onInventory = productDashboards.filter(
		(product) => product.status === "На складе"
	).length;

	const stocksNumber = productDashboards.filter(
		(product) => product.status === "В ремонте"
	).length;

	const topOrdersCategories = ordersDashboards.filter(
		(order) => order.status === "Подтвержден"
	).length;

	const topCountCompleted = ordersDashboards.filter(
		(order) => order.status === "Завершен"
	).length;

	const stocksNumberProcessing = ordersDashboards.filter(
		(order) => order.status === "В обработке"
	).length;

	const countCanceled = ordersDashboards.filter(
		(order) => order.status === "Отменен"
	).length;

	const globalSearchResults = useMemo<GlobalSearchItem[]>(() => {
		const query = searchQuery.toLowerCase().trim();
		if (!query) return [];

		return [
			...products
				.filter((p) =>
					[p.name, p.type, p.serialNumber, p.status, p.user?.fullName]
						.filter(Boolean)
						.some((field) => String(field).toLowerCase().includes(query))
				)
				.map((p) => ({
					id: p.id,
					type: "product" as const,
					title: p.name,
					subtitle: `${p.type?.typeName} • ${p.status}`,
					path: `/inventory/${p.id}`,
				})),

			...orders
				.filter((o) =>
					[o.purchaseNumber, o.supplier, o.status, o.expireDate]
						.filter(Boolean)
						.some((field) => String(field).toLowerCase().includes(query))
				)
				.map((o) => ({
					id: o.id,
					type: "order" as const,
					title: `Заказ ${o.purchaseNumber}`,
					subtitle: `${o.supplier} • ${o.status}`,
					path: `/orders/${o.id}`,
				})),

			...users
				.filter((u) =>
					[u.fullName, u.email, u.phone, u.role?.name, u.status]
						.filter(Boolean)
						.some((field) => String(field).toLowerCase().includes(query))
				)
				.map((u) => ({
					id: u.id,
					type: "user" as const,
					title: u.fullName,
					subtitle: `${u.email} • ${u.role?.name ?? "Без роли"}`,
					path: `/users/${u.id}`,
				})),

			...suppliers
				.filter((s) =>
					[
						s.companyName,
						s.contactPerson,
						s.email,
						s.contactNumber,
						s.contractType,
					]
						.filter(Boolean)
						.some((field) => String(field).toLowerCase().includes(query))
				)
				.map((s) => ({
					id: s.id,
					type: "supplier" as const,
					title: s.companyName,
					subtitle: `${s.contactPerson} • ${s.contractType}`,
					path: `/suppliers/${s.id}`,
				})),
		];
	}, [searchQuery, products, orders, users, suppliers]);

	const fetchData = useCallback(async (): Promise<void> => {
		try {
			const inventoryOrder = inventorySort === "typeName" || inventorySort === "userName" ? "id" : inventorySort;
			const [
				productsRes,
				ordersRes,
				usersRes,
				suppliersRes,
				rolesRes,
				typeRes,
			] = await Promise.all([
				supabase
					.from("inventory")
					.select("*, user:users(*), type:types(*)")
					.order(inventoryOrder, { ascending: true }),

				supabase
					.from("orders")
					.select("*")
					.order(ordersSort, { ascending: true }),

				supabase
					.from("users")
					.select("*, role:roles(*)")
					.order(usersSort, { ascending: true }),

				supabase
					.from("suppliers")
					.select("*")
					.order(suppliersSort, { ascending: true }),

				supabase
					.from("roles")
					.select("*, users(*)")
					.order(rolesSort, { ascending: true }),

				supabase
					.from("types")
					.select("*")
					.order("id", { ascending: true }),
			]);

			if (productsRes.error) throw productsRes.error;
			if (ordersRes.error) throw ordersRes.error;
			if (usersRes.error) throw usersRes.error;
			if (suppliersRes.error) throw suppliersRes.error;
			if (rolesRes.error) throw rolesRes.error;
			if (typeRes.error) throw typeRes.error;

			let productsData = productsRes.data ?? [];

			if (inventorySort === "typeName") {
				productsData = [...productsData].sort((a, b) =>
					(a.type?.typeName ?? "").localeCompare(b.type?.typeName ?? "")
				);
			}

			if (inventorySort === "userName") {
				productsData = [...productsData].sort((a, b) =>
					(a.user?.fullName ?? "").localeCompare(b.user?.fullName ?? "")
				);
			}
			const ordersData = ordersRes.data ?? [];
			const usersData = usersRes.data ?? [];
			const suppliersData = suppliersRes.data ?? [];
			const rolesData = rolesRes.data ?? [];
			const typesData = typeRes.data ?? [];

			setProducts(productsData);
			setOrders(ordersData);
			setUsers(usersData);
			setSuppliers(suppliersData);
			setRoles(rolesData);
			setTypes(typesData);

			setProductDashboards(productsData);
			setOrdersDashboards(ordersData);
			setUsersDashboards(usersData);
			setSupplierDashboards(suppliersData);
		} catch (e) {
			console.error("Ошибка при загрузке данных:", e);
		}
	}, [inventorySort, suppliersSort, ordersSort, usersSort, rolesSort]);
	useEffect(() => {
		fetchData();
		fetchBackups();
	}, [fetchData, fetchBackups]);

	const productColumns: Column<ProductWithUser>[] = [
		{ title: "Наименование", render: (p) => p.name },
		{ title: "Инвентарный номер", render: (p) => p.inventNumber },
		{ title: "Тип", render: (p) => p.type?.typeName ?? "-" },
		{ title: "Серийный номер", render: (p) => p.serialNumber },
		{ title: "Ответственный", render: (p) => p.user?.fullName ?? "-" },
		{ title: "Дата добавления", render: (p) => p.expiryDate },
		{
			title: "Статус",
			render: (p) => (
				<span
					className={
						p.status === "В эксплуатации"
							? "text-green-600"
							: p.status === "В ремонте"
								? "text-red-600"
								: "text-yellow-500"
					}
				>
					{p.status}
				</span>
			),
		},
		{
			title: "",
			render: (product) => (
				<div className="flex gap-5" onClick={(e) => e.stopPropagation()}>
					{can("inventory.delete") && (
						<DeleteDialogWindow product={product}>
							<Button
								variant="ghost"
								size="icon"
								className="flex justify-center px-2 py-1 cursor-pointer hover:text-black"
								onClick={(e) => {
									e.stopPropagation();
									console.log("delete product", product);
								}}
							>
								<X className="w-4 h-4" />
							</Button>
						</DeleteDialogWindow>
					)}
				</div>
			),
		},
	];

	const userColumns: Column<UserWithRole>[] = [
		{ title: "ФИО", render: (user) => user.fullName },
		{ title: "Email", render: (user) => user.email },
		{ title: "Телефон", render: (user) => user.phone },
		{ title: "Роль", render: (user) => user.role?.name ?? "-" },
		{
			title: "Статус",
			render: (user) => (
				<span className={user.status === "Активен" ? "text-green-600" : "text-red-600"}>
					{user.status}
				</span>
			),
		},
		{ title: "Дата создания", render: (user) => user.createdAt },
		{
			title: "",
			render: (user) => (
				<div className="flex gap-5" onClick={(e) => e.stopPropagation()}>
					{can("users.update") && (
						<AddDialogWindow title="Редактировать пользователя" user={user}>
							<Button variant="ghost" size="icon" className="flex justify-center px-2 py-1 cursor-pointer hover:text-black">
								<Edit className="w-4 h-4" />
							</Button>
						</AddDialogWindow>
					)}

					{can("users.delete") && (
						<DeleteDialogWindow user={user}>
							<Button variant="ghost" size="icon" className="flex justify-center px-2 py-1 cursor-pointer hover:text-black">
								<X className="w-4 h-4" />
							</Button>
						</DeleteDialogWindow>
					)}
				</div>
			),
		},
	];

	const roleColumns = [
		{ title: "Роль", render: (role: RoleWithUsers) => role.name },
		{ title: "Описание", render: (role: RoleWithUsers) => role.description },
		{ title: "Пользователи", render: (role: RoleWithUsers) => role.users?.length ?? 0 },
		{
			title: "",
			render: (role: RoleStat) => (
				<div className="flex gap-5">
					{can("roles.update") && (
						<EditDialogWindow role={role}>
							<Button variant="ghost" size="icon" className="flex justify-center px-2 py-1 cursor-pointer hover:text-black">
								<Edit className="w-4 h-4" />
							</Button>
						</EditDialogWindow>
					)}

					{can("roles.delete") && (
						<DeleteDialogWindow role={role}>
							<Button variant="ghost" size="icon" className="flex justify-center px-2 py-1 cursor-pointer hover:text-black">
								<X className="w-4 h-4" />
							</Button>
						</DeleteDialogWindow>
					)}
				</div>
			),
		},
	];

	const typeColumns = [
		{ title: "ID", render: (type: TypeInventory) => type.id },
		{ title: "Название", render: (type: TypeInventory) => type.typeName },
		{ title: "Описание", render: (type: TypeInventory) => type.description },
		{
			title: "Действия",
			render: (type: TypeInventory) => (
				<div className="flex gap-5">
					{can("types.update") && (
						<EditDialogWindow type={type} setFormTypes={setFormTypes} formTypes={formTypes}>
							<Button variant="ghost" size="icon" className="flex justify-center px-2 py-1 cursor-pointer hover:text-black">
								<Edit className="w-4 h-4" />
							</Button>
						</EditDialogWindow>
					)}

					{can("types.delete") && (
						<DeleteDialogWindow type={type}>
							<Button variant="ghost" size="icon" className="flex justify-center px-2 py-1 cursor-pointer hover:text-black">
								<X className="w-4 h-4" />
							</Button>
						</DeleteDialogWindow>
					)}
				</div>
			),
		},
	];

	const orderColumns: Column<Order>[] = [
		{ title: "Номер закупки", render: (o) => o.purchaseNumber },
		{ title: "Поставщик", render: (o) => o.supplier },
		{ title: "Дата", render: (o) => o.expireDate },
		{ title: "Количество позиций", render: (o) => o.positionNumber },
		{ title: "Сумма", render: (o) => `${o.sum} ₽` },
		{
			title: "Статус",
			render: (o) => (
				<span
					className={
						o.status === "В обработке"
							? "text-orange-500"
							: o.status === "Завершен"
								? "text-green-600"
								: o.status === "Подтвержден"
									? "text-yellow-400"
									: "text-red-500"
					}
				>
					{o.status}
				</span>
			),
		},
		{
			title: "",
			render: (order) => (
				<div className="flex gap-5" onClick={(e) => e.stopPropagation()}>
					{can("orders.delete") && (
						<DeleteDialogWindow order={order}>
							<Button variant="ghost" size="icon" className="flex justify-center px-2 py-1 cursor-pointer hover:text-black">
								<X className="w-4 h-4" />
							</Button>
						</DeleteDialogWindow>
					)}
				</div>
			),
		},
	];

	const supplierColumns: Column<Supplier>[] = [
		{ title: "Название организации", render: (supplier) => supplier.companyName },
		{ title: "Контактное лицо", render: (supplier) => supplier.contactPerson },
		{ title: "Телефон", render: (supplier) => supplier.contactNumber },
		{ title: "Email", render: (supplier) => supplier.email },
		{
			title: "Тип договора",
			render: (supplier) => (
				<span
					className={
						supplier.contractType === "Активный"
							? "text-green-600"
							: supplier.contractType === "Неактивный"
								? "text-red-600"
								: "text-yellow-500"
					}
				>
					{supplier.contractType}
				</span>
			),
		},
		{ title: "Дата договора", render: (supplier) => supplier.contractDate },
		{
			title: "",
			render: (supplier) => (
				<div className="flex gap-5" onClick={(e) => e.stopPropagation()}>
					{can("suppliers.delete") && (
						<DeleteDialogWindow supplier={supplier}>
							<Button variant="ghost" size="icon" className="flex justify-center px-2 py-1 cursor-pointer hover:text-black">
								<X className="w-4 h-4" />
							</Button>
						</DeleteDialogWindow>
					)}
				</div>
			),
		},
	];

	return (
		<AuthContext.Provider
			value={{
				can,
				isAuth,
				login,
				register,
				logout,
				authUser,
				loading,
				setLoading,
				equipment,
				setEquipment,
				dot,
				setDot,

				products,
				suppliers,
				orders,
				users,
				roles,
				types,

				productColumns,
				supplierColumns,
				orderColumns,
				userColumns,
				roleColumns,
				typeColumns,

				open,
				setOpen,

				totalCountProductsDashboard,
				topSellingCount,
				stocksNumber,
				topOrdersCategories,
				topCountCompleted,
				stocksNumberProcessing,
				onInventory,
				countCanceled,

				productDashboards,
				ordersDashboards,
				supplierDashboard,
				usersDashboard,

				formTypes,
				setFormTypes,

				fetchData,

				setInventorySort,
				setSuppliersSort,
				setOrdersSort,
				setUsersSort,
				setRolesSort,

				globalSearchResults,
				searchQuery,
				setSearchQuery,

				setProducts,
				setOrders,
				setSuppliers,
				setUsers,
				setRoles,
				setTypes,

				backups,
				fetchBackups,
				createBackup,
				restoreBackupByFile,
				restoreBackupById,
				deleteBackup,
				downloadBackupById,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used inside AuthProvider");
	}
	return context;
}