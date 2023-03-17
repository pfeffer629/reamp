import {useState} from "react";
import Web3 from "web3";
const web3 = new Web3();

export default function Playing() {
  const [addresses, setAddresses] = useState([]);
  const [checksum, setChecksum] = useState([]);

  const convert = () => {
    let convertedAddresses = []
    JSON.parse(addresses).map(tokenAddress => {
      let parsedAddress = tokenAddress.split('/')
      
      convertedAddresses.push(`${parsedAddress[0]}/${web3.utils.toChecksumAddress(parsedAddress[1])}/${parsedAddress[2]}`)
    })
    setChecksum(convertedAddresses)
  };

  return (
    <div>
      <textarea 
        className="block w-[400px] h-[400px]" 
        onChange={(e) => setAddresses(e.target.value)}
      />
      <button
        onClick={convert}
        className="bg-white border-darkLine border-[1px] rounded-lg w-[400px] h-[40px] text-sidebarBg"
      >
        Convert
      </button>
      <div className="color-white block break-normal w-[400px]">{JSON.stringify(checksum, null, 2)}</div>
    </div>
  )
}
