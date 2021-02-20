import React, {memo} from 'react'
import { gql, useQuery } from '@apollo/client'
import Block from '../components/Block'
import './Home.css'

const GET_BLOCKS_QUERY = gql`
query getBlocks {
  getBlocks {
    height 
    hash
    time
    main_chain
  }
}
`
export default memo(function Home() {
  const {loading, error, data } = useQuery(GET_BLOCKS_QUERY)
  
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div className="home">
      {data.getBlocks.map(block => <Block block={block} key={block.hash} />)}
    </div>
  )
})
