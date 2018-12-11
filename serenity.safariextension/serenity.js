safari.self.addEventListener("message", onMessage, false);

function padLeft(num) {
  if (num < 10) {
    return "0" + num;
  } else {
    return num;
  }
}

function setBackground(message) {
  var posts = JSON.parse(message).data.children;

  var urls = posts
    .filter(p => p && p.data && p.data.preview && p.data.preview.images)
    .filter(
      p => p.data.preview.images[0].source.width >= 3000
    )
    .map(p => p.data.url)

  var url = decodeURI(urls[0]);
  var bg = document.getElementById("background");

  bg.style.background = "url(" + url + ") no-repeat center";
  bg.style["background-size"] = "cover";
  bg.style["box-shadow"] = "inset 0 0 0 2000px rgba(0,0,0,0.5)";
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

function setQuote(quote) {
  document.getElementById("quote").textContent = quote.quote;
  document.getElementById("author").textContent = quote.author;
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

function setData() {
  var $time = document.getElementById("time")
  var $ampm = document.getElementById("ampm")
  var $greeting = document.getElementById("greeting")

  if(!$time || !$ampm || !$greeting) { return; }

  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();

  $time.textContent =
    (h > 12 ? h - 12 : h) + ":" + padLeft(m);

  var ampm = h >= 12 ? "pm" : "am";
  $ampm.textContent = ampm;

  $greeting.textContent = greeting(h);
}

document.addEventListener("DOMContentLoaded", function() {
  safari.self.tab.dispatchMessage(window.location.href, null);

  setData();
});
