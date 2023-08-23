const FormText = ({ title, content }) => {
    return (
        <div>
            <p className="block text-sm font-semibold leading-6 text-gray-900">
                {title}
            </p>
            <span className="mt-2 py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                {content}
            </span>
        </div>
    );
}

export default FormText;