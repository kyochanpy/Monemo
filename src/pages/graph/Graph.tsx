import { GraphCard } from "./graphCard";
import { SegmentTab } from "./tab";

import { type ClientResponse, hc } from "hono/client";
import type { StatusCode } from "hono/utils/http-status";
import { useEffect, useState } from "react";
import type { AppType, GraphResponse } from "../../../mock-server/src/index";

export const description = "A bar chart";

export function Graph() {
	const client = hc<AppType>("http://localhost:3000");
	const [data, setData] = useState<GraphResponse>({
		data: [],
		date: "",
		left: false,
		right: false,
		yen: 0,
		segment: "week",
	});
	const [segment, setSegment] = useState("week");

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const fetchData = async () => {
			try {
				let res: ClientResponse<GraphResponse, StatusCode, "json">;
				if (segment === "week") {
					res = await client.graph.week[":date"].$get({
						param: { date: "2024-10-20" },
					});
				} else if (segment === "month") {
					res = await client.graph.month[":date"].$get({
						param: { date: "2024-10-20" },
					});
				} else {
					res = await client.graph.year[":date"].$get({
						param: { date: "2024-10-20" },
					});
				}
				const data = await res.json();
				setData(data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [segment]);

	return (
		<div className="grid grid-rows-[10%_90%] content-height">
			<SegmentTab segmentSetter={setSegment} />
			<div className="bg-white grid grid-rows-[2%_94%_4%]">
				<div />
				<div className="flex items-center justify-center h-full">
					<GraphCard
						data={data.data}
						date={data.date}
						yen={data.yen}
						left={data.left}
						right={data.right}
						segment={data.segment}
					/>
				</div>
				<div />
			</div>
		</div>
	);
}
