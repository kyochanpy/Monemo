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

	return (
		<div className="fixed flex-col h-screen">
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
