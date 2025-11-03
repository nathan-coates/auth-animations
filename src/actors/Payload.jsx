/**
 * @typedef PayloadProps
 * @type {object}
 * @property {string} text
 */

/**
 * @param {PayloadProps} props
 * @returns {JSX.Element}
 */
const Payload = (props) => {
    return (
        <pre class="overflow-auto bg-gray-100 text-black p-4 border rounded-lg shadow-lg w-115">
        <code innerHTML={props.text} class="p-0">
        </code>
        </pre>
    );
};

export default Payload;
