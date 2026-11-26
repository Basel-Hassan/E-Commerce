import type { User } from "@/types/user";

export function AccountInformation({ user }: { user: User }) {
  return (
    <div className="p-6 sm:p-8 bg-gray-50">
      <h3 className="font-bold text-gray-900 mb-4">Account Information</h3>
      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">User ID</span>
          <span className="font-mono text-gray-700">{user._id}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Role</span>
          <span className="px-3 py-1 rounded-lg bg-primary-100 text-primary-700 font-medium capitalize">
            {user.role}
          </span>
        </div>
      </div>
    </div>
  );
}
