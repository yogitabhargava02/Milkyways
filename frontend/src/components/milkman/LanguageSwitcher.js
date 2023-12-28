// // components/LanguageSwitcher.js
// import React from 'react';
// import { useLanguage } from '../contexts/LanguageContext';

// const LanguageSwitcher = () => {
//   const { language, setLanguage } = useLanguage();

//   const handleLanguageChange = () => {
//     setLanguage(language === 'en' ? 'hi' : 'en');
//   };

//   return (
//     <div className="mb-4">
//       <button
//         onClick={handleLanguageChange}
//         className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition duration-300"
//       >
//         {language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
//       </button>
//     </div>
//   );
// };

// export default LanguageSwitcher;
