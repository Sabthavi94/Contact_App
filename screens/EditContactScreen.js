import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard,AsyncStorage, Alert } from 'react-native';
import {Form,Item,Input,Label,Button} from 'native-base';

export default class EditContactScreen extends React.Component {


constructor(props){
  super(props);
  this.state={
    fname:"",
    lname:"",
    email:"",
    phone:"",
    address:"",
    key:""
  }
}

componentDidMount(){
  const {key}= this.props.route.params;
  this.getContact(key);
  // console.log(key);

}

getContact= async key=>{
  await AsyncStorage.getItem(key)
  .then(contactJsonString=>{
    contact= JSON.parse(contactJsonString);
    contact["key"]=key;
    this.setState(contact);
   
    
  })
  .catch(error=>{console.error();
  })
}

updateContact=async key=>{
  if(
    this.state.fname !== "" &&
    this.state.lname !== "" &&
    this.state.address !== "" &&
    this.state.phone !== "" &&
    this.state.email !== "" 
  ){

    var contact={
      fname:this.state.fname,
      lname:this.state.lname,
      email:this.state.email,
      phone:this.state.phone,
      address:this.state.address,
    }

    await AsyncStorage.mergeItem(key, JSON.stringify(contact))
    .then(()=>{
      this.props.navigation.push("ViewContact",{key:this.state.key});
    })
    .catch(error=>{console.error();
    })


  }

}

  render(){
  return (
    <TouchableWithoutFeedback
    onPress={
      ()=>Keyboard.dismiss
    }>
      <View style={styles.container}>
        <Form>
          <Item style={styles.inputItem}>
            <Label>First Name</Label>
            <Input
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="default"
            onChangeText={fname=>this.setState({fname})}
            value={this.state.fname}
            />
          </Item>
          <Item style={styles.inputItem}>
            <Label>Last Name</Label>
            <Input
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="default"
            onChangeText={lname=>this.setState({lname})}
            value={this.state.lname}
            />
          </Item>
          <Item style={styles.inputItem}>
            <Label>Email</Label>
            <Input
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={email=>this.setState({email})}
            value={this.state.email}
            />
          </Item>
          <Item style={styles.inputItem}>
            <Label>Phone</Label>
            <Input
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="phone-pad"
            onChangeText={phone=>this.setState({phone})}
            value={this.state.phone}
            />
          </Item>
          <Item style={styles.inputItem}>
            <Label>Address</Label>
            <Input
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="default"
            onChangeText={address=>this.setState({address})}
            value={this.state.address}
            />
          </Item>  
        </Form>

        <Button
        onPress={()=>{this.updateContact(this.state.key)}}
        full
        rounded
        style={styles.button}
        >
          <Text style={styles.buttonText}>Update</Text>
        </Button>
      </View>
    </TouchableWithoutFeedback>
    
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10
  },
  inputItem: {
    margin: 10
  },
  button: {
    backgroundColor: "#B83227",
    marginTop: 40
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  }
});