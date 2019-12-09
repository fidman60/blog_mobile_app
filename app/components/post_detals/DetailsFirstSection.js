import React from 'react';
import {Image, Text} from "react-native-elements";
import {getImage} from "../../services/BlogAPI";
import {ActivityIndicator, View, Dimensions, StyleSheet} from "react-native";
import MoveText from "../../animations/MoveText";

const WIDTH = Dimensions.get("window").width;

export default class DetailsFirstSection extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            titleWidth: 0,
            animateText: false,
        }
    }

    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        return this.state.animateText !== nextState.animateText;
    }

    _renderTitle(){
        const {titleWidth, animateText} = this.state;
        const {post} = this.props;

        if (animateText) {
            return (
                <MoveText titleWidth={titleWidth}>
                    <Text onLayout={this._onTitleLayout} style={styles.title}>{post.title}</Text>
                </MoveText>
            )
        }

        return (
            <Text onLayout={this._onTitleLayout} style={styles.title}>{post.title}</Text>
        );
    }

    _onTitleLayout = ({nativeEvent: {layout: {width}}}) => {
        this.setState({
            titleWidth: width,
            animateText: width > 0 && WIDTH < width
        });
    };

    render() {
        const {post} = this.props;
        return (
            <View style={styles.detailsView}>
                <Image
                    source={{ uri: getImage(post.id) }}
                    style={styles.image}
                    PlaceholderContent={<ActivityIndicator/>}
                />
                <View style={styles.titleSection}>
                    {this._renderTitle()}
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 300,
    },
    detailsView: {
        flex: 1,
        position: "relative",
    },
    titleSection: {
        backgroundColor: "rgba(0,0,0,0.5)",
        width: "200%",
        height: 50,
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        alignItems: "center"
    },
    title: {
        fontSize: 22,
        color: "white",
        fontFamily: "sans-serif",
        paddingLeft: 10,
        left: 0,
        flexDirection: "row",
    },
});