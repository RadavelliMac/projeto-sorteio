const confirmSubmit = document
  .querySelector("#confirmSubmit")
  .addEventListener("click", (e) => {
    e.preventDefault();
    const winnerNumber = document.querySelector("#winnerName").innerHTML;
    const numberId = parseInt(winnerNumber);
  });
