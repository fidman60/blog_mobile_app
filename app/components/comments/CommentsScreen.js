import React from 'react';
import Alert from "../Alert";
import PostComment from "./PostComment";
import {Alert as Alerto, Dimensions, StyleSheet, View, UIManager, LayoutAnimation} from "react-native";
import Comments from "./Comments";
import {getComments, makeComment} from "../../services/BlogAPI";
import {TouchableOpacity} from "react-native-gesture-handler";
import {Icon} from "react-native-elements";
import BlurViewContainer from "../../helpers/BlurViewContainer";
import {HEADER_HEIGHT} from "../post_detals/PostDetailsHeader";

const {width, height} = Dimensions.get("window");
const COMMENTS_HEIGHT = 400;


if (UIManager.setLayoutAnimationEnabledExperimental) UIManager.setLayoutAnimationEnabledExperimental(true);

export default class CommentsScreen extends React.PureComponent {

    constructor(props){
        super(props);

        const {comments, post, comments_last_page, wasCommented, token, user} = this.props;

        this.state = {
            comments,
            comments_page: 1,
            comments_last_page,
            comments_loading: false,
            wasCommented,
            sendingComment: false,
        };

        this.post = post;
        this.token = token;
        this.user = user
    }

    _onComment = (data) => {
        if (this.state.sendingComment) return;

        this.setState({
            sendingComment: true
        });

        makeComment(this.post.id, data.comment, data.evaluation, this.token)
            .then((response) => {
                const {comments} = this.state;
                LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                this.setState({
                    sendingComment: false,
                    wasCommented: true,
                    comments: [
                        response.data,
                        ...comments,
                    ],
                });
            })
            .catch(error => {
                Alerto.alert("Sorry, your comment hasn't been inserted, please try again ...")
                this.setState({
                    sendingComment: false
                });
            });
    };

    _commentsOnEndReached = () => {
        const {comments_last_page, comments_page} = this.state;
        if (comments_page < comments_last_page) this._loadComments();
    };

    _loadComments = () => {
        const {comments_page, comments_loading, comments} = this.state;

        if (comments_loading) return;

        this.setState({
            comments_loading: true,
        });

        getComments(this.post.id, comments_page + 1, this.token)
            .then(({data}) => {
                this.setState({
                    comments_page: data.current_page,
                    comments_loading: false,
                    comments_last_page: data.last_page,
                    comments: [...comments, ...data.data]
                });
            })
            .catch(error => {
                Alerto.alert("Sorry, comments not loaded, please try again ...");
                this.setState({
                    comments_loading: false,
                });
            });
    };

    _onLayoutPostComment = ({nativeEvent: {layout}}) => {
        this.postCommentHeight = layout.height
    };

    render() {

        const {sendingComment, comments, comments_loading, wasCommented} = this.state;
        const {showComments, blur} = this.props;

        return (
            <View style={styles.container}>
                <View style={[styles.containerSection, {backgroundColor: comments.length < 3 ? "#e4ebea" : "white"}]}>
                    {blur && <View style={styles.dd}>
                        <TouchableOpacity activeOpacity={.7} onPress={showComments}>
                            <Icon name="up" type="antdesign" size={40} color="grey" raised/>
                        </TouchableOpacity>
                    </View>}

                    <BlurViewContainer blur={blur}>
                        <View>
                            {
                                wasCommented ?
                                    <View onLayout={this._onLayoutPostComment}>
                                        <Alert
                                            status="info"
                                            text="You have already post your comment"
                                            addPadding={true}
                                        />
                                    </View>
                                    :
                                    <View onLayout={this._onLayoutPostComment}>
                                        <PostComment
                                            user_image={this.user.image}
                                            onComment={this._onComment}
                                            sendingComment={sendingComment}
                                        />
                                    </View>
                            }

                            <View style={[styles.commentsList, {height: blur ? COMMENTS_HEIGHT : height - (HEADER_HEIGHT+this.postCommentHeight+20) }]}>
                                <Comments
                                    user={this.user}
                                    token={this.token}
                                    comments={comments}
                                    postId={this.post.id}
                                    onEndReached={this._commentsOnEndReached}
                                    loading={comments_loading}
                                />
                            </View>
                        </View>
                    </BlurViewContainer>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerSection: {
        backgroundColor: "white",
        position: "relative",
    },
    commentsList: {
        padding: 10,
    },
    dd: {
        position: "absolute",
        width: width - 20,
        height: "100%",
        left: 10,
        backgroundColor: "transparent",
        zIndex: 5000,
        justifyContent: "center",
        alignItems: "center"
    }
});