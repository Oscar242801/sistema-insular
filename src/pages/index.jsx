
import React, { useState } from 'react';

export default function Home() {
  const [documento, setDocumento] = useState(null);
  const [tipo, setTipo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!documento || !tipo || !descripcion) {
      alert('Por favor completa todos los campos.');
      return;
    }

    const formData = new FormData();
    formData.append('documento', documento);
    formData.append('tipo', tipo);
    formData.append('descripcion', descripcion);

    const token = process.env.NEXT_PUBLIC_TELEGRAM_TOKEN;
    const chatId = process.env.NEXT_PUBLIC_CHANNEL_ID;

    const caption = `🗂️ Tipo: ${tipo}\n📝 Descripción: ${descripcion}`;
    formData.append('chat_id', chatId);
    formData.append('caption', caption);

    const fileType = documento.type;
    const endpoint = fileType.startsWith('image/')
      ? 'https://api.telegram.org/bot' + token + '/sendPhoto'
      : 'https://api.telegram.org/bot' + token + '/sendDocument';

    const fileField = fileType.startsWith('image/') ? 'photo' : 'document';
    formData.append(fileField, documento);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        alert('Documento enviado correctamente.');
        setDocumento(null);
        setTipo('');
        setDescripcion('');
      } else {
        alert('Error al enviar el documento.');
      }
    } catch (error) {
      console.error(error);
      alert('Error en la conexión.');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Sistema Documental del Territorio Insular</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setDocumento(e.target.files[0])} required />
        <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
          <option value="">Seleccione tipo</option>
          <option value="📝 Informe">📝 Informe</option>
          <option value="📊 Reporte">📊 Reporte</option>
          <option value="📷 Imagen">📷 Imagen</option>
        </select>
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
