import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SocialLogin } from '../../components/SocialLogin';

export default function SignInScreen() {
	const { signIn, setActive, isLoaded } = useSignIn();
	const router = useRouter();

	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const onSignInPress = async () => {
		if (!isLoaded) return;
		setLoading(true);

		try {
			const completeSignIn = await signIn.create({
				identifier: emailAddress,
				password,
			});

			await setActive({ session: completeSignIn.createdSessionId });
			router.replace('/');
		} catch (err: any) {
			console.error(JSON.stringify(err, null, 2));
			alert(err.errors?.[0]?.message || 'An error occurred');
		} finally {
			setLoading(false);
		}
	};

	return (
		// Background color: #FFFBEB (approx. bg-amber-50)
		<SafeAreaView className="flex-1 bg-[#FFFBEB]">
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				className="flex-1 px-6 justify-center"
			>
				{/* Header Section */}
				<View className="items-center mb-10">
					<View className="flex-row items-center space-x-3">
						{/* Replace with your actual logo asset */}
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
						Welcome back
					</Text>
					<Text className="text-center text-[#64748B] text-base">
						Sign in to continue managing your subscriptions
					</Text>
				</View>

				{/* Card Container */}
				<View className="bg-[#FFFBEB] border border-[#E2E8F0] rounded-[32px] p-6 shadow-sm">
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
							placeholder="Enter your password"
							placeholderTextColor="#94A3B8"
							secureTextEntry
							value={password}
							onChangeText={setPassword}
							className="bg-white border border-[#E2E8F0] h-14 rounded-2xl px-4 text-[#0F172A]"
						/>
					</View>

					<TouchableOpacity
						onPress={onSignInPress}
						disabled={loading}
						activeOpacity={0.8}
						className="bg-[#EF7D55] h-14 rounded-2xl items-center justify-center"
					>
						<Text className="text-white font-bold text-lg">
							{loading ? 'Signing in...' : 'Sign in'}
						</Text>
					</TouchableOpacity>
					<SocialLogin />

					<View className="mt-6 flex-row justify-center">
						<Text className="text-[#64748B]">New to Recurly? </Text>
						<Link href="/sign-up">
							<Text className="text-[#EF7D55] font-semibold">
								Create an account
							</Text>
						</Link>
					</View>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
