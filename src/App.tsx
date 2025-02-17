import React, { useState, useRef } from 'react';
import { Camera, PawPrint as Paw, Upload } from 'lucide-react';
import html2pdf from 'html2pdf.js';

interface PetInfo {
  name: string;
  breed: string;
  birthDate: string;
  gender: string;
  color: string;
  ownerName: string;
  registrationNumber: string;
}

function App() {
  const [petInfo, setPetInfo] = useState<PetInfo>({
    name: '',
    breed: '',
    birthDate: '',
    gender: '',
    color: '',
    ownerName: '',
    registrationNumber: `PET${Math.random()
      .toString(36)
      .substr(2, 9)
      .toUpperCase()}`,
  });
  const [petImage, setPetImage] = useState<string>(
    'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500'
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPetInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      img.onload = () => {
        const maxWidth = 300;
        const maxHeight = 400;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setPetImage(dataUrl);
      };
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          img.src = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePDF = () => {
    if (!cardRef.current) return;
    const element = cardRef.current;
    const opt = {
      margin: 0,
      filename: `carteira-pet-${petInfo.registrationNumber}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: [105, 75], orientation: 'landscape' },
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-pink-600 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4 flex items-center gap-2">
          <Paw size={32} />
          <h1 className="text-2xl font-bold">
            Carteira de Identificação Animal
          </h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6">Informações do Pet</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {' '}
                  Nome do Pet{' '}
                </label>
                <input
                  type="text"
                  name="name"
                  value={petInfo.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Nome do seu pet"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {' '}
                  Raça{' '}
                </label>
                <input
                  type="text"
                  name="breed"
                  value={petInfo.breed}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Raça do pet"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {' '}
                  Data de Nascimento{' '}
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={petInfo.birthDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {' '}
                  Gênero{' '}
                </label>
                <select
                  name="gender"
                  value={petInfo.gender}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Selecione</option>
                  <option value="Macho">Macho</option>
                  <option value="Fêmea">Fêmea</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {' '}
                  Cor{' '}
                </label>
                <input
                  type="text"
                  name="color"
                  value={petInfo.color}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Cor do pet"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {' '}
                  Nome do Proprietário{' '}
                </label>
                <input
                  type="text"
                  name="ownerName"
                  value={petInfo.ownerName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Seu nome completo"
                />
              </div>
            </div>
          </div>
          {/* Preview Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6">
              Carteira de Identificação Pet
            </h2>
            {/* Card Preview */}
            <div
              ref={cardRef}
              className="relative w-[96mm] h-[65mm] mx-auto bg-pink-100 overflow-hidden"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm4.5 1.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-9 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm9 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-9 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z' fill='rgba(219, 39, 119, 0.1)' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                border: '2px solid #db2777',
              }}
            >
              <div className="absolute top-2 left-2 text-pink-700 font-bold text-sm">
                {' '}
                REPÚBLICA FEDERATIVA DO BRASIL{' '}
              </div>
              <div className="absolute top-6 left-2 text-pink-700 font-bold text-xs">
                {' '}
                REGISTRO DOS BICHINHOS FOFO{' '}
              </div>
              <div className="absolute top-10 left-2 text-pink-700 font-bold text-xs">
                {' '}
                CARTEIRA DE IDENTIDADE ANIMAL{' '}
              </div>
              {/* Photo Area */}
              <div className="absolute top-1/2 right-2 transform -translate-y-1/2 w-24 h-32 border-2 border-pink-600 bg-white">
                <img
                  src={petImage}
                  alt="Pet"
                  className="w-full h-full object-cover"
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-1 right-1 bg-pink-600 text-white p-1 rounded-full hover:bg-pink-700"
                >
                  <Camera size={12} />
                </button>
              </div>
              {/* Pet Information */}
              <div className="absolute top-20 left-2 space-y-1 text-pink-700 text-[10px]">
                <p>
                  <strong>NOME:</strong> {petInfo.name}
                </p>
                <p>
                  <strong>RAÇA:</strong> {petInfo.breed}
                </p>
                <p>
                  <strong>SEXO:</strong> {petInfo.gender}
                </p>
                <p>
                  <strong>COR:</strong> {petInfo.color}
                </p>
                <p>
                  <strong>DATA DE NASCIMENTO:</strong> {petInfo.birthDate}
                </p>
                <p>
                  <strong>PROPRIETÁRIO:</strong> {petInfo.ownerName}
                </p>
                <p>
                  <strong>REGISTRO:</strong> {petInfo.registrationNumber}
                </p>
              </div>
              {/* Paw Print Watermark */}
              <div className="absolute right-2 bottom-2">
                <Paw size={24} className="text-pink-200" />
              </div>
              {/* Legal Disclaimer */}
              <div className="absolute bottom-2 right-2 text-[6px] text-pink-600">
                *Este documento não tem valor legal
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <button
                onClick={generatePDF}
                className="bg-pink-600 text-white px-6 py-2 rounded-md flex items-center gap-2 hover:bg-pink-700"
              >
                <Upload size={20} /> Gerar Carteira Digital
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
