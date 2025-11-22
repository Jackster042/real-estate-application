import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function createNewUserInDatabase(
  user: any,
  idToken: any,
  userRole: string,
  fetchWithBQ: any
) {
  const createEndpoint =
    userRole?.toLowerCase() === "manager" ? "/managers" : "/tenants";

  const createUserResponse = await fetchWithBQ({
    url: createEndpoint,
    method: "POST",
    body: {
      cognitoId: user.userId,
      name: user.username,
      email: idToken?.payload.email || "",
      phoneNumber: "",
    },
  });

  if (createUserResponse.error) {
    throw new Error(createUserResponse.error.message);
  }

  return createUserResponse;
}
