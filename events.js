// 이벤트 구조
const eventData = {
  logIndex: 0,
  transactionIndex: 0,
  transactionHash:
    "0x64d4373dcc753af280c9549016773aed04547846a072f8f8ddcc3582948846d7",
  blockHash:
    "0x568856e3da68d0c817d9d318e31e27545377af5204c9a9ff8aa73d9dff4a1e6e",
  blockNumber: 19,
  address: "0xA435F6056A58483247c86CB003a98883C38d01f7",
  type: "mined",
  id: "log_8de1c517",
  returnValues: {
    0: "123123",
    1: "123123",
    b: "123123",
    c: "123123",
  },
  event: "Event",
  signature:
    "0xac226a886beee08bc5b48547d34b08a8fecbacbed6a7ec64af2820a137d6f8b4",
  raw: {
    data: "0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000063132333132330000000000000000000000000000000000000000000000000000",
    topics: [
      "0xac226a886beee08bc5b48547d34b08a8fecbacbed6a7ec64af2820a137d6f8b4",
      "0x000000000000000000000000000000000000000000000000000000000001e0f3",
    ],
  },
};
// console.log(Object.keys(eventData));

const transaction = {
  hash: "0xa47f80e322c84c34ff96c3eccb346a02988d86c4e619b9adecf89d3dc6173fef",
  nonce: 22,
  blockHash:
    "0xefe46b66f573766ac0b4f5aab205771e03e9dde109ebf7ce2fc34c7f44a75927",
  blockNumber: 23,
  transactionIndex: 0,
  from: "0x879F90de3f5E39567be8C090a33219d30d5EC33e",
  to: "0xA435F6056A58483247c86CB003a98883C38d01f7",
  value: "0",
  gas: 90000,
  gasPrice: "20000000000",
  input:
    "0xc5d1c9950000000000000000000000000000000000000000000000000000000000002b67000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000053131313131000000000000000000000000000000000000000000000000000000",
  v: "0x26",
  r: "0x72b732c9fa21ef17388f616db0b71add613612c7c7eecd9bdd815bdd080c4705",
  s: "0x6a06a6d12a0cf5728052447c76943bdb77b02a0ecc4fe080375e7f4527e37f71",
};
// console.log(Object.keys(transaction));
