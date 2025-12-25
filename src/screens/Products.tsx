import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import React from 'react';

const PRIMARY_BLUE = '#2563EB';
const GRAY = '#6B7280';
const LIGHT_GRAY = '#F3F4F6';

const Products = ({ products, loading, onEndReached }: any) => {

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={PRIMARY_BLUE} />
      </View>
    );
  }

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.brand}>{item.brand}</Text>

        <View style={styles.row}>
          <Text style={styles.price}>₹{item.price}</Text>
          <Text style={styles.discount}>
            {item.discountPercentage}% off
          </Text>
        </View>

        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

export default Products;

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  loader: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 10,
    elevation: 3,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
    backgroundColor: LIGHT_GRAY,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  brand: {
    fontSize: 13,
    color: GRAY,
    marginVertical: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: PRIMARY_BLUE,
    marginRight: 8,
  },
  discount: {
    fontSize: 12,
    color: '#16A34A',
    fontWeight: '600',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 6,
  },
  categoryText: {
    fontSize: 11,
    color: '#374151',
    fontWeight: '600',
  },
});
