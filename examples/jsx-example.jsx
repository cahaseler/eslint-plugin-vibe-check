import React from 'react';

// Component with JSX and changelog comments
function ExampleComponent() {
  const [count, setCount] = React.useState(0);
  
  
  const increment = () => {
    setCount(count + 1);
  };
  
  return (
    <div className="container">
      
      <h1>Counter Example</h1>
      
      <p>Current count: {count}</p>
      
      
      <button onClick={increment}>Increment</button>
      
      {count > 5 && (
        <div>
          
          <p>Count is getting high!</p>
        </div>
      )}
    </div>
  );
}

export default ExampleComponent;