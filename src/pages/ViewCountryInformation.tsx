import { useNavigate, useParams } from 'react-router';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { IDataType } from './Home';
import React from 'react';
import Loading from '../components/loading';

const ViewCountryInformation = (props: { client: QueryClient}) => {
    // Hooks
    const navigate = useNavigate();
    const parameters = useParams();

    // Query
    const { data, isLoading } = useQuery({
        queryKey: ['countryData'],
        queryFn: async () => {
            const response = await fetch(
                `https://restcountries.com/v3.1/name/${parameters.id}`
            );
            return await response.json();;
        }
    });


    React.useEffect(() => {
        // remove cache in qyuery on unmount
      return  () => {
            props.client.removeQueries({ queryKey: ['countryData'] })
        }
    }, [])


    if (isLoading) return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', background: 'white', position: 'absolute', boxSizing: 'border-box'}}>
            <Loading height={200} width={200} />
        </div>
    )

    return (
        <>

        <button onClick={() => navigate('/')}> Back </button>
        {
            data.map((item: IDataType) => (
                <div style={{display: 'flex'}}>
                    <p> <img src={item.flags.png} /></p>
                    <p> { item.name.common } </p>
                 </div>
            ))
        }
        </>
    )
}

export default ViewCountryInformation;