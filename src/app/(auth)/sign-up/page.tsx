import { redirect } from "next/navigation";
import { getCurrent } from "@/features/auth/actions";
import { SignUpCard } from "@/features/auth/components/SignUpCard";

const SignUpPage = async () => {
	const user = await getCurrent();
	if (user) redirect("/");

	return <SignUpCard />;
};

export default SignUpPage;
