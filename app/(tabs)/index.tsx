import { icons } from '@/constants/icons';
import images from '@/constants/images';
import { Image } from 'expo-image';
import { cssInterop } from 'nativewind';

import ListHeading from '@/components/ListHeading';
import SubscriptionCard from '@/components/SubscriptionCard';
import UpcomingSubscriptionCard from '@/components/UpcomingSubscriptionCard';
import {
	HOME_BALANCE,
	HOME_SUBSCRIPTIONS,
	HOME_USER,
	UPCOMING_SUBSCRIPTIONS,
} from '@/constants/data';
import '@/global.css';
import { formatCurrency } from '@/lib/utils';
import dayjs from 'dayjs';
import { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

cssInterop(Image, {
	className: 'style',
});

export default function App() {
	const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<
		string | null
	>(null);
	return (
		<SafeAreaView className="flex-1  bg-background p-5">
			<View className="home-header">
				<View className="home-user">
					<Image source={images.avatar} className="home-avatar" />
					<Text className="home-user-name">{HOME_USER.name}</Text>
				</View>
				<Image source={icons.add} className="home-add-icon" />
			</View>
			<View className="m-5">
				<View className="home-balance-card">
					<Text className="home-balance-label">Balance</Text>
					<View className="home-balance-row">
						<Text className="home-balance-amount">
							{formatCurrency(HOME_BALANCE.amount)}
						</Text>
						<Text className="home-balance-date">
							{dayjs(HOME_BALANCE.nextRenewalDate).format(
								'MM/DD',
							)}
						</Text>
					</View>
				</View>
				<View>
					<ListHeading title="Upcoming" />
					<FlatList
						data={UPCOMING_SUBSCRIPTIONS}
						renderItem={({ item }) => {
							return <UpcomingSubscriptionCard {...item} />;
						}}
						keyExtractor={(item) => item.id}
						horizontal={true}
						ListEmptyComponent={
							<Text className="home-empty-state">
								no upcoming renewals yet.
							</Text>
						}
					/>
				</View>
				<View>
					<ListHeading title="All Subscriptions" />
					<FlatList
						data={HOME_SUBSCRIPTIONS}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<SubscriptionCard
								{...item}
								expanded={expandedSubscriptionId === item.id}
								onPress={() =>
									setExpandedSubscriptionId((currentId) =>
										currentId === item.id ? null : item.id,
									)
								}
							/>
						)}
						extraData={expandedSubscriptionId}
						ItemSeparatorComponent={() => <View className="h-4" />}
						showsVerticalScrollIndicator={false}
						ListEmptyComponent={
							<Text className="home-empty-state">
								No subscriptions yet.
							</Text>
						}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
}
