import { DepthOfField, Bloom, Noise, Glitch, ToneMapping, Vignette, EffectComposer } from '@react-three/postprocessing'
import { useControls } from 'leva'
import { useRef } from 'react'
import Drunk from '~/components/Drunk'

interface Props {}

export function Composer({}: Props) {
  const drunkRef = useRef()

  const drunkProps = useControls('Drunk Effect', {
    frequency: { value: 2, min: 1, max: 20 },
    amplitude: { value: 0.1, min: 0, max: 1 },
  })

  return (
    <EffectComposer disableNormalPass>
      {/* <Vignette
                offset={ 0.3 }
                darkness={ 0.9 }
                blendFunction={ BlendFunction.NORMAL }
            />
            <Glitch
                delay={ [ 0.5, 1 ] }
                duration={ [ 0.1, 0.3 ] }
                strength={ [ 0.2, 0.4 ] }
                mode={ GlitchMode.CONSTANT_MILD }
            />
            <Noise
                premultiply
                blendFunction={ BlendFunction.SOFT_LIGHT }
            />
            <Bloom
                mipmapBlur
                intensity={ 0.5 }
                luminanceThreshold={ 0 }
            />
            <DepthOfField
                focusDistance={ 0.025 }
                focalLength={ 0.025 }
                bokehScale={ 6 }
            /> */}
      <Drunk ref={drunkRef} {...drunkProps} blendFunction={BlendFunction.DARKEN} />
      <ToneMapping />
    </EffectComposer>
  )
}
