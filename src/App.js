import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import "./App.css";
import store, { persistor } from "./Store";
import CommentList from "./Components/CommentList";
import Info from "./Components/Info";

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <div className="App">
                    <Info />
                    <main className="container">
                        <CommentList />
                    </main>
                </div>
            </PersistGate>
        </Provider>
    );
}

export default App;
