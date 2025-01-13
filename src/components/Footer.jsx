const Footer = () => {
  return (
    <footer className="bg-white border-t py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Column 1 - Logo & Description */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/logo.jpeg"
                alt="Logo"
                className="h-8 w-8 md:h-10 md:w-10 rounded-full"
              />
              <span className="text-lg md:text-xl font-bold">
                Keluarga Sehat
              </span>
            </div>
            <p className="text-gray-600 text-sm max-w-xs">
              lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor.
            </p>
          </div>

          {/* Column 2 - Tentang Kami */}
          <div className="col-span-1">
            <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4">
              TENTANG KAMI
            </h3>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  Visi & Misi
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  Editor
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  Hubungi Kami
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  Privasi
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Kategori */}
          <div className="col-span-1">
            <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4">
              KATEGORI
            </h3>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  A
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  B
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  C
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  D
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - App Download */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4">
              Aplikasi
            </h3>
            <div className="flex flex-row md:flex-col gap-4 items-center md:items-start">
              <img
                src="/logo.jpeg"
                alt="Primaku"
                className="w-20 h-20 md:w-32 md:h-32 object-contain"
              />
              <div className="flex flex-col md:flex-row gap-2">
                <a href="#" className="block">
                  <img
                    src="/app-store-badge.png"
                    alt="Download on App Store"
                    className="h-8 md:h-10"
                  />
                </a>
                <a href="#" className="block">
                  <img
                    src="/google-play-badge.png"
                    alt="Get it on Google Play"
                    className="h-8 md:h-10"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Social Media */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t">
          <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-xs md:text-sm text-center md:text-left">
              Hak Cipta © 2022 – 2024 Website Keluarga Sehat. All Rights
              Reserved.
            </p>
            <div className="flex gap-4 md:gap-6">
              {/* Facebook Icon */}
              <a
                href="#"
                className="bg-gray-100 text-gray-600 hover:text-sky-700 border border-gray-300 rounded-full p-2 hover:border-sky-700 transition-colors duration-300"
              >
                <svg
                  className="h-5 w-5 md:h-6 md:w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
                </svg>
              </a>
              {/* Twitter (X) Icon */}
              <a
                href="#"
                className="bg-gray-100 text-gray-600 hover:text-sky-700 border border-gray-300 rounded-full p-2 hover:border-sky-700 transition-colors duration-300"
              >
                <svg
                  className="h-5 w-5 md:h-6 md:w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Instagram Icon */}
              <a
                href="#"
                className="bg-gray-100 text-gray-600 hover:text-sky-700 border border-gray-300 rounded-full p-2 hover:border-sky-700 transition-colors duration-300"
              >
                <svg
                  className="h-5 w-5 md:h-6 md:w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;