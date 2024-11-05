import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { addDays, format } from "date-fns";
import * as React from "react";

const generateDummyData = (startDate: Date, days: number) => {
	const data: { [key: string]: number } = {};
	for (let i = 0; i < days; i++) {
		const date = addDays(startDate, i);
		data[format(date, "yyyy-MM-dd")] = Math.floor(Math.random() * 101);
	}
	return data;
};

export function CalendarPage() {
	const [date, setDate] = React.useState<Date | undefined>(new Date());

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
	const dummyData = React.useMemo(() => {
		return generateDummyData(startDate, days);
	}, [startDate, days]);

	// 背景色を値に応じて設定する関数
	const getBackgroundColor = React.useCallback((value: number) => {
		if (value < 20) return "custom-blue";
		if (value < 40) return "custom-green";
		if (value < 60) return "custom-yellow";
		if (value < 80) return "custom-orange";
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

	return (
		<div className="flex justify-center items-center pt-4 pb-4 content-height bg-ye">
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
			</Card>
		</div>
	);
}
