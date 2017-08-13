safari.self.addEventListener("message", onMessage, false);

function padLeft(num) {
  if (num < 10) {
    return "0" + num;
  } else {
    return num;
  }
}

function last(arr) {
  if (!arr) {
    return null;
  }

  return arr[arr.length - 1];
}

function setBackground(message) {
  var posts = JSON.parse(message).data.children;
  var urls = posts
    .filter(
      p =>
        !!p.data.preview.images && p.data.preview.images[0].source.width > 2000
    )
    .map(p => p.data.preview.images[0].source)
    .map(res => res.url);

  document.getElementById("img").src = urls[0];
}

function setWeather(message) {
  var data = JSON.parse(message);
  var temp = data.query.results.channel.item.condition.temp;

  document.getElementById("weather").innerHTML = temp + " &deg;";
}

function onMessage(msg) {
  if (msg.name === "background") {
    setBackground(msg.message);
  }

  if (msg.name === "weather") {
    setWeather(msg.message);
  }

  if (msg.name === "quote") {
    setQuote(msg.message);
  }
}

function setQuote(message) {
  var data = JSON.parse(message);
  var author = data.contents.quotes[0].author;
  var quote = data.contents.quotes[0].quote;

  document.getElementById("quote").textContent = quote;
  document.getElementById("author").textContent = author;
}

function greeting(hour) {
  if (hour >= 0 && hour < 12) {
    return "Good morning";
  } else if (hour >= 12 && hour < 17) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

document.addEventListener("DOMContentLoaded", function() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();

  document.getElementById("time").textContent =
    padLeft(h > 12 ? h - 12 : h) + ":" + padLeft(m);

  var ampm = h > 12 ? "pm" : "am";
  document.getElementById("ampm").textContent = ampm;

  document.getElementById("greeting").textContent = greeting(h);
});
