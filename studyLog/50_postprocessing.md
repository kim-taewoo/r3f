Passes 를 통과하면서 postprocessing 된다고 배웠었는데,
r3f 에서는 Effect 라는 것들을 조합해서(compose) 1개 혹은 여러개의 Passes 를 최적화해서 만들어낸다.

```jsx
// disableNormalPass 를 해야 EffectComposer 의 버그인 씬을 MeshNormalMaterial 로 렌더링하는 것을 막을 수 있다.
<EffectComposer disableNormalPass></EffectComposer>
```

# Multisampling

EffectComposer 에서 우리가 볼 속성은(오직 하나) Multisampling 이다. 이 마저도 그냥 디폴트 값 그대로 사용하면 되기에 건들 일은 없을듯

multisampling is a technique to reduce aliasing (jagged edges) in images rendered in realtime. anti-aliasing 이랑 같은 말이다.

default value is 8, (copilot: which means that the scene will be rendered 8 times and the results will be averaged.)
값을 0 까지 낮추면 multisampling 을 끌 수 있다. 이 때, multisampling 을 끄면 렌더링 속도가 빨라지지만, aliasing 이 발생한다.

# 참고 자료

일반 버전과 리액트 버전 둘 다 공부해야 하는 고충이 있다..

## Post Processing:

The repository: https://github.com/pmndrs/postprocessing
The documentation (generated from the code): https://pmndrs.github.io/postprocessing/public/docs/
A demo page (you can change the effect within the debug UI): https://pmndrs.github.io/postprocessing/public/demo/

## React-postprocessing:

The repository: https://github.com/pmndrs/reactpostprocessing
The list of effects implemented from postprocessing to React postprocessing: https://github.com/pmndrs/postprocessing#included-effects
The documentation (very similar to the repo, but more user-friendly): https://docs.pmnd.rs/react-postprocessing/introduction

# Tone mapping in React-postprocessing

In the latest versions of Three.js, the tone mapping won’t work anymore when using Post Processing.

To fix that, you must import ToneMapping from @react-three/postprocessing and use it in the EffectComposer.

# Effects 예

## Vigentte

시야가 좁아진 듯한 표현을 해주는 효과 (가장자리를 타원형으로 어둡게)

```jsx
<Vignette
  eskil={false}
  offset={0.1}
  darkness={0.5}
  // make it circular
  // aspectRatio={1}
  // cropFactor={1}
/>
```

# Blending

여러 겹의 레이어(Effects)가 합쳐질 때 어떻게 합쳐질지를 결정하는 것
디폴트 블렌딩은 `normal` 이다. 걍 위에 그리는 것

`postprocessing` 라이브러리의 BlendFunction 을 이용

# Edge cases

배경색을 지정하지 않아 투명한 상태면, Effects 가 그 부분에 제대로 적용 안될 수 있다.
따라서 명시적으로 배경색을 지정해주자.

```jsx
<color args={["ffffff"]} attach="background" />
```

# Glitch Effect

여기저기서 보던 효과. 재밌군

Glitch Effect 자체는 jsx 형태로 `react-three/postprocessing` 라이브러리에서 가져오더라도, mode 속성을 변경시키고 싶다면 `postprocessing` 라이브러리에서 따로 `GlitchMode` 를 import 해서 가져와야 한다.

# Noise

`blendFunction={ BlendFunction.SOFT_LIGHT }` 가 보기 좋다.
`premultiply` 속성도 추가하면 좋은데, 이건 noise 를 줄 때 input source 의 색상을 반영해서 적용한다.

# Bloom Effect

어두운 배경에 적용하기 더 좋다.
ToneMapping 을 사용중이면 `<Bloom luminanceThreshold={ 1.1 } />` 를 해 놓는 게 좋다. 아니면 toneMapping=false 하거나.

정확한 이론은 모르겠지만, 암튼 색상 한계?(threshold) 를 넘어서는 색상들을 더 밝게 만들어주는 효과라고 보면 된다. 그 한계는 rgb 의 '1' 값을 넘는 걸 말하는데, 애초에 1을 넘는 걸 어떻게 설정하는가 하면 그냥 color 속성 값을 배열로 두고, 1을 넘는 값을 넣어주면 된다.

1보다 한참 클수록 자체 발광체가 된다.. 이걸 극대화하려면 Bloom 에 `mipmapBlur` 속성까지 넣어주면 된다. 이러면 성능저하가 적게 효과를 극대화할 수 있다.

color 에 색상을 배열로 두지 않고도 같은 효과를 내려면, color 는 'orange' 같이 두고, emissive="orange" emissiveIntensity={2} 같이 따로 속성을 넣어주면 된다.

## Light 의 효과와 관계없도록 하기

위 bloom 효과는 light 가 오는 방향과 합쳐지는데, 이게 맘에 안 들 수 있다. 발광체는 모든 면에서 동일한 밝기를 가지는 게 자연스럽기 때문.

그래서 `meshStandardMaterial` 대신 `meshBasicMaterial` 을 쓰면 빛과 관계 없는 발광체를 만들 수 있다. 심지어 이게 성능도 더 좋으니 발광체를 만들 때는 meshBasicMaterial 을 쓰자. 그런데 이 때는 emissive 를 못 쓰니 다시 배열 color 를 설정해야 한다.

## 그냥 모든 것을 적당히 빛나게 하기

Bloom Effect 속성을 변경해서 모든 것을 적당히 빛나게 하면 좀 보기 좋은 효과를 낼 수 있다.

```jsx
<Bloom mipmapBlur luminanceThreshold={0} intensity={0.1} />
```

# DepthOfField

가깝거나 먼 것을 blur 해주는 효과. tilt 라는 성능이 더 좋은 유사한 효과가 있다.

카메라의 near, far 값을 0, 1 로 normalized 된 것으로 보고, 그 사이에 object 가 있으면 적용되도록 할 수 있다.

# Custom Effect

postprocessing 용으로 먼저 만들고 이걸 또 r3f 에서도 사용가능하게 추가 설정해줘야 하는 어려움이 있다..

shader 는 `mainImage` 라는 이름으로 있어야 에러가 안 난다.

`es6-string-html` 이라는 extension 을 사용하면 glsl 문법 하이라이팅에 좋다.

## js shader

fragmentShader 문법은 webgl2 문법을 쓰는데, 파라미터에 `in`, `out` 은 각각 인자로 넣은 변수가 카피여서 원래 변수가 변경되지 않는지(in), 아니면 함수 호출 후 변경될 수 있는지 (out) 를 말한다. 그래서 in 앞에서는 const 까지 붙여서 writable 하지 않음을 나타낸다. `inout` 도 있는데, 이건 읽을 수도 있고 쓸 수도 있음을 나타낸다.

`inputColor` contains the current color for that pixel which is defined by the previous effects.
`uv` contains the render coordinates (from 0,0 at the bottom left corner to 1,1 in the top right corner).
`outputColor` is what we need to change in order to apply the effect.

```js
const fragmentShader = /* glsl */ `
    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor)
    {
        outputColor = vec4(uv, 1.0, 1.0);
    }
`;
```
