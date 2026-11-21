window.document.addEventListener("input", (e) => {
  if (e.target.classList.contains("numberForbidden")) {
    e.target.value = e.target.value.replace(/\D/g, "");
  }

  if (e.target.classList.contains("phone")) {
    const isDeleting = e.inputType && e.inputType.startsWith("delete");
    let digits = e.target.value.replace(/\D/g, "").substring(0, 11);

    const ddd = digits.substring(0, 2);
    const rest = digits.substring(3);

    let value = "";

    if (digits.length === 0) {
      value = "";
    } else if (ddd.length < 2) {
      value = "(" + ddd;
    } else if (isDeleting && digits.length <= 3) {
      value = "(" + ddd;
    } else {
      value = `(${ddd}) 9 ` + rest.substring(0, 4);
      if (rest.length > 4) {
        value += "-" + rest.substring(4, 8);
      }
    }

    e.target.value = value;
  }
});
