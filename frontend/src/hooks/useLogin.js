import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { login } from '../lib/api';
import { useNavigate } from 'react-router';

const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/");
    },
  });

  return { loginMutation: mutate, isPending, error };
}

export default useLogin