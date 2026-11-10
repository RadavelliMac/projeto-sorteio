const confirmSubmit = document
  .querySelector("#confirmSubmit")
  .addEventListener("click", (e) => {
    const winnerNumber = document.querySelector("#winnerName").innerHTML;
    const numberId = parseInt(winnerNumber);

    const invisible = (document.querySelector("#invisible").value = numberId);
  });
