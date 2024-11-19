import { useMutation, useQueryClient } from "@tanstack/react-query";

import { InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<(typeof client.api.auth.logout)["$post"]>;

export const useLogout = () => {
	const router = useRouter();
	const queryClient = useQueryClient();

	const mutation = useMutation<ResponseType, Error>({
		mutationFn: async () => {
			const res = await client.api.auth.logout["$post"]();
			return await res.json();
		},
		onSuccess: () => {
			router.refresh();
			queryClient.invalidateQueries({ queryKey: ["current"] });
			queryClient.invalidateQueries({ queryKey: ["workspaces"] });
		},
	});
	return mutation;
};
