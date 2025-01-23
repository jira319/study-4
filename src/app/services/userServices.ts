import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '../types/dataInterface';
import { useToast } from '@chakra-ui/react';

// Fungsi untuk fetch semua user
export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('https://reqres.in/api/users');
      if (!response.ok) {
        throw new Error('Error');
      }
      return response.json();
    },
  });
};

// Fungsi untuk fetch user berdasarkan ID
export const useGetUserById = (id: number) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: async () => {
      const response = await fetch(`https://reqres.in/api/users/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    enabled: !!id, 
  });
};

// Fungsi untuk POST (menambahkan user)
export const usePostUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: User) => {
      const response = await fetch('https://reqres.in/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
      return response.json();
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] }); 
    },
  }); 
};

// Fungsi untuk PUT (mengedit user)
export const usePutUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: User }) => {
      const response = await fetch(`https://reqres.in/api/users/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      return response.json();
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

// Fungsi untuk DELETE (menghapus user)
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`https://reqres.in/api/users/${id}/`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] }); 
    },
  });
};
