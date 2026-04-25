import {User2} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {statusContract, type Supplier} from "@/lib/constants.ts";
import {useEffect, useState} from "react";
import {useAuth} from "@/context/ContextProvider.tsx";

interface Props {
	supplier?: Supplier;
	setFormSupplier: React.Dispatch<React.SetStateAction<Supplier | undefined>>;
}
function SupplierComponent({supplier, setFormSupplier}: Props) {

	const {supplierDashboard} = useAuth();

	const [id] = useState<number>(supplier?.id || supplierDashboard.length + 1);
	const [companyName, setCompanyName] = useState<string>(supplier?.companyName || "");
	const [contactPerson, setContactPerson] = useState<string>(supplier?.contactPerson || "");
	const [contactNumber, setContactNumber] = useState<string>(supplier?.contactNumber || "");
	const [email, setEmail] = useState<string>(supplier?.email || "");
	const [contractType, setContractType] = useState<string>(supplier?.contractType || "");
	const [contractDate, setContractDate] = useState<string>(supplier?.contractDate || "");

	useEffect(() => {
		setFormSupplier({id, companyName, contactPerson, contactNumber, email, contractType, contractDate,});
	}, [id, companyName, contactPerson, contactNumber, email, contractType, contractDate, setFormSupplier,]);
	return (
		<>
			<div className='flex flex-row gap-5 items-center justify-center'>
						<span className='flex items-center justify-center border-2 border-muted-foreground/30 border-dashed w-25 h-25 rounded-full'>
							<User2 size={80} strokeWidth={1} className='text-muted-foreground'/>
						</span>
				<div className='flex flex-col items-center justify-center'>
					<span className='text-muted-foreground text-sm'>Перетащите изображение сюда</span>
					<p className='text-muted-foreground text-sm'>или</p>
					<span className='text-blue-600 cursor-pointer text-sm '>Выберите изображение</span>
				</div>
			</div>
			<div className='flex flex-col gap-5 mt-5'>
				<div className='flex flex-row justify-between'>
					<Label htmlFor="name" className='text-base'>Название организации</Label>
					<Input
						onChange={(e) => setCompanyName(e.target.value)}
						placeholder='Введите название организации'
						className='w-5/10 h-11'
						value={companyName}>
					</Input>
				</div>
				<div className='flex flex-row justify-between'>
					<Label htmlFor="id" className='text-base'>Контактное лицо</Label>
					<Input
						onChange={(e) => setContactPerson(e.target.value)}
						placeholder='Введите контактное лицо'
						className='w-5/10 h-11'
						value={contactPerson}>
					</Input>
				</div>
				<div className='flex flex-row justify-between'>
					<Label htmlFor="category" className='text-base'>Телефон</Label>
					<Input
						onChange={(e) => setContactNumber(e.target.value)}
						placeholder='Введите номер телефона'
						className='w-5/10 h-11'
						value={contactNumber}>
					</Input>
				</div>
				<div className='flex flex-row justify-between'>
					<Label htmlFor="price" className='text-base'>Email</Label>
					<Input
						onChange={(e) => setEmail(e.target.value)}
						placeholder='Введите Email'
						className='w-5/10 h-11'
						value={email}>
					</Input>
				</div>
				<div className='flex flex-row justify-between'>
					<Label htmlFor="unit" className='text-base'>Тип договора</Label>
					<select
						onChange={(e) => setContractType(e.target.value)}
						value={contractType}
						className="w-5/10 h-11 text-sm border-1 border-muted-foreground/20 rounded-lg"
					>
						<option value="" disabled>Выберите тип</option>
						{statusContract.map((item) => (
							<option key={item} className="text-sm" value={item}>
								{item}
							</option>
						))}
					</select>
				</div>
				<div className='flex flex-row justify-between'>
					<Label htmlFor="date" className='text-base'>Дата договора</Label>
					<Input
						onChange={(e) => setContractDate(e.target.value)}
						placeholder='Enter type'
						type='date'
						className='w-5/10 h-11'
						value={contractDate}>
					</Input>
				</div>
			</div>
		</>
	)
}
export default SupplierComponent;