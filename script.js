document.addEventListener("DOMContentLoaded", () => {

    const targetDate = new Date("2026-06-13T15:00:00");

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    function updateCountdown() {

        const now = new Date();
        const difference = targetDate.getTime() - now.getTime();

        if (difference <= 0) {

            daysElement.textContent = "00";
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";

            const title = document.querySelector(".countdown-title");

            if (title) {
                title.textContent = "¡Ha llegado el gran día!";
            }

            clearInterval(countdownInterval);

            return;
        }

        const days = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

        const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) /
            (1000 * 60)
        );

        const seconds = Math.floor(
            (difference % (1000 * 60)) /
            1000
        );

        daysElement.textContent = String(days).padStart(2, "0");
        hoursElement.textContent = String(hours).padStart(2, "0");
        minutesElement.textContent = String(minutes).padStart(2, "0");
        secondsElement.textContent = String(seconds).padStart(2, "0");
    }

    updateCountdown();

    const countdownInterval = setInterval(
        updateCountdown,
        1000
    );

    const mapButton = document.getElementById("open-maps");

    if (mapButton) {

       mapButton.addEventListener("click", () => {

    const a = document.createElement("a");

    a.href = "https://maps.google.com/?q=-0.3047037,-78.4961777";

    a.target = "_blank";

    document.body.appendChild(a);

    a.click();

    a.remove();

});

});

    }

    const bees = document.querySelectorAll(".bee");

    bees.forEach((bee, index) => {

        let angle = index * 90;

        setInterval(() => {

            angle += 2;

            const radius = 10;

            const x = Math.cos(angle * Math.PI / 180) * radius;
            const y = Math.sin(angle * Math.PI / 180) * radius;

            bee.style.transform =
                `translate(${x}px, ${y}px) rotate(${angle}deg)`;

        }, 50);

    });

    const characters = document.querySelectorAll(".character-bg");

    characters.forEach(character => {

        character.addEventListener("mouseenter", () => {

            character.style.transition =
                "transform 0.3s ease";

            character.style.transform =
                "translateY(-8px) scale(1.05)";

        });

        character.addEventListener("mouseleave", () => {

            character.style.transform =
                "translateY(0) scale(1)";

        });

    });

    // Wait for all images to load (or timeout) before removing the loading spinner
    function waitForImages(timeout = 8000) {
        const imgs = Array.from(document.images || []);

        if (imgs.length === 0) {
            return Promise.resolve();
        }

        const loadPromises = imgs.map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => {
                img.addEventListener('load', resolve, { once: true });
                img.addEventListener('error', resolve, { once: true });
            });
        });

        const allLoaded = Promise.allSettled(loadPromises);
        const timer = new Promise(resolve => setTimeout(resolve, timeout));

        return Promise.race([allLoaded, timer]);
    }

    waitForImages(8000).then(() => {
        const spinner = document.getElementById('page-spinner');
        document.body.classList.remove('loading');

        if (spinner) {
            spinner.style.transition = 'opacity 0.35s ease';
            spinner.style.opacity = '0';
            setTimeout(() => {
                if (spinner && spinner.parentNode) spinner.parentNode.removeChild(spinner);
            }, 400);
        }
    });

});
