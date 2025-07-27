import React from 'react';

interface PDFEmbedProps {
  pdfUrl: string;
  title: string;
}

export const PDFEmbed: React.FC<PDFEmbedProps> = ({ pdfUrl, title }) => {
  return (
    <div className="relative rounded-lg overflow-hidden">
      {/* Title positioned to avoid default controls */}
      <div className="absolute top-0 left-0 p-4 max-w-[60%]">
        <h2 className="text-white font-light">{title}</h2>
      </div>

      <object
        data={pdfUrl}
        type="application/pdf"
        className="w-full h-[400px] bg-gray-100"
      />
    </div>
  );
};

export default PDFEmbed;
