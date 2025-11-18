import { useEffect, useState } from 'react'
import { loadFull } from 'tsparticles'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { particlesSparksOptions } from '../utils/tsParticlesOptions'

export const ParticlesSparks = () => {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  return (
    init && <Particles id='sparks-effect' options={particlesSparksOptions} />
  )
}
