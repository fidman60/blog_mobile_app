import React from 'react';
import {Alert, Animated, Easing, StyleSheet, TextInput, View} from 'react-native';
import {Button} from "react-native-elements";
import SimpleImageAvatar from "../avatar/SimpleImageAvatar";
import {makeCommentReply} from "../../services/BlogAPI";

const HEIGHT = 90;

export default class PostReply extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            text: "",
            sendingReply: false,
        };

        this._heightAnim = new Animated.Value(0);
    }

    componentDidUpdate() {
        //this._runAnimation();
    }

    _runAnimation(){
        Animated.timing(this._heightAnim, {
            toValue: this.props.show ? HEIGHT : 0,
            easing: Easing.ease,
            duration: 200,
        }).start();
    }

    _onChangeText = (text) => this.setState({text});

    _makeReply = () => {
        const {text, sendingReply} = this.state;
        const {commentId, token, incrementsTotalReplies} = this.props;

        if (text.length < 1 || sendingReply) return;

        this.setState({
            sendingReply: true,
        });

        makeCommentReply(text, commentId, token)
            .then(response => {
                incrementsTotalReplies();
                this.setState({
                    sendingReply: false,
                    text: ""
                });
            })
            .catch(error => {
                this.setState({
                    sendingReply: false,
                });
                Alert.alert("Sorry something went wrong");
            });
    };

    render() {
        const {text, sendingReply} = this.state;
        const {user} = this.props;

        return (
            <Animated.View style={styles.parent}>
                <View style={styles.container}>
                    <SimpleImageAvatar userImage={user.image} noRadius={true}/>
                    <View style={styles.commentSection}>
                        <View style={styles.input}>
                            <TextInput
                                editable={true}
                                multiline = {true}
                                numberOfLines = {1}
                                onChangeText={this._onChangeText}
                                value={text}
                                placeholder="Put your reply here..."
                            />
                        </View>
                        <View style={styles.secondSection}>
                            <Button
                                buttonStyle={styles.replyBtn}
                                titleStyle={styles.btnTitle}
                                title="Reply"
                                loading={sendingReply}
                                disabled={sendingReply}
                                disabledStyle={styles.disabledCommentBtn}
                                onPress={this._makeReply}
                            />
                        </View>
                    </View>
                </View>
            </Animated.View>
        );
    }

}

const styles = StyleSheet.create({
    parent: {
        overflow: "hidden",
        height: HEIGHT
    },
    container: {
        flexDirection: "row",
        overflow: "hidden",
        padding: 10,
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "black",
        paddingLeft: 5,
        paddingRight: 5,
        width: "100%",
        height: 40,
        marginBottom: 10
    },
    commentSection: {
        flex: 1,
        marginLeft: 10
    },
    secondSection: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    replyBtn: {
        backgroundColor: "red",
        height: 25,
        borderRadius: 0,
        minWidth: 80,
    },
    textCommentBtn: {
        color: "white",
    },
    disabledCommentBtn: {
        backgroundColor: "grey"
    },
    btnTitle: {
        fontSize: 11
    }
});