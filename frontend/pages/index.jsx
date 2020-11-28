import { useState, useEffect } from 'react';
import axios from 'axios';

const BFF = process.env.BFF || "http://choiceapp-bff:3000";

const MainPage = () => {
    const [data, setData] = useState('Waiting...')
    useEffect(() => {
        setTimeout(() => axios.post(BFF + '/api/v1/test_get', { data_id: 1 })
            .then(res => setData(JSON.stringify(res.data)))
            .catch(console.log.bind(null, 'Error on axios'))
            , 1500);
    }, []);
    return (
        <div>
            <h1>{data}</h1>
        </div>
    );
};

export default MainPage;