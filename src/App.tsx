import "./App.css";
import {
	BottomTabs,
	BottomTabsContent,
	BottomTabsList,
	BottomTabsTrigger,
} from "@/components/ui/bottomTabs";

import { ChartColumn, List } from "lucide-react";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { CalendarPage } from "./pages/calendar/Calendar";
import { Description } from "./pages/description/Description";
import { Graph } from "./pages/graph/Graph";

function App() {
	const [activeTab, setActiveTab] = useState("graph");
	// const [activeSegment, setActiveSegment] = useState("week");

	const getTitle = () => {
		switch (activeTab) {
			case "graph":
				return "グラフ";
			case "calendar":
				return "カレンダー";
			case "description":
				return "利用詳細";
			default:
				return "Title";
		}
	};

	return (
		<div className="">
			{/* Title 部分を上に固定 */}
			<div className="h-16 w-full border-b flex justify-center items-center bg-white border-gray-400">
				<h1 className="text-xl font-title">{getTitle()}</h1>
			</div>

			{/* 残りのスペースに BottomTabs コンテンツを配置 */}
			<BottomTabs
				defaultValue="graph"
				onValueChange={setActiveTab}
				className=" fixed flex flex-col h-screen w-full gap-0 bg-white"
			>
				{/* コンテンツ部分 */}
				<div className="h-full">
					<BottomTabsContent value="graph">
						<Graph />
					</BottomTabsContent>
					<BottomTabsContent value="calendar">
						<CalendarPage />
					</BottomTabsContent>
					<BottomTabsContent value="description">
						<Description />
					</BottomTabsContent>
				</div>

				{/* BottomTabsList を下に固定 */}
				<div className="w-full border-t fixed bottom-0 h-16 border-gray-400">
					<BottomTabsList className="grid w-full grid-cols-3 bg-white h-16">
						<BottomTabsTrigger value="graph">
							<ChartColumn strokeWidth={activeTab === "graph" ? 2 : 1} />
						</BottomTabsTrigger>
						<BottomTabsTrigger value="calendar">
							<Calendar strokeWidth={activeTab === "calendar" ? 2 : 1} />
						</BottomTabsTrigger>
						<BottomTabsTrigger value="description">
							<List strokeWidth={activeTab === "description" ? 2 : 1} />
						</BottomTabsTrigger>
					</BottomTabsList>
				</div>
			</BottomTabs>
		</div>
	);
}

export default App;
