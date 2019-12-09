import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from "react-native-gesture-handler";
import Comment from "./Comment";
import Loading from "../Loading";
import Alert from '../Alert';

export default class Comments extends React.PureComponent {

    componentWillUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void {
        console.log("comments will update");
    }

    _renderSeparator = () => <View style={styles.delimiter}/>;

    _renderItem = ({item}) => <Comment comment={item} token={this.props.token} user={this.props.user}/>;

    _keyExtractor = (item) => item.id.toString();

    _emptyListComponent = () => <Alert status="info" text="There's no comment here" />;

    render(){
        const {comments, loading, onEndReached} = this.props;
        return (
            <FlatList
                data={comments}
                renderItem={this._renderItem}
                extraData={this.props}
                keyExtractor={this._keyExtractor}
                ItemSeparatorComponent={this._renderSeparator}
                onEndReachedThreshold={0.01}
                onEndReached={onEndReached}
                ListFooterComponent={loading ? <Loading/> : null}
                ListEmptyComponent={this._emptyListComponent}
            />
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    delimiter: {
        height: 10,
    }
});