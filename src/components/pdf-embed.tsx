import React, { useState } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';

interface PDFEmbedProps {
  pdfUrl: string;
  title: string;
}

export const PDFEmbed: React.FC<PDFEmbedProps> = ({ pdfUrl, title }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      
      // Fetch the PDF file
      const response = await fetch(pdfUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch PDF');
      }
      
      // Convert to blob
      const blob = await response.blob();
      
      // Create blob URL
      const blobUrl = window.URL.createObjectURL(blob);
      
      // Create download link
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up blob URL
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      // Fallback to original method if fetch fails
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `${title}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="relative rounded-lg overflow-hidden bg-white shadow-lg" style={{ overscrollBehavior: 'contain' }}>
      {/* Header with title and download button */}
      <div className="flex items-center justify-between p-4 bg-stone-700 text-white">
        <h2 className="text-lg font-medium truncate font-sans">{title}</h2>
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="font-inter flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-300 disabled:cursor-not-allowed rounded-full transition-colors duration-200 text-sm font-medium text-black"
          title="Download PDF"
        >
          <ArrowDownTrayIcon className="w-4 h-4" />
        </button>
      </div>

      {/* PDF viewer */}
      <div className="w-full h-[400px] bg-gray-100 relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-20">
            <div className="text-gray-500">Loading PDF...</div>
          </div>
        )}
        
        <iframe
          src={`${pdfUrl}#view=Fit&toolbar=0&navpanes=0&scrollbar=0`}
          className="w-full h-full pointer-events-auto"
          title={title}
          frameBorder="0"
          onLoad={() => setIsLoading(false)}
          style={{
            touchAction: 'pan-x pan-y',
            overscrollBehavior: 'contain'
          }}
        />
      </div>
    </div>
  );
};

export default PDFEmbed;
