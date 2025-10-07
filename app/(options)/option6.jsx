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
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SharperksMainPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [likedDeals, setLikedDeals] = useState(new Set());
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [sortBy, setSortBy] = useState('popular'); // popular, cashback, newest
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { name: 'All', emoji: '💎', colors: ['#8B5CF6', '#A855F7'], shine: ['#C084FC', '#E879F9'] },
    { name: 'Food', emoji: '🍕', colors: ['#FB923C', '#EC4899'], shine: ['#FDBA74', '#F9A8D4'] },
    { name: 'Shopping', emoji: '🛍️', colors: ['#60A5FA', '#06B6D4'], shine: ['#93C5FD', '#67E8F9'] },
    { name: 'Travel', emoji: '✈️', colors: ['#4ADE80', '#10B981'], shine: ['#86EFAC', '#6EE7B7'] },
    { name: 'Gas', emoji: '⛽', colors: ['#FBBF24', '#FB923C'], shine: ['#FCD34D', '#FDBA74'] },
    { name: 'Entertainment', emoji: '🎬', colors: ['#F472B6', '#EF4444'], shine: ['#F9A8D4', '#FCA5A5'] }
  ];

  const quickActions = [
    { name: 'Scan Receipt', icon: 'camera', colors: ['#10B981', '#059669'] },
    { name: 'Invite Friends', icon: 'user-plus', colors: ['#F59E0B', '#D97706'] },
    { name: 'Rewards', icon: 'gift', colors: ['#EF4444', '#DC2626'] },
    { name: 'Wallet', icon: 'credit-card', colors: ['#8B5CF6', '#7C3AED'] },
  ];

  const deals = [
    {
      id: 1,
      merchant: 'Starbucks',
      cashback: '5%',
      category: 'Food',
      logo: '☕',
      colors: ['#10B981', '#059669'],
      shine: ['#34D399', '#10B981'],
      savings: '$23.50',
      popularity: 'fire',
      isNew: true,
      likes: 1247,
      description: 'Your daily coffee fix ☕',
      rating: 4.8,
      expires: '2 days',
      maxCashback: '$50'
    },
    {
      id: 2,
      merchant: 'Shein',
      cashback: '8%',
      category: 'Shopping',
      logo: '👗',
      colors: ['#F472B6', '#EF4444'],
      shine: ['#F9A8D4', '#FCA5A5'],
      savings: '$45.20',
      popularity: 'trending',
      isNew: false,
      likes: 2841,
      description: 'Trendy fashion finds 💅',
      rating: 4.6,
      expires: '5 days',
      maxCashback: '$100'
    },
    {
      id: 3,
      merchant: 'Uber Eats',
      cashback: '4%',
      category: 'Food',
      logo: '🍔',
      colors: ['#FB923C', '#FBBF24'],
      shine: ['#FDBA74', '#FCD34D'],
      savings: '$12.80',
      popularity: 'hot',
      isNew: false,
      likes: 892,
      description: 'Food delivered fast 🚗💨',
      rating: 4.7,
      expires: '1 day',
      maxCashback: '$25'
    },
    {
      id: 4,
      merchant: 'Spotify',
      cashback: '3%',
      category: 'Entertainment',
      logo: '🎵',
      colors: ['#4ADE80', '#06B6D4'],
      shine: ['#86EFAC', '#67E8F9'],
      savings: '$5.99',
      popularity: 'chill',
      isNew: false,
      likes: 1456,
      description: 'Vibes on repeat 🎶',
      rating: 4.9,
      expires: '7 days',
      maxCashback: '$15'
    },
    {
      id: 5,
      merchant: 'Target',
      cashback: '3%',
      category: 'Shopping',
      logo: '🎯',
      colors: ['#EF4444', '#F472B6'],
      shine: ['#FCA5A5', '#F9A8D4'],
      savings: '$31.75',
      popularity: 'trending',
      isNew: false,
      likes: 1689,
      description: 'Everything you need 🛒',
      rating: 4.5,
      expires: '3 days',
      maxCashback: '$75'
    },
    {
      id: 6,
      merchant: 'DoorDash',
      cashback: '6%',
      category: 'Food',
      logo: '🥡',
      colors: ['#EF4444', '#FBBF24'],
      shine: ['#FCA5A5', '#FCD34D'],
      savings: '$18.45',
      popularity: 'fire',
      isNew: true,
      likes: 743,
      description: 'Late night cravings 🌙',
      rating: 4.4,
      expires: '4 days',
      maxCashback: '$40'
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

  const getPopularityIcon = (popularity) => {
    switch(popularity) {
      case 'fire': return '🔥';
      case 'trending': return '📈';
      case 'hot': return '🌶️';
      case 'chill': return '😎';
      default: return '✨';
    }
  };

  const CategoryButton = ({ category, isSelected, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.categoryButton}>
      {isSelected ? (
        <LinearGradient
          colors={category.shine}
          style={[styles.categoryGradient, styles.shinyEffect]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.categoryEmoji}>{category.emoji}</Text>
          <Text style={styles.categoryTextSelected}>{category.name}</Text>
          <View style={styles.shimmerOverlay} />
        </LinearGradient>
      ) : (
        <View style={[styles.categoryDefault, styles.glassEffect]}>
          <Text style={styles.categoryEmoji}>{category.emoji}</Text>
          <Text style={styles.categoryText}>{category.name}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const QuickActionButton = ({ action }) => (
    <TouchableOpacity style={styles.quickActionButton}>
      <LinearGradient
        colors={[...action.colors, action.colors[0]]}
        style={[styles.quickActionGradient, styles.shinyEffect]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Icon name={action.icon} size={20} color="#ffffff" />
        <Text style={styles.quickActionText}>{action.name}</Text>
        <View style={styles.shimmerOverlay} />
      </LinearGradient>
    </TouchableOpacity>
  );

  const DealCard = ({ deal }) => (
    <View style={[styles.dealCard, styles.glassEffect, styles.shinyCard]}>
      {/* Card Header */}
      <View style={styles.dealHeader}>
        <View style={styles.dealInfo}>
          <LinearGradient
            colors={deal.shine}
            style={[styles.dealLogo, styles.shinyEffect]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.dealLogoText}>{deal.logo}</Text>
            <View style={styles.shimmerOverlay} />
          </LinearGradient>
          <View style={styles.dealDetails}>
            <View style={styles.dealTitleRow}>
              <Text style={styles.dealMerchant}>{deal.merchant}</Text>
              {deal.isNew && (
                <LinearGradient
                  colors={['#EC4899', '#A855F7', '#EC4899']}
                  style={[styles.newBadge, styles.shinyEffect]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.newBadgeText}>NEW ✨</Text>
                  <View style={styles.shimmerOverlay} />
                </LinearGradient>
              )}
            </View>
            <Text style={styles.dealDescription}>{deal.description}</Text>
            <View style={styles.dealMeta}>
              <View style={styles.ratingContainer}>
                <Icon name="star" size={12} color="#FBBF24" />
                <Text style={styles.ratingText}>{deal.rating}</Text>
              </View>
              <Text style={styles.expiresText}>Expires in {deal.expires}</Text>
            </View>
          </View>
        </View>
        <View style={styles.cashbackContainer}>
          <LinearGradient
            colors={['#10B981', '#059669', '#10B981']}
            style={[styles.cashbackBadge, styles.shinyEffect]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.cashbackText}>{deal.cashback}</Text>
            <Text style={styles.cashbackLabel}>cashback</Text>
            <View style={styles.shimmerOverlay} />
          </LinearGradient>
          <Text style={styles.maxCashbackText}>Max {deal.maxCashback}</Text>
        </View>
      </View>

      {/* Card Actions */}
      <View style={styles.dealActions}>
        <View style={styles.dealStatsLeft}>
          <View style={styles.popularityContainer}>
            <Text style={styles.popularityIcon}>{getPopularityIcon(deal.popularity)}</Text>
            <Text style={styles.popularityText}>{deal.popularity}</Text>
          </View>
          <View style={styles.savingsContainer}>
            <Text style={styles.savingsAmount}>{deal.savings}</Text>
            <Text style={styles.savingsLabel}>saved</Text>
          </View>
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity
            onPress={() => toggleLike(deal.id)}
            style={[
              styles.actionButton,
              likedDeals.has(deal.id) ? styles.likedButton : styles.glassActionButton
            ]}
          >
            <Icon 
              name="heart" 
              size={16} 
              color={likedDeals.has(deal.id) ? '#EC4899' : '#6B7280'}
              fill={likedDeals.has(deal.id) ? '#EC4899' : 'none'}
            />
            <Text style={[
              styles.actionButtonText,
              likedDeals.has(deal.id) ? styles.likedButtonText : styles.actionButtonTextDefault
            ]}>
              {deal.likes}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.glassActionButton]}>
            <Icon name="share-2" size={16} color="#6B7280" />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.glassActionButton]}>
            <Icon name="bookmark" size={16} color="#6B7280" />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.primaryActionButton, styles.shinyEffect]}>
            <LinearGradient
              colors={['#A855F7', '#EC4899', '#A855F7']}
              style={styles.primaryActionGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.primaryActionText}>Activate</Text>
              <View style={styles.shimmerOverlay} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Background */}
      <LinearGradient
        colors={['#0F0F23', '#1A1A2E', '#16213E']}
        style={styles.backgroundGradient}
      >
        
        {/* Header */}
        <View style={[styles.header, styles.glassEffect]}>
          <View style={styles.headerTop}>
            <View style={styles.headerLeft}>
              <LinearGradient
                colors={['#A855F7', '#EC4899', '#A855F7']}
                style={[styles.logoContainer, styles.shinyEffect]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Icon name="zap" size={24} color="#ffffff" />
                <View style={styles.shimmerOverlay} />
              </LinearGradient>
              <View>
                <Text style={styles.appTitle}>Sharperks</Text>
                <Text style={styles.appSubtitle}>get that bag 💰</Text>
              </View>
            </View>
            
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.headerButton}>
                <LinearGradient
                  colors={['#4ADE80', '#10B981', '#4ADE80']}
                  style={[styles.earningsContainer, styles.shinyEffect]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.earningsText}>$247 earned</Text>
                  <View style={styles.shimmerOverlay} />
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.headerButton}>
                <LinearGradient
                  colors={['#FB923C', '#EC4899', '#FB923C']}
                  style={[styles.profileContainer, styles.shinyEffect]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.profileText}>💎</Text>
                  <View style={styles.shimmerOverlay} />
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.headerButton, styles.glassButton]}>
                <Icon name="bell" size={20} color="#ffffff" />
                <View style={styles.notificationDot} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search and Controls */}
          <View style={styles.searchRow}>
            <View style={[styles.searchContainer, styles.glassEffect]}>
              <Icon name="search" size={20} color="#A855F7" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="search deals bestie..."
                placeholderTextColor="#94A3B8"
                value={searchTerm}
                onChangeText={setSearchTerm}
              />
            </View>
            
            <TouchableOpacity 
              style={[styles.controlButton, styles.glassButton]}
              onPress={() => setShowFilters(!showFilters)}
            >
              <Icon name="sliders" size={20} color="#A855F7" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.controlButton, styles.glassButton]}
              onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            >
              <Icon name={viewMode === 'grid' ? 'list' : 'grid'} size={20} color="#A855F7" />
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

        {/* Quick Actions */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.quickActionsContainer}
          contentContainerStyle={styles.quickActionsContent}
        >
          {quickActions.map((action, index) => (
            <QuickActionButton key={index} action={action} />
          ))}
        </ScrollView>

        {/* Stats Dashboard */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, styles.glassCard]}>
            <LinearGradient
              colors={['#8B5CF6', '#A855F7']}
              style={[styles.statIcon, styles.shinyEffect]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Icon name="trending-up" size={16} color="#ffffff" />
              <View style={styles.shimmerOverlay} />
            </LinearGradient>
            <Text style={styles.statNumber}>28</Text>
            <Text style={styles.statLabel}>deals today</Text>
          </View>
          
          <View style={[styles.statCard, styles.glassCard]}>
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={[styles.statIcon, styles.shinyEffect]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Icon name="dollar-sign" size={16} color="#ffffff" />
              <View style={styles.shimmerOverlay} />
            </LinearGradient>
            <Text style={[styles.statNumber, { color: '#10B981' }]}>$1.2K</Text>
            <Text style={styles.statLabel}>saved total</Text>
          </View>
          
          <View style={[styles.statCard, styles.glassCard]}>
            <LinearGradient
              colors={['#F59E0B', '#D97706']}
              style={[styles.statIcon, styles.shinyEffect]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Icon name="award" size={16} color="#ffffff" />
              <View style={styles.shimmerOverlay} />
            </LinearGradient>
            <Text style={[styles.statNumber, { color: '#F59E0B' }]}>12</Text>
            <Text style={styles.statLabel}>streak days</Text>
          </View>
        </View>

        {/* Feed Header */}
        <View style={styles.feedHeader}>
          <View style={styles.feedTitleContainer}>
            <Text style={styles.feedTitle}>Today's Deals</Text>
            <LinearGradient
              colors={['#A855F7', '#EC4899']}
              style={[styles.feedCounter, styles.shinyEffect]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Icon name="trending-up" size={14} color="#ffffff" />
              <Text style={styles.feedCounterText}>{filteredDeals.length} live</Text>
              <View style={styles.shimmerOverlay} />
            </LinearGradient>
          </View>
          
          <View style={styles.sortButtons}>
            {['popular', 'cashback', 'newest'].map((sort) => (
              <TouchableOpacity
                key={sort}
                style={[
                  styles.sortButton,
                  sortBy === sort ? styles.activeSortButton : styles.glassButton
                ]}
                onPress={() => setSortBy(sort)}
              >
                <Text style={[
                  styles.sortButtonText,
                  sortBy === sort ? styles.activeSortButtonText : styles.inactiveSortButtonText
                ]}>
                  {sort}
                </Text>
                {sortBy === sort && <View style={styles.shimmerOverlay} />}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Deals Feed */}
        <ScrollView 
          style={styles.dealsContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.dealsContent}
        >
          {filteredDeals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </ScrollView>

        {/* Floating Action Buttons */}
        <View style={styles.fabContainer}>
          <TouchableOpacity style={styles.fabSecondary}>
            <LinearGradient
              colors={['#EF4444', '#DC2626']}
              style={[styles.fabGradient, styles.shinyEffect]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Icon name="camera" size={20} color="#ffffff" />
              <View style={styles.shimmerOverlay} />
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.fabPrimary}>
            <LinearGradient
              colors={['#A855F7', '#EC4899', '#A855F7']}
              style={[styles.fabGradient, styles.shinyEffect]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Icon name="plus" size={24} color="#ffffff" />
              <View style={styles.shimmerOverlay} />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Enhanced Bottom Navigation */}
        <View style={[styles.bottomNav, styles.glassEffect]}>
          <TouchableOpacity style={styles.navItem}>
            <LinearGradient
              colors={['#A855F7', '#EC4899']}
              style={[styles.navIconActive, styles.shinyEffect]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Icon name="shopping-bag" size={18} color="#ffffff" />
              <View style={styles.shimmerOverlay} />
            </LinearGradient>
            <Text style={styles.navLabelActive}>Deals</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItem}>
            <View style={[styles.navIconInactive, styles.glassButton]}>
              <Icon name="heart" size={18} color="#94A3B8" />
            </View>
            <Text style={styles.navLabel}>Saved</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItem}>
            <View style={[styles.navIconInactive, styles.glassButton]}>
              <Icon name="bar-chart-2" size={18} color="#94A3B8" />
            </View>
            <Text style={styles.navLabel}>Stats</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItem}>
            <View style={[styles.navIconInactive, styles.glassButton]}>
              <Icon name="user" size={18} color="#94A3B8" />
            </View>
            <Text style={styles.navLabel}>Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItem}>
            <View style={[styles.navIconInactive, styles.glassButton]}>
              <Icon name="settings" size={18} color="#94A3B8" />
            </View>
            <Text style={styles.navLabel}>Settings</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
  },
  glassEffect: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  shinyEffect: {
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    left: '-100%',
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    transform: [{ skewX: '20deg' }],
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    borderRadius: 24,
    marginHorizontal: 16,
    marginTop: 8,
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
  logoContainer: {
    width: 52,
    height: 52,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    transform: [{ rotate: '12deg' }],
    overflow: 'hidden',
  },
  appTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#ffffff',
  },
  appSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    marginLeft: 8,
  },
  earningsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    overflow: 'hidden',
  },
  earningsText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  profileContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileText: {
    fontSize: 18,
  },
  glassButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
  },
  controlButton: {
    marginLeft: 8,
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
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    overflow: 'hidden',
  },
  categoryDefault: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
  },
  categoryEmoji: {
    fontSize: 18,
    marginRight: 8,
  },
  categoryTextSelected: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  categoryText: {
    color: '#94A3B8',
    fontWeight: '600',
    fontSize: 14,
  },
  quickActionsContainer: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  quickActionsContent: {
    paddingRight: 20,
  },
  quickActionButton: {
    marginRight: 16,
  },
  quickActionGradient: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: 'center',
    minWidth: 120,
    overflow: 'hidden',
  },
  quickActionText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 12,
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    overflow: 'hidden',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: '#A855F7',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },
  feedHeader: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  feedTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  feedTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#ffffff',
  },
  feedCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    overflow: 'hidden',
  },
  feedCounterText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
    marginLeft: 4,
  },
  sortButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  sortButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  activeSortButton: {
    backgroundColor: 'rgba(168, 85, 247, 0.3)',
    borderWidth: 1,
    borderColor: '#A855F7',
  },
  sortButtonText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  activeSortButtonText: {
    color: '#ffffff',
  },
  inactiveSortButtonText: {
    color: '#94A3B8',
  },
  dealsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  dealsContent: {
    paddingBottom: 120,
  },
  dealCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
  },
  shinyCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
  dealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  dealInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  dealLogo: {
    width: 60,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    overflow: 'hidden',
  },
  dealLogoText: {
    fontSize: 24,
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
    fontSize: 20,
    fontWeight: '900',
    color: '#ffffff',
    marginRight: 12,
  },
  newBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    overflow: 'hidden',
  },
  newBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
  dealDescription: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 8,
  },
  dealMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#FBBF24',
    fontWeight: '600',
    marginLeft: 4,
  },
  expiresText: {
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: '500',
  },
  cashbackContainer: {
    alignItems: 'flex-end',
  },
  cashbackBadge: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 6,
    overflow: 'hidden',
  },
  cashbackText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 2,
  },
  cashbackLabel: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: '600',
    opacity: 0.8,
  },
  maxCashbackText: {
    fontSize: 11,
    color: '#10B981',
    fontWeight: '500',
  },
  dealActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dealStatsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  popularityIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  popularityText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
    textTransform: 'capitalize',
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
    fontSize: 14,
    color: '#94A3B8',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  glassActionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  likedButton: {
    backgroundColor: 'rgba(236, 72, 153, 0.2)',
    borderWidth: 1,
    borderColor: '#EC4899',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  actionButtonTextDefault: {
    color: '#94A3B8',
  },
  likedButtonText: {
    color: '#EC4899',
  },
  primaryActionButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  primaryActionGradient: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryActionText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    gap: 16,
  },
  fabSecondary: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  fabPrimary: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  fabGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  bottomNav: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navIconActive: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    overflow: 'hidden',
  },
  navIconInactive: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  navLabelActive: {
    fontSize: 11,
    fontWeight: '700',
    color: '#A855F7',
  },
  navLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
});

export default SharperksMainPage;
