import React from 'react'
import { withStyles } from 'material-ui/styles'
import { DataSet } from '../../../data/traffic/data'

import {
  LineChart, CartesianGrid, Line, Legend, XAxis, YAxis, Cell, Tooltip, ResponsiveContainer,
} from 'recharts'

const colors = ['#FB497C', '#beaaff', 'lightblue']
const styles = theme => ({
  root: {
    top: '20px',
  },
  hide: {
    display: 'none',
  },
  
  label: {
    zIndex: '9',
  },
  selectors: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  sortOption: {
    float: 'right',
  },
  axis: {
    fontSize: '10px !important',
  },
})

class TrafficLineGraph extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      initData: []
    }
    

  }
  
  componentDidMount () {
    this.setState({initData: DataSet})
  }
  
  render () {
    const {initData} = this.state
    return (
      <div>
        <ResponsiveContainer width="100%" height={400}>
  
        <LineChart data={initData}
                   margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="year" tick={{fontSize: '11px', padding: '12px'}}/>
          <YAxis type="number" domain={['dataMin+10000', 'auto']} tick={{fontSize: '11px', padding: '12px'}}/>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="casualties" stroke="#82ca9d" />
          <Line type="monotone" dataKey="accidents" stroke="#8884d8" />
          <Line type="monotone" dataKey="fatalities" stroke="red" />
        </LineChart>
        </ResponsiveContainer>
      </div>
    )
    
  }
}

export default withStyles(styles)(TrafficLineGraph)
