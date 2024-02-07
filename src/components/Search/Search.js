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
        document.addEventListener('click', (e) => {
            if (isSearchBoxOpen) {
                if (!e.target.closest('.search-wrapper')) {
                    setIsSearchBoxOpen(false);
                }
            }
        })
    }, [options, isSearchBoxOpen]);

    function onSearch(e) {
        let searchOptions = {};
        if (e.target.value != undefined) {
            searchOptions = { label: e.target.value, value: e.target.value };
            setSelectedOption(searchOptions);
        } 
        if (!e.target.value.length) {
            setIsSearchBoxOpen(false);
            return;
        }
        setIsSearchBoxOpen(true);
        onSubmit(searchOptions);
    }

    function selectionChange(option) {
        setIsSearchBoxOpen(false);
        setSelectedOption(option);
        value(option);
    }

    function closeOptions() {
        setIsSearchBoxOpen(false);
        setSelectedOption({ label: '', value: '' });
    }

    return (
        <div className='search-wrapper'>
            <input type='search' placeholder='Search areas' value={selectedOption?.label} onInput={onSearch} />
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