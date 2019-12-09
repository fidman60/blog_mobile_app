import React from 'react';
import {StyleSheet, View} from 'react-native';
import Loading from "./Loading";
import {connect} from "react-redux";
import CustomFlatList from "./CustomFlatList";

class PostsList extends React.PureComponent {

    constructor(props){
        super(props);

        this.state = {
            posts: [],
            page: 0,
            lastPage: 0,
            isLoading: false,
            isRefreshing: false,
        };

        this._loadPosts = props.loadPosts.bind(this);
    }

    componentDidMount() {
        this._loadPosts(this.props.token);
    }

    _refresh = () => {
        this.setState({
            posts: [],
            page: 0,
            lastPage: 0,
            isRefreshing: true,

        }, () => this._loadPosts(this.props.token));
    };

    _onPress = (postId) => {
        return this.props.navigation.navigate('PostDetails',{postId: postId});
    };

    _onEndReached = () => {
        if (this.state.page < this.state.lastPage) this._loadPosts(this.props.token);
    };

    render(){
        const {isLoading} = this.state;
        return (
            <View style={styles.main_container}>
                {
                    <CustomFlatList
                        posts={this.state.posts}
                        onPress={this._onPress}
                        onEndReached={this._onEndReached}
                        isRefreshing={this.state.isRefreshing}
                        isLoading={isLoading}
                        onRefresh={this._refresh}
                    />
                }
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

const mapStateToProps = state => ({token: state.userReducer.token});

export default connect(mapStateToProps)(PostsList);