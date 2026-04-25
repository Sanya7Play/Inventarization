"use client"

import { Pie, PieChart } from "recharts"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig,} from "@/components/ui/chart"
import {useAuth} from "@/context/ContextProvider.tsx";

const chartConfig = {
	visitors: {
		label: "Visitors",
	},
	chrome: {
		label: "В эксплуатации",
		color: "var(--chart-1)",
	},
	safari: {
		label: "На складе",
		color: "var(--chart-2)",
	},
	firefox: {
		label: "В ремонте",
		color: "var(--chart-3)",
	},
	edge: {
		label: "Списано",
		color: "var(--chart-4)",
	},
	other: {
		label: "Зарезервировано",
		color: "var(--chart-5)",
	},
} satisfies ChartConfig

export function ChartPieSimple() {
	const {topSellingCount, onInventory, stocksNumber} = useAuth();
	const chartData = [
		{ browser: "В эксплуатации", visitors: topSellingCount, fill: "var(--color-chrome)" },
		{ browser: "На складе", visitors: onInventory, fill: "var(--color-safari)" },
		{ browser: "В ремонте", visitors: stocksNumber, fill: "var(--color-firefox)" },
	]

	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle>Состояние техники</CardTitle>
				<CardDescription>Январь - Июнь 2025</CardDescription>
			</CardHeader>
			<CardContent className="pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[350px]"
				>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie data={chartData} dataKey="visitors" nameKey="browser" />
					</PieChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col gap-2 text-sm">
				<div className="leading-none text-muted-foreground">
					Показаны общие показатели за последние 6 месяцев.
				</div>
			</CardFooter>
		</Card>
	)
}
