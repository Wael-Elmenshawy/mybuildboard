import { login } from "../api/authApi";
import { getCurrentUser } from "../api/userApi";
import { useAuthStore } from "../store";
import type { LoginRequest } from "../types";

export function useAuth() {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setUser = useAuthStore((state) => state.setUser);

  async function signIn(payload: LoginRequest) {
    const response = await login(payload);

    setAccessToken(response.access_token);

    const user = await getCurrentUser();

    setUser(user);

    return response;
  }

  function signOut() {
    useAuthStore.getState().logout();
  }

  return {
    signIn,
    signOut,
  };
}
