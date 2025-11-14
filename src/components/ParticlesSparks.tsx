import Particles, { initParticlesEngine } from '@tsparticles/react'
import { useEffect, useState } from 'react'
import { particlesSparksOptions } from '../utils/tsParticlesOptions'
import { loadFull } from 'tsparticles'

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
