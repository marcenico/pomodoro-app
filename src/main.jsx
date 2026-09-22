import React from 'react';
import ReactDOM from 'react-dom/client';
import { PomodoroApp } from './PomodoroApp.jsx';
import './styles.css';

// Aplicar el tema guardado antes del primer render, para evitar un flash
// cuando la preferencia guardada no coincide con la del sistema operativo.
// useColorScheme toma el control una vez que la app monta.
try {
  const storedTheme = JSON.parse(localStorage.getItem('colorScheme'));
  if (storedTheme === 'light' || storedTheme === 'dark') {
    document.documentElement.dataset.theme = storedTheme;
  }
} catch {
  // localStorage no disponible o valor inválido: usar la preferencia del sistema (CSS)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PomodoroApp />
  </React.StrictMode>
);
