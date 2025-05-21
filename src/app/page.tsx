import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm px-4">
        <Image 
          src="/logo.png" 
          width={400} 
          height={400} 
          alt="Manukora Logo"
          className="w-full h-auto"
          priority
        />
      </div>
    </div>
  );
}
