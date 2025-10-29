// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  // 1. Onde o NativeWind/Tailwind deve procurar as classes (Seus arquivos .jsx, .js, .ts, etc.)
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    // Adicione outros diretórios onde você usa classes Tailwind aqui
  ],
  theme: {
    extend: {
      // 2. Mapeamento da Fonte Inter
      fontFamily: {
        // Mapeia o nome da fonte carregada no _layout.jsx
        // O Expo/React Native usa o nome do primeiro elemento da array para o peso regular
        'inter-base': ['Inter-Regular', 'sans-serif'],
        
        // 3. Sobrescreve a fonte padrão 'sans' do Tailwind para a Inter
        sans: ['Inter-Regular', 'sans-serif'], 
      },
    },
  },
  plugins: [],
};