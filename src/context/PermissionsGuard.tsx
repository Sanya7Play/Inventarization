import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/ContextProvider";
import { toast } from "sonner";
import { useEffect } from "react";

interface Props {
	permission: string;
	children: React.ReactNode;
}

function PermissionGuard({ permission, children }: Props) {
	const { can } = useAuth();

	const hasAccess = can(permission);

	useEffect(() => {
		if (!hasAccess) {
			toast.error("Доступ запрещен", {id: "access-denied", position: "top-center", duration: 1500});
		}
	}, [hasAccess]);

	if (!hasAccess) {
		return <Navigate to="/" replace />;
	}

	return children;
}

export default PermissionGuard;