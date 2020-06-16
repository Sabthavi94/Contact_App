import React from 'react';
import { StyleSheet, Text, View, ScrollView,TouchableOpacity, Linking, Platform,Alert, AsyncStorage } from 'react-native';
import {Card, CardItem} from 'native-base';
import {Entypo} from '@expo/vector-icons';


export default class ViewContactScreen extends React.Component {

  
static navigationOptions = {
  title:'View Contact',
  headerLeft: (props) => (
    <HeaderBackButton
      {...props}
      onPress={() => {
        props.navigation.push("Home")
      }}
    />
  )
};

  constructor(props){
    super(props);
    this.state={
      fname:"DummyText",
      lname:"DummyText",
      phone:"DummyText",
      email:"DummyText",
      address:"DummyText",
      key:"DummyText"
    }
  }


componentDidMount(){
  const {navigation}=this.props;
  // navigation.addListener("WillFocus",()=>{
    var {key} = this.props.route.params;
    this.getContact(key);
  // });
}

getContact= async key =>{
 await AsyncStorage.getItem(key)
 .then(contactjsonString=>{
  //  convert long string into JSON
   var contact= JSON.parse(contactjsonString);
   contact["key"]=key;
   this.setState(contact);
   console.log('contact',contact);
   
 })
 .catch(error=>{
   console.log(error);
   
 })
}


callAction= phone=>{
  let phonenumber= phone;
  if(Platform.OS !== "android"){
    phonenumber= `telpromt:${phone}`;
    //phonenumber is a string now its capable of opening link in you phone
  }else{
    phonenumber= `tel:${phone}`;
  }

  Linking.canOpenURL(phonenumber)
  .then(supported=>{
    if(!supported){
      Alert.alert("Phone number is not availabe");
    }else{
      return Linking.openURL(phonenumber);
    }
  })
  .catch(error=>{
    console.log(error);
    
  })
}


smsAction= phone=>{
  let phonenumber= phone;
  phonenumber= `sms:${phone}`;
  
  Linking.canOpenURL(phonenumber)
  .then(supported=>{
    if(!supported){
      Alert.alert("Phone number is not availabe");
    }else{
      return Linking.openURL(phonenumber);
    }
  })
  .catch(error=>{
    console.log(error);
    
  })
}

editContact=(key)=>{
  this.props.navigation.navigate("EditContact",{key:key});
}


deleteContact=(key)=>{
  Alert.alert(
    "Delete Contact ?",
    `${this.state.fname} ${this.state.lname}`,
    [
      {
        text:"Cancel", onPress: ()=> console.log("Cancel tapped")
      },
      {
        text:"OK", onPress: async ()=>{
          await AsyncStorage.removeItem(key)
          .then(()=>{this.props.navigation.push("Home")})
          .catch(error =>{console.log(error)})
        }
      }
    ]
  )
}


  render(){
  return (
    <ScrollView style={styles.container}>
     <View style={styles.contactIconContainer}>
       <Text style={styles.contactIcon}> 
         {this.state.fname[0].toUpperCase()}
       </Text>
       <View style={styles.nameContainer}>
       <Text style={styles.name}>
         {this.state.fname} {this.state.lname} 
       </Text>
     </View> 
     </View> 
      
    <View style={styles.infoContainer}>
      <Card>
        <CardItem bordered>
          <Text style={styles.infoText}>Phone</Text>
        </CardItem>
        <CardItem bordered>
          <Text style={styles.infoText}>{this.state.phone}</Text>
        </CardItem>
      </Card>

      <Card>
        <CardItem bordered>
          <Text style={styles.infoText}>Email</Text>
        </CardItem>
        <CardItem bordered>
          <Text style={styles.infoText}>{this.state.email}</Text>
        </CardItem>
      </Card>

      <Card>
        <CardItem bordered>
          <Text style={styles.infoText}>Address</Text>
        </CardItem>
        <CardItem bordered>
          <Text style={styles.infoText}>{this.state.address}</Text>
        </CardItem>
      </Card>

    </View>
    
    <Card style={styles.actionContainer}>
      <CardItem style={styles.actionButton} bordered>
        <TouchableOpacity
        onPress={()=>{
          this.smsAction(this.state.phone);
        }}
        >
          <Entypo
          name="message"
          size={50}
          color="#B83227"
          
          />
        </TouchableOpacity>
        
      </CardItem>

      <CardItem style={styles.actionButton} bordered>
        <TouchableOpacity
        onPress={()=>{
          this.callAction(this.state.phone);
        }}
        >
          <Entypo
          name="phone"
          size={50}
          color="#B83227"
          
          />
        </TouchableOpacity>
        
      </CardItem>
    </Card>
    
    <Card style={styles.actionContainer}>
      <CardItem style={styles.actionButton} bordered>
        <TouchableOpacity
        onPress={()=>{
          this.editContact(this.state.key);
        }}
        >
          <Entypo
          name="edit"
          size={50}
          color="#B83227"
          
          />
        </TouchableOpacity>
        
      </CardItem>

      <CardItem style={styles.actionButton} bordered>
        <TouchableOpacity
        onPress={()=>{
          this.deleteContact(this.state.key)
        }}
        >
          <Entypo
          name="trash"
          size={50}
          color="#B83227"
          
          />
        </TouchableOpacity>
        
      </CardItem>
    </Card>
    
    
    </ScrollView>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contactIconContainer: {
    height: 200,
    backgroundColor: "#B83227",
    alignItems: "center",
    justifyContent: "center"
  },
  contactIcon: {
    fontSize: 100,
    fontWeight: "bold",
    color: "#fff"
  },
  infoContainer: {
    flexDirection: "column"
  },
  nameContainer: {
    width: "100%",
    height: 70,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.5)",
    justifyContent: "center",
    position: "absolute",
    bottom: 0
  },
  name: {
    fontSize: 24,
    color: "#000",
    fontWeight: "900"
  },
  infoText: {
    fontSize: 18,
    fontWeight: "300"
  },
  actionContainer: {
    flexDirection: "row"
  },
  actionButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  actionText: {
    color: "#B83227",
    fontWeight: "900"
  }
});
