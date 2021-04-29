import React from 'react';
import { useEffect, useState } from 'react';

const UserList = () => {

    const [dogElements, setDogElements] = useState(null)
    const [dogJson, setDogJson] = useState([])
    const [bigImg, setBigImg] = useState(null)
    const [inputString, setInputString] = useState("")


    useEffect(async () => {

        let response = await fetch("https://api.jsonbin.io/b/6087cce85210f622be3ae8c9");
        let tempData = await response.json();

        setDogElements(tempData.dogs[0].name);
        console.log(tempData);

        setDogJson(tempData.dogs);

    }, [])

    function getInputString(event) {
        console.log(inputString)
        setInputString(event.target.value)
    }

    function dogMoreInformation(item) {
        console.log(item)
        //state variable item eller null
        setBigImg(item)
    }

    useEffect(() => {
        //showing all
        if (inputString === "") {
            const info1 = dogJson.map((item) => (
                <div id="infos" onClick={() => dogMoreInformation(item)}>
                    <img src={item.img} className="dogImg"></img>
                    <div>
                        <div>{item.name}</div>
                        <div>Chip Nr: {item.chipNumber}</div>
                    </div>
                </div>
            ))
            setDogElements(info1);
        } else {
            //search
            let dogs = dogJson.filter(dog => dog.chipNumber === inputString ||
                dog.owner.name === inputString || dog.owner.lastName === inputString || dog.name === inputString)

            console.log(dogs)

            const info2 = dogs.map((item) => (

                <div id="infos" onClick={() => dogMoreInformation(item)}>
                    <img src={item.img} className="dogImg"></img>
                    <div>
                        <div>{item.name}</div>
                        <div>Chip Nr: {item.chipNumber}</div>
                    </div>
                </div>
            ))
            setDogElements(info2);
        }
    }, [dogJson, inputString])

    let img, dogName, age, breed, gender, chipNumber, owner, phonenumber, present = null
    if(bigImg != null) {
        img = <img src={bigImg.img} className="largeImg"></img>
        dogName = <div>{bigImg.name}</div>
        age = <div>{bigImg.age}</div>
        gender = <div>{bigImg.sex}</div>
        breed = <div>{bigImg.breed}</div>
        chipNumber = <div>{bigImg.chipNumber}</div>
        owner = <div>{bigImg.owner.name} {bigImg.owner.lastName}</div>
        phonenumber = <div>{bigImg.owner.phoneNumber}</div>
        present = <div>{bigImg.present}</div>
    }
    return (
        
    
        <div className="data">      

            <div className="moreDogInformationContainer">
                <div id="dogInfo1">
                    {img}
                    <div>
                        <div>{dogName}</div>
                        <div id="moreInfo">
                            <div id="moreDiv1">
                                <div>Age: {age}</div>
                                <div>Breed: {breed}</div>
                                <div>Chip Nr: {chipNumber}</div>
                                <div>Owner: {owner}</div>
                                <div>Phone: {phonenumber}</div>
                            </div>
                            <div id="moreDiv2">
                                <div>Gender: {gender}</div>
                                <div>Present: Yes</div>
                            </div>
                        </div>
                    </div>
                </div>   
            </div>

            <div id="searchDiv">
                <h2 id="searchTitle">Search for your family member</h2>
                <div id="input">
                    <input type="text" placeholder="Name, owner or chipNr"
                        name="breed" id="searchbar" onChange={getInputString}></input>
                </div>
            </div>
            <div id="dogElements" >
                {dogElements}
            </div>
        </div>
        

    )

}

export default UserList;