import { createCanvas, loadImage, GlobalFonts } from "@napi-rs/canvas";

export default async function handler(req, res) {
  const font_url =
    "https://raw.githubusercontent.com/Gabriel-Ciriaco/Mr-Bombastic-Quotes/main/public/OpenSans-Regular.ttf"; // Replace with your actual font URL
  const font_response = await fetch(font_url, { cache: "no-store"} );
  const font_buffer = await font_response.arrayBuffer();

  GlobalFonts.register(Buffer.from(font_buffer), "sans-serif")

  const response = await fetch(
    "https://raw.githubusercontent.com/Gabriel-Ciriaco/Mr-Bombastic-Quotes/main/api/quotes.json"
  );

  const quotes = await response.json();

  let day_quote = Math.floor(Math.random() * quotes.length);

  let random_quote = quotes[day_quote];

  const canvas = createCanvas(600, 400);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#34495e";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ecf0f1";
  ctx.font = "24px sans-serif";
  ctx.textAlign = "center";


  ctx.fillText(`"${random_quote}"`, canvas.width / 2, 100);

  const image = await loadImage(
    "https://raw.githubusercontent.com/Gabriel-Ciriaco/Mr-Bombastic-Quotes/main/public/mr-bombastic.png"
  );

  ctx.drawImage(image, (canvas.width - 200) / 2, 100, 200, 200);

  ctx.font = "italic 18px Arial";
  ctx.fillText("~ said by Mr. Bombastic", canvas.width / 2, 320);

  const buffer = canvas.toBuffer("image/png");

  res.setHeader("Content-Type", "image/png");

  res.status(200).send(buffer);
}
