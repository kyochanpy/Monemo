import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Layer,
	ReferenceArea,
	ReferenceDot,
	ReferenceLine,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

type CardHeaderType = {
	date: string;
	yen: number;
	left: boolean;
	right: boolean;
};

type BarContentType = {
	key: string | number;
	yen: number;
};

type CardContentType = {
	data: Array<BarContentType>;
};

// ダミーデータ
const chartData = [
	{ key: "月", yen: 1860 },
	{ key: "火", yen: 7000 },
	{ key: "水", yen: 2370 },
	{ key: "木", yen: 1230 },
	{ key: "金", yen: 2090 },
	{ key: "土", yen: 2140 },
	{ key: "日", yen: 1230 },
	{ key: "月", yen: 1860 },
	{ key: "火", yen: 7000 },
	{ key: "水", yen: 2370 },
	{ key: "木", yen: 1230 },
	{ key: "金", yen: 2090 },
	{ key: "土", yen: 2140 },
	{ key: "日", yen: 1230 },
	{ key: "月", yen: 1860 },
	{ key: "火", yen: 7000 },
	{ key: "水", yen: 2370 },
	{ key: "木", yen: 1230 },
	{ key: "金", yen: 2090 },
	{ key: "土", yen: 2140 },
	{ key: "日", yen: 1230 },
];

// 波線SVGを特定の座標に描画する関数
const CustomWaveAtPosition = ({ cx, cy }: { cx: number; cy: number }) => {
	return (
		<svg
			x={cx - 20}
			y={cy - 10}
			width={40}
			height={20}
			role="img"
			aria-label="wave-line"
		>
			<title>Wave Line</title>

			<path
				d={"M0 10 Q 10 0, 20 10 T 40 10"}
				stroke="black"
				strokeWidth={8}
				fill="none"
				strokeLinecap="square"
			/>

			<path
				d={"M0 10 Q 10 0, 20 10 T 40 10"}
				stroke="white"
				strokeWidth={6}
				fill="none"
				strokeLinecap="square"
			/>
		</svg>
	);
};

const GraphCardHeader = (props: CardHeaderType) => {
	return (
		<CardHeader className="grid grid-cols-[20%_60%_20%] m-0 p-0">
			<div className="flex items-center justify-end">
				<CircleChevronLeft strokeWidth={1} size={36} />
			</div>
			<div className="grid grid-rows-[10%_30%_50%_10%]">
				<div />
				<div className="flex items-center justify-center">
					<h1 className="text-2xl font-title">{props.date}</h1>
				</div>
				<div className="flex items-center justify-center">
					<h1 className="text-4xl font-title">
						{props.yen.toLocaleString()} 円
					</h1>
				</div>
				<div />
			</div>
			<div className="flex items-center justify-start">
				<CircleChevronRight strokeWidth={1} size={36} />
			</div>
		</CardHeader>
	);
};

const GraphBarChart = (props: Array<BarContentType>) => {
	return (
		<BarChart data={props} barSize={30} width={500}>
			<CartesianGrid vertical={false} className="opacity-20" />
			<XAxis dataKey="key" tickLine={false} axisLine={false} />
			<YAxis domain={[0, 7200]} tick={false} width={0} />
			<ReferenceLine
				y={1000}
				stroke="blue"
				strokeWidth={5}
				className="opacity-15"
			/>
			<ReferenceLine
				y={2000}
				stroke="green"
				strokeWidth={5}
				className="opacity-15"
			/>
			<ReferenceLine
				y={3000}
				stroke="yellow"
				strokeWidth={5}
				className="opacity-20"
			/>
			<ReferenceLine
				y={4000}
				stroke="orange"
				strokeWidth={5}
				className="opacity-15"
			/>
			<ReferenceLine
				y={5000}
				stroke="red"
				strokeWidth={5}
				className="opacity-15"
			/>

			<Tooltip cursor={false} />
			<Bar
				dataKey="yen"
				shape={
					<rect
						// fill="rgba(0, 0, 0, 0)"
						fill="gray"
						fillOpacity={0.2}
						stroke="black"
						strokeWidth={1}
						rx={4}
					/>
				}
			/>
			<ReferenceDot
				x="火"
				y={6500}
				shape={<CustomWaveAtPosition cx={0} cy={0} />}
				isFront={true}
			/>
		</BarChart>
	);
};

