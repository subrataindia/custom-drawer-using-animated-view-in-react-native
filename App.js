import React, {useState, useRef} from 'react';
import profile from './assets/img/subrat.png';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  Animated,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

const App = () => {
  const [currentTab, setCurrentTab] = useState('Home');
  const [showDrawer, setShowDrawer] = useState(false);

  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{justifyContent: 'flex-start', marginHorizontal: 10}}>
        <Image
          source={profile}
          style={{
            width: 60,
            height: 60,
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 1,
            backgroundColor: '#fff',
            marginTop: 8,
          }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#fff',
            marginTop: 5,
          }}>
          Subrat Dash
        </Text>
        <TouchableOpacity>
          <Text style={{color: '#fff'}}>View Profile</Text>
        </TouchableOpacity>
        <View style={{flex: 1, marginHorizontal: 10, marginTop: 20}}>
          {TabButton(currentTab, setCurrentTab, 'Home', 'home')}
          {TabButton(currentTab, setCurrentTab, 'About', 'account-circle')}
          {TabButton(currentTab, setCurrentTab, 'Notifications', 'comment')}
          {TabButton(currentTab, setCurrentTab, 'Downloads', 'cloud-download')}
        </View>
      </View>
      {
        // Overlay View
      }
      <Animated.View
        style={{
          flexGrow: 1,
          backgroundColor: '#FFF',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: 10,
          borderRadius: 10,
          transform: [{scale: scaleValue}, {translateX: offsetValue}],
        }}>
        <TouchableOpacity
          onPress={() => {
            Animated.timing(scaleValue, {
              toValue: showDrawer ? 1 : 0.9,
              duration: 300,
              useNativeDriver: true,
            }).start();

            Animated.timing(offsetValue, {
              toValue: showDrawer ? 0 : 170,
              duration: 300,
              useNativeDriver: true,
            }).start();

            setShowDrawer(!showDrawer);
          }}>
          <MaterialIcons name={showDrawer ? 'close' : 'menu'} size={40} />
        </TouchableOpacity>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          {currentTab} Content
        </Text>
        <Text style={{marginTop: 20}}>
          This content can be anything as per your page requirements. You can
          import components here. As this is only for demo purpose so I am not
          wasting time in making this.
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5359D1',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});

export default App;

const TabButton = (currentTab, setCurrentTab, title, iconName) => {
  return (
    <TouchableOpacity
      onPress={() => setCurrentTab(title)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: currentTab === title ? '#fff' : 'transparent',
        borderRadius: 5,
        padding: 5,
        marginTop: 10,
      }}>
      {iconName.length > 0 ? (
        <MaterialIcons
          name={iconName}
          size={25}
          color={currentTab === title ? '#5359D1' : '#fff'}
          style={{marginRight: 10}}
        />
      ) : null}
      <Text
        style={{
          fontSize: 16,
          color: currentTab === title ? '#5359D1' : '#fff',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
