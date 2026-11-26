"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      closeButton
      duration={4400}
      offset={16}
      mobileOffset={0}
      icons={{
        success: (
          <CircleCheckIcon className="size-[22px] text-[var(--toast-success)]" />
        ),
        info: (
          <InfoIcon className="size-[22px] text-[var(--color-muted-foreground)]" />
        ),
        warning: (
          <TriangleAlertIcon className="size-[22px] text-[var(--toast-success)]" />
        ),
        error: (
          <OctagonXIcon className="size-[22px] text-[var(--toast-error)]" />
        ),
        loading: (
          <Loader2Icon className="size-[22px] animate-spin text-[var(--color-primary-600)]" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--color-background)",
          "--normal-text": "var(--toast-text)",
          "--normal-border": "transparent",
          "--normal-bg-hover": "var(--color-muted)",
          "--success-bg": "var(--color-background)",
          "--success-text": "var(--toast-text)",
          "--success-border": "transparent",
          "--error-bg": "var(--color-background)",
          "--error-text": "var(--toast-text)",
          "--error-border": "transparent",
          "--info-bg": "var(--color-background)",
          "--info-text": "var(--toast-text)",
          "--info-border": "transparent",
          "--warning-bg": "var(--color-background)",
          "--warning-text": "var(--toast-text)",
          "--warning-border": "transparent",
          "--border-radius": "6px",
          "--width": "320px",
          "--z-index": "9999",
        } as React.CSSProperties
      }
      toastOptions={{
        style: {
          padding: "14px",
          minHeight: "64px",
          border: "none",
        },
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
