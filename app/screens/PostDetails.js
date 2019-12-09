import React from 'react';
import {Alert as Alerto, Animated, Easing, ScrollView, Share, StyleSheet, View} from 'react-native';
import {Text} from "react-native-elements";
import {addPostToFavorite, getPost, removePostFromFavorite} from "../services/BlogAPI";
import Loading from "../components/Loading";
import numeral from 'numeral';
import {connect} from "react-redux";
import {setFavoritesListAction, toggleFavoriteAction} from "../redux/actions/favoriteAction";
import {addToViewedAction} from "../redux/actions/viewedPostsAction";
import PostDetailsHeader, {HEADER_HEIGHT} from "../components/post_detals/PostDetailsHeader";
import CommentsScreen from "../components/comments/CommentsScreen";
import DownCommentsTouchable from "../components/comments/DownCommentsTouchable";
import DetailsFirstSection from "../components/post_detals/DetailsFirstSection";
import DetailsSecondSection from "../components/post_detals/DetailsSecondSection";
import HorizontalFlatList from "../components/HorizontalFlatList";
import Alert from "../components/Alert";

class PostDetails extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            post: null,
            loading: true,
            titleWidth: 0,
            togglingFavorite: false,
            fullScreenComments: false,
        };

        this._rating = null;
        this._totalViews = null;

        this._commentsTranY = new Animated.Value(0);
        this._commentsHeaderTransY = new Animated.Value(-HEADER_HEIGHT);
        this._commentsPageY = 0;
        this._commentsHeaderOpacity = this._commentsHeaderTransY.interpolate({
            inputRange: [-HEADER_HEIGHT, 0],
            outputRange: [0, 1],
        });

        this.comments = [];
        this.comments_last_page = 1;
        this.wasCommented = false;
        this.postId = 0;
        this.user = props.user;
        this.token = props.token;
    }

    componentDidMount() {
        this._loadPost();
    }

    componentDidUpdate(prevProps, prevState) {
        const {fullScreenComments} = this.state;
        if (fullScreenComments !== prevState.fullScreenComments) this._runCommentsAnimation();
    }

    _loadPost(){
        getPost(this.props.navigation.getParam('postId'), this.props.token)
            .then(({data}) => {
                const post = data.post;

                this.wasCommented = data.wasCommented;
                this.comments = data.comments.data;
                this.comments_last_page = data.comments.last_page;
                this.postId = post.id;

                this.setState({
                    post: post,
                    loading: false,
                });

                this.props.dispatch(addToViewedAction(post));
            })
            .catch(error => {
                Alerto.alert("Sorry, posts not loaded...");
                this.setState({
                    loading: false,
                });
            });
    }

    _onShare = () => {
        const {post} = this.state;
        Share.share({
            title: post.title,
            message: post.content,
        });
    };

    _onPressFavoriteBtn = () => {
        const {post, togglingFavorite} = this.state;

        if (togglingFavorite) return;

        if (post.in_favorite) {
            removePostFromFavorite(post.id, this.props.token)
                .then(response => {
                    this.state.post = {
                        ...this.state.post,
                        in_favorite: 0,
                    };
                    this.state.togglingFavorite = false;

                    this._updateFavoriteCallback(response);
                })
                .catch(error => {
                    this.setState({
                        togglingFavorite: false,
                    });
                    Alerto.alert("Something went wrong...")
                });
        } else {
            addPostToFavorite(post.id, this.props.token)
                .then(response => {
                    this.state.post = {
                        ...this.state.post,
                        in_favorite: 1,
                    };
                    this.state.togglingFavorite = false;
                    this._updateFavoriteCallback(response);
                })
                .catch(error => {
                    this.setState({
                        togglingFavorite: false,
                    });
                    Alerto.alert("Something went wrong...");
                });
        }
    };

    _updateFavoriteCallback = ({data: {data, last_page, current_page}}) => this.props.dispatch(setFavoritesListAction({
        favorites: data,
        lastPage: last_page,
        page: current_page,
    }));

    _onShowComments = () => {
        if (this.commentsViewRef) {
            this.commentsViewRef.measure((x, y, width, height, pageX, pageY) => {
                this._commentsPageY = pageY;

                this.setState({
                    fullScreenComments: true,
                });
            });
        }
    };

    _onHideComments = () => {
        this.setState({
            fullScreenComments: false,
        });
    };

    _runCommentsAnimation = () => {
        const {fullScreenComments} = this.state;
        Animated.parallel([
            Animated.timing(this._commentsTranY, {
                toValue: fullScreenComments ? -(this._commentsPageY - HEADER_HEIGHT) : 0,
                easing: Easing.ease,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(this._commentsHeaderTransY, {
                toValue: fullScreenComments ? 0 : -HEADER_HEIGHT,
                easing: Easing.out(Easing.ease),
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    };

    _onLayoutCommentsView = () => {};

    render(){
        const {post, loading, fullScreenComments} = this.state;
        const {navigation} = this.props;

        if (loading) return <View style={styles.loadingView}><Loading/></View>;

        // affct values to some post fields after component mount to avoid calculation in each render
        if (this._totalViews === null || !this._rating) {
            this._rating = post.rating ? numeral(post.rating).format('0.00')+"/5":"n/a";
            this._totalViews = numeral(post.total_views).format('0a');
        }

        return (
            <View style={styles.main_container}>
                <PostDetailsHeader post={post} onShare={this._onShare} navigation={navigation}/>
                <Animated.View
                    style={[styles.down, {opacity: this._commentsHeaderOpacity, transform: [{translateY: this._commentsHeaderTransY}]}]}
                >
                    <DownCommentsTouchable onPress={this._onHideComments} />
                </Animated.View>

                <ScrollView scrollEnabled={!fullScreenComments}>
                    <DetailsFirstSection post={post}/>
                    <DetailsSecondSection
                        post={post}
                        onPressFavoriteBtn={this._onPressFavoriteBtn}
                        rating={this._rating}
                        totalViews={this._totalViews}
                    />
                    <View>
                        <Text style={styles.content}>{post.content}</Text>
                    </View>
                    <View>
                        <Text style={styles.subTitle}>Users comments:</Text>
                        <Animated.View style={[styles.commentSection, {transform: [{translateY: this._commentsTranY}]}]}>
                            <View
                                ref={(ref) => { this.commentsViewRef = ref }}
                                onLayout={this._onLayoutCommentsView}
                            >
                                <CommentsScreen
                                    user={this.user}
                                    token={this.token}
                                    comments={this.comments}
                                    post={post}
                                    comments_last_page={this.comments_last_page}
                                    wasCommented={this.wasCommented}
                                    showComments={this._onShowComments}
                                    blur={!fullScreenComments}
                                />
                            </View>
                        </Animated.View>
                    </View>
                    <View style={styles.horizontalView}>
                        <Text style={styles.subTitle}>Viewed posts:</Text>
                        <HorizontalFlatList
                            posts={this.props.viewedPosts}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    userImage: {
        width: 50,
        height: 50,
    },
    content: {
        padding: 10,
        fontSize: 15,
        lineHeight: 23
    },
    commentSection: {
        marginTop: 10,
        backgroundColor: "white",
        zIndex: 10000
    },
    loadingView: {
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    dd: {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 10,
        left: 10,
        backgroundColor: "transparent",
        zIndex: 3000,
        justifyContent: "center",
        alignItems: "center"
    },
    down: {
        backgroundColor: "white",
        position: "absolute",
        zIndex: 6000,
        top: 0,
        left: 0,
        height: HEADER_HEIGHT,
        width: "100%",
    },
    subTitle: {
        paddingLeft: 10,
        fontSize: 25,
        marginTop: 20,
        color: "#4d5250"
    },
    horizontalView: {
        marginBottom: 20
    }
});

const mapStateToProps = state => ({
    token: state.userReducer.token,
    user: state.userReducer.user,
    favorites: state.favoriteReducer.favorites,
    viewedPosts: state.viewedReducer.posts,
});

export default connect(mapStateToProps)(PostDetails);