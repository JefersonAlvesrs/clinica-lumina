// Projeto demonstrativo: configure apenas um número autorizado com DDI e DDD.
const WHATSAPP_NUMBER = "";
const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu");
if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });
  menu.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menu");
    }),
  );
}
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelectorAll('a[href="#inicio"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
    if (history.replaceState)
      history.replaceState(null, "", location.pathname + location.search);
  });
});
document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const nome = document.querySelector("#nome").value.trim();
  const telefone = document.querySelector("#telefone").value.trim();
  const tratamento = document.querySelector("#tratamento").value;
  const mensagem = document.querySelector("#mensagem").value.trim();
  const status = document.querySelector("#form-status");
  if (!nome || !tratamento) {
    status.textContent = "Preencha os campos obrigatórios.";
    return;
  }
  const texto = `Olá! Meu nome é ${nome}. Tenho interesse em ${tratamento}.${telefone ? " Meu telefone: " + telefone + "." : ""}${mensagem ? " Mensagem: " + mensagem : ""}`;
  if (!/^\d{12,15}$/.test(WHATSAPP_NUMBER)) {
    status.textContent =
      "Mensagem preparada! Este é um projeto demonstrativo. Configure um número de WhatsApp autorizado no script.js para habilitar o envio.";
    return;
  }
  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`,
    "_blank",
    "noopener,noreferrer",
  );
  status.textContent = "O WhatsApp foi aberto em uma nova aba.";
});
