
async function subirArchivo() {
  const tipo = document.getElementById("tipo").value;
  const archivoInput = document.getElementById("archivo");
  const archivo = archivoInput.files[0];
  const mensaje = document.getElementById("mensaje");

  if (!archivo) {
    mensaje.textContent = "Por favor, selecciona un archivo.";
    return;
  }

  const fecha = new Date().toLocaleDateString("es-VE");
  const formData = new FormData();
  formData.append("documento", archivo);
  formData.append("tipo", tipo);
  formData.append("fecha", fecha);

  try {
    await fetch(webhookURL, { method: "POST", body: formData });
    const tabla = document.querySelector("#tabla tbody");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${tipo}</td>
      <td>${archivo.name}</td>
      <td>${fecha}</td>
      <td>✅ Enviado</td>
      <td><a href="#" download="${archivo.name}">Descargar</a></td>
    `;
    tabla.appendChild(row);
    mensaje.textContent = "Documento enviado con éxito.";
    archivoInput.value = "";
  } catch (error) {
    mensaje.textContent = "Error al enviar el archivo.";
  }
}

function filtrarTabla() {
  const filtro = document.getElementById("filtro").value.toLowerCase();
  const filas = document.querySelector("#tabla tbody").getElementsByTagName("tr");
  for (let fila of filas) {
    let texto = fila.innerText.toLowerCase();
    fila.style.display = texto.includes(filtro) ? "" : "none";
  }
}
