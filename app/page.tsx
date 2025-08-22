// app/page.tsx or components/Home.tsx

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 dark:bg-black p-8 text-center relative overflow-hidden">
      {/* Dynamic background elements with your colors */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#c850c0] to-[#4158d0] opacity-80" />
      <div className="absolute top-0 left-0 w-full h-full transform skew-y-12 origin-top-left bg-[#c850c0] opacity-20" />
      <div className="absolute bottom-0 right-0 w-full h-full transform -skew-y-12 origin-bottom-right bg-[#4158d0] opacity-20" />

      <div className="relative z-10 w-full max-w-xl mx-auto p-8 rounded-xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight tracking-wider animate-fade-in">
          ยินดีต้อนรับ
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#c850c0] to-[#4158d0] mt-2">
            สู่ร้านของเรา
          </span>
        </h1>

        <p className="text-xl text-gray-200 dark:text-gray-400 mb-10 max-w-md mx-auto animate-fade-in delay-200">
          ค้นพบสินค้าคุณภาพเยี่ยมที่คัดสรรมาเพื่อคุณโดยเฉพาะ
        </p>

        <Link
          href="/products"
          className="inline-flex items-center justify-center rounded-full text-white font-bold text-lg px-8 py-4 border-2 border-transparent transition-all duration-300 transform hover:scale-105 hover:border-white shadow-xl animate-fade-in delay-500"
          style={{
            background: 'linear-gradient(to right, #c850c0, #4158d0)'
          }}
        >
          <span className="mr-2"></span> ไปหน้าสินค้า
        </Link>
      </div>
    </div>
  );
}