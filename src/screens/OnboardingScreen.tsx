import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions,
} from 'react-native';
import { slides } from '../utils/slides';

const { width } = Dimensions.get('window');


const OnboardingScreen = ({ navigation }: any) => {
    const flatListRef = useRef<any>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            flatListRef.current.scrollToIndex({
                index: currentIndex + 1,
            });
        } else {
            navigation.navigate('Login');
        }
    };

    const renderItem = ({ item }: any) => (
        <View style={[styles.slide, { backgroundColor: item.bgColor }]}>
            <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} resizeMode="contain" />
            </View>
            <View style={styles.card}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.dotsContainer}>
                    {slides.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                currentIndex === index && styles.activeDot,
                            ]}
                        />
                    ))}
                </View>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: item.bgColor }]}
                    onPress={handleNext}
                >
                    <Text style={styles.buttonText}>Join the movement</Text>
                </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <FlatList
            ref={flatListRef}
            data={slides}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            onMomentumScrollEnd={(event) => {
                const index = Math.round(
                    event.nativeEvent.contentOffset.x / width
                );
                setCurrentIndex(index);
            }}
        />
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    slide: {
        width: width,
        flex: 1,
    },

    imageContainer: {
        flex: 1.2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        width: '100%',
        height: '100%',
    },

    card: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 25,
        alignItems: 'center',
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },

    description: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },

    dotsContainer: {
        flexDirection: 'row',
        marginBottom: 25,
    },

    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ccc',
        marginHorizontal: 5,
    },

    activeDot: {
        backgroundColor: '#000',
    },

    button: {
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 30,
        marginBottom: 15,
    },

    buttonText: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 18,
    },

    loginText: {
        fontSize: 14,
        textDecorationLine: 'underline',
    },
});