import React from 'react';

/* CSS Impoerts */
import './ImageSelector.css';

/* MUI Imports */
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';

function ImageSelector({
    selectedImages, setSelectedImages,
    allowedExtensions, concurrentImageLimit
}) {

    /* Constants & Variables */
    const _allowedExtensions =
        allowedExtensions
            ? allowedExtensions
            : ['.jpg', '.jpeg', '.png', '.webp', '.bmp'];
    const _concurrentImageLimit =
        concurrentImageLimit
            ? concurrentImageLimit
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
        originalImages, appendImages) => {
        appendImages =
            _allowedExtensions.length === 0
                ? appendImages
                : fileTypeFilter(appendImages, _allowedExtensions);
        if (originalImages) {
            if (originalImages.length + appendImages.length <= _concurrentImageLimit) {
                setSelectedImages([...originalImages, ...appendImages]);
                console.log([...originalImages, ...appendImages]);
            } else {
                alert(`Selected Images must be less than ${_concurrentImageLimit}`);
            }
        }
        else {
            if (appendImages.length <= _concurrentImageLimit) {
                setSelectedImages([...appendImages]);
            } else {
                alert(`Selected Images must be less than ${_concurrentImageLimit}`);
            }
        }
    };

    const delImages = (index, setSelectedImages) => {
        const initialImages = selectedImages;
        initialImages.splice(index, 1);
        setSelectedImages([...initialImages]);
    };

    if (!selectedImages || !setSelectedImages) {
        throw new Error('\'selectedImages\' and \'setSelectedImages\'  must be specified');
    }
    return (
        <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
                Image Upload
            </label>
            <div className="mt-2 flex flex-col justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className='imgup'>
                    <div className='imgup_body border grid h-auto min-h-[240px] max-h-0 md:max-h-[540px] overflow-y-scroll md:overflow-y-hidden border-gray-300 rounded-lg px-10 py-6'>
                        <div className='imgup_img addimg border border-gray-300 rounded-lg col-span-1'>
                            <AddCircleIcon style={{ fontSize: '40px' }} />
                            <input
                                type='file' multiple
                                accept='image/*'
                                name='myImage'
                                onChange={(e) => {
                                    updateSelectedFiles(
                                        selectedImages, [...e.target.files]);
                                }} />
                        </div>
                        {selectedImages && selectedImages.map((img, index) => (
                            <div key={index} className='imgup_img rounded-lg border border-gray-300 bg-slate-300 col-span-1'>
                                {(img instanceof File)
                                    ? <img src={URL.createObjectURL(img)} alt={img.name} />
                                    : <img src={img?.imageUrl} alt={img.id} />}
                                <CancelIcon id='delete'
                                    onClick={() => delImages(index, setSelectedImages)} />
                            </div>
                        ))}
                    </div>
                    <div className='imgup_footer'>
                        <button
                            onClick={() => setSelectedImages([])}
                            className="inline-flex w-full items-center justify-center rounded-md
                                bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500">
                            Clear All
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
};

export default ImageSelector;