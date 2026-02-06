import {
  useGetFolders,
  useGetExperiencesByFolder,
  useGetExperienceDetail,
  useCreateExperience,
  type FolderItemDto,
  type FolderListResponse,
  type ExperienceSummaryDto,
  type ExperienceListResponse,
  type ExperienceDetailResponse,
} from "@/api/generated";
import { useQueryClient } from "@tanstack/react-query";

export function useFolders() {
  const query = useGetFolders();
  const raw = query.data?.data as unknown as FolderListResponse | undefined;

  return {
    data: raw?.folders ?? ([] as FolderItemDto[]),
    isLoading: query.isLoading,
    isError: query.isError,
  };
}

export function useExperiencesByFolder(folderId: number) {
  const query = useGetExperiencesByFolder({ folderId });
  const raw = query.data?.data as unknown as ExperienceListResponse | undefined;

  return {
    data: raw?.experiences ?? ([] as ExperienceSummaryDto[]),
    isLoading: query.isLoading,
    isError: query.isError,
  };
}

export function useExperienceDetail(experienceId: number) {
  const query = useGetExperienceDetail(experienceId, {
    query: { enabled: !!experienceId },
  });
  const raw = query.data?.data as unknown as ExperienceDetailResponse | undefined;

  return {
    data: raw ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}

export function useCreateExperienceMutation() {
  const queryClient = useQueryClient();
  return useCreateExperience({
    mutation: {
      onSettled: () => {
        queryClient.invalidateQueries();
      },
    },
  });
}
