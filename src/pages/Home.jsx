import { useState } from "react";
import "./home.css"
function Home() {
  const [count, setCount] = useState(0);
  const increase = () => {
    if (count < 100) {
      setCount(count + 1);
    }
  };

  const decrease = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <>
      <div className="home-container">
        <h1 className="home-title">Home Page</h1>
        <p className="home-text">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim minima
          quibusdam, unde molestiae maiores reiciendis impedit eos rem natus
          porro asperiores, sunt dignissimos sint expedita, ipsam quos
          doloremque amet aut.
        </p>
      </div>
      <div>
        <button onClick={increase}>increment</button>
        <p>{count}</p>
        <button onClick={decrease}>decrement</button>
      </div>
    </>
  );
}
export default Home;
