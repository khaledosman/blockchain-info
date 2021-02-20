import React, {memo} from 'react'
import { Link } from "react-router-dom"
import './Block.css'

export default memo(function Block(props) {
  const { block } = props
  return (
    
      <Link to={`/details/${block.hash}`} key={block.hash} className="block-link">
          <article className="block">
            <div>hash: {block.hash}</div>
            <div>height: {block.height}</div>
            <div>time: {block.time}</div>
          </article>
        </Link>
    
  )
})
