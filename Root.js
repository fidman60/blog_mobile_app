import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import LatestPosts from "./app/screens/homeTab/LatestPosts";
import PostDetails from "./app/screens/PostDetails";
import Header from "./app/components/Header";
import Favorites from "./app/screens/homeTab/FavoritePosts";
import SignIn from "./app/screens/auth/SignIn";
import SignUp from "./app/screens/auth/SignUp";
import AuthLoading from "./app/screens/auth/AuthLoading";
import SideMenu from "./app/components/SideMenu";
import {Icon} from "react-native-elements";
import MyViewedPosts from "./app/screens/homeTab/MyViewedPosts";
import Test from "./app/screens/Test";
import {transitionApp, transitionAppConfig} from "./app/animations/AppTransationNavigation";
import {transitionAuth, transitionAuthConfig} from "./app/animations/AuthTransitionNavigation";
import {createFluidNavigator} from "react-navigation-fluid-transitions";
import CommentsScreen from "./app/components/comments/CommentsScreen";
import {Animated, Easing} from 'react-native';
import Menu from "./app/screens/my_account/Menu";


const TabNavigation = createMaterialTopTabNavigator({
    LatestPosts: {
        screen: LatestPosts,
        navigationOptions: {
            title: 'LATEST',
            tabBarIcon: () => (
                <Icon
                    raised
                    type="font-awesome"
                    name="list"
                    size={12}
                    color="red"
                />
            )
        }
    },
    MyViewedPosts: {
        screen: MyViewedPosts,
        navigationOptions: {
            title: 'VIEWED',
            tabBarIcon: () => (
                <Icon
                    raised
                    type="font-awesome"
                    name="eye"
                    size={12}
                    color="red"
                />
            )
        }
    },
    Favorites: {
        screen: Favorites,
        navigationOptions: {
            title: 'FAVORITES',
            tabBarIcon: () => (
                <Icon
                    raised
                    type="font-awesome"
                    name="heart"
                    size={12}
                    color="red"
                />
            )
        }
    },
}, {
    lazy: true,
    tabBarOptions: {
        style: {
            backgroundColor: 'red',
        },
        labelStyle: {
            fontWeight: 'bold'
        },
        showLabel: true,
        indicatorStyle: {
            backgroundColor: 'white',
            height: 3
        },
        swipeEnabled: true,
        showIcon: false,
    }
});

const PostDetailsStackNav = createFluidNavigator({
    PostDetailsScreen: {
        screen: PostDetails,
    },
    CommentsScreen: CommentsScreen,
}, {
    initialRouteName: "PostDetailsScreen",
    navigationOptions: {
        header: null,
    },
    transitionAppConfig: {
        duration: 200,
        timing: Animated.timing,
        easing: Easing.easing,
    },
    /*
    navigationOptions: ({navigation}) => ({
        title: "Post details",
        headerStyle: {
            backgroundColor: "rgba(255,255,255,0.8)",
        },
        headerTransparent: true,
        headerLeft: (<BackBtn navigation={navigation}/>),
    })*/
});

const HomeStackNavigation = createStackNavigator({
    Home: {
        screen: TabNavigation,
        navigationOptions: ({navigation}) => ({
            title: 'Posts list',
            header: <Header navigation={navigation}/>
        })
    },
    PostDetails: {
        screen: PostDetails,
        navigationOptions: {
            header: null
        }
    }
},{
    initialRouteName: "Home",
    transitionConfig: () => {
        return {
            transactionSpec: transitionAppConfig,
            screenInterpolator: transitionApp
        }
    }
});

const AuthStackNavigation = createStackNavigator({
    SignIn: {
        screen: SignIn,
        navigationOptions: ({navigation}) => ({
            title: 'Login',
            header: null,
        })
    },
    SignUp: {
        screen: SignUp,
        navigationOptions: ({navigation}) => ({
            title: 'Register',
            header: null,
        })
    }
}, {
    initialRouteName: "SignIn",
    transitionConfig: () => {
        return {
            transactionSpec: transitionAuthConfig,
            screenInterpolator: transitionAuth
        }
    }
});

const MyAccount = createStackNavigator({
    Menu: {
        screen: Menu,
        navigationOptions: ({navigation}) => ({
            title: "My account",
            header: null
        })
    }
},{
    initialRouteName: "Menu",
    transitionConfig: () => {
        return {
            transactionSpec: transitionAppConfig,
            screenInterpolator: transitionApp
        }
    }
});

const DrawerNavigation = createDrawerNavigator({
    HomeStackNavigation: {
        screen: HomeStackNavigation,
        navigationOptions: {
            drawerLabel: "Posts"
        }
    },
    MyAccount: {
        screen: MyAccount,
        navigationOptions: {
            drawerLabel: "My account"
        }
    },
    Test: {
        screen: Test,
        navigationOptions: {
            drawerLabel: "Posts"
        }
    },
}, {
    contentComponent: SideMenu,
    contentOptions: {
        style: {
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
        }
    },
    drawerBackgroundColor: "transparent"
});

const switchNavigation = createSwitchNavigator({
    AuthLoading: AuthLoading,
    App: DrawerNavigation,
    Auth: AuthStackNavigation,
}, {
    initialRouteName: "AuthLoading"
});

export default createAppContainer(switchNavigation);
