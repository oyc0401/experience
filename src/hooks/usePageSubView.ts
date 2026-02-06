import { useExperienceStore } from "@/stores/experience";
import { useHomeStore } from "@/stores/home";
import { useProfileStore } from "@/stores/profile";
import { useSearchStore } from "@/stores/search";
import type { PageId } from "@/stores/navigation";

/**
 * 각 탭의 하위뷰 상태를 통일된 인터페이스로 제공.
 * resetSubView는 가장 깊은 depth부터 한 단계씩 pop.
 */
export function usePageSubView(pageId: PageId) {
  const homeSubView = useHomeStore((s) => s.subView);
  const setHomeSubView = useHomeStore((s) => s.setSubView);
  const folderId = useExperienceStore((s) => s.folderId);
  const setFolderId = useExperienceStore((s) => s.setFolderId);
  const experienceId = useExperienceStore((s) => s.experienceId);
  const setExperienceId = useExperienceStore((s) => s.setExperienceId);
  const setQuery = useSearchStore((s) => s.setQuery);
  const profileSubPage = useProfileStore((s) => s.subPage);
  const setProfileSubPage = useProfileStore((s) => s.setSubPage);

  switch (pageId) {
    case "home":
      return {
        hasSubView: homeSubView !== null,
        resetSubView: () => setHomeSubView(null),
      };
    case "experience":
      return {
        hasSubView: folderId !== null || experienceId !== null,
        resetSubView: () => {
          if (experienceId) {
            setExperienceId(null);
          } else if (folderId) {
            setFolderId(null);
            setQuery("");
          }
        },
      };
    case "profile":
      return {
        hasSubView: profileSubPage !== null,
        resetSubView: () => setProfileSubPage(null),
      };
    default:
      return {
        hasSubView: false,
        resetSubView: () => {},
      };
  }
}
