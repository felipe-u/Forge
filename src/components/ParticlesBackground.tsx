import Particles, { initParticlesEngine } from '@tsparticles/react'
import { useEffect, useState } from 'react'
import { particlesBgOptions } from '../utils/tsParticlesOptions'
import { loadFull } from 'tsparticles'

export const ParticlesBackground = () => {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  return (
    init && <Particles id='tsparticles-ember' options={particlesBgOptions} />
  )
}
