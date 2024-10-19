export function Graph() {
	return (
		<div id="page-container" className="grid h-full grid-rows-[10%_20%_70%]">
			{/* Segment */}
			<div id="tab-container" className="bg-gray-200 ">
				segment
			</div>

			{/* Date, Money and Pagination Section */}
			<div id="date-money-pagenation-container" className=" bg-gray-100">
				{/* Left Pagination */}
				<div id="left-pagenation-container" className="">
					L
				</div>

				{/* Date and Money */}
				<div id="date-money-container" className="items-center">
					<div id="date-container" className="text-lg">
						date
					</div>
					<div id="money-container" className="text-lg">
						money
					</div>
				</div>

				{/* Right Pagination */}
				<div id="right-pagenation-container" className="">
					R
				</div>
			</div>

			{/* Graph */}
			<div id="graph-container" className="bg-gray-500 ">
				graph
			</div>
		</div>
		// <h1>Graph</h1>
	);
}
