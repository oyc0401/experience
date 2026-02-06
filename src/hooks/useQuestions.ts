import {
  useGetQuestions,
  useAnswerQuestion,
  type QuestionSummaryDto,
  type QuestionListResponse,
} from "@/api/generated";
import { useQueryClient } from "@tanstack/react-query";

export function useQuestions() {
  const query = useGetQuestions();
  const raw = query.data?.data as unknown as QuestionListResponse | undefined;

  return {
    data: raw?.questions ?? ([] as QuestionSummaryDto[]),
    isLoading: query.isLoading,
    isError: query.isError,
  };
}

export function useAnswerQuestionMutation() {
  const queryClient = useQueryClient();
  return useAnswerQuestion({
    mutation: {
      onSettled: () => {
        queryClient.invalidateQueries();
      },
    },
  });
}
