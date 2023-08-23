const Heading = ({ title, description }) => {
    return (
        <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {title}
            </h2>
            {description && <p className="mt-4 text-gray-500">{description}</p>}
        </div>
    )
}

export default Heading;
