// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GgyuToken is ERC20, ERC20Burnable, Ownable {
    event ethExchangeEvent(address indexed from, uint256 value);
    event withdrawalEvent(address indexed from, uint256 value);

    uint256 private _exchangeRate = 100;

    constructor(uint256 initialSupply) ERC20("GgyuToken", "GGT") {
        _mint(_msgSender(), initialSupply);
    }

    function mint() public payable {
        uint256 exchangedToken = msg.value * _exchangeRate;
        _mint(_msgSender(), exchangedToken);
        emit ethExchangeEvent(_msgSender(), exchangedToken);
    }

    function setExchange(uint256 _exchangeRate_) public onlyOwner {
        _exchangeRate = _exchangeRate_;
    }

    function ethExchange() public view returns (uint256) {
        return _exchangeRate;
    }

    function withdrawal(uint256 tokenAmount) public payable {
        require(balanceOf(_msgSender()) >= tokenAmount, "not");
        uint256 _etherAmount = tokenAmount / _exchangeRate;
        burn(tokenAmount);
        emit withdrawalEvent(_msgSender(),_etherAmount);
        payable(msg.sender).transfer(_etherAmount);
    }
}

contract GgyuNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("GgyuNFT", "GGF") {}
}
