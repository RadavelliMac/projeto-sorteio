const category = document.querySelector(".category");

const formFirst = document.querySelector(".formFirst");
const submit = document.querySelector(".submit");

class Validator {
  constructor() {
    this.category = category.value;
    this.errors = 0;
    this.categories = ["Masculino", "Feminino", "Infantil"];
  }

  Validate() {
    if (!this.category) {
      this.CreateFieldErrorMessage(category, "A categoria é obrigatória!");
    } else if (!this.categories.includes(this.category)) {
      this.CreateFieldErrorMessage(
        submit,
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
    formFirst.submit();
  }
}

submit.addEventListener("click", (e) => {
  e.preventDefault();
  const validator = new Validator();
  validator.CleanAllPreviousErrorMessages();
  validator.Validate();
  validator.Submit();
});
