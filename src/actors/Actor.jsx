import { Show } from "solid-js";

/**
 * @typedef ActorProps
 * @type {object}
 * @property {string} title
 * @property {JSX.Element?} svg
 * @property {JSX.Element} children
 * @property {bool?} payload
 */

/**
 * @param {ActorProps} props
 * @returns {JSX.Element}
 */
const Actor = (props) => {
    const payload = props.payload ?? false;
    const width = payload ? "w-fit" : "w-80";

    return (
        <div class={`relative ${width} h-80 ml-12 mt-8`}>
            <Show when={props.svg}>
                <div class="absolute top-2/3 -translate-y-1/2 left-0 -translate-x-1/2 z-10">
                    <div class="w-20 h-20 bg-white border-2 border-black rounded-lg flex items-center justify-center shadow-md">
                        {props.svg}
                    </div>
                </div>
            </Show>
            <div class="relative w-full h-full bg-white border-2 border-black rounded-lg shadow-lg">
                <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white px-2">
                    <div class="text-lg text-center text-gray-800">
                        {props.title}
                    </div>
                </div>
                <div
                    class={`w-full h-full flex ${
                        payload ? "items-center" : "items-end flex-col gap-2"
                    } justify-end p-4`}
                >
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default Actor;
