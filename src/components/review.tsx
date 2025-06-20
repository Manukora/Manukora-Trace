export default function Review({ locale, reviewLink, reviewTitle }: { locale: string, reviewLink: string, reviewTitle: string }) {
  return (
    <div className={`w-screen bg-[#fbf7ec] relative ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
      <div className="flex justify-center items-center pt-8 pb-16">
        <a 
          href={reviewLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white px-8 py-4 rounded-full font-moretmnk text-lg hover:bg-gray-800 transition-colors duration-200"
        >
          {reviewTitle}
        </a>
      </div>
    </div>
  );
}