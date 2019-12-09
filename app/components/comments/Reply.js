import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import moment from "moment";
import ImageAvatar from "../avatar/ImageAvatar";

export default class Reply extends React.PureComponent {

    constructor(props){
        super(props);

        this.state = {
            showReplyInput: true,
            showReplies: false,
        };

        const {reply} = props;
        this.timeAgo = moment(reply.created_at).fromNow();
        this.fullName = reply.fname + " " + reply.lname;
    }

    render(){
        const {reply} = this.props;
        return (
            <View style={styles.container}>
                <ImageAvatar userImage={reply.image} small={true}/>
                <View style={styles.commentDetails}>
                    <View style={styles.commentDetailsSection}>
                        <Text style={styles.firstLineText}>
                            {this.fullName}   <Text style={styles.timeAgo}>{this.timeAgo}</Text>
                        </Text>
                        <Text style={styles.commentContent}>
                            {reply.response}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        marginBottom: 10,
    },
    firstLineText: {
        fontWeight: "bold",
        fontSize: 10,
    },
    timeAgo: {
        color: "grey"
    },
    commentDetails: {
        borderWidth: 1,
        borderColor: "grey",
        flex: 1,
        marginLeft: 10,
    },
    commentContent: {
        marginTop: 10,
        marginBottom: 10,
    },
    commentDetailsSection: {
        padding: 10,
    }
});