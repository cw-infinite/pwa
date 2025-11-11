import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

import { StyleSheet,View, Text, ScrollView,TouchableOpacity,
  TextInput, FlatList, ActivityIndicator, Image
 } from "react-native";
import { getCashbackDeals } from '../utils/dealsApi';

export default function Index({ navigation }) {

  const [deals, setDeals] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();


  const filterDeals = (query, category) => {
    let filtered = deals;
    
    // Filter by search query if provided
    if (query) {
      filtered = filtered.filter((deal) => 
        deal.merchant.toLowerCase().includes(query.toLowerCase()) ||
        deal.description.toLowerCase().includes(query.toLowerCase()) ||
        deal.category.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Filter by category if not 'All'
    if (category !== 'All') {
      filtered = filtered.filter((deal) => deal.category === category);
    }
    
    setFilteredDeals(filtered);
  };

  const getCategories = () => {
    const categories = new Set(deals.map(deal => deal.category));
    return ['All', ...Array.from(categories)];
  };

  const renderCategoryFilter = () => {
    const categories = getCategories();
    
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryFilterContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryFilterItem,
              activeFilter === category && styles.activeFilterItem,
            ]}
            onPress={() => setActiveFilter(category)}
          >
            <Text
              style={[
                styles.categoryFilterText,
                activeFilter === category && styles.activeFilterText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

  const renderDealItem = ({ item }) => (
    <TouchableOpacity style={perplex.item}
      onPress={() => router.push({
        pathname: '/cashback',
        params: { id: item.id},
      })}
      >
       {/* <View style={styles.dealHeader}>
        <View style={styles.merchantContainer}>
          <Text style={styles.merchantName}>{item.merchant}</Text>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        </View>
        <Text style={styles.cashbackAmount}>{item.cashbackPercent}% Cash Back</Text>
      </View>
      
      <Text style={styles.dealDescription} numberOfLines={2}>
        {item.description}
      </Text>
      
      <View style={styles.dealFooter}>
        {item.expiryDate && (
          <Text style={styles.expiryDate}>
            Expires: {item.expiryDate}
          </Text>
        )}
        <Text style={styles.viewDetailsText}>View Details →</Text>
      </View> */}
      <Image style={perplex.logo} />
      <View style={perplex.info}>
        <View style={perplex.header}>
          <View style={perplex.header}>
            <Text style={perplex.merchant}>{item.merchant}</Text>
            <Image source={require('../../assets/images/cards/bankofamericared.jpg')} style={perplex.card} />
          </View>
          <Text style={styles.cashbackAmount}>
            {item.cashbackPercent}% Cash Back
          </Text>
        </View>
        <Text style={perplex.description} numberOfLines={1}>{item.description}</Text>
        <View style={styles.dealFooter}>
          {item.expiryDate && (
            <Text style={styles.expiryDate}>
              Expires: {item.expiryDate}
            </Text>
          )}
          <Text style={styles.viewDetailsText}>View Details →</Text>
        </View>
        {/* <Text style={perplex.expiry}>Expires: {item.expiryDate}</Text> */}
        {/* <Text style={perplex.category}>Category: category</Text> */}
      </View>
    </TouchableOpacity> 
      
     
  );

  const renderNoResults = () => (
    <View style={styles.noResultsContainer}>
      <Feather name="search" size={50} color="#CCCCCC" />
      <Text style={styles.noResultsText}>No matching deals found</Text>
      <Text style={styles.noResultsSubtext}>
        Try adjusting your search or filters
      </Text>
    </View>
  );


  useEffect(() => {
    //       const dealsData = getCashbackDeals();

    // setDeals(dealsData);
    // setFilteredDeals(dealsData);
    //       setIsLoading(false);

    const loadDeals = async () => {
      try {
        // Simulating API call delay
        setTimeout(() => {
          const dealsData = getCashbackDeals();
          setDeals(dealsData);
          setFilteredDeals(dealsData);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error loading deals:', error);
        setIsLoading(false);
      }
    };

    loadDeals();

  }, []);

  useEffect(() => {
    filterDeals(searchQuery, activeFilter);
  }, [searchQuery, activeFilter]);

  return (
      <View style={{flex: 1, justifyContent: 'center', alignItems:'center' } }>
        <Text style={{fontSize: 40}}>Rebuilding 😊</Text>
      </View>
      // <View style={styles.dealCard}>
      //   {/* Filters */}
      //   {renderCategoryFilter()}

      //   {/* Search */}
      //   <View style={styles.searchContainer}>
      //     <Feather name="search" size={20} color="#141414" style={styles.searchIcon} />
      //     <TextInput
      //       style={styles.searchInput}
      //       placeholder="Search deals by merchant or category"
      //       value={searchQuery}
      //       onChangeText={setSearchQuery}
      //       placeholderTextColor="#4e4e4e"
      //     />
      //     {searchQuery.length > 0 && (
      //       <TouchableOpacity onPress={() => setSearchQuery('')}>
      //         <Feather name="x" size={20} color="#666666" />
      //       </TouchableOpacity>
      //     )}
      //   </View>

      //   {isLoading ? (
      //     <View style={styles.loadingContainer}>
      //       <ActivityIndicator size="large" color="#000000" />
      //       <Text style={styles.loadingText}>Loading deals...</Text>
      //     </View>
      //   ) : filteredDeals.length === 0 ? (
      //     renderNoResults()
      //   ) : (
      //     <FlatList
      //       data={filteredDeals}
      //       keyExtractor={(item) => item.id.toString()}
      //       renderItem={renderDealItem}
      //       contentContainerStyle={styles.dealsList}
      //       showsVerticalScrollIndicator={false}
      //     />
      //   )}

      // </View>
  )
}

const perplex = StyleSheet.create({
  item: {
    flexDirection:"row",
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    marginBottom: 2
  },
  headerCashback: {
  },
  logo: {
    backgroundColor: 'black',
    width: 40,
    height: 40,
    borderRadius: 12,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  merchant: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 18,
  },
  category: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
  description: {
    color: '#333',
    fontSize: 14,
    marginTop: 4,
  },
  expiry: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
  },
  card: {

    width: 30,
    height: 20,
    marginLeft: 8,
  }
});

const styles = StyleSheet.create({
  categoryFilterContainer: {
    height: 80,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#eeeeee',

  },
  categoryFilterItem: {
    height: 40,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginHorizontal: 5,
    backgroundColor: '#dfdddd',
    borderRadius: 20,
    justifyContent: 'center',
  },
  categoryFilterText: {
    fontSize: 16,
    fontWeight: 700,
    color: '#242424',
  },
// Search
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    margin: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  // Deals
  dealsList: {
    padding: 15,
  },
  dealItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  merchantContainer: {
    flex: 1,
  },
  merchantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  categoryTag: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 12,
    color: '#666666',
  },
  cashbackAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#01a368',
  },
  dealDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 15,
    lineHeight: 20,
  },
  dealFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expiryDate: {
    fontSize: 12,
    color: '#999999',
  },
  viewDetailsText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: 'bold',
  },
});