import {
  useGetQuestions,
  useAnswerQuestion,
  type QuestionSummaryDto,
  type QuestionListResponse,
} from "@/api/generated";

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
  return useAnswerQuestion();
}
