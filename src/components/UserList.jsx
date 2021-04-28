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

            if(inputString === "") {
                console.log("hej")

                const info1 = dogJson.map((item) => (
                        <div id="infos">
                            <div>{item.name}</div>
                            <img src={item.img} class="dogImg"></img>
                            
                            
                            
                            
                            {/* <div class="dogInformation">
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
                            </div>  */}
                        </div>  
                ))
                setDogElements(info1);
            } else {
                let dogs = dogJson.filter(dog =>  dog.chipNumber === inputString ||
                    dog.owner.name === inputString || dog.owner.lastName === inputString || dog.name === inputString)
       
               console.log(dogs)
       
               const info2 = dogs.map((item) => (
                   
                       <div id="infos">
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
                           </div>  
                       </div>
                   
                ))
                
                setDogElements(info2);
            
            }
        }, [dogJson, inputString])



     
    return(
        <div id="blur">
            <div className="data">
                <h4 id="searchTitle">Search for your dog</h4>
                <div id="input">
                    <input type="text" placeholder="Name, owner or chipNr"
                    name="breed" id="searchbar" onChange={hej}></input>
                </div>
                {dogElements}
            </div>
        </div>
       
    )

}

export default UserList;