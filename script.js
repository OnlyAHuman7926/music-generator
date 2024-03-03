//let ctx = new AudioContext();
let ctx;
let even = document.getElementById('chords');

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
  even.innerHTML += ' ' + name;
  let cmap = {
    'C': [0, 4, 7, 12],
    'Dm': [2, 5, 9, 14],
    'G': [-1, 2, 7, 11],
    'F': [0, 5, 9, 12],
    'Am': [0, 4, 9, 12],
    'Em': [-1, 4, 7, 11]
  }
  for (let note of cmap[name]) await playNote(note, time);
}

async function start() {
  ctx = new AudioContext();
  let current = 'C';
  let next = {
    'C': ['F', 'G', 'Am'],
    'F': ['C'],
    'G': ['Am', 'C'],
    'Am': ['F', 'G', 'Em', 'Dm'],
    'Dm': ['G', 'Em', 'Am'],
    'Em': ['Am']
  }
  while (true) {
    await playChord(current);
    let opts = next[current];
    current = opts[Math.floor(Math.random() * opts.length)];
  }
}