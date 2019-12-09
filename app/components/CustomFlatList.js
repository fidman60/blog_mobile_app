import React from 'react';
import SecondaryPostItem from "./post_items/SecondaryPostItem";
import PostItem from "./post_items/PostItem";
import {RefreshControl, StyleSheet} from "react-native";
import {FlatList} from 'react-native-gesture-handler';
import Loading from "./Loading";

export default class CustomFlatList extends React.PureComponent {

     _renderItem = ({item, index}) => {
        const {notHome, onPress} = this.props;
        if(!notHome && index === 0) return (
            <SecondaryPostItem
                post={item}
                onPress={onPress}
            />
        );

        return (
            <PostItem
                post={item}
                index={index}
                onPress={onPress}
            />
        );
    };

    _keyExtractor = (item) => item.id.toString();

    render(){
        const {onEndReached, posts, isRefreshing, onRefresh, isLoading} = this.props;
        return (
            <FlatList
                style={styles.list}
                data={posts}
                extraData={this.props}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                onEndReachedThreshold={0.5}
                onEndReached={onEndReached}
                ListFooterComponent={isLoading ? <Loading/> : null}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh}/>}
            />
        );
    }
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
});