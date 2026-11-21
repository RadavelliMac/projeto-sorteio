const present = document.querySelector("#present");

const formSubmit = document.querySelector(".formSubmit");
const submit = document.querySelector(".submit");

class Validator {
  constructor() {
    this.present = present.value;

    this.errors = 0;
    this.categories = ["Sim", "Nao"];
  }

  Validate() {
    if (!this.present) {
      this.CreateFieldErrorMessage(submit, "A presença é obrigatória!");
    } else if (!this.categories.includes(this.present)) {
      this.CreateFieldErrorMessage(
        submit,
        "A presença informada não é aceita!",
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
