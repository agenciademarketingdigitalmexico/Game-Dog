const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 480;

let keys = {};
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

// Personajes
const player = {
  x: 50,
  y: 380,
  width: 40,
  height: 40,
  color: "#00f",
  speed: 3
};

const dog = {
  x: 100,
  y: 380,
  width: 30,
  height: 30,
  color: "#f90",
  speed: 3.2
};

// Bicicletas
const bikes = [{ x: 800, y: 380, width: 30, height: 30, speed: 2 }];

function drawCharacter(char) {
  ctx.fillStyle = char.color;
  ctx.fillRect(char.x, char.y, char.width, char.height);
}

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Movimiento del jugador
  if (keys["ArrowRight"]) player.x += player.speed;
  if (keys["ArrowLeft"]) player.x -= player.speed;

  // Movimiento del perro (persigue bicicletas)
  const bike = bikes[0];
  if (bike.x < dog.x) dog.x -= dog.speed;
  else if (bike.x > dog.x) dog.x += dog.speed;

  // Movimiento de la bicicleta
  bike.x -= bike.speed;
  if (bike.x < -bike.width) {
    bike.x = 800 + Math.random() * 200;
  }

  drawCharacter(player);
  drawCharacter(dog);

  // Dibuja bicicleta
  ctx.fillStyle = "#ccc";
  ctx.fillRect(bike.x, bike.y, bike.width, bike.height);

  requestAnimationFrame(updateGame);
}

updateGame();