window.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    let id = e.target.getAttribute("data-id");
    let confirmation = window.confirm("Tem certeza que deseja excluir?");
    if (confirmation)
      window.location.href = `/cadastro-geral/editar/excluir/${id}`;
    else alert("Exclusão cancelada");
  }
});
