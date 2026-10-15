import React from "react";
import { View, Text, TextInput,StyleSheet,Button } from "react-native";
const ForecastSearch = ({
  toggleSearch,
  setToggleSearch,
  city,
  setCity,
  fetchLatLongHandler,
  fetchByPostalHandler,
  setPostalCode,
  postalCode,
}) => {
  const handleSubmit = (e) => {
    if (toggleSearch === "city") {
      fetchLatLongHandler();
    }
    if (toggleSearch === "postal") {
      fetchByPostalHandler();
    }
  };

  const setToggleByCity = () => {
    setToggleSearch("city");
  };

  const setToggleByPostal = () => {
    setToggleSearch("postal");
  };

  return (
    <View style={styles.Container}>
      {/* <View style={styles.SearchBy}>
        <Text style={styles.ButtonLabel}>Search By</Text>
        <Button 
        style={{borderRadius:20}}
          title="City Name"
          color={toggleSearch === "city" ? "green" : "rgba(255, 255, 255, 0.6)"}
          accessibilityLabel="Search Weather By City"
          onPress={setToggleByCity}
          borderRadius={50}
          paddingHorizontal={10}
        />
        <Button
          title="Postal Code/Zip"
          color={toggleSearch === "city" ? "rgba(255, 255, 255, 0.6)" : "green"}
          accessibilityLabel="Search Weather By ZIP/Postal Code"
          onPress={setToggleByPostal}
        />
      </View> */}

      <TextInput
      style={styles.SearchCity}
      color={'white'}
        onChangeText={toggleSearch === "city" ? setCity : setPostalCode}
        value={toggleSearch === "city" ? city : postalCode}
        placeholderTextColor={'white'}
        placeholder={
          toggleSearch === "city" ? "Search By City" : "Search By Postal Code"
        }
        onSubmitEditing={handleSubmit}
      />
    </View>
  );
};

const styles=StyleSheet.create({
  Container:{
justifyContent:"center",
alignItems:"center",
marginTop:30
  },
  Button:{
    backgroundColor:'green',
    color:'black',
  },
  ButtonLabel:{
    color:'white',
    marginRight:10
  },
  SearchBy:{
    flexDirection:"row",
    marginTop:10,
    alignItems:"center",
    width:'90%',
    maxWidth:700,
    paddingHorizontal:20
  },
  SearchCity:{
    height:50,
    margin:10,
    backgroundColor:'#00000033',
    width:'90%',
    borderRadius:10,
    maxWidth:700,
    borderRadius: 10,
    borderColor: '#eee',
    borderWidth: 1,
    paddingLeft:20
  }
  
})

export default ForecastSearch;