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
		<div className="fixed flex flex-col h-screen w-full">
			<div className="flex justify-center items-center w-full h-16 bg-white border-b">
				<h1 className="text-xl font-title">{getTitle()}</h1>
			</div>
			<BottomTabs defaultValue="graph" onValueChange={setActiveTab}>
				<div className="flex-1 overflow-auto">
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
				<div className="fixed bottom-0 w-full border-t">
					<BottomTabsList className="grid w-full grid-cols-3 h-16 bg-white">
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
