import logo from './logo.svg';
import './App.css';
import { getDatabase, ref, set, push, onValue, remove, update } from "firebase/database";
import { useEffect, useState } from 'react';

function App() {
  const db = getDatabase();
  let [number, setNumber] = useState("")
  let [numberArr, setNumberArr] = useState([])
  let [saveTotal, setSaveTotal] = useState("")
  let [haveValue, setHaveValue] = useState(true)

  let handleSubmit = () => {
    if (!haveValue) {
      set(push(ref(db, 'calculatorapp/')), {
        prevalue: 0,
        value: number,
        operator: "Add",
      }).then(() => {
        console.log(" 0 data send")
      })
    } else {
      set(push(ref(db, 'calculatorapp/')), {
        prevalue: saveTotal,
        value: number,
        operator: "Add",
      }).then(() => {
        console.log(" 1 data send")
      })
    }
  }

  useEffect(() => {
    const calRef = ref(db, 'calculatorapp/');
    onValue(calRef, (snapshot) => {
      if (!snapshot.exists()) {
        setHaveValue(false)
        console.log("value nai")
      } else {
        setHaveValue(true)
      }

    })
  }, [])


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
  }, [])


  useEffect(() => {
    numberArr.map((item) => (
      setSaveTotal(item.value * 1 + item.prevalue * 1)
    ))
    console.log(saveTotal)
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
            <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded block">Button</button>
          </div>

          <div className='text-center mt-[20px] mb-[50px]'>
            <h3 className='font-semibold text-4xl'>
              {saveTotal}
            </h3>
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
            <ol className='list-decimal'>
              {numberArr.map((item, index) => (
                <li key={index}>We {item.operator} {item.value} with {item.prevalue} and result is {item.value * 1 + item.prevalue * 1}.
                  <button onClick={() => handleDelete(item.id)} className="bg-blue-300 hover:bg-blue-500 text-white text-xs font-normal py-1 px-1 border border-blue-500 rounded ml-[5px]">Delete</button>
                  <button className="bg-blue-300 hover:bg-blue-500 text-white text-xs font-normal py-1 px-1 border border-blue-500 rounded ml-[5px]">Edit</button></li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
