import { Input } from "@/components/ui/input.tsx";
import { Bell, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Avatar, AvatarImage } from "@/components/ui/avatar.tsx";
import { useAuth } from "@/context/ContextProvider.tsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
	const { searchQuery, setSearchQuery, globalSearchResults } = useAuth();
	const navigate = useNavigate();
	const [open, setOpen] = useState<boolean>(false);
	console.log(globalSearchResults);
	const handleClear = () => {
		setSearchQuery("");
		setOpen(false);
	};

	const handleNavigate = (path: string) => {
		navigate(path);
		setSearchQuery("");
		setOpen(false);
	};

	return (
		<div className="flex flex-row justify-between items-center w-auto h-auto bg-white py-8 px-10 rounded-xl">
			<div className="relative h-11 z-30 2xl:w-160 xl:w-100 lg:w-50 md:w-50">
				<Search className="absolute w-5 h-5 left-2.5 top-3" />
				<Input
					type="text"
					placeholder="Найти продукт, поставщика, заказ, пользователя..."
					value={searchQuery}
					onChange={(e) => {
						setSearchQuery(e.target.value);
						setOpen(true);
					}}
					onFocus={() => setOpen(true)}
					className="w-full h-full bg-neutral-200/30 outline-none pl-10 pr-10 rounded-xl focus-visible:border-ring"
				/>

				{(open || searchQuery) && (
					<X
						className="absolute w-5 h-5 right-3 top-3 text-muted-foreground/50 cursor-pointer hover:text-muted-foreground"
						onClick={handleClear}
					/>
				)}

				{open && searchQuery.trim() && (
					<div className="absolute top-full left-0 w-full bg-white shadow-xl/30 border rounded-xl mt-2 z-50 max-h-96 overflow-y-auto">
						<div className="flex flex-col p-2">
							{globalSearchResults.length > 0 ? (
								globalSearchResults.map((item) => (
									<div
										key={`${item.type}-${item.id}`}
										onClick={() => handleNavigate(item.path)}
										className="flex flex-col gap-1 p-3 rounded-md cursor-pointer hover:bg-primary/10"
									>
										<div className="flex items-center justify-between gap-3">
											<span className="font-medium">{item.title}</span>
											<span className="text-xs text-muted-foreground">
												{item.type}
											</span>
										</div>

										{item.subtitle && (
											<span className="text-sm text-muted-foreground">
												{item.subtitle}
											</span>
										)}
									</div>
								))
							) : (
								<div className="p-3 text-sm text-muted-foreground">
									Ничего не найдено
								</div>
							)}
						</div>
					</div>
				)}
			</div>

			<div className="flex flex-row items-center gap-8">
				<div className="flex flex-row items-center gap-3">
					<Button
						variant="ghost"
						size="lg"
						className="cursor-pointer"
					>
						<Bell width={20} height={20} />
					</Button>
				</div>

				<Avatar
					size="lg"
					className="cursor-pointer bg-neutral-200"
				>
					<AvatarImage
						src="/vite.svg"
						alt="LogoSvg"
					/>
				</Avatar>
			</div>
		</div>
	);
}

export default Header;