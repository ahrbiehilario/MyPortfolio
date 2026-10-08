const body = document.body;

const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const dateTime = document.getElementById("dateTime");
const year = document.getElementById("year");

const welcomeBtn = document.getElementById("welcomeBtn");
const welcomeModal = document.getElementById("welcomeModal");
const modalClose = document.getElementById("modalClose");
const modalOkay = document.getElementById("modalOkay");
const modalBox = welcomeModal.querySelector(".modal-box");

const backTop = document.getElementById("backTop");
const toast = document.getElementById("toast");

const projectCards = document.querySelectorAll(".project-card");
const prevSlide = document.getElementById("prevSlide");
const nextSlide = document.getElementById("nextSlide");
const dots = document.getElementById("dots");

let currentSlide = 0;
let toastTimer;

function updateDateTime() {
    const now = new Date();

    const formatted = now.toLocaleString("en-PH", {
        dateStyle: "medium",
        timeStyle: "short"
    });

    dateTime.textContent = formatted;
}

function showToast(message) {
    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2600);
}

function setTheme(dark) {
    body.classList.toggle("dark", dark);

    themeToggle.textContent = dark
        ? "☀"
        : "☾";

    localStorage.setItem(
        "portfolioTheme",
        dark ? "dark" : "light"
    );
}

const savedTheme =
    localStorage.getItem("portfolioTheme");

setTheme(savedTheme === "dark");

themeToggle.addEventListener("click", () => {
    setTheme(
        !body.classList.contains("dark")
    );
});

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");

    menuToggle.textContent =
        navLinks.classList.contains("open")
            ? "×"
            : "☰";
});

document
    .querySelectorAll(".nav-links a")
    .forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.textContent = "☰";
        });
    });

function openModal() {
    welcomeModal.classList.remove("show");

    modalBox.classList.remove("modal-slide");

    void modalBox.offsetWidth;

    welcomeModal.classList.add("show");

    modalBox.classList.add("modal-slide");

    welcomeModal.setAttribute(
        "aria-hidden",
        "false"
    );
}

function closeModal() {
    welcomeModal.classList.remove("show");

    modalBox.classList.remove("modal-slide");

    welcomeModal.setAttribute(
        "aria-hidden",
        "true"
    );
}

welcomeBtn.addEventListener(
    "click",
    openModal
);

modalClose.addEventListener(
    "click",
    closeModal
);

modalOkay.addEventListener(
    "click",
    closeModal
);

welcomeModal.addEventListener(
    "click",
    event => {
        if (event.target === welcomeModal) {
            closeModal();
        }
    }
);

function renderDots() {
    dots.innerHTML = "";

    projectCards.forEach((_, index) => {
        const dot =
            document.createElement("button");

        dot.className =
            index === currentSlide
                ? "dot active"
                : "dot";

        dot.setAttribute(
            "aria-label",
            `Show project ${index + 1}`
        );

        dot.addEventListener(
            "click",
            () => showSlide(index)
        );

        dots.appendChild(dot);
    });
}

function showSlide(index) {
    currentSlide =
        (index + projectCards.length)
        % projectCards.length;

    projectCards.forEach((card, i) => {
        card.classList.toggle(
            "active",
            i === currentSlide
        );
    });

    renderDots();
}

prevSlide.addEventListener(
    "click",
    () => showSlide(currentSlide - 1)
);

nextSlide.addEventListener(
    "click",
    () => showSlide(currentSlide + 1)
);

window.addEventListener(
    "scroll",
    () => {
        backTop.classList.toggle(
            "show",
            window.scrollY > 500
        );
    }
);

backTop.addEventListener(
    "click",
    () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
);

year.textContent =
    new Date().getFullYear();

updateDateTime();

setInterval(
    updateDateTime,
    1000
);

renderDots();

window.addEventListener(
    "load",
    () => {
        openModal();
    }
);