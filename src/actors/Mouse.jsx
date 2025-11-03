import ClickIcon from "@assets/click.svg";

/**
 * @typedef MouseProps
 * @type {object}
 * @property {number} psX
 * @property {number} psY
 */

/**
 * @param {MouseProps} props
 * @returns {JSX.Element}
 */
const Mouse = (props) => {
    return (
        <div
            style={`position: absolute; left: ${props.psX}px; top: ${props.psY}px; z-index: 1000;`}
        >
            <ClickIcon class="animate-click-once" />
        </div>
    );
};

export default Mouse;
