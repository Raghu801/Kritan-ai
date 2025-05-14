import { FaGithub, FaRocket } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-6 text-center shadow-inner border-t border-gray-200 w-full">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-orange-500 tracking-wide">KRITAN AI</h1>
        <p className="text-sm text-gray-600 mt-2">
          Kritan AI is powered by <span className="text-sky-600 font-semibold">Gemini AI</span> for natural and intelligent conversations.
        </p>
        <div className="flex justify-center items-center space-x-4 mt-4">
          <a
            href="#"
            className="text-gray-700 hover:text-orange-500 transition duration-300 flex items-center"
          >
            <FaRocket className="mr-2" /> Launch App
          </a>
        </div>
        <p className="text-xs text-gray-400 mt-4">&copy; 2025 Kritan AI.</p>
      </div>
    </footer>
  );
};

export default Footer;
