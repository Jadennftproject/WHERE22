//SPDX-License-Identifier: MIT

// @title: Test Mint: Jaden
// @author: @spencerobsitnik

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract TestMint is ERC721, Ownable, ReentrancyGuard {
    using SafeMath for uint256;
    using Strings for uint256;
    using Counters for Counters.Counter;

    Counters.Counter public _publicCount;
    Counters.Counter public _privateCount;

    string public _tokenUriBase;
    bool public _saleActive;
    bool private _publicSaleActive;
    uint256 public _mintPricePublic = 0.00 ether;
    uint256 public _maxPublicCharacters = 500;

    IERC721 private _lp;
    
    mapping(address => bool) private _freeMintList;

    mapping(address => bool) private _allowPrivate;

    modifier canMintPublic() {
        require(
            _publicCount.current() + 1 <= _maxPublicCharacters,
            "Not enough passes remaining to mint"
        );
        _;
    }

    constructor() ERC721("Test Project", "TEST") {
        _saleActive = false;
        _publicSaleActive = false;
        _tokenUriBase = "ipfs://bafybeidxclrx67b6w2u3xzrwyvkralua63lqzzvbf3ueusi6z6cka3jn5y";
    }

    // ------- Public read-only function --------
    function getBaseURI() external view returns (string memory) {
        return _tokenUriBase;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(_exists(tokenId), "Nonexistent token");

        return string(abi.encodePacked(_tokenUriBase, "/", tokenId.toString(), ".json"));
    }
    // ------------------------------------------

    function mint() external payable nonReentrant canMintPublic {
        _publicCount.increment();
        _safeMint(_msgSender(), _publicCount.current());
    }

    // ------- Owner functions --------
    function setBaseURI(string memory baseURI) external onlyOwner {
        _tokenUriBase = baseURI;
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        payable(_msgSender()).transfer(balance);
    }

    function setSale(bool saleActive) external onlyOwner {
        _saleActive = saleActive;
    }

    function changeMintPrice(uint256 price) external onlyOwner {
        _mintPricePublic = price;
    }

    function setMaxPasses(uint256 newPasses) external onlyOwner {
        require (
            newPasses >= _publicCount.current(),
            "Burning is the only way to destroy NFTs"
        );
        _maxPublicCharacters = newPasses;
    }
    }