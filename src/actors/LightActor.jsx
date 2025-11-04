import { Show } from "solid-js";

/**
 * @typedef LightActorProps
 * @type {object}
 * @property {string} title
 * @property {JSX.Element?} svg
 */

/**
 * @param {LightActorProps} props
 * @returns {JSX.Element}
 */

const LightActor = (props) => {
    return (
        <div class="flex flex-col w-fit items-center gap-1">
            <Show when={props.svg}>
                <div class="lightactor">{props.svg}</div>
            </Show>
            <div class="text-lg">
                {props.title}
            </div>
        </div>
    );
};

export default LightActor;
