import {Button} from "@/components/ui/button.tsx";
import {NavLink, Outlet} from "react-router-dom";
import {menuButtons} from "@/lib/constants.ts";
import {useState} from "react";


function Settings() {
	const [active, setActive] = useState(0);

	return (
		<div className="grid grid-cols-1 gap-8">
			<div className="rounded-lg bg-white px-6 py-5 h-auto">
				<h1 className="font-medium text-xl">Настройки</h1>

				<div className="grid grid-cols-[0.6fr_2fr] mt-5 gap-8">
					{/* левое меню вкладок */}
					<div className="flex flex-col gap-4 mt-3">
						{menuButtons.map((btn, index) => {
							const Icon = btn.icon;

							return (
								<NavLink key={btn.link} to={btn.link} end>
									{
										<Button
										variant="outline"
										size="default"
										onClick={() => setActive(index)}
										className={`flex items-center gap-3 cursor-pointer w-full ${
											active === index ? "bg-gray-200 text-blue-700" : ""
										}`}
									>
										<Icon className="w-5 h-5" />
										<span>{btn.name}</span>
									</Button>
									}
								</NavLink>
							);
						})}
					</div>
					<div className="px-1">
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
}
export default Settings;