// Web Audio API Electric Hypercar Engine Synthesizer
// Zero external asset dependencies - generated purely via mathematical oscillators

let audioCtx = null;
let osc = null;
let gainNode = null;
let isAudioEnabled = false;

export function initEngineAudio() {
  if (typeof window === "undefined") return false;
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return false;
      audioCtx = new AudioContextClass();

      osc = audioCtx.createOscillator();
      gainNode = audioCtx.createGain();

      // Soft harmonic sawtooth through low-pass filter
      osc.type = "triangle";
      osc.frequency.setValueAtTime(55, audioCtx.currentTime); // Base idle rumble (55Hz)

      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);

      const filter = audioCtx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(280, audioCtx.currentTime);

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc.start();
    }

    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    isAudioEnabled = true;
    return true;
  } catch (err) {
    console.warn("Web Audio not supported or blocked:", err);
    return false;
  }
}

export function updateEngineSpeed(speedKmH) {
  if (!isAudioEnabled || !audioCtx || !osc || !gainNode) return;

  try {
    const now = audioCtx.currentTime;
    // Map speed (0 to 330) to frequency (55Hz to 280Hz)
    const targetFreq = 55 + (speedKmH / 330) * 220;
    osc.frequency.setTargetAtTime(targetFreq, now, 0.08);

    // Volume gently swells with acceleration
    const targetGain = speedKmH > 5 ? 0.06 + (speedKmH / 330) * 0.08 : 0.02;
    gainNode.gain.setTargetAtTime(targetGain, now, 0.1);
  } catch {
    // Ignore audio timing updates
  }
}

export function stopEngineAudio() {
  if (gainNode && audioCtx) {
    try {
      gainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0.15);
    } catch {}
  }
  isAudioEnabled = false;
}
