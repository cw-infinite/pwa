import React, { useState, useEffect } from 'react';

import { Feather } from '@expo/vector-icons';

import { StyleSheet,View, Text, ScrollView,TouchableOpacity,
  TextInput, FlatList, ActivityIndicator, Image
 } from "react-native";
import { getCashbackDeals } from '../utils/dealsApi';

export default function Index() {

  const [deals, setDeals] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);


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
    <TouchableOpacity
      style={styles.dealItem}
      // onPress={() => navigation.navigate('DealDetails', { deal: item })}
    >
      <View style={styles.dealHeader}>
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
      <View style={styles.dealCard}>
        {/* Filters */}
        {renderCategoryFilter()}

        {/* Search */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#141414" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search deals by merchant or category"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#4e4e4e"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Feather name="x" size={20} color="#666666" />
            </TouchableOpacity>
          )}
        </View>

        <View style={cards.dealCard2}>
          <View style={cards.item}>
          <Image style={cards.logo} />
          <View style={cards.info}>
            <Text style={cards.merchant}>Merchat name</Text>
            <Text style={cards.description}>Description</Text>
            <View style={cards.metaRow}>
              <Text style={cards.category}>Category</Text>
              <Text style={cards.expiration}>Expires: </Text>
            </View>
          </View>
          <Image source={require('../../assets/images/cards/bankofamericared.jpg')} style={cards.cardImage} />
        </View>
        </View>

        <TouchableOpacity style={perplex.item}>
          <Image style={perplex.logo} />
          <View style={perplex.info}>
            <Text style={perplex.merchant}>Merchenat</Text>
            <Text style={perplex.category}>Category: category</Text>
            <Text style={perplex.description}>desc</Text>
            <Text style={perplex.expiry}>Expires: </Text>
          </View>
          <Image source={require('../../assets/images/cards/bankofamericared.jpg')} style={perplex.card} />
        </TouchableOpacity>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#000000" />
            <Text style={styles.loadingText}>Loading deals...</Text>
          </View>
        ) : filteredDeals.length === 0 ? (
          renderNoResults()
        ) : (
          <FlatList
            data={filteredDeals}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderDealItem}
            contentContainerStyle={styles.dealsList}
            showsVerticalScrollIndicator={false}
          />
        )}

      </View>
  )
}

const perplex = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logo: {
    backgroundColor: 'black',
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  merchant: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 16,
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

const cards = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  list: {
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  logo: {
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  merchant: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  description: {
    color: '#ccc',
    fontSize: 13,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  category: {
    color: '#888',
    fontSize: 12,
    fontStyle: 'italic',
  },
  expiration: {
    color: '#888',
    fontSize: 12,
  },
  cardImage: {
    backgroundColor: 'white',
    width: 32,
    height: 20,
    marginLeft: 8,
    resizeMode: 'contain',
  },
});

const styles = StyleSheet.create({
  dealCard2: {
    flex: 1,
    backgroundColor: '#000',
  },
  dealAvatar: {
    backgroundColor: 'blue',
    
    width: 50,
    height: 50,
    borderRadius: 20,
    marginRight: 16,
    flexShrink: 0
  },
  dealMain: {
    backgroundColor: 'yellow',
    flex: 1,
  },
  dealHeading: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '6px'
  },
  dealMerchantName: {
    fontSize: 16,
    fontWeight: 600,
    backgroundColor: '#eeeeee',
  },
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
    color: '#000000',
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00A86B',
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