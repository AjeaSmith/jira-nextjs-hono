import { useParams } from "next/navigation";

export const useWorkspaceId = () => {
	const { workspaceId } = useParams();
	return workspaceId as string;
};
