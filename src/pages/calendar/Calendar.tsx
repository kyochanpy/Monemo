import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { addDays, format } from "date-fns";
import * as React from "react";

const generateDummyData = (startDate: Date, days: number) => {
	const data: { [key: string]: number } = {};
	for (let i = 0; i < days; i++) {
		const date = addDays(startDate, i);
		data[format(date, "yyyy-MM-dd")] = Math.floor(Math.random() * 7000);
	}
	return data;
};

const generateBreakdownData = (value: number) => {
	const categories = [
		"カテゴリーA",
		"カテゴリーB",
		"カテゴリーC",
		"カテゴリーD",
		"カテゴリーE",
		"カテゴリーF",
		"カテゴリーG",
		"カテゴリーH",
		"カテゴリーI",
		"カテゴリーJ",
		"カテゴリーK",
		"カテゴリーL",
		"カテゴリーM",
		"カテゴリーN",
		"カテゴリーO",
		"カテゴリーP",
		"カテゴリーQ",
		"カテゴリーR",
		"カテゴリーS",
		"カテゴリーT",
	];
	return categories.map((category) => ({
		category,
		value: Math.floor(Math.random() * (value + 1)),
	}));
};

export function CalendarPage() {
	const [date, setDate] = React.useState<Date | undefined>(new Date());
	const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
	const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

	// 表示される月の範囲を指定
	const startMonth = new Date(2023, 9, 1); // 10月（0始まりなので9）
	const endMonth = new Date(2023, 10, 1); // 11月

	// 表示される日付の範囲を計算
	const startDate = new Date(
		startMonth.getFullYear(),
		startMonth.getMonth(),
		1,
	);
	const endDate = new Date(endMonth.getFullYear(), endMonth.getMonth() + 1, 0); // 月末の日付

	// 表示される日数を計算
	const days =
		Math.floor(
			(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
		) + 1;

	// ダミーデータを表示される日付範囲に合わせて生成
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const dummyData = React.useMemo(() => {
		return generateDummyData(startDate, days);
	}, []);

	// 背景色を値に応じて設定する関数
	const getBackgroundColor = React.useCallback((value: number) => {
		if (value < 2000) return "custom-blue";
		if (value < 3000) return "custom-green";
		if (value < 4000) return "custom-yellow";
		if (value < 5000) return "custom-orange";
		return "custom-red";
	}, []);

	// 修正したmodifiers
	const modifiers = React.useMemo(() => {
		const mods: { [key: string]: Date[] } = {};
		for (const [dateString, value] of Object.entries(dummyData)) {
			const className = getBackgroundColor(value);
			if (!mods[className]) {
				mods[className] = [];
			}
			const [year, month, day] = dateString.split("-").map(Number);
			const date = new Date(year, month - 1, day);
			mods[className].push(date);
		}
		return mods;
	}, [dummyData, getBackgroundColor]);

	// modifiersStylesはそのまま
	const modifiersStyles = React.useMemo(() => {
		return {
			"custom-blue": { backgroundColor: "rgba(96, 165, 250, 0.3)" },
			"custom-green": { backgroundColor: "rgba(74, 222, 128, 0.3)" },
			"custom-yellow": { backgroundColor: "rgba(250, 204, 21, 0.3)" },
			"custom-orange": { backgroundColor: "rgba(251, 146, 60, 0.3)" },
			"custom-red": { backgroundColor: "rgba(248, 113, 113, 0.3)" },
		};
	}, []);

	const handleDayClick = (day: Date) => {
		setSelectedDate(day);
		setIsDrawerOpen(true);
	};

	return (
		<div className="flex justify-center items-center pt-4 pb-4 content-height">
			<Card className="w-5/6 h-full shadow-none flex justify-center items-center border-gray-400">
				<Calendar
					numberOfMonths={2}
					defaultMonth={startMonth}
					fromMonth={startMonth}
					toMonth={endMonth}
					selected={date}
					onSelect={setDate}
					modifiers={modifiers}
					modifiersStyles={modifiersStyles}
					onDayClick={handleDayClick}
					components={{
						DayContent: ({ date }: { date: Date }) => (
							<div className="flex items-center justify-center w-full h-full">
								{format(date, "d")}
								<span className="sr-only">{`値: ${
									dummyData[format(date, "yyyy-MM-dd")] || 0
								}`}</span>
							</div>
						),
					}}
				/>
				<Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
					<DrawerContent className="h-[50vh] max-h-[50vh]">
						<DrawerHeader>
							<DrawerDescription>
								{selectedDate && format(selectedDate, "yyyy年MM月dd日")}
							</DrawerDescription>
						</DrawerHeader>
						{selectedDate && (
							<div className="flex flex-col items-center">
								<span className="text-4xl font-bold mb-4">
									{dummyData[format(selectedDate, "yyyy-MM-dd")] || 0}
								</span>
								<ScrollArea className="h-64 w-5/6 rounded-md border p-4">
									{generateBreakdownData(
										dummyData[format(selectedDate, "yyyy-MM-dd")] || 0,
									).map((item, index) => (
										<div
											// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											key={index}
											className="flex justify-between items-center py-2 border-b last:border-b-0"
										>
											<span>12:34</span>
											<span>{item.value}</span>
										</div>
									))}
								</ScrollArea>
							</div>
						)}
					</DrawerContent>
				</Drawer>
			</Card>
		</div>
	);
}
