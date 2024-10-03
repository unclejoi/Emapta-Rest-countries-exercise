import * as React from 'react';
import { IDataType } from '../Home/Home';
import './CountryInformation.css';

type currencyType = {
    name: string;
    symbol: string;
}

// Memoize the Country Information Component to prevent unnecessary re-renders

const ViewCountryInformation = React.memo((props: { data: IDataType }) => {
    const { data } = props;
    const currency: currencyType[] = Object.values(data.currencies);

    return (
        <>
            <div className="countryInfoCard">
                <div className="countryFlagWrapper">
                    <img className="countryFlag" src={data.flags.png}/>
                </div>
                <div className='countryInfo'>
                    <p className='countryName'> 
                        <b>{data.name.official}</b> 
                    </p>
                    <p className='currency'> 
                        <b>Currency:</b> {currency.map((value: currencyType) => `${value.name} (${value.symbol}`).join(', ')})
                    </p>
                    <p className='driveSide'> 
                        <b>Side of the road they Drive on:</b> {data.car.side}
                    </p>
                </div>
                {
                    data.coatOfArms.png ? (
                        <div className='coatofArmsWrapper' >
                            <img src={data.coatOfArms.png} />
                        </div>
                    ) : null
                }
            </div>
        </>
    )
})

export default ViewCountryInformation;