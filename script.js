const gameBoard = document.getElementById("gameBoard");
/* دریافت المان تخته بازی با استفاده از آی‌دی */

const boardSize = 20;
/* تعریف اندازه تخته بازی */

const initialSnakeLength = 3;
/* تعیین طول ابتدایی مار */

let snake = [];
/* ایجاد یک آرایه خالی برای ذخیره بخش‌های مار */

let fruit = {};
/* ایجاد یک آبجکت خالی برای ذخیره میوه */

let direction = "RIGHT";
let nextDirection = "RIGHT";
/* تعریف جهت حرکت فعلی و بعدی مار */

/* Initialize snake */
for (let i = initialSnakeLength - 1; i >= 0; i--) {
  snake.push({ x: i, y: 0 });
}
/* ایجاد مار ابتدایی با طول مشخص و اضافه کردن به آرایه snake */

/* Generate random fruit */
function generateFruit() {
  fruit = {
    x: Math.floor(Math.random() * boardSize),
    y: Math.floor(Math.random() * boardSize),
  };
  /* ایجاد میوه با مختصات تصادفی */

  while (
    snake.some((segment) => segment.x === fruit.x && segment.y === fruit.y)
  ) {
    fruit = {
      x: Math.floor(Math.random() * boardSize),
      y: Math.floor(Math.random() * boardSize),
    };
  }
  /* اطمینان از عدم قرارگیری میوه روی بخش‌های مار */
}

/* Draw the game board */
function draw() {
  gameBoard.innerHTML = "";
  /* پاک کردن محتویات تخته بازی */

  snake.forEach((segment) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.left = `${segment.x * boardSize}px`;
    snakeElement.style.top = `${segment.y * boardSize}px`;
    snakeElement.classList.add("snake");
    gameBoard.appendChild(snakeElement);
  });
  /* ایجاد المان‌های div برای هر بخش از مار و تنظیم موقعیت آن‌ها */

  const fruitElement = document.createElement("div");
  fruitElement.style.left = `${fruit.x * boardSize}px`;
  fruitElement.style.top = `${fruit.y * boardSize}px`;
  fruitElement.classList.add("fruit");
  gameBoard.appendChild(fruitElement);
  /* ایجاد المان div برای میوه و تنظیم موقعیت آن */
}

/* Move the snake */
function moveSnake() {
  const head = { ...snake[0] };
  /* ایجاد یک نسخه جدید از سر مار */

  direction = nextDirection;
  /* به‌روزرسانی جهت حرکت مار */

  switch (direction) {
    case "UP":
      head.y -= 1;
      break;
    case "DOWN":
      head.y += 1;
      break;
    case "LEFT":
      head.x -= 1;
      break;
    case "RIGHT":
      head.x += 1;
      break;
  }
  /* تغییر مختصات سر مار بر اساس جهت حرکت */

  snake.unshift(head);
  /* اضافه کردن سر جدید به ابتدای آرایه مار */

  if (head.x === fruit.x && head.y === fruit.y) {
    generateFruit();
  } else {
    snake.pop();
  }
  /* بررسی برخورد سر مار با میوه و ایجاد میوه جدید در صورت برخورد */
  /* در غیر این صورت، حذف انتهای مار برای ایجاد حرکت */

  if (
    head.x < 0 ||
    head.x >= boardSize ||
    head.y < 0 ||
    head.y >= boardSize ||
    snake.some(
      (segment, index) =>
        index !== 0 && segment.x === head.x && segment.y === head.y
    )
  ) {
    // alert('Game Over!');
    window.location.reload();
  }
  /* بررسی شرایط پایان بازی: برخورد با دیواره‌ها یا برخورد با بدن خود */

  draw();
  /* ترسیم مجدد تخته بازی */
}

/* Handle key presses */
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (direction !== "DOWN") nextDirection = "UP";
      break;
    case "ArrowDown":
      if (direction !== "UP") nextDirection = "DOWN";
      break;
    case "ArrowLeft":
      if (direction !== "RIGHT") nextDirection = "LEFT";
      break;
    case "ArrowRight":
      if (direction !== "LEFT") nextDirection = "RIGHT";
      break;
  }
});
/* مدیریت رویداد فشردن کلیدهای جهت‌دار برای تغییر جهت حرکت مار */

/* Game loop */
generateFruit();
setInterval(moveSnake, 200);
draw();
/* ایجاد میوه اولیه و شروع حلقه بازی با حرکت مار هر 200 میلی‌ثانیه */
