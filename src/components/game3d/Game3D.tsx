// @ts-nocheck

import { Physics } from '@react-three/rapier'
import useGame from './stores/useGame.js'
import Lights from './Lights.js'
import { Level } from './Level.jsx'
import Player from './Player.js'

export function Game3D() {
  const blocksCount = useGame(state => state.blocksCount)
  const blocksSeed = useGame(state => state.blocksSeed)

  return (
    <>
      <color args={['#bdedfc']} attach="background" />

      <Physics debug={false}>
        <Lights />
        <Level count={blocksCount} seed={blocksSeed} />
        <Player />
      </Physics>
    </>
  )
}
