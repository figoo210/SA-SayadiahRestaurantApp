import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from "../assets/styles";
import {Text} from "react-native-paper"; // or '@expo/vector-icons/MaterialCommunityIcons' for Expo


// Get the device width to make the button responsive
const deviceWidth = Dimensions.get('window').width;
const starSize = deviceWidth * 0.1;

const RatingField = ({ initialRating = 0, onRatingChange, disable = false, title = 'Rating 1' }) => {
    const [rating, setRating] = useState(initialRating);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
        if (onRatingChange) {
            onRatingChange(newRating);
        }
    };

    return (
        <View style={styles.ratingFieldCard}>
            <Text style={styles.ratingFieldTitle}>{title}</Text>
            <View style={styles.ratingFieldContainer}>
                {[...Array(5).keys()].map((index) => (
                    <TouchableOpacity key={index} onPress={() => handleRatingChange(index + 1)} disabled={disable}>
                        <Icon
                            name={index < rating ? 'star' : 'star-outline'}
                            size={starSize}
                            color={index < rating ? '#FDCC0D' : '#D9D9D9'}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default RatingField;
