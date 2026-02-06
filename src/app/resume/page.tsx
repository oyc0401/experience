"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ResumePage() {
  const router = useRouter();

  return (
    <div className="px-5 py-6">
      {/* 뒤로가기 */}
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm text-neutral-500 mb-5"
      >
        <ArrowLeft size={16} /> 돌아가기
      </button>

      <h1 className="font-bold text-lg mb-6">생성된 자소서</h1>

      {/* 자소서 문항 */}
      <div className="mb-5">
        <h2 className="text-xs font-bold text-neutral-500 mb-2">자소서 문항</h2>
        <div className="p-4 bg-white border border-neutral-200 rounded-xl text-xs leading-relaxed text-neutral-600 whitespace-pre-wrap">
          {`(*필수) [자기소개] AI 및 SW분야의 전문성을 키우기 위해 몰입했던 경험과 도전이 무엇인지, 또한 이러한 성장과정을 통해 얻은 배움은 무엇인지를 서술하여 주시기 바랍니다.(최소 400자, 최대 1000자 입력가능)\n\n(*필수) [연수계획서] AI·SW마에스트로 과정 참여를 통해 어떠한 프로젝트를 수행하고 싶은가요? 해당 프로젝트를 수행하기 위한 계획과 이루고자 하는 목표가 무엇인지 구체적으로 서술하여 주시기 바랍니다.(최소 400자, 최대 1000자 입력가능)`}
        </div>
      </div>

      {/* 생성된 자소서 */}
      <h2 className="text-xs font-bold text-neutral-500 mb-2">생성 결과</h2>
      <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100 text-sm leading-relaxed text-neutral-700 whitespace-pre-wrap space-y-5">
        <div>
          <p className="font-bold mb-2">[자기소개]</p>
          <p>
            저는 AI와 소프트웨어 개발에 대한 깊은 열정을 바탕으로, 대학 시절부터
            다양한 프로젝트와 도전을 통해 전문성을 쌓아 왔습니다. 특히 자연어 처리
            분야에 관심을 갖고 개인 프로젝트로 경험 기록 자동화 시스템을 개발한
            것이 가장 큰 몰입의 경험이었습니다. GitHub 커밋 로그와 블로그 글을
            AI가 자동으로 분석하여 핵심 경험을 추출하고, 사용자에게 회고 질문을
            생성하는 시스템을 설계하고 구현했습니다. 이 과정에서
            RAG(Retrieval-Augmented Generation) 파이프라인 구축, 프롬프트
            엔지니어링, 그리고 사용자 경험을 고려한 인터페이스 설계까지 풀스택으로
            경험할 수 있었습니다. 가장 큰 도전은 AI 응답의 품질과 일관성을
            보장하는 것이었으며, 반복적인 실험과 평가를 통해 프롬프트를 최적화하는
            과정에서 문제 해결 능력과 끈기를 기를 수 있었습니다. 이 경험을 통해
            기술적 깊이뿐 아니라, 사용자 관점에서 문제를 정의하고 해결하는 능력의
            중요성을 배웠습니다.
          </p>
        </div>
        <div>
          <p className="font-bold mb-2">[연수계획서]</p>
          <p>
            AI·SW마에스트로 과정에서 저는 &ldquo;개인 경험 기반 AI 커리어
            어시스턴트&rdquo; 프로젝트를 수행하고 싶습니다. 이 프로젝트는 개발자의
            일상적인 활동(코드 커밋, 기술 블로그, 학습 기록)을 자동으로
            수집·분석하여 체계적인 경험 데이터로 변환하고, 이를 기반으로
            자기소개서, 포트폴리오, 면접 답변을 AI가 생성해주는 서비스입니다.
            1단계로 GitHub, 노션, 블로그 등 다양한 소스에서 경험을 자동 추출하는
            파이프라인을 구축하고, 2단계로 추출된 경험을 벡터 DB에 저장하여 의미
            기반 검색이 가능한 개인 지식 베이스를 만들 계획입니다. 최종 목표는
            자소서 문항을 입력하면 사용자의 실제 경험을 기반으로 맞춤형 답변을
            생성하는 시스템을 완성하는 것입니다. 이를 통해 개발자들이 자신의 성장
            과정을 효과적으로 기록하고 활용할 수 있는 도구를 만들고자 합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
