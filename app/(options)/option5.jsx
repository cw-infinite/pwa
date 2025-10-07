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
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [sortBy, setSortBy] = useState('trending');

  const categories = [
    { name: 'All', icon: '⚡', colors: ['#667eea', '#764ba2'] },
    { name: 'Food', icon: '🍕', colors: ['#ff9a9e', '#fecfef'] },
    { name: 'Shopping', icon: '🛍️', colors: ['#a8edea', '#fed6e3'] },
    { name: 'Travel', icon: '✈️', colors: ['#ffecd2', '#fcb69f'] },
    { name: 'Gas', icon: '⛽', colors: ['#ffd89b', '#19547b'] },
    { name: 'Entertainment', icon: '🎬', colors: ['#ff8a80', '#ea4c89'] },
    { name: 'Health', icon: '💊', colors: ['#96fbc4', '#f9f047'] },
    { name: 'Tech', icon: '📱', colors: ['#667eea', '#764ba2'] }
  ];

  const quickActions = [
    { name: 'Scan Receipt', icon: 'camera', colors: ['#667eea', '#764ba2'] },
    { name: 'Referrals', icon: 'users', colors: ['#ff9a9e', '#fecfef'] },
    { name: 'Wallet', icon: 'credit-card', colors: ['#a8edea', '#fed6e3'] },
    { name: 'History', icon: 'clock', colors: ['#ffecd2', '#fcb69f'] }
  ];

  const deals = [
    {
      id: 1,
      merchant: 'Starbucks',
      cashback: '5.5%',
      category: 'Food',
      icon: '☕',
      colors: ['#667eea', '#764ba2'],
      savings: '$23.50',
      popularity: 'fire',
      isNew: true,
      likes: 1247,
      description: 'Premium coffee & pastries',
      rating: 4.8,
      expires: '2 days',
      bonus: '+2% weekend',
      limit: '$50 max'
    },
    {
      id: 2,
      merchant: 'Shein',
      cashback: '8.0%',
      category: 'Shopping',
      icon: '👗',
      colors: ['#ff9a9e', '#fecfef'],
      savings: '$45.20',
      popularity: 'trending',
      isNew: false,
      likes: 2841,
      description: 'Trendy fashion & accessories',
      rating: 4.6,
      expires: '5 days',
      bonus: 'Free shipping',
      limit: '$100 max'
    },
    {
      id: 3,
      merchant: 'Uber Eats',
      cashback: '4.5%',
      category: 'Food',
      icon: '🍔',
      colors: ['#a8edea', '#fed6e3'],
      savings: '$12.80',
      popularity: 'hot',
      isNew: false,
      likes: 892,
      description: 'Food delivery nationwide',
      rating: 4.4,
      expires: '1 day',
      bonus: 'No delivery fee',
      limit: '$25 max'
    },
    {
      id: 4,
      merchant: 'Netflix',
      cashback: '3.0%',
      category: 'Entertainment',
      icon: '📺',
      colors: ['#ff8a80', '#ea4c89'],
      savings: '$5.99',
      popularity: 'steady',
      isNew: true,
      likes: 1456,
      description: 'Streaming entertainment',
      rating: 4.9,
      expires: '7 days',
      bonus: '1 month free',
      limit: '$15 max'
    },
    {
      id: 5,
      merchant: 'Amazon',
      cashback: '6.0%',
      category: 'Shopping',
      icon: '📦',
      colors: ['#ffecd2', '#fcb69f'],
      savings: '$67.45',
      popularity: 'fire',
      isNew: false,
      likes: 3421,
      description: 'Everything you need',
      rating: 4.7,
      expires: '3 days',
      bonus: 'Prime eligible',
      limit: '$200 max'
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
      case 'steady': return '⭐';
      default: return '✨';
    }
  };

  const CategoryButton = ({ category, isSelected, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.categoryButton}>
      <LinearGradient
        colors={isSelected ? category.colors : ['#f8fafc', '#f1f5f9']}
        style={[styles.categoryGradient, isSelected && styles.categorySelected]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.categoryIcon}>{category.icon}</Text>
        <Text style={[
          styles.categoryText,
          isSelected ? styles.categoryTextSelected : styles.categoryTextDefault
        ]}>
          {category.name}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const QuickActionButton = ({ action, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.quickActionButton}>
      <LinearGradient
        colors={action.colors}
        style={styles.quickActionGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Icon name={action.icon} size={20} color="#ffffff" />
      </LinearGradient>
      <Text style={styles.quickActionText}>{action.name}</Text>
    </TouchableOpacity>
  );

  const DealCard = ({ deal }) => (
    <View style={styles.dealCard}>
      <LinearGradient
        colors={['rgba(255,255,255,0.9)', 'rgba(248,250,252,0.9)']}
        style={styles.dealCardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Deal Header */}
        <View style={styles.dealHeader}>
          <View style={styles.dealHeaderLeft}>
            <LinearGradient
              colors={deal.colors}
              style={styles.dealLogo}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.dealLogoText}>{deal.icon}</Text>
            </LinearGradient>
            <View style={styles.dealInfo}>
              <View style={styles.dealTitleRow}>
                <Text style={styles.dealMerchant}>{deal.merchant}</Text>
                {deal.isNew && (
                  <LinearGradient
                    colors={['#ff6b6b', '#ee5a52']}
                    style={styles.newBadge}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.newBadgeText}>NEW</Text>
                  </LinearGradient>
                )}
              </View>
              <Text style={styles.dealDescription}>{deal.description}</Text>
              <View style={styles.ratingRow}>
                <View style={styles.ratingContainer}>
                  <Icon name="star" size={12} color="#ffd700" fill="#ffd700" />
                  <Text style={styles.ratingText}>{deal.rating}</Text>
                </View>
                <View style={styles.expiryContainer}>
                  <Icon name="clock" size={12} color="#64748b" />
                  <Text style={styles.expiryText}>{deal.expires}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.cashbackContainer}>
            <LinearGradient
              colors={['#22c55e', '#16a34a']}
              style={styles.cashbackBadge}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.cashbackText}>{deal.cashback}</Text>
            </LinearGradient>
            <Text style={styles.cashbackLabel}>cashback</Text>
          </View>
        </View>

        {/* Deal Stats */}
        <View style={styles.dealStats}>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>{getPopularityIcon(deal.popularity)}</Text>
            <Text style={styles.statText}>{deal.popularity}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statAmount}>{deal.savings}</Text>
            <Text style={styles.statLabel}>saved</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.bonusText}>{deal.bonus}</Text>
            <Text style={styles.limitText}>{deal.limit}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            onPress={() => toggleLike(deal.id)}
            style={[styles.actionBtn, styles.likeBtn]}
          >
            <LinearGradient
              colors={likedDeals.has(deal.id) ? ['#ff6b6b', '#ee5a52'] : ['#f1f5f9', '#e2e8f0']}
              style={styles.actionBtnGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Icon 
                name="heart" 
                size={14} 
                color={likedDeals.has(deal.id) ? '#ffffff' : '#64748b'}
                fill={likedDeals.has(deal.id) ? '#ffffff' : 'none'}
              />
              <Text style={[
                styles.actionBtnText,
                likedDeals.has(deal.id) ? styles.actionBtnTextActive : styles.actionBtnTextInactive
              ]}>
                {deal.likes}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionBtn, styles.shareBtn]}>
            <LinearGradient
              colors={['#3b82f6', '#2563eb']}
              style={styles.actionBtnGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Icon name="share-2" size={14} color="#ffffff" />
              <Text style={styles.actionBtnTextActive}>Share</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionBtn, styles.saveBtn]}>
            <LinearGradient
              colors={['#8b5cf6', '#7c3aed']}
              style={styles.actionBtnGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Icon name="bookmark" size={14} color="#ffffff" />
              <Text style={styles.actionBtnTextActive}>Save</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionBtn, styles.activateBtn]}>
            <LinearGradient
              colors={deal.colors}
              style={styles.actionBtnGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Icon name="zap" size={14} color="#ffffff" />
              <Text style={styles.actionBtnTextActive}>Activate</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      
      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <LinearGradient
              colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
              style={styles.logoContainer}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.logoText}>💎</Text>
            </LinearGradient>
            <View>
              <Text style={styles.appTitle}>Sharperks</Text>
              <Text style={styles.appSubtitle}>Premium Rewards ✨</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.notificationBtn}>
              <LinearGradient
                colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
                style={styles.notificationBtnGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Icon name="bell" size={18} color="#ffffff" />
                <View style={styles.notificationDot} />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileBtn}>
              <LinearGradient
                colors={['#ff6b6b', '#ee5a52']}
                style={styles.profileBtnGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.profileText}>$247</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search & Filters */}
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <LinearGradient
              colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
              style={styles.searchGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Icon name="search" size={18} color="rgba(255,255,255,0.8)" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search deals..."
                placeholderTextColor="rgba(255,255,255,0.6)"
                value={searchTerm}
                onChangeText={setSearchTerm}
              />
            </LinearGradient>
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <LinearGradient
              colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
              style={styles.filterBtnGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Icon name="sliders" size={18} color="#ffffff" />
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.viewToggle}
            onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            <LinearGradient
              colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
              style={styles.viewToggleGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Icon name={viewMode === 'grid' ? 'list' : 'grid'} size={18} color="#ffffff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Quick Actions */}
      <View style={styles.quickActionsContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickActionsContent}
        >
          {quickActions.map((action) => (
            <QuickActionButton
              key={action.name}
              action={action}
              onPress={() => {}}
            />
          ))}
        </ScrollView>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity style={styles.seeAllBtn}>
            <Text style={styles.seeAllText}>See All</Text>
            <Icon name="chevron-right" size={14} color="#667eea" />
          </TouchableOpacity>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
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

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sortContent}
        >
          {['trending', 'highest cashback', 'expiring soon', 'most liked', 'new deals'].map((sort) => (
            <TouchableOpacity
              key={sort}
              style={[styles.sortBtn, sortBy === sort && styles.sortBtnActive]}
              onPress={() => setSortBy(sort)}
            >
              <Text style={[
                styles.sortBtnText,
                sortBy === sort && styles.sortBtnTextActive
              ]}>
                {sort}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Deals Feed */}
      <View style={styles.feedHeader}>
        <Text style={styles.feedTitle}>🔥 Hot Deals ({filteredDeals.length})</Text>
        <View style={styles.feedActions}>
          <TouchableOpacity style={styles.refreshBtn}>
            <Icon name="refresh-cw" size={16} color="#667eea" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sortToggleBtn}>
            <Icon name="trending-up" size={16} color="#667eea" />
          </TouchableOpacity>
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

      {/* Floating Actions */}
      <View style={styles.floatingActions}>
        <TouchableOpacity style={styles.fabSecondary}>
          <LinearGradient
            colors={['#22c55e', '#16a34a']}
            style={styles.fabGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Icon name="camera" size={20} color="#ffffff" />
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.fabPrimary}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.fabGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Icon name="plus" size={24} color="#ffffff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <LinearGradient
          colors={['rgba(255,255,255,0.95)', 'rgba(248,250,252,0.95)']}
          style={styles.bottomNavGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          {[
            { name: 'Home', icon: 'home', active: true },
            { name: 'Deals', icon: 'tag' },
            { name: 'Wallet', icon: 'credit-card' },
            { name: 'Stats', icon: 'bar-chart-2' },
            { name: 'More', icon: 'menu' }
          ].map((item) => (
            <TouchableOpacity key={item.name} style={styles.navItem}>
              {item.active ? (
                <LinearGradient
                  colors={['#667eea', '#764ba2']}
                  style={styles.navItemActive}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Icon name={item.icon} size={18} color="#ffffff" />
                </LinearGradient>
              ) : (
                <Icon name={item.icon} size={20} color="#9ca3af" />
              )}
              <Text style={[
                styles.navLabel,
                item.active && styles.navLabelActive
              ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </LinearGradient>
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
    paddingTop: 16,
    paddingBottom: 20,
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
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 20,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#ffffff',
  },
  appSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationBtn: {
    marginRight: 12,
  },
  notificationBtnGradient: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff6b6b',
  },
  profileBtn: {},
  profileBtnGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  profileText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchContainer: {
    flex: 1,
  },
  searchGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
    marginLeft: 12,
  },
  filterBtn: {},
  filterBtnGradient: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  viewToggle: {},
  viewToggleGradient: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  quickActionsContainer: {
    paddingVertical: 20,
    backgroundColor: '#ffffff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  quickActionsContent: {
    paddingHorizontal: 20,
    gap: 16,
  },
  quickActionButton: {
    alignItems: 'center',
  },
  quickActionGradient: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
  },
  categoriesContainer: {
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
    marginRight: 4,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryButton: {
    borderRadius: 20,
  },
  categoryGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  categorySelected: {
    borderColor: 'transparent',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  categoryTextSelected: {
    color: '#ffffff',
  },
  categoryTextDefault: {
    color: '#64748b',
  },
  sortContainer: {
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  sortContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  sortBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  sortBtnActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  sortBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'capitalize',
  },
  sortBtnTextActive: {
    color: '#ffffff',
  },
  feedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  feedTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  feedActions: {
    flexDirection: 'row',
    gap: 12,
  },
  refreshBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  sortToggleBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  dealsContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  dealsContent: {
    padding: 20,
    paddingBottom: 120,
  },
  dealCard: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  dealCardGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  dealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dealHeaderLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  dealLogo: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  dealLogoText: {
    fontSize: 24,
  },
  dealInfo: {
    flex: 1,
  },
  dealTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  dealMerchant: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1e293b',
    marginRight: 8,
  },
  newBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  newBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  dealDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  ratingRow: {
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
    fontWeight: '600',
    color: '#64748b',
    marginLeft: 4,
  },
  expiryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expiryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    marginLeft: 4,
  },
  cashbackContainer: {
    alignItems: 'center',
  },
  cashbackBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginBottom: 4,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cashbackText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#ffffff',
  },
  cashbackLabel: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '600',
  },
  dealStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(248,250,252,0.5)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.5)',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  statText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'capitalize',
  },
  statAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#059669',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: '#64748b',
  },
  bonusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7c3aed',
    marginBottom: 2,
  },
  limitText: {
    fontSize: 10,
    color: '#64748b',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  actionBtnTextActive: {
    color: '#ffffff',
  },
  actionBtnTextInactive: {
    color: '#64748b',
  },
  floatingActions: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    alignItems: 'center',
    gap: 12,
  },
  fabSecondary: {
    borderRadius: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabPrimary: {
    borderRadius: 20,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  fabGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  bottomNavGradient: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(226,232,240,0.3)',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navItemActive: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  navLabel: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 4,
    fontWeight: '500',
  },
  navLabelActive: {
    color: '#667eea',
    fontWeight: '700',
  },
});

export default SharperksMainPage;
