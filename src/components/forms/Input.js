const { default: tw } = require("twin.macro");

const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const Text = tw.div`text-red-500 text-sm`;

const ValidationInput = ({ ...props }) => {
    return (
        <>
            <Input {...props} />
            {props.error && <Text>{props.error}</Text>}
        </>
    );
}

export default ValidationInput;