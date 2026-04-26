import { useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SocialLogin } from '../../components/SocialLogin';

export default function SignUpScreen() {
	const { isLoaded, signUp, setActive } = useSignUp();
	const router = useRouter();

	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');
	const [pendingVerification, setPendingVerification] = useState(false);
	const [code, setCode] = useState('');
	const [loading, setLoading] = useState(false);

	// Step 1: Start the sign up process
	const onSignUpPress = async () => {
		if (!isLoaded) return;
		setLoading(true);

		try {
			await signUp.create({
				emailAddress,
				password,
			});

			// Send the email verification code
			await signUp.prepareEmailAddressVerification({
				strategy: 'email_code',
			});

			// Change the UI to show the verification slot
			setPendingVerification(true);
		} catch (err: any) {
			console.error(JSON.stringify(err, null, 2));
			alert(
				err.errors?.[0]?.message || 'Check your details and try again.',
			);
		} finally {
			setLoading(false);
		}
	};

	// Step 2: Verify the email code
	const onPressVerify = async () => {
		if (!isLoaded) return;
		setLoading(true);

		try {
			const completeSignUp = await signUp.attemptEmailAddressVerification(
				{
					code,
				},
			);

			await setActive({ session: completeSignUp.createdSessionId });
			router.replace('/');
		} catch (err: any) {
			console.error(JSON.stringify(err, null, 2));
			alert(err.errors?.[0]?.message || 'Invalid verification code.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<SafeAreaView className="flex-1 bg-[#FFFBEB]">
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				className="flex-1 px-6"
			>
				<ScrollView
					contentContainerStyle={{
						flexGrow: 1,
						justifyContent: 'center',
					}}
					showsVerticalScrollIndicator={false}
				>
					{/* Header Section */}
					<View className="items-center mb-10">
						<View className="flex-row items-center space-x-3">
							<View className="w-12 h-12 bg-[#EF7D55] rounded-xl items-center justify-center">
								<Text className="text-white text-2xl font-bold">
									R
								</Text>
							</View>
							<View>
								<Text className="text-2xl font-bold text-[#0F172A]">
									Recurly
								</Text>
								<Text className="text-[10px] tracking-[2px] text-[#475569] font-semibold uppercase">
									Smart Billing
								</Text>
							</View>
						</View>
					</View>

					<View className="mb-8">
						<Text className="text-3xl font-bold text-center text-[#0F172A] mb-2">
							{pendingVerification
								? 'Verify Email'
								: 'Create Account'}
						</Text>
						<Text className="text-center text-[#64748B] text-base px-4">
							{pendingVerification
								? 'Enter the code we sent to your email address'
								: 'Join Recurly to start managing your subscriptions effortlessly'}
						</Text>
					</View>

					{/* Card Container */}
					<View className="bg-[#FFFBEB] border border-[#E2E8F0] rounded-[32px] p-6 shadow-sm">
						{!pendingVerification ? (
							<>
								<View className="mb-5">
									<Text className="text-[#0F172A] font-semibold mb-2 ml-1">
										Email
									</Text>
									<TextInput
										autoCapitalize="none"
										placeholder="Enter your email"
										placeholderTextColor="#94A3B8"
										value={emailAddress}
										onChangeText={setEmailAddress}
										className="bg-white border border-[#E2E8F0] h-14 rounded-2xl px-4 text-[#0F172A]"
									/>
								</View>

								<View className="mb-8">
									<Text className="text-[#0F172A] font-semibold mb-2 ml-1">
										Password
									</Text>
									<TextInput
										placeholder="Create a password"
										placeholderTextColor="#94A3B8"
										secureTextEntry
										value={password}
										onChangeText={setPassword}
										className="bg-white border border-[#E2E8F0] h-14 rounded-2xl px-4 text-[#0F172A]"
									/>
								</View>

								<TouchableOpacity
									onPress={onSignUpPress}
									disabled={loading}
									activeOpacity={0.8}
									className="bg-[#EF7D55] h-14 rounded-2xl items-center justify-center"
								>
									<Text className="text-white font-bold text-lg">
										{loading
											? 'Registering...'
											: 'Get Started'}
									</Text>
								</TouchableOpacity>
							</>
						) : (
							<>
								<View className="mb-8">
									<Text className="text-[#0F172A] font-semibold mb-2 ml-1">
										Verification Code
									</Text>
									<TextInput
										placeholder="Enter 6-digit code"
										placeholderTextColor="#94A3B8"
										keyboardType="number-pad"
										value={code}
										onChangeText={setCode}
										className="bg-white border border-[#E2E8F0] h-14 rounded-2xl px-4 text-[#0F172A] text-center text-xl tracking-[10px]"
									/>
								</View>

								<TouchableOpacity
									onPress={onPressVerify}
									disabled={loading}
									activeOpacity={0.8}
									className="bg-[#EF7D55] h-14 rounded-2xl items-center justify-center"
								>
									<Text className="text-white font-bold text-lg">
										{loading
											? 'Verifying...'
											: 'Verify & Sign Up'}
									</Text>
								</TouchableOpacity>
							</>
						)}
						<SocialLogin />
						<View className="mt-6 flex-row justify-center">
							<Text className="text-[#64748B]">
								Already have an account?{' '}
							</Text>
							<Link href="/sign-in">
								<Text className="text-[#EF7D55] font-semibold">
									Sign in
								</Text>
							</Link>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
