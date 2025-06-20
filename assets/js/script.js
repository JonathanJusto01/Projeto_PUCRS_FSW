/**
 * script.js - Sistema completo para o Minimercado Tchê
 *
 * Organização:
 * 1. Constantes e Variáveis Globais
 * 2. Funções Utilitárias
 * 3. Gerenciamento do Carrinho
 * 4. Sistema de Login/Cadastro
 * 5. Formulários de Contato
 * 6. Agendamento de Entregas (com controle de endereço)
 * 7. Inicialização da Aplicação
 */

// =============================================
// 1. CONSTANTES E VARIÁVEIS GLOBAIS
// =============================================

const CART_STORAGE_KEY = "minimercadoTche_cart";
const USER_SESSION_KEY = "minimercadoTche_userSession";

// =============================================
// 2. FUNÇÕES UTILITÁRIAS
// =============================================

/**
 * Formata data para exibição (DD/MM/AAAA)
 * @param {string} dateString - Data no formato YYYY-MM-DD
 * @returns {string} Data formatada
 */
function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

/**
 * Mostra notificação para o usuário
 * @param {string} message - Mensagem a ser exibida
 * @param {string} type - Tipo de alerta (success, error, warning)
 */
function showAlert(message, type = "success") {
  // Implementação básica - pode ser substituída por um sistema de modais
  alert(message);
}

/**
 * Cria região ARIA para feedback de acessibilidade
 * @returns {HTMLElement} Elemento ARIA Live
 */
function createAriaLiveRegion() {
  const div = document.createElement("div");
  div.id = "aria-live";
  div.setAttribute("aria-live", "polite");
  div.style.position = "absolute";
  div.style.left = "-9999px";
  document.body.appendChild(div);
  return div;
}

/**
 * Notificação para leitores de tela
 * @param {string} message - Mensagem a ser anunciada
 */
function ariaNotify(message) {
  const ariaLive = document.getElementById("aria-live") || createAriaLiveRegion();
  ariaLive.textContent = message;
}

// =============================================
// 3. GERENCIAMENTO DO CARRINHO
// =============================================

/**
 * Atualiza o contador do carrinho na UI
 * @param {number} increment - Valor a ser incrementado
 */
function updateCartCounter(increment) {
  const cartBadge = document.querySelector(".fa-shopping-cart")?.nextElementSibling;
  if (!cartBadge) return;

  let currentCount = parseInt(cartBadge.textContent) || 0;
  cartBadge.textContent = currentCount + increment;
  cartBadge.setAttribute("aria-label", `${currentCount + increment} itens no carrinho`);

  // Atualiza também no localStorage
  localStorage.setItem(CART_STORAGE_KEY, currentCount + increment);
}

/**
 * Mostra feedback visual ao adicionar item ao carrinho
 * @param {HTMLElement} button - Botão que foi clicado
 */
function showAddToCartFeedback(button) {
  if (!button) return;

  const originalHTML = button.innerHTML;
  const originalClass = button.className;

  button.innerHTML = '<i class="fas fa-check me-2" aria-hidden="true"></i>Adicionado';
  button.classList.replace("btn-outline-success", "btn-success");

  setTimeout(() => {
    button.innerHTML = originalHTML;
    button.className = originalClass;
  }, 2000);
}

/**
 * Configura os eventos do carrinho de compras
 */
function setupCartFunctionality() {
  // Eventos para botões "Adicionar ao carrinho"
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
      const productCard = this.closest(".product-card");
      const productName = productCard?.querySelector(".card-title")?.textContent || "Produto";

      ariaNotify(`${productName} adicionado ao carrinho`);
      updateCartCounter(1);
      showAddToCartFeedback(this);
    });
  });

  // Inicializa contador do carrinho
  const savedCartCount = localStorage.getItem(CART_STORAGE_KEY);
  if (savedCartCount) {
    updateCartCounter(0); // Atualiza sem incrementar
  }
}

// =============================================
// 4. SISTEMA DE LOGIN/CADASTRO
// =============================================

/**
 * Alterna a visibilidade do campo de senha
 * @param {string} inputId - ID do input de senha
 * @param {string} toggleId - ID do botão de alternância
 */
function setupPasswordToggle(inputId, toggleId) {
  const toggleBtn = document.getElementById(toggleId);
  const input = document.getElementById(inputId);

  if (!toggleBtn || !input) return;

  toggleBtn.addEventListener("click", function () {
    const type = input.getAttribute("type") === "password" ? "text" : "password";
    input.setAttribute("type", type);
    this.querySelector("i").classList.toggle("fa-eye-slash");
    ariaNotify(`Senha ${type === "password" ? "ocultada" : "visível"}`);
  });
}

/**
 * Valida formulário de login
 */
function setupLoginForm() {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = this.querySelector("#email").value;
    const senha = this.querySelector("#senha").value;

    if (!email || !senha) {
      showAlert("Por favor, preencha todos os campos!", "error");
      return;
    }

    // Simulação de login bem-sucedido
    showAlert("Login realizado com sucesso! Redirecionando...");
    localStorage.setItem(USER_SESSION_KEY, "active");
    // window.location.href = 'minha-conta.html';
  });
}

/**
 * Valida formulário de cadastro
 */
function setupRegistrationForm() {
  const form = document.getElementById("cadastroForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const senha = this.querySelector("#senha").value;
    const confirmarSenha = this.querySelector("#confirmarSenha").value;

    if (senha !== confirmarSenha) {
      showAlert("As senhas não coincidem!", "error");
      return;
    }

    if (senha.length < 8) {
      showAlert("A senha deve ter no mínimo 8 caracteres!", "error");
      return;
    }

    showAlert("Cadastro realizado com sucesso!");
    // this.submit();
  });
}

