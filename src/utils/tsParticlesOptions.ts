import type { ISourceOptions } from '@tsparticles/engine'

export const particlesBgOptions: ISourceOptions = {
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  fullScreen: { enable: true, zIndex: 0 },
  particles: {
    shape: { type: 'circle' },
    opacity: {
      value: 1,
      animation: {
        enable: true,
        speed: 0.8,
        startValue: 'max',
        sync: false,
      },
    },
    size: {
      value: 1,
      animation: {
        enable: true,
        speed: 1.5,
        startValue: 'min',
        sync: false,
      },
    },
    move: {
      enable: true,
      random: true,
      straight: false,
      outModes: 'out',
      gravity: { enable: true, acceleration: -0.3 },
    },
    rotate: {
      animation: { enable: true, speed: 15, sync: false },
    },
  },
  interactivity: { events: { resize: { enable: true } } },
  detectRetina: true,
  emitters: [
    {
      position: { x: 20, y: 100 },
      size: { width: 40, height: 0 },
      rate: { delay: 0.1, quantity: 10 },
      particles: {
        move: {
          enable: true,
          speed: { min: 1, max: 10 },
          direction: 'top-right',
          random: false,
          straight: false,
          outModes: 'out',
        },
        trail: {
          enable: true,
          length: 25,
          fill: { color: '#ff6b35' },
        },
        color: { value: ['#ff6b35', '#f7931e', '#ffc107'] },
        size: { value: { min: 1.5, max: 5 } },
        opacity: {
          value: { min: 0.6, max: 1 },
        },
        life: {
          duration: { sync: false, value: { min: 2, max: 7 } },
          count: 1,
        },
      },
    },
  ],
}

export const particlesSparksOptions: ISourceOptions = {
  background: { color: 'transparent' },
  particles: {
    opacity: {
      value: { min: 0, max: 1 },
      animation: {
        enable: true,
        speed: { min: 1, max: 10 },
        sync: false,
        startValue: 'max',
        destroy: 'min',
      },
    },
    number: { value: 0 },
    color: { value: ['#FFD700', '#ae7d0bff'] },
    shape: { type: 'circle' },
    size: { value: { min: 2, max: 4 } },
    move: {
      enable: true,
      speed: 20,
      direction: 'none',
      outModes: 'destroy',
      random: true,
    },

    life: { duration: { sync: false, value: 5 }, count: 1 },
  },

  interactivity: { detectsOn: 'canvas' },
  emitters: [
    {
      direction: 'top',
      life: { count: 1, duration: 0.1 },
      rate: { delay: 0, quantity: 90 },
      size: { width: 30, height: 0 },
      position: { x: 50, y: 100 },
    },
  ],
  fullScreen: { enable: true, zIndex: 9999 },
}
