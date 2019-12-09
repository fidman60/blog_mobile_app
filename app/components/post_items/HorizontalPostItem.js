import React from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import {Card, Text} from "react-native-elements";
import {getImage} from "../../services/BlogAPI";

const {width} = Dimensions.get("window");

// pure
export default class HorizontalPostItem extends React.Component {

    shouldComponentUpdate() {
        return false;
    }

    render() {
        const {post} = this.props;
        return (
            <Card
                title={null}
                image={{ uri: getImage(post.id) }}
                containerStyle={styles.cardContainer}
            >
                <View style={styles.titleView}>
                    <Text style={styles.txtTitle}>
                        {post.title}
                    </Text>
                </View>
            </Card>
        );
    }

}

const styles = StyleSheet.create({
    cardContainer: {
        padding: 0,
        width: width - 80,
    },
    txtTitle: {
        fontSize: 20
    },
    titleView: {
        padding: 10
    }
});