// =============================================
// 5. FORMULÁRIOS DE CONTATO
// =============================================

/**
 * Configura validação do formulário de contato
 */
function setupContactForm() {
  const form = document.getElementById("formContato");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const requiredFields = ["nome", "email", "assunto", "mensagem"];
    const isEmpty = requiredFields.some((id) => !this.querySelector(`#${id}`).value);

    if (isEmpty) {
      showAlert("Por favor, preencha todos os campos obrigatórios!", "error");
      return;
    }

    showAlert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    this.reset();
  });
}

// =============================================
// 6. AGENDAMENTO DE ENTREGAS
// =============================================

/**
 * Configura toda a funcionalidade de agendamento
 */
function setupDeliveryScheduling() {
  // Configura data mínima (amanhã)
  const dateInput = document.getElementById("deliveryDate");
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split("T")[0];
  }

  // Configura seleção de tipo de entrega
  const deliveryOptions = document.querySelectorAll(".delivery-option");
  if (deliveryOptions.length) {
    setupDeliveryTypeSelection();
  }

  // Configura validação do formulário
  document.getElementById("confirmSchedule")?.addEventListener("click", validateScheduleForm);
}

/**
 * Configura a seleção entre tele-entrega e retirada
 * ATUALIZAÇÃO: Esconde completamente o formulário de endereço para retirada no local
 */
function setupDeliveryTypeSelection() {
  const deliveryOptions = document.querySelectorAll(".delivery-option");
  const deliveryTypeRadios = document.querySelectorAll('input[name="deliveryType"]');
  const deliveryTypeTexts = document.querySelectorAll(".delivery-type-text");
  const teleEntregaFields = document.querySelector(".tele-entrega-fields");
  const addressFieldsContainer = document.querySelector(".address-fields-container");

  deliveryOptions.forEach((option) => {
    option.addEventListener("click", function () {
      selectDeliveryOption(this);
      const radioId = this.id === "deliveryOption" ? "teleEntrega" : "retiradaLocal";
      document.getElementById(radioId).checked = true;
      updateDeliveryUI(radioId === "teleEntrega");
    });
  });

  deliveryTypeRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      const optionId = this.id === "teleEntrega" ? "deliveryOption" : "pickupOption";
      selectDeliveryOption(document.getElementById(optionId));
      updateDeliveryUI(this.id === "teleEntrega");
    });
  });

  function selectDeliveryOption(option) {
    deliveryOptions.forEach((opt) => opt.classList.remove("selected"));
    option.classList.add("selected");
    ariaNotify(`Opção de entrega selecionada: ${option.querySelector(".delivery-title").textContent}`);
  }

  function updateDeliveryUI(isDelivery) {
    // Atualiza textos
    deliveryTypeTexts.forEach((text) => {
      text.textContent = isDelivery ? "entrega" : "retirada";
    });

    // Mostra/oculta todo o bloco de endereço
    if (addressFieldsContainer) {
      addressFieldsContainer.style.display = isDelivery ? "block" : "none";
    }

    // Mostra/oculta campos específicos da tele-entrega
    if (teleEntregaFields) {
      teleEntregaFields.style.display = isDelivery ? "block" : "none";
    }

    // Atualiza opções de horário
    document.querySelectorAll(".tele-entrega-option").forEach((opt) => {
      opt.classList.toggle("d-none", !isDelivery);
    });
    document.querySelectorAll(".retirada-option").forEach((opt) => {
      opt.classList.toggle("d-none", isDelivery);
    });

    // Reseta seleção de horário
    document.getElementById("deliveryTime").value = "";
  }
}

/**
 * Valida o formulário de agendamento
 * ATUALIZAÇÃO: Não valida endereço para retirada no local
 */
function validateScheduleForm() {
  const selectedType = document.querySelector('input[name="deliveryType"]:checked');
  const date = document.getElementById("deliveryDate").value;
  const time = document.getElementById("deliveryTime").value;
  const address = document.getElementById("deliveryAddress")?.value;

  if (!selectedType) {
    showAlert("Por favor, selecione uma opção de entrega!", "error");
    return false;
  }

  if (!date || !time) {
    showAlert("Por favor, selecione uma data e horário!", "error");
    return false;
  }

  // Apenas valida endereço se for tele-entrega
  if (selectedType.id === "teleEntrega" && !address) {
    showAlert("Por favor, informe o endereço de entrega!", "error");
    return false;
  }

  showScheduleConfirmation(selectedType.id, date, time);
  return true;
}

/**
 * Mostra confirmação do agendamento
 */
function showScheduleConfirmation(type, date, time) {
  const tipo = type === "teleEntrega" ? "Tele-Entrega" : "Retirada";
  const horario = time.split("-")[0];
  const message = `Agendamento confirmado!\n\nData: ${formatDate(date)}\nHorário: ${horario}h\nTipo: ${tipo}\n\nObrigado por comprar conosco!`;

  showAlert(message);
}

// =============================================
// 7. INICIALIZAÇÃO DA APLICAÇÃO
// =============================================

document.addEventListener("DOMContentLoaded", function () {
  // Configurações gerais
  setupCartFunctionality();
  setupDeliveryScheduling();

  // Configurações específicas de página
  if (document.getElementById("loginForm")) {
    setupPasswordToggle("senha", "toggleSenha");
    setupLoginForm();
  }

  if (document.getElementById("cadastroForm")) {
    setupPasswordToggle("senha", "toggleSenha");
    setupPasswordToggle("confirmarSenha", "toggleConfirmarSenha");
    setupRegistrationForm();
  }

  if (document.getElementById("formContato")) {
    setupContactForm();
  }
});

// Evento para conteúdo carregado via AJAX
document.addEventListener("contentLoaded", function () {
  setupCartFunctionality();
  setupDeliveryScheduling();
});
