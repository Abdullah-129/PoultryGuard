import { View, Text, SafeAreaView, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { StyleSheet, Dimensions, Image } from 'react-native';
const { width, height } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';

export default function Home() {

   const navigation = useNavigation();

  const handleOnPress = () => {
    navigation.navigate('Scan');
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Poultry Detection</Text>
          <Text>Makes A Difference</Text>
        </View>
        <View style={styles.mainContent}>
          <View style={styles.scannerContainer}>
            <View style={styles.scannerContent}>
              <Image
                source={require('../assets/scan.png')}
                style={styles.scannerImage}
              />
              <Text style={styles.scannerText}>
                Our scan can help you detect poultry diseases
              </Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>

                The detection of poultry diseases can significantly benefit both poultry farmers and consumers. Early detection allows farmers to promptly isolate infected birds, preventing the spread of disease throughout the flock. This can lead to lower mortality rates and reduced financial losses for farmers. Additionally, early detection can help prevent the transmission of diseases to humans, ensuring the safety of poultry products consumed by the public. Overall, the timely detection of poultry diseases plays a crucial role in safeguarding both animal welfare and public health.
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleOnPress}>
            <View style={styles.cameraSection}>
              <Text style={styles.cameraSectionText}>
                Click Here To Scan
              </Text>
            </View>
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
  },
  header: {
    padding: 20,
    backgroundColor: "#FBF9F1",
    borderRadius: 5,
    marginTop: height * 0.05,
    marginHorizontal: width * 0.05,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    marginHorizontal: width * 0.05,
    marginTop: 10,
  },
  scannerContainer: {
    backgroundColor: '#DCF2F1',
    flex: 1,
    borderRadius: 20,
    alignItems: 'center',
    padding: 20,
    marginBottom: 10,
  },
  scannerContent: {
    backgroundColor: '#7FC7D9',
    height: height * 0.15,
    width: width * 0.8,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  scannerImage: {
    width: width * 0.15,
    height: width * 0.15,
    marginRight: 10,
    borderRadius: 5,
  },
  scannerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    padding: 5,
    flex: 1,
  },
  descriptionContainer: {
    padding: 10,
  },
  descriptionText: {
    color: 'gray',
  },
  cameraSection: {
    backgroundColor: '#7FC7D9',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  cameraSectionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
