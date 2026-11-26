"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { addAddress, updateAddress } from "@/actions/address.actions";
import { FaIcon } from "@/components/shared/fa-icon";
import { redirectIfUnauthorized } from "@/lib/client-auth";
import { notify } from "@/lib/notify";
import { zodResolver } from "@/lib/zod-resolver";
import {
  addressSchema,
  type AddressInput,
} from "@/schemas/address.schema";
import type { Address } from "@/types/user";

type AddressFormDialogProps = {
  mode: "add" | "edit";
  address?: Address;
  onClose: () => void;
  onSuccess: (addresses: Address[]) => void;
};

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all";

export function AddressFormDialog({
  mode,
  address,
  onClose,
  onSuccess,
}: AddressFormDialogProps) {
  const defaults = {
    name: address?.name ?? "",
    details: address?.details ?? "",
    phone: address?.phone ?? "",
    city: address?.city ?? "",
  };
  const [values, setValues] = useState(defaults);
  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<AddressInput>({
    resolver: zodResolver(addressSchema),
    defaultValues: defaults,
  });

  function updateField(field: keyof AddressInput, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setValue(field, value);
  }

  async function onSubmit(submitted: AddressInput) {
    const result =
      mode === "edit" && address
        ? await updateAddress(address._id, submitted)
        : await addAddress(submitted);

    if (result.success) {
      onSuccess(result.data);
      return;
    }

    if (redirectIfUnauthorized(result)) return;

    notify.error(result.error);
  }

  const title = mode === "edit" ? "Edit Address" : "Add New Address";
  const submitLabel = mode === "edit" ? "Update" : "Add Address";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button
            className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center transition-colors"
            onClick={onClose}
          >
            <FaIcon name="xmark" />
          </button>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address Name
            </label>
            <input
              placeholder="e.g. Home, Office"
              className={inputClass}
              required
              type="text"
              value={values.name}
              onChange={(event) => updateField("name", event.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Address
            </label>
            <textarea
              placeholder="Street, building, apartment..."
              rows={3}
              className={`${inputClass} resize-none`}
              required
              value={values.details}
              onChange={(event) => updateField("details", event.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                placeholder="01xxxxxxxxx"
                className={inputClass}
                required
                type="tel"
                value={values.phone}
                onChange={(event) => updateField("phone", event.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                placeholder="Cairo"
                className={inputClass}
                required
                type="text"
                value={values.city}
                onChange={(event) => updateField("city", event.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              className="flex-1 py-3 px-6 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-6 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 shadow-lg shadow-primary-600/25"
              disabled={isSubmitting}
            >
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
