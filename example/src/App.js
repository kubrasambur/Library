import React from 'react'

import { Button } from './components/buttons/button'
import {Table} from "./components/ag-grid/table"
import {Menu1} from "./components/metarial-ui/menu"
import 'deneme/dist/index.css'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {Grid} from "@material-ui/core"


const App = () => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={6}>
        <Button
        onClick={() => {
          console.log('cliked')
        }}
        type='button'
        buttonStyle='btn--primary--outline'
        buttonSize='btn--large'
      >
        Buy now
      </Button>
        </Grid>
        <Grid item xs={6}>
        <Menu1 menu1="users" menu2="employers" menu3="workers"></Menu1>
        </Grid>
      </Grid>
      
       <br /><br />
      <Table field1="id" field2="name" field3="surname"></Table>
      <br /><br />
      
    </div>
  )
}

export default App
