import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { IDataType } from './Home';

const ViewCountryInformation = () => {
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



    if (isLoading) return 'Loading....'

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