'use client';
import { useRouter } from 'next/navigation';
import { FileText } from 'lucide-react';
import { JSX } from 'react';

export default function HomePage(): JSX.Element {
  const router = useRouter();

  const handleGenerate = () => {
    router.push('/editor');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <FileText size={32} className="text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            RFQ Generator
          </h1>
          <p className="text-gray-600">
            Generate structured RFQ responses with AI
          </p>
        </div>
        
        <button
          onClick={handleGenerate}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
        >
          Generate RFQ Response
        </button>
      </div>
    </div>
  );
}