import { GraphCard } from "./graphCard";
import { SegmentTab } from "./tab";

export const description = "A bar chart";

export function Graph() {
	return (
		<div className="grid grid-rows-[10%_90%] content-height">
			<SegmentTab />
			<div className="bg-white grid grid-rows-[2%_94%_4%]">
				<div />
				<div className="flex items-center justify-center h-full">
					<GraphCard />
				</div>
				<div />
			</div>
		</div>
	);
}
