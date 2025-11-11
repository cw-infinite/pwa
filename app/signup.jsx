import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

import { useAuth } from '@/lib/auth-context'

const SignUpScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
    
  const router = useRouter();
  
  
  // Error states
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: ''
  });

  const {signUp} = useAuth();

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (field, value) => {
    let error = '';
    
    switch (field) {
      case 'firstName':
        if (!value.trim()) {
          error = 'First name is required';
        } else if (value.trim().length < 2) {
          error = 'First name must be at least 2 characters';
        }
        break;
      
      case 'lastName':
        if (!value.trim()) {
          error = 'Last name is required';
        } else if (value.trim().length < 2) {
          error = 'Last name must be at least 2 characters';
        }
        break;
      
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!emailRegex.test(value.trim())) {
          error = 'Please enter a valid email address';
        }
        break;
      
      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 6) {
          error = 'Password must be at least 6 characters';
        // } else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(value)) {
        //   error = 'Password must contain uppercase and lowercase letters';
        // } else if (!/(?=.*\d)/.test(value)) {
        //   error = 'Password must contain at least one number';
        }
        break;
      
      case 'confirmPassword':
        if (!value) {
          error = 'Please confirm your password';
        } else if (value !== password) {
          error = 'Passwords do not match';
        }
        break;
    }
    
    setErrors(prev => ({ ...prev, [field]: error }));
    return error === '';
  };

  const handleFieldChange = (field, value) => {
    switch (field) {
      case 'firstName':
        setFirstName(value);
        validateField('firstName', value);
        break;
      case 'lastName':
        setLastName(value);
        validateField('lastName', value);
        break;
      case 'email':
        setEmail(value);
        validateField('email', value);
        break;
      case 'password':
        setPassword(value);
        validateField('password', value);
        // Re-validate confirm password if it has been entered
        if (confirmPassword) {
          validateField('confirmPassword', confirmPassword);
        }
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        validateField('confirmPassword', value);
        break;
    }
  };

  const validateForm = () => {
    const isFirstNameValid = validateField('firstName', firstName);
    const isLastNameValid = validateField('lastName', lastName);
    const isEmailValid = validateField('email', email);
    const isPasswordValid = validateField('password', password);
    const isConfirmPasswordValid = validateField('confirmPassword', confirmPassword);
    
    let termsError = '';
    if (!agreeToTerms) {
      termsError = 'Please agree to the Terms of Service and Privacy Policy';
    }
    setErrors(prev => ({ ...prev, terms: termsError }));
    
    return isFirstNameValid && isLastNameValid && isEmailValid && 
           isPasswordValid && isConfirmPasswordValid && !termsError;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    console.log("handleSignUp");
    setIsLoading(true);
    
    try {
      await signUp(email, password, `${firstName} ${lastName}`);
      console.log('Success', 'Account created successfully!');
      router.push('/')


    } catch (error) {
      console.log('Error', 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = () => {
    console.log('Sign In', 'Navigate to sign in screen');
    router.push('/signin')
  };

  const handleTermsPress = () => {
    console.log('Terms of Service', 'Terms of Service content');
  };

  const handlePrivacyPress = () => {
    console.log('Privacy Policy', 'Privacy Policy content');
  };

  const handleTermsToggle = () => {
    setAgreeToTerms(!agreeToTerms);
    if (errors.terms) {
      setErrors(prev => ({ ...prev, terms: '' }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.appName}>Sharperks</Text>
            <Text style={styles.subtitle}>Create your account</Text>
          </View>

          {/* Sign Up Form */}
          <View style={styles.formContainer}>
            <View style={styles.nameContainer}>
              <View style={styles.nameInputContainer}>
                <Text style={styles.inputLabel}>First Name</Text>
                <TextInput
                  style={[styles.textInput, errors.firstName && styles.textInputError]}
                  value={firstName}
                  onChangeText={(value) => handleFieldChange('firstName', value)}
                  onBlur={() => validateField('firstName', firstName)}
                  placeholder="First name"
                  placeholderTextColor="#9CA3AF"
                  autoCapitalize="words"
                  autoCorrect={false}
                />
                {errors.firstName ? <Text style={styles.errorText}>{errors.firstName}</Text> : null}
              </View>
              
              <View style={styles.nameInputContainer}>
                <Text style={styles.inputLabel}>Last Name</Text>
                <TextInput
                  style={[styles.textInput, errors.lastName && styles.textInputError]}
                  value={lastName}
                  onChangeText={(value) => handleFieldChange('lastName', value)}
                  onBlur={() => validateField('lastName', lastName)}
                  placeholder="Last name"
                  placeholderTextColor="#9CA3AF"
                  autoCapitalize="words"
                  autoCorrect={false}
                />
                {errors.lastName ? <Text style={styles.errorText}>{errors.lastName}</Text> : null}
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={[styles.textInput, errors.email && styles.textInputError]}
                value={email}
                onChangeText={(value) => handleFieldChange('email', value)}
                onBlur={() => validateField('email', email)}
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={[styles.textInput, errors.password && styles.textInputError]}
                value={password}
                onChangeText={(value) => handleFieldChange('password', value)}
                onBlur={() => validateField('password', password)}
                placeholder="Create a password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
              {errors.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : (
                <Text style={styles.passwordHint}>Must be at least 6 characters with uppercase, lowercase, and number</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <TextInput
                style={[styles.textInput, errors.confirmPassword && styles.textInputError]}
                value={confirmPassword}
                onChangeText={(value) => handleFieldChange('confirmPassword', value)}
                onBlur={() => validateField('confirmPassword', confirmPassword)}
                placeholder="Confirm your password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
              {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
            </View>

            {/* Terms and Privacy Checkbox */}
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={handleTermsToggle}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]}>
                {agreeToTerms && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <View style={styles.termsTextContainer}>
                <Text style={styles.termsText}>I agree to the </Text>
                <TouchableOpacity onPress={handleTermsPress}>
                  <Text style={styles.termsLink}>Terms of Service</Text>
                </TouchableOpacity>
                <Text style={styles.termsText}> and </Text>
                <TouchableOpacity onPress={handlePrivacyPress}>
                  <Text style={styles.termsLink}>Privacy Policy</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            {errors.terms ? <Text style={styles.errorText}>{errors.terms}</Text> : null}

            <TouchableOpacity
              style={[styles.signUpButton, isLoading && styles.signUpButtonDisabled]}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              <Text style={styles.signUpButtonText}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Sign Up Options */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>Sign up with Google</Text>
            </TouchableOpacity>
          </View>

          {/* Sign In Link */}
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleSignIn}>
              <Text style={styles.signInLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280',
    fontWeight: '400',
  },
  formContainer: {
    marginBottom: 32,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  nameInputContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#000000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  textInputError: {
    borderColor: '#EF4444',
    borderWidth: 1,
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
    marginLeft: 4,
  },
  passwordHint: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
    marginLeft: 4,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    marginRight: 12,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  termsTextContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  termsText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  termsLink: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  signUpButton: {
    backgroundColor: '#000000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  signUpButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#D1D5DB',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
  socialContainer: {
    marginBottom: 32,
  },
  socialButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  socialButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '500',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    color: '#6B7280',
    fontSize: 16,
  },
  signInLink: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SignUpScreen;