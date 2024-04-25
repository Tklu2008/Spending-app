import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import {Button} from 'react-native';
import randomColor from "randomcolor";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Sum from './Sum'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
//<input  value={category} onChange={(e) => boxb(e)} />

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// Initialize Firebase


function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyCiu4c-Aqgfbjxk1Nx741wE8I0S60yZbhw",
    authDomain: "finances-ea903.firebaseapp.com",
    projectId: "finances-ea903",
    storageBucket: "finances-ea903.appspot.com",
    messagingSenderId: "504439306765",
    appId: "1:504439306765:web:0e43d97d48acf87dec3344"
  };
  
  const app = firebase.initializeApp(firebaseConfig);
  const firestoreDatabase = app.firestore();

  const [business, setBusiness] = useState([]);
  const [category, setCategory] = useState([]);
  const [costs, setCosts] = useState([]);

  const [items, setItems] = useState([]);

  const [changed, setChanged] = useState(false);
  const [changedIndex, setChangedIndex] = useState(false);
  const [newbusiness, setNewBusiness] = useState('')
  const [newcategory, setNewCategory] = useState('');
  const [newcosts, setNewCosts] = useState('');
  const [changeUI, setUI] = useState(false);



  useEffect(() => {
    const fetchData = async () => {
    try {
      const collectionRef = firestoreDatabase.collection('finances');
      
      const snapshot = await collectionRef.get();
      
      const fetchedData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setItems(fetchedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  fetchData();
  }, []);

  const addspending = () => {
    let item = {
      'category': category,
      'business': business,
      'cost': costs,
      'color': randomColor(),
    }
    saveFinances(item).then( (temp) => {  
     console.log(temp);
    item = {...item, id:temp};
    setItems([item, ...items])}
    );
  }

  const removeSpending = (index) => {
    removeFinances(items[index].id);
    const newItems = [...items];
    newItems.splice(index, 1)
    setItems(newItems);
  }

  const changeSpending = (index) =>{
    if (changed){
      let newcolor = randomColor()
      console.log(items)
      console.log(items[index])
      const temp = items[index].id;
      console.log(temp)
      
      let item = {
        'category': newcategory,
        'business': newbusiness,
        'cost': newcosts,
        'color': newcolor,
        'id': temp,
      }
      const newItems = [...items]
      newItems.splice(index, 1)
      setItems([...newItems.slice(0, index),
      item,
      ...newItems.slice(index)]);
      console.log(item);
      changeFinances(item);
      
    }
    setChanged(!changed);
    setChangedIndex(index);
  }

  const boxa = (e) => {
    setBusiness(e.target.value);
  }
  const boxb = (e) => {
    setCategory(e.value);
  }
  const boxc = (e) => {
    setCosts(e.target.value);
  }

  const boxd = (e) => {
    setNewBusiness(e.target.value);
  }
  const boxe = (e) => {
    setNewCategory(e.value);
  }
  const boxf = (e) => {
    setNewCosts(e.target.value);
  }

  const UIChangeHandler = (e) => {
    setUI(!changeUI);
  }

  const options = [
    'one', 'two', 'three'
  ];
  const defaultOption = options[0];

  const saveFinances = async (item) => {
    const collectionRef = firestoreDatabase.collection('finances'); // Reference to the location in your Firebase database
    const documentRef = await collectionRef.add(item);
    return documentRef.id
  }

  const changeFinances = async (item) => {
    console.log(item.id);
    const collectionRef = firestoreDatabase.collection('finances').doc(item.id); // Reference to the location in your Firebase database
    await collectionRef.update(item);
  }

  const removeFinances = async (id) => {
    console.log(id);
    const collectionRef = firestoreDatabase.collection('finances').doc(id); // Reference to the location in your Firebase database
    await collectionRef.delete();
  }

  if (changeUI) { 
    return <Sum items={items} UIChangeHandler={UIChangeHandler}/>
  } else {

    return (
      <div>
        <div>
            <div>
              
              {items.map( (item, index) => (<div style = {{backgroundColor:item.color}}>
                {changed ? (<input defaultValue={item.business} onChange={(e) => boxd(e)} />) : (<h1>{item.business} {changed}</h1>)}
                {changed ? (<Dropdown options={options} onChange={(e) => boxe(e)} placeholder="Select an option" />) : (<h1>{item.category} {changed}</h1>)}
                {changed ? (<input defaultValue={item.cost} onChange={(e) => boxf(e)} />) : (<h1>{item.cost} {changed}</h1>)}
                {changed ? <Button onPress={() => {setNewBusiness(items[index].business); setNewCosts(items[index].cost); setNewCategory(items[index].category)}} title={"Cancel"}/> : <></>}
                <Button onPress={() => removeSpending(index)} title={"Remove Spending"}/> 
                <Button onPress={() => changeSpending(index)} title={"Update Changes"}/>
            </div>))}
          </div>
          <input  value={business} onChange={(e) => boxa(e)} />
          
          <Dropdown options={options} onChange={(e) => boxb(e)} placeholder="Select an option" />;
          
          <input  value={costs} onChange={(e) => boxc(e)} />
          <Button onPress={addspending} title={"Add Spending"}/>
          <Button onPress={UIChangeHandler} title={"Change UI"}/>
        </div>
      </div>  
    );
  }
}

export default App;
