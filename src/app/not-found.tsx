import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm px-4 text-center">
        <Image 
          src="/logo.png" 
          width={400} 
          height={400} 
          alt="Manukora Logo"
          className="w-full h-auto mb-6"
          priority
        />
        <h1 className="text-xl font-medium text-gray-900">Batch not found</h1>
      </div>
    </div>
  );
} 