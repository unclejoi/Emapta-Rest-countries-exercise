import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import Loading from '../components/loading';

export type IDataType = {
    name: { common: string }
    flags: { png: string }
}


const HomePage = () => {
    // Hooks
    const navigate = useNavigate();

    // States
    const [data, setData] = React.useState([]);
    const [stableData, setStableData] = React.useState([]);
    const [searchTerm, setSeachTerm] = React.useState('');

    // Query
    const { isLoading } = useQuery({
        queryKey: ['countryRepo'],
        queryFn: async () => {
            const response = await fetch(
                `https://restcountries.com/v3.1/all`
            );

            const responseData = await response.json();

            setData(responseData);
            setStableData(responseData);
            return responseData;
        }
    });

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value.toLowerCase();

        const filtered = stableData.filter((item: IDataType) => item.name.common.toLowerCase().includes(searchTerm));
        setSeachTerm(searchTerm);
        setData(filtered);
    }

    const onSelect = (item: IDataType) => {
        navigate(`/ViewCountry/${item.name.common}`)
    }

    return (
        <>
            <p>Home Page</p>
            <div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input className='input' style={inputStyle} type="text" placeholder='Search Country name to see information....' onChange={onSearch} value={searchTerm} />
                    {
                        isLoading ? (
                            <div style={{ position: 'absolute', right: 30 }}>
                                <Loading />
                            </div>
                        ) : null
                    }
                </div>

                {
                    searchTerm.length > 0 ? (
                        <ul style={listStyle(data.length)}>
                            {
                                data.map((item: IDataType, index: number) => (
                                    <li key={index} style={{
                                        display: 'flex',
                                        height: '30px',
                                        alignItems: 'center',
                                        width: 'auto',
                                        padding: '5px',
                                        color: 'black',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        borderBottom: '1px solid rgba(50, 50, 93, 0.25)'
                                    }}
                                        onClick={() => onSelect(item)}
                                    >
                                        <div style={{ height: '25px', width: '60px' }}><img style={{ height: '25px' }} src={item.flags.png} /></div>
                                        <div>{item.name.common}</div>
                                    </li>
                                ))
                            }
                        </ul>
                    ) : null
                }
            </div>
        </>
    )
}

export default HomePage;

const inputStyle: React.CSSProperties = {
    height: '40px',
    width: '100%',
    fontSize: '16px',
    outline: 0,
    boxSizing: 'border-box',
    padding: '5px 10px 5px 10px'
}

const listStyle = (itemLength: number): React.CSSProperties => {
    return {
        listStyle: 'none',
        padding: '0px',
        width: '100%',
        margin: 0,
        overflow: 'auto',
        height: itemLength > 10 ? '500px' : 'auto',
        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'
    }
}