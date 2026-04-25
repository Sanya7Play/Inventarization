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
	} = useAuth();

	return (
		<Routes>
			<Route
				path="/login"
				element={isAuth ? <Navigate to="/" replace /> : <LoginForm />}
			/>

			<Route
				path="/register"
				element={isAuth ? <Navigate to="/" replace /> : <RegistrationForm />}
			/>

			<Route element={isAuth ? <AppWindow /> : <Navigate to="/login" replace />}>
				<Route path="/" element={<Dashboard />} />

				<Route
					path="/inventory"
					element={
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
					}
				/>

				<Route
					path="/orders"
					element={
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
					}
				/>

				<Route
					path="/suppliers"
					element={
						<PageSuppliers<Supplier>
							items={suppliers}
							columns={supplierColumns}
							tableTitle="Поставщики оборудования"
							buttonName="Добавить поставщика"
							basePath="/suppliers"
						/>
					}
				/>

				<Route path="/settings" element={<Settings />}>
					<Route index element={<SettingsUsers />} />
					<Route path="users" element={<SettingsUsers />} />
					<Route path="role" element={<SettingsRole />} />
					<Route path="types" element={<SettingsTypes />} />
					<Route path="backup" element={<SettingsBackup />} />
				</Route>

				<Route path="/:entity/:id" element={<PageProduct />} />
			</Route>

			<Route path="*" element={<Navigate to={isAuth ? "/" : "/login"} replace />} />
		</Routes>
	);
}

export default App;