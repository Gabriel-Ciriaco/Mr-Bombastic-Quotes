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

sentence.textContent = `"${selected_quote}"`;