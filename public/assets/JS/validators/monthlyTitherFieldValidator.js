const code = document.querySelector(".code");

const formSubmit = document.querySelector(".formSubmit");
const submit = document.querySelector(".submit");

class Validator {
  constructor() {
    this.code = code.value;

    this.errors = 0;
    this.regexNumber = /^\d+$/;
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
