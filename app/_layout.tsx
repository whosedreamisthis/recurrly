import '@/global.css';
import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useRouter, useSegments } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';

const tokenCache = {
	async getToken(key: string) {
		try {
			return SecureStore.getItemAsync(key);
		} catch (err) {
			return null;
		}
	},
	async saveToken(key: string, value: string) {
		try {
			return SecureStore.setItemAsync(key, value);
		} catch (err) {
			return;
		}
	},
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
	throw new Error(
		'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
	);
}

// Separate component to handle navigation logic once Clerk is loaded
function InitialLayout() {
	const { isLoaded, isSignedIn } = useAuth();
	const segments = useSegments();
	const router = useRouter();

	useEffect(() => {
		if (!isLoaded) return;

		// Check if the user is currently inside the (auth) folder
		const inAuthGroup = segments[0] === '(auth)';

		if (isSignedIn && inAuthGroup) {
			// If signed in, kick them out of the auth screens to the home page
			router.replace('/');
		} else if (!isSignedIn && !inAuthGroup) {
			// If NOT signed in, force them back to the sign-in screen
			router.replace('/sign-in');
		}
	}, [isSignedIn, isLoaded, segments]);

	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="(auth)" options={{ headerShown: false }} />
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
		</Stack>
	);
}

export default function RootLayout() {
	const [fontsLoaded] = useFonts({
		'sans-regular': require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
		'sans-bold': require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
		'sans-medium': require('../assets/fonts/PlusJakartaSans-Medium.ttf'),
		'sans-semibold': require('../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
		'sans-extrabold': require('../assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
		'sans-light': require('../assets/fonts/PlusJakartaSans-Light.ttf'),
	});

	useEffect(() => {
		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) return null;

	return (
		<ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
			<ClerkLoaded>
				<InitialLayout />
			</ClerkLoaded>
		</ClerkProvider>
	);
}
