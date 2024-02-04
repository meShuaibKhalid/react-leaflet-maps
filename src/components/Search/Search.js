import { useEffect, useState } from 'react';
import './Search.css';


export default function SearchComponent({ options, value, isLoading, onSubmit }) {
    const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState({
        label: '',
        value: ''
    });

    useEffect(() => {
        if (options?.length) {
            setIsSearchBoxOpen(true);
        }
    }, [options]);

    function onSearch() {
        setIsSearchBoxOpen(true);
        onSubmit(selectedOption);
    }

    function selectionChange(option) {
        setIsSearchBoxOpen(false);
        value(option);
    }

    function closeOptions() {
        setIsSearchBoxOpen(false);
        setSelectedOption({ label: '', value: '' });
    }

    return (
        <div className='search-wrapper'>
            <input type='search' placeholder='Search areas' value={selectedOption?.label} onChange={e => setSelectedOption({ label: e.target.value })} />
            <button type='button' onClick={onSearch}><i className='fa fa-search'></i></button>
            {isSearchBoxOpen ? <div className='options'>
                <ul>
                    {
                        isLoading ? <li>Loading...</li> : options?.length ? options?.map((option, index) => (
                            <li key={index} onClick={() => selectionChange(option)}>{option.label}</li>
                        )) : <li onClick={closeOptions}>No result found</li>
                    }
                </ul>
            </div>
                : ''}
        </div>
    )
}