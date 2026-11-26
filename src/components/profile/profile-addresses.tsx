"use client";

import { useState } from "react";

import {
  deleteAddress,
} from "@/actions/address.actions";
import { AddressCard } from "@/components/profile/address-card";
import { AddressFormDialog } from "@/components/profile/address-form-dialog";
import { FaIcon } from "@/components/shared/fa-icon";
import { redirectIfUnauthorized } from "@/lib/client-auth";
import { notify } from "@/lib/notify";
import type { Address } from "@/types/user";

type ProfileAddressesProps = {
  initialAddresses: Address[];
};

type ActiveDialog =
  | { mode: "add" }
  | { mode: "edit"; address: Address };

export function ProfileAddresses({ initialAddresses }: ProfileAddressesProps) {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [dialog, setDialog] = useState<ActiveDialog | null>(null);
  const [deletingId, setDeletingId] = useState("");

  async function handleDelete(address: Address) {
    if (!window.confirm("Are you sure you want to delete this address?")) return;

    setDeletingId(address._id);

    try {
      const result = await deleteAddress(address._id);

      if (result.success) {
        setAddresses(result.data);
        return;
      }

      if (redirectIfUnauthorized(result)) return;

      notify.error(result.error);
    } finally {
      setDeletingId("");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">My Addresses</h2>
          <p className="text-gray-500 text-sm mt-1">
            Manage your saved delivery addresses
          </p>
        </div>
        <button
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/25"
          onClick={() => setDialog({ mode: "add" })}
        >
          <FaIcon name="plus" className="text-sm" />Add Address
        </button>
      </div>
      {addresses.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <AddressCard
              key={address._id}
              address={address}
              deleting={deletingId === address._id}
              onEdit={() => setDialog({ mode: "edit", address })}
              onDelete={() => handleDelete(address)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
            <FaIcon name="location-dot" className="text-3xl text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            No Addresses Yet
          </h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">
            Add your first delivery address to make checkout faster and easier.
          </p>
          <button
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/25"
            onClick={() => setDialog({ mode: "add" })}
          >
            <FaIcon name="plus" />Add Your First Address
          </button>
        </div>
      )}
      {dialog ? (
        <AddressFormDialog
          key={dialog.mode === "edit" ? dialog.address._id : "add"}
          mode={dialog.mode}
          address={dialog.mode === "edit" ? dialog.address : undefined}
          onClose={() => setDialog(null)}
          onSuccess={(updated) => {
            setAddresses(updated);
            setDialog(null);
          }}
        />
      ) : null}
    </div>
  );
}
