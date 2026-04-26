import images from '@/constants/images';
import { Image } from 'expo-image';
import { cssInterop } from 'nativewind';

import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import '../global.css';

cssInterop(Image, {
	className: 'style',
});

export default function Index() {
	return (
		<SafeAreaView className="flex-1  bg-background p-5">
			<View className="home-header">
				<View className="home-user">
					<View className="flex-1 justify-center items-center">
						<Text>Edit app/index.tsx to edit this screen.</Text>
						<Image
							source={images.avatar}
							className="home-avatar"
						></Image>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
}
