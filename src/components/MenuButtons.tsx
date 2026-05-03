import { buttonsMenu } from "@/lib/constants.ts";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { useAuth } from "@/context/ContextProvider.tsx";

interface MenuButtons {
	activeTab: number;
	setActiveTab: (activeTab: number) => void;
}
function MenuButtons({activeTab, setActiveTab}: MenuButtons) {

	const { logout } = useAuth();
	const navigate = useNavigate();

	const topButtons = buttonsMenu.slice(0, 8);
	const handleLogout = async () => {
		await logout();
		navigate("/login", { replace: true });
	};
	const renderButton = (button: any, index: number) => {
		const Icon = button.icon;
		const isActive = activeTab === index;

		const commonBtnClass = `flex flex-row items-center gap-3 cursor-pointer w-full ${
			isActive ? "bg-gray-200 text-blue-950" : ""
		}`;

		// ✅ logout без Link
		if (button.action === "logout") {
			return (
				<Button
					key={index}
					variant="outline"
					size="default"
					className={commonBtnClass}
					onClick={() => {
						setActiveTab(index);
						handleLogout();
					}}
				>
					<Icon className="w-40 h-40" />
					<span>{button.name}</span>
				</Button>
			);
		}

		// ✅ обычные пункты через Link
		return (
			<Link to={button.link} key={index}>
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