import Particles, { initParticlesEngine } from '@tsparticles/react'
import { useEffect, useState } from 'react'
import { particlesSparksOptions } from '../utils/tsParticlesOptions'
import { loadSlim } from '@tsparticles/slim'

export const ParticlesSparks = () => {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  return (
    init && <Particles id='sparks-effect' options={particlesSparksOptions} />
  )
}
