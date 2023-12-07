# Args

R3F 의 모든 요소들은 args 를 설정할 수 있다. args 는 보통 array 형태로 전달하는데, 요소에 따라 args 로 설정하기 까다로운 건 args 가 아닌 개별 prop 으로 전달 가능하도록 되어있다.

# Size scale, position

크기나 위치를 조절할 때는 geometry 의 arg 를 수정하는 게 아니라 상위의 mesh 의 scale, position 을 조절해야 한다. geometry 의 arg 를 수정하면 geometry 가 통째로 제거되고 재생성되기에 아주 비효율적이다.

# rotation 방향

rotation-x 라는 건 x 축을 기준으로 돌린다는 것이고, 돌리는 방향은 시계방향이다. PlaneGeometry 를 예로 들어보면, 기본값이 화면 정면을 바라보고 있는데, rotation-x 를 `- Math.PI / 2` 로 설정하면, x 축을 기준으로 시계반대 방향으로 돌아서 화면 위를 바라보게 된다. `-` 를 붙이지 않으면 시계방향으로 돌아서 화면 아래를 바라보게 되고, 기본적으로 뒷면은 보이지 않기 때문에(렌더되지 않음) 화면에 아무것도 보이지 않게 된다.

# useFrame (애니메이션)

useFrame 을 사용하면, 매 프레임마다 실행되는 함수를 등록할 수 있다. 이 함수 안에서 mesh 의 rotation, position 등을 조절하면 애니메이션을 구현할 수 있다. 이 때 rotation, position 값을 react useState 의 state 로 관리하는 방식은 사용하면 안된다. useFrame 의 함수는 매 프레임마다 실행되는데, 이 때마다 useState 의 state 를 변경하면, react 가 state 를 변경했다고 판단하고 re-rendering 을 하게 된다. 이렇게 되면, 매 프레임마다 re-rendering 이 일어나서 성능이 매우 떨어지게 된다. 따라서, useFrame 의 함수 안에서는 useState 를 사용하지 않고, useRef 를 사용해서 mesh 의 rotation, position 등을 직접 관리해야 한다.

## useFrame callback

```js
useFrame((state, delta) => {
  cubeRef.current.rotation.y += delta;
});
```

위 같은 방식으로 useFrame 콜백에서 제공하는 delta 를 활용하면 화면 프레임이 다른 환경에서도 일정하게 동작하도록 할 수 있다.
