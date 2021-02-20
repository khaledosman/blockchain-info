import React, {memo} from 'react'
import './Transaction.css'

export default memo(function Transaction(props) {
  const { transaction } = props
  return (
    <div className="transaction">
      <div>fee:{transaction.fee}</div>
      <div>balance:{transaction.balance}</div>
      <div>size:{transaction.size}</div>
    </div>
  )
})