const GraphCardContent = (props: CardContentType) => {
	return (
		<CardContent className="w-full overflow-x-scroll">
			{(() => {
				if (props.data.length < 8) {
					return (
						<ChartContainer config={{}} className="h-full w-full graph-wapper">
							<BarChart data={props.data} barSize={30} width={500}>
								<CartesianGrid vertical={false} className="opacity-20" />
								<XAxis dataKey="key" tickLine={false} axisLine={false} />
								<YAxis domain={[0, 7200]} tick={false} width={0} />
								<ReferenceLine
									y={1000}
									stroke="blue"
									strokeWidth={5}
									className="opacity-15"
								/>
								<ReferenceLine
									y={2000}
									stroke="green"
									strokeWidth={5}
									className="opacity-15"
								/>
								<ReferenceLine
									y={3000}
									stroke="yellow"
									strokeWidth={5}
									className="opacity-20"
								/>
								<ReferenceLine
									y={4000}
									stroke="orange"
									strokeWidth={5}
									className="opacity-15"
								/>
								<ReferenceLine
									y={5000}
									stroke="red"
									strokeWidth={5}
									className="opacity-15"
								/>

								<Tooltip cursor={false} />
								<Bar
									dataKey="yen"
									shape={
										<rect
											// fill="rgba(0, 0, 0, 0)"
											fill="gray"
											fillOpacity={0.2}
											stroke="black"
											strokeWidth={1}
											rx={4}
										/>
									}
								/>
								<ReferenceDot
									x="火"
									y={6500}
									shape={<CustomWaveAtPosition cx={0} cy={0} />}
									isFront={true}
								/>
							</BarChart>
						</ChartContainer>
					);
				}
				return (
					<ResponsiveContainer
						width={props.data.length * 45}
						className="h-full w-full"
					>
						<BarChart data={props.data} barSize={30} width={500}>
							<CartesianGrid vertical={false} className="opacity-20" />
							<XAxis dataKey="key" tickLine={false} axisLine={false} />
							<YAxis domain={[0, 7200]} tick={false} width={0} />
							<ReferenceLine
								y={1000}
								stroke="blue"
								strokeWidth={5}
								className="opacity-15"
							/>
							<ReferenceLine
								y={2000}
								stroke="green"
								strokeWidth={5}
								className="opacity-15"
							/>
							<ReferenceLine
								y={3000}
								stroke="yellow"
								strokeWidth={5}
								className="opacity-20"
							/>
							<ReferenceLine
								y={4000}
								stroke="orange"
								strokeWidth={5}
								className="opacity-15"
							/>
							<ReferenceLine
								y={5000}
								stroke="red"
								strokeWidth={5}
								className="opacity-15"
							/>

							<Tooltip cursor={false} />
							<Bar
								dataKey="yen"
								shape={
									<rect
										// fill="rgba(0, 0, 0, 0)"
										fill="gray"
										fillOpacity={0.2}
										stroke="black"
										strokeWidth={1}
										rx={4}
									/>
								}
							/>
							<ReferenceDot
								x="火"
								y={6500}
								shape={<CustomWaveAtPosition cx={0} cy={0} />}
								isFront={true}
							/>
						</BarChart>
					</ResponsiveContainer>
				);
			})()}
		</CardContent>
	);
};

export function GraphCard() {
	return (
		<Card className="w-11/12 h-full border-x border-y shadow-none border-gray-400">
			<div className="grid grid-rows-[25%_75%] h-full">
				<GraphCardHeader
					date="10/1 ~ 10/7"
					yen={12345}
					left={true}
					right={true}
				/>
				<GraphCardContent data={chartData} />
			</div>
		</Card>
	);
}
