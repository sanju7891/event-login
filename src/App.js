 import AddEvents from './components/AddEvents';
import Events from './components/Events';

function App() {
  return (
    <div className="container">

      <div className="row">
        <div className="col-8">
           <Events />
        </div>
        <div className="col-4">
          <AddEvents />
        </div>
      </div>
     
    </div>
  );
}

export default App;
