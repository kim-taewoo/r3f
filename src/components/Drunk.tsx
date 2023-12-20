import { ThreeElements } from '@react-three/fiber'
import DrunkEffect from '../effects/DrunkEffect'
import { forwardRef } from 'react'
import { BlendFunction } from 'postprocessing'

interface Props {
  frequency: number
  amplitude: number
  blendFunction: BlendFunction
}
export type Ref = ThreeElements

export default forwardRef<Ref, Props>(function Drunk(props, ref) {
  const effect = new DrunkEffect(props)

  return <primitive ref={ref} object={effect} />
})
