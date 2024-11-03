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

function getRandomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const graphApp = new Hono()
	.get("/week/:date", (c) => {
		c.header("Access-Control-Allow-Origin", "*");
		const _ = c.req.param("date");
		const response: GraphResponse = {
			data: [
				{ key: "月", yen: getRandomInt(0, 7000) },
				{ key: "火", yen: getRandomInt(5000, 9000) },
				{ key: "水", yen: getRandomInt(0, 7000) },
				{ key: "木", yen: getRandomInt(0, 7000) },
				{ key: "金", yen: getRandomInt(5000, 7000) },
				{ key: "土", yen: getRandomInt(0, 7000) },
				{ key: "日", yen: getRandomInt(5000, 9000) },
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
				{ key: 1, yen: getRandomInt(0, 7000) },
				{ key: 2, yen: getRandomInt(0, 7000) },
				{ key: 3, yen: getRandomInt(0, 7000) },
				{ key: 4, yen: getRandomInt(5000, 9000) },
				{ key: 5, yen: getRandomInt(0, 7000) },
				{ key: 6, yen: getRandomInt(0, 7000) },
				{ key: 7, yen: getRandomInt(5000, 7000) },
				{ key: 8, yen: getRandomInt(0, 7000) },
				{ key: 9, yen: getRandomInt(0, 7000) },
				{ key: 10, yen: getRandomInt(0, 7000) },
				{ key: 11, yen: getRandomInt(5000, 9000) },
				{ key: 12, yen: getRandomInt(0, 7000) },
				{ key: 13, yen: getRandomInt(0, 7000) },
				{ key: 14, yen: getRandomInt(5000, 9000) },
				{ key: 15, yen: getRandomInt(0, 7000) },
				{ key: 16, yen: getRandomInt(0, 7000) },
				{ key: 17, yen: getRandomInt(5000, 7000) },
				{ key: 18, yen: getRandomInt(0, 7000) },
				{ key: 19, yen: getRandomInt(0, 7000) },
				{ key: 20, yen: getRandomInt(0, 7000) },
				{ key: 21, yen: getRandomInt(0, 7000) },
				{ key: 22, yen: getRandomInt(5000, 9000) },
				{ key: 23, yen: getRandomInt(0, 7000) },
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
				{ key: 1, yen: 186000 },
				{ key: 2, yen: 70000 },
				{ key: 3, yen: 237000 },
				{ key: 4, yen: 123000 },
				{ key: 5, yen: 209000 },
				{ key: 6, yen: 214000 },
				{ key: 7, yen: 123000 },
				{ key: 8, yen: 186000 },
				{ key: 9, yen: 70000 },
				{ key: 10, yen: 237000 },
				{ key: 11, yen: 123000 },
				{ key: 12, yen: 209000 },
			],
			date: "2024年",
			yen: 11111111,
			left: true,
			right: false,
			segment: "year",
		};
		return c.json(response);
	});

type DescriptionData = {
	date: string;
	time: string;
	yen: number;
};

export type DescriptionResponse = {
	data: DescriptionData[];
};

const descriptionApp = new Hono().get("/", (c) => {
	c.header("Access-Control-Allow-Origin", "*");
	const response: DescriptionResponse = {
		data: [
			{ date: "2024-10-01", time: "07:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-01", time: "08:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-01", time: "09:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-01", time: "10:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-01", time: "11:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-01", time: "12:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-01", time: "13:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-01", time: "14:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-01", time: "15:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-01", time: "16:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-02", time: "07:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-02", time: "08:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-02", time: "09:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-02", time: "10:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-02", time: "11:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-02", time: "12:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-02", time: "13:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-02", time: "14:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-02", time: "15:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-02", time: "16:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-03", time: "07:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-03", time: "08:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-03", time: "09:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-03", time: "10:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-03", time: "11:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-03", time: "12:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-03", time: "13:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-03", time: "14:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-03", time: "15:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-03", time: "16:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-04", time: "07:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-04", time: "08:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-04", time: "09:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-04", time: "10:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-04", time: "11:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-04", time: "12:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-04", time: "13:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-04", time: "14:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-04", time: "15:23:24", yen: getRandomInt(0, 7000) },
			{ date: "2024-10-04", time: "16:23:24", yen: getRandomInt(0, 7000) },
		],
	};
	return c.json(response);
});

const app = new Hono()
	.route("/graph", graphApp)
	.route("/description", descriptionApp);

export type AppType = typeof app;

const port = 3000;

serve({
	fetch: app.fetch,
	port,
});
