import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {useAuth} from "@/context/ContextProvider.tsx";
import type {ReactNode} from "react";
import {useNavigate} from "react-router-dom";

interface LogoutDialogProps {
	children: ReactNode;
}
function LogoutWindow({children}: LogoutDialogProps) {

	const {logout} = useAuth();
	const navigate = useNavigate();
	const handleLogout = async () => {
		await logout();
		navigate("/login", { replace: true });
	};
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Вы действительно хотите выйти?
					</AlertDialogTitle>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel className="cursor-pointer">
						Закрыть
					</AlertDialogCancel>

					<AlertDialogAction
						onClick={handleLogout}
						className="cursor-pointer"
					>
						Выйти
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default LogoutWindow;