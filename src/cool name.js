//Puts items from firebase to form a new starting
useEffect(() => {
  const fetchData = async () => {
    try {
      const collectionRef = firebase.firestore().collection('yourCollection');
      
      const snapshot = await collectionRef.get();
      
      const fetchedData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setData(fetchedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);


//