import BrowserLockIcon from "@assets/brwslock.svg?component-solid";

/**
 * @typedef BrowserProps
 * @type {object}
 * @property {string?} url
 * @property {JSX.Element} children
 * @property {string?} class
 */

/**
 * @param {BrowserProps} props
 * @returns {JSX.Element}
 */

const Browser = (props) => {
    const url = props.url || "clientapp.com";

    return (
        // Main window frame
        <div
            class={`
        bg-gray-100 rounded-xl shadow-md overflow-hidden border-2 border-black
        ${props.class || "w-full max-w-3xl"}
      `}
        >
            {/* ===== Toolbar ===== */}
            <header class="h-11 flex items-center px-4 space-x-2 border-b border-gray-200">
                {/* Traffic Lights */}
                <div class="flex space-x-1.5">
                    <div class="w-3 h-3 bg-red-500 rounded-full border border-red-600/50">
                    </div>
                    <div class="w-3 h-3 bg-yellow-500 rounded-full border border-yellow-600/50">
                    </div>
                    <div class="w-3 h-3 bg-green-500 rounded-full border border-green-600/50">
                    </div>
                </div>

                {/* Address Bar */}
                <div class="flex-1 flex justify-center px-4">
                    <div class="bg-gray-200/75 rounded-md h-7 w-full max-w-sm flex items-center justify-center px-3 shadow-inner ring-1 ring-gray-900/10">
                        {/* Lock Icon */}
                        <BrowserLockIcon />
                        {/* URL Text */}
                        <span class="text-sm text-gray-700 truncate">
                            {url}
                        </span>
                    </div>
                </div>

                {/* You could add a <div> here for right-side icons (e.g., Share) */}
                <div class="w-8"></div>{" "}
                {/* Placeholder to balance the lights */}
            </header>

            {/* ===== Content Area ===== */}
            <main class="bg-white flex justify-center p-6 min-h-[24rem]">
                {props.children}
            </main>
        </div>
    );
};

export default Browser;
