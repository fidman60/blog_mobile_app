import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {getImage} from '../../services/BlogAPI';
import {Icon, Image} from "react-native-elements";
import moment from "moment";
import numeral from 'numeral';
import CustomTouchableOpacity from "../CustomTouchableOpacity";

export default class PostItem extends React.Component {

    constructor(props){
        super(props);
        const {post} = props;
        this._postDate = moment(post.created_at).fromNow();
        this._totalViews = numeral(post.total_views).format('0a');
        this._totalComments = numeral(post.total_comments).format('0a');
    }

    shouldComponentUpdate() {
        return false;
    }

    _renderItem(){
        const {post} = this.props;

        return (
            <View style={styles.item}>
                <View style={styles.firstSection}>
                    <Text numberOfLines={2} style={styles.title}>{post.title}</Text>
                    <View style={styles.detailsSection}>
                        <Text style={styles.firstSectionText}>{this._postDate}</Text>
                        <View style={styles.textIcon}>
                            <Text style={styles.firstSectionTextMargin}>{this._totalViews}</Text>
                            <Icon
                                name='eye'
                                type='font-awesome'
                                color='#656363'
                                size={14}
                            />
                        </View>
                        <View style={styles.textIcon}>
                            <Text style={styles.firstSectionTextMargin}>{this._totalComments}</Text>
                            <Icon
                                name='comment'
                                type='font-awesome'
                                color='#83807f'
                                size={14}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.secondSection}>
                    <Image
                        style={styles.image}
                        source={{uri: getImage(post.id)}}
                        PlaceholderContent={<ActivityIndicator/>}
                    />
                </View>
            </View>
        )
    }

    _onPressItem = () => {
        const {post, onPress} = this.props;
        onPress(post.id);
    };

    render() {
        return (
            <CustomTouchableOpacity onPress={this._onPressItem}>
                {this._renderItem()}
            </CustomTouchableOpacity>
        );
    }

}

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        paddingBottom: 10,
        paddingTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eec9d6',
    },
    image: {
        width: "100%",
        height: "100%",
    },
    title: {
        fontFamily: "serif",
        fontWeight: "bold",
        fontSize: 17,
        color: "#2c2b2b"
    },
    firstSection: {
        width: "65%",
        height: 75,
        paddingRight: 10,
        justifyContent: "space-between"
    },
    secondSection: {
        width: "35%",
        height: 75,
    },
    detailsSection: {
        flexDirection: "row",
    },
    authorSection: {
        fontSize: 10
    },
    firstSectionText: {
        color: "#929292"
    },
    textIcon: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 20
    },
    firstSectionTextMargin: {
        color: "#929292",
        marginRight: 5,
    }
});