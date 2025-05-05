// Elementos del DOM
const selector = document.getElementById("circuitSelector");
const preview = document.getElementById("preview");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const simulation = document.getElementById("simulation");

const previews = {
  circuito1: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/f_auto/q_auto/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Australia%20carbon",
  circuito2: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/f_auto/q_auto/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Bahrain%20carbon",
  circuito3: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/f_auto/q_auto/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/China%20carbon",
  circuito4: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/f_auto/q_auto/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Japan%20carbon",
  circuito5: "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/f_auto/q_auto/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Saudi%20Arabia%20carbon"
};

let climaActual = '';
let pilotos = [
  { nombre: 'Piloto 1', tiempo: 0, color: 'red' },
  { nombre: 'Piloto 2', tiempo: 0, color: 'yellow' },
  { nombre: 'Piloto 3', tiempo: 0, color: 'blue' }
];

const circuitos = {
  circuito1: [ {x:50,y:100},{x:150,y:100},{x:250,y:150},{x:350,y:200},{x:450,y:150},{x:550,y:100},{x:600,y:50} ],
  circuito2: [ {x:30,y:120},{x:130,y:130},{x:230,y:160},{x:330,y:200},{x:430,y:170},{x:530,y:100},{x:600,y:50} ],
  circuito3: [ {x:60,y:90},{x:160,y:130},{x:260,y:170},{x:360,y:180},{x:460,y:160},{x:560,y:110},{x:600,y:50} ],
  circuito4: [ {x:40,y:100},{x:140,y:140},{x:240,y:180},{x:340,y:160},{x:440,y:140},{x:540,y:110},{x:600,y:70} ],
  circuito5: [ {x:70,y:90},{x:170,y:100},{x:270,y:140},{x:370,y:170},{x:470,y:150},{x:570,y:100},{x:600,y:60} ]
};

// Crear auto visual
function crearAuto(color) {
  const car = document.createElement("div");
  car.classList.add("car");
  car.style.backgroundColor = color;
  simulation.appendChild(car);
  return car;
}


function moverAuto(coordenadas, carElement, delay = 0) {
  let index = 0;
  function moverPaso() {
    if (index >= coordenadas.length) return;
    const punto = coordenadas[index];
    carElement.style.left = punto.x + "px";
    carElement.style.top = punto.y + "px";
    index++;
    if (index < coordenadas.length) {
      setTimeout(moverPaso, 500);
    }
  }
  setTimeout(moverPaso, delay);
}

selector.addEventListener("change", () => {
  const selected = selector.value;
  if (selected && previews[selected]) {
    preview.innerHTML = `<img src="${previews[selected]}" alt="Vista previa del circuito" />`;
    simulation.style.backgroundImage = `url(${previews[selected]})`;
    simulation.style.backgroundSize = "cover";
    startBtn.disabled = false;
  } else {
    preview.innerHTML = `<p>Vista previa del circuito aparecerá aquí</p>`;
    startBtn.disabled = true;
  }

  simulation.innerHTML = '';
  simulation.style.display = "none";
  stopBtn.disabled = true;
  resetBtn.disabled = true;
});

startBtn.addEventListener("click", () => {
  const selected = selector.value;
  if (!selected) {
    alert("Por favor, elige un circuito.");
    return;
  }

  climaActual = generarClima();
  pilotos.forEach(piloto => {
    piloto.tiempo = calcularTiempoDeVuelta({ tiempoBase: 120 }, climaActual);
  });
  clasificarPilotos();

  simulation.innerHTML = '';
  simulation.style.display = "block";

  // Mostrar autos y moverlos
  pilotos.forEach((piloto, i) => {
    const auto = crearAuto(piloto.color);
    moverAuto(circuitos[selected], auto, i * 500); // delay distinto para cada piloto
  });

  startBtn.disabled = true;
  stopBtn.disabled = false;
  resetBtn.disabled = false;
});

stopBtn.addEventListener("click", () => {
  simulation.querySelectorAll('.car').forEach(car => car.remove());
  stopBtn.disabled = true;
});

resetBtn.addEventListener("click", () => {
  pilotos.forEach(p => p.tiempo = 0);
  clasificarPilotos();
  simulation.innerHTML = '';
  simulation.style.display = "none";
  startBtn.disabled = false;
  stopBtn.disabled = true;
  resetBtn.disabled = true;
});

function generarClima() {
  const condiciones = ['Seco', 'Lluvioso', 'Extremo'];
  const clima = condiciones[Math.floor(Math.random() * condiciones.length)];
  document.getElementById('weatherStatus').innerText = `Clima: ${clima}`;
  return clima;
}

function calcularTiempoDeVuelta(config, clima) {
  let tiempo = config.tiempoBase;
  if (clima === 'Lluvioso') tiempo += 5;
  if (clima === 'Extremo') tiempo += 10;
  return tiempo;
}

function clasificarPilotos() {
  pilotos.sort((a, b) => a.tiempo - b.tiempo);
  const tabla = document.getElementById("clasificacion");
  tabla.innerHTML = "<tr><th>Posición</th><th>Piloto</th><th>Tiempo</th></tr>";
  pilotos.forEach((p, i) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `<td>${i + 1}</td><td>${p.nombre}</td><td>${p.tiempo} s</td>`;
    tabla.appendChild(fila);
  });
}
