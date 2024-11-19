import { Loader } from "lucide-react";
import React from "react";

const DashboardLoading = () => {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<Loader className="animate-spin size-6 text-muted-foreground" />
		</div>
	);
};

export default DashboardLoading;
