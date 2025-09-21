import React from 'react'
import UsersTable from './components/UsersTable'
import { GetTitle } from '../helpers/getTitle'

export default function Users() {
  return (
    <div className="lg:p-6">
      <GetTitle title="Users" />
      <UsersTable />
    </div>
  )
}
