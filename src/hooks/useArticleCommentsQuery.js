import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

const getArticleComments = async (slug) => {
  const { data } = await axios.get(
    `${baseURL}/api/articles/${slug}/comments`
  );
  return data;
};

const deleteCommentApi = async ({ slug, id }) => {
  await axios.delete(`${baseURL}/api/articles/${slug}/comments/${id}`);
};

function useArticleCommentsQuery() {
  const { slug } = useParams();
  const queryClient = useQueryClient();

  const { isLoading: isArticleCommentsLoading, data: articleComments, error: articleCommentsError } = useQuery({
    queryKey: ["articleComments", slug],
    queryFn: () => getArticleComments(slug),
    refetchOnWindowFocus: true,
    staleTime: 0,
    cacheTime: 0,
  });

  const { mutate: deleteComment } = useMutation({
    mutationFn: deleteCommentApi,
    onSuccess: () => {
      alert("Comment successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["articleComments", slug] });
    },
    onError: (err) => alert(err.message),
  });

  return {
    isArticleCommentsLoading,
    articleComments,
    articleCommentsError,
    deleteComment,
  };
}

export default useArticleCommentsQuery;
