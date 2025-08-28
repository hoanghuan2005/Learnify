import React from "react";
import { signup } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/verify-otp", { state: { email: variables.email } });
    },
  });

  return { signupMutation: mutate, isPending, error };
};

export default useSignup;
