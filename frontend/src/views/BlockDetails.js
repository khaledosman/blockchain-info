import React, {memo} from 'react'
import {useParams} from 'react-router-dom'
import {useQuery, gql} from '@apollo/client'

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
  console.log(data)

  if (loading) return <h3>Loading..</h3>;
  if (error) return `Error! ${error}`;

  const details = data.getBlockDetails
  return (
    <div>
      <div>Block Details {blockHash}</div>
      <div>Size: {details.size}</div>
      <div>BlockIndex: {details.block_index}</div>
      <div>PrevBlock: {details.prev_block}</div>
      <div>Hash: {details.hash}</div>
      <div>Transactions: {details.tx.map(transaction => (
        <div key={transaction.hash}>
          <div>fee:{transaction.fee}</div>
          <div>balance:{transaction.balance}</div>
          <div>size:{transaction.size}</div>
        </div>
      ))}</div>
    </div>
  )
})
