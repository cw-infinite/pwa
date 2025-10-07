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
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SharperksMainPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [likedDeals, setLikedDeals] = useState(new Set());
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [sortBy, setSortBy] = useState('cashback'); // cashback, popularity, savings
  const [showFilters, setShowFilters] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoApply, setAutoApply] = useState(false);

  const categories = [
    { name: 'All', icon: 'grid', colors: ['#D4AF37', '#B8860B'] },
    { name: 'Food & Dining', icon: 'coffee', colors: ['#FFD700', '#DAA520'] },
    { name: 'Shopping', icon: 'shopping-bag', colors: ['#B8860B', '#8B7355'] },
    { name: 'Travel', icon: 'plane', colors: ['#D4AF37', '#B8860B'] },
    { name: 'Fuel & Gas', icon: 'zap', colors: ['#FFD700', '#DAA520'] },
    { name: 'Entertainment', icon: 'play-circle', colors: ['#B8860B', '#8B7355'] },
    { name: 'Tech & Electronics', icon: 'smartphone', colors: ['#D4AF37', '#B8860B'] },
    { name: 'Finance', icon: 'credit-card', colors: ['#FFD700', '#DAA520'] }
  ];

  const deals = [
    {
      id: 1,
      merchant: 'Starbucks Reserve',
      cashback: '8.5%',
      category: 'Food & Dining',
      icon: 'coffee',
      colors: ['#D4AF37', '#B8860B'],
      savings: '$156.75',
      popularity: 'premium',
      isNew: true,
      likes: 2847,
      description: 'Premium coffee experience with exclusive rewards',
      rating: 4.9,
      expires: '2d',
      tier: 'Gold',
      minSpend: '$25',
      maxCashback: '$50'
    },
    {
      id: 2,
      merchant: 'Tesla Supercharger',
      cashback: '12%',
      category: 'Fuel & Gas',
      icon: 'zap',
      colors: ['#FFD700', '#DAA520'],
      savings: '$245.80',
      popularity: 'exclusive',
      isNew: true,
      likes: 1456,
      description: 'Sustainable charging with premium cashback',
      rating: 4.8,
      expires: '5d',
      tier: 'Platinum',
      minSpend: '$50',
      maxCashback: '$100'
    },
    {
      id: 3,
      merchant: 'American Express',
      cashback: '15%',
      category: 'Finance',
      icon: 'credit-card',
      colors: ['#B8860B', '#8B7355'],
      savings: '$892.30',
      popularity: 'vip',
      isNew: false,
      likes: 5234,
      description: 'Elite financial services and premium rewards',
      rating: 4.9,
      expires: '1w',
      tier: 'Black',
      minSpend: '$100',
      maxCashback: '$500'
    },
    {
      id: 4,
      merchant: 'Apple Store',
      cashback: '6%',
      category: 'Tech & Electronics',
      icon: 'smartphone',
      colors: ['#D4AF37', '#B8860B'],
      savings: '$324.99',
      popularity: 'trending',
      isNew: false,
      likes: 3456,
      description: 'Latest technology with exclusive member pricing',
      rating: 4.7,
      expires: '3d',
      tier: 'Gold',
      minSpend: '$200',
      maxCashback: '$150'
    },
    {
      id: 5,
      merchant: 'Netflix Premium',
      cashback: '25%',
      category: 'Entertainment',
      icon: 'play-circle',
      colors: ['#FFD700', '#DAA520'],
      savings: '$67.45',
      popularity: 'limited',
      isNew: true,
      likes: 2876,
      description: '4K streaming with premium account benefits',
      rating: 4.6,
      expires: '12h',
      tier: 'Premium',
      minSpend: '$15',
      maxCashback: '$25'
    },
    {
      id: 6,
      merchant: 'Four Seasons Hotels',
      cashback: '18%',
      category: 'Travel',
      icon: 'plane',
      colors: ['#B8860B', '#8B7355'],
      savings: '$1,247.60',
      popularity: 'luxury',
      isNew: false,
      likes: 1876,
      description: 'Luxury accommodations with VIP treatment',
      rating: 5.0,
      expires: '1w',
      tier: 'Platinum',
      minSpend: '$500',
      maxCashback: '$1000'
    }
  ];

  const filteredDeals = deals
    .filter(deal => 
      (selectedCategory === 'All' || deal.category === selectedCategory) &&
      deal.merchant.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch(sortBy) {
        case 'cashback': return parseFloat(b.cashback) - parseFloat(a.cashback);
        case 'savings': return parseFloat(b.savings.replace(/[$,]/g, '')) - parseFloat(a.savings.replace(/[$,]/g, ''));
        case 'popularity': return b.likes - a.likes;
        default: return 0;
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

  const getPopularityIcon = (popularity) => {
    switch(popularity) {
      case 'premium': return '👑';
      case 'exclusive': return '💎';
      case 'vip': return '⭐';
      case 'luxury': return '🏆';
      case 'limited': return '⚡';
      default: return '✨';
    }
  };

  const getTierColor = (tier) => {
    switch(tier) {
      case 'Black': return '#1F1F1F';
      case 'Platinum': return '#E2E8F0';
      case 'Gold': return '#D4AF37';
      case 'Premium': return '#B8860B';
      default: return '#6B7280';
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
          <Icon name={category.icon} size={16} color="#000000" />
          <Text style={styles.categoryTextSelected}>{category.name}</Text>
        </LinearGradient>
      ) : (
        <View style={styles.categoryDefault}>
          <Icon name={category.icon} size={16} color="#9CA3AF" />
          <Text style={styles.categoryText}>{category.name}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const DealCard = ({ deal }) => (
    <View style={styles.dealCard}>
      <View style={styles.dealHeader}>
        <View style={styles.dealInfo}>
          <LinearGradient
            colors={deal.colors}
            style={styles.dealLogo}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Icon name={deal.icon} size={24} color="#000000" />
          </LinearGradient>
          <View style={styles.dealDetails}>
            <View style={styles.dealTitleRow}>
              <Text style={styles.dealMerchant}>{deal.merchant}</Text>
              {deal.isNew && (
                <LinearGradient
                  colors={['#D4AF37', '#B8860B']}
                  style={styles.newBadge}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.newBadgeText}>NEW</Text>
                </LinearGradient>
              )}
              <View style={[styles.tierBadge, { backgroundColor: getTierColor(deal.tier) }]}>
                <Text style={[styles.tierText, { color: deal.tier === 'Platinum' ? '#000' : '#FFF' }]}>
                  {deal.tier}
                </Text>
              </View>
            </View>
            <Text style={styles.dealDescription}>{deal.description}</Text>
            <View style={styles.dealMetrics}>
              <View style={styles.ratingContainer}>
                <Icon name="star" size={12} color="#D4AF37" />
                <Text style={styles.ratingText}>{deal.rating}</Text>
              </View>
              <View style={styles.expiryContainer}>
                <Icon name="clock" size={12} color="#DC2626" />
                <Text style={styles.expiryText}>expires {deal.expires}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.cashbackContainer}>
          <Text style={styles.cashbackText}>{deal.cashback}</Text>
          <Text style={styles.cashbackLabel}>cashback</Text>
        </View>
      </View>

      <View style={styles.dealFooter}>
        <View style={styles.dealTerms}>
          <Text style={styles.termsText}>Min: {deal.minSpend} | Max: {deal.maxCashback}</Text>
        </View>
        <View style={styles.dealStats}>
          <View style={styles.popularityContainer}>
            <Text style={styles.popularityIcon}>{getPopularityIcon(deal.popularity)}</Text>
            <Text style={styles.popularityText}>{deal.popularity}</Text>
          </View>
          <View style={styles.savingsContainer}>
            <Text style={styles.savingsAmount}>{deal.savings}</Text>
            <Text style={styles.savingsLabel}>saved</Text>
          </View>
        </View>
        <View style={styles.dealActions}>
          <TouchableOpacity
            onPress={() => toggleLike(deal.id)}
            style={[
              styles.actionButton,
              likedDeals.has(deal.id) ? styles.likedButton : styles.actionButtonDefault
            ]}
          >
            <Icon 
              name="heart" 
              size={14} 
              color={likedDeals.has(deal.id) ? '#D4AF37' : '#6B7280'}
              fill={likedDeals.has(deal.id) ? '#D4AF37' : 'none'}
            />
            <Text style={[
              styles.actionButtonText,
              likedDeals.has(deal.id) ? styles.likedButtonText : styles.actionButtonTextDefault
            ]}>
              {deal.likes}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButtonDefault}>
            <Icon name="share-2" size={14} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButtonDefault}>
            <Icon name="bookmark" size={14} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.activateButton}>
            <LinearGradient
              colors={['#D4AF37', '#B8860B']}
              style={styles.activateGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.activateText}>Activate</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <LinearGradient
              colors={['#D4AF37', '#B8860B']}
              style={styles.logoContainer}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Icon name="zap" size={24} color="#000000" />
            </LinearGradient>
            <View>
              <Text style={styles.appTitle}>Sharperks</Text>
              <Text style={styles.appSubtitle}>Professional Rewards</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.notificationButton}>
              <Icon name="bell" size={20} color="#D4AF37" />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>3</Text>
              </View>
            </TouchableOpacity>
            <LinearGradient
              colors={['#D4AF37', '#B8860B']}
              style={styles.earningsContainer}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.earningsText}>$2,847 earned</Text>
            </LinearGradient>
            <LinearGradient
              colors={['#1F1F1F', '#2D2D2D']}
              style={styles.profileContainer}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.profileText}>VIP</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Search and Controls */}
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Icon name="search" size={18} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search premium deals..."
              placeholderTextColor="#9CA3AF"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            <TouchableOpacity 
              onPress={() => setShowFilters(!showFilters)}
              style={styles.filterButton}
            >
              <Icon name="filter" size={18} color="#D4AF37" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            style={styles.viewToggle}
          >
            <Icon name={viewMode === 'grid' ? 'list' : 'grid'} size={18} color="#D4AF37" />
          </TouchableOpacity>
        </View>

        {/* Advanced Filters */}
        {showFilters && (
          <View style={styles.filtersContainer}>
            <View style={styles.filterRow}>
              <Text style={styles.filterLabel}>Sort by:</Text>
              <View style={styles.sortButtons}>
                {['cashback', 'savings', 'popularity'].map((sort) => (
                  <TouchableOpacity
                    key={sort}
                    onPress={() => setSortBy(sort)}
                    style={[
                      styles.sortButton,
                      sortBy === sort && styles.sortButtonActive
                    ]}
                  >
                    <Text style={[
                      styles.sortButtonText,
                      sortBy === sort && styles.sortButtonTextActive
                    ]}>
                      {sort}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.filterRow}>
              <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Notifications</Text>
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  trackColor={{false: '#374151', true: '#B8860B'}}
                  thumbColor={notifications ? '#D4AF37' : '#6B7280'}
                />
              </View>
              <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Auto-Apply</Text>
                <Switch
                  value={autoApply}
                  onValueChange={setAutoApply}
                  trackColor={{false: '#374151', true: '#B8860B'}}
                  thumbColor={autoApply ? '#D4AF37' : '#6B7280'}
                />
              </View>
            </View>
          </View>
        )}

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

      {/* Dashboard Stats */}
      <View style={styles.dashboardContainer}>
        <View style={styles.statCard}>
          <LinearGradient
            colors={['#1F1F1F', '#2D2D2D']}
            style={styles.statGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Icon name="trending-up" size={20} color="#D4AF37" />
            <Text style={styles.statNumber}>47</Text>
            <Text style={styles.statLabel}>Active Deals</Text>
          </LinearGradient>
        </View>
        <View style={styles.statCard}>
          <LinearGradient
            colors={['#1F1F1F', '#2D2D2D']}
            style={styles.statGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Icon name="dollar-sign" size={20} color="#D4AF37" />
            <Text style={[styles.statNumber, { color: '#D4AF37' }]}>$12.4K</Text>
            <Text style={styles.statLabel}>Total Saved</Text>
          </LinearGradient>
        </View>
        <View style={styles.statCard}>
          <LinearGradient
            colors={['#1F1F1F', '#2D2D2D']}
            style={styles.statGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Icon name="award" size={20} color="#D4AF37" />
            <Text style={[styles.statNumber, { color: '#FFD700' }]}>VIP</Text>
            <Text style={styles.statLabel}>Tier Status</Text>
          </LinearGradient>
        </View>
      </View>

      {/* Deals Feed */}
      <View style={styles.feedHeader}>
        <Text style={styles.feedTitle}>Premium Deals</Text>
        <View style={styles.feedCounter}>
          <Icon name="zap" size={16} color="#D4AF37" />
          <Text style={styles.feedCounterText}>{filteredDeals.length} available</Text>
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

      {/* Premium Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <LinearGradient
            colors={['#D4AF37', '#B8860B']}
            style={styles.navIconActive}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Icon name="shopping-bag" size={16} color="#000000" />
          </LinearGradient>
          <Text style={styles.navLabelActive}>Deals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="heart" size={20} color="#6B7280" />
          <Text style={styles.navLabel}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="bar-chart-2" size={20} color="#6B7280" />
          <Text style={styles.navLabel}>Analytics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="settings" size={20} color="#6B7280" />
          <Text style={styles.navLabel}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <LinearGradient
            colors={['#1F1F1F', '#2D2D2D']}
            style={styles.navIconActive}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.navProfileText}>VIP</Text>
          </LinearGradient>
          <Text style={styles.navLabelActive}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  header: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D2D',
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
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  appSubtitle: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    position: 'relative',
    marginRight: 12,
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#DC2626',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  earningsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  earningsText: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 14,
  },
  profileContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4AF37',
  },
  profileText: {
    fontSize: 12,
    color: '#D4AF37',
    fontWeight: '700',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D2D2D',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },
  filterButton: {
    padding: 4,
  },
  viewToggle: {
    backgroundColor: '#2D2D2D',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  filtersContainer: {
    backgroundColor: '#2D2D2D',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  filterLabel: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  sortButtons: {
    flexDirection: 'row',
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 8,
    backgroundColor: '#374151',
  },
  sortButtonActive: {
    backgroundColor: '#D4AF37',
  },
  sortButtonText: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  sortButtonTextActive: {
    color: '#000000',
    fontWeight: '700',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    marginRight: 12,
  },
  categoriesContainer: {
    marginBottom: 8,
  },
  categoriesContent: {
    paddingRight: 20,
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
    backgroundColor: '#2D2D2D',
    borderWidth: 1,
    borderColor: '#374151',
  },
  categoryTextSelected: {
    color: '#000000',
    fontWeight: '700',
    marginLeft: 8,
    fontSize: 12,
  },
  categoryText: {
    color: '#9CA3AF',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 12,
  },
  dashboardContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
  },
  statGradient: {
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  feedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  feedTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  feedCounter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  feedCounterText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#D4AF37',
    marginLeft: 4,
  },
  dealsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  dealsContent: {
    paddingBottom: 100,
  },
  dealCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2D2D2D',
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
  dealLogo: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
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
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    marginRight: 8,
  },
  newBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  newBadgeText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: '700',
  },
  tierBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tierText: {
    fontSize: 10,
    fontWeight: '700',
  },
  dealDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  dealMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  ratingText: {
    fontSize: 12,
    color: '#D4AF37',
    fontWeight: '600',
    marginLeft: 4,
  },
  expiryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expiryText: {
    fontSize: 12,
    color: '#DC2626',
    fontWeight: '600',
    marginLeft: 4,
  },
  cashbackContainer: {
    alignItems: 'flex-end',
  },
  cashbackText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#D4AF37',
    marginBottom: 2,
  },
  cashbackLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  dealFooter: {
    marginTop: 12,
  },
  dealTerms: {
    marginBottom: 12,
  },
  termsText: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  dealStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  popularityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  popularityIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  popularityText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D4AF37',
    textTransform: 'uppercase',
  },
  savingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  savingsAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#10B981',
    marginRight: 4,
  },
  savingsLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  dealActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
  },
  actionButtonDefault: {
    backgroundColor: '#2D2D2D',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#374151',
  },
  likedButton: {
    backgroundColor: '#2D1B0E',
    borderWidth: 1,
    borderColor: '#D4AF37',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  actionButtonTextDefault: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  likedButtonText: {
    color: '#D4AF37',
  },
  activateButton: {
    flex: 1,
    maxWidth: 100,
  },
  activateGradient: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  activateText: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 14,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#2D2D2D',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navIconActive: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  navLabelActive: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D4AF37',
  },
  navLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  navProfileText: {
    color: '#D4AF37',
    fontSize: 10,
    fontWeight: '700',
  },
});

export default SharperksMainPage;