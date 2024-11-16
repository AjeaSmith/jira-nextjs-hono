import { getCurrent } from "@/features/auth/actions";
import UserButton from "@/features/auth/components/userButton";
import CreateWorkspaceForm from "@/features/workspaces/components/create-workspace-form";
import { redirect } from "next/navigation";

export default async function Home() {
	const user = await getCurrent();

	if (!user) redirect("/sign-in");
	return (
		<div className="bg-neutral-500 p-4 h-full">
			<CreateWorkspaceForm />
		</div>
	);
}
