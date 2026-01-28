'use client';

export default function ChangePasswordPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Change Password</h1>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <form className="space-y-6 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>
          <div className="pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled
              className="px-6 py-2 bg-gray-300 text-gray-500 rounded-lg font-medium cursor-not-allowed"
              title="Demo mode – disabled"
            >
              Change Password (Demo)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
