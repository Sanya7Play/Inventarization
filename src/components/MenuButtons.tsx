import { buttonsMenu } from "@/lib/constants.ts";
import { Link} from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import LogoutWindow from "@/components/ui/LogoutWindow.tsx";

interface MenuButtons {
	activeTab: number;
	setActiveTab: (activeTab: number) => void;
}
function MenuButtons({activeTab, setActiveTab}: MenuButtons) {

	const topButtons = buttonsMenu.slice(0, 8);

	const renderButton = (button: any, index: number) => {
		const Icon = button.icon;
		const isActive = activeTab === index;

		const commonBtnClass = `flex flex-row items-center gap-3 cursor-pointer w-full ${
			isActive ? "bg-gray-200 text-blue-950" : ""
		}`;

		// ✅ logout без Link
		if (button.action === "logout") {
			return (
				<LogoutWindow key={button.name}>
					<Button
						variant="outline"
						size="default"
						className={commonBtnClass}
						onClick={() => {
							setActiveTab(index);
						}}
					>
						<Icon className="w-40 h-40" />
						<span>{button.name}</span>
					</Button>
				</LogoutWindow>
			);
		}

		// ✅ обычные пункты через Link
		return (
			<Link to={button.link} key={button.name}>
				<Button
					variant="outline"
					size="default"
					className={commonBtnClass}
					onClick={() => setActiveTab(index)}
				>
					<Icon className="w-40 h-40" />
					<span>{button.name}</span>
				</Button>
			</Link>
		);
	};

	return (
		<div className="flex flex-col justify-between w-full h-full py-12 pb-1 px-5">
			<div className="flex flex-col gap-5">
				{topButtons.map((btn, i) => renderButton(btn, i))}
			</div>
		</div>
	);
}

export default MenuButtons;