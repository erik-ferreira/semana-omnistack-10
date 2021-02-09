import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import UpdateDev from './pages/UpdateDev'
import Main from './pages/Main'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/update" component={UpdateDev} />
      </Switch>
    </BrowserRouter>
  )
}