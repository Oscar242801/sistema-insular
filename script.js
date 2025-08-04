document.getElementById("uploadForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const tipo = document.getElementById("tipo").value;
  const archivo = document.getElementById("archivo").files[0];
  if (!archivo) return alert("Selecciona un archivo");

  const fecha = new Date().toLocaleDateString("es-VE");
  const tbody = document.querySelector("#tablaDocumentos tbody");

  const fila = document.createElement("tr");
  fila.innerHTML = `
    <td>${tipo}</td>
    <td>${archivo.name}</td>
    <td>${fecha}</td>
    <td><a href="#" download="${archivo.name}">⬇️</a></td>
  `;
  tbody.appendChild(fila);

  // Simulación de envío a Telegram (aquí se haría la llamada real en producción)
  console.log("Enviado a Telegram:", archivo.name);
});

document.getElementById("busqueda").addEventListener("input", function () {
  const term = this.value.toLowerCase();
  document.querySelectorAll("#tablaDocumentos tbody tr").forEach(tr => {
    tr.style.display = [...tr.children].some(td => td.textContent.toLowerCase().includes(term)) ? "" : "none";
  });
});