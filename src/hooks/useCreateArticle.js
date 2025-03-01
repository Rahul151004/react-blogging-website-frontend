import React from 'react'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const creteArticle = async (values) => {
    console.log("creteArticle", { values });

    const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/articles`,
        { article: {...values.values} }
      );

      console.log("creteArticleresult", { data });

    return data;
  };

export default function useCreateArticle() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();


  const { mutate: createArticle, isLoading: isCreating } = useMutation({
    mutationFn: creteArticle,
    onSuccess: () => {
      alert("New post successfully created");
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      navigate('/');
    },
    onError: (err) => alert(err.message),
  });

  return { isCreating, createArticle };
}