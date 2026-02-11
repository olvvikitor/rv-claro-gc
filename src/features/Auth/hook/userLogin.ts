import { useMutation } from "@tanstack/react-query";
import { LoginDto, requestLogin } from "../services/authServices";

export function useLogin() {
  return useMutation({
    mutationFn: (payload: LoginDto) =>
      requestLogin(payload),
  });
}
