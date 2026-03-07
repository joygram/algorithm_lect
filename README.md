# 자료구조 강의안 및 실습 (프로그래밍기능사 대비)

**→ 🖥 [GitHub Pages로 보기 (직접 링크)](https://joygram.github.io/algorithm_lect/)**

고등학교 특성화 자료구조 교과서를 바탕으로 한 강의 자료입니다. **언더테일 같은 턴제 RPG 만들기**를 하나의 줄거리로 두고, 세이브·메뉴·대사·스토리 분기·인벤·아이템 찾기까지 필요한 자료구조만 골라 배우도록 했어요. **중학생 수준**에서도 이해할 수 있도록 쉬운 말과 비유로 설명했고, **모바일에서도** 실습할 수 있는 웹 페이지를 포함합니다. **프로그래밍기능사** 필기·실기 대비와 **전년도 기출 유형 예제**를 함께 넣었어요.

## 구성

각 단원 강의는 **약 5분 읽기** 단위로 쪼개져 있어요. 단원을 누르면 "이 단원에서 읽을 글 목록"이 나오고, 하나씩 읽으면 집중이 잘 돼요.

| 단원 | 강의 (5분씩 읽기) | 실습 |
|------|-------------------|------|
| I | [자료와 자료 구조](lectures/01-index.html) (5편) | [진법 변환](practice/radix.html) · [리스트](practice/list.html) |
| II | [선형 구조](lectures/02-index.html) (4편) | [스택](practice/stack.html) · [큐](practice/queue.html) · [덱](practice/deque.html) |
| III | [비선형 구조](lectures/03-index.html) (4편) | [트리](practice/tree.html) · [그래프](practice/graph.html) |
| IV | [자료 정렬](lectures/04-index.html) (3편) | [정렬](practice/sort.html) |
| V | [자료 탐색](lectures/05-index.html) (3편) | [탐색](practice/search.html) |

- **📋 [전년도 기출 유형 예제](exam/past-exam.html)** — 스택/큐 출력 결과, 정렬 단계, 이진 탐색, 트리 순회 등 시험에 나온 유형을 중학생도 풀 수 있게 정리했어요.
- **📖 [용어 어원 & 프로그래밍 조크](fun/etymology-and-jokes.html)** — Bit, Byte, Algorithm, Bug, Stack, Queue, Hash, Cache 등 어원·유래와 짬짬이 읽기 좋은 프로그래밍 조크 모음.

## GitHub Pages로 보기 (직접 링크)

| 링크 | 설명 |
|------|------|
| **[https://joygram.github.io/algorithm_lect/](https://joygram.github.io/algorithm_lect/)** | 사이트 **직접 링크** (클릭하면 바로 이동). 슬래시 없이 `.../algorithm_lect`로 들어가도 자동으로 `/`가 붙어서 이동합니다. |

저장소에서 `index.html`을 눌러도 **소스만** 보이므로, 웹처럼 보려면 **GitHub Pages**를 켜야 합니다.

### 페이지가 안 뜰 때 (처음 설정)

1. **Settings** → 왼쪽 **Pages**
2. **Build and deployment** → **Source**를 **GitHub Actions**로 선택 (이 저장소에 `.github/workflows/deploy-pages.yml` 있음)
3. `main` 브랜치에 푸시한 뒤 **Actions** 탭에서 "Deploy to GitHub Pages" 워크플로가 **성공**했는지 확인
4. 배포 성공 후 **2~3분** 정도 지나면 위 링크로 접속 가능 (캐시 때문에 더 걸릴 수 있음)
5. 여전히 404면: **Source**를 **Deploy from a branch**로 바꾸고, **Branch** `main`, **Folder** `/ (root)` → **Save** 후 1~2분 기다리기

### 확인할 것

- 저장소 **루트**에 `index.html`, `css/`, `lectures/` 등이 있어야 함 (폴더 안에 또 넣어 두면 안 됨)
- 루트에 **.nojekyll** 파일이 있으면 Jekyll 없이 그대로 서비스됨 (이 프로젝트는 포함됨)

## 실행 방법 (로컬)

- `index.html`을 브라우저에서 열거나, 터미널에서 `npx serve .` 또는 `python -m http.server 8080` 실행 후 접속

## 테마

각 페이지 상단에서 **테마**를 바꿀 수 있어요. **라이트 / 다크 / 세피아 / 블루** 중 선택하면 `localStorage`에 저장되어 다음 방문 때도 유지됩니다.

## 모바일 실습

모든 실습 페이지는 **반응형**으로 제작되어 휴대폰에서도 터치로 조작할 수 있습니다.  
값 입력 후 버튼으로 Push/Pop, Enqueue/Dequeue, 정렬 단계 실행, 탐색 시뮬레이션 등을 할 수 있습니다.

## 라이선스

교육용으로 자유롭게 활용 가능합니다.
