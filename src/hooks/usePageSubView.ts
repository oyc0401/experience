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
  const postId = useExperienceStore((s) => s.postId);
  const setPostId = useExperienceStore((s) => s.setPostId);
  const articleId = useExperienceStore((s) => s.articleId);
  const setArticleId = useExperienceStore((s) => s.setArticleId);
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
        hasSubView: postId !== null,
        resetSubView: () => {
          if (articleId) {
            setArticleId(null);
          } else {
            setPostId(null);
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
