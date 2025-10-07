import React, { useState, useEffect } from 'react';
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
  const [animatedValue] = useState(new Animated.Value(0));
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    // Pulse animation for FAB
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
  }, []);

  const categories = [
    { name: 'All', emoji: '💎', colors: ['#667eea', '#764ba2'], shadowColor: '#667eea' },
    { name: 'Food', emoji: '🍕', colors: ['#f093fb', '#f5576c'], shadowColor: '#f093fb' },
    { name: 'Shopping', emoji: '🛍️', colors: ['#4facfe', '#00f2fe'], shadowColor: '#4facfe' },
    { name: 'Travel', emoji: '✈️', colors: ['#43e97b', '#38f9d7'], shadowColor: '#43e97b' },
    { name: 'Gas', emoji: '⛽', colors: ['#fa709a', '#fee140'], shadowColor: '#fa709a' },
    { name: 'Entertainment', emoji: '🎬', colors: ['#a8edea', '#fed6e3'], shadowColor: '#a8edea' },
    { name: 'Tech', emoji: '📱', colors: ['#ff9a9e', '#fecfef'], shadowColor: '#ff9a9e' },
    { name: 'Fitness', emoji: '💪', colors: ['#96fbc4', '#f9f047'], shadowColor: '#96fbc4' }
  ];

  const deals = [
    {
      id: 1,
      merchant: 'Starbucks',
      cashback: '5%',
      category: 'Food',
      logo: '☕',
      colors: ['#667eea', '#764ba2'],
      savings: '$23.50',
      popularity: 'fire',
      isNew: true,
      likes: 1247,
      description: 'Your daily coffee fix ☕',
      rating: 4.8,
      expiresIn: '2 days',
      featured: true
    },
    {
      id: 2,
      merchant: 'Shein',
      cashback: '8%',
      category: 'Shopping',
      logo: '👗',
      colors: ['#f093fb', '#f5576c'],
      savings: '$45.20',
      popularity: 'trending',
      isNew: false,
      likes: 2841,
      description: 'Trendy fashion finds 💅',
      rating: 4.6,
      expiresIn: '5 days',
      featured: false
    },
    {
      id: 3,
      merchant: 'Uber Eats',
      cashback: '4%',
      category: 'Food',
      logo: '🍔',
      colors: ['#fa709a', '#fee140'],
      savings: '$12.80',
      popularity: 'hot',
      isNew: false,
      likes: 892,
      description: 'Food delivered fast 🚗💨',
      rating: 4.5,
      expiresIn: '1 day',
      featured: false
    },
    {
      id: 4,
      merchant: 'Spotify',
      cashback: '3%',
      category: 'Entertainment',
      logo: '🎵',
      colors: ['#4facfe', '#00f2fe'],
      savings: '$5.99',
      popularity: 'chill',
      isNew: false,
      likes: 1456,
      description: 'Vibes on repeat 🎶',
      rating: 4.9,
      expiresIn: '7 days',
      featured: false
    },
    {
      id: 5,
      merchant: 'Apple Store',
      cashback: '2%',
      category: 'Tech',
      logo: '🍎',
      colors: ['#ff9a9e', '#fecfef'],
      savings: '$89.99',
      popularity: 'fire',
      isNew: true,
      likes: 3456,
      description: 'Latest tech gadgets 📱',
      rating: 4.7,
      expiresIn: '3 days',
      featured: true
    },
    {
      id: 6,
      merchant: 'Nike',
      cashback: '6%',
      category: 'Fitness',
      logo: '👟',
      colors: ['#96fbc4', '#f9f047'],
      savings: '$67.50',
      popularity: 'trending',
      isNew: true,
      likes: 2134,
      description: 'Just do it ✨',
      rating: 4.8,
      expiresIn: '4 days',
      featured: true
    }
  ];

  const notifications = [
    { id: 1, title: 'New 10% cashback deal!', subtitle: 'Amazon Prime Day special', time: '2m ago', type: 'deal' },
    { id: 2, title: 'Cashback earned!', subtitle: '$12.50 from Starbucks', time: '1h ago', type: 'earning' },
    { id: 3, title: 'Deal expires soon', subtitle: 'Nike deal ends in 2 hours', time: '3h ago', type: 'warning' }
  ];

  const filteredDeals = deals
    .filter(deal => 
      (selectedCategory === 'All' || deal.category === selectedCategory) &&
      deal.merchant.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'cashback') return parseFloat(b.cashback) - parseFloat(a.cashback);
      if (sortBy === 'savings') return parseFloat(b.savings.replace('$', '')) - parseFloat(a.savings.replace('$', ''));
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'likes') return b.likes - a.likes;
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
          colors={category.colors}
          style={[styles.categoryGradient, {
            shadowColor: category.shadowColor,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.categoryEmoji}>{category.emoji}</Text>
          <Text style={styles.categoryTextSelected}>{category.name}</Text>
        </LinearGradient>
      ) : (
        <View style={styles.categoryDefault}>
          <Text style={styles.categoryEmoji}>{category.emoji}</Text>
          <Text style={styles.categoryText}>{category.name}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const DealCard = ({ deal }) => (
    <View style={[styles.dealCard, deal.featured && styles.featuredCard]}>
      {deal.featured && (
        <LinearGradient
          colors={['#FFD700', '#FFA500']}
          style={styles.featuredBadge}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Icon name="star" size={12} color="#fff" />
          <Text style={styles.featuredText}>FEATURED</Text>
        </LinearGradient>
      )}
      
      <View style={styles.dealHeader}>
        <View style={styles.dealInfo}>
          <LinearGradient
            colors={deal.colors}
            style={[styles.dealLogo, {
              shadowColor: deal.colors[0],
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.dealLogoText}>{deal.logo}</Text>
          </LinearGradient>
          <View style={styles.dealDetails}>
            <View style={styles.dealTitleRow}>
              <Text style={styles.dealMerchant}>{deal.merchant}</Text>
              {deal.isNew && (
                <LinearGradient
                  colors={['#FF6B6B', '#FFE66D']}
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
                <Icon name="star" size={12} color="#FFD700" fill="#FFD700" />
                <Text style={styles.ratingText}>{deal.rating}</Text>
              </View>
              <Text style={styles.expiresText}>Expires in {deal.expiresIn}</Text>
            </View>
          </View>
        </View>
        <View style={styles.cashbackContainer}>
          <LinearGradient
            colors={['#4facfe', '#00f2fe']}
            style={styles.cashbackBadge}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.cashbackText}>{deal.cashback}</Text>
            <Text style={styles.cashbackLabel}>cashback</Text>
          </LinearGradient>
        </View>
      </View>

      <View style={styles.dealStats}>
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
              size={16} 
              color={likedDeals.has(deal.id) ? '#FF6B6B' : '#6B7280'}
              fill={likedDeals.has(deal.id) ? '#FF6B6B' : 'none'}
            />
            <Text style={[
              styles.actionButtonText,
              likedDeals.has(deal.id) && styles.likedButtonText
            ]}>
              {deal.likes}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButtonDefault}>
            <Icon name="share-2" size={16} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => toggleSave(deal.id)}
            style={[
              styles.actionButton,
              savedDeals.has(deal.id) ? styles.savedButton : styles.actionButtonDefault
            ]}
          >
            <Icon 
              name="bookmark" 
              size={16} 
              color={savedDeals.has(deal.id) ? '#4facfe' : '#6B7280'}
              fill={savedDeals.has(deal.id) ? '#4facfe' : 'none'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const FilterModal = () => (
    <Modal
      visible={showFilterModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowFilterModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.modalHeader}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.modalTitle}>Sort & Filter</Text>
            <TouchableOpacity onPress={() => setShowFilterModal(false)}>
              <Icon name="x" size={24} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>
          
          <View style={styles.modalBody}>
            <Text style={styles.sectionTitle}>Sort by:</Text>
            {['cashback', 'savings', 'rating', 'likes'].map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.sortOption, sortBy === option && styles.sortOptionSelected]}
                onPress={() => setSortBy(option)}
              >
                <Text style={[styles.sortOptionText, sortBy === option && styles.sortOptionTextSelected]}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Text>
                {sortBy === option && <Icon name="check" size={16} color="#667eea" />}
              </TouchableOpacity>
            ))}
          </View>
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
        <View style={[styles.modalContent, { marginTop: 100 }]}>
          <LinearGradient
            colors={['#f093fb', '#f5576c']}
            style={styles.modalHeader}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.modalTitle}>Notifications</Text>
            <TouchableOpacity onPress={() => setShowNotifications(false)}>
              <Icon name="x" size={24} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>
          
          <View style={styles.modalBody}>
            {notifications.map((notif) => (
              <View key={notif.id} style={styles.notificationItem}>
                <View style={[
                  styles.notifIcon,
                  { backgroundColor: notif.type === 'deal' ? '#4facfe' : notif.type === 'earning' ? '#43e97b' : '#fa709a' }
                ]}>
                  <Icon 
                    name={notif.type === 'deal' ? 'tag' : notif.type === 'earning' ? 'dollar-sign' : 'clock'} 
                    size={16} 
                    color="#fff" 
                  />
                </View>
                <View style={styles.notifContent}>
                  <Text style={styles.notifTitle}>{notif.title}</Text>
                  <Text style={styles.notifSubtitle}>{notif.subtitle}</Text>
                </View>
                <Text style={styles.notifTime}>{notif.time}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <LinearGradient
              colors={['#FFD700', '#FFA500']}
              style={styles.logoContainer}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Icon name="zap" size={24} color="#ffffff" />
            </LinearGradient>
            <View>
              <Text style={styles.appTitle}>Sharperks</Text>
              <Text style={styles.appSubtitle}>get that bag 💰</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => setShowNotifications(true)}>
              <LinearGradient
                colors={['#f093fb', '#f5576c']}
                style={styles.notificationButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Icon name="bell" size={18} color="#ffffff" />
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>3</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <LinearGradient
              colors={['#4facfe', '#00f2fe']}
              style={styles.earningsContainer}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.earningsText}>$247 earned</Text>
            </LinearGradient>
            <LinearGradient
              colors={['#fa709a', '#fee140']}
              style={styles.profileContainer}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.profileText}>💎</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#667eea" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="search deals bestie..."
            placeholderTextColor="rgba(102, 126, 234, 0.6)"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <TouchableOpacity onPress={() => setShowFilterModal(true)} style={styles.filterButton}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.filterButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Icon name="sliders" size={16} color="#ffffff" />
            </LinearGradient>
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

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <LinearGradient
          colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
          style={styles.statCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.statNumber}>28</Text>
          <Text style={styles.statLabel}>deals today</Text>
        </LinearGradient>
        <LinearGradient
          colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
          style={styles.statCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={[styles.statNumber, { color: '#43e97b' }]}>$1.2K</Text>
          <Text style={styles.statLabel}>saved total</Text>
        </LinearGradient>
        <LinearGradient
          colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
          style={styles.statCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={[styles.statNumber, { color: '#fa709a' }]}>12</Text>
          <Text style={styles.statLabel}>streak days</Text>
        </LinearGradient>
      </View>

      {/* Deals Feed */}
      <View style={styles.feedHeader}>
        <Text style={styles.feedTitle}>Today's Deals</Text>
        <View style={styles.feedCounter}>
          <Icon name="trending-up" size={16} color="#FFD700" />
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

      {/* Floating Action Button */}
      <Animated.View style={[styles.fab, { transform: [{ scale: pulseAnim }] }]}>
        <TouchableOpacity>
          <LinearGradient
            colors={['#FFD700', '#FFA500']}
            style={styles.fabGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Icon name="plus" size={24} color="#ffffff" />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      {/* Bottom Navigation */}
      <LinearGradient
        colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.8)']}
        style={styles.bottomNav}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <TouchableOpacity style={styles.navItem}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.navIconActive}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Icon name="shopping-bag" size={16} color="#ffffff" />
          </LinearGradient>
          <Text style={styles.navLabelActive}>Deals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="heart" size={24} color="rgba(102, 126, 234, 0.6)" />
          <Text style={styles.navLabel}>Saved</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="trending-up" size={24} color="rgba(102, 126, 234, 0.6)" />
          <Text style={styles.navLabel}>Stats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <LinearGradient
            colors={['#fa709a', '#fee140']}
            style={styles.navIconActive}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.navProfileText}>Me</Text>
          </LinearGradient>
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </LinearGradient>

      <FilterModal />
      <NotificationModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: screenHeight,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 12,
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
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#ffffff',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  appSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#f093fb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  earningsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    shadowColor: '#4facfe',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  earningsText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  profileContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#fa709a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  profileText: {
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    backdropFilter: 'blur(10px)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
  },
  filterButton: {
    marginLeft: 12,
  },
  filterButtonGradient: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
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
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  categoryDefault: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  categoryEmoji: {
    fontSize: 18,
    marginRight: 8,
  },
  categoryTextSelected: {
    color: '#ffffff',
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  categoryText: {
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backdropFilter: 'blur(10px)',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
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
    fontSize: 24,
    fontWeight: '900',
    color: '#ffffff',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  feedCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  feedCounterText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
    marginLeft: 4,
  },
  dealsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  dealsContent: {
    paddingBottom: 120,
  },
  dealCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backdropFilter: 'blur(20px)',
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  featuredCard: {
    borderWidth: 2,
    borderColor: 'rgba(255,215,0,0.5)',
    shadowColor: '#FFD700',
    shadowOpacity: 0.4,
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  featuredText: {
    color: '#fff',
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
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  dealLogoText: {
    fontSize: 26,
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
    marginRight: 8,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  newBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  newBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
  dealDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFD700',
    marginLeft: 4,
  },
  expiresText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    fontStyle: 'italic',
  },
  cashbackContainer: {
    alignItems: 'flex-end',
  },
  cashbackBadge: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    shadowColor: '#4facfe',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  cashbackText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#ffffff',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  cashbackLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
  dealStats: {
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
    marginRight: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  popularityIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  popularityText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
  savingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(67,227,123,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(67,227,123,0.3)',
  },
  savingsAmount: {
    fontSize: 12,
    fontWeight: '700',
    color: '#43e97b',
    marginRight: 4,
  },
  savingsLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
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
    borderRadius: 16,
    marginLeft: 8,
  },
  actionButtonDefault: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginLeft: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  likedButton: {
    backgroundColor: 'rgba(255,107,107,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,107,107,0.3)',
  },
  savedButton: {
    backgroundColor: 'rgba(79,172,254,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(79,172,254,0.3)',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
    color: 'rgba(255,255,255,0.8)',
  },
  likedButtonText: {
    color: '#FF6B6B',
  },
  fab: {
    position: 'absolute',
    bottom: 120,
    right: 20,
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
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  bottomNav: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
    marginBottom: 4,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  navLabelActive: {
    fontSize: 12,
    fontWeight: '700',
    color: '#667eea',
  },
  navLabel: {
    fontSize: 12,
    color: 'rgba(102, 126, 234, 0.6)',
    marginTop: 4,
  },
  navProfileText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: screenWidth - 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    maxHeight: screenHeight * 0.8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
  },
  modalBody: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#F9FAFB',
  },
  sortOptionSelected: {
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    borderWidth: 1,
    borderColor: '#667eea',
  },
  sortOptionText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  sortOptionTextSelected: {
    color: '#667eea',
    fontWeight: '700',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
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
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  notifSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  notifTime: {
    fontSize: 11,
    color: '#9CA3AF',
  },
});

export default SharperksMainPage;
