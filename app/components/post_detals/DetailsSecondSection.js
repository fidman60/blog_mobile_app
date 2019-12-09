import React from 'react';
import {StyleSheet, View} from "react-native";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import EnShrinkLarge from "../../animations/EnShrinkLarge";
import {Icon, Text} from "react-native-elements";

const color = "#9da1a1";

export default class DetailsSecondSection extends React.PureComponent {

    constructor(props){
        super(props);
        this._filledFavoriteIcon = null;
        this._borderFavoriteIcon = null;
        this._imageFavorite = null;
    }

    componentWillMount() {
        this._setFavoriteIcon(this.props);
    }

    componentWillUpdate(nextProps) {
        this._setFavoriteIcon(nextProps);
    }

    _setFavoriteIcon = (props) => {
        const {post} = props;
        this._imageFavorite = post.in_favorite ?
            this._filledFavoriteIcon ? this._filledFavoriteIcon : require('../../assets/images/ic_favorite.png') :
            this._borderFavoriteIcon ? this._borderFavoriteIcon : require('../../assets/images/ic_favorite_border.png');
    };

    render() {

        const {onPressFavoriteBtn, post, rating, totalViews} = this.props;

        return (
            <React.Fragment>
                <View style={styles.detailsSection}>
                    <View style={styles.detailsItem}>
                        <CustomTouchableOpacity
                            onPress={onPressFavoriteBtn}
                        >
                            <EnShrinkLarge source={this._imageFavorite} />
                        </CustomTouchableOpacity>

                        <Text style={styles.itemsTxt}>Favorite</Text>
                    </View>
                    <View style={styles.detailsItem}>
                        <Icon
                            name='star'
                            type='material'
                            color={color}
                            size={25}
                        />
                        <Text style={styles.itemsTxt}>Rating</Text>
                    </View>
                    <View style={styles.detailsItem}>
                        <Icon
                            name='visibility'
                            type='material'
                            color={color}
                            size={25}
                        />
                        <Text style={styles.itemsTxt}>Total views</Text>
                    </View>
                </View>
                <View style={styles.detailsSection}>
                    <View style={styles.detailsItem}>
                        <Text style={styles.value}>{post.in_favorite ? "remove" : "add"}</Text>
                    </View>
                    <View style={styles.detailsItem}>
                        <Text style={styles.value}>{rating}</Text>
                    </View>
                    <View style={styles.detailsItem}>
                        <Text style={styles.value}>{totalViews}</Text>
                    </View>
                </View>
            </React.Fragment>
        )
    }

}

const styles = StyleSheet.create({
    detailsSection: {
        flexDirection: "row",
    },
    detailsItem: {
        flex: 1,
        padding: 8,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#ccd1d2",
        alignItems: "center"
    },
    itemsTxt: {
        textAlign: "center",
        top: -4,
        color: "#6e6f6f"
    },
    value: {
        textAlign: "center",
        color: "black"
    },
});