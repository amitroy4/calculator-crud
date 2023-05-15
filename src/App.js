import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <section className='container mx-auto bg-slate-300 mt-[50px]'>
      <div className='flex justify-between border-4 border-black'>
        <div className='w-[850px] bg-blue-400 border-4 border-green-800 p-5'>

          <div className='flex justify-between'>
            <div>
              <h4>Addition</h4>
              <input />
            </div>
            <div>
              <h4>Substruction</h4>
              <input />
            </div>
          </div>

          <div className='flex justify-center mt-[60px]'>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded block">Button</button>
          </div>

          <div className='text-center mt-[20px] mb-[60px]'>
            <h3 className=''>1000</h3>
            <h4 className=''>Error mSG</h4>
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
        <div className='w-[600px] bg-red-400 border-4 border-red-800 p-5'>drgdgdg</div>
      </div>
    </section>
  );
}

export default App;
