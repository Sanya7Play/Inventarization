import MenuButtons from "@/components/MenuButtons.tsx";
import {Link} from "react-router-dom";
import {useState} from "react";

function Menu() {
	const [activeTab, setActiveTab] = useState(0);
	return (
		<div className="flex flex-col w-[320px] bg-white rounded-r-2xl px-5 py-10 min-h-screen">
			<Link to="/" className="px-10" onClick={() => setActiveTab(0)}>
				<div className="flex items-center gap-1">
					<img src="/logo.png" alt="logopng" width="100" height="40" />
					<h1 className="text-lg text-blue-950 font-semibold">INVENTA</h1>
				</div>
			</Link>

			{/* растягиваем меню по высоте */}
			<div className="flex-1 mt-10">
				<MenuButtons activeTab={activeTab} setActiveTab={setActiveTab} />
			</div>
			{/* если у тебя настройки/выход внутри MenuButtons — ок, если нет — можно сюда */}
		</div>
	);
}
export default Menu;