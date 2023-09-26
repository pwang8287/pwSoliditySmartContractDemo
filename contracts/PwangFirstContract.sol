// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18; //solidity version

contract PwangFirstContract {
    //boolean,uint无符号整数即正整数,int有符号整数,address,bytes

    uint256 myFavoriteNumber;

    //uint256[] listOfFavoriteNumbers;
    mapping(string => uint256) public nameToFavoriteNumber;

    struct Person {
        uint256 favoriteNumber;
        string name;
    }

    Person[] public listOfPerple;

    // Person public pat = Person({favoriteNumber:8,name:"Pat"});
    // Person public mariah = Person({favoriteNumber:7,name:"Mariah"});
    // Person public jon = Person({favoriteNumber:5,name:"Jon"});

    function store(uint256 _favoriteNumber) public virtual {
        myFavoriteNumber = _favoriteNumber;
    }

    //0xd9145CCE52D386f254917e481eB44e9943F39138

    function retrieve() public view returns (uint256) {
        return myFavoriteNumber;
    }

    function addPerson(string memory _name, uint256 _favoriteNmuber) public {
        // Person memory newPerson = Person(_favoriteNmuber,_name);
        // listOfPerple.push(newPerson);
        listOfPerple.push(Person(_favoriteNmuber, _name));
        nameToFavoriteNumber[_name] = _favoriteNmuber;
    }
}
