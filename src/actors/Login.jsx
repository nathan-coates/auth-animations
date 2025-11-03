import ClientAppIcon from "@assets/clientappicon.svg?component-solid";

/**
 * @typedef LoginProps
 * @type {object}
 * @property {string?} email
 * @property {string?} appName
 */

/**
 * @param {LoginProps} props
 * @returns {JSX.Element}
 */

function Login(props) {
    const appName = props.appName || "Client App";
    const userEmail = props.email || "your.email@example.com";

    return (
        <div class="max-w-md w-full bg-white border border-black rounded-2xl shadow-md overflow-hidden p-6 sm:p-8 space-y-6 transform transition-all">
            {/* --- This is the static login view --- */}
            <div>
                {/* App Header */}
                <div class="flex flex-col items-center space-y-4">
                    {/* Faux App Logo */}
                    <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                        <ClientAppIcon />
                    </div>
                    <div>
                        <h1 class="text-xl sm:text-2xl text-center font-bold text-gray-900">
                            Sign in to {appName}
                        </h1>
                        <p class="text-sm text-gray-500 text-center">
                            to continue to {appName}
                        </p>
                    </div>
                </div>

                {/* Form Fields */}
                <div class="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label
                            for="email"
                            class="block text-sm font-medium text-gray-700"
                        >
                            Email address
                        </label>
                        <div class="mt-1">
                            <div class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-500 cursor-not-allowed">
                                {userEmail}
                            </div>
                        </div>
                    </div>

                    {/* Password Field */}
                    <div>
                        <div class="flex justify-between items-baseline">
                            <label
                                for="password"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <a
                                href="#"
                                class="text-sm text-blue-600 hover:text-blue-500"
                            >
                                Forgot password?
                            </a>
                        </div>
                        <div class="mt-1">
                            <div class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-500 cursor-not-allowed">
                                ••••••••••
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div class="pt-2">
                    <button
                        type="button"
                        class="w-full flex justify-center items-center px-4 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 transition-all"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
