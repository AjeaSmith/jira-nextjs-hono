"use client";

import { useRouter } from "next/navigation";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { FaPlusCircle } from "react-icons/fa";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import WorkspaceAvatar from "@/features/workspaces/components/workspace-avatar";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

const WorkspaceSwitcher = () => {
	const router = useRouter();
	const workspaceId = useWorkspaceId();
	const { data: workspaces } = useGetWorkspaces();

	const onSelect = (id: string) => {
		router.push(`/workspaces/${id}`);
	};
	return (
		<div className="flex flex-col gap-y-2">
			<div className="flex items-center justify-between">
				<p className="text-xs uppercase text-neutral-500">Workspace</p>
				<FaPlusCircle className="size-5 text-neutral-500 cursor-pointer hover:opacity-75" />
			</div>
			<Select onValueChange={onSelect} value={workspaceId}>
				<SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
					<SelectValue placeholder="Select a workspace" />
				</SelectTrigger>
				<SelectContent>
					{workspaces?.documents.map((workspace) => (
						<SelectItem key={workspace.$id} value={workspace.$id}>
							<div className="flex justify-start items-center gap-3 font-medium">
								<WorkspaceAvatar name={workspace.name} />
								<span className="truncate">{workspace.name}</span>
							</div>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};

export default WorkspaceSwitcher;
