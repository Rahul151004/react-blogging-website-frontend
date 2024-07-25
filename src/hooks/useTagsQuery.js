import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from 'axios';

const getAllTags = async () => {
  const {data} = await axios.get(`${process.env.import.meta.env.VITE_BASE_URL}/api/tags`);

//   console.log("getCurrentUser", { data });

  return data;
};

function useTagsQuery() {
  const {
    isLoading: isTagsLoading,
    data: tags,
    error: tagsError,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: getAllTags,
    refetchOnWindowFocus: true,
    staleTime: 0,
    cacheTime: 0,
  });
  return {
    isTagsLoading,
    tags,
    tagsError,
  };
}

export default useTagsQuery;