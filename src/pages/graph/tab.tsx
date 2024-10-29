import type { Dispatch, SetStateAction } from "react";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";

type SegmentTabType = {
	segmentSetter: Dispatch<SetStateAction<string>>;
};

export function SegmentTab(props: SegmentTabType) {
	return (
		<div className="bg-white flex items-center justify-center">
			<Tabs
				// onValueChange={setActiveSegment}
				defaultValue="week"
				className="w-11/12"
				onValueChange={props.segmentSetter}
			>
				<TabsList className="grid w-full grid-cols-3 bg-gray-200 h-full">
					<TabsTrigger
						value="week"
						className="font-title shadow-none border-none bg-gray-200 "
					>
						週
					</TabsTrigger>
					<TabsTrigger
						value="month"
						className="font-title shadow-none border-none bg-gray-200"
					>
						月
					</TabsTrigger>
					<TabsTrigger
						value="year"
						className="font-title shadow-none border-none bg-gray-200"
					>
						年
					</TabsTrigger>
				</TabsList>
			</Tabs>
		</div>
	);
}
