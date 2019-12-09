import React from "react";
import {View, FlatList, Dimensions} from "react-native";
import HorizontalPostItem from "./post_items/HorizontalPostItem";

const {width} = Dimensions.get("window");

export default class HorizontalFlatList extends React.PureComponent {

    _keyExtractor = item => item.id.toString();

    render(){
        const {posts} = this.props;

        // i have to use ScrollView instead
        return (
            <FlatList
                renderItem={({item}) => (
                    <HorizontalPostItem
                        post={item}
                    />
                )}
                data={posts}
                keyExtractor={this._keyExtractor}
                horizontal={true}
                decelerationRate={0}
                snapToInterval={width - 50}
                snapToAlignment={"center"}
            />
        );
    }

}