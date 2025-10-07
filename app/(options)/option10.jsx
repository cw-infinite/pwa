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
  Modal,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SharperksMainPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [likedDeals, setLikedDeals] = useState(new Set());
  const [sortBy, setSortBy] = useState('cashback');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [selectedDeals, setSelectedDeals] = useState(new Set());

  const categories = [
    { name: 'All', icon: 'grid', colors: ['#8B5CF6', '#A855F7'] },
    { name: 'Food', icon: 'coffee', colors: ['#6366F1', '#8B5CF6'] },
    { name: 'Shopping', icon: 'shopping-bag', colors: ['#7C3AED', '#8B5CF6'] },
    { name: 'Travel', icon: 'map-pin', colors: ['#6366F1', '#7C3AED'] },
    { name: 'Gas', icon: 'truck', colors: ['#8B5CF6', '#A855F7'] },
    { name: 'Entertainment', icon: 'play-circle', colors: ['#7C3AED', '#6366F1'] }
  ];

  const deals = [
    {
      id: 1,
      merchant: 'Starbucks',
      cashback: '5%',
      category: 'Food',
      icon: 'coffee',
      colors: ['#6366F1', '#8B5CF6'],
      savings: '$23.50',
      popularity: 'trending',
      isNew: true,
      likes: 1247,
      description: 'Premium coffee and beverages',
      expiresIn: '2 days',
      minSpend: '$15',
      rating: 4.8,
      terms: 'Valid on all beverages. Not valid with other offers.'
    },
    {
      id: 2,
      merchant: 'Shein',
      cashback: '8%',
      category: 'Shopping',
      icon: 'shopping-bag',
      colors: ['#7C3AED', '#A855F7'],
      savings: '$45.20',
      popularity: 'hot',
      isNew: false,
      likes: 2841,
      description: 'Fashion and lifestyle products',
      expiresIn: '5 days',
      minSpend: '$25',
      rating: 4.2,
      terms: 'Valid on orders over $25. Free shipping included.'
    },
    {
      id: 3,
      merchant: 'Uber Eats',
      cashback: '4%',
      category: 'Food',
      icon: 'truck',
      colors: ['#6366F1', '#7C3AED'],
      savings: '$12.80',
      popularity: 'popular',
      isNew: false,
      likes: 892,
      description: 'Food delivery service',
      expiresIn: '1 day',
      minSpend: '$20',
      rating: 4.5,
      terms: 'Valid on first 3 orders. Delivery fees may apply.'
    },
    {
      id: 4,
      merchant: 'Spotify',
      cashback: '3%',
      category: 'Entertainment',
      icon: 'music',
      colors: ['#8B5CF6', '#6366F1'],
      savings: '$5.99',
      popularity: 'stable',
      isNew: false,
      likes: 1456,
      description: 'Music streaming premium',
      expiresIn: '30 days',
      minSpend: '$9.99',
      rating: 4.9,
      terms: 'Valid on Premium subscriptions only.'
    },
    {
      id: 5,
      merchant: 'Target',
      cashback: '3%',
      category: 'Shopping',
      icon: 'target',
      colors: ['#7C3AED', '#8B5CF6'],
      savings: '$31.75',
      popularity: 'trending',
      isNew: false,
      likes: 1689,
      description: 'Retail and household goods',
      expiresIn: '7 days',
      minSpend: '$50',
      rating: 4.6,
      terms: 'Valid in-store and online. Excludes gift cards.'
    },
    {
      id: 6,
      merchant: 'DoorDash',
      cashback: '6%',
      category: 'Food',
      icon: 'package',
      colors: ['#6366F1', '#A855F7'],
      savings: '$18.45',
      popularity: 'hot',
      isNew: true,
      likes: 743,
      description: 'Restaurant delivery service',
      expiresIn: '3 days',
      minSpend: '$15',
      rating: 4.3,
      terms: 'Valid on orders over $15. Service fees apply.'
    },
    {
      id: 7,
      merchant: 'Netflix',
      cashback: '2%',
      category: 'Entertainment',
      icon: 'play',
      colors: ['#8B5CF6', '#7C3AED'],
      savings: '$3.20',
      popularity: 'stable',
      isNew: false,
      likes: 1834,
      description: 'Streaming entertainment',
      expiresIn: '14 days',
      minSpend: '$8.99',
      rating: 4.7,
      terms: 'Valid on monthly subscriptions.'
    },
    {
      id: 8,
      merchant: 'Amazon',
      cashback: '4%',
      category: 'Shopping',
      icon: 'box',
      colors: ['#6366F1', '#8B5CF6'],
      savings: '$67.80',
      popularity: 'trending',
      isNew: true,
      likes: 3521,
      description: 'Online marketplace',
      expiresIn: '6 days',
      minSpend: '$35',
      rating: 4.4,
      terms: 'Valid on eligible purchases. Prime members only.'
    }
  ];

  const filteredDeals = deals
    .filter(deal => 
      (selectedCategory === 'All' || deal.category === selectedCategory) &&
      deal.merchant.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch(sortBy) {
        case 'cashback':
          return parseFloat(b.cashback) - parseFloat(a.cashback);
        case 'savings':
          return parseFloat(b.savings.replace('$', '')) - parseFloat(a.savings.replace('$', ''));
        case 'popularity':
          return b.likes - a.likes;
        case 'expiry':
          return parseInt(a.expiresIn) - parseInt(b.expiresIn);
        default:
          return 0;
      }
    });

  const toggleLike = (dealId) => {
    const newLiked = new Set(likedDeals);
    if (newLiked.has(dealId)) {
      newLiked.delete(dealId);
    } else {
      newLiked.add(dealId);
    }
    setLikedDeals(newLiked);
  };

  const toggleSelectDeal = (dealId) => {
    const newSelected = new Set(selectedDeals);
    if (newSelected.has(dealId)) {
      newSelected.delete(dealId);
    } else {
      newSelected.add(dealId);
    }
    setSelectedDeals(newSelected);
  };

  const clearSelectedDeals = () => {
    setSelectedDeals(new Set());
  };

  const likeAllSelected = () => {
    const newLiked = new Set(likedDeals);
    selectedDeals.forEach(dealId => newLiked.add(dealId));
    setLikedDeals(newLiked);
  };

  const getPopularityColor = (popularity) => {
    switch(popularity) {
      case 'hot': return '#EF4444';
      case 'trending': return '#F59E0B';
      case 'popular': return '#10B981';
      case 'stable': return '#6B7280';
      default: return '#8B5CF6';
    }
  };

  const CategoryButton = ({ category, isSelected, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.categoryButton}>
      {isSelected ? (
        <LinearGradient
          colors={category.colors}
          style={styles.categoryGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Icon name={category.icon} size={16} color="#ffffff" />
          <Text style={styles.categoryTextSelected}>{category.name}</Text>
        </LinearGradient>
      ) : (
        <View style={styles.categoryDefault}>
          <Icon name={category.icon} size={16} color="#6B7280" />
          <Text style={styles.categoryText}>{category.name}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const DealCard = ({ deal }) => (
    <View style={[styles.dealCard, viewMode === 'list' ? styles.dealCardList : null]}>
      <View style={styles.dealHeader}>
        <View style={styles.dealInfo}>
          <View style={styles.dealLogoContainer}>
            <LinearGradient
              colors={deal.colors}
              style={styles.dealLogo}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Icon name={deal.icon} size={20} color="#ffffff" />
            </LinearGradient>
            {viewMode === 'grid' && (
              <TouchableOpacity
                onPress={() => toggleSelectDeal(deal.id)}
                style={styles.selectButton}
              >
                <Icon 
                  name={selectedDeals.has(deal.id) ? 'check-circle' : 'circle'} 
                  size={16} 
                  color={selectedDeals.has(deal.id) ? '#8B5CF6' : '#D1D5DB'} 
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.dealDetails}>
            <View style={styles.dealTitleRow}>
              <Text style={styles.dealMerchant}>{deal.merchant}</Text>
              {deal.isNew && (
                <View style={styles.newBadge}>
                  <Text style={styles.newBadgeText}>NEW</Text>
                </View>
              )}
              <View style={[styles.popularityBadge, { backgroundColor: getPopularityColor(deal.popularity) + '20' }]}>
                <Text style={[styles.popularityText, { color: getPopularityColor(deal.popularity) }]}>
                  {deal.popularity.toUpperCase()}
                </Text>
              </View>
            </View>
            <Text style={styles.dealDescription}>{deal.description}</Text>
            <View style={styles.dealMeta}>
              <View style={styles.metaItem}>
                <Icon name="star" size={12} color="#F59E0B" />
                <Text style={styles.metaText}>{deal.rating}</Text>
              </View>
              <View style={styles.metaItem}>
                <Icon name="clock" size={12} color="#6B7280" />
                <Text style={styles.metaText}>Expires in {deal.expiresIn}</Text>
              </View>
              <View style={styles.metaItem}>
                <Icon name="dollar-sign" size={12} color="#6B7280" />
                <Text style={styles.metaText}>Min: {deal.minSpend}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.cashbackContainer}>
          <Text style={styles.cashbackText}>{deal.cashback}</Text>
          <Text style={styles.cashbackLabel}>cashback</Text>
          <Text style={styles.savingsAmount}>{deal.savings} saved</Text>
        </View>
      </View>

      <View style={styles.dealActions}>
        <TouchableOpacity
          onPress={() => toggleLike(deal.id)}
          style={[
            styles.actionButton,
            likedDeals.has(deal.id) ? styles.likedButton : null
          ]}
        >
          <Icon 
            name="heart" 
            size={14} 
            color={likedDeals.has(deal.id) ? '#8B5CF6' : '#9CA3AF'}
          />
          <Text style={[
            styles.actionButtonText,
            likedDeals.has(deal.id) ? { color: '#8B5CF6' } : null
          ]}>
            {deal.likes}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="share-2" size={14} color="#9CA3AF" />
          <Text style={styles.actionButtonText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="bookmark" size={14} color="#9CA3AF" />
          <Text style={styles.actionButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.primaryButton]}>
          <LinearGradient
            colors={['#8B5CF6', '#7C3AED']}
            style={styles.primaryButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Icon name="external-link" size={14} color="#ffffff" />
            <Text style={styles.primaryButtonText}>Activate</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );

  const FilterModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={filterModalVisible}
      onRequestClose={() => setFilterModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter & Sort</Text>
            <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
              <Icon name="x" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Sort by</Text>
            {['cashback', 'savings', 'popularity', 'expiry'].map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.filterOption}
                onPress={() => setSortBy(option)}
              >
                <Text style={[styles.filterOptionText, sortBy === option ? styles.filterOptionSelected : null]}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Text>
                {sortBy === option && <Icon name="check" size={16} color="#8B5CF6" />}
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Notifications</Text>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Deal alerts</Text>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#D1D5DB', true: '#C4B5FD' }}
                thumbColor={notificationsEnabled ? '#8B5CF6' : '#9CA3AF'}
              />
            </View>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>View Mode</Text>
            <View style={styles.viewModeContainer}>
              <TouchableOpacity
                style={[styles.viewModeButton, viewMode === 'grid' ? styles.viewModeSelected : null]}
                onPress={() => setViewMode('grid')}
              >
                <Icon name="grid" size={16} color={viewMode === 'grid' ? '#ffffff' : '#6B7280'} />
                <Text style={[styles.viewModeText, viewMode === 'grid' ? { color: '#ffffff' } : null]}>Grid</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.viewModeButton, viewMode === 'list' ? styles.viewModeSelected : null]}
                onPress={() => setViewMode('list')}
              >
                <Icon name="list" size={16} color={viewMode === 'list' ? '#ffffff' : '#6B7280'} />
                <Text style={[styles.viewModeText, viewMode === 'list' ? { color: '#ffffff' } : null]}>List</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <LinearGradient
              colors={['#8B5CF6', '#7C3AED']}
              style={styles.logoContainer}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Icon name="zap" size={20} color="#ffffff" />
            </LinearGradient>
            <View>
              <Text style={styles.appTitle}>Sharperks</Text>
              <Text style={styles.appSubtitle}>Professional Cashback</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.earningsContainer}>
              <Text style={styles.earningsText}>$247.00</Text>
              <Text style={styles.earningsLabel}>earned</Text>
            </View>
            <TouchableOpacity style={styles.profileContainer}>
              <Icon name="user" size={18} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search and Controls */}
        <View style={styles.controlsRow}>
          <View style={styles.searchContainer}>
            <Icon name="search" size={18} color="#9CA3AF" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search deals..."
              placeholderTextColor="#9CA3AF"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setFilterModalVisible(true)}
          >
            <Icon name="sliders" size={18} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Icon name="bell" size={18} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Categories */}
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

      {/* Analytics Dashboard */}
      <View style={styles.analyticsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.analyticsCard}>
            <Icon name="trending-up" size={16} color="#10B981" />
            <Text style={styles.analyticsNumber}>28</Text>
            <Text style={styles.analyticsLabel}>Active Deals</Text>
          </View>
          <View style={styles.analyticsCard}>
            <Icon name="dollar-sign" size={16} color="#8B5CF6" />
            <Text style={styles.analyticsNumber}>$1,247</Text>
            <Text style={styles.analyticsLabel}>Total Saved</Text>
          </View>
          <View style={styles.analyticsCard}>
            <Icon name="calendar" size={16} color="#F59E0B" />
            <Text style={styles.analyticsNumber}>15</Text>
            <Text style={styles.analyticsLabel}>Days Streak</Text>
          </View>
          <View style={styles.analyticsCard}>
            <Icon name="percent" size={16} color="#EF4444" />
            <Text style={styles.analyticsNumber}>6.2%</Text>
            <Text style={styles.analyticsLabel}>Avg Cashback</Text>
          </View>
        </ScrollView>
      </View>

      {/* Deals Header */}
      <View style={styles.dealsHeader}>
        <View style={styles.dealsHeaderLeft}>
          <Text style={styles.dealsTitle}>Available Deals</Text>
          <View style={styles.dealsCounter}>
            <View style={styles.liveDot} />
            <Text style={styles.dealsCounterText}>{filteredDeals.length} live</Text>
          </View>
        </View>
        <View style={styles.dealsHeaderRight}>
          <Text style={styles.sortText}>Sort: {sortBy}</Text>
          <TouchableOpacity>
            <Icon name="refresh-cw" size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bulk Actions */}
      {selectedDeals.size > 0 && (
        <View style={styles.bulkActions}>
          <Text style={styles.bulkText}>{selectedDeals.size} selected</Text>
          <View style={styles.bulkButtons}>
            <TouchableOpacity style={styles.bulkButton} onPress={likeAllSelected}>
              <Icon name="heart" size={14} color="#8B5CF6" />
              <Text style={styles.bulkButtonText}>Like All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bulkButton}>
              <Icon name="share-2" size={14} color="#8B5CF6" />
              <Text style={styles.bulkButtonText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bulkButton} onPress={clearSelectedDeals}>
              <Icon name="x" size={14} color="#6B7280" />
              <Text style={styles.bulkButtonText}>Clear</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Deals List */}
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
          <LinearGradient
            colors={['#8B5CF6', '#7C3AED']}
            style={styles.navIconActive}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Icon name="home" size={16} color="#ffffff" />
          </LinearGradient>
          <Text style={styles.navLabelActive}>Deals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="heart" size={20} color="#9CA3AF" />
          <Text style={styles.navLabel}>Saved</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="bar-chart-2" size={20} color="#9CA3AF" />
          <Text style={styles.navLabel}>Analytics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="settings" size={20} color="#9CA3AF" />
          <Text style={styles.navLabel}>Settings</Text>
        </TouchableOpacity>
      </View>

      <FilterModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  appTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
  },
  appSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
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
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  earningsLabel: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '500',
  },
  profileContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1F2937',
    marginLeft: 8,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  categoriesContainer: {
    marginHorizontal: -20,
  },
  categoriesContent: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    marginRight: 12,
  },
  categoryGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  categoryDefault: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryTextSelected: {
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 6,
    fontSize: 14,
  },
  categoryText: {
    color: '#6B7280',
    fontWeight: '600',
    marginLeft: 6,
    fontSize: 14,
  },
  analyticsContainer: {
    paddingVertical: 16,
    paddingLeft: 20,
  },
  analyticsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    minWidth: 100,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  analyticsNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 4,
  },
  analyticsLabel: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '500',
    marginTop: 2,
  },
  dealsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  dealsHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dealsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginRight: 12,
  },
  dealsCounter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  dealsCounterText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  dealsHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    fontSize: 12,
    color: '#6B7280',
    marginRight: 8,
  },
  bulkActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#F3F4F6',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  bulkText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  bulkButtons: {
    flexDirection: 'row',
  },
  bulkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    marginLeft: 8,
  },
  bulkButtonText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  dealsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  dealsContent: {
    paddingTop: 8,
    paddingBottom: 100,
  },
  dealCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  dealCardList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  dealInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  dealLogoContainer: {
    position: 'relative',
    marginRight: 12,
  },
  dealLogo: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectButton: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 2,
  },
  dealDetails: {
    flex: 1,
  },
  dealTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  dealMerchant: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginRight: 8,
  },
  newBadge: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 6,
  },
  newBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
  popularityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  popularityText: {
    fontSize: 9,
    fontWeight: '600',
  },
  dealDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  dealMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 4,
  },
  metaText: {
    fontSize: 11,
    color: '#6B7280',
    marginLeft: 4,
  },
  cashbackContainer: {
    alignItems: 'flex-end',
  },
  cashbackText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#8B5CF6',
  },
  cashbackLabel: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '500',
  },
  savingsAmount: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
    marginTop: 4,
  },
  dealActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  likedButton: {
    backgroundColor: '#F3E8FF',
  },
  actionButtonText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
    fontWeight: '500',
  },
  primaryButton: {
    backgroundColor: 'transparent',
    padding: 0,
  },
  primaryButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  primaryButtonText: {
    fontSize: 12,
    color: '#ffffff',
    marginLeft: 4,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  filterSection: {
    marginBottom: 24,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 4,
  },
  filterOptionText: {
    fontSize: 15,
    color: '#6B7280',
  },
  filterOptionSelected: {
    color: '#8B5CF6',
    fontWeight: '600',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  switchLabel: {
    fontSize: 15,
    color: '#374151',
  },
  viewModeContainer: {
    flexDirection: 'row',
  },
  viewModeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    marginRight: 8,
  },
  viewModeSelected: {
    backgroundColor: '#8B5CF6',
  },
  viewModeText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
    fontWeight: '500',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navIconActive: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  navLabelActive: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  navLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4,
    fontWeight: '500',
  },
});

export default SharperksMainPage;