if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('./service-worker.js')
		.then(function () {
			console.log('Service Worker Registered');
		});
}

function pad(time) {
	return (time < 10 ? "0" : "") + time
}

function getTime() {
	var date = new Date()
	var hours = pad(date.getHours())
	var minutes = pad(date.getMinutes())
	return hours + ":" + minutes
}

function updateTime(data) {
	var time
	function refresh() {
		newTime = getTime()
		// only update it the time has changed
		if (newTime !== time) {
			time = newTime
			var quotes = data[time];
			var showTime = false
			if (!quotes || quotes.length == 0) {
				// show time, since the fallback quote doesn't contain it
				showTime = true;
				quotes = data.fallback
			}
			var quote = quotes[Math.floor(Math.random() * quotes.length)]
			updateUI(quote, showTime ? time : undefined)
		}
		setTimeout(refresh, 1000)
	}
	refresh();
}

function updateText(selector, text) {
	var element = document.querySelector(selector)
	if (text) {
		element.innerHTML = text
	} else {
		element.innerHTML = ""
	}
}

function updateUI(quote, time, showTime) {
	var timeText = quote.time
	var text = quote.text.replace(timeText, `<span class="timepart">${timeText}</span>`)
	updateText('.quote', text)
	updateText('.quote', text)
	updateText('.author', quote.author)
	updateText('.book', quote.book)
	updateText('.time', time)
}

fetch('data.json').then(function (response) {
	return response.json()
}).then(function (data) {
	updateTime(data)
})





