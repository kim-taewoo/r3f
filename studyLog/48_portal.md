# tone mapping flat

최상위 Canvas 에 `flat` 을 주면 예뻐보이게 자체적으로 적용하던 tone mapping 을 끌 수 있다.(THREE.NoToneMapping 속성)

이걸 꺼야 하는 경우는 보통 Blender 같은 3D 소프트웨어에서 이미 색감이나 라이팅이 적용된 모델을 bake 해서 가져왔는데, 거기에 Three js 의 톤매핑을 추가하면 오히려 원하는 느낌이 안 날 수 있기 때문이다.
