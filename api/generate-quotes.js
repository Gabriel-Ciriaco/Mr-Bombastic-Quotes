import { createCanvas, loadImage } from "@napi-rs/canvas";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  const file = await fs.readFile(process.cwd() + '/api/quotes.json', 'utf-8');
  const quotes = JSON.parse(file);
  let day_quote = Math.floor(Math.random() * quotes.length);

  const randomQuote = quotes[day_quote];

  const canvas = createCanvas(600, 400);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#34495e";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ecf0f1";
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.fillText(`"${randomQuote}"`, canvas.width / 2, 100);

  const image = await loadImage(
    "https://raw.githubusercontent.com/Gabriel-Ciriaco/Mr-Bombastic-Quotes/refs/heads/main/public/mr-bombastic.png"
  );

  ctx.drawImage(image, (canvas.width - 200) / 2, 100, 200, 200);

  ctx.font = "italic 18px Arial";
  ctx.fillText("~ said by Mr. Bombastic", canvas.width / 2, 320);

  const buffer = canvas.toBuffer("image/png");

  res.setHeader("Content-Type", "image/png");

  res.status(200).send(buffer);
}
