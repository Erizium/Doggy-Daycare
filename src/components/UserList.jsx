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

            //const string = "husky";
            let dogs = dogJson.filter(dog => dog.breed === inputString)
    
            console.log(dogs)
    
            const info = dogs.map((item) => (
                <div id="container">
                    <div id="infos">
                        <img src={item.img} id="dogImg"></img>
                        <div id="dogInformation">
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
                </div>
            ))
            setDogElements(info);
    
        }, [dogJson, inputString])



     
    return(
        <div className="data">
            <div id="input">
                <input type="text" placeholder="breed" name="breed" id="searchbar" onChange={hej}></input>
                <button onClick={hej}>Search</button>
            </div>
            {dogElements}
        </div>
    )

}

export default UserList;