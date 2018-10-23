clientTime = Date.now()
let errCount = 0
fetchThis()


function fetchThis() {


    const postRequestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'clientTime': clientTime })
    }

    fetch('/latest', postRequestOptions)
        .then(response => response.json())
        .then(data => {
            if (data.timeStamp > clientTime) {
                appendNewImages(data)

            }
            errCount = 0
            setTimeout(fetchThis, 5000)
        })
        .catch(err => {
            errCount++
            console.log(err)
            if (errCount === 1) {
                console.log("Failed once")
                alert("Connection Lost, click to attempt to reconnect to server")
                setTimeout(fetchThis, 3000)
            }
            if (errCount === 2) {
                console.log("Failed twice")
                alert("Unable to connect to server")
                document.getElementById("wrapper").textContent = "Lost Connection"
            }

        })


}