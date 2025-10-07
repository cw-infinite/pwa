import React, { useState, useEffect, useRef } from 'react';
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
  Animated,
  Modal,
  FlatList,
  Image,
  Switch,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SharperksMainPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [likedDeals, setLikedDeals] = useState(new Set());
  const [savedDeals, setSavedDeals] = useState(new Set());
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [sortBy, setSortBy] = useState('cashback');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedTab, setSelectedTab] = useState('deals');
  const [pushNotifications, setPushNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [headerHeight, setHeaderHeight] = useState(0);

  const categories = [
    { name: 'All', icon: 'grid', count: 156 },
    { name: 'Food', icon: 'coffee', count: 45 },
    { name: 'Shopping', icon: 'shopping-bag', count: 38 },
    { name: 'Travel', icon: 'map-pin', count: 22 },
    { name: 'Gas', icon: 'truck', count: 18 },
    { name: 'Entertainment', icon: 'play-circle', count: 15 },
    { name: 'Tech', icon: 'smartphone', count: 12 },
    { name: 'Fitness', icon: 'activity', count: 6 }
  ];

  const deals = [
    {
      id: 1,
      merchant: 'Starbucks',
      cashback: '5.0',
      category: 'Food',
      logo: 'https://cdn.worldvectorlogo.com/logos/starbucks-2.svg',
      savings: '23.50',
      popularity: 'trending',
      isNew: true,
      likes: 1247,
      description: 'Premium coffee and beverages',
      rating: 4.8,
      expiresIn: '2 days',
      featured: true,
      distance: '0.3 mi',
      locations: 12,
      originalPrice: '5.99',
      discountedPrice: '5.69',
      terms: 'Valid on orders over $10',
      maxCashback: '$50/month',
      activationRequired: true
    },
    {
      id: 2,
      merchant: 'Amazon',
      cashback: '8.0',
      category: 'Shopping',
      logo: 'https://cdn.worldvectorlogo.com/logos/amazon-icon-1.svg',
      savings: '145.20',
      popularity: 'hot',
      isNew: false,
      likes: 4841,
      description: 'Everything you need, delivered',
      rating: 4.6,
      expiresIn: '5 days',
      featured: true,
      distance: 'Online',
      locations: 'Nationwide',
      originalPrice: '99.99',
      discountedPrice: '91.99',
      terms: 'Prime members only',
      maxCashback: '$200/month',
      activationRequired: false
    },
    {
      id: 3,
      merchant: 'Target',
      cashback: '4.0',
      category: 'Shopping',
      logo: 'https://cdn.worldvectorlogo.com/logos/target-1.svg',
      savings: '67.80',
      popularity: 'rising',
      isNew: false,
      likes: 1892,
      description: 'Expect more, pay less',
      rating: 4.5,
      expiresIn: '1 day',
      featured: false,
      distance: '1.2 mi',
      locations: 8,
      originalPrice: '49.99',
      discountedPrice: '47.99',
      terms: 'In-store and online',
      maxCashback: '$100/month',
      activationRequired: true
    },
    {
      id: 4,
      merchant: 'Netflix',
      cashback: '3.0',
      category: 'Entertainment',
      logo: 'https://cdn.worldvectorlogo.com/logos/netflix-3.svg',
      savings: '15.99',
      popularity: 'stable',
      isNew: false,
      likes: 2456,
      description: 'Stream unlimited movies & shows',
      rating: 4.9,
      expiresIn: '7 days',
      featured: false,
      distance: 'Online',
      locations: 'Global',
      originalPrice: '15.99',
      discountedPrice: '15.51',
      terms: 'New subscribers only',
      maxCashback: '$10/month',
      activationRequired: false
    },
    {
      id: 5,
      merchant: 'Apple Store',
      cashback: '2.0',
      category: 'Tech',
      logo: 'https://cdn.worldvectorlogo.com/logos/apple-14.svg',
      savings: '189.99',
      popularity: 'premium',
      isNew: true,
      likes: 5456,
      description: 'Think different',
      rating: 4.7,
      expiresIn: '3 days',
      featured: true,
      distance: '2.1 mi',
      locations: 4,
      originalPrice: '999.00',
      discountedPrice: '979.01',
      terms: 'Valid on devices only',
      maxCashback: '$500/month',
      activationRequired: true
    },
    {
      id: 6,
      merchant: 'Nike',
      cashback: '6.0',
      category: 'Fitness',
      logo: 'https://cdn.worldvectorlogo.com/logos/nike-4.svg',
      savings: '127.50',
      popularity: 'trending',
      isNew: true,
      likes: 3134,
      description: 'Just do it',
      rating: 4.8,
      expiresIn: '4 days',
      featured: false,
      distance: '0.8 mi',
      locations: 6,
      originalPrice: '129.99',
      discountedPrice: '122.21',
      terms: 'Excludes limited editions',
      maxCashback: '$150/month',
      activationRequired: false
    }
  ];

  const notifications = [
    { 
      id: 1, 
      title: 'Cashback earned!', 
      subtitle: '$12.50 from Starbucks purchase', 
      time: '2m ago', 
      type: 'earning',
      read: false,
      amount: '12.50'
    },
    { 
      id: 2, 
      title: 'New deal alert!', 
      subtitle: '10% cashback at Best Buy', 
      time: '1h ago', 
      type: 'deal',
      read: false,
      merchant: 'Best Buy'
    },
    { 
      id: 3, 
      title: 'Deal expires soon', 
      subtitle: 'Nike deal ends in 2 hours', 
      time: '3h ago', 
      type: 'warning',
      read: true,
      merchant: 'Nike'
    },
    { 
      id: 4, 
      title: 'Monthly summary ready', 
      subtitle: 'You saved $347 this month!', 
      time: '1d ago', 
      type: 'summary',
      read: true,
      amount: '347'
    }
  ];

  const analyticsData = {
    totalEarned: 1247.50,
    thisMonth: 347.80,
    totalSaved: 2840.30,
    activatedDeals: 23,
    favoriteCategory: 'Food',
    avgCashback: 4.2,
    streakDays: 45,
    rankPosition: 'Top 5%'
  };

  const filteredDeals = deals
    .filter(deal => 
      (selectedCategory === 'All' || deal.category === selectedCategory) &&
      deal.merchant.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'cashback') return parseFloat(b.cashback) - parseFloat(a.cashback);
      if (sortBy === 'savings') return parseFloat(b.savings) - parseFloat(a.savings);
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'likes') return b.likes - a.likes;
      if (sortBy === 'distance') return parseFloat(a.distance) - parseFloat(b.distance);
      return 0;
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

  const toggleSave = (dealId) => {
    const newSaved = new Set(savedDeals);
    if (newSaved.has(dealId)) {
      newSaved.delete(dealId);
    } else {
      newSaved.add(dealId);
    }
    setSavedDeals(newSaved);
  };

  const activateDeal = (deal) => {
    Alert.alert(
      'Activate Deal',
      `Activate ${deal.cashback}% cashback at ${deal.merchant}?\n\nTerms: ${deal.terms}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Activate', onPress: () => Alert.alert('Success!', 'Deal activated successfully') }
      ]
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const getPopularityColor = (popularity) => {
    switch(popularity) {
      case 'trending': return '#FF6B6B';
      case 'hot': return '#FF8E53';
      case 'rising': return '#4ECDC4';
      case 'premium': return '#9B59B6';
      case 'stable': return '#95A5A6';
      default: return '#BDC3C7';
    }
  };

  const CategoryButton = ({ category, isSelected, onPress }) => (
    <TouchableOpacity onPress={onPress} style={[
      styles.categoryButton,
      isSelected && styles.categoryButtonSelected
    ]}>
      <Icon name={category.icon} size={16} color={isSelected ? '#FFFFFF' : '#666666'} />
      <Text style={[styles.categoryText, isSelected && styles.categoryTextSelected]}>
        {category.name}
      </Text>
      <View style={[styles.categoryCount, isSelected && styles.categoryCountSelected]}>
        <Text style={[styles.categoryCountText, isSelected && styles.categoryCountTextSelected]}>
          {category.count}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const DealCard = ({ deal, index }) => (
    <View style={[
      styles.dealCard, 
      deal.featured && styles.featuredCard,
      viewMode === 'list' && styles.dealCardList
    ]}>
      {deal.featured && (
        <View style={styles.featuredBadge}>
          <Icon name="star" size={10} color="#FFD700" />
          <Text style={styles.featuredText}>FEATURED</Text>
        </View>
      )}
      
      <View style={[styles.dealHeader, viewMode === 'list' && styles.dealHeaderList]}>
        <View style={styles.dealInfo}>
          <View style={styles.dealLogo}>
            <Icon name={categories.find(c => c.name === deal.category)?.icon || 'shopping-bag'} 
                  size={24} color="#007AFF" />
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
            <View style={styles.dealMetrics}>
              <View style={styles.metric}>
                <Icon name="star" size={12} color="#FFD700" />
                <Text style={styles.metricText}>{deal.rating}</Text>
              </View>
              <View style={styles.metric}>
                <Icon name="map-pin" size={12} color="#666666" />
                <Text style={styles.metricText}>{deal.distance}</Text>
              </View>
              <View style={styles.metric}>
                <Icon name="clock" size={12} color="#666666" />
                <Text style={styles.metricText}>{deal.expiresIn}</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.dealActions}>
          <View style={styles.cashbackContainer}>
            <Text style={styles.cashbackText}>{deal.cashback}%</Text>
            <Text style={styles.cashbackLabel}>cashback</Text>
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity
              onPress={() => toggleLike(deal.id)}
              style={[styles.actionButton, likedDeals.has(deal.id) && styles.actionButtonActive]}
            >
              <Icon name="heart" size={16} 
                    color={likedDeals.has(deal.id) ? '#FF6B6B' : '#CCCCCC'}
                    fill={likedDeals.has(deal.id) ? '#FF6B6B' : 'none'} />
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => toggleSave(deal.id)}
              style={[styles.actionButton, savedDeals.has(deal.id) && styles.actionButtonActive]}
            >
              <Icon name="bookmark" size={16} 
                    color={savedDeals.has(deal.id) ? '#007AFF' : '#CCCCCC'}
                    fill={savedDeals.has(deal.id) ? '#007AFF' : 'none'} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="share-2" size={16} color="#CCCCCC" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.dealFooter}>
        <View style={styles.dealStats}>
          <View style={[styles.popularityBadge, { backgroundColor: getPopularityColor(deal.popularity) }]}>
            <Text style={styles.popularityText}>{deal.popularity}</Text>
          </View>
          <Text style={styles.savingsText}>${deal.savings} saved by users</Text>
        </View>
        
        <TouchableOpacity 
          style={[styles.activateButton, deal.activationRequired && styles.activateButtonRequired]}
          onPress={() => activateDeal(deal)}
        >
          <Text style={styles.activateButtonText}>
            {deal.activationRequired ? 'Activate' : 'Shop Now'}
          </Text>
          <Icon name="arrow-right" size={14} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const FilterModal = () => (
    <Modal
      visible={showFilterModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowFilterModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Sort & Filter</Text>
            <TouchableOpacity onPress={() => setShowFilterModal(false)}>
              <Icon name="x" size={24} color="#333333" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalBody}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sort by</Text>
              {['cashback', 'savings', 'rating', 'likes', 'distance'].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[styles.sortOption, sortBy === option && styles.sortOptionSelected]}
                  onPress={() => setSortBy(option)}
                >
                  <Text style={[styles.sortOptionText, sortBy === option && styles.sortOptionTextSelected]}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </Text>
                  {sortBy === option && <Icon name="check" size={16} color="#007AFF" />}
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>View Mode</Text>
              <View style={styles.viewModeContainer}>
                <TouchableOpacity
                  style={[styles.viewModeButton, viewMode === 'grid' && styles.viewModeButtonActive]}
                  onPress={() => setViewMode('grid')}
                >
                  <Icon name="grid" size={16} color={viewMode === 'grid' ? '#FFFFFF' : '#666666'} />
                  <Text style={[styles.viewModeText, viewMode === 'grid' && styles.viewModeTextActive]}>Grid</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.viewModeButton, viewMode === 'list' && styles.viewModeButtonActive]}
                  onPress={() => setViewMode('list')}
                >
                  <Icon name="list" size={16} color={viewMode === 'list' ? '#FFFFFF' : '#666666'} />
                  <Text style={[styles.viewModeText, viewMode === 'list' && styles.viewModeTextActive]}>List</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const NotificationModal = () => (
    <Modal
      visible={showNotifications}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowNotifications(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { marginTop: 60 }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Notifications</Text>
            <TouchableOpacity onPress={() => setShowNotifications(false)}>
              <Icon name="x" size={24} color="#333333" />
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={[styles.notificationItem, !item.read && styles.notificationUnread]}>
                <View style={[styles.notifIcon, { 
                  backgroundColor: item.type === 'earning' ? '#4ECDC4' : 
                                 item.type === 'deal' ? '#007AFF' :
                                 item.type === 'warning' ? '#FF6B6B' : '#9B59B6'
                }]}>
                  <Icon 
                    name={item.type === 'earning' ? 'dollar-sign' : 
                          item.type === 'deal' ? 'tag' :
                          item.type === 'warning' ? 'alert-circle' : 'bar-chart'} 
                    size={16} 
                    color="#FFFFFF" 
                  />
                </View>
                <View style={styles.notifContent}>
                  <Text style={styles.notifTitle}>{item.title}</Text>
                  <Text style={styles.notifSubtitle}>{item.subtitle}</Text>
                </View>
                <View style={styles.notifRight}>
                  <Text style={styles.notifTime}>{item.time}</Text>
                  {!item.read && <View style={styles.unreadDot} />}
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </Modal>
  );

  const AnalyticsModal = () => (
    <Modal
      visible={showAnalytics}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowAnalytics(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Analytics</Text>
            <TouchableOpacity onPress={() => setShowAnalytics(false)}>
              <Icon name="x" size={24} color="#333333" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalBody}>
            <View style={styles.analyticsGrid}>
              <View style={styles.analyticsCard}>
                <Icon name="dollar-sign" size={24} color="#4ECDC4" />
                <Text style={styles.analyticsValue}>${analyticsData.totalEarned}</Text>
                <Text style={styles.analyticsLabel}>Total Earned</Text>
              </View>
              <View style={styles.analyticsCard}>
                <Icon name="calendar" size={24} color="#007AFF" />
                <Text style={styles.analyticsValue}>${analyticsData.thisMonth}</Text>
                <Text style={styles.analyticsLabel}>This Month</Text>
              </View>
              <View style={styles.analyticsCard}>
                <Icon name="trending-up" size={24} color="#FF6B6B" />
                <Text style={styles.analyticsValue}>${analyticsData.totalSaved}</Text>
                <Text style={styles.analyticsLabel}>Total Saved</Text>
              </View>
              <View style={styles.analyticsCard}>
                <Icon name="zap" size={24} color="#9B59B6" />
                <Text style={styles.analyticsValue}>{analyticsData.activatedDeals}</Text>
                <Text style={styles.analyticsLabel}>Active Deals</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Performance</Text>
              <View style={styles.performanceItem}>
                <Text style={styles.performanceLabel}>Streak Days</Text>
                <Text style={styles.performanceValue}>{analyticsData.streakDays} days</Text>
              </View>
              <View style={styles.performanceItem}>
                <Text style={styles.performanceLabel}>Average Cashback</Text>
                <Text style={styles.performanceValue}>{analyticsData.avgCashback}%</Text>
              </View>
              <View style={styles.performanceItem}>
                <Text style={styles.performanceLabel}>Rank Position</Text>
                <Text style={styles.performanceValue}>{analyticsData.rankPosition}</Text>
              </View>
              <View style={styles.performanceItem}>
                <Text style={styles.performanceLabel}>Favorite Category</Text>
                <Text style={styles.performanceValue}>{analyticsData.favoriteCategory}</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const SettingsModal = () => (
    <Modal
      visible={showSettings}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowSettings(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Settings</Text>
            <TouchableOpacity onPress={() => setShowSettings(false)}>
              <Icon name="x" size={24} color="#333333" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalBody}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Notifications</Text>
              <View style={styles.settingItem}>
                <Text style={styles.settingLabel}>Push Notifications</Text>
                <Switch
                  value={pushNotifications}
                  onValueChange={setPushNotifications}
                  trackColor={{ false: '#CCCCCC', true: '#007AFF' }}
                  thumbColor={pushNotifications ? '#FFFFFF' : '#F4F3F4'}
                />
              </View>
              <View style={styles.settingItem}>
                <Text style={styles.settingLabel}>Location Services</Text>
                <Switch
                  value={locationServices}
                  onValueChange={setLocationServices}
                  trackColor={{ false: '#CCCCCC', true: '#007AFF' }}
                  thumbColor={locationServices ? '#FFFFFF' : '#F4F3F4'}
                />
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Appearance</Text>
              <View style={styles.settingItem}>
                <Text style={styles.settingLabel}>Dark Mode</Text>
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                  trackColor={{ false: '#CCCCCC', true: '#007AFF' }}
                  thumbColor={darkMode ? '#FFFFFF' : '#F4F3F4'}
                />
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Account</Text>
              <TouchableOpacity style={styles.settingButton}>
                <Icon name="user" size={20} color="#666666" />
                <Text style={styles.settingButtonText}>Edit Profile</Text>
                <Icon name="chevron-right" size={16} color="#CCCCCC" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.settingButton}>
                <Icon name="credit-card" size={20} color="#666666" />
                <Text style={styles.settingButtonText}>Payment Methods</Text>
                <Icon name="chevron-right" size={16} color="#CCCCCC" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.settingButton}>
                <Icon name="shield" size={20} color="#666666" />
                <Text style={styles.settingButtonText}>Privacy & Security</Text>
                <Icon name="chevron-right" size={16} color="#CCCCCC" />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.profileButton} onPress={() => setShowSettings(true)}>
              <Icon name="user" size={20} color="#007AFF" />
            </TouchableOpacity>
            <View style={styles.headerTitles}>
              <Text style={styles.greeting}>Good morning!</Text>
              <Text style={styles.username}>Sarah</Text>
            </View>
          </View>
          
          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={styles.headerIconButton}
              onPress={() => setShowAnalytics(true)}
            >
              <Icon name="bar-chart-2" size={20} color="#666666" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.headerIconButton, styles.notificationButton]}
              onPress={() => setShowNotifications(true)}
            >
              <Icon name="bell" size={20} color="#666666" />
              {notifications.filter(n => !n.read).length > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>
                    {notifications.filter(n => !n.read).length}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.balanceCard}>
          <View style={styles.balanceLeft}>
            <Text style={styles.balanceLabel}>Available Balance</Text>
            <Text style={styles.balanceAmount}>${analyticsData.totalEarned.toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.withdrawButton}>
            <Text style={styles.withdrawButtonText}>Withdraw</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={18} color="#999999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search deals and stores..."
            placeholderTextColor="#999999"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <TouchableOpacity onPress={() => setShowFilterModal(true)}>
            <Icon name="sliders" size={18} color="#666666" />
          </TouchableOpacity>
        </View>
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

      {/* Quick Stats */}
      <View style={styles.quickStats}>
        <View style={styles.statItem}>
          <Icon name="trending-up" size={16} color="#4ECDC4" />
          <Text style={styles.statValue}>{filteredDeals.length}</Text>
          <Text style={styles.statLabel}>Active Deals</Text>
        </View>
        <View style={styles.statItem}>
          <Icon name="dollar-sign" size={16} color="#FF6B6B" />
          <Text style={styles.statValue}>${analyticsData.thisMonth}</Text>
          <Text style={styles.statLabel}>This Month</Text>
        </View>
        <View style={styles.statItem}>
          <Icon name="zap" size={16} color="#9B59B6" />
          <Text style={styles.statValue}>{analyticsData.streakDays}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
      </View>

      {/* Deals Section Header */}
      <View style={styles.dealsHeader}>
        <Text style={styles.dealsTitle}>
          {selectedCategory === 'All' ? 'All Deals' : `${selectedCategory} Deals`}
        </Text>
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[styles.viewToggleButton, viewMode === 'grid' && styles.viewToggleActive]}
            onPress={() => setViewMode('grid')}
          >
            <Icon name="grid" size={16} color={viewMode === 'grid' ? '#FFFFFF' : '#666666'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewToggleButton, viewMode === 'list' && styles.viewToggleActive]}
            onPress={() => setViewMode('list')}
          >
            <Icon name="list" size={16} color={viewMode === 'list' ? '#FFFFFF' : '#666666'} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Deals List */}
      <FlatList
        data={filteredDeals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => <DealCard deal={item} index={index} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.dealsContent}
        refreshing={refreshing}
        onRefresh={onRefresh}
        numColumns={viewMode === 'grid' ? 2 : 1}
        key={viewMode} // Force re-render when view mode changes
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={[styles.navItem, selectedTab === 'deals' && styles.navItemActive]}
          onPress={() => setSelectedTab('deals')}
        >
          <Icon name="shopping-bag" size={20} color={selectedTab === 'deals' ? '#007AFF' : '#CCCCCC'} />
          <Text style={[styles.navLabel, selectedTab === 'deals' && styles.navLabelActive]}>Deals</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, selectedTab === 'saved' && styles.navItemActive]}
          onPress={() => setSelectedTab('saved')}
        >
          <Icon name="bookmark" size={20} color={selectedTab === 'saved' ? '#007AFF' : '#CCCCCC'} />
          <Text style={[styles.navLabel, selectedTab === 'saved' && styles.navLabelActive]}>Saved</Text>
          {savedDeals.size > 0 && (
            <View style={styles.navBadge}>
              <Text style={styles.navBadgeText}>{savedDeals.size}</Text>
            </View>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, selectedTab === 'wallet' && styles.navItemActive]}
          onPress={() => setSelectedTab('wallet')}
        >
          <Icon name="credit-card" size={20} color={selectedTab === 'wallet' ? '#007AFF' : '#CCCCCC'} />
          <Text style={[styles.navLabel, selectedTab === 'wallet' && styles.navLabelActive]}>Wallet</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, selectedTab === 'profile' && styles.navItemActive]}
          onPress={() => {
            setSelectedTab('profile');
            setShowProfile(true);
          }}
        >
          <Icon name="user" size={20} color={selectedTab === 'profile' ? '#007AFF' : '#CCCCCC'} />
          <Text style={[styles.navLabel, selectedTab === 'profile' && styles.navLabelActive]}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Modals */}
      <FilterModal />
      <NotificationModal />
      <AnalyticsModal />
      <SettingsModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitles: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 2,
  },
  username: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  balanceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
  },
  balanceLeft: {
    flex: 1,
  },
  balanceLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginBottom: 4,
  },
  balanceAmount: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
  },
  withdrawButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  withdrawButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
    marginLeft: 12,
    marginRight: 12,
  },
  categoriesContainer: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 16,
  },
  categoriesContent: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  categoryButtonSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
    marginLeft: 8,
    marginRight: 6,
  },
  categoryTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  categoryCount: {
    backgroundColor: '#E9ECEF',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  categoryCountSelected: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  categoryCountText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666666',
  },
  categoryCountTextSelected: {
    color: '#FFFFFF',
  },
  quickStats: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: 4,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
  },
  dealsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F8F9FA',
  },
  dealsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 2,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  viewToggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  viewToggleActive: {
    backgroundColor: '#007AFF',
  },
  dealsContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100,
  },
  dealCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  dealCardList: {
    marginHorizontal: 0,
  },
  featuredCard: {
    borderColor: '#FFD700',
    borderWidth: 2,
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  featuredText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    marginLeft: 4,
  },
  dealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  dealHeaderList: {
    alignItems: 'center',
  },
  dealInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  dealLogo: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  dealDetails: {
    flex: 1,
  },
  dealTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  dealMerchant: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginRight: 8,
  },
  newBadge: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  newBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
  dealDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  dealMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metricText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 4,
    fontWeight: '500',
  },
  dealActions: {
    alignItems: 'flex-end',
  },
  cashbackContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  cashbackText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#007AFF',
  },
  cashbackLabel: {
    fontSize: 11,
    color: '#666666',
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  actionButtonActive: {
    backgroundColor: '#F0F8FF',
    borderColor: '#007AFF',
  },
  dealFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dealStats: {
    flex: 1,
  },
  popularityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  popularityText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  savingsText: {
    fontSize: 12,
    color: '#666666',
  },
  activateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activateButtonRequired: {
    backgroundColor: '#007AFF',
  },
  activateButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    position: 'relative',
  },
  navItemActive: {
    // Active state styling handled by color changes
  },
  navLabel: {
    fontSize: 11,
    color: '#CCCCCC',
    marginTop: 4,
    fontWeight: '500',
  },
  navLabelActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
  navBadge: {
    position: 'absolute',
    top: 0,
    right: '25%',
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: screenHeight * 0.9,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  modalBody: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#F8F9FA',
  },
  sortOptionSelected: {
    backgroundColor: '#F0F8FF',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  sortOptionText: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  sortOptionTextSelected: {
    color: '#007AFF',
    fontWeight: '600',
  },
  viewModeContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 2,
  },
  viewModeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 6,
  },
  viewModeButtonActive: {
    backgroundColor: '#007AFF',
  },
  viewModeText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 6,
    fontWeight: '500',
  },
  viewModeTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F9FA',
  },
  notificationUnread: {
    backgroundColor: '#F0F8FF',
  },
  notifIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notifContent: {
    flex: 1,
  },
  notifTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  notifSubtitle: {
    fontSize: 13,
    color: '#666666',
  },
  notifRight: {
    alignItems: 'flex-end',
  },
  notifTime: {
    fontSize: 11,
    color: '#999999',
    marginBottom: 4,
  },
  unreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#007AFF',
  },
  analyticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  analyticsCard: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginRight: '4%',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  analyticsValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: 8,
    marginBottom: 4,
  },
  analyticsLabel: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  performanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F9FA',
  },
  performanceLabel: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  performanceValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F9FA',
  },
  settingLabel: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  settingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F9FA',
  },
  settingButtonText: {
    fontSize: 16,
    color: '#1A1A1A',
    marginLeft: 12,
    flex: 1,
  },
});

export default SharperksMainPage;

