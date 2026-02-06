import {
  useGetRecentExperiences,
  type ExperienceSummaryDto,
  type ExperienceListResponse,
} from "@/api/generated";

export function useRecentExperiences(size?: number) {
  const query = useGetRecentExperiences(size ? { size } : undefined);
  const raw = query.data?.data as unknown as ExperienceListResponse | undefined;

  return {
    data: raw?.experiences ?? ([] as ExperienceSummaryDto[]),
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
