import React from 'react'
import ConditionsTable from './components/ConditionsTable'
import { GetTitle } from '../../helpers/getTitle'
export default function Conditions() {
  return (
    <div>
        <GetTitle title="Conditions" />
      <ConditionsTable />
    </div>
  )
}
