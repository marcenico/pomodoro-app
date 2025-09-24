import { useEffect, useRef } from 'react';

/**
 * Hook personalizado para actualizar el favicon con el progreso del temporizador
 * @param {Object} time - Objeto con minutos y segundos del temporizador
 * @param {string} currentCycle - Ciclo actual (pomodoro, shortBreak, longBreak)
 * @param {boolean} isRunning - Si el temporizador está ejecutándose
 * @param {boolean} isPaused - Si el temporizador está pausado
 * @param {Object} originalConfig - Configuración original del ciclo actual
 */
export const useFaviconProgress = (time, currentCycle, isRunning, isPaused, originalConfig) => {
  const canvasRef = useRef(null);
  const faviconRef = useRef(null);

  /**
   * Crea un canvas para generar el favicon dinámico
   */
  const createCanvas = () => {
    if (!canvasRef.current) {
      canvasRef.current = document.createElement('canvas');
      canvasRef.current.width = 32;
      canvasRef.current.height = 32;
    }
    return canvasRef.current;
  };

  /**
   * Calcula el progreso del temporizador como porcentaje
   * @param {Object} currentTime - Tiempo actual
   * @param {Object} originalTime - Tiempo original del ciclo
   * @returns {number} Progreso como porcentaje (0-100)
   */
  const calculateProgress = (currentTime, originalTime) => {
    const currentTotalSeconds = currentTime.minutes * 60 + currentTime.seconds;
    const originalTotalSeconds = originalTime.minutes * 60 + originalTime.seconds;

    if (originalTotalSeconds === 0) return 0;

    const progress = ((originalTotalSeconds - currentTotalSeconds) / originalTotalSeconds) * 100;
    return Math.max(0, Math.min(100, progress));
  };

  /**
   * Obtiene el color del favicon usando las variables CSS del tema
   * @returns {string} Color hexadecimal desde las variables CSS
   */
  const getCycleColor = (colorValue = '500') => {
    // Obtener el valor de --color-500 desde las variables CSS del tema
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    return computedStyle.getPropertyValue(`--color-${colorValue}`).trim() || '#4faeff'; // Fallback a blue-500
  };

  /**
   * Genera el favicon con progreso visual
   * @param {number} progress - Progreso como porcentaje
   * @param {string} color - Color del ciclo
   * @param {boolean} isPaused - Si está pausado
   */
  const generateFavicon = (progress, color, isPaused) => {
    const canvas = createCanvas();
    const ctx = canvas.getContext('2d');

    // Limpiar canvas
    ctx.clearRect(0, 0, 32, 32);

    // Configurar estilo de línea
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';

    // Dibujar círculo de fondo (gris claro)
    ctx.strokeStyle = getCycleColor('50');
    ctx.beginPath();
    ctx.arc(16, 16, 12, 0, 2 * Math.PI);
    ctx.stroke();

    // Dibujar progreso
    if (progress > 0) {
      ctx.strokeStyle = color;
      const startAngle = -Math.PI / 2; // Comenzar desde arriba
      const endAngle = startAngle + (progress / 100) * 2 * Math.PI;

      ctx.beginPath();
      ctx.arc(16, 16, 12, startAngle, endAngle);
      ctx.stroke();
    }

    // Si está pausado, dibujar dos pequeños indicadores (simbolo de pausa)
    if (isPaused) {
      ctx.clearRect(11, 11, 14, 10);
      ctx.fillStyle = color;
      ctx.fillRect(11, 11, 4, 10);
      ctx.fillRect(17, 11, 4, 10);
    }

    // Convertir canvas a data URL y actualizar favicon
    const dataURL = canvas.toDataURL('image/png');
    updateFavicon(dataURL);
  };

  /**
   * Actualiza el favicon en el documento
   * @param {string} dataURL - Data URL del nuevo favicon
   */
  const updateFavicon = (dataURL) => {
    // Buscar el favicon existente
    let favicon = document.querySelector('link[rel="icon"]') || document.querySelector('link[rel="shortcut icon"]');

    if (!favicon) {
      // Crear nuevo elemento favicon si no existe
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      document.head.appendChild(favicon);
    }

    // Actualizar href con el nuevo favicon
    favicon.href = dataURL;
    faviconRef.current = favicon;
  };

  /**
   * Restaura el favicon original
   */
  const restoreOriginalFavicon = () => {
    const favicon = document.querySelector('link[rel="icon"]') || document.querySelector('link[rel="shortcut icon"]');
    if (favicon) favicon.href = '/vite.svg'; // Restaurar al favicon original (vite.svg)
  };

  // Efecto principal para actualizar el favicon
  useEffect(() => {
    if (!time || !originalConfig) return;

    const progress = calculateProgress(time, originalConfig);
    const color = getCycleColor();

    // Solo actualizar si el temporizador está ejecutándose
    if (isRunning) {
      generateFavicon(progress, color, isPaused);
    } else {
      // Si no está ejecutándose, restaurar favicon original
      restoreOriginalFavicon();
    }
  }, [
    time?.minutes,
    time?.seconds,
    currentCycle,
    isRunning,
    isPaused,
    originalConfig?.minutes,
    originalConfig?.seconds
  ]);

  // Limpiar al desmontar el componente
  useEffect(() => () => restoreOriginalFavicon(), []);

  return { generateFavicon, restoreOriginalFavicon };
};
