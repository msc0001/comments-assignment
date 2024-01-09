import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './Store';
import CommentList from './Components/CommentList';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <main className='container'>
            <CommentList />
        </main>
      </div>
    </Provider>
  );
}

export default App;
