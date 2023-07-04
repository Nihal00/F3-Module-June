//Dom Element
const btn = document.getElementById("btn");


//Get user IP address
btn.addEventListener("click", async () => {
    try {
        const response = await fetch("https://api.ipify.org?format=json");
        const ip = await response.json();
        console.log(ip);

        const apiUrl = "https://ipinfo.io/"+ip+"?token=9409fb8e79a233";
        // const apiUrl = `https://ipinfo.io/${ip}geo`;
        const rowData = await fetch(apiUrl);
        const data = await rowData.json();
        console.log(data);

        sessionStorage.clear();

        setTimeout(() => {
            sessionStorage.setItem("userLocation", JSON.stringify(data));
            window.location.href = "./map.html";
        }, 1000);

    } catch (err) {
        alert(`Error: ${err}`);
    }
});
