import React from 'react';

const FormSelectOption = ({ options, selected, setSelected, name }) => {
    if (!options) {
        throw new Error('Select Options must be specified');
    }
    return (
        <div className="py-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
                {name}
            </label>
            <div className="mt-2">
                <select
                    value={selected} onChange={setSelected}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:max-w-xs sm:text-sm sm:leading-6">
                    <option value=''>
                        {Object.keys(options).includes('default') ? options['default'] : 'Choose an Option'}
                    </option>
                    {
                        Object.keys(options).map((key) => {
                            if (key !== 'default') {
                                return (
                                    <option key={options[key]} value={options[key]}>
                                        {key}
                                    </option>
                                );
                            }
                        })
                    }
                </select >
            </div>
        </div>
    );
};

export default FormSelectOption;