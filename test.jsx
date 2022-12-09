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
};

// redux toolkit 적용

import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => state.counter.value;

export default counterSlice.reducer;
