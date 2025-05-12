import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";

import { cn } from "@/lib/utils";

const BottomTabs = TabsPrimitive.Root;

const BottomTabsList = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.List>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.List
		ref={ref}
		className={cn(
			"inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
			className,
		)}
		{...props}
	/>
));
BottomTabsList.displayName = TabsPrimitive.List.displayName;

const BottomTabsTrigger = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.Trigger
		ref={ref}
		className={cn(
			"inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none disabled:pointer-events-none relative flex-col h-full bg-opacity-0 opacity-15 data-[state=active]:opacity-100 border-none shadow-none focus:bg-transparent active:bg-transparent",
			className,
		)}
		{...props}
	/>
));
BottomTabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const BottomTabsContent = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.Content
		ref={ref}
		className={cn(
			"mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
			className,
		)}
		{...props}
	/>
));
BottomTabsContent.displayName = TabsPrimitive.Content.displayName;

export { BottomTabs, BottomTabsList, BottomTabsTrigger, BottomTabsContent };
