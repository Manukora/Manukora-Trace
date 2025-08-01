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
        <h1 className="text-xl font-medium text-gray-900">Thanks for stopping by! Your honey is genuine, authentic Manukora Mānuka honey, we&apos;re just working in the background to get your QR code uploaded. Please send through a clear photo of the QR code and batch number from your jar or box to admin@authenticate.nz and one of our Manuka Specialists will be in touch with you to resolve this.</h1>
      </div>
    </div>
  );
} 