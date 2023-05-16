import logo from './logo.svg';
import './App.css';
import { getDatabase, ref, set, push, onValue, remove, update } from "firebase/database";
import { useEffect, useState } from 'react';

function App() {
  const db = getDatabase();
  let [number, setNumber] = useState("")
  let [numberArr, setNumberArr] = useState([])

  let handleSubmit = () => {
    set(push(ref(db, 'calculatorapp/')), {
      prevalue: "0",
      value: number,
      operator: "Add",
      total: 0 + number * 1,
    }).then(() => {
      console.log("data send")
    })
  }

  useEffect(() => {
    const calRef = ref(db, 'calculatorapp/');
    onValue(calRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        arr.push({
          ...item.val(),
          id: item.key,
        })
      })
      setNumberArr(arr)
    })
  })


  let handleDelete = (id) => {
    remove(ref(db, 'calculatorapp/' + id)).then(() => {
      console.log("delete hoise")
    })
  }

  return (
    <section className='container mx-auto mt-[20px]'>
      <h1 className='font-black text-4xl text-center mb-[20px]'>Smart calculator</h1>
      <div className='flex justify-between'>
        <div className='w-[850px] bg-blue-400 p-5'>

          <div className='flex justify-between'>
            <div>
              <h4>Addition</h4>
              <input onChange={(e) => setNumber(e.target.value)} />
            </div>
            <div>
              <h4>Substruction</h4>
              <input />
            </div>
          </div>

          <div className='flex justify-center mt-[50px]'>
            <button onClick={handleSubmit} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded block">Button</button>
          </div>

          <div className='text-center mt-[20px] mb-[50px]'>
            <h3 className='font-semibold text-4xl'>1000</h3>
            <h4 className='font-medium text-2xl text-red-700'>Error mSG</h4>
          </div>

          <div className='flex justify-between'>
            <div>
              <h4>Multiplicatiion</h4>
              <input />
            </div>
            <div>
              <h4>Division</h4>
              <input />
            </div>
          </div>

        </div>
        <div className='w-[600px] bg-red-400 p-5'>
          <div className='text-center font-medium text-2xl'>History</div>
          <div>
            {numberArr.map((item, index) => (
              <li key={index}>We {item.operator} {item.prevalue} with {item.value} and result is {item.total}.
                <button onClick={() => handleDelete(item.id)} class="bg-blue-300 hover:bg-blue-500 text-white text-xs font-normal py-1 px-1 border border-blue-500 rounded ml-[5px]">Delete</button>
                <button class="bg-blue-300 hover:bg-blue-500 text-white text-xs font-normal py-1 px-1 border border-blue-500 rounded ml-[5px]">Edit</button></li>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
