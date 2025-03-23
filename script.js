document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("isLoggedIn")) {
        window.location.href = "index.html";
    }

    let balance = localStorage.getItem("balance") ? parseInt(localStorage.getItem("balance")) : 0;
    document.getElementById("balance").innerText = `৳${balance}`;

    const claimBtn = document.getElementById("claim-btn");
    const lastClaimTime = localStorage.getItem("lastClaimTime");

    if (lastClaimTime) {
        const lastClaimDate = new Date(parseInt(lastClaimTime));
        const now = new Date();
        const timeDiff = now - lastClaimDate;
        const hoursDiff = timeDiff / (1000 * 60 * 60);

        if (hoursDiff < 24) {
            claimBtn.disabled = true;
            claimBtn.innerText = "Claimed (Wait 24 hrs)";
        }
    }

    claimBtn.addEventListener("click", function () {
        const now = new Date().getTime();
        localStorage.setItem("lastClaimTime", now);
        balance += 6;
        localStorage.setItem("balance", balance);
        document.getElementById("balance").innerText = `৳${balance}`;
        claimBtn.disabled = true;
        claimBtn.innerText = "Claimed (Wait 24 hrs)";
    });
});

function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "index.html";
}
