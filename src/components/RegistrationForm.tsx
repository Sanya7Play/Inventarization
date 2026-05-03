import React, { useState } from "react";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useAuth } from "@/context/ContextProvider.tsx";
import { useNavigate } from "react-router-dom";
function RegistrationForm() {
	const { register, fetchData } = useAuth();
	const navigate = useNavigate();

	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const registerForm = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError("");

		if (!fullName.trim() || !email.trim() || !password.trim()) {
			setError("Заполните все обязательные поля");
			return;
		}

		if (password.length < 8) {
			setError("Пароль должен быть не меньше 8 символов");
			return;
		}

		try {
			setLoading(true);
			await register(fullName, email, password, true);
			navigate("/");
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("Ошибка регистрации");
			}
		} finally {
			setLoading(false);
			fetchData();
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

			<form onSubmit={registerForm}>
				<div className="flex flex-col items-center gap-10">
					<img src="/logo.png" alt="logopng" width="85px" height="45px" />

					<div className="flex flex-col gap-5 text-center">
						<h1 className="text-4xl font-semibold">Создать новый аккаунт</h1>
						<span className="text-muted-foreground text-base">
							Начать с 30-дневной пробной версией
						</span>
					</div>

					<div className="flex flex-col w-full gap-5">
						<div className="flex flex-col gap-1">
							<Label htmlFor="name" className="text-xs">
								Имя*
							</Label>
							<Input
								className="w-full h-10 rounded-lg bg-neutral-200/10 outline-none pl-3 pr-3"
								type="text"
								id="name"
								placeholder="Enter your name"
								value={fullName}
								onChange={(e) => setFullName(e.target.value)}
							/>
						</div>

						<div className="flex flex-col gap-1">
							<Label htmlFor="email" className="text-xs">
								Email*
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
								Пароль*
							</Label>
							<Input
								className="w-full h-10 rounded-lg bg-neutral-200/10 outline-none pl-3 pr-3"
								type="password"
								id="password"
								placeholder="Create a password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<Label htmlFor="password" className="text-xs text-muted-foreground pt-1">
								Должно быть больше 8 символов
							</Label>
						</div>

						{error && <div className="text-sm text-red-500 text-center">{error}</div>}

						<div className="flex flex-col gap-3">
							<Button
								type="submit"
								variant="outline"
								disabled={loading}
								className="w-full justify-center bg-blue-950 text-white h-10 rounded-lg cursor-pointer"
							>
								{loading ? "Регистрация..." : "Зарегистрироваться"}
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
							<span>Уже есть аккаунт?</span>
							<Button
								type="button"
								variant="link"
								size="sm"
								className="text-xs text-blue-950 cursor-pointer p-0"
								onClick={() => navigate("/login")}
							>
								Войти
							</Button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

export default RegistrationForm;