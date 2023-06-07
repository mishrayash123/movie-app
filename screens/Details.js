import {StatusBar} from "expo-status-bar";
import {useEffect, useState} from "react";
import {View, Text, ActivityIndicator, StyleSheet} from "react-native";
import Card from "../components/Card";

export default function DetailsScreen({route}) {
    const [loading, setLoading] = useState(true);
    const [detailsData, setDetailsData] = useState(null);

    const {params} = route;
    const {id} = params;

    useEffect(() => {
        if (id) {
            async function getMovieDetailsById() {
                const apiRes = await fetch(`https://imdb-top-100-movies.p.rapidapi.com/${id}`, {
                    method: "GET",
                    headers: {
                        'X-RapidAPI-Key': 'e8d49997e3mshc19c5745cb99d78p1bb5a1jsnedfa2627415c',
                        'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
                    }
                });

                const result = await apiRes.json();

                if (result) {
                    setDetailsData(result);
                    setLoading(false);
                }
            }

            getMovieDetailsById();
        }
    }, [id]);


    if (loading) {
        return <ActivityIndicator size={'large'}
            color={'blue'}
            style={
                {flex: 1}
            }/>
    }

    return (
        <View style={
            styles.container
        }>
            <Card isDetailsPage={true}
                item={detailsData}/>
            <StatusBar style="light"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center'
    }
})
