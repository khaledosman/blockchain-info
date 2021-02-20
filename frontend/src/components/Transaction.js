import React, {memo} from 'react'
import './Transaction.css'

export default memo(function Transaction(props) {
  const { transaction } = props
  return (
    <div className="transaction">
      <div><strong>fee:</strong>{transaction.fee}</div>
      <div><strong>balance:</strong>{transaction.balance}</div>
      <div><strong>size:</strong>{transaction.size}</div>
    </div>
  )
})
