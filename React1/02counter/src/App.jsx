import { useState } from 'react'
import './App.css'
function App() {
  //  let count=5;
  // function setCount(newCount) {
  //   count = newCount;
  //   console.log("Count updated to:", count);
  // }

  // the above code will not work because react does not track changes to normal variables and hence will not re-render the component when the variable changes.

  // To make React track the changes, we use useState hook
  const [count, setCount] = useState(0);

  // setting limits on count
  function increment() {
    if (count < 10) {
      setCount(count + 1);
    }
  }

  function decrement() {
    if (count > 0) {
      setCount(count - 1);
    }
  }

  // return (
  //   <>
  //     <h1>My counter</h1>
  //     <p>Count is: {count}</p>
  //    { /* <button onClick={() => setCount(count + 1)}>Increment</button>
  //     <button onClick={() => setCount(count - 1)}>Decrement</button> */ }
  //     <button onClick={increment}>Increment</button>
  //     <button onClick={decrement}>Decrement</button>
  //   </>
  // )
  return (
    <div className="container">
      <h1>My Counter</h1>
      <p>Count is: {count}</p>
      <div className="btn-group">
        <button onClick={decrement} className="btn dec">Decrement</button>
        <button onClick={increment} className="btn inc">Increment</button>
      </div>
    </div>
  );
}

export default App
