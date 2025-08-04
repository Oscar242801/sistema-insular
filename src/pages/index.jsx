
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Upload } from "lucide-react";
import { format } from "date-fns";

const emojiOptions = [
  { label: "📄 PDF", value: "📄" },
  { label: "📝 Word", value: "📝" },
  { label: "📷 Imagen", value: "📷" },
  { label: "📁 Excel", value: "📁" },
];

export default function Home() {
  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState(emojiOptions[0].value);

  const sendToTelegram = async (file, emoji, name, date) => {
    const token = "6609149305:AAEIVLrTbv_dAhdbjAvhE5EFoTgGe4CQTDc";
    const channel = "@sistemadocumentalinsular";

    const formData = new FormData();
    formData.append("chat_id", channel);
    formData.append("caption", `${emoji} ${name} | ${date}`);
    formData.append("document", file);

    await fetch(`https://api.telegram.org/bot${token}/sendDocument`, {
      method: "POST",
      body: formData,
    });
  };

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    const name = uploadedFile.name;
    const date = format(new Date(), "yyyy-MM-dd HH:mm");
    const newEntry = {
      emoji: selectedEmoji,
      name,
      date,
      file: URL.createObjectURL(uploadedFile),
    };

    setFiles([newEntry, ...files]);
    await sendToTelegram(uploadedFile, selectedEmoji, name, date);
  };

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(search.toLowerCase()) ||
    file.emoji.includes(search)
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/wp9679438.jpg')" }}
    >
      <div className="bg-black bg-opacity-60 min-h-screen p-6">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <img
              src="/523466437_18512401384006377_6926805809613502759_n.jpg"
              alt="Logo"
              className="w-14 h-14"
            />
            <h1 className="text-2xl font-bold">
              Base de datos de Territorio Insular - Infraestructura
            </h1>
          </div>
        </header>

        <Card className="bg-white text-black mb-6 max-w-xl mx-auto">
          <CardContent className="p-4 space-y-4">
            <div className="flex space-x-2 items-center">
              <Input
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                onChange={handleFileUpload}
              />
              <select
                className="border rounded px-2 py-1"
                value={selectedEmoji}
                onChange={(e) => setSelectedEmoji(e.target.value)}
              >
                {emojiOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <Upload />
            </div>
            <Input
              type="text"
              placeholder="Buscar por nombre o tipo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </CardContent>
        </Card>

        <div className="max-w-4xl mx-auto bg-white text-black rounded shadow p-4">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Tipo</th>
                <th className="text-left py-2">Nombre</th>
                <th className="text-left py-2">Fecha</th>
                <th className="text-left py-2">Descargar</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map((file, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{file.emoji}</td>
                  <td className="py-2">{file.name}</td>
                  <td className="py-2">{file.date}</td>
                  <td className="py-2">
                    <a href={file.file} download>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-1" /> Descargar
                      </Button>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
