import ClientAppIcon from "@assets/clientappicon.svg?component-solid";

/**
 * @typedef PermissionsProps
 * @type {object}
 * @property {string?} email
 * @property {string?} appName
 * @property {string?} serviceName
 */

/**
 * @param {PermissionsProps} props
 * @returns {JSX.Element}
 */

function Permissions(props) {
    const appName = props.appName || "Client App";
    const serviceName = props.serviceName || "Resource Server";
    const userEmail = props.email || "your.email@example.com";

    return (
        <div class="max-w-md w-full bg-white border border-black rounded-2xl shadow-md overflow-hidden p-6 sm:p-8 space-y-6 transform transition-all">
            {/* App Header */}
            <div class="flex items-center space-x-4">
                {/* Faux App Logo */}
                <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <ClientAppIcon />
                </div>
                <div>
                    <h1 class="text-xl sm:text-2xl font-bold text-gray-900">
                        {appName}
                    </h1>
                    <p class="text-sm text-gray-500">
                        wants to connect to {serviceName}
                    </p>
                </div>
            </div>

            {/* User Account */}
            <div class="bg-gray-50 rounded-lg p-4 flex items-center space-x-3 border border-gray-200">
                {/* Faux User Avatar */}
                <div class="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0">
                </div>
                <span class="text-sm font-medium text-gray-700 truncate">
                    {userEmail}
                </span>
            </div>

            {/* Permissions List */}
            <div class="space-y-4">
                <h2 class="text-sm font-semibold text-gray-800">
                    This will allow {appName} to:
                </h2>
                <ul class="space-y-3">
                    <li class="flex space-x-2.5">
                        <div class="content-center">
                            <div class="w-4 h-4 bg-green-500 rounded-full border border-green-600/50">
                            </div>
                        </div>
                        <div class="text-gray-600 text-sm">
                            <strong>View your basic profile information</strong>
                            <p class="text-xs text-gray-500">
                                Name, email, and profile picture
                            </p>
                        </div>
                    </li>
                    <li class="flex space-x-2.5">
                        <div class="content-center">
                            <div class="w-4 h-4 bg-green-500 rounded-full border border-green-600/50">
                            </div>
                        </div>
                        <div class="text-gray-600 text-sm">
                            <strong>Read your analytics data</strong>
                            <p class="text-xs text-gray-500">
                                Access to your visitor and conversion metrics
                            </p>
                        </div>
                    </li>
                </ul>
            </div>

            {/* Policy Link */}
            <div class="text-xs text-gray-500">
                By clicking Allow, you agree to the {appName}
                <a
                    href="#"
                    class="font-medium text-blue-600 hover:underline ml-1"
                >
                    Terms of Service
                </a>.
            </div>

            {/* Action Buttons */}
            <div class="flex flex-col-reverse sm:flex-row sm:space-x-3 space-y-3 space-y-reverse sm:space-y-0 pt-2">
                <button
                    type="button"
                    class="w-full sm:w-1/2 flex justify-center items-center px-4 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white"
                >
                    Deny
                </button>
                <button
                    type="button"
                    class="w-full sm:w-1/2 flex justify-center items-center px-4 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600"
                >
                    Allow
                </button>
            </div>
        </div>
    );
}

export default Permissions;
