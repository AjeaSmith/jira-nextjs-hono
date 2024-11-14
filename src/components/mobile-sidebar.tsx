"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { MenuIcon } from "lucide-react";
import Sidebar from "./sidebar";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

const MobileSidebar = () => {
	const [isOpen, setOpen] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		setOpen(false);
	}, [pathname]);
    
	return (
		<Sheet modal={false} onOpenChange={setOpen} open={isOpen}>
			<SheetTrigger asChild>
				<Button variant="secondary" className="lg:hidden size-5">
					<MenuIcon className="size-4 text-neutral-500" />
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="p-0">
				<VisuallyHidden.Root>
					<SheetTitle>Menu</SheetTitle>
				</VisuallyHidden.Root>
				<Sidebar />
			</SheetContent>
		</Sheet>
	);
};

export default MobileSidebar;
