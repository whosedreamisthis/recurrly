import { tabs } from '@/constants/data';
import { colors, components } from '@/constants/theme';
import clsx from 'clsx';

import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const baseTabBar = components.tabBar;
const isWeb = Platform.OS === 'web';
const tabBar = {
	...baseTabBar,
	height: isWeb ? 56 : baseTabBar.height,
	horizontalInset: isWeb ? 12 : baseTabBar.horizontalInset,
	radius: isWeb ? 20 : baseTabBar.radius,
	iconFrame: isWeb ? 32 : baseTabBar.iconFrame,
};

const TabLayout = () => {
	const insets = useSafeAreaInsets();
	const TabIcon = ({ focused, icon }: TabIconProps) => {
		return (
			<View className="tabs-icon">
				<View
					className={clsx('tabs-pill')}
					style={{
						width: tabBar.iconFrame,
						height: tabBar.iconFrame,
						backgroundColor: focused
							? colors.accent
							: 'transparent',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Image
						source={icon}
						resizeMode="contain"
						className="tabs-glyph"
						style={{
							width: tabBar.iconFrame / 1.5,
							height: tabBar.iconFrame / 1.5,
						}}
					/>
				</View>
			</View>
		);
	};

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: {
					position: 'absolute',
					left: tabBar.horizontalInset,
					right: tabBar.horizontalInset,
					bottom: Math.max(insets.bottom, tabBar.horizontalInset),
					height: tabBar.height,
					borderRadius: tabBar.radius,
					backgroundColor: colors.primary,
					borderTopWidth: 0,
					elevation: 0,
					overflow: 'hidden',
				},
				tabBarItemStyle: {
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					paddingVertical: isWeb
						? 6
						: tabBar.height / 2 - tabBar.iconFrame / 1.6,
				},
				tabBarIconStyle: {
					width: tabBar.iconFrame,
					height: tabBar.iconFrame,
					alignItems: 'center',
					justifyContent: 'center',
				},
				tabBarActiveTintColor: colors.accent,
				tabBarInactiveTintColor: colors.mutedForeground,
			}}
		>
			{tabs.map((tab) => (
				<Tabs.Screen
					key={tab.name}
					name={tab.name}
					options={{
						title: tab.title,
						tabBarIcon: ({ focused }) => (
							<TabIcon focused={focused} icon={tab.icon} />
						),
					}}
				/>
			))}
		</Tabs>
	);
};
export default TabLayout;
