import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	ReferenceDot,
	ReferenceLine,
	ResponsiveContainer,
	Tooltip,
	type TooltipProps,
	XAxis,
	YAxis,
} from "recharts";

import { Button } from "@/components/ui/button";
import type {
	NameType,
	ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import type { GraphResponse } from "../../../mock-server/src/index";

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
	segment: "week" | "month" | "year";
};

const MAX_VALUES = {
	week: 7200,
	month: 7200,
	year: 7200,
};

const CustomTooltip = ({
	active,
	payload,
}: TooltipProps<ValueType, NameType>) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-white p-2 border rounded shadow">
				<p>{`${payload[0].payload.key}: ${payload[0].payload.yen}`}</p>
			</div>
		);
	}
	return null;
};

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
		<CardHeader className="grid grid-cols-[24%_52%_24%] m-0 p-0">
			<div className="flex items-center justify-end">
				<Button
					disabled={true}
					className="flex items-center justify-end h-4/5 bg-white hover:bg-white active:bg-gray-100 shadow-none"
				>
					<CircleChevronLeft strokeWidth={1} size={40} color="black" />
				</Button>
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
				<Button className="flex items-center justify-start h-4/5 bg-white hover:bg-white active:bg-gray-100 shadow-none">
					<CircleChevronRight strokeWidth={1} size={40} color="black" />
				</Button>
			</div>
		</CardHeader>
	);
};

const GraphCardContent = (props: CardContentType) => {
	const limitedData = props.data.map((item) => ({
		...item,
		// yen: item.yen > 7000 ? 7000 : item.yen, // 表示する棒グラフの高さを制限
		graphYen:
			props.segment === "year"
				? item.yen > 210000
					? 7000
					: item.yen / 30
				: item.yen > 7000
					? 7000
					: item.yen,
	}));
	return (
		<CardContent className="w-full overflow-x-scroll hidden-scrollbar">
			{(() => {
				if (props.data.length < 8) {
					return (
						<ChartContainer config={{}} className="h-full w-full graph-wapper">
							<BarChart data={limitedData} barSize={30} width={500}>
								<CartesianGrid vertical={false} horizontal={false} />
								<XAxis dataKey="key" tickLine={false} axisLine={false} />
								<YAxis domain={[0, 7200]} tick={false} width={0} />
								{[
									1000 / MAX_VALUES[props.segment],
									2000 / MAX_VALUES[props.segment],
									3000 / MAX_VALUES[props.segment],
									4000 / MAX_VALUES[props.segment],
									5000 / MAX_VALUES[props.segment],
								].map((ratio, index) => (
									<ReferenceLine
										key={ratio}
										y={MAX_VALUES[props.segment] * ratio}
										stroke={["blue", "green", "yellow", "orange", "red"][index]}
										strokeWidth={5}
										className="opacity-15"
									/>
								))}

								<Tooltip cursor={false} content={<CustomTooltip />} />
								<Bar
									dataKey="graphYen"
									shape={
										<rect
											fill="gray"
											fillOpacity={0.2}
											stroke="black"
											strokeWidth={1}
											rx={4}
										/>
									}
								/>
								{limitedData.map((item) =>
									item.graphYen > 6900 ? (
										<ReferenceDot
											key={item.key}
											x={item.key}
											y={6000}
											shape={<CustomWaveAtPosition cx={0} cy={0} />}
											isFront={true}
										/>
									) : null,
								)}
							</BarChart>
						</ChartContainer>
					);
				}
				return (
					<ResponsiveContainer
						className="h-full w-full"
						width={
							props.segment === "month"
								? props.data.length * 43
								: props.data.length * 43.56
						}
					>
						<BarChart data={limitedData} barSize={30} width={500}>
							<CartesianGrid vertical={false} horizontal={false} />
							<XAxis dataKey="key" tickLine={false} axisLine={false} />
							<YAxis domain={[0, 7200]} tick={false} width={0} />
							{[
								1000 / MAX_VALUES[props.segment],
								2000 / MAX_VALUES[props.segment],
								3000 / MAX_VALUES[props.segment],
								4000 / MAX_VALUES[props.segment],
								5000 / MAX_VALUES[props.segment],
							].map((ratio, index) => (
								<ReferenceLine
									key={ratio}
									y={MAX_VALUES[props.segment] * ratio}
									stroke={["blue", "green", "yellow", "orange", "red"][index]}
									strokeWidth={5}
									className="opacity-15"
								/>
							))}

							<Tooltip cursor={false} content={<CustomTooltip />} />
							<Bar
								dataKey="graphYen"
								shape={
									<rect
										fill="gray"
										fillOpacity={0.2}
										stroke="black"
										strokeWidth={1}
										rx={4}
									/>
								}
							/>
							{limitedData.map((item) =>
								item.graphYen > 6900 ? (
									<ReferenceDot
										key={item.key}
										x={item.key}
										y={6000}
										shape={<CustomWaveAtPosition cx={0} cy={0} />}
										isFront={true}
									/>
								) : null,
							)}
						</BarChart>
					</ResponsiveContainer>
				);
			})()}
		</CardContent>
	);
};

export function GraphCard(props: GraphResponse) {
	return (
		<Card className="w-11/12 h-full border-x border-y shadow-none border-gray-400">
			<div className="grid grid-rows-[25%_75%] h-full">
				<GraphCardHeader
					date={props.date}
					yen={props.yen}
					left={props.left}
					right={props.right}
				/>
				<GraphCardContent data={props.data} segment={props.segment} />
			</div>
		</Card>
	);
}
