import BlockList from '../components/BlockList/BlockList'
import React from 'react'
import InputBlock from '../components/InputBlock/InputBlock'
import Settings from '../components/Settings/Settings'
import History from '../components/History/History'
import ApplyParams from '../components/ApplyParams/ApplyParams'

export default [
  {
    path: '/blocks',
    element: <BlockList/>
  },
  {
    path: '/blocks/:id',
    element: <InputBlock/>
  },
  {
    path: '/settings',
    element: <Settings/>
  },
  {
    path: '/history',
    element: <History/>
  },
  {
    path: '/',
    element: <ApplyParams/>
  }

]
