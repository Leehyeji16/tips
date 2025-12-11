// 각 단계별 콘텐츠 데이터
const stepsData = [
    {
        title: '벤치마킹 기업 정의',
        description: '미래 성장 모형은 IBK데이터베이스에서 과거 성공사례 30개를 선정하고,<br>해당 중소기업들의 성장 과정을 분석하여 공통적인 성공 패턴을 도출했습니다.',
        image: '../img/company_discovery/image-area.png'
    },
    {
        title: '성공 DNA 추출',
        description: '벤치마킹 과정을 통해 대체 데이터 라이브러리에서 14개의<br>공통 핵심 성장 요인과 107개의 잠재적 성장 DNA가 추출되었습니다.',
        image: '../img/company_discovery/image-area2.png'
    },
    {
        title: '성공 DNA 검증',
        description: '벤치마킹 과정을 통해 대체 데이터 라이브러리에서 14개의<br> 공통 핵심 성장 요인과 107개의 잠재적 성장 DNA가 추출되었습니다.',
        image: '../img/company_discovery/image-area3.png'
    },
    {
        title: '유망 기업 발굴',
        description: '미래성장모형을 IBK 데이터베이스에 등록된 74,394개<br>기업에 적용하였으며, 그중 선택된 산업 분야에서<br> 점수가 가장 높은 상위 30개 기업이 선정되었습니다.',
        image: '../img/company_discovery/image-area4.png'
    }
];

let currentStep = 0;

// 단계 변경 함수
function changeStep(stepIndex) {
    // 모든 step-item의 클래스 및 선 상태 초기화
    document.querySelectorAll('.step-item').forEach((item, index) => {
        item.classList.remove('active', 'completed');

        if (index < stepIndex) {
            // 이전 단계는 completed (선 완전히 채워진 상태)
            item.classList.add('completed');

            // 1, 2, 3번 선만 그라데이션으로 표시 (0, 1, 2 인덱스)
            if (index < 3) {
                item.style.setProperty('--line-height', '45px');
                item.style.setProperty('--line-gradient', 'linear-gradient(180deg, #6E42D9 0%, rgba(110, 66, 217, 0) 100%)');
            } else {
                // 4번 선은 없음
                item.style.setProperty('--line-height', '0px');
            }

        } else if (index === stepIndex) {
            // 현재 단계는 active
            item.classList.add('active');

            // 1, 2, 3번 단계일 때만 선을 애니메이션으로 채움
            if (index < 3) {
                setTimeout(() => {
                    let height = 0;
                    const duration = 1000; // 1초
                    const startTime = performance.now();

                    // 모든 선에 그라데이션 적용
                    item.style.setProperty('--line-gradient', 'linear-gradient(180deg, #6E42D9 0%, rgba(110, 66, 217, 0) 100%)');

                    function animateLine(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);

                        // easeOutCubic
                        const easeProgress = 1 - Math.pow(1 - progress, 3);
                        height = 45 * easeProgress;

                        item.style.setProperty('--line-height', `${height}px`);

                        if (progress < 1) {
                            requestAnimationFrame(animateLine);
                        }
                    }

                    requestAnimationFrame(animateLine);
                }, 100);
            } else {
                // 4번 단계는 선 없음
                item.style.setProperty('--line-height', '0px');
            }
        } else {
            // 이후 단계는 선 없음
            item.style.setProperty('--line-height', '0px');
        }
    });

    // 왼쪽 텍스트 페이드아웃
    const titleEl = document.getElementById('sectionTitle');
    const descEl = document.getElementById('sectionDescription');
    const imageEl = document.getElementById('imageArea');

    titleEl.style.opacity = '0';
    descEl.style.opacity = '0';
    imageEl.style.opacity = '0';

    // 500ms 후 텍스트 및 이미지 변경
    setTimeout(() => {
        titleEl.innerHTML = stepsData[stepIndex].title;
        descEl.innerHTML = stepsData[stepIndex].description;
        imageEl.style.backgroundImage = `url('${stepsData[stepIndex].image}')`;

        // 페이드인
        titleEl.style.opacity = '1';
        descEl.style.opacity = '1';
        imageEl.style.opacity = '1';
    }, 500);
}

// 페이지 로드 시 자동 진행 시작
document.addEventListener('DOMContentLoaded', function () {
    // 초기 이미지 설정
    const imageEl = document.getElementById('imageArea');
    imageEl.style.backgroundImage = `url('${stepsData[0].image}')`;

    // 첫 번째 스텝의 선을 바로 채움 (그라데이션)
    const firstStep = document.querySelector('.step-item[data-step="1"]');
    if (firstStep) {
        firstStep.style.setProperty('--line-gradient', 'linear-gradient(180deg, #6E42D9 0%, rgba(110, 66, 217, 0) 100%)');

        setTimeout(() => {
            let height = 0;
            const duration = 1000;
            const startTime = performance.now();

            function animateFirstLine(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                height = 45 * easeProgress;

                firstStep.style.setProperty('--line-height', `${height}px`);

                if (progress < 1) {
                    requestAnimationFrame(animateFirstLine);
                }
            }

            animateFirstLine(performance.now());
        }, 300);
    }

    // 3초마다 다음 단계로 이동
    const interval = setInterval(() => {
        currentStep++;

        if (currentStep < 4) {
            changeStep(currentStep);
        } else {
            clearInterval(interval);

            // STEP 04 완료 후 3초 뒤에 페이드아웃 시작
            setTimeout(() => {
                // 오버레이 요소 가져오기
                let overlay = document.querySelector('.page-transition-overlay');

                // 오버레이가 없으면 생성
                if (!overlay) {
                    overlay = document.createElement('div');
                    overlay.className = 'page-transition-overlay';
                    
                    // 직접 스타일 설정
                    overlay.style.cssText = `
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: #FAFAF6;
                        z-index: 9999;
                        opacity: 0;
                        transition: opacity 0.6s ease;
                        pointer-events: none;
                    `;
                    
                    document.body.appendChild(overlay);
                }

                // 약간의 지연 후 opacity 변경 (transition 적용을 위해)
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        overlay.style.opacity = '1';
                        overlay.style.pointerEvents = 'all';
                    });
                });

                // 650ms 후 페이지 이동
                setTimeout(() => {
                    location.href = 'company_discovery_after.html';
                }, 650);
            }, 3000);
        }
    }, 3000);
});