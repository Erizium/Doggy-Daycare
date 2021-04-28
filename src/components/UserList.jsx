import React from 'react';
import { useEffect, useState } from 'react';

const UserList = () => {

    const [dogElements, setDogElements] = useState(null)
    const [dogJson, setDogJson] = useState([])

    const [inputString, setInputString] = useState("")


    useEffect( async () => {

        let response = await fetch("https://api.jsonbin.io/b/6087cce85210f622be3ae8c9");
        let tempData = await response.json();

        setDogElements(tempData.dogs[0].name);
        console.log(tempData);

        setDogJson(tempData.dogs);
        
    }, [])

    function hej(event) {
        console.log(inputString)
        setInputString(event.target.value)  
    }

        useEffect(() => {
            //showing all
            if(inputString === "") {
                console.log("hej")

                //on click, förstora bild med mer information, blurra bakgrunden

                const info1 = dogJson.map((item) => (
                        <div id="infos">
                                <img src={item.img} class="dogImg"></img>
                                <div>
                                    <div>{item.name}</div>
                                    <div>Chip Nr: {item.chipNumber}</div>
                                </div>
                        </div>  
                ))
                setDogElements(info1);
            } else {
                //search
                let dogs = dogJson.filter(dog =>  dog.chipNumber === inputString ||
                    dog.owner.name === inputString || dog.owner.lastName === inputString || dog.name === inputString)
       
               console.log(dogs)
       
               const info2 = dogs.map((item) => (
                   
                       <div id="infos">
                            <img src={item.img} class="dogImg"></img>
                                <div id="shortInfo">
                                    <div>{item.name}</div>
                                    <div>Chip Nr: {item.chipNumber}</div>
                                </div>
                           
                            
{/* 
                           <img src={item.img} class="dogImg"></img>
                           <div class="dogInformation">
                               <div>
                                   <div>Name: {item.name}</div>
                                   <div>Gender: {item.sex}</div>
                                   <div>Age: {item.age}</div>
                                   <div>Breed: {item.breed}</div>
                               </div>
                               <div>
                                   <div>ChipNumber: {item.chipNumber}</div>
                               </div>
                               <div>
                                   <div>Owner: {item.owner.name} {item.owner.lastName}</div>
                                   <div>Phonenumber: {item.owner.phoneNumber}</div>
                               </div>
                           </div>   */}
                       </div>
                   
                ))
                
                setDogElements(info2);
            
            }
        }, [dogJson, inputString])


        function showAllInformation() {
            console.log("hej")
        }

     
    return(
        <div id="blur">
            <div className="data">
                <h4 id="searchTitle">Search for your dog</h4>
                <div id="input">
                    <input type="text" placeholder="Name, owner or chipNr"
                    name="breed" id="searchbar" onChange={hej}></input>
                </div>
                <div id="dogElements" onClick={showAllInformation}>
                    {dogElements}
                </div>
                
            </div>
        </div>
       
    )

}

export default UserList;