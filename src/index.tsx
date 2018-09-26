import React from 'react'
import { render } from 'react-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import 'reflect-metadata'

import { createConnection } from 'typeorm'
// import sqlite3 from 'sqlite3'


import { App } from './components'
import configureStore from './store/configureStore'
import { Story } from './Entities/Story'

const { store, persistor } = configureStore()

let root = document.createElement('div')
root.id = 'root'
document.body.appendChild( root )

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)


// const testSqlite = () => {
//     console.log('test')
//     sqlite3.verbose()
//     var db = new sqlite3.Database(':memory:');
//     db.serialize(function() {
//         db.run("CREATE TABLE lorem (info TEXT)");
//         var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//         for (var i = 0; i < 10; i++) {
//             stmt.run("Ipsum " + i);
//         }
//         stmt.finalize();
//         var rows: any = [];
//         db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
//             rows.push("" + row.id + ": " + row.info);
//         });
//         console.log('rows', rows)
//     });
//     db.close();
// }
// testSqlite()
