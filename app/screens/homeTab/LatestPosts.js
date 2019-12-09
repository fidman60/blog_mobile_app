import React from 'react';
import {getPostsList} from '../../services/BlogAPI';
import PostsList from "../../components/PostsList";
import {Alert} from 'react-native';

export default class LatestPosts extends React.PureComponent {

    _loadPosts(token){
        const {page, isLoading, isRefreshing} = this.state;

        if (isLoading) return;

        if (!isRefreshing) {
            this.setState({
                isLoading: true
            });
        }

        getPostsList(page+1, token)
            .then((response) => {
                const {data} = response;
                this.setState({
                    posts: [...this.state.posts, ...data.data],
                    page: parseInt(data.current_page),
                    lastPage: parseInt(data.last_page),
                    isLoading: false,
                    isRefreshing: false,
                });
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    isRefreshing: false,
                });
                Alert.alert("Sorry, something went wrong, please verify if your network is working");
            });
    }

    render(){
        return (
            <PostsList loadPosts={this._loadPosts} navigation={this.props.navigation} />
        );
    }

}