
import './App.css';
import { getDatabase, ref, set, push, onValue, remove, update } from "firebase/database";
import { useEffect, useState } from 'react';

function App() {
  const db = getDatabase();
  let [add, setAdd] = useState("")
  let [sub, setSub] = useState("")
  let [multi, setMulti] = useState("")
  let [div, setDiv] = useState("")
  let [error, setError] = useState("")
  let [uError, setUError] = useState("")
  let [numberArr, setNumberArr] = useState([])
  let [saveTotal, setSaveTotal] = useState("")
  let [haveValue, setHaveValue] = useState(true)
  let [edit, setEdit] = useState(true)
  let [editId, setEditId] = useState("")
  let [operatorId, setOperatortId] = useState("")
  let [u1, setU1] = useState("")
  let [u2, setU2] = useState("")

  let handleSubmit = () => {
    if (add == "" && sub == "" && multi == "" && div == "") {
      setError("No input")
    } else if (add != "" && sub == "" && multi == "" && div == "") {
      if ((add * 1 - 10) || add == 10) {
        if (add > -1) {
          if (!haveValue) {
            set(push(ref(db, 'calculatorapp/')), {
              prevalue: 0,
              value: add * 1,
              operator: "Add",
              total: 0 * 1 + add * 1,
            }).then(() => {
              console.log(" 0 data send")
            })
            setError("")
          } else {
            set(push(ref(db, 'calculatorapp/')), {
              prevalue: saveTotal,
              value: add * 1,
              operator: "Add",
              total: saveTotal + add * 1,
            }).then(() => {
              console.log(" 1 data send")
            })
            setError("")
          }
        } else {
          setError("Not a positive number")
        }

      } else {
        setError("Not a number")
      }
      setAdd("")
    } else if (add == "" && sub != "" && multi == "" && div == "") {
      if (sub * 1 - 10 || sub == 10) {
        if (sub > -1) {
          if (!haveValue) {
            set(push(ref(db, 'calculatorapp/')), {
              prevalue: 0,
              value: sub * 1,
              operator: "Substraction",
              total: saveTotal - sub,
            }).then(() => {
              console.log(" Sub data send")
            })
            setError("")
          } else {
            set(push(ref(db, 'calculatorapp/')), {
              prevalue: saveTotal,
              value: sub * 1,
              operator: "Substraction",
              total: saveTotal - sub,
            }).then(() => {
              console.log(" Sub data send")
            })
            setError("")
          }
        } else {
          setError("Not a positive number")
        }
      } else {
        setError("Not a number")
      }
      setSub("")
    }
    else if (add == "" && sub == "" && multi != "" && div == "") {
      if (multi * 1 - 10 || multi == 10) {
        if (multi == 0) {
          setError("Cannot Multiply by 0")
        }else{
          if (!haveValue) {
            set(push(ref(db, 'calculatorapp/')), {
              prevalue: 0,
              value: multi * 1,
              operator: "Multiply",
              total: multi * 1 * saveTotal * 1,
            }).then(() => {
              console.log(" Multiply data send")
            })
            setError("")
          } else {
            set(push(ref(db, 'calculatorapp/')), {
              prevalue: saveTotal,
              value: multi * 1,
              operator: "Multiply",
              total: multi * 1 * saveTotal * 1,
            }).then(() => {
              console.log(" Multiply data send")
            })
            setError("")
          }
        }
      } else {
        setError("Not a number")
      }
      setMulti("")
    } else if (add == "" && sub == "" && multi == "" && div != "") {

      if (div * 1 - 10 || div == 10) {
        if (div == 0) {
          setError("Cannot divide with 0")
        } else{
           if (div != 0 ){
            set(push(ref(db, 'calculatorapp/')), {
              prevalue: saveTotal,
              value: div * 1,
              operator: "Divide",
              total: saveTotal / div,
            }).then(() => {
              console.log(" Div data send")
            })
            setError("")
          }
        }
      } else {
        setError("Not a number")
      }
      setDiv("")
    } else {
      setError("More than one input")
      setAdd("")
      setSub("")
      setMulti("")
      setDiv("")
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
      setSaveTotal(item.total)
    ))
    console.log(saveTotal)
  })




  let handleDelete = (id) => {
    remove(ref(db, 'calculatorapp/' + id)).then(() => {
      console.log("delete hoise")
    })
  }

  let handleEdit = (item) => {
    setEdit(false)
    setEditId(item.id)
    setOperatortId(item.operator)
    setU1(item.value)
    setU2(item.prevalue)

  }


  let handleUpdate = () => {
    if (u1 != "" && u2 != "") {
      if ((u1 * 1 - 10 || u1 == 10) && (u2 * 1 - 10 || u2 == 10)) {
        if (operatorId == "Add") {
          if(u1>-1 && u2>-1){
            update(ref(db, 'calculatorapp/' + editId), {
              prevalue: u2 * 1,
              value: u1 * 1,
              operator: "Add",
              total: u1 * 1 + u2 * 1,
            }).then(() => {
              setUError("")
              setError("")
              setEdit(true)
            })
          }else{
            setUError("Please Input Positive Number")
          }
          
        } else if (operatorId == "Substraction") {
          if(u1>-1 && u2>-1){
            update(ref(db, 'calculatorapp/' + editId), {
              prevalue: u2 * 1,
              value: u1 * 1,
              operator: "Substraction",
              total: u2 * 1 - u1 * 1,
            }).then(() => {
              setUError("")
              setError("")
              setEdit(true)
            })
          }else{
            setUError("Please Input Positive Number")
          }

        } else if (operatorId == "Multiply") {
          update(ref(db, 'calculatorapp/' + editId), {
            prevalue: u2 * 1,
            value: u1 * 1,
            operator: "Multiply",
            total: u2 * 1 * u1 * 1,
          }).then(() => {
            setUError("")
            setError("")
            setEdit(true)
          })
        } else if (operatorId == "Divide") {
          update(ref(db, 'calculatorapp/' + editId), {
            prevalue: u2 * 1,
            value: u1 * 1,
            operator: "Divide",
            total: u2 * 1 / u1 * 1,
          }).then(() => {
            setUError("")
            setError("")
            setEdit(true)
          })
        } else { }
      } else {
        setUError("Not a number")
      }
    } else {
      setUError("Have a empty input")
    }


  }


  let handleCancel = () => {
    setEdit(true)
    setUError("")
  }


  return (
    <section className='container mx-auto mt-[20px]'>
      <h1 className='font-black text-4xl text-center mb-[20px]'>Smart calculator</h1>
      <div className='flex justify-between'>
        <div className='w-[50%] bg-blue-400 p-5'>

          <div className='flex justify-between'>
            <div>
              <h4>Addition</h4>
              <input onChange={(e) => setAdd(e.target.value)} value={add} />
            </div>
            <div>
              <h4>Substruction</h4>
              <input onChange={(e) => setSub(e.target.value)} value={sub} />
            </div>
          </div>

          <div className='flex justify-center mt-[50px]'>
            <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded block">Button</button>
          </div>

          <div className='text-center mt-[20px] mb-[50px]'>
            {
              !haveValue
                ? <h3 className='font-semibold text-4xl'>0</h3>
                : <h3 className='font-semibold text-4xl'>{saveTotal}</h3>
            }

            <h4 className='font-medium text-2xl text-red-700'>{error}</h4>
          </div>

          <div className='flex justify-between'>
            <div>
              <h4>Multiplicatiion</h4>
              <input onChange={(e) => setMulti(e.target.value)} value={multi} />
            </div>
            <div>
              <h4>Division</h4>
              <input onChange={(e) => setDiv(e.target.value)} value={div} />
            </div>
          </div>

        </div>
        <div className='w-[50%] bg-red-400 p-5'>
          <div className='text-center font-medium text-2xl'>History</div>
          {
            !edit && <>We {operatorId}
              <input onChange={(e) => setU1(e.target.value)} value={u1} className='ml-[5px] mr-[5px]' /> with
              <input onChange={(e) => setU2(e.target.value)} value={u2} className='ml-[5px] mr-[5px]' />
              <button onClick={handleUpdate} className="bg-blue-300 hover:bg-blue-500 text-white text-xs font-normal py-1 px-1 border border-blue-500 rounded ml-[5px]">Update</button>
              <button onClick={handleCancel} className="bg-blue-300 hover:bg-blue-500 text-white text-xs font-normal py-1 px-1 border border-blue-500 rounded ml-[5px]">Cancel</button>
            </>
          }
          <h5>{uError}</h5>
          <div>
            <ol className='list-decimal'>
              {numberArr.map((item, index) => (
                <li key={index}>We {item.operator} {item.value} with {item.prevalue} and result is {item.total}.
                  <button onClick={() => handleDelete(item.id)} className="bg-blue-300 hover:bg-blue-500 text-white text-xs font-normal py-1 px-1 border border-blue-500 rounded ml-[5px]">Delete</button>
                  <button onClick={() => handleEdit(item)} className="bg-blue-300 hover:bg-blue-500 text-white text-xs font-normal py-1 px-1 border border-blue-500 rounded ml-[5px]">Edit</button></li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
