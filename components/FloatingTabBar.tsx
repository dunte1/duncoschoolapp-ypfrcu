
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { IconSymbol } from '@/components/IconSymbol';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, usePathname } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { colors } from '@/styles/commonStyles';

export interface TabBarItem {
  name: string;
  route: string;
  icon: string;
  label: string;
}

interface FloatingTabBarProps {
  tabs: TabBarItem[];
  containerWidth?: number;
  borderRadius?: number;
  bottomMargin?: number;
}

export default function FloatingTabBar({
  tabs,
  containerWidth = Dimensions.get('window').width - 32,
  borderRadius = 24,
  bottomMargin = 16,
}: FloatingTabBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();
  const activeIndex = useSharedValue(0);

  const currentIndex = tabs.findIndex((tab) => {
    if (tab.route === '/(tabs)/(home)/') {
      return pathname === '/' || pathname.startsWith('/(tabs)/(home)');
    }
    return pathname.includes(tab.name);
  });

  React.useEffect(() => {
    if (currentIndex !== -1) {
      activeIndex.value = withSpring(currentIndex, {
        damping: 15,
        stiffness: 150,
      });
    }
  }, [currentIndex]);

  const handleTabPress = (route: string) => {
    router.push(route as any);
  };

  const tabWidth = containerWidth / tabs.length;

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: activeIndex.value * tabWidth }],
    };
  });

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[styles.safeArea, { marginBottom: bottomMargin }]}
    >
      <BlurView
        intensity={80}
        tint={theme.dark ? 'dark' : 'light'}
        style={[
          styles.container,
          {
            width: containerWidth,
            borderRadius,
            backgroundColor: theme.dark ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          },
        ]}
      >
        <Animated.View
          style={[
            styles.indicator,
            {
              width: tabWidth - 16,
              backgroundColor: colors.primary,
              borderRadius: borderRadius - 4,
            },
            indicatorStyle,
          ]}
        />
        {tabs.map((tab, index) => {
          const isActive = currentIndex === index;
          return (
            <TouchableOpacity
              key={tab.name}
              style={[styles.tab, { width: tabWidth }]}
              onPress={() => handleTabPress(tab.route)}
              activeOpacity={0.7}
            >
              <IconSymbol
                name={tab.icon as any}
                size={24}
                color={isActive ? '#FFFFFF' : colors.text}
              />
              <Text
                style={[
                  styles.label,
                  {
                    color: isActive ? '#FFFFFF' : colors.text,
                    fontWeight: isActive ? '600' : '400',
                  },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </BlurView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  indicator: {
    position: 'absolute',
    height: 48,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    zIndex: 1,
  },
  label: {
    fontSize: 11,
    marginTop: 4,
  },
});
