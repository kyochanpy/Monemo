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
	XAxis,
	YAxis,
} from "recharts";

import { Button } from "@/components/ui/button";
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
	return (
		<CardContent className="w-full overflow-x-scroll hidden-scrollbar">
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
								{props.data.map((item) =>
									item.yen > 6900 ? (
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
						width={props.data.length * 45}
						className="h-full w-full"
					>
						<BarChart data={props.data} barSize={30} width={500}>
							<CartesianGrid vertical={false} className="opacity-20" />
							<XAxis dataKey="key" tickLine={false} axisLine={false} />
							<YAxis
								domain={[0, props.segment === "month" ? 7200 : 216000]}
								tick={false}
								width={0}
							/>
							<ReferenceLine
								y={props.segment === "month" ? 1000 : 30000}
								stroke="blue"
								strokeWidth={5}
								className="opacity-15"
							/>
							<ReferenceLine
								y={props.segment === "month" ? 2000 : 60000}
								stroke="green"
								strokeWidth={5}
								className="opacity-15"
							/>
							<ReferenceLine
								y={props.segment === "month" ? 3000 : 90000}
								stroke="yellow"
								strokeWidth={5}
								className="opacity-20"
							/>
							<ReferenceLine
								y={props.segment === "month" ? 4000 : 120000}
								stroke="orange"
								strokeWidth={5}
								className="opacity-15"
							/>
							<ReferenceLine
								y={props.segment === "month" ? 5000 : 150000}
								stroke="red"
								strokeWidth={5}
								className="opacity-15"
							/>

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
							{props.data.map((item) =>
								item.yen > (props.segment === "month" ? 6900 : 210000) ? (
									<ReferenceDot
										key={item.key}
										x={item.key}
										y={props.segment === "month" ? 6000 : 180000}
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
