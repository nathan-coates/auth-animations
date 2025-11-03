/**
 * @typedef DescriptionProps
 * @type {object}
 * @property {string} text
 */

/**
 * @param {*} props
 * @returns {JSX.Element}
 */
const Description = (props) => {
    return (
        <div class="w-full bg-white border-2 border-black rounded-lg p-4 shadow-md mt-4">
            <div class="text-gray-800">{props.text}</div>
        </div>
    );
};

export default Description;
