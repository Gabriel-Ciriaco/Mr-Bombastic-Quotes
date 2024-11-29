let canvas = document.getElementById("quote-canvas");
let ctx = canvas.getContext("2d");

let sentence = document.getElementById("sentence");

let quotes = QUOTES;

function random_interval(min, max)
{
  return Math.random() * (max - min) + min;
}

let day_quote = parseInt(random_interval(0, quotes.length - 1));

let selected_quote = quotes[day_quote];

if (!/[.!?]$/.test(selected_quote)) {
  selected_quote += '.';
}

selected_quote = `"${selected_quote}"`;

let image = new Image();
image.src = "./mr-bombastic.png";

image.onload = function () {
  const canvasWidth = 600;
  const canvasHeight = 400;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  ctx.fillStyle = "#34495e";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  ctx.fillStyle = "#ecf0f1";
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.fillText(selected_quote, canvasWidth / 2, 100);

  const imgX = (canvasWidth - 200) / 2;
  const imgY = 100;
  ctx.drawImage(image, imgX, imgY, 200, 200);

  ctx.font = "italic 18px Arial";
  ctx.fillText("~ said by Mr. Bombastic", canvasWidth / 2, imgY + 200);

  const imgElement = document.getElementById("quote-image");
  imgElement.src = canvas.toDataURL("image/png");

  download_image(canvas);
};

function download_image(canvas)
{
  let link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "quote-image.png";
  link.click();
}
