"use client";

import { toast } from "sonner";

export const notify = {
  success(message: string) {
    return toast.success(message, { duration: 4400 });
  },
  error(message: string) {
    return toast.error(message, { duration: 4400 });
  },
};
