import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

export default class HomeScreen extends React.Component() {
    constructor() {
        super()
        this.state = {
            text: '',
            isSearchPressed: false,
        }
    }

    getWord = (word) => {
        var searchKeyword = word.toLowerCase()
        var url = "https://rupinwhitehatjr.github.io/dictionary/" + searchKeyword + ".json"
        return fetch(url)
            .then((data) => {
                if (data.status === 200) {
                    return data.json()
                }
                else {
                    return null
                }
            })
            .then((response) => {
                var responseObject = response

                if (responseObject) {
                    var wordData = responseObject.definition[0]
                    var definition = wordData.description
                    var lexicalCategory = wordData.wordtype

                    this.setState({
                        "word": this.state.text,
                        "definition": definition,
                        "lexicalCategory": lexicalCategory
                    })
                }
                else {
                    that.setState({
                        "word": this.state.text,
                        "definition": "Not Found",
                    })
                }
            })
    }

    render() {
        return (
            <View>
                <TextInput
                    style={styles.inputbox}
                    onChangeText={(text) => {
                        this.setState({
                            text: text,
                            isSearchPressed: false,
                        })
                    }}
                    value={this.state.text}
                />
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={() => {
                        this.setState({ isSearchPressed: true });
                        this.getWord(this.state.text)
                    }}>

                </TouchableOpacity>
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                        Word: {""}
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                        {this.state.word}
                    </Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                        Type :{" "}
                    </Text>
                    <Text style={styles.detailsTitle}>
                        {this.state.lexicalCategory}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <Text style={styles.detailsTitle}>
                        Definition: {" "}
                    </Text>
                    <Text style={{ fontSize: 18 }}>
                        {this.state.definition}
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    detailsContainer: {
        width: "80%",
        height: 40,
        alignItems: "center",
    },

    detailsTitle: {
        width: "80%",
        height: 40,
        alignItems: "center",
    },

    searchButton: {
        flex: 0.3,
        alignItems: "center",
        justifyContent: "center",
    },

    inputbox: {
        width: "80%",
        height: 40,
        alignItems: "center",
    },

})