import {useEffect, useState} from 'react';
import {View, Text} from 'react-native';


export default function Home() {
    const [movies, setmovies] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        setloading(true);
        async function getmovielist() {
            const apires = await fetch('https://imdb-top-100-movies.p.rapidapi.com/', {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'e8d49997e3mshc19c5745cb99d78p1bb5a1jsnedfa2627415c',
                    'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
                }
            });
            const result = await apires.json();
            if(result){
                setloading(false);
                setmovies(result);
            }
        }
        getmovielist();
    }, []);

    // console.log(movies, loading)

    return (
        <View>
            <Text>Home screen</Text>
        </View>
    )
}
