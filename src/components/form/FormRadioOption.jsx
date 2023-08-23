import React from 'react';

const FormRadio = ({ name, options, selected, setSelected }) => {
    if (!name) {
        throw new Error('Radio Fieldset Name must be specified');
    }
    if (!options) {
        throw new Error('Radio Fieldset Options must be specified');
    }
    return (
        <fieldset>
            <legend className="text-sm font-semibold leading-6 text-gray-900">
                {name}
            </legend>
            <div className="mt-2 flex flex-wrap gap-6">
                {Object.keys(options).map((key, index) => (
                    <div className="flex items-center gap-x-3" key={index}>
                        <input
                            type='radio'
                            name={name}
                            value={options[key]}
                            checked={selected === options[key]}
                            onChange={setSelected}
                            className="h-4 w-4 border-gray-300 txt-primary focus:ring-primary"
                        />
                        <label
                            key={key}
                            className="block text-sm font-medium leading-6 text-gray-900">
                            {key}
                        </label>
                    </div>

                ))}
            </div>

        </fieldset>
    );
}

export default FormRadio;