import React, { useEffect } from 'react';

function FileSelector({
    selectedFiles, setSelectedFiles,
    allowedExtensions, concurrentFileLimit
}) {

    /* Constants & Variables */
    const _allowedExtensions =
        allowedExtensions
            ? allowedExtensions
            : ['docx', '.pdf'];
    const _concurrentFileLimit =
        concurrentFileLimit
            ? concurrentFileLimit
            : 100;

    /* Functions */
    const fileTypeFilter = (files, allowedExtensions) => {
        return files.filter((file) => {
            return allowedExtensions.some((ext) => {
                return file.name.toLowerCase().endsWith(ext)
            });
        });
    }

    const updateSelectedFiles = (
        originalFiles, appendFiles) => {
        appendFiles =
            _allowedExtensions.length === 0
                ? appendFiles
                : fileTypeFilter(appendFiles, _allowedExtensions);
        if (originalFiles) {
            if (originalFiles.length + appendFiles.length <= _concurrentFileLimit) {
                setSelectedFiles([...originalFiles, ...appendFiles]);
                console.log([...originalFiles, ...appendFiles]);
            } else {
                alert(`Selected Files must be less than ${_concurrentFileLimit}`);
            }
        }
        else {
            if (appendFiles.length <= _concurrentFileLimit) {
                setSelectedFiles([...appendFiles]);
            } else {
                alert(`Selected Files must be less than ${_concurrentFileLimit}`);
            }
        }
    };

    const delImages = (index, setSelectedFiles) => {
        const initialImages = selectedFiles;
        initialImages.splice(index, 1);
        setSelectedFiles([...initialImages]);
    };

    if (!selectedFiles || !setSelectedFiles) {
        throw new Error('\'selectedFiles\' and \'setSelectedFiles\'  must be specified');
    }
    return (
        <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
                File Upload
            </label>
            <div className="mt-2 flex flex-col justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <input
                    type='file' multiple
                    accept='.pdf,.docx,.txt'
                    name='img'
                    onChange={(e) => {
                        updateSelectedFiles(
                            selectedFiles, [...e.target.files]);
                    }} />
            </div>
            {selectedFiles && selectedFiles.map((file, index) => (
                <div key={index} className='rounded-sm border border-gray-300 bg-slate-300 col-span-1 px-2 my-1'>
                    {
                        (file instanceof File)
                            ? <a href={URL.createObjectURL(file)} target="_blank">
                                {file.name}
                            </a>
                            : <a href={file.docUrl} target="_blank">
                                {decodeURIComponent(file.docUrl.split('/')[file.docUrl.split('/').length - 1]).split('?')[0].split('/')[3]}
                            </a>
                    }
                </div>
            ))}
        </div>
    )
};

export default FileSelector;