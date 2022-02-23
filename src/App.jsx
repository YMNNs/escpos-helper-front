import Nav from './components/Nav/Nav'
import {
  useRoutes
} from 'react-router-dom'
import routesTable from './router'

import React from 'react'

export default (props) => {
  const routerView = useRoutes(routesTable)
  return (
    <>
      <Nav/>
      {routerView}
    </>
  )
}
