import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from "react-native-gesture-handler";
import Loading from "../Loading";
import Reply from "./Reply";
import Alert from "../Alert";

export default class Replies extends React.PureComponent {

    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            replies: [],
        };
    }

    _renderSeparator = () => <View style={styles.delimiter}/>;

    _renderItem = ({item}) => <Reply reply={item} />;

    _keyExtractor = (item) => item.id.toString();

    render(){
        const {replies, isLoading, onEndReached} = this.props;
        return (
            <View style={styles.container}>
                <FlatList
                    data={replies}
                    renderItem={this._renderItem}
                    extraData={this.props}
                    keyExtractor={this._keyExtractor}
                    ItemSeparatorComponent={this._renderSeparator}
                    onEndReachedThreshold={0.01}
                    onEndReached={onEndReached}
                    ListFooterComponent={isLoading ? <Loading/> : replies.length > 0 ? null : <Alert status="info" text="There's no reply for this comment"/>}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        maxHeight: 200,
        padding: 10,
    },
    delimiter: {
        height: 10,
    }
});