import {StatusBar} from "expo-status-bar";
import {useEffect, useState} from "react";
import {
    View,
    Text,
    ActivityIndicator,
    FlatList,
    StyleSheet
} from "react-native";
import Card from "../components/Card";
import Search from "../components/Search";

export default function HomeScreen({navigation}) {
    const [movieList, setMovieList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState("");

    useEffect(() => {
        setLoading(true);
        async function getListOfMovies() {
            const apiRes = await fetch("https://imdb-top-100-movies.p.rapidapi.com/", {
                method: "GET",
                headers: {
                    'X-RapidAPI-Key': 'e8d49997e3mshc19c5745cb99d78p1bb5a1jsnedfa2627415c',
                    'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
                }
            });

            const result = await apiRes.json();

            if (result) {
                setLoading(false);
                setMovieList(result);
            }
        }

        getListOfMovies();
    }, []);

    

    useEffect(() => {
        navigation.setOptions({headerShown: false});

        return() => {};
    }, [navigation]);

    if (loading) {
        return (
            <ActivityIndicator color={"red"}
                style={
                    {flex: 1}
                }
                size={"large"}/>
        );
    }

    const filteredMovieList = text && text.trim() !== "" ? movieList.filter((item) => item.title.toUpperCase().includes(text.toUpperCase())) : movieList;

    return (
        <View style={
            styles.container
        }>
            <Search text={text}
                setText={setText}/>
            <FlatList data={
                    filteredMovieList || []
                }
                renderItem={
                    ({item}) => (
                        <Card navigation={navigation}
                            item={item}/>
                    )
                }/>
            <StatusBar style="light"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30
    }
});
