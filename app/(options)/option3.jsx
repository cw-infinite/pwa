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
    { name: 'All', emoji: '💸', colors: ['#8B5CF6', '#A855F7'] },
    { name: 'Food', emoji: '🍕', colors: ['#FB923C', '#EC4899'] },
    { name: 'Shopping', emoji: '🛍️', colors: ['#60A5FA', '#06B6D4'] },
    { name: 'Travel', emoji: '✈️', colors: ['#4ADE80', '#10B981'] },
    { name: 'Gas', emoji: '⛽', colors: ['#FBBF24', '#FB923C'] },
    { name: 'Entertainment', emoji: '🎬', colors: ['#F472B6', '#EF4444'] }
  ];

  const deals = [
    {
      id: 1,
      merchant: 'Starbucks',
      cashback: '5%',
      category: 'Food',
      logo: '☕',
      colors: ['#10B981', '#059669'],
      savings: '$23.50',
      popularity: 'fire',
      isNew: true,
      likes: 1247,
      description: 'Your daily coffee fix ☕'
    },
    {
      id: 2,
      merchant: 'Shein',
      cashback: '8%',
      category: 'Shopping',
      logo: '👗',
      colors: ['#F472B6', '#EF4444'],
      savings: '$45.20',
      popularity: 'trending',
      isNew: false,
      likes: 2841,
      description: 'Trendy fashion finds 💅'
    },
    {
      id: 3,
      merchant: 'Uber Eats',
      cashback: '4%',
      category: 'Food',
      logo: '🍔',
      colors: ['#FB923C', '#FBBF24'],
      savings: '$12.80',
      popularity: 'hot',
      isNew: false,
      likes: 892,
      description: 'Food delivered fast 🚗💨'
    },
    {
      id: 4,
      merchant: 'Spotify',
      cashback: '3%',
      category: 'Entertainment',
      logo: '🎵',
      colors: ['#4ADE80', '#06B6D4'],
      savings: '$5.99',
      popularity: 'chill',
      isNew: false,
      likes: 1456,
      description: 'Vibes on repeat 🎶'
    },
    {
      id: 5,
      merchant: 'Target',
      cashback: '3%',
      category: 'Shopping',
      logo: '🎯',
      colors: ['#EF4444', '#F472B6'],
      savings: '$31.75',
      popularity: 'trending',
      isNew: false,
      likes: 1689,
      description: 'Everything you need 🛒'
    },
    {
      id: 6,
      merchant: 'DoorDash',
      cashback: '6%',
      category: 'Food',
      logo: '🥡',
      colors: ['#EF4444', '#FBBF24'],
      savings: '$18.45',
      popularity: 'fire',
      isNew: true,
      likes: 743,
      description: 'Late night cravings 🌙'
    },
    {
      id: 7,
      merchant: 'ASOS',
      cashback: '7%',
      category: 'Shopping',
      logo: '👠',
      colors: ['#A855F7', '#6366F1'],
      savings: '$67.30',
      popularity: 'trending',
      isNew: false,
      likes: 2156,
      description: 'Outfit goals daily 💫'
    },
    {
      id: 8,
      merchant: 'Netflix',
      cashback: '2%',
      category: 'Entertainment',
      logo: '📺',
      colors: ['#EF4444', '#F472B6'],
      savings: '$3.20',
      popularity: 'chill',
      isNew: false,
      likes: 1834,
      description: 'Binge-watch mode 🍿'
    },
    {
      id: 9,
      merchant: 'Sephora',
      cashback: '5%',
      category: 'Shopping',
      logo: '💄',
      colors: ['#F472B6', '#A855F7'],
      savings: '$42.15',
      popularity: 'hot',
      isNew: true,
      likes: 3241,
      description: 'Glow up essentials ✨'
    },
    {
      id: 10,
      merchant: 'Chipotle',
      cashback: '4%',
      category: 'Food',
      logo: '🌯',
      colors: ['#FB923C', '#EF4444'],
      savings: '$8.75',
      popularity: 'fire',
      isNew: false,
      likes: 967,
      description: 'Burrito bowl life 🌶️'
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
          colors={category.colors}
          style={styles.categoryGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
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
    <View style={styles.dealCard}>
      <View style={styles.dealHeader}>
        <View style={styles.dealInfo}>
          <LinearGradient
            colors={deal.colors}
            style={styles.dealLogo}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.dealLogoText}>{deal.logo}</Text>
          </LinearGradient>
          <View style={styles.dealDetails}>
            <View style={styles.dealTitleRow}>
              <Text style={styles.dealMerchant}>{deal.merchant}</Text>
              {deal.isNew && (
                <LinearGradient
                  colors={['#EC4899', '#A855F7']}
                  style={styles.newBadge}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.newBadgeText}>NEW</Text>
                </LinearGradient>
              )}
            </View>
            <Text style={styles.dealDescription}>{deal.description}</Text>
          </View>
        </View>
        <View style={styles.cashbackContainer}>
          <Text style={styles.cashbackText}>{deal.cashback}</Text>
          <Text style={styles.cashbackLabel}>cashback</Text>
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
              likedDeals.has(deal.id) ? styles.likedButton : styles.unlikedButton
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
              likedDeals.has(deal.id) ? styles.likedButtonText : styles.unlikedButtonText
            ]}>
              {deal.likes}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="share-2" size={16} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="bookmark" size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <LinearGradient
              colors={['#A855F7', '#EC4899']}
              style={styles.logoContainer}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Icon name="zap" size={24} color="#ffffff" />
            </LinearGradient>
            <View>
              <Text style={styles.appTitle}>Sharperks</Text>
              <Text style={styles.appSubtitle}>get that bag 💰</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <LinearGradient
              colors={['#4ADE80', '#10B981']}
              style={styles.earningsContainer}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.earningsText}>$247 earned</Text>
            </LinearGradient>
            <LinearGradient
              colors={['#FB923C', '#EC4899']}
              style={styles.profileContainer}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.profileText}>💎</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="search deals bestie..."
            placeholderTextColor="#9CA3AF"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
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
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>28</Text>
          <Text style={styles.statLabel}>deals today</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: '#059669' }]}>$1.2K</Text>
          <Text style={styles.statLabel}>saved total</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: '#EA580C' }]}>12</Text>
          <Text style={styles.statLabel}>streak days</Text>
        </View>
      </View>

      {/* Deals Feed */}
      <View style={styles.feedHeader}>
        <Text style={styles.feedTitle}>Today's Deals</Text>
        <View style={styles.feedCounter}>
          <Icon name="trending-up" size={16} color="#A855F7" />
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
      <TouchableOpacity style={styles.fab}>
        <LinearGradient
          colors={['#A855F7', '#EC4899']}
          style={styles.fabGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Icon name="plus" size={24} color="#ffffff" />
        </LinearGradient>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <LinearGradient
            colors={['#A855F7', '#EC4899']}
            style={styles.navIconActive}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Icon name="shopping-bag" size={16} color="#ffffff" />
          </LinearGradient>
          <Text style={styles.navLabelActive}>Deals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="heart" size={24} color="#9CA3AF" />
          <Text style={styles.navLabel}>Saved</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="trending-up" size={24} color="#9CA3AF" />
          <Text style={styles.navLabel}>Stats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <LinearGradient
            colors={['#FB923C', '#EC4899']}
            style={styles.navIconActive}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.navProfileText}>Me</Text>
          </LinearGradient>
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
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
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    transform: [{ rotate: '12deg' }],
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#1F2937',
  },
  appSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  earningsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
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
  },
  profileText: {
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  categoryEmoji: {
    fontSize: 18,
    marginRight: 8,
  },
  categoryTextSelected: {
    color: '#ffffff',
    fontWeight: '600',
  },
  categoryText: {
    color: '#374151',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: '#7C3AED',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
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
    color: '#1F2937',
  },
  feedCounter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  feedCounterText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#A855F7',
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
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
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
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
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
    marginBottom: 4,
  },
  dealMerchant: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1F2937',
    marginRight: 8,
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
    color: '#6B7280',
  },
  cashbackContainer: {
    alignItems: 'flex-end',
  },
  cashbackText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#059669',
    marginBottom: 2,
  },
  cashbackLabel: {
    fontSize: 12,
    color: '#6B7280',
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
  },
  popularityIcon: {
    fontSize: 18,
    marginRight: 4,
  },
  popularityText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
  },
  savingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  savingsAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#059669',
    marginRight: 4,
  },
  savingsLabel: {
    fontSize: 14,
    color: '#6B7280',
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
    backgroundColor: '#F3F4F6',
  },
  likedButton: {
    backgroundColor: '#FCE7F3',
  },
  unlikedButton: {
    backgroundColor: '#F3F4F6',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  likedButtonText: {
    color: '#EC4899',
  },
  unlikedButtonText: {
    color: '#6B7280',
  },
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  fabGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
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
    color: '#A855F7',
  },
  navLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  navProfileText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
});

export default SharperksMainPage;