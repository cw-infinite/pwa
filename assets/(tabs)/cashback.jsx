import React, { useState, useEffect } from 'react';

import { StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Share, 
} from "react-native";
import { useLocalSearchParams } from 'expo-router';
import { getCashbackDeal } from '../utils/dealsApi';
import { Feather } from '@expo/vector-icons';



export default function CashBack() {
    const { id } = useLocalSearchParams();
    const [item, setItem] = useState();

    const formatDate = (dateString) => {
      if (!dateString) return 'No expiration';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    };

    const handleShare = async () => {
      try {
        await Share.share({
          message: `Check out this great ${item.cashbackPercent}% cash back deal at ${item.merchant}! ${item.description}`,
          title: `${item.merchant} Cash Back Deal`,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    };

    useEffect(() => {
      const loadDeal = () => {
        const selectedItem = getCashbackDeal(parseInt(id));
        setItem(selectedItem);
      }
      loadDeal();
    }, [id])
    return (
      (item ?
        <ScrollView style={styles.container}>
            <View style={styles.dealHeader}>
                <Text style={styles.merchantName}>{item.merchant}</Text>
                <Text style={styles.cashbackAmount}>{item.cashbackPercent}% Cash Back</Text>
            </View>

            <View style={styles.categoryContainer}>
                <Text style={styles.categoryLabel}>Category:</Text>
                <View style={styles.categoryTag}>
                <Text style={styles.categoryText}>{item.category}</Text>
                </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Deal Details</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>

            {item.terms && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Terms & Conditions</Text>
                <Text style={styles.terms}>{item.terms}</Text>
              </View>
            )}

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>How to Redeem</Text>
              <Text style={styles.redemptionText}>
                Use your Bank of America credit card at checkout to automatically earn this cash back reward.
              </Text>
            </View>

            <View style={styles.infoRow}>
              {/* <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Valid From</Text>
                <Text style={styles.infoValue}>{formatDate(deal.startDate || new Date())}</Text>
              </View> */}
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Expires On</Text>
                <Text style={styles.infoValue}>{formatDate(item.expiryDate)}</Text>
              </View>
            </View>

            <View style={styles.buttonContainer}>
            {/* <TouchableOpacity style={styles.primaryButton} >
              <Feather name="external-link" size={20} color="#FFFFFF" />
              <Text style={styles.primaryButtonText}>Visit Merchant</Text>
            </TouchableOpacity> */}
            
            <TouchableOpacity style={styles.secondaryButton} onPress={handleShare}>
              <Feather name="share-2" size={20} color="#000000" />
              <Text style={styles.secondaryButtonText}>Share Deal</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
        :
        <View style={styles.dealHeader}>
            Error
        </View>

      )
        

    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  dealHeader: {
    padding: 20,
    backgroundColor: '#F9F9F9',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  merchantName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  cashbackAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#16a772',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  categoryLabel: {
    fontSize: 16,
    color: '#666666',
    marginRight: 10,
  },
  categoryTag: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 14,
    color: '#666666',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
  },
  terms: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 22,
  },
  redemptionText: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
  },
  infoRow: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  buttonContainer: {
    padding: 20,
    gap: 15,
  },
  primaryButton: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 10,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000000',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: 10,
  },
});