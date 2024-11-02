import { serve } from "@hono/node-server";
import { Hono } from "hono";

type GraphData = {
	key: string | number;
	yen: number;
};

export type GraphResponse = {
	data: GraphData[];
	date: string;
	yen: number;
	left: boolean;
	right: boolean;
	segment: "week" | "month" | "year";
};

const graphApp = new Hono()
	.get("/week/:date", (c) => {
		c.header("Access-Control-Allow-Origin", "*");
		const _ = c.req.param("date");
		const response: GraphResponse = {
			data: [
				{ key: "月", yen: 1860 },
				{ key: "火", yen: 97000 },
				{ key: "水", yen: 2370 },
				{ key: "木", yen: 1230 },
				{ key: "金", yen: 2090 },
				{ key: "土", yen: 2140 },
				{ key: "日", yen: 1230 },
			],
			date: "10/1 ~ 10/7",
			yen: 111111,
			left: true,
			right: false,
			segment: "week",
		};
		return c.json(response);
	})
	.get("/month/:date", (c) => {
		c.header("Access-Control-Allow-Origin", "*");
		const _ = c.req.param("date");
		const response: GraphResponse = {
			data: [
				{ key: 1, yen: 1860 },
				{ key: 2, yen: 7000 },
				{ key: 3, yen: 237 },
				{ key: 4, yen: 1230 },
				{ key: 5, yen: 2090 },
				{ key: 6, yen: 2140 },
				{ key: 7, yen: 1230 },
				{ key: 8, yen: 1860 },
				{ key: 9, yen: 7000 },
				{ key: 10, yen: 2370 },
				{ key: 11, yen: 1230 },
				{ key: 12, yen: 2090 },
				{ key: 13, yen: 0 },
				{ key: 14, yen: 0 },
				{ key: 15, yen: 0 },
				{ key: 16, yen: 0 },
				{ key: 17, yen: 0 },
				{ key: 18, yen: 0 },
				{ key: 19, yen: 0 },
				{ key: 20, yen: 0 },
				{ key: 21, yen: 0 },
				{ key: 22, yen: 0 },
				{ key: 23, yen: 0 },
				{ key: 24, yen: 0 },
				{ key: 25, yen: 0 },
				{ key: 26, yen: 0 },
				{ key: 27, yen: 0 },
				{ key: 28, yen: 0 },
				{ key: 29, yen: 0 },
				{ key: 30, yen: 0 },
			],
			date: "10月",
			yen: 1111111,
			left: true,
			right: false,
			segment: "month",
		};
		return c.json(response);
	})
	.get("/year/:date", (c) => {
		c.header("Access-Control-Allow-Origin", "*");
		const _ = c.req.param("date");
		const response: GraphResponse = {
			data: [
				{ key: 1, yen: 1860 },
				{ key: 2, yen: 7000 },
				{ key: 3, yen: 2370 },
				{ key: 4, yen: 1230 },
				{ key: 5, yen: 2090 },
				{ key: 6, yen: 2140 },
				{ key: 7, yen: 1230 },
				{ key: 8, yen: 1860 },
				{ key: 9, yen: 7000 },
				{ key: 10, yen: 2370 },
				{ key: 11, yen: 1230 },
				{ key: 12, yen: 2090 },
			],
			date: "2024年",
			yen: 11111111,
			left: true,
			right: false,
			segment: "year",
		};
		return c.json(response);
	});

const app = new Hono().route("/graph", graphApp);

export type AppType = typeof app;

const port = 3000;

serve({
	fetch: app.fetch,
	port,
});
