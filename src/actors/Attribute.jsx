import { Show } from "solid-js";

/**
 * @typedef AttributeProps
 * @type {object}
 * @property {string} text
 * @property {JSX.Element?} svg
 * @property {string?} twWidth
 * @property {string?} twHeight
 * @property {string?} twTextSize
 */

/**
 * @param {AttributeProps} props
 * @returns {JSX.Element}
 */
const Attribute = (props) => {
    const height = props.twHeight ?? "h-14";
    const width = props.twWidth ?? "w-62";
    const textSize = props.twTextSize ?? "text-xl";

    return (
        <div
            class={`flex gap-1 content-center space-x-2 p-2 border-2 border-black rounded-md ${width} ${height} shadow-md bg-white`}
        >
            <Show when={props.svg}>
                <div>
                    {props.svg}
                </div>
            </Show>
            <div class={`flex items-center ${textSize}`}>{props.text}</div>
        </div>
    );
};

export default Attribute;
