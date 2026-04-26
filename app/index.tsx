import { Image } from 'expo-image';
import { cssInterop } from 'nativewind';

import { Text, View } from 'react-native';
import './global.css';

cssInterop(Image, {
	className: 'style',
});

export default function Index() {
	return (
		<View className="flex-1 justify-center items-center">
			<Text>Edit app/index.tsx to edit this screen.</Text>
			<Image
				className="h-24 w-24"
				source={require('@/assets/images/splash-pattern.png')}
				contentFit="contain"
			/>
		</View>
	);
}
