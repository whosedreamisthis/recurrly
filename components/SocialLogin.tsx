import { useOAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

// Warm up the browser for faster login
WebBrowser.maybeCompleteAuthSession();

export const SocialLogin = () => {
	const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

	const onGooglePress = useCallback(async () => {
		try {
			const { createdSessionId, setActive } = await startOAuthFlow({
				redirectUrl: Linking.createURL('/dashboard', {
					scheme: 'myapp',
				}),
			});

			if (createdSessionId && setActive) {
				setActive({ session: createdSessionId });
			}
		} catch (err) {
			console.error('OAuth error', err);
		}
	}, []);

	return (
		<View className="mt-6">
			<View className="flex-row items-center mb-6">
				<View className="flex-1 h-[1px] bg-[#E2E8F0]" />
				<Text className="mx-4 text-[#64748B] font-medium">
					Or continue with
				</Text>
				<View className="flex-1 h-[1px] bg-[#E2E8F0]" />
			</View>

			<TouchableOpacity
				onPress={onGooglePress}
				className="flex-row items-center justify-center bg-white border border-[#E2E8F0] h-14 rounded-2xl shadow-sm"
			>
				{/* You can use an Expo Icon or an Image asset here */}
				<Text className="text-[#0F172A] font-bold text-lg">Google</Text>
			</TouchableOpacity>
		</View>
	);
};
