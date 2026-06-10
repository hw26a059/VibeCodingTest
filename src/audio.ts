// Simple 8-bit web audio synthesizer for nostalgic RPG sounds

let audioCtx: AudioContext | null = null;
let soundVolume = 0.3; // Default master volume

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setMasterVolume(vol: number) {
  soundVolume = Math.max(0, Math.min(1, vol));
}

export function playClickSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.08);

    gainNode.gain.setValueAtTime(0.08 * soundVolume, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {
    console.warn('Audio play blocked or unsupported', e);
  }
}

export function playSlashSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.15);

    gainNode.gain.setValueAtTime(0.3 * soundVolume, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.18);

    osc.start();
    osc.stop(ctx.currentTime + 0.18);
    
    // Quick white noise approximation with simple click filter
    const noiseOsc = ctx.createOscillator();
    const noiseGain = ctx.createGain();
    noiseOsc.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noiseOsc.type = 'sawtooth';
    noiseOsc.frequency.setValueAtTime(100, ctx.currentTime);
    noiseOsc.frequency.setValueAtTime(Math.random() * 2000 + 400, ctx.currentTime + 0.03);
    noiseGain.gain.setValueAtTime(0.12 * soundVolume, ctx.currentTime);
    noiseGain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    noiseOsc.start();
    noiseOsc.stop(ctx.currentTime + 0.12);
  } catch (e) {
    console.warn('Audio play blocked or unsupported', e);
  }
}

export function playMagicIceSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Chime sequence representing ice shattering
    const times = [0, 0.05, 0.1, 0.15];
    const freqs = [987.77, 1174.66, 1318.51, 1567.98]; // B5, D6, E6, G6
    
    times.forEach((time, index) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freqs[index], now + time);
      gainNode.gain.setValueAtTime(0.12 * soundVolume, now + time);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + time + 0.25);
      
      osc.start(now + time);
      osc.stop(now + time + 0.25);
    });
  } catch (e) {
    console.warn('Audio play blocked or unsupported', e);
  }
}

export function playMagicFireSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Combust noise - descending low rumble
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(350, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.4);
    
    gainNode.gain.setValueAtTime(0.22 * soundVolume, now);
    gainNode.gain.linearRampToValueAtTime(0.001, now + 0.4);
    
    osc.start();
    osc.stop(now + 0.4);
  } catch (e) {
    console.warn('Audio play blocked or unsupported', e);
  }
}

export function playHealSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Arpeggio rising
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C4, E4, G4, C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);
      gainNode.gain.setValueAtTime(0.07 * soundVolume, now + idx * 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.3);
      
      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.3);
    });
  } catch (e) {
    console.warn('Audio play blocked or unsupported', e);
  }
}

export function playComboTriggerSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Sparkle chime and powerful high sweep
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // C5 to G6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);
      gainNode.gain.setValueAtTime(0.08 * soundVolume, now + idx * 0.04);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.25);
      osc.start(now + idx * 0.04);
      osc.stop(now + idx * 0.04 + 0.25);
    });

    // Epic background frequency glide
    const baseOsc = ctx.createOscillator();
    const baseGain = ctx.createGain();
    baseOsc.connect(baseGain);
    baseGain.connect(ctx.destination);
    baseOsc.type = 'sawtooth';
    baseOsc.frequency.setValueAtTime(150, now);
    baseOsc.frequency.exponentialRampToValueAtTime(600, now + 0.35);
    baseGain.gain.setValueAtTime(0.12 * soundVolume, now);
    baseGain.gain.linearRampToValueAtTime(0.001, now + 0.35);
    baseOsc.start();
    baseOsc.stop(now + 0.35);
  } catch (e) {
    console.warn('Audio play blocked or unsupported', e);
  }
}

export function playDamageSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(30, ctx.currentTime + 0.15);

    gainNode.gain.setValueAtTime(0.28 * soundVolume, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch (e) {
    console.warn('Audio play blocked or unsupported', e);
  }
}

export function playVictorySound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Play majestic little victory fanfare: C4, E4, G4, C5 (hold), E5 (hold), G5, C6
    const melody = [
      { f: 261.63, t: 0, d: 0.15 },
      { f: 329.63, t: 0.15, d: 0.15 },
      { f: 392.00, t: 0.30, d: 0.15 },
      { f: 523.25, t: 0.45, d: 0.25 },
      { f: 659.25, t: 0.70, d: 0.25 },
      { f: 783.99, t: 0.95, d: 0.25 },
      { f: 1046.50, t: 1.20, d: 0.7 }
    ];
    
    melody.forEach((note) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, now + note.t);
      gainNode.gain.setValueAtTime(0.18 * soundVolume, now + note.t);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + note.t + note.d);
      
      osc.start(now + note.t);
      osc.stop(now + note.t + note.d);
    });
  } catch (e) {
    console.warn('Audio play blocked or unsupported', e);
  }
}

export function playDefeatSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Tragic minor sequence: C4, G#3, G3, F3 (slowly descending)
    const melody = [
      { f: 262.0, t: 0, d: 0.3 },
      { f: 207.6, t: 0.3, d: 0.3 },
      { f: 196.0, t: 0.6, d: 0.3 },
      { f: 174.6, t: 0.9, d: 0.8 }
    ];
    
    melody.forEach((note) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(note.f, now + note.t);
      gainNode.gain.setValueAtTime(0.18 * soundVolume, now + note.t);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + note.t + note.d);
      
      osc.start(now + note.t);
      osc.stop(now + note.t + note.d);
    });
  } catch (e) {
    console.warn('Audio play blocked or unsupported', e);
  }
}
