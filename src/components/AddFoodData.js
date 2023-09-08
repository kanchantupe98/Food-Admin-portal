import React, { useState } from 'react'
import './AddFoodData.css'
import { db, storage } from '../Firebase/FirebaseConfig.js'
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';


const AddFoodData = () => {
  const [foodName, setFoodName] = useState('');
  const [foodDescription, setFoodDescription] = useState('');
  const [foodPrice, setFoodPrice] = useState('');
  const [foodImage, setFoodImage] = useState(null);
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantPhone, setRestaurantPhone] = useState('');
  const [foodCategory, setFoodCategory] = useState('');
  const [foodImageUrl, setFoodImageUrl] = useState("");
  //
  const[foodType, setFoodType] = useState('');
  const[mealType, setMealType] = useState('');
  const[foodAddon, setFoodAddon]=useState('');
  const [foodAddonPrice, setFoodAddonPrice] = useState('');
  //
  const [restaurantEmail,setRestaurantEmail]=useState('');
  const [restaurantAddressBuilding,setRestaurantAddressBuilding]=useState('');
  const [restaurantAddressStreet,setRestaurantAddressStreet]=useState('');
  const [restaurantAddressCity,setRestaurantAddressCity]=useState('');
  const [restaurantAddressPincode,setRestaurantAddressPincode]=useState('');
//
  const handleSubmit = (e) => {
    e.preventDefault()

    if(foodImage==null) {
      alert('Please select an image')
      return
    }
    else {
      const imageRef =ref(storage,`FoodImages/${foodImage.name}`);
      uploadBytes(imageRef,foodImage)
        .then(()=>{
          alert("Image successfully uploaded")
           getDownloadURL(imageRef)
           .then((url)=>{
            // console.log(url);
            // setFoodImageUrl(url);
            
            const foodData = {
                foodName,
                foodDescription,
                foodPrice,
                foodImageUrl:url,
                foodCategory,
                foodType,
                mealType,
                foodAddon,
                foodAddonPrice,
                restaurantName,
                restaurantEmail,
                restaurantAddressBuilding,
                restaurantAddressCity,
                restaurantAddressStreet,
                restaurantAddressPincode,
                restaurantPhone,
              
              }
              console.log(foodData);
              const dbRef = collection(db, "FoodData"); // Reference to the "users" collection
           
              // const data = { foodName: 'burger', foodDescription: 'pastahghs', foodPrice: '65', category: 'hgjohh' }
          
              addDoc(dbRef, foodData)
                .then(docRef => {
                  console.log("Document has been added successfully", docRef);
                  alert("Data added succesfully", docRef.id);
                })
                .catch(error => {
                  console.log(error);
                });
            
         })
        })
          .catch((error)=>{
            alert(error.message)
          })
          
    }

    


    // try{
    // const docRef = addDoc(collection(db,'FoodData'),foodData);
    //  alert ("Data added succesfully", docRef.id);
    // }
    // catch(error){
    //   alert('error Adding document :', error);
    // }
  }


  return (
    <div className='form-outer'>
      <h1>Add Food Data</h1>
      <form className='form-inner'>
        <label>Food Name</label>
        <input type='text' name='food_Name'
          onChange={(e) => { setFoodName(e.target.value) }}
        />
        <br />
        <label>Food Description</label>
        <input type='text' name='food_description' onChange={(e) => { setFoodDescription(e.target.value) }} />
        <div className='form-row'>
             <div className='form-col'>
              <label> food Price </label>
               <input type='number' name='food_price'
                   onChange={(e)=>{setFoodPrice(e.target.value)}}/>
             </div>
             <div className='form-col'>
             <label> Food Type </label>
              <select name='food_type' onChange={(e)=>{setFoodType(e.target.value)}}>
                   <option value='null'> Select Food Type </option>
                   <option value='Veg'>Veg</option>
                   <option value='non-veg'>Non-Veg</option>
              </select>
             </div>

        </div>
        <div className='form-row'>
          <div className='form-col'>
          <label>Food Category </label>
             <select name = 'food_category' onChange={(e)=>{setFoodCategory(e.target.value)}}>
                <option value ='null' >Select Food Category </option>
                <option value ='indian'>Indian</option>
                <option value ='chinese'>Chinese</option>
                <option value ='italian'>Italian</option>
                <option value ='mexican'>Mexican</option>
                <option value ='american'>American</option>
             </select>
            </div>
            <div className='form-col'>
          <label>Meal Type</label>
             <select name = 'meal_type' onChange={(e)=>{setMealType(e.target.value)}}>
                <option value ='null'>Select Meal Type</option>
                <option value ='dinner'>Dinner</option>
                <option value ='starters'>Starters</option>
                <option value ='breakfast'>Breakfast</option>
                <option value ='liquid'>Liquid</option>
             </select>
            </div>
        </div>
        <div className='form-row'>
          <div className='form-col'>
            <label>Food Add On </label>
            <input type="text" name='food_addon'
               onChange={(e)=>{setFoodAddon(e.target.value);}}/>
          </div>
          <div className='form-col'>
            <label>Add On Price </label>
            <input type="number" name='food_addon_price'
               onChange={(e)=>{setFoodAddonPrice(e.target.value);}}/>
          </div>

        </div>
      
      <label>Food Image</label>
        <input type='file' name='food_image' onChange={(e) => { setFoodImage(e.target.files[0]) }} />
        <br />
      <label>Restaurant Name</label>
        <input type='text' name='restaurant_Name' onChange={(e) => { setRestaurantName(e.target.value) }} />
      <br />
      
        <div className='form-row'>
          <div className='form-col'>
            <label> Restaurant Building Name</label>
            <input type="text" name='restaurant_Building_name'
               onChange={(e)=>{setRestaurantAddressBuilding(e.target.value);}}/>
          </div>
          <div className='form-col'>
            <label>Restaurant Street Name </label>
            <input type="text" name='restaurant_Address_street'
               onChange={(e)=>{setRestaurantAddressStreet(e.target.value);}}/>
          </div>

        </div>
        <div className='form-row'>
          <div className='form-col'>
            <label> Restaurant City Name</label>
            <input type="text" name='restaurant_Address_city'
               onChange={(e)=>{setRestaurantAddressCity(e.target.value);}}/>
          </div>
          <div className='form-col'>
            <label>Restaurant City Pincode </label>
            <input type='number' name='restaurant_Address_pincode'
               onChange={(e)=>{setRestaurantAddressPincode(e.target.value);}}/>
          </div>

        </div>
        <div className='form-row'>
          <div className='form-col'>
            <label> Restaurant Phone Number</label>
            <input type='number' name='restaurant_phone_no'
               onChange={(e)=>{setRestaurantPhone(e.target.value);}}/>
          </div>
          <div className='form-col'>
            <label>Restaurant Email</label>
            <input type='email' name='restaurant_email'
               onChange={(e)=>{setRestaurantEmail(e.target.value);}}/>
          </div>

        </div>
        




        <button onClick={handleSubmit}>Add Food </button>
      </form>
    </div>
  )
}

export default AddFoodData
