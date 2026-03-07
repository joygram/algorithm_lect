/**
 * 파이썬 실습 스니펫·가이드 (강의 인라인 + practice/pyodide.html 공용)
 */
window.PYODIDE_SNIPPETS = {
  list: '# 리스트: 맨 뒤에 추가 → append, 인덱스로 제거 → pop(인덱스)\narr = [10, 20, 30]\n# ① 빈칸: 리스트 맨 뒤에 40을 추가하는 메서드 (append / insert / pop 중)\narr._____(40)\nprint("append(40) 후:", arr)\n# ② 빈칸: 1번 인덱스(20)를 제거하려면? pop( ? )\narr.pop(_____)\nprint("pop(1) 후:", arr)\nprint("길이:", len(arr))',
  stack: '# 스택: 맨 위에만 넣기(push=append), 맨 위에서만 꺼내기(pop)\nstack = []\nstack.append("A")\n# ① 빈칸: 스택에 "B"를 넣으세요 (append 사용)\nstack._____("B")\nstack.append("C")\nprint("push A,B,C 후:", stack)\n# ② 빈칸: 맨 위에서 하나 꺼내서 변수 x에 넣기 (pop은 인자 없음)\nx = stack._____()\nprint("pop() →", x, ", 남은 스택:", stack)',
  queue: '# 큐: 먼저 넣은 게 먼저 나옴. popleft()로 앞에서 꺼냄\nfrom collections import deque\nq = deque(["첫번째", "두번째", "세번째"])\nprint("큐:", list(q))\n# 빈칸: 큐의 맨 앞에서 하나 꺼내는 메서드 (pop / popleft / append 중)\nout = q._____()\nprint("popleft() →", out)\nprint("남은 큐:", list(q))',
  bubble: '# 버블 정렬: 옆과 비교해서 큰 값을 오른쪽으로 보냄\narr = [64, 34, 25, 12, 22]\nprint("정렬 전:", arr)\nn = len(arr)\nfor i in range(n):\n    for j in range(0, n - 1 - i):\n        # ① 빈칸: arr[j]가 arr[j+1]보다 크면 자리 바꿈 (비교 연산자: > 또는 <)\n        if arr[j] _____ arr[j + 1]:\n            # ② 두 값 자리 바꾸기 (한 줄에 스왑)\n            arr[j], arr[j + 1] = _____\nprint("정렬 후:", arr)',
  binary: '# 이진 탐색: 정렬된 리스트에서 target 위치 찾기\narr = [2, 5, 8, 12, 16, 23, 38]\ntarget = 12\nleft, right = 0, len(arr) - 1\nwhile left <= right:\n    # ① 빈칸: 가운데 인덱스 (left와 right의 평균, 정수)\n    mid = _____\n    if arr[mid] == target:\n        print("찾음! 인덱스:", mid)\n        break\n    # ② 빈칸: target이 더 크면 왼쪽을 mid 다음으로 (left = ?)\n    if arr[mid] < target:\n        left = _____\n    else:\n        right = mid - 1\nelse:\n    print("없음")',
  flags: '# 게임: 비트 플래그 (진법/비트 연산 활용)\n# 비트0=업적1, 비트1=업적2, 비트2=업적3. 0b101 = 1번·3번 달성\nflags = 0b101\nprint("2진:", bin(flags), "10진:", flags)\n# 2번 업적 달성 추가: OR 연산 (1 << 2 = 0b100)\nflags = flags | (1 << 2)\nprint("2번 추가 후:", bin(flags))\n# 1번 업적 있는지 확인: AND\nprint("1번 달성?", bool(flags & (1 << 0)))',
  inventory: '# 게임: 인벤토리 (리스트 활용)\ninv = ["검", "물약", "방패"]\nprint("인벤:", inv)\ninv.append("열쇠")\nprint("획득 후:", inv)\n# 1번 슬롯(물약) 사용 후 제거\ninv.pop(1)\nprint("물약 사용 후:", inv)\nprint("2번 슬롯 아이템:", inv[2])',
  radix: '# 진법 변환: bin(), hex()로 검증\nprint(bin(25))   # 0b11001\nprint(hex(25))   # 0x19\n# 역으로 2진수 문자열 → 정수\nprint(int(\'11001\', 2))   # 25'
};

window.PYODIDE_GUIDES = {
  list: '① 맨 뒤에 추가 → append. ② 1번 인덱스 제거 → pop(1). 실행하면 append(40) 후: [10,20,30,40], pop(1) 후: [10,30,40] 나오면 맞아요.',
  stack: '① 스택에 넣기 → append. ② 맨 위에서 꺼내기 → pop() (괄호만). 실행하면 pop() → C, 남은 스택 [\'A\',\'B\'] 나오면 맞아요.',
  queue: '맨 앞에서 꺼내기 → popleft(). 실행하면 popleft() → 첫번째, 남은 큐 [\'두번째\',\'세번째\'] 나오면 맞아요.',
  bubble: '① 비교 연산자 > ② 스왑 arr[j+1], arr[j]. 정렬 후 [12,22,25,34,64] 나오면 맞아요.',
  binary: '① mid = (left+right)//2 ② left = mid+1. "찾음! 인덱스: 3" 나오면 맞아요.',
  flags: '비트 플래그: | 로 켜기, & 로 확인. 1<<n 이 n번 비트.',
  inventory: 'append로 획득, pop(인덱스)로 사용/제거, inv[i]로 i번 슬롯.',
  radix: 'bin(정수), hex(정수), int(문자열, 밑).'
};
