import { useCallback, useEffect, useState } from 'react';
import { notificationMessages, consoleMessages } from '@data/notificationMessages';

/**
 * Hook personalizado para manejar notificaciones del navegador
 * @returns {Object} Objeto con funciones para manejar notificaciones
 */
export const useNotifications = () => {
  const [permission, setPermission] = useState(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) return Notification.permission;
    return 'denied';
  });

  const [isSupported, setIsSupported] = useState(() => typeof window !== 'undefined' && 'Notification' in window);

  // Check support and permissions when component mounts
  useEffect(() => {
    if (!isSupported) {
      console.warn(consoleMessages.browserNotSupported);
      return;
    }
  }, [isSupported]);

  /**
   * Requests permission to show notifications
   */
  const requestPermission = useCallback(async () => {
    if (!isSupported) return false;

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === 'granted';
    } catch (error) {
      console.error(consoleMessages.requestPermissionError, error);
      return false;
    }
  }, [isSupported]);

  /**
   * Shows a notification with the specified message
   * @param {string} title - Notification title
   * @param {Object} options - Additional options for the notification
   */
  const showNotification = useCallback(
    (title, options = {}) => {
      if (!isSupported || permission !== 'granted') return;

      try {
        const notification = new Notification(title, {
          icon: '/vite.svg',
          badge: '/vite.svg',
          requireInteraction: true,
          ...options
        });

        // Close notification after 5 seconds
        setTimeout(() => notification.close(), 5000);

        return notification;
      } catch (error) {
        console.error(consoleMessages.showNotificationError, error);
      }
    },
    [isSupported, permission]
  );

  /**
   * Shows a specific notification for completing a Pomodoro session
   * @param {string} cycleType - Type of completed cycle ('pomodoro', 'shortBreak', 'longBreak')
   * @param {number} completedPomodoros - Number of completed pomodoros
   */
  const showSessionCompleteNotification = useCallback(
    async (cycleType, completedPomodoros = 0) => {
      // Check and request permissions if necessary
      if (permission === 'default') {
        const granted = await requestPermission();
        if (!granted) {
          console.warn(consoleMessages.permissionDenied);
          return;
        }
      }

      if (permission === 'denied') {
        console.warn(consoleMessages.permissionDenied);
        return;
      }

      const message = notificationMessages[cycleType] || notificationMessages.pomodoro;
      const bodyText = typeof message.body === 'function' ? message.body(completedPomodoros) : message.body;

      showNotification(message.title, {
        body: bodyText,
        tag: `pomodoro-${cycleType}`,
        renotify: true
      });
    },
    [showNotification, permission, requestPermission]
  );

  return {
    permission,
    isSupported,
    requestPermission,
    showNotification,
    showSessionCompleteNotification
  };
};
