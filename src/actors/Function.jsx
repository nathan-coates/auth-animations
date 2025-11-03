import FunctionIcon from "@assets/function.svg?component-solid";

/**
 * @typedef FunctionProps
 * @type {object}
 * @property {string?} input
 * @property {string?} output
 * @property {string?} twWidth
 * @property {string?} twHeight
 */

/**
 * @param {FunctionProps} props
 * @returns {JSX.Element}
 */
const Function = (props) => {
    const height = props.twHeight ?? "h-56";
    const width = props.twWidth ?? "w-62";

    return (
        <div
            class={`flex flex-col justify-between items-center space-x-2 p-2 border-2 border-black rounded-md ${width} ${height} shadow-md bg-white py-8`}
        >
            <Show when={props.input}>
                <div class="font-bold text-xl text-center">
                    {props.input}
                </div>
            </Show>
            <div>
                <FunctionIcon class="animate-pulse" />
            </div>
            <Show when={props.output}>
                <div id="output" class="font-bold text-xl text-center">
                    {props.output}
                </div>
            </Show>
        </div>
    );
};

export default Function;
