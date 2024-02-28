//let ctx = new AudioContext();
let ctx;

function playNote(pitch, time) {
  return new Promise((resolve, reject) => {
    let oscillator = ctx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = 256 * 2 ** (pitch / 12);
    oscillator.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + time);
    oscillator.onended = resolve;
  })
}

async function playChord(name, time = 0.25) {
  let cmap = {
    'C': [0, 4, 7],
    'Dm': [2, 5, 9],
    'G': [-1, 2, 7],
    'F': [0, 5, 9],
    'Am': [0, 4, 9],
    'Em': [-1, 4, 7]
  }
  for (let note of cmap[name]) await playNote(note, time);
}

async function start() {
  ctx = new AudioContext();
  while (true) {
    let name = prompt('化合物');
    await playChord(name);
  }
}