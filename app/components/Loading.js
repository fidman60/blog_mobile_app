import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';

const Loading = (props) => {

    return (
        <ActivityIndicator
            size="large"
            color="#c54b89"
            style={styles.main_container}
        />
    )

};

const styles = StyleSheet.create({
    main_container: {
        paddingTop: 10,
        paddingBottom: 10,
    }
});

export default React.memo(Loading);