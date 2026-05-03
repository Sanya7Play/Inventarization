import React, { useState } from "react";
import { Input } from "@/components/ui/input.tsx";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useAuth } from "@/context/ContextProvider.tsx";
import {useNavigate} from "react-router-dom";

function LoginForm() {
	const { login } = useAuth();
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [remember, setRemember] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError("");

		if (!email.trim() || !password.trim()) {
			setError("Введите email и пароль");
			return;
		}

		try {
			setLoading(true);
			await login(email, password, remember);
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("Ошибка авторизации");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-row items-center justify-center w-full h-screen gap-80 bg-white">
			<div className="flex flex-col items-center gap-1">
				<div className="flex flex-col items-center">
					<img src="/logo.png" alt="logo.png" width="350px" height="350px" />
				</div>
				<div className="flex items-center">
					<h1 className="text-4xl font-medium text-blue-950">INVENTA</h1>
				</div>
			</div>

			<form onSubmit={handleSubmit}>
				<div className="flex flex-col items-center gap-10">
					<img src="/logo.png" alt="logo.png" width="175px" height="85px" />

					<div className="flex flex-col gap-5 text-center">
						<h1 className="text-4xl font-semibold">Вход в аккаунт</h1>
						<span className="text-muted-foreground text-base">
							Добро пожаловать! Введите данные для входа
						</span>
					</div>

					<div className="flex flex-col w-full gap-5">
						<div className="flex flex-col gap-1">
							<Label htmlFor="email" className="text-xs">
								Email
							</Label>
							<Input
								className="w-full h-10 rounded-lg bg-neutral-200/10 outline-none pl-3 pr-3"
								type="email"
								id="email"
								placeholder="Enter your email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>

						<div className="flex flex-col gap-1">
							<Label htmlFor="password" className="text-xs">
								Пароль
							</Label>
							<Input
								className="w-full h-10 rounded-lg bg-neutral-200/10 outline-none pl-3 pr-3"
								type="password"
								id="password"
								placeholder="••••••••"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>

						<div className="flex flex-row items-center justify-between">
							<div className="flex flex-row items-center gap-2">
								<Checkbox
									id="terms-checkbox"
									name="terms-checkbox"
									className="cursor-pointer"
									checked={remember}
									onCheckedChange={(checked) => setRemember(Boolean(checked))}
								/>
								<Label htmlFor="terms-checkbox">Запомнить на 30 дней</Label>
							</div>

							<Button
								type="button"
								variant="link"
								size="sm"
								className="text-xs text-blue-950 cursor-pointer p-0"
							>
								Забыли пароль?
							</Button>
						</div>

						{error && (
							<div className="text-sm text-red-500 text-center">{error}</div>
						)}

						<div className="flex flex-col gap-3">
							<Button
								type="submit"
								variant="outline"
								disabled={loading}
								className="w-full justify-center bg-blue-950 text-white h-10 rounded-lg cursor-pointer"
							>
								{loading ? "Вход..." : "Вход"}
							</Button>

							<Button
								type="button"
								variant="ghost"
								className="w-full justify-center border text-black h-10 rounded-lg cursor-pointer"
							>
								<img
									src="/google-svgrepo-com.svg"
									alt="GoogleSvg"
									width="20px"
									height="20px"
								/>
								<span>Войти через Google</span>
							</Button>
						</div>

						<div className="flex flex-row items-center justify-center text-xs text-muted-foreground gap-1">
							<span>Еще нет аккаунта?</span>
							<Button
								type="button"
								variant="link"
								size="sm"
								className="text-xs text-blue-950 cursor-pointer p-0"
								onClick={() => navigate("/register")}
							>
								Зарегистрироваться
							</Button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

export default LoginForm;