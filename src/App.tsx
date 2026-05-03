import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "@/components/LoginForm";
import AppWindow from "@/components/AppWindow";
import Dashboard from "@/components/Dashboard";
import PageProduct from "@/components/PageProduct";
import { useAuth } from "@/context/ContextProvider";
import PageDynamic from "@/components/PageDynamic.tsx";
import type { Order, Product, Supplier } from "@/lib/constants.ts";
import PageSuppliers from "@/components/PageSuppliers.tsx";
import Settings from "@/components/Settings";
import SettingsUsers from "@/components/settings/SettingsUsers.tsx";
import SettingsRole from "@/components/settings/SettingsRole.tsx";
import SettingsTypes from "@/components/SettingsTypes.tsx";
import SettingsBackup from "@/components/SettingsBackup.tsx";
import RegistrationForm from "@/components/RegistrationForm.tsx";
import PermissionsGuard from "@/context/PermissionsGuard.tsx";

function App() {
	const {
		isAuth,
		products,
		productColumns,
		suppliers,
		supplierColumns,
		orders,
		orderColumns,
		topCountCompleted,
		topOrdersCategories,
		totalCountProductsDashboard,
		topSellingCount,
		stocksNumberProcessing,
		stocksNumber,
		productDashboards,
		ordersDashboards,
		loading,
	} = useAuth();
	if (loading) {
		return <div className="flex items-center justify-center h-screen">{<AppWindow/>}</div>;
	}
	return (
		<Routes>
			<Route
				path="/login"
				element={isAuth ? <Navigate to="/" /> : <LoginForm />}
			/>

			<Route
				path="/register"
				element={isAuth ? <Navigate to="/" /> : <RegistrationForm />}
			/>

			<Route element={isAuth ? <AppWindow /> : <Navigate to="/login" />}>
				<Route path="/" element={<Dashboard />} />

				<Route
					path="/inventory"
					element={
						<PermissionsGuard permission="inventory.read">
							<PageDynamic<Product>
								overallInventory="Общее состояние оборудования"
								categoriesString="Типы оборудования"
								countCategories={totalCountProductsDashboard.length}
								totalCount={productDashboards.length}
								totalProducts="Всего устройств"
								topSelling="В эксплуатации"
								topSellingCount={topSellingCount}
								stocksString="Требуют обслуживания"
								stocksNumber={stocksNumber}
								stocksOrdered="Последние 7 дней"
								items={products}
								columns={productColumns}
								tableTitle="Список оборудования"
								buttonName="Добавить оборудование"
								basePath="/inventory"
							/>
						</PermissionsGuard>
					}
				/>

				<Route
					path="/orders"
					element={
						<PermissionsGuard permission="orders.read">
							<PageDynamic<Order>
								overallInventory="Закупки оборудования"
								categoriesString="Всего закупок"
								countCategories={ordersDashboards.length}
								totalCount={topOrdersCategories}
								totalProducts="Подтверждено"
								topSelling="Завершено"
								topSellingCount={topCountCompleted}
								stocksString="В обработке"
								stocksNumber={stocksNumberProcessing}
								stocksOrdered="Ordered"
								items={orders}
								columns={orderColumns}
								tableTitle="Оборудование"
								buttonName="Добавить заказ"
								basePath="/orders"
							/>
						</PermissionsGuard>
					}
				/>

				<Route
					path="/suppliers"
					element={
						<PermissionsGuard permission="suppliers.read">
							<PageSuppliers<Supplier>
								items={suppliers}
								columns={supplierColumns}
								tableTitle="Поставщики оборудования"
								buttonName="Добавить поставщика"
								basePath="/suppliers"
							/>
						</PermissionsGuard>
					}
				/>

				<Route path="/settings" element={
					<PermissionsGuard permission="users.create">
						<Settings />
					</PermissionsGuard>

				}>
					<Route index element={<SettingsUsers />} />
					<Route path="users" element={
						<PermissionsGuard permission="users.read">
							<SettingsUsers />
						</PermissionsGuard>
					} />
					<Route path="role" element={
						<PermissionsGuard permission="roles.read">
							<SettingsRole />
						</PermissionsGuard>
					}/>
					<Route path="types" element={
						<PermissionsGuard permission="types.read">
							<SettingsTypes />
						</PermissionsGuard>

					}/>
					<Route path="backup" element={<SettingsBackup />} />
				</Route>

				<Route path="/:entity/:id" element={<PageProduct />} />
			</Route>

			<Route path="*" element={<Navigate to={isAuth ? "/" : "/login"} replace />} />
		</Routes>
	);
}

export default App;