import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SharperksMainPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [likedDeals, setLikedDeals] = useState(new Set());

  const categories = [
    { name: 'All', icon: 'grid', colors: ['#000000', '#1a1a1a'] },
    { name: 'Food', icon: 'coffee', colors: ['#2d3748', '#4a5568'] },
    { name: 'Shopping', icon: 'shopping-bag', colors: ['#2b6cb0', '#3182ce'] },
    { name: 'Travel', icon: 'map-pin', colors: ['#38a169', '#48bb78'] },
    { name: 'Gas', icon: 'truck', colors: ['#d69e2e', '#ecc94b'] },
    { name: 'Entertainment', icon: 'play-circle', colors: ['#e53e3e', '#f56565'] }
  ];

  const deals = [
    {
      id: 1,
      merchant: 'Starbucks',
      cashback: '5.0%',
      category: 'Food',
      icon: 'coffee',
      colors: ['#1a365d', '#2d3748'],
      savings: '$23.50',
      popularity: 'Trending',
      isNew: true,
      likes: 1247,
      description: 'Premium coffee rewards'
    },
    {
      id: 2,
      merchant: 'Shein',
      cashback: '8.0%',
      category: 'Shopping',
      icon: 'shopping-bag',
      colors: ['#553c9a', '#6b46c1'],
      savings: '$45.20',
      popularity: 'Hot',
      isNew: false,
      likes: 2841,
      description: 'Fashion forward deals'
    },
    {
      id: 3,
      merchant: 'Uber Eats',
      cashback: '4.0%',
      category: 'Food',
      icon: 'truck',
      colors: ['#2d3748', '#4a5568'],
      savings: '$12.80',
      popularity: 'Popular',
      isNew: false,
      likes: 892,
      description: 'Food delivery rewards'
    },
    {
      id: 4,
      merchant: 'Spotify',
      cashback: '3.0%',
      category: 'Entertainment',
      icon: 'headphones',
      colors: ['#38a169', '#48bb78'],
      savings: '$5.99',
      popularity: 'Steady',
      isNew: false,
      likes: 1456,
      description: 'Music streaming cashback'
    },
    {
      id: 5,
      merchant: 'Target',
      cashback: '3.5%',
      category: 'Shopping',
      icon: 'target',
      colors: ['#e53e3e', '#f56565'],
      savings: '$31.75',
      popularity: 'Trending',
      isNew: false,
      likes: 1689,
      description: 'Everything store rewards'
    },
    {
      id: 6,
      merchant: 'DoorDash',
      cashback: '6.0%',
      category: 'Food',
      icon: 'map-pin',
      colors: ['#d69e2e', '#ecc94b'],
      savings: '$18.45',
      popularity: 'Hot',
      isNew: true,
      likes: 743,
      description: 'Food delivery premium'
    }
  ];

  const filteredDeals = deals.filter(deal => 
    (selectedCategory === 'All' || deal.category === selectedCategory) &&
    deal.merchant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleLike = (dealId) => {
    const newLiked = new Set(likedDeals);
    if (newLiked.has(dealId)) {
      newLiked.delete(dealId);
    } else {
      newLiked.add(dealId);
    }
    setLikedDeals(newLiked);
  };

  const CategoryButton = ({ category, isSelected, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.categoryButton}>
      <View style={[
        styles.categoryContainer,
        isSelected ? styles.categorySelected : styles.categoryDefault
      ]}>
        <Icon 
          name={category.icon} 
          size={16} 
          color={isSelected ? '#ffffff' : '#6b7280'} 
        />
        <Text style={[
          styles.categoryText,
          isSelected ? styles.categoryTextSelected : styles.categoryTextDefault
        ]}>
          {category.name}
        </Text>
      </View>
      {isSelected && (
        <LinearGradient
          colors={category.colors}
          style={styles.categoryGradientOverlay}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      )}
    </TouchableOpacity>
  );

  const DealCard = ({ deal }) => (
    <View style={styles.dealCard}>
      <View style={styles.dealHeader}>
        <View style={styles.dealInfo}>
          <View style={styles.dealIconContainer}>
            <LinearGradient
              colors={deal.colors}
              style={styles.dealIcon}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Icon name={deal.icon} size={20} color="#ffffff" />
            </LinearGradient>
          </View>
          <View style={styles.dealDetails}>
            <View style={styles.dealTitleRow}>
              <Text style={styles.dealMerchant}>{deal.merchant}</Text>
              {deal.isNew && (
                <View style={styles.newBadge}>
                  <Text style={styles.newBadgeText}>NEW</Text>
                </View>
              )}
            </View>
            <Text style={styles.dealDescription}>{deal.description}</Text>
            <View style={styles.popularityContainer}>
              <View style={styles.popularityDot} />
              <Text style={styles.popularityText}>{deal.popularity}</Text>
            </View>
          </View>
        </View>
        <View style={styles.cashbackContainer}>
          <Text style={styles.cashbackText}>{deal.cashback}</Text>
          <Text style={styles.cashbackLabel}>cashback</Text>
        </View>
      </View>

      <View style={styles.dealFooter}>
        <View style={styles.savingsContainer}>
          <Text style={styles.savingsAmount}>{deal.savings}</Text>
          <Text style={styles.savingsLabel}>total saved</Text>
        </View>
        <View style={styles.dealActions}>
          <TouchableOpacity
            onPress={() => toggleLike(deal.id)}
            style={[
              styles.actionButton,
              likedDeals.has(deal.id) ? styles.likedButton : styles.unlikedButton
            ]}
          >
            <Icon 
              name="heart" 
              size={14} 
              color={likedDeals.has(deal.id) ? '#e53e3e' : '#9ca3af'}
              fill={likedDeals.has(deal.id) ? '#e53e3e' : 'none'}
            />
            <Text style={[
              styles.actionButtonText,
              likedDeals.has(deal.id) ? styles.likedButtonText : styles.unlikedButtonText
            ]}>
              {deal.likes}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="share-2" size={14} color="#9ca3af" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header */}
      <LinearGradient
        colors={['#000000', '#1a1a1a']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <View style={styles.logoContainer}>
              <Icon name="zap" size={20} color="#ffffff" />
            </View>
            <View>
              <Text style={styles.appTitle}>Sharperks</Text>
              <Text style={styles.appSubtitle}>Earn smarter</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.earningsContainer}>
              <Text style={styles.earningsText}>$247.50</Text>
              <Text style={styles.earningsLabel}>earned</Text>
            </View>
            <View style={styles.profileContainer}>
              <Icon name="user" size={16} color="#9ca3af" />
            </View>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={18} color="#6b7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search deals..."
            placeholderTextColor="#6b7280"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>
      </LinearGradient>

      {/* Categories */}
      <View style={styles.categoriesSection}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <CategoryButton
              key={category.name}
              category={category}
              isSelected={selectedCategory === category.name}
              onPress={() => setSelectedCategory(category.name)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>28</Text>
          <Text style={styles.statLabel}>Active deals</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: '#38a169' }]}>$1,247</Text>
          <Text style={styles.statLabel}>Total saved</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: '#e53e3e' }]}>12</Text>
          <Text style={styles.statLabel}>Day streak</Text>
        </View>
      </View>

      {/* Deals Feed */}
      <View style={styles.feedHeader}>
        <Text style={styles.feedTitle}>Available Deals</Text>
        <View style={styles.feedCounter}>
          <View style={styles.liveDot} />
          <Text style={styles.feedCounterText}>{filteredDeals.length} live</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.dealsContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.dealsContent}
      >
        {filteredDeals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIconActive}>
            <Icon name="home" size={18} color="#000000" />
          </View>
          <Text style={styles.navLabelActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="heart" size={18} color="#9ca3af" />
          <Text style={styles.navLabel}>Saved</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="bar-chart-2" size={18} color="#9ca3af" />
          <Text style={styles.navLabel}>Analytics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="user" size={18} color="#9ca3af" />
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  appSubtitle: {
    fontSize: 13,
    color: '#9ca3af',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  earningsContainer: {
    alignItems: 'flex-end',
    marginRight: 16,
  },
  earningsText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: -0.3,
  },
  earningsLabel: {
    color: '#9ca3af',
    fontSize: 11,
    marginTop: 1,
  },
  profileContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#ffffff',
  },
  categoriesSection: {
    backgroundColor: '#ffffff',
    paddingVertical: 20,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
  },
  categoriesContent: {
    paddingRight: 20,
  },
  categoryButton: {
    marginRight: 12,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 24,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
  },
  categorySelected: {
    backgroundColor: '#000000',
  },
  categoryDefault: {
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  categoryGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 24,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  categoryTextSelected: {
    color: '#ffffff',
  },
  categoryTextDefault: {
    color: '#64748b',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
    backgroundColor: '#ffffff',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  feedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  feedTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    letterSpacing: -0.3,
  },
  feedCounter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22c55e',
    marginRight: 6,
  },
  feedCounterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },
  dealsContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  dealsContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  dealCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  dealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  dealInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  dealIconContainer: {
    marginRight: 16,
  },
  dealIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dealDetails: {
    flex: 1,
  },
  dealTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  dealMerchant: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginRight: 8,
    letterSpacing: -0.2,
  },
  newBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: '#000000',
    borderRadius: 8,
  },
  newBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  dealDescription: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 8,
  },
  popularityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularityDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#64748b',
    marginRight: 6,
  },
  popularityText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
  },
  cashbackContainer: {
    alignItems: 'flex-end',
  },
  cashbackText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000000',
    letterSpacing: -0.5,
  },
  cashbackLabel: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '500',
    marginTop: 2,
  },
  dealFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  savingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  savingsAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#059669',
    marginRight: 6,
    letterSpacing: -0.2,
  },
  savingsLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  dealActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginLeft: 8,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  likedButton: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
  },
  unlikedButton: {
    backgroundColor: '#f8fafc',
    borderColor: '#e2e8f0',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  likedButtonText: {
    color: '#e53e3e',
  },
  unlikedButtonText: {
    color: '#64748b',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navIconActive: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  navLabelActive: {
    fontSize: 11,
    fontWeight: '600',
    color: '#000000',
  },
  navLabel: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 4,
    fontWeight: '500',
  },
});


export default SharperksMainPage;
