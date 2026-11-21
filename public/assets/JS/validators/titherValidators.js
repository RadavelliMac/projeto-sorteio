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
    this.categories = ["Masculino", "Feminino", "Infantil"];
    this.regexNumber = /^\d+$/;
    this.regexPhone = /^\(\d{2}\) 9 \d{4}-\d{4}$/;
  }

  Validate() {
    if (!this.code) {
      this.CreateFieldErrorMessage(code, "O código é obrigatório!");
    } else if (!this.regexNumber.test(this.code) || Number(this.code) < 1) {
      this.CreateFieldErrorMessage(
        code,
        "O código deve ser um número inteiro maior que zero!",
      );
    }

    if (!this.name) this.CreateFieldErrorMessage(nome, "Nome Inválido!");

    if (!this.surname)
      this.CreateFieldErrorMessage(surname, "Sobrenome Inválido!");

    if (!this.neighborhood)
      this.CreateFieldErrorMessage(neighborhood, "Bairro Inválido!");

    if (!this.street) this.CreateFieldErrorMessage(street, "Rua Inválida!");

    if (!this.housenumber) {
      this.CreateFieldErrorMessage(housenumber, "O número é obrigatório!");
    } else if (
      !this.regexNumber.test(this.housenumber) ||
      Number(this.housenumber) < 1
    ) {
      this.CreateFieldErrorMessage(
        housenumber,
        "O número da casa deve ser um número inteiro maior que zero!",
      );
    }

    if (!this.phone) {
      this.CreateFieldErrorMessage(phone, "O telefone é obrigatório!");
    } else if (!this.regexPhone.test(this.phone)) {
      this.CreateFieldErrorMessage(
        phone,
        "Telefone inválido! Use o formato (11) 9 1234-5678.",
      );
    }

    if (!this.category) {
      this.CreateFieldErrorMessage(category, "A categoria é obrigatória!");
    } else if (!this.categories.includes(this.category)) {
      this.CreateFieldErrorMessage(
        category,
        "A categoria informada não é aceita!",
      );
    }
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
