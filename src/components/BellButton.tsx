import {Popover, PopoverContent, PopoverHeader, PopoverTrigger} from "@/components/ui/popover.tsx";
import {ChevronRight} from "lucide-react";
import {useAuth} from "@/context/ContextProvider.tsx";


interface Props {
	children?: React.ReactNode;
}

function BellButton({children}: Props) {
	const {equipment} = useAuth();
	return (
		<Popover>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent className="w-auto mr-10">
				<PopoverHeader />
				{equipment ? (<div className="flex flex-col m-2 gap-4">
					{equipment?.map((item) => (
						<div className="flex flex-col">
							<div className="flex flex-row gap-4" key={item.id}>
								<img src="/ob.svg" alt="obSvg" className="w-10 h-10" />
								<div className="flex flex-col gap-1">
									<h1 className='text-sm font-semibold'>{item.name}</h1>
									<p className='text-xs text-muted-foreground flex flex-row gap-1'>Статус изменен на <p className='text-blue-600 lowercase'>{item.status}</p></p>
								</div>
							</div>
							<p className='border-b border-gray-200 mt-3'></p>
						</div>
					)).slice(equipment.length - 2, equipment.length)}
					<span className='text-blue-600 text-sm flex flex-row justify-center items-center mt-1 gap-2 '>Показать все уведомления <ChevronRight size={15}/></span>
				</div>) : (
					<h1 className='text-sm font-semibold'>123</h1>
				)}
			</PopoverContent>
		</Popover>
	)
}
export default BellButton;