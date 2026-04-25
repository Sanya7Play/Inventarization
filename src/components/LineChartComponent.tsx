"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "@/components/ui/chart"

export const description = "A multiple line chart"

const chartData = [
	{ month: "January", addProduct: 120, sentRepair: 200, written: 150},
	{ month: "February", addProduct: 100, sentRepair: 160, written: 110},
	{ month: "March", addProduct: 180, sentRepair: 130, written: 135},
	{ month: "April", addProduct: 130, sentRepair: 200, written: 175},
	{ month: "May", addProduct: 80, sentRepair: 90, written: 100},
	{ month: "June", addProduct: 150, sentRepair: 120, written: 140},
]

const chartConfig = {
	addProduct: {
		label: "Добавлено",
		color: "var(--chart-1)",
	},
	sentRepair: {
		label: "На ремонте",
		color: "var(--chart-2)",
	},
	written: {
		label: "Списано",
		color: "var(--chart-3)",
	},
} satisfies ChartConfig

export function ChartLineMultiple() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Активность за последние 6 месяцев</CardTitle>
				<CardDescription>Январь - Июнь 2025</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig} className="aspect-auto h-[420px] w-full">
					<LineChart
						accessibilityLayer
						data={chartData}
						margin={{ top: 10, right: 12, bottom: 10, left: 12 }}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
						<Line
							dataKey="addProduct"
							type="monotone"
							stroke="var(--color-addProduct)"
							strokeWidth={2}
							dot={false}
						/>
						<Line
							dataKey="sentRepair"
							type="monotone"
							stroke="var(--color-sentRepair)"
							strokeWidth={2}
							dot={false}
						/>
						<Line
							dataKey="written"
							type="monotone"
							stroke="var(--color-written)"
							strokeWidth={2}
							dot={false}
						/>
					</LineChart>
				</ChartContainer>
			</CardContent>
			<CardFooter>
				<div className="flex w-full items-start gap-2 text-sm">
					<div className="grid gap-2">
						<div className="flex items-center gap-2 leading-none text-muted-foreground">
							Показаны общие показатели за последние 6 месяцев.
						</div>
					</div>
				</div>
			</CardFooter>
		</Card>
	)
}
