import React, {memo} from 'react'
import {useParams} from 'react-router-dom'
import {useQuery, gql} from '@apollo/client'
import Transaction from '../components/Transaction'
import './BlockDetails.css'

const getBlockDetailsQuery = gql`
query getBlockDetails($blockHash: String!) {
  getBlockDetails(blockHash: $blockHash) {
    size
    block_index
    prev_block
    hash
    tx {
      size
      fee
      balance
      hash
    }
  }
}
`
export default memo(function BlockDetails() {
  const {blockHash} = useParams()
  const { data, loading, error } = useQuery(getBlockDetailsQuery, {
    variables: {
      blockHash
    }
  })

  if (loading) return <h3>Loading..</h3>;
  if (error) return `Error! ${error}`;

  const details = data.getBlockDetails
  return (
    <div className="block-details">
      <div>Block Details {blockHash}</div>
      <div>Size: {details.size}</div>
      <div>BlockIndex: {details.block_index}</div>
      <div>PrevBlock: {details.prev_block}</div>
      <div>Hash: {details.hash}</div>
      <h3>Transactions: </h3> 
      <ul>
        {details.tx.map(transaction => <Transaction key={transaction.hash} transaction={transaction} />)}
      </ul>
    </div>
  )
})
