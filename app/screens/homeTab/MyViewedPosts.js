import React from 'react';
import {StyleSheet, View} from 'react-native';
import {paginate} from '../../helpers/functions';
import CustomFlatList from "../../components/CustomFlatList";
import {connect} from "react-redux";
import Loading from "../../components/Loading";
import {PER_PAGE} from "../../config/global";
import {showNextPageAction} from "../../redux/actions/viewedPostsAction";
import Alert from "../../components/Alert";

class MyViewedPosts extends React.PureComponent {

    constructor(props) {
        super(props);
        this.endReached = false;
        this.state = {
            isLoading: false,
            isRefreshing: false,
        };
    }

    _onPress = (postId) => {
        return this.props.navigation.navigate('PostDetails',{postId: postId});
    };

    _onEndReached = () => {
        this.endReached = true;
        if (this.props.page < this.props.lastPage) this._loadPosts();
    };

    _displayLoading = () => {
        if (this.state.isLoading) return <Loading/>;
        return null;
    };

    _loadPosts = () => {
        const data = paginate(this.props.totalPosts,this.state.isRefreshing ? 1 : this.props.page + 1,PER_PAGE);
        const page = data.page;
        const lastPage = data.total_pages;
        const posts = this.endReached && !this.state.isRefreshing ? [...this.props.posts, ...data.data] : data.data;
        this.endReached = false;

        this.props.dispatch(showNextPageAction({
            posts: posts,
            page: page,
            lastPage: lastPage
        }));

        this.setState({
            isLoading: false,
            isRefreshing: false
        });
    };

    _refresh = () => {
        this.setState({
            isRefreshing: true,
        }, () => this._loadPosts());
    };

    render() {
        return (
            <View style={styles.main_container}>
                {this.props.totalPosts.length > 0 ? (
                    <CustomFlatList
                        posts={this.props.posts}
                        onPress={this._onPress}
                        onEndReached={this._onEndReached}
                        ListFooterComponent={this._displayLoading}
                        isRefreshing={this.state.isRefreshing}
                        onRefresh={this._refresh}
                        notHome={true}
                    />
                ) : <Alert status="info" text="No post was seen"/>}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        padding: 10,
    },
    list: {
        flex: 1,
    }
});

const mapStateToProps = state => ({
    totalPosts: state.viewedReducer.totalPosts,
    posts: state.viewedReducer.posts,
    page: state.viewedReducer.page,
    lastPage: state.viewedReducer.lastPage
});

export default connect(mapStateToProps)(MyViewedPosts);