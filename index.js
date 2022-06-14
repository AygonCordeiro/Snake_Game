var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var grid = 16;
var count = 0;
  
var snake = {
  x: 160,
  y: 160,
  
  // Velocidade da cobra, movimentando um comprimento de grade a cada quadro na direção x ou y
  dx: grid,
  dy: 0,
  
  // Acompanha as grades que o corpo da cobra ocupa
  cells: [],
  
  // Comprimento da cobra, o qual cresce a cada maça comida
  maxCells: 4
};
var apple = {
  x: 320,
  y: 320
};

// Obter números inteiros aleatórios em um determinado intervalo
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Loop do jogo
function loop() {
  requestAnimationFrame(loop);

  // Loop de 15 fps (60/15 = 4)
  if (++count < 4) {
    return;
  }

  count = 0;
  context.clearRect(0,0,canvas.width,canvas.height);

  // Movimento da cobra seguindo sua velocidade
  snake.x += snake.dx;
  snake.y += snake.dy;

  // Posicionamento horizontal da cobra
  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  }
  else if (snake.x >= canvas.width) {
    snake.x = 0;
  }
  
  // Posicionamento vertical da cobra
  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  }
  else if (snake.y >= canvas.height) {
    snake.y = 0;
  }

  // Manter o controle do movimento da cobra
  snake.cells.unshift({x: snake.x, y: snake.y});

  // Remove as células
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  // Maçã
  context.fillStyle = 'red';
  context.fillRect(apple.x, apple.y, grid-1, grid-1);

  // Cobra
  context.fillStyle = 'green';
  snake.cells.forEach(function(cell, index) {
    
    // Efeito de 1px menor que a grade 
    context.fillRect(cell.x, cell.y, grid-1, grid-1);  

    // Cobra comeu a maçã
    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;

      // Tamanho da tela 
      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;
    }

    // Verificar colisão da cobra
    for (var i = index + 1; i < snake.cells.length; i++) {
      
      // Cobra ocupa o mesmo espaço. Reinicia o jogo
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;

        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
      }
    }
  });
}

// Movimento da cobra pelas teclas
document.addEventListener('keydown', function(e) {
  
  // Tecla de seta para esquerda
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  // Tecla de seta para cima
  else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  // Tecla de seta para direita
  else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
  // Tecla de seta para baixo
  else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

// Início do jogo
requestAnimationFrame(loop);