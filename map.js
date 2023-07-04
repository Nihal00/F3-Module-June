//onload
const userIP = document.querySelector(".header");
const lat = document.getElementById("lat");
const long = document.getElementById("long");
const city = document.getElementById("city");
const region = document.getElementById("region");
const organization = document.getElementById("organization");
// const hostname = document.getElementById("hostname");
const mapping = document.getElementById("mapping");



const timeZone = document.getElementById("time-zone");
const dateTime = document.getElementById("date-time");
const pincode = document.getElementById("pincode");
const message = document.getElementById("message");
const filterInput = document.getElementById("filter-input");

const postOffices = document.querySelector('.post-offices');

let userData;
let postOfficeDate;
let dataOfPostOffice = [];


const displayTimeAndDate = () => {
    let currentTime = new Date();
    // console.log(currentTime);
    let date = currentTime.toLocaleDateString();

    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();

    hours = addLeadingZero(hours);
    minutes = addLeadingZero(minutes);
    seconds = addLeadingZero(seconds);

    dateTime.innerText = `Date And Time: ${date}, ${hours}:${minutes}:${seconds}`;
}

const addLeadingZero = (time) => {
    if(time < 10){
        return "0" + time;
    }else {
        return time
    }
}

const setMap = (longitude, latitude) => {
    mapping.innerHTML = '';
    mapping.innerHTML = `
    <iframe
    src="https://maps.google.com/maps?q=${longitude},${latitude}&z=15&output=embed"
    width="100%"
    height="100%"
    frameborder="0"
    style="border: 0"></iframe>
    `;
}

const setPostOffice = () => {
    for(let post of postOfficeDate[0].PostOffice){
        dataOfPostOffice.push(post);
    }

    console.log(dataOfPostOffice);
}

const displayPostOffice = (dataOfPostOffice) => {
    postOffices.innerHTML = '';
    
    dataOfPostOffice.forEach(office => {
        postOffices.innerHTML += `
            <div class="post-info">
                <p class="info"><span class="info-title">Name:</span> ${office.Name}</p>
                <p class="info"><span class="info-title">Branch Type:</span> ${office.BranchType}Type</p>
                <p class="info"><span class="info-title">Delivery Status:</span> ${office.DeliveryStatus}</p>
                <p class="info"><span class="info-title">District:</span> ${office.District}</p>
                <p class="info-d"><span class="info-title">Division:</span> ${office.Division}</p>
            </div>
        `;
    });
}


async function onload() {
    userData = JSON.parse(sessionStorage.getItem("userLocation"));
    userIP.innerHTML = `MY Public IP ADDRESS: ${userData.ip}`;
    let loactionArr = userData.loc.split(",");
    let longitude = loactionArr[0];
    let latitude = loactionArr[1];
    lat.innerText = `Lat: ${longitude}`;
    long.innerText = `Long: ${latitude}`;
    city.innerText = `City: ${userData.city}`;
    region.innerText = `Region: ${userData.region}`;
    organization.innerText = `Organization: ${userData.org}`;
    // hostname.innerText = `Region:${userData.region}`;
    setMap(longitude, latitude);

    timeZone.innerText = `Time Zone: ${userData.timezone}`;
    setInterval(displayTimeAndDate, 1000);
    pincode.innerText = `Pincode: ${userData.postal}`;
    await postOffice();
    message.innerHTML = '';
    message.innerHTML= `<span>Message:</span><span class="comment"> ${postOfficeDate[0].Message}</span>`;
    setPostOffice();
    displayPostOffice(dataOfPostOffice);
}

async function postOffice(){
    try{
        const response = await fetch(`https://api.postalpincode.in/pincode/${userData.postal}`);
        const data = await response.json();
        postOfficeDate = data;
    }catch(err){
        alert(`Error: ${err}`);
    }
}


window.addEventListener("load", onload);

filterInput.addEventListener("input", (e) => {
    let strValue = e.target.value.toLowerCase();
    let filtedPostOffice = [];
    dataOfPostOffice.forEach(office => {
        let officeName = office.Name.toLowerCase();
        let officeBranch = office.BranchType.toLowerCase();

        if(officeName.includes(strValue) || officeBranch.includes(strValue)){
            filtedPostOffice.push(office);
        }   
    });
    console.log(filtedPostOffice);
    displayPostOffice(filtedPostOffice);
});