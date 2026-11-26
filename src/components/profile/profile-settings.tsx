"use client";

import { AccountInformation } from "@/components/profile/account-information";
import { ChangePasswordForm } from "@/components/profile/change-password-form";
import { ProfileInformationForm } from "@/components/profile/profile-information-form";
import { FaIcon } from "@/components/shared/fa-icon";
import type { User } from "@/types/user";

export function ProfileSettings({ user }: { user: User }) {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
        <p className="text-gray-500 text-sm mt-1">Update your profile information and change your password</p>
      </div>
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center">
              <FaIcon name="user" className="text-2xl text-primary-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Profile Information</h3>
              <p className="text-sm text-gray-500">Update your personal details</p>
            </div>
          </div>
          <ProfileInformationForm user={user} />
        </div>
        <AccountInformation user={user} />
      </div>
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center">
              <FaIcon name="lock" className="text-2xl text-amber-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Change Password</h3>
              <p className="text-sm text-gray-500">Update your account password</p>
            </div>
          </div>
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}
