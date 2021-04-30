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
        setBigImg(item)
        console.log("hej")
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
    let classNameContainer = "moreDogInformationContainer";
    let blurClass = "blur";

    if (bigImg != null) {

        img = <img src={bigImg.img} className="largeImg"></img>
        dogName = <div>{bigImg.name}</div>
        if (bigImg.age >= 2) {
            age = <div>{bigImg.age} years old</div>
        } else {
            age = <div>{bigImg.age} year old</div>
        }
        gender = <div>{bigImg.sex.charAt(0).toUpperCase() + bigImg.sex.slice(1)}</div>
        breed = <div>{bigImg.breed}</div>
        chipNumber = <div>Chip Nr: {bigImg.chipNumber}</div>
        owner = <div>Owner: {bigImg.owner.name} {bigImg.owner.lastName}</div>
        phonenumber = <div>Phone: {bigImg.owner.phoneNumber}</div>

        if (bigImg.present === true) {
            present = <div>Inside</div>
        } else {
            present = <div>Away</div>
        }
    } else {
        classNameContainer = "moreDogInformationContainer hide";
        blurClass = ""
    }

    return (
        <div className="data">
            <div className={classNameContainer} onClick={() => setBigImg(null)}>
                <div id="dogInfo1">
                    {img}
                    <div>
                        <div>{dogName}</div>
                        <div id="moreInfo">
                            <div id="moreDiv1">
                                <div>{age}</div>
                                <div>{chipNumber}</div>
                                <div>{owner}</div>
                                <div>{phonenumber}</div>
                            </div>
                            <div id="moreDiv2">
                                <div>{gender}</div>
                                <div>Status: {present}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={blurClass}>
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
        </div>
    )
}

export default UserList;