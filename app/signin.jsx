import React, { useState,useEffect, useRef } from 'react';
import { Inter_300Light } from '@expo-google-fonts/inter/300Light';
import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_500Medium } from '@expo-google-fonts/inter/500Medium';
import { useFonts } from '@expo-google-fonts/inter/useFonts';

 import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  TextInput,
  Image,
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

// import LOGO_SVG from "@/assets/images/logo-small.svg"


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const router = useRouter();

  const {user, signIn} = useAuth();

  if (user && !isLoading) {
      router.push('/')

  }
  

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    if (emailError) {
      setEmailError('');
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (passwordError) {
      setPasswordError('');
    }
  };

  const handleLogin = async () => {
    let hasError = false;

    // Reset errors
    setEmailError('');
    setPasswordError('');

    // Validate email
    if (!email) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      hasError = true;
    }

    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setIsLoading(true);

    const result = await signIn(email, password);
    // Simulate API call
    setTimeout(() => {
      
      setIsLoading(false);
      // Simulate server-side validation errors
      if (result === null) {
        console.log('Success', 'Login successful!');
        router.push('/');
      } else {
        setEmailError('Invalid email or password');
        setPasswordError('Invalid email or password');
      }
    }, 2000);
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password reset link will be sent to your email');
  };

  const handleSignUp = () => {
      router.push('/signup');
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
            <Text style={styles.appName}>Sharperk</Text>
            <Text style={styles.subtitle}>Welcome back</Text>
          </View>

          {/* Login Form */}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={[
                  styles.textInput,
                  emailError ? styles.textInputError : null
                ]}
                value={email}
                onChangeText={handleEmailChange}
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {emailError ? (
                <Text style={styles.errorText}>{emailError}</Text>
              ) : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={[
                  styles.textInput,
                  passwordError ? styles.textInputError : null
                ]}
                value={password}
                onChangeText={handlePasswordChange}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}
            </View>

            <TouchableOpacity
              style={styles.forgotPasswordButton}
              onPress={handleForgotPassword}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.loginButtonText}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Login Options */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </TouchableOpacity>
            
            {/* <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>Continue with Apple</Text>
            </TouchableOpacity> */}
          </View>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={styles.signUpLink}>Sign Up</Text>
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
    backgroundColor: '#F9FAFB', // Light grey background
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
    color: '#000000', // Black
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280', // Medium grey
    fontWeight: '400',
  },
  formContainer: {
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151', // Dark grey
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#FFFFFF', // White
    borderWidth: 1,
    borderColor: '#D1D5DB', // Light grey border
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#000000', // Black text
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
    borderColor: '#EF4444', // Red border for error
    borderWidth: 1.5,
  },
  errorText: {
    color: '#EF4444', // Red text
    fontSize: 14,
    marginTop: 4,
    fontWeight: '500',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 24,
    marginTop: 8,
  },
  forgotPasswordText: {
    color: '#000000', // Black
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#000000', // Black
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButtonDisabled: {
    backgroundColor: '#9CA3AF', // Disabled grey
  },
  loginButtonText: {
    color: '#FFFFFF', // White
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
    backgroundColor: '#D1D5DB', // Light grey
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#6B7280', // Medium grey
    fontSize: 14,
    fontWeight: '500',
  },
  socialContainer: {
    marginBottom: 32,
  },
  socialButton: {
    backgroundColor: '#FFFFFF', // White
    borderWidth: 1,
    borderColor: '#D1D5DB', // Light grey border
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
    color: '#374151', // Dark grey
    fontSize: 16,
    fontWeight: '500',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    color: '#6B7280', // Medium grey
    fontSize: 16,
  },
  signUpLink: {
    color: '#000000', // Black
    fontSize: 16,
    fontWeight: '600',
  },
});

