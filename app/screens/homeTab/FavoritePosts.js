import React from 'react';
import {getFavoritePosts} from "../../services/BlogAPI";
import {connect} from "react-redux";
import {StyleSheet, View} from "react-native";
import CustomFlatList from "../../components/CustomFlatList";
import Loading from "../../components/Loading";
import {emptyFavoritesList, setFavoritesListAction} from "../../redux/actions/favoriteAction";

class FavoritePosts extends React.PureComponent {

    constructor(props){
        super(props);

        this.endReached = false;

        this.state = {
            isLoading: false,
            isRefreshing: false,
        };
    }

    componentDidMount(){
        this._loadPosts(this.props.token);
    }

    componentWillUnmount(){
        this.props.dispatch(emptyFavoritesList());
    }

    _loadPosts = (token) => {
        const {isLoading, isRefreshing} = this.state;

        if (isLoading) return;

        if (!isRefreshing) {
            this.setState({
                isLoading: true
            });
        }

        getFavoritePosts(this.props.page+1, token)
            .then((response) => {
                const {data} = response;

                // re-render will occur after dispatching redux state
                this.state.isLoading = false;
                this.state.isRefreshing = false;

                this.props.dispatch(setFavoritesListAction({
                    favorites: data.data,
                    lastPage: data.last_page,
                    page: data.current_page,
                }, this.endReached));

                this.endReached = false;
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    isRefreshing: false,
                });
            });
    };

    _onPress = (postId) => {
        return this.props.navigation.navigate('PostDetails',{postId: postId});
    };

    _onEndReached = () => {
        this.endReached = true;
        if (this.props.page < this.props.lastPage) this._loadPosts(this.props.token);
    };

    _displayLoading = () => {
        if (this.state.isLoading) return <Loading/>;
        return null;
    };

    _refresh = () => {
        this.props.dispatch(emptyFavoritesList());
        this.setState({
            isRefreshing: true,
        }, this._callbackLoadPosts);
    };

    _callbackLoadPosts = () => this._loadPosts(this.props.token);

    render(){
        const {isLoading, isRefreshing} = this.state;
        const {favorites} = this.props;

        return (
            <View style={styles.main_container}>
                {isLoading ?
                    <Loading/>
                     :
                    <CustomFlatList
                        posts={favorites}
                        onPress={this._onPress}
                        onEndReached={this._onEndReached}
                        ListFooterComponent={this._displayLoading}
                        isRefreshing={isRefreshing}
                        onRefresh={this._refresh}
                        notHome={true}
                    />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        padding: 10,
    }
});

const mapStateToProps = state => ({
    token: state.userReducer.token,
    favorites: state.favoriteReducer.favorites,
    page: state.favoriteReducer.page,
    lastPage: state.favoriteReducer.lastPage
});

export default connect(mapStateToProps)(FavoritePosts);