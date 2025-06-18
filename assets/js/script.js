/*Função para carregar conteúdo em um elemento, definida para facilitar a manutenção
e instalação de recursos de acesibilidade */
function loadContent(elementId, fileName) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", fileName, true); // Abre uma requisição para o arquivo
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Insere o conteúdo no elemento pelo ID
      document.getElementById(elementId).innerHTML = xhr.responseText;
    }
  };
  xhr.send(); // Envia a requisição
}

// Carrega o header e o footer usando a função
loadContent("header", "components/header.html");
loadContent("footer", "components/footer.html");

//------------------------------------------------------------------

// Simulação de adicionar ao carrinho
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", function () {
    const productCard = this.closest(".product-card");
    const productName = productCard.querySelector(".card-title").textContent;

    // Atualiza o contador do carrinho
    const cartBadge = document.querySelector(".fa-shopping-cart").nextElementSibling;
    let currentCount = parseInt(cartBadge.textContent);
    cartBadge.textContent = currentCount + 1;

    // Feedback visual
    this.innerHTML = '<i class="fas fa-check me-2"></i>Adicionado';
    this.classList.remove("btn-outline-success");
    this.classList.add("btn-success");

    // Reseta após 2 segundos
    setTimeout(() => {
      this.innerHTML = '<i class="fas fa-cart-plus me-2"></i>Adicionar';
      this.classList.remove("btn-success");
      this.classList.add("btn-outline-success");
    }, 2000);
  });
});

// Seleção de opção de entrega/retirada
const deliveryOption = document.getElementById("deliveryOption");
const pickupOption = document.getElementById("pickupOption");
const confirmButton = document.getElementById("confirmDeliveryOption");

let selectedOption = "delivery"; // Padrão: entrega

deliveryOption.addEventListener("click", function () {
  this.classList.add("selected");
  pickupOption.classList.remove("selected");
  selectedOption = "delivery";
});

pickupOption.addEventListener("click", function () {
  this.classList.add("selected");
  deliveryOption.classList.remove("selected");
  selectedOption = "pickup";
});

confirmButton.addEventListener("click", function () {
  if (selectedOption === "delivery") {
    alert("Modo de entrega selecionado: Entrega em Casa\nTaxa de R$ 5,90 aplicada");
  } else {
    alert("Modo de entrega selecionado: Retirar na Loja\nSeu pedido ficará pronto em 1 hora");
  }
});
