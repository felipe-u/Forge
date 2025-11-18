import { useEffect, useState } from 'react'
import { loadFull } from 'tsparticles'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { particlesBgOptions } from '../utils/tsParticlesOptions'

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
