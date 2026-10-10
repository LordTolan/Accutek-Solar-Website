"use client"

import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { useHolidayTheme } from "@/context/HolidayThemeProvider"

type AmbienceNodes = {
  ctx: AudioContext
  master: GainNode
  stop: () => void
}

const TARGET_VOLUME = 0.05 // deliberately quiet

/**
 * Soft synthesized night ambience (gentle wind + distant crickets) for the
 * Halloween theme. OFF by default, never autoplays, only starts after the
 * visitor presses the button. Generated with the Web Audio API, so no audio
 * files are downloaded.
 */
function startAmbience(): AmbienceNodes | null {
  const AC: typeof AudioContext | undefined =
    typeof window !== "undefined"
      ? window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      : undefined
  if (!AC) return null
  const ctx = new AC()
  const master = ctx.createGain()
  master.gain.value = 0
  master.connect(ctx.destination)

  // Wind: looping brown noise through a slowly swept low-pass filter.
  const seconds = 4
  const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  let last = 0
  for (let i = 0; i < data.length; i++) {
    const white = Math.random() * 2 - 1
    last = (last + 0.02 * white) / 1.02
    data[i] = last * 3.2
  }
  const wind = ctx.createBufferSource()
  wind.buffer = buffer
  wind.loop = true
  const lp = ctx.createBiquadFilter()
  lp.type = "lowpass"
  lp.frequency.value = 420
  const lfo = ctx.createOscillator()
  lfo.frequency.value = 0.07
  const lfoGain = ctx.createGain()
  lfoGain.gain.value = 220
  lfo.connect(lfoGain).connect(lp.frequency)
  wind.connect(lp).connect(master)
  wind.start()
  lfo.start()

  // Crickets: occasional soft high chirps.
  const chirp = () => {
    const t = ctx.currentTime
    for (let n = 0; n < 3; n++) {
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = "sine"
      osc.frequency.value = 4300 + Math.random() * 300
      g.gain.setValueAtTime(0, t + n * 0.09)
      g.gain.linearRampToValueAtTime(0.08, t + n * 0.09 + 0.015)
      g.gain.linearRampToValueAtTime(0, t + n * 0.09 + 0.06)
      osc.connect(g).connect(master)
      osc.start(t + n * 0.09)
      osc.stop(t + n * 0.09 + 0.08)
    }
  }
  const interval = window.setInterval(() => {
    if (Math.random() < 0.55) chirp()
  }, 1400)

  master.gain.linearRampToValueAtTime(TARGET_VOLUME, ctx.currentTime + 2.5)

  return {
    ctx,
    master,
    stop: () => {
      window.clearInterval(interval)
      try {
        master.gain.cancelScheduledValues(ctx.currentTime)
        master.gain.setValueAtTime(master.gain.value, ctx.currentTime)
        master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6)
      } catch {
        /* ignore */
      }
      window.setTimeout(() => {
        ctx.close().catch(() => undefined)
      }, 700)
    },
  }
}

export default function HalloweenAmbientSound() {
  const theme = useHolidayTheme()
  const [playing, setPlaying] = useState(false)
  const nodes = useRef<AmbienceNodes | null>(null)

  useEffect(() => {
    return () => {
      nodes.current?.stop()
      nodes.current = null
    }
  }, [])

  // Stop if the theme switches away from Halloween.
  useEffect(() => {
    if (theme?.name !== "halloween" && nodes.current) {
      nodes.current.stop()
      nodes.current = null
      setPlaying(false)
    }
  }, [theme])

  if (theme?.name !== "halloween") return null

  const toggle = () => {
    if (playing) {
      nodes.current?.stop()
      nodes.current = null
      setPlaying(false)
    } else {
      nodes.current = startAmbience()
      setPlaying(Boolean(nodes.current))
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? "Mute night ambience" : "Play soft night ambience"}
      title={playing ? "Mute night ambience" : "Play soft night ambience"}
      data-testid="halloween-ambient-sound-toggle"
      className="fixed left-4 bottom-[84px] md:bottom-32 z-40 inline-flex h-10 w-10 items-center justify-center rounded-full border border-orange-500/30 bg-[#1a0b2e]/80 text-orange-200/80 shadow-[0_0_14px_rgba(255,117,24,0.18)] backdrop-blur-md transition hover:text-orange-200 hover:border-orange-400/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
    >
      {playing ? <Volume2 className="h-4 w-4" aria-hidden="true" /> : <VolumeX className="h-4 w-4" aria-hidden="true" />}
    </button>
  )
}
