import React, { useRef } from "react";
import { Button } from "@/components/ui/button.tsx";
import {
	Download,
	Upload,
	RotateCcw,
	Clock3,
	DatabaseBackup,
	Trash2,
} from "lucide-react";
import { useAuth } from "@/context/ContextProvider.tsx";

function SettingsBackup() {
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const {
		backups,
		createBackup,
		restoreBackupByFile,
		restoreBackupById,
		deleteBackup,
		downloadBackupById,
	} = useAuth();

	const handleCreateBackup = async () => {
		try {
			await createBackup();
			alert("Резервная копия успешно создана");
		} catch (error) {
			console.error(error);
			alert("Ошибка при создании резервной копии");
		}
	};

	const handleRestoreClick = () => {
		fileInputRef.current?.click();
	};

	const handleRestoreFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
		try {
			const file = event.target.files?.[0];
			if (!file) return;

			await restoreBackupByFile(file);
			alert(`Резервная копия "${file.name}" успешно восстановлена`);
		} catch (error) {
			console.error(error);
			alert("Ошибка при восстановлении резервной копии");
		} finally {
			event.target.value = "";
		}
	};

	const handleRestoreBackupById = async (id: number) => {
		try {
			await restoreBackupById(id);
			alert("Резервная копия успешно восстановлена");
		} catch (error) {
			console.error(error);
			alert("Ошибка при восстановлении резервной копии");
		}
	};

	const handleDownloadBackup = async (id: number) => {
		try {
			await downloadBackupById(id);
		} catch (error) {
			console.error(error);
			alert("Ошибка при скачивании резервной копии");
		}
	};

	const handleDeleteBackup = async (id: number) => {
		try {
			await deleteBackup(id);
		} catch (error) {
			console.error(error);
			alert("Ошибка при удалении резервной копии");
		}
	};

	return (
		<div className="w-full">
			<div className="flex flex-row items-center justify-between mb-5">
				<h1 className="font-medium text-lg pt-4">Резервное копирование</h1>

				<div className="flex flex-row gap-2">
					<Button
						type="button"
						variant="outline"
						size="default"
						className="bg-blue-500 text-white cursor-pointer text-sm"
						onClick={handleCreateBackup}
					>
						<DatabaseBackup className="w-4 h-4 mr-2" />
						Создать копию
					</Button>

					<Button
						type="button"
						variant="ghost"
						size="default"
						className="cursor-pointer border px-5"
						onClick={handleRestoreClick}
					>
						<Upload className="w-4 h-4 mr-2" />
						Восстановить из файла
					</Button>
				</div>
			</div>

			<input
				ref={fileInputRef}
				type="file"
				accept=".json"
				className="hidden"
				onChange={handleRestoreFile}
			/>

			<div className="grid grid-cols-3 gap-4 mb-6">
				<div className="border rounded-xl p-4 bg-white">
					<div className="flex items-center gap-2 mb-2 text-gray-500">
						<Clock3 className="w-4 h-4" />
						<span className="text-sm">Последняя копия</span>
					</div>
					<p className="text-base font-medium">
						{backups[0]
							? new Date(backups[0].createdAt).toLocaleDateString("ru-RU")
							: "Нет данных"}
					</p>
				</div>

				<div className="border rounded-xl p-4 bg-white">
					<div className="flex items-center gap-2 mb-2 text-gray-500">
						<DatabaseBackup className="w-4 h-4" />
						<span className="text-sm">Всего копий</span>
					</div>
					<p className="text-base font-medium">{backups.length}</p>
				</div>

				<div className="border rounded-xl p-4 bg-white">
					<div className="flex items-center gap-2 mb-2 text-gray-500">
						<RotateCcw className="w-4 h-4" />
						<span className="text-sm">Статус</span>
					</div>
					<p className="text-base font-medium text-green-600">Активно</p>
				</div>
			</div>

			<table className="w-full border-collapse">
				<thead className="border-b font-normal">
				<tr className="text-left">
					<th className="py-3">Название файла</th>
					<th className="py-3">Тип</th>
					<th className="py-3">Размер</th>
					<th className="py-3">Дата создания</th>
					<th className="py-3 text-right">Действия</th>
				</tr>
				</thead>

				<tbody>
				{backups.map((backup) => (
					<tr key={backup.id} className="border-b">
						<td className="py-3">{backup.name}</td>
						<td className="py-3">{backup.type}</td>
						<td className="py-3">{backup.size}</td>
						<td className="py-3">
							{new Date(backup.createdAt).toLocaleString("ru-RU")}
						</td>
						<td className="py-3">
							<div className="flex justify-end gap-3">
								<button
									type="button"
									className="cursor-pointer"
									title="Скачать"
									onClick={() => handleDownloadBackup(backup.id)}
								>
									<Download className="w-4 h-4" />
								</button>

								<button
									type="button"
									className="cursor-pointer"
									title="Восстановить"
									onClick={() => handleRestoreBackupById(backup.id)}
								>
									<RotateCcw className="w-4 h-4" />
								</button>

								<button
									type="button"
									className="cursor-pointer"
									onClick={() => handleDeleteBackup(backup.id)}
									title="Удалить"
								>
									<Trash2 className="w-4 h-4" />
								</button>
							</div>
						</td>
					</tr>
				))}

				{backups.length === 0 && (
					<tr>
						<td colSpan={5} className="py-8 text-center text-gray-500">
							Резервные копии отсутствуют
						</td>
					</tr>
				)}
				</tbody>
			</table>

			<div className="flex flex-row items-center justify-between mt-4">
				<Button
					type="button"
					variant="outline"
					size="default"
					className="cursor-pointer border px-5"
					disabled
				>
					Назад
				</Button>

				<span>Страница 1 из 1</span>

				<Button
					type="button"
					variant="outline"
					size="default"
					className="cursor-pointer border px-5"
					disabled
				>
					Вперед
				</Button>
			</div>
		</div>
	);
}

export default SettingsBackup;