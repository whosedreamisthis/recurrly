import { icons } from '@/constants/icons';
import images from '@/constants/images';
import { Image } from 'expo-image';
import { cssInterop } from 'nativewind';

import { HOME_BALANCE, HOME_USER } from '@/constants/data';
import '@/global.css';
import { formatCurrency } from '@/lib/utils';
import dayjs from 'dayjs';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

cssInterop(Image, {
	className: 'style',
});

export default function Index() {
	return (
		<SafeAreaView className="flex-1  bg-background p-5">
			<View className="home-header">
				<View className="home-user">
					<Text className="home-user-name">{HOME_USER.name}</Text>
					<Image
						source={images.avatar}
						className="home-avatar"
					></Image>
				</View>
				<Image source={icons.add} className="home-add-icon" />
			</View>
			<View className="home-balance-card">
				<Text className="home-balance-label">Balance</Text>
				<View className="home-balance-row">
					<Text className="home-balance-amount">
						{formatCurrency(HOME_BALANCE.amount)}
					</Text>
					<Text className="home-balance-date">
						{dayjs(HOME_BALANCE.nextRenewalDate).format('MM/DD')}
					</Text>
				</View>
			</View>
		</SafeAreaView>
	);
}
