import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Button} from "react-native-elements";
import StarRating from 'react-native-star-rating';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import ImageAvatar from "../avatar/ImageAvatar";

export default class PostComment extends React.PureComponent {

    constructor(props){
        super(props);

        this.state = {
            text: "",
            starCount: 3,
            user_image: null,
        };
    }

    onStarRatingPress = (rating) => {
        this.setState({
            starCount: rating
        });
    };

    _onTextChange = (text) => this.setState({text});

    _onComment = () => {
        const {starCount, text} = this.state;
        const {onComment} = this.props;
        onComment({
            evaluation: starCount,
            comment: text
        });
    };

    render() {
        const {sendingComment, user_image} = this.props;
        const {text, starCount} = this.state;

        return (
            <View style={styles.container}>
                <ImageAvatar userImage={user_image}/>
                <View style={styles.commentSection}>
                    <View style={styles.input}>
                        <TextInput
                            editable={!sendingComment}
                            multiline = {true}
                            numberOfLines = {1}
                            onChangeText={this._onTextChange}
                            value={text}
                            placeholder="Put your comment here..."
                        />
                    </View>
                    <View style={styles.secondSection}>
                        <View style={styles.ratingSection}>
                            <Text>Rating: </Text>
                            <StarRating
                                disabled={false}
                                activeOpacity={0.8}
                                emptyStar="heart-o"
                                fullStar="heart"
                                fullStarColor="#e65247"
                                starSize={20}
                                buttonStyle={styles.startBtn}
                                containerStyle={styles.startContainer}
                                maxStars={5}
                                rating={starCount}
                                selectedStar={this.onStarRatingPress}
                            />
                        </View>
                        <TouchableNativeFeedback>
                            <Button
                                buttonStyle={styles.commentBtn}
                                title="Comment"
                                loading={sendingComment}
                                disabled={sendingComment}
                                disabledStyle={styles.disabledCommentBtn}
                                onPress={this._onComment}
                            />
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 10
    },
    userImage: {
        width: 50,
        height: 50,
    },
    input: {
        borderWidth: 1,
        borderColor: "black",
        paddingLeft: 5,
        paddingRight: 5,
        width: "100%",
        height: 50,
        marginBottom: 10
    },
    ratingSection: {
        flexDirection: "row"
    },
    commentSection: {
        flex: 1,
        marginLeft: 10
    },
    secondSection: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    commentBtn: {
        backgroundColor: "red",
        height: 25,
        borderRadius: 0,
        minWidth: 90,
    },
    textCommentBtn: {
        color: "white",
    },
    startBtn: {
        marginRight: 5
    },
    startContainer: {
        justifyContent: "flex-start"
    },
    disabledCommentBtn: {
        backgroundColor: "grey"
    }
});