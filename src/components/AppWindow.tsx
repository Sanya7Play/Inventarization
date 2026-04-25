import Menu from "@/components/Menu.tsx";
import Header from "@/components/Header.tsx";
import {Outlet} from "react-router-dom";

function AppWindow() {
	return (
		<div className="flex w-full gap-1 min-h-screen bg-gray-200">
			<Menu />
			<div className="flex flex-col flex-1">
				<Header/>
				<main className="py-6 px-10 flex-1">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
export default AppWindow;