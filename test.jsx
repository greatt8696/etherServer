import React, { useEffect, useState } from "react";
import AppleShopContract from "../contract/AppleShop.json";
import qute from "../assets/qute.png";

// props 로 web3, account 받는 컴포는트
const AppleShop = ({ web3, account }) => {
  const [myBalance, setMyBalance] = useState(0);
  const [apple, setApple] = useState();
  const [deployed, setDeployed] = useState();
  const [CA, setCA] = useState();
  const [inputs, setInputs] = useState({
    price: 1,
    buyQuantity: 1,
    sellQuantity: 1,
    sellPrice: 1,
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const getMyBalance = async (account) => {
    const balance = await web3.eth.getBalance(account);
    return parseFloat(web3.utils.fromWei(balance, "ether")).toFixed(3);
  };

  // 사과 구매하기 버튼 함수
  const buy = async () => {
    const { price, buyQuantity } = inputs;
    await deployed.methods.buyApple(price, buyQuantity).send({
      from: account,
      to: CA,
      value: web3.utils.toWei((buyQuantity * price).toString(), "ether"),
    });
    const currentApple = await deployed.methods.getApple().call();
    setApple(currentApple);
    const myBalance = await getMyBalance(account);
    setMyBalance(myBalance);
  };

  // 사과 판매하기 버튼 함수
  const sell = async () => {
    const { price, sellQuantity } = inputs;
    await deployed.methods.sellApple(price, sellQuantity).send({
      from: CA,
      to: account,
      value: web3.utils.toWei((sellQuantity * price).toString(), "ether"),
    });
    const currentApple = await deployed.methods.getApple().call();
    setApple(currentApple);
    const myBalance = await getMyBalance(account);
    setMyBalance(myBalance);
  };

  // 생명 주기 마운트
  useEffect(() => {
    // 즉시 실행 함수 async
    (async () => {
      if (!web3) return;
      // 네트워크 아이디
      const networkId = await web3.eth.net.getId();
      // 컨트랙트 조회 인스턴스 객체
      const instance = await new web3.eth.Contract(
        AppleShopContract.abi,
        // CA 값
        AppleShopContract.networks[networkId].address
      );

      // 인스턴스 객체 사과 갯수 가져오는 함수 호출
      const currentApple = await instance.methods.getApple().call();
      setApple(currentApple);
      setDeployed(instance);
      setCA(AppleShopContract.networks[networkId].address);
      const myBalance = await getMyBalance(account);
      setMyBalance(myBalance);
    })();
  }, [web3]);

  return (
    <div className="bg-white/60 p-5 rounded-xl w-full h-full shadow-2xl shadow-blue-500/80 flex flex-wrap">
      <div className="w-44 h-44 relative inline-block ">
        <img
          src={qute}
          className="w-44 h-44 absolute -top-10 -left-10 rounded-xl"
        ></img>
      </div>
      <div className="space-y-3">
        <h1 className="text-4xl font-bold -mx-5">사과</h1>
        <div className="flex items-center">
          <h1 className="text-xl font-bold -mx-5">보유사과</h1>
          <h1 className="text-2xl font-bold mx-8 text-red-500">{apple}</h1>
        </div>
        <div className="flex  items-center">
          <h1 className="text-xl font-bold -mx-5">잔액</h1>
          <h1 className="text-2xl font-bold mx-8 ">{myBalance}</h1>
        </div>
      </div>
      <div className="space-y-2 w-full -mt-5">
        <h1 className="text-xl font-bold">사과 사기</h1>
        <div className="flex items-center">
          <h1 className="text-xl font-bold">가격 :</h1>
          <input
            type="number"
            className="bg-transparent w-16 text-xl font-bold ml-3"
            max={99}
            onChange={handleInputs}
            value={inputs.price}
            name="price"
          />
          <h1 className="text-xl font-bold">갯수 :</h1>
          <input
            type="number"
            className="bg-transparent w-16 text-xl font-bold ml-3"
            max={99}
            onChange={handleInputs}
            value={inputs.buyQuantity}
            name="buyQuantity"
          />
        </div>
        <button
          className="border-green-700 w-full border-4 p-2 py-1 rounded-lg transition-all font-bold hover:bg-green-700 hover:text-white"
          onClick={buy}
        >
          팔기
        </button>
      </div>

      <div className="space-y-2 w-full mt-5">
        <h1 className="text-xl font-bold">사과 팔기</h1>
        <div className="flex items-center">
          <h1 className="text-xl font-bold">가격 :</h1>
          <input
            type="number"
            className="bg-transparent w-16 text-xl font-bold ml-3"
            max={99}
            onChange={handleInputs}
            value={inputs.price}
            name="price"
          />
          <h1 className="text-xl font-bold">갯수 :</h1>
          <input
            type="number"
            className="bg-transparent w-16 text-xl font-bold ml-3"
            max={99}
            onChange={handleInputs}
            value={inputs.sellQuantity}
            name="sellQuantity"
          />
        </div>
        <button
          className="border-green-700 w-full border-4 p-2 py-1 rounded-lg transition-all font-bold hover:bg-green-700 hover:text-white"
          onClick={buy}
        >
          팔기
        </button>
      </div>

      <button onClick={sell}>사과 전체 판매하기</button>
    </div>
  );
};

export default AppleShop;
