// ================= TIMER =================
function startTimer(endTime, elementId) {
    function updateTimer() {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance < 0) {
            document.getElementById(elementId).innerHTML = "Time's up!";
            return;
        }

        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance / (1000 * 60)) % 60);
        const seconds = Math.floor((distance / 1000) % 60);

        document.getElementById(elementId).innerHTML =
            hours + "h " + minutes + "m " + seconds + "s";
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

// ================= INIT TIMERS =================
const now = new Date();

// Today 11:59 PM
const today1159 = new Date();
today1159.setHours(23, 59, 0, 0);

// Tomorrow 2 PM
const tomorrow2pm = new Date();
tomorrow2pm.setDate(now.getDate() + 1);
tomorrow2pm.setHours(14, 0, 0, 0);

startTimer(today1159.getTime(), "timer1");
startTimer(tomorrow2pm.getTime(), "timer2");


// ================= GOOGLE SHEETS FUNCTION =================
function sendMessage(id) {
    const message = document.getElementById(id).value;

    if (!message.trim()) {
        alert("Write something first ❤️");
        return;
    }

fetch("https://script.google.com/macros/s/AKfycbz_-NmosPw5upcaXC0mBLUQP6L0-6ufScX7-M4gZMRQWK4XNSI1im97PxluejG2TXC9wA/exec", {
    method: "POST",
    mode: "no-cors",   // 🔥 VERY IMPORTANT
    body: new URLSearchParams({
        message: message
    })
})
.then(() => {
    alert("Got it ❤️");
    document.getElementById(id).value = "";
})
.catch(err => {
    alert("Something went wrong 😢");
    console.error(err);
});
}



let selectedProduct = null;

function selectProduct(id, name) {
    selectedProduct = { id, name };

    document.getElementById("popup-text").innerText =
        `You have selected ${name} my love ❤️, is this your final decision?`;

    document.getElementById("popup").style.display = "flex";
}

// YES BUTTON
document.getElementById("confirmBtn").onclick = function () {
    if (!selectedProduct) return;

    const message = `She selected product ${selectedProduct.id}: ${selectedProduct.name}`;

    fetch("https://script.google.com/macros/s/AKfycbxI70zwTkM97jEb7GKT4QXEGYD5TBeJiTIvUBvws2ybNttoESCSlF8KGZgPeUCJOfA/exec", {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams({
            message: message
        })
    });

    document.getElementById("popup").style.display = "none";

    // Final message
    alert(`${selectedProduct.name} has been sent to Deepu (the best boyfriend in the world 😎❤️). He will order it for you.`);
};

// NO BUTTON
document.getElementById("cancelBtn").onclick = function () {
    document.getElementById("popup").style.display = "none";
};