const code = document.querySelector(".code");
const nome = document.querySelector(".name");
const surname = document.querySelector(".surname");
const neighborhood = document.querySelector(".neighborhood");
const street = document.querySelector(".street");
const housenumber = document.querySelector(".housenumber");
const phone = document.querySelector(".phone");
const category = document.querySelector(".category");

const formSubmit = document.querySelector(".formSubmit");
const submit = document.querySelector(".submit");

class Validator {
  constructor() {
    this.code = code.value;
    this.name = nome.value;
    this.surname = surname.value;
    this.neighborhood = neighborhood.value;
    this.street = street.value;
    this.housenumber = housenumber.value;
    this.phone = phone.value;
    this.category = category.value;

    this.errors = 0;
  }

  Validate() {
    if (!this.code) this.CreateFieldErrorMessage(code, "Código Inválido!");

    if (!this.name) this.CreateFieldErrorMessage(nome, "Nome Inválido!");

    if (!this.surname)
      this.CreateFieldErrorMessage(surname, "Sobrenome Inválido!");

    if (!this.neighborhood)
      this.CreateFieldErrorMessage(neighborhood, "Bairro Inválido!");

    if (!this.street) this.CreateFieldErrorMessage(street, "Rua Inválida!");

    if (!this.housenumber)
      this.CreateFieldErrorMessage(housenumber, "Número Inválido!");

    if (!this.phone) this.CreateFieldErrorMessage(phone, "Telefone Inválido!");

    if (!this.category)
      this.CreateFieldErrorMessage(category, "Categoria Inválida!");
  }

  CreateFieldErrorMessage(field, message) {
    const element = document.createElement("p");
    element.innerHTML = message;
    element.setAttribute("class", "ErrorMessageFrontendValidator");
    field.insertAdjacentElement("afterend", element);

    this.errors++;
  }

  CleanAllPreviousErrorMessages() {
    const element = document.querySelectorAll(".ErrorMessageFrontendValidator");
    element.forEach((entry) => {
      entry.remove();
    });
  }

  Submit() {
    if (this.errors !== 0) return;
    formSubmit.submit();
  }
}

submit.addEventListener("click", (e) => {
  e.preventDefault();
  const validator = new Validator();
  validator.CleanAllPreviousErrorMessages();
  validator.Validate();
  validator.Submit();
});
