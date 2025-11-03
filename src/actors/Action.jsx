import ArrowIcon from "@assets/actionarrow.svg?component-solid";

/**
 * @typedef ActionProps
 * @type {object}
 * @property {string} text
 * @property {bool?} reverse
 */

/**
 * @param {ActionProps} props
 * @returns {JSX.Element}
 */
const Action = (props) => {
    const normal = (
        <div class="flex items-center">
            <div>{props.text}</div>
            <ArrowIcon />
        </div>
    );

    const reversed = (
        <div class="flex items-center">
            <ArrowIcon class="rotate-90" />
            <div>{props.text}</div>
        </div>
    );

    return props.reverse ? reversed : normal;
};

export default Action;
