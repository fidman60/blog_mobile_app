import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {Button, Icon} from "react-native-elements";
import moment from "moment";
import {TouchableOpacity} from 'react-native-gesture-handler';
import PostReply from "./PostReply";
import {getReplies, react} from "../../services/BlogAPI";
import ImageAvatar from "../avatar/ImageAvatar";
import Replies from "./Replies";

export default class Comment extends React.PureComponent {

    constructor(props){
        super(props);

        const {comment} = props;
        this.state = {
            showReplyInput: false,
            showReplies: false,
            comment: comment,
            isReacting: false,
            replies: [],
            isChargingReplies: false,
            currentPageReplies: 0,
            lastPageReplies: 0,
        };

        //this.avatarImage = comment.user_image ? {uri: getImage(comment.user_image, "user")} : require('../../assets/images/user_icon.png');
        this.fullName = comment.lname + " " + comment.fname;
        this.commentDate = moment(comment.created_at).fromNow();
    }

    _onReact = (reaction) => {

        const {comment, isReacting} = this.state;
        const {token} = this.props;

        let oldReaction = -1;

        if (comment.was_reacted){
            oldReaction = !!comment.reaction;
        }

        if (oldReaction === !!reaction || isReacting) return;

        this.setState({
            isReacting: true,
        });

        react(reaction, comment.id, token)
            .then(response => {
                const data = response.data;
                this.setState({
                    isReacting: false,
                    comment: {
                        ...this.state.comment,
                        was_reacted: true,
                        reaction: reaction,
                        total_likes: data.total_likes,
                        total_dislikes: data.total_dislikes,
                    }
                })
            })
            .catch(error => {
                this.setState({
                    isReacting: false,
                });
                Alert.alert("Sorry, something went wrong")
            });
    };

    _likeReact = () => {
        this._onReact(true);
    };

    _dislikeReact = () => {
        this._onReact(false);
    };

    _toggleReplies = () => {
        const {showReplies} = this.state;
        if (showReplies){
            this.setState({
                replies: [],
                isChargingReplies: false,
                currentPageReplies: 0,
                lastPageReplies: 0,
                showReplies: false,
            });
        } else {
            this._loadReplies();
        }
    };

    _toggleInputReply = () => this.setState({showReplyInput: !this.state.showReplyInput});

    _incrementsTotalReplies = () => {
        const {comment} = this.state;
        this.setState({
            comment: {
                ...comment,
                total_responses: comment.total_responses+1
            }
        });
    };

    _repliesOnEndReached = () => {
        const {currentPageReplies, lastPageReplies} = this.state;
        if (currentPageReplies < lastPageReplies) this._loadReplies();
    };

    _loadReplies = () => {
        const {isChargingReplies, replies, currentPageReplies, comment} = this.state;
        const {token} = this.props;
        if (isChargingReplies) return;

        this.setState({
            showReplies: true,
            isChargingReplies: true
        });

        getReplies(comment.id, currentPageReplies+1, token)
            .then(({data: {current_page, data, last_page}}) => {
                this.setState({
                    isChargingReplies: false,
                    replies: [...replies, ...data],
                    currentPageReplies: current_page,
                    lastPageReplies: last_page,

                });
            })
            .catch(error => {
                this.setState({
                    isChargingReplies: false
                });
            });
    };

    render(){

        const {comment, showReplies, showReplyInput, isChargingReplies, replies} = this.state;
        const {token, user} = this.props;

        return (
            <View style={styles.container}>
                <ImageAvatar userImage={comment.user_image}/>
                <View style={styles.commentDetails}>
                    <View>
                        <View style={styles.commentDetailsSection}>
                            <Text style={styles.firstLineText}>
                                {this.fullName}   <Text style={styles.timeAgo}>{this.commentDate}</Text>
                            </Text>
                            <Text style={styles.commentContent}>{comment.comment}</Text>
                            <View style={styles.lineReactDetails}>
                                <View style={styles.reactDetails}>
                                    <TouchableOpacity
                                        onPress={this._likeReact}
                                        activeOpacity={0.6}
                                    >
                                        <View style={styles.reactItemDetail}>
                                            <Icon
                                                name={comment.was_reacted ? comment.reaction ? "like1" : "like2" : "like2"}
                                                type="antdesign"
                                                size={16}
                                                containerStyle={styles.touchableIcon}
                                            />
                                            <Text>{comment.total_likes}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={this._dislikeReact}
                                        activeOpacity={0.6}
                                    >
                                        <View style={styles.reactItemDetail}>
                                            <Icon
                                                name={comment.was_reacted ? !comment.reaction ? "dislike1" : "dislike2" : "dislike2"}
                                                type="antdesign"
                                                size={16}
                                                containerStyle={styles.touchableIcon}
                                            />
                                            <Text>{comment.total_dislikes}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={this._toggleReplies}
                                        activeOpacity={0.6}
                                    >
                                        <View style={styles.reactItemDetail}>
                                            <Icon
                                                name="message1"
                                                type="antdesign"
                                                size={16}
                                                containerStyle={styles.touchableIcon}/>
                                            <Text>{comment.total_responses}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <Button
                                    buttonStyle={styles.replyBtn}
                                    titleStyle={styles.btnTitle}
                                    title="Reply"
                                    onPress={this._toggleInputReply}
                                />
                            </View>
                        </View>

                        <View style={styles.commentsSection}>
                            {showReplyInput && <PostReply
                                user={user}
                                token={token}
                                commentId={this.props.comment.id}
                                incrementsTotalReplies={this._incrementsTotalReplies}
                            />}
                            {showReplies && (
                                <Replies
                                    replies={replies}
                                    onEndReached={this._repliesOnEndReached}
                                    isLoading={isChargingReplies}
                                />
                            )}
                        </View>
                    </View>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    firstLineText: {
        fontWeight: "bold",
        fontSize: 10,
    },
    timeAgo: {
        color: "grey"
    },
    commentDetails: {
        borderWidth: 1,
        borderColor: "grey",
        flex: 1,
        marginLeft: 10,
    },
    commentContent: {
        marginTop: 10,
        marginBottom: 10,
    },
    reactDetails: {
        flexDirection: "row",
    },
    reactItemDetail: {
        flexDirection: "row",
        marginRight: 8
    },
    touchableIcon: {
        marginRight: 2
    },
    lineReactDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    replyBtn: {
        backgroundColor: "red",
        height: 25,
        borderRadius: 0,
        minWidth: 80,
    },
    textReplyBtn: {
        color: "white"
    },
    commentDetailsSection: {
        padding: 10,
    },
    commentsSection: {
        backgroundColor: "#cfe3e0"
    },
    repliesScroll: {
        marginTop: 10,
        maxHeight: 500,
        padding: 10
    },
    btnTitle: {
        fontSize: 11
    }
});