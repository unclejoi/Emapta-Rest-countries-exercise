import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import './Home.css';
import Loading from '../../components/loading';
import ViewCountryInformation from '../CountryInformation/ViewCountryInformation';
import SearchIcon from '../../components/SearchIcon';

export type IDataType = {
    name: { common: string, official: string };
    flags: { png: string };
    coatOfArms: { png: string };
    currencies: any,
    car: { side: string}
}


const HomePage = () => {
    const wrapperRef = React.useRef<HTMLDivElement | null>(null);
    // States
    const [list, setList] = React.useState([]);
    const [searchTerm, setSeachTerm] = React.useState('');
    const [selected, setSelected] = React.useState<IDataType>();
    const [isSearching, setIsSearching] = React.useState(false);

    // click away listener
    React.useEffect(() => {
        document.addEventListener('mousedown', onClickOutside);
        return () => {
             // Unbind the event listener on clean up
            document.removeEventListener('mousedown', onClickOutside);
        }

    }, [wrapperRef])

    const onClickOutside = (e: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target as any)) {
            setIsSearching(false)
        }
    }
    // Query
    const { data , isLoading } = useQuery({
        queryKey: ['countryRepo'],
        queryFn: async () => {
            const response = await fetch(
                `https://restcountries.com/v3.1/all`
            );


            const responseData = await response.json();
            setList(responseData);
            return responseData;
        }
    });

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        const filtered = data.filter((item: IDataType) => item.name.common.toLowerCase().includes(searchTerm.toLowerCase()));
        setSeachTerm(searchTerm);
        setList(filtered);
    }

    const onSelect = (item: IDataType) => {
        setSeachTerm(item.name.common);
        setSelected(item);
        setIsSearching(false);
    }

    return (
        <>
            <div className='autocompleteWrapper'>
                <div ref={wrapperRef} className='autocompleteRef'>
                    <div className='inputWrapper'>
                        <div className='iconWrapper'> 
                            <SearchIcon />
                        </div>
                        <input type="text" placeholder='Search Country name to see detailed information' onChange={onSearch} value={searchTerm} onFocus={() => setIsSearching(true)}/>
                        {
                            isLoading ? (
                                <div className='loadingWrapper'>
                                    <Loading />
                                </div>
                            ) : null
                        }
                    </div>
                    {
                        searchTerm.length > 0 && isSearching ? (
                            <ul style={listStyle(list.length)}>
                                {
                                    list.map((item: IDataType, index: number) => (
                                        <li key={index} onClick={() => onSelect(item)}>
                                            <div className='flagContainer'><img src={item.flags.png} /></div>
                                            <div className='countryName'>{item.name.common}</div>
                                            <div className='coatsOfArmsWrapper'><img src={item.coatOfArms.png} /></div>
                                        </li>
                                    ))
                                }
                            </ul>
                        ) : null
                    }
                </div>
            </div>
            <div className='countryInfoCardWrapper'>
                { selected && <ViewCountryInformation data={selected} /> }
            </div>
        </>
    )
}

export default HomePage;

const listStyle = (itemLength: number): React.CSSProperties => {
    return {
        height: itemLength > 10 ? '500px' : 'auto'
    }
}