import React, {memo} from 'react'
import { gql, useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'

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
    <div>
      {data.getBlocks.map(block => (
        <Link to={`/details/${block.hash}`} key={block.hash}>
          hash: {block.hash}
          height: {block.height}
          time: {block.time}

        </Link>
      ))}
    </div>
  )
})
