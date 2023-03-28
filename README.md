# interactive-web

## Parallax Scrolling

- 레이어별 스크롤 속도를 다르게 하여 입체감을 주는 디자인 기법
- JS or CSS를 활영하여 개발

### CSS perspective

- 해당 요소의 z = 0 평면과 사용자 사이의 거리를 정의
- `transform` 효과를 주고자 하는 부모 요소에 적용
- `perspective`에 따른 변형 효과
  - 클수록(거리가 멀수록) 변형 효과 적음
  - 작을수록(거리가 가까울수록) 변형 효과 큼
