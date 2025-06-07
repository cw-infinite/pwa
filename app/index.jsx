import { Redirect , useRouter } from 'expo-router';
import { useState, useEffect } from 'react';

import { 
Text, 
View,
ScrollView, 
StyleSheet, 
KeyboardAvoidingView, 
Platform,
} from "react-native";
import { CreditCardView, CreditCardInput } from 'react-native-credit-card-input';

const HomeScreen = () => {
	const [formData, setFormData] = useState();
	const [focusedField, setFocusedField] = useState();
  const router = useRouter();

  const onSubmit = (data) => {

		setFormData(data);
    console.log(data);
    if(data.valid){
      router.push('(tabs)');
    }
	}

	return (
	<KeyboardAvoidingView
		style={styles.container}
		behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
	>
    <Redirect href={'(tabs)'} />
		<ScrollView contentContainerStyle={styles.scrollContent}>
			<Text style={styles.title}>Enter Your Card Details</Text>
			<Text style={styles.subtitle}>
					We'll find the best cash back deals for your card
			</Text>
			<CreditCardView
				focusedField={focusedField}
				type={formData?.values.type}
				number={formData?.values.number}
				expiry={formData?.values.expiry}
				cvc={formData?.values.cvc}
				style={styles.cardView}
			/>
			<View style={styles.cardInputContainer}>
				<CreditCardInput
					requiresName
					requiresCVC
					requiresPostalCode
					labelStyle={styles.cardInputLabel}
					inputStyle={styles.cardInput}
					validColor={'#000000'}
					invalidColor={'#FF0000'}
					placeholderColor={'#aaaaaa'}
					onFocusField={setFocusedField}
					onChange={onSubmit}
				/>
			</View>
		</ScrollView>
	</KeyboardAvoidingView>
	)
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e9e9e9',
    },
    scrollContent: {
		borderRadius: 15,
		paddingTop: 16,
      margin: 24,
		backgroundColor: '#FFFFFF',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000000',
      marginBottom: 10,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: '#666666',
      marginBottom: 30,
      textAlign: 'center',
    },
    cardInputContainer: {
      marginBottom: 30,
    },
    cardInputLabel: {
      color: '#000000',
      fontSize: 14,
    },
    cardInput: {
      fontSize: 16,
      color: '#000000',
      backgroundColor: '#F5F5F5',
      borderRadius: 8,
      padding: 10,
    },
    issuerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      padding: 15,
      backgroundColor: '#F9F9F9',
      borderRadius: 8,
    },
    issuerLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000000',
      marginRight: 10,
    },
    issuerName: {
      fontSize: 16,
      color: '#000000',
    },
    errorText: {
      color: '#FF0000',
      marginBottom: 20,
      textAlign: 'center',
    },
    submitButton: {
      backgroundColor: '#000000',
      paddingVertical: 15,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    disabledButton: {
      backgroundColor: '#CCCCCC',
    },
    submitButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
	//  CardView
	cardStyle: {
		backgroundColor: 'center',
		marginTop: 15,
	},
	cardView: {
		alignSelf: 'center',
		marginTop: 15,
	},
  });

export default HomeScreen;