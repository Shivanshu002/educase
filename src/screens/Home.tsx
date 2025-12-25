import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/slices/authSlice';
import Products from './Products';
import { useEffect, useMemo, useState } from 'react';
import { getProducts } from '../redux/thunks/productThunk';
import { Ionicons } from 'react-native-vector-icons/Ionicons';

const PAGE_SIZE = 6;

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { products, loading } = useSelector(
    (state: RootState) => state.product
  );

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!products.length) {
      dispatch(getProducts() as any);
    }
  }, []);

  const onLogout = () => {
    dispatch(logout());
  };

  const searchedProducts = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return products.filter((p: any) =>
      p.title.toLowerCase().includes(q) ||
      p.brand?.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }, [search, products]);

  const paginatedProducts = useMemo(() => {
    return products.slice(0, page * PAGE_SIZE);
  }, [products, page]);

  const loadMore = () => {
    if (page * PAGE_SIZE < products.length) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Welcome</Text>
          <Text style={styles.username}>
            {user?.firstName || 'User'} {user?.lastName}
          </Text>
        </View>

        <TouchableOpacity onPress={onLogout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchBox}>
        <Ionicons
          name="search"
          size={20}
          color="#6B7280"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search by title, brand or category"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
          placeholderTextColor="#6B7280"
        />
      </View>
      {search.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Search Results</Text>
          <Products products={searchedProducts} loading={loading} />
        </>
      )}

      {search.length === 0 && (
        <>
          <Text style={styles.sectionTitle}>All Products</Text>
          <Products
            products={paginatedProducts}
            loading={loading}
            onEndReached={loadMore}
          />
        </>
      )}

    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2EAFF',
  },
  header: {
    backgroundColor: '#1646e4',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  welcome: {
    color: '#fff',
    fontSize: 14,
  },
  username: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  logoutText: {
    color: '#1646e4',
    fontWeight: 'bold',
  },
  searchBox: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
  },
  sectionTitle: {
    marginHorizontal: 12,
    marginVertical: 8,
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
});
