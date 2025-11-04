import { Match, Switch } from "solid-js";
import ArrowIcon from "@assets/actionarrow.svg?component-solid";
import LineIcon from "@assets/actionline.svg?component-solid";

/**
 * @typedef ActionProps
 * @type {object}
 * @property {string} text
 * @property {number} direction
 */

/**
 * @param {ActionProps} props
 * @returns {JSX.Element}
 */
const Action = (props) => {
    const actionText = (
        <div class="max-w-40 italic text-lg text-center">
            {props.text}
        </div>
    );

    return (
        <Switch>
            <Match when={props.direction == 0}>
                <div class="flex items-center mb-6">
                    <LineIcon />
                    {actionText()}
                    <ArrowIcon />
                </div>
            </Match>
            <Match when={props.direction == 1}>
                <div class="flex items-center">
                    <ArrowIcon class="rotate-180" />
                    {actionText()}
                    <LineIcon />
                </div>
            </Match>
        </Switch>
    );
};

export default Action;
