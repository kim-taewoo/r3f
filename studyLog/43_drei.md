영어로는 드레이라고 발음하지만 독일어 발음은 드라이? 같은 게 따로 있는듯.
helpers 모음이라고 보면 된다. Component 도 있고 hook 도 있고.

쓸 수 있는 게 아주 많으니 [공식 문서](https://github.com/pmndrs/drei)를 참고하자.

# OrbitControls

직접 설정하는 것보다 훨씬 쉽고, damping (더 부드러운 애니메이션) 과 같은 기능이 기본제공된다.

# TransformControls

TransformControls 의 object prop 으로 움직일 오브젝트의 ref 를 넣어주면 된다.
그런데 OrbitControls 를 움직이는 것과 TransformControls 를 움직이려는 것이 겹쳐서 이상하게 동작할 수 있기 때문에, OrbitControls 에 makeDefault prop 을 true 로 설정해주면 TransformContorls 를 조작하는동안 OrbitControls 는 동작하지 않는다.

# PivotControls

TransformControls 의 mode 들을 다 합쳐놓은 것 같은 편리한 컨트롤이다. 그 외에도 편리하게 쓸만한 prop(attributes) 들을 많이 가지고 있다. anchor prop 으로 위치를 설정할 수 있는데, children 의 중심점을 기준으로 `상대적` 인 위치를 잡는다. 즉 children 객체의 크기에 따라 같은 값이라도 위치가 달라진다.

depthTest 를 false 로 설정해서 오브젝트 안에 들어가도 컨트롤이 보이도록 할 수 있다.

# Html

Html mesh 라고 보면 된다.
`center` prop 을 통해 Html mesh 의 중심점(pivot point)을 설정할 수 있다. 이 때, children 의 크기에 따라 같은 값이라도 위치가 달라진다.

`distanceFactor` 로 줌인/아웃 때 같이 크기가 작아지도록 할 수 있다. 값은 대충 6 정도 하면 좋은듯하다.

`occlude` 로 어떤 객체로 가려지는지 설정할 수 있다. 이 때, occlude 는 ref 의 array 다.

## 3D text

SDF(signed Distance Field) 폰트를 쓰면 효율적인데, 상세 개념을 알 필요는 없다.
