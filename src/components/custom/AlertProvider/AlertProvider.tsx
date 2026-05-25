"use client";

import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { Box } from "@/components/primitives";
import { Alert } from "../Alert";
import type { AlertSeverity } from "../Alert";
import styles from "./AlertProvider.module.css";

/* ----- Types ----- */
interface AlertItem {
  id: string;
  severity: AlertSeverity;
  title?: string;
  message: string;
  persistent: boolean;
  exiting?: boolean;
}

interface AlertContextValue {
  show: (options: {
    severity?: AlertSeverity;
    title?: string;
    message: string;
    persistent?: boolean;
    duration?: number;
  }) => void;
}

/* ----- Context ----- */
const AlertContext = createContext<AlertContextValue | null>(null);

export function useAlert() {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error("useAlert must be used within AlertProvider");
  return ctx;
}

/* ----- Provider ----- */
export type AlertPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export interface AlertProviderProps {
  position?: AlertPosition;
  children: React.ReactNode;
}

const positionClasses: Record<AlertPosition, string> = {
  "top-left": styles.topLeft,
  "top-right": styles.topRight,
  "bottom-left": styles.bottomLeft,
  "bottom-right": styles.bottomRight,
};

export function AlertProvider({ position = "bottom-right", children }: AlertProviderProps) {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const idCounter = useRef(0);

  const dismiss = useCallback((id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, exiting: true } : a))
    );
    setTimeout(() => {
      setAlerts((prev) => prev.filter((a) => a.id !== id));
    }, 150);
  }, []);

  const show = useCallback(
    ({
      severity = "default",
      title,
      message,
      persistent = false,
      duration = 4000,
    }: {
      severity?: AlertSeverity;
      title?: string;
      message: string;
      persistent?: boolean;
      duration?: number;
    }) => {
      const id = `alert-${++idCounter.current}`;
      const item: AlertItem = { id, severity, title, message, persistent };
      setAlerts((prev) => [...prev, item]);

      if (!persistent) {
        setTimeout(() => dismiss(id), duration);
      }
    },
    [dismiss]
  );

  return (
    <AlertContext.Provider value={{ show }}>
      {children}
      <Box className={`${styles.container} ${positionClasses[position]}`}>
        {alerts.map((alert) => (
          <Box
            key={alert.id}
            className={`${styles.item} ${alert.exiting ? styles.itemExit : ""}`}
          >
            <Alert
              severity={alert.severity}
              title={alert.title}
              dismissible={alert.persistent}
              onDismiss={() => dismiss(alert.id)}
            >
              {alert.message}
            </Alert>
          </Box>
        ))}
      </Box>
    </AlertContext.Provider>
  );
}

AlertProvider.displayName = "AlertProvider";
