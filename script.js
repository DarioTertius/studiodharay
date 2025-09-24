// --- Efeito de Fade-in nas seções ---
const sections = document.querySelectorAll(".section");
const sectionObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

// --- Envio do formulário para WhatsApp ---
const bookingForm = document.getElementById("booking-form");

bookingForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Coloque seu número de WhatsApp aqui (55 + DDD + número)
  const numeroWhatsApp = "5585988084426";

  const nome = event.target.name.value;
  const servicoSelecionado =
    event.target.service.options[event.target.service.selectedIndex].text;
  const dataInput = event.target.date.value;
  const observacao = event.target.message.value;

  const dataFormatada = dataInput.split("-").reverse().join("/");

  let mensagem = `Olá! Gostaria de solicitar um agendamento.\n\n`;
  mensagem += `*Nome:* ${nome}\n`;
  mensagem += `*Serviço:* ${servicoSelecionado}\n`;
  mensagem += `*Data Preferida:* ${dataFormatada}\n`;

  if (observacao) {
    mensagem += `*Observação:* ${observacao}\n`;
  }

  const mensagemCodificada = encodeURIComponent(mensagem);

  const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;

  window.open(urlWhatsApp, "_blank");

  bookingForm.reset();
});
