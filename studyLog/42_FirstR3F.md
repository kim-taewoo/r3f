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

# useThree

useFrame 에서도 state 를 제공하지만, 매 프레임마다 호출하기 때문에 한 번만 호출되어야 하는 함수를 등록할 때는 useThree 를 사용한다.

# MeshBasicMaterial vs MeshStandardMaterial

BasicMaterial 은 shader, shadow, light 등이 적용되지 않는 단순 색이나 텍스쳐만 표현할 수 있다. StandardMaterial 은 shader, shadow, light 등이 적용되어 물리적인 속성을 표현할 수 있다. 따라서 StandardMaterial 을 사용하면 물체가 더 현실적으로 보이지만, 성능이 떨어진다. BasicMaterial 은 성능이 좋지만, 물리적인 속성을 표현할 수 없다.

# Geometry vs BufferGeometry

일단은 다음과 같이 생각. 커스텀 오브젝트를 만들 때는 BufferGeometry 를 사용하고, 기본적으로 제공되는 오브젝트를 사용할 때는 Geometry 를 사용하면 된다.

 <!-- 아래는 오토파일럿 자동생성 내용 -->

BufferGeometry 가 좀 더 최적화된 형태라고 생각하면 된다. BufferGeometry 는 vertices, faces, uvs 등을 각각의 buffer 로 관리한다. Geometry 는 vertices, faces, uvs 등을 각각의 array 로 관리한다. BufferGeometry 는 Geometry 보다 메모리를 덜 사용하고, 렌더링 속도가 더 빠르다. BufferGeometry 는 vertices, faces, uvs 등을 각각의 buffer 로 관리하기 때문에, vertices 를 수정하고 싶을 때는 vertices buffer 를 수정해야 한다. Geometry 는 vertices 를 array 로 관리하기 때문에, vertices 를 수정하고 싶을 때는 vertices array 를 수정하면 된다. BufferGeometry 는 vertices 를 수정할 때마다 buffer 를 생성하고, Geometry 는 vertices 를 수정할 때마다 array 를 생성한다. 따라서, vertices 를 수정하는 빈도가 높다면 Geometry 를 사용하는 게 좋고, vertices 를 수정하는 빈도가 낮다면 BufferGeometry 를 사용하는 게 좋다.

# R3F 디폴트 light

기본적으로 +y 위치에서 center 를 바라보고 있는 빛이다. position 을 바꿔도 여전히 center 를 바라보고 있는 게 기본 설정이다.

directionalLight 만으로는 빛이 아예 없는 면이 생겨 오히려 어색하기 때문에, ambientLight 를 추가해야 한다. intensity 는 directionalLight 는 4.5, ambientLight 는 1.5 정도로 설정하면 좋다.

# Vertices and Float32Array

Vertices 는 Vertex 의 복수형인데, 하나의 vertex 는 x,y,z 좌표가 필요하다. 따라서 vertices 는 3개의 숫자가 한 쌍인 array 이다. 이 때, vertices 는 Float32Array 로 생성해야 한다. Float32Array 는 32bit float 형태의 array 이다. 이 때문에, vertices 를 생성할 때는 아래와 같이 3개의 숫자를 가진 array 를 3개를 가진 array 로 감싸서 생성해야 한다.

<!-- prettier-ignore -->
```js
const vertices = new Float32Array([
  0, 0, 0, // 1st vertex
  0, 1, 0, // 2nd vertex
  1, 0, 0, // 3rd vertex
]);
```

우리가 custom object 를 만든다는 건 결국 수많은 삼각형을 그린다는 것인데, 이 삼각형 한 개당 3개의 vertices 가 필요하기 때문에, total vertices count 는 삼각형의 개수 x 3 이 된다.

# normals

normals 는 3d coordinates 종류라고 보면 되는데, three js 가 알아서 계산해서 빛을 반영하도록 `computeVertexNormals` 를 쓸 수 있다.
좀 특이하게 `ref.current.computeVertexNormals()` 를 호출하면 된다. 이 때, ref 는 BufferGeometry 의 ref 이다. 그런데 이 호출을 dom 이 렌더된 뒤에 해야 에러가 없기 때문에 useEffect 에서 호출해야 한다.

# R3F Canvas

자동으로 Camera, scene, renderer, antialias, encoding(최근엔 colorSpace 라고 부름), field of view, pixel ratio 등을 세팅해주는 고마운 기본값을 가지고 있다. 기본값을 바꾸고 싶다면 Canvas props 를 통해 바꿀 수 있다.
예를 들어 `orthographic` 을 `true` 로 설정하면, depth 없는 카메라가 되고, 이 때 camera prop 의 zoom 을 통해 zoom in/out 을 할 수 있다.

## Pixel ratio dpr

R3F 의 기본값이 최소 1, 최대 2이므로, 2를 초과하는 과하게 높은 dpr 을 자동으로 막아주고 있다. (3 이면 3\*3, 즉 1 인 화면에 비해 9배 더 많은 픽셀을 그려야 함.. 그런 기기를 굳이 지원할 필요가 없다고 판단한 것 같다.)

# 참고 자료

## Performance

Everything we learned about performance with Three.js still applies here (minimise draw calls, simplify models, avoid big textures, etc.)

But R3F and React also made possible some interesting features to improve performance.

Those improvements are well explained on the following page from the R3F documentation: [Scaling performance](https://docs.pmnd.rs/react-three-fiber/advanced/scaling-performance#instancing)

Have a look in case you need it at some point, but we are going to put some of those into practice later.

## Going further

In the next lessons, we are going to dive deeper into R3F, but if you want to discover things on your own, here are some resources.

The documentation is very complete and easy to use https://docs.pmnd.rs/react-three-fiber/getting-started/introduction
Paul Henschel (@0xca0a) made a great tutorial that will guide you in creating an “Awwwards-type” website with R3F https://twitter.com/0xca0a/status/1445409346305892353
The PMNDRS’ Discord is full of awesome people that will be glad to help you if you need them to: https://discord.com/invite/poimandres
Hazem (@HazemOIbrahim) recreated some of the Three.js Journey lessons with R3F https://journey.pmnd.rs/
