const features = [
    { name: 'Address', description: '25 Heng Mui Keng Terrace, Institute of Systems Science, Singapore' },
    { name: 'Postal Code', description: '119615' },
    { name: 'Nearby Locations', description: 'NUS, Kent Ridge, UTown' },
    { name: 'Furnishment', description: 'Fully Furnished' },
]

const DetailFeatures = ({ }) => {
    return (
        <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {features.map((feature) => (
                <div key={feature.name} className="border-t border-gray-200 pt-4">
                    <dt className="font-normal text-sm text-gray-500">{feature.name}</dt>
                    <dd className="mt-2 text-base font-medium text-gray-900">{feature.description}</dd>
                </div>
            ))}
        </dl>
    )
}

export default DetailFeatures;