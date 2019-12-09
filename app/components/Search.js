import React from 'react';
import {Animated, Dimensions, Easing, StyleSheet, View, Alert} from "react-native";
import {HEADER_HEIGHT} from "./Header";
import {Button, Icon, SearchBar} from "react-native-elements";
import {connect} from "react-redux";
import {closeModal, toggleModalAction} from "../redux/actions/searchAction";
import {searchForPosts} from "../services/BlogAPI";
import PostItem from "./post_items/PostItem";
import {FlatList} from 'react-native-gesture-handler';
import Alerto from './Alert';


const {width, height} = Dimensions.get('window');
const SEARCH_RESULTS_HEIGHT = height - HEADER_HEIGHT;

class Search extends React.PureComponent{

    constructor(props){
        super(props);

        this.state = {
            search: "",
            isSearching: false,
            posts: [],
        };

        this.searchContentTransY = new Animated.Value(0);
        this.searchInputTransY = new Animated.Value(0);

        this.opacity = this.searchContentTransY.interpolate({
            inputRange: [-SEARCH_RESULTS_HEIGHT, 0],
            outputRange: [1, 0]
        });
    }

    componentDidUpdate() {
        this._runAnimation();
    }

    _runAnimation(){
        Animated.parallel([
            Animated.spring(this.searchContentTransY , {
                toValue: this.props.visible ? -SEARCH_RESULTS_HEIGHT : 0,
                friction: 5,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(this.searchInputTransY , {
                toValue: this.props.visible ? HEADER_HEIGHT : 0,
                easing: Easing.ease,
                duration: 400,
                useNativeDriver: true,
            })
        ]).start();
    }

    _onCancel = () => {
        this.props.dispatch(toggleModalAction());
    };

    _onChangeText = (value) => {
        this.setState({search: value});
    };

    _onSearch = () => {
        const {search, isSearching} = this.state;
        const {token} = this.props;

        if (search.length < 1 || isSearching) return;

        this.setState({
            isSearching: true,
            posts: []
        });

        searchForPosts(search, token)
            .then(response => {
                this.setState({
                    posts: response.data,
                    isSearching: false,
                });
            })
            .catch(error => Alert.alert("Sorry, something went wrong ..."));
    };

    _onNavigateToPostDetails = (id) => {

        this.props.navigation.navigate('PostDetails',{
            postId: id,
        });

        this.state.search = "";
        this.state.isSearching = false;
        this.state.posts = [];

        this.props.dispatch(closeModal());
    };

    _onClear = () => this.refs.searchBarRef.clear();

    _onCanceling = () => this.refs.searchBarRef.cancel();

    _renderItem = ({item, index}) => (
        <PostItem
            post={item}
            index={index}
            onPress={this._onNavigateToPostDetails}
        />
    );

    _keyExtractor = (post) => post.id.toString();

    render(){

        const {isSearching, posts, search} = this.state;
        const {charged} = this.props;

        if (charged) return (
            <View style={styles.main_container}>
                <Animated.View style={[styles.input, {opacity: this.opacity, transform: [{translateY: this.searchInputTransY}]}]}>
                    <SearchBar
                        ref='searchBarRef'
                        placeholder="Type Here..."
                        onChangeText={this._onChangeText}
                        value={search}
                        containerStyle={styles.searchInputContainer}
                        inputStyle={styles.inputSearch}
                        inputContainerStyle={styles.inputSearchContainer}
                        platform="android"
                        showLoading={isSearching}
                        onCancel={this._onCancel}
                        onSubmitEditing={this._onSearch}
                        clearIcon={(
                            <Icon
                                name='close'
                                type='evilicon'
                                color='#828f94'
                                onPress={this._onClear}
                            />
                        )}
                        cancelIcon={(
                            <Icon
                                name='arrow-left'
                                type='evilicon'
                                color='#828f94'
                                size={40}
                                onPress={this._onCanceling}
                            />
                        )}
                        searchIcon={(
                            <Icon
                                name='search'
                                type='evilicon'
                                color='#828f94'
                                size={30}
                            />
                        )}
                    />
                    <Button
                        buttonStyle={styles.searchBtn}
                        icon={(
                            <Icon
                                name='search'
                                type='evilicon'
                                color='white'
                            />
                        )}
                        onPress={this._onSearch}
                        disabled={isSearching}
                        disabledStyle={styles.disabledSearchBtn}
                    />
                </Animated.View>
                <Animated.View style={[styles.search, {transform: [{translateY: this.searchContentTransY }]}]}>
                    <FlatList
                        renderItem={this._renderItem}
                        data={posts}
                        keyExtractor={this._keyExtractor}
                        ListEmptyComponent={<Alerto status="info" text="Search for articles"/>}
                    />
                </Animated.View>
            </View>
        );

        return <View/>
    }

}

const mapStateToProps = state => ({
    visible: state.searchReducer.visible,
    charged: state.searchReducer.charged,
    navigation: state.searchReducer.navigation,
    token: state.userReducer.token
});

export default connect(mapStateToProps)(Search);

const styles = StyleSheet.create({
    main_container: {
        width: width,
        height: height,
        position: "absolute",
        top: 0,
        left: 0,
    },
    search: {
        width: width,
        height: SEARCH_RESULTS_HEIGHT,
        position: "absolute",
        top: height,
        left: 0,
        backgroundColor: "white",
        zIndex: 1000,
        padding: 10
    },
    input: {
        position: "absolute",
        top: -HEADER_HEIGHT,
        left: 0,
        width: width,
        height: HEADER_HEIGHT,
        zIndex: 1000,
        flexDirection: "row"
    },
    searchBtn: {
        width: HEADER_HEIGHT,
        height: HEADER_HEIGHT,
        backgroundColor: "#558ed4"
    },
    disabledSearchBtn: {
        backgroundColor: "#1c5aa6"
    },
    searchInputContainer: {
        padding: 0,
        flex: 1,
        justifyContent: "center"
    },
    inputSearch: {
        backgroundColor: "white",
        height: HEADER_HEIGHT,
        color: "#517fa4"
    },
    inputSearchContainer: {
        backgroundColor: "white"
    }
});