const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef([]);
  const router = useRouter();


  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    // Timer countdown
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChangeText = (text, index) => {
    // Only allow single digit
    if (text.length > 1) {
      text = text.charAt(text.length - 1);
    }

    // Update OTP array
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to next input if text is entered
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    // Move to previous input on backspace if current input is empty
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setTimer(30);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    // Add your resend code API call here
  };

  const handleConfirm = () => {
    const code = otp.join('');
    if (code.length === 6) {
      console.log('OTP Code:', code);
      // Add your verification API call here
    }
    router.navigate('/signup')
    
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View>
      <View style={otp_styles.inputContainer}>
        <Text style={otp_styles.label}>Enter code</Text>
        <View style={otp_styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={otp_styles.otpInput}
              value={digit}
              onChangeText={(text) => handleChangeText(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>
      </View>

      <TouchableOpacity
        onPress={handleResend}
        disabled={timer > 0}
        style={otp_styles.resendContainer}
      >
        <Text style={[otp_styles.resendText, timer === 0 && otp_styles.resendActive]}>
          Resend code in {formatTime(timer)}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={otp_styles.confirmButton}
        onPress={handleConfirm}
      >
        <Text style={otp_styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const SignInPage = () => {
  const [usePassword, setUsePassword] = useState(false);
  const [sendCode, setSendCode] = useState(false);
  const router = useRouter();

  let [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium
  });
  const { user, signIn } = useAuth();

  // const onUsingPassword = () => {
    
  // }

  return (
    <SafeAreaView style={si_styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={si_styles.keyboardAvoidingView}
      >
        {
          sendCode ?
          <ScrollView contentContainerStyle={account_styles.scrollContainer}>
            <View style={si_styles.component}>
              <Image style={si_styles.imageStyle} 
                source={require('@/assets/images/logo-small.svg')} />
            </View>

            <View style={si_styles.component}>
              <TouchableOpacity onPress={()=> setSendCode(false)}>
                <Image source={require('@/assets/images/icons/Back.png')} />
              </TouchableOpacity>
            </View>

            <View style={si_styles.component}>
              <Text style={si_styles.header1}>
                Verify Your Account
              </Text>
              <Text style={si_styles.header1_subtext}>
                Type in the code sent to the email address
              </Text>
            </View>

            <View style={si_styles.component}>
              <OTPVerification />
            </View>

          </ScrollView> :
          <ScrollView
            contentContainerStyle={si_styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={si_styles.component}>
              <Image style={si_styles.imageStyle} 
                source={require('@/assets/images/logo-small.svg')} />
            </View>
            <View style={si_styles.component}>
              <Text style={si_styles.header1}>
                Sign In or Sign Up
              </Text>
              <Text style={si_styles.header1_subtext}>
                Earn amazing rewards!
              </Text>
            </View>
            <View style={si_styles.component}>
              <Text style={si_styles.email_label}>
                Enter email
              </Text>
              <TextInput
                  style={si_styles.textInput}
                  // style={[
                  //   styles.textInput,
                  //   emailError ? styles.textInputError : null
                  // ]}

                  // value={email}
                  // onChangeText={handleEmailChange}
                  placeholder="placeholder@email.com"
                  placeholderTextColor="#666666"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
            </View>

            {/* Sign in with password link */}
            {
              usePassword ? 
              <View style={si_styles.component}>
                <Text style={si_styles.email_label}>
                  Enter password
                </Text>
                <TextInput
                    style={si_styles.textInput}
                    // value={email}
                    // onChangeText={handleEmailChange}
                    secureTextEntry={true}
                    placeholder="******"
                    placeholderTextColor="#666666"
                    keyboardType="visible-password"
                  />
              </View> :
              <TouchableOpacity style={si_styles.passwordLink} onPress={()=> setUsePassword(true)}>
                <Text style={si_styles.passwordLinkText}>Sign in using password</Text>
              </TouchableOpacity> 
            }

            {/* Send Verification Code Button */}
            <View>
              <TouchableOpacity style={si_styles.primaryButton} onPress={() => setSendCode(true)}>
                <Text style={si_styles.primaryButtonText}>Send Verification Code</Text>
              </TouchableOpacity>

              {/* OR Divider */}
              <View style={si_styles.divider}>
                <View style={si_styles.line} />
                <Text style={si_styles.dividerText}>OR</Text>
                <View style={si_styles.line} />
              </View>

              {/* Sign In with Google Button */}
              <TouchableOpacity style={si_styles.googleButton}>
                <View style={si_styles.googleButtonContent}>
                  <View style={si_styles.googleIcon}>
                    <Image source={require('@/assets/images/icons/google.png')} />
                  </View>
                  <Text style={si_styles.googleButtonText}>Sign In with Google</Text>
                </View>
              </TouchableOpacity>
            </View>

          </ScrollView>
        }
        
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const si_styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    gap: 28,
    paddingHorizontal: 24,
    paddingVertical: 28,
  },
  component: {
    // paddingVertical: 24,
  },
  imageStyle: {
    width: 89, // Specify width and height for local images
    height: 30,
    resizeMode: 'contain', // Or 'cover', 'stretch', etc.
  },
  header1: {
    fontFamily: 'Inter_500Medium',
    fontSize: 24,
    // fontWeight: 500,
    marginBottom: 12,
    lineHeight: "100%"
  },
  header1_subtext: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color:'#3F3F3F'
  },
  email_label: {
    fontFamily: 'Inter_500Medium',
    fontSize: 18,
    marginTop: 12,
    marginBottom: 8,

  },
  textInput: {
    backgroundColor: '#FFFFFF', // White
    borderBottomWidth: 1,
    borderColor: '#BFBFBF', // Light grey border
    // borderRadius: 12,
    // paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000000', // Black text

  },

  passwordLink: {
    alignSelf: 'end',
  },
  passwordLinkText: {
    fontFamily: 'Inter_500Medium',
    color: '#1F4287',
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: '#1F4287',
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontFamily: 'Inter_400Regular',
    color: '#fff',
    fontSize: 18,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#707070',
    // border: "0 solid #707070"
  },
  dividerText: {
    fontFamily: 'Inter_500Medium',
    marginHorizontal: 15,
    color: '#999',
    fontSize: 16,
  },
  googleButton: {
    borderWidth: 1,
    borderColor: '#1F4287',
    borderRadius: 30,
    paddingVertical: 12,   
    alignItems: 'center',
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  googleIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  googleG: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4285f4',
  },
  googleButtonText: {
    fontFamily: 'Inter_500Medium',
    color: '#1F4287',
    fontSize: 18,
  },
})

const account_styles = StyleSheet.create({
  
  scrollContainer: {
    flex: 1,
    gap: 28,
    paddingHorizontal: 24,
    paddingVertical: 28,
  },
  component: {
    // paddingVertical: 24,
  },
  imageStyle: {
    width: 89, // Specify width and height for local images
    height: 30,
    resizeMode: 'contain', // Or 'cover', 'stretch', etc.
  },
  header1: {
    fontFamily: 'Inter_500Medium',
    fontSize: 24,
    // fontWeight: 500,
    marginBottom: 12,
    lineHeight: "100%"
  },
  header1_subtext: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color:'#3F3F3F'
  },
  email_label: {
    fontFamily: 'Inter_500Medium',
    fontSize: 18,
    marginTop: 12,
    marginBottom: 8,

  },
  textInput: {
    backgroundColor: '#FFFFFF', // White
    borderBottomWidth: 1,
    borderColor: '#BFBFBF', // Light grey border
    // borderRadius: 12,
    // paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000000', // Black text

  },

  passwordLink: {
    alignSelf: 'end',
  },
  passwordLinkText: {
    fontFamily: 'Inter_500Medium',
    color: '#1F4287',
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: '#1F4287',
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontFamily: 'Inter_400Regular',
    color: '#fff',
    fontSize: 18,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#707070',
    // border: "0 solid #707070"
  },
  dividerText: {
    fontFamily: 'Inter_500Medium',
    marginHorizontal: 15,
    color: '#999',
    fontSize: 16,
  },
  googleButton: {
    borderWidth: 1,
    borderColor: '#1F4287',
    borderRadius: 30,
    paddingVertical: 12,   
    alignItems: 'center',
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  googleIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  googleG: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4285f4',
  },
  googleButtonText: {
    fontFamily: 'Inter_500Medium',
    color: '#1F4287',
    fontSize: 18,
  },
})

const otp_styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Inter_400Regular',
    fontSize: 18,
    color: '#000',
    marginVertical: 10,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpInput: {
    width: 48,
    height: 56,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
    fontSize: 24,
    textAlign: 'center',
    color: '#000',
  },
  resendContainer: {
    alignItems: 'end',
    marginBottom: 32,
  },
  resendText: {
    // fontFamily: 'Inter_500Medium',
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#999',
  },
  resendActive: {
    fontFamily: 'Inter_400Regular',
    color: '#A60018',
  },
  confirmButton: {
    backgroundColor: '#1F4287',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontFamily: 'Inter_400Regular',

    color: '#fff',
    fontSize: 18,
  },
});

export default SignInPage;