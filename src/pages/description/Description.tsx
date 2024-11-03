// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator";
// import { type ClientResponse, hc } from "hono/client";
// import type { StatusCode } from "hono/utils/http-status";
// import { useEffect, useState } from "react";
// import type {
// 	AppType,
// 	DescriptionResponse,
// } from "../../../mock-server/src/index";

// export function Description() {
// 	const client = hc<AppType>("http://localhost:3000");
// 	const [data, setData] = useState<DescriptionResponse>({
// 		data: [],
// 	});

// 	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
// 	useEffect(() => {
// 		const fetchData = async () => {
// 			try {
// 				const res = await client.description.$get();
// 				const data = await res.json();
// 				setData(data);
// 			} catch (error) {
// 				console.error("Error fetching data:", error);
// 			}
// 		};

// 		fetchData();
// 	}, []);

// 	return (
// 		<ScrollArea className="h-72 w-48 rounded-md border">
// 			<div className="p-4">
// 				{data.data.map((item) => (
// 					<>
// 						<div key={item.date} className="text-sm">
// 							{item.yen}
// 						</div>
// 						<Separator className="my-2" key={item.date} />
// 					</>
// 				))}
// 			</div>
// 		</ScrollArea>
// 	);
// }
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { type ClientResponse, hc } from "hono/client";
import type { StatusCode } from "hono/utils/http-status";
import { useEffect, useRef, useState } from "react";
import type {
	AppType,
	DescriptionResponse,
} from "../../../mock-server/src/index";

const barColor = (yen: number) => {
	if (yen < 2000) {
		return "bg-blue-600";
	}
	if (yen < 3000) {
		return "bg-green-600";
	}
	if (yen < 4000) {
		return "bg-yellow-600";
	}
	if (yen < 5000) {
		return "bg-orange-600";
	}
	return "bg-red-600";
};

const textColor = (yen: number) => {
	if (yen < 2000) {
		return "text-blue-600";
	}
	if (yen < 3000) {
		return "text-green-600";
	}
	if (yen < 4000) {
		return "text-yellow-600";
	}
	if (yen < 5000) {
		return "text-orange-600";
	}
	return "text-red-600";
};

export function Description() {
	const client = hc<AppType>("http://localhost:3000");
	const [data, setData] = useState<DescriptionResponse>({ data: [] });
	const [isLoading, setIsLoading] = useState(false);
	const observerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		// 初期データの取得
		fetchData();
	}, []);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !isLoading) {
					fetchData();
				}
			},
			{ root: null, rootMargin: "0px", threshold: 1.0 },
		);

		if (observerRef.current) observer.observe(observerRef.current);

		return () => {
			if (observerRef.current) observer.unobserve(observerRef.current);
		};
	}, [isLoading]);

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const res = await client.description.$get();
			const newData = await res.json();
			setData((prev) => ({
				data: [...prev.data, ...newData.data],
			}));
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="content-height">
			<ScrollArea className="h-full w-full overflow-y-scroll">
				<div className="p-5">
					{data.data.map((item, index) => (
						<div key={`${item.date}-${index}`}>
							<div className="h-16 grid grid-cols-[3%_47%_50%] font-title">
								<div
									className={`rounded-lg ${barColor(item.yen)} opacity-30`}
								/>
								<div className="grid gird-rows-[50%_50%] text-xl">
									<div className="flex items-center pl-6">{item.date}</div>
									<div className="flex items-center pl-6">{item.time}</div>
								</div>
								<div
									className={`flex items-center justify-end pr-10 text-4xl ${textColor(item.yen)} opacity-70`}
								>
									{item.yen}
								</div>
							</div>
							<Separator className="my-2" />
						</div>
					))}
					<div ref={observerRef} className="h-4" />
					{isLoading && <p className="text-center text-sm">Loading...</p>}
				</div>
			</ScrollArea>
		</div>
	);
}
