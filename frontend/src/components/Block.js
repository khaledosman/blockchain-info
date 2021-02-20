import React, {memo} from 'react'
import { Link } from "react-router-dom"
import './Block.css'

export default memo(function Block(props) {
  const { block } = props
  return (
    
      <Link to={`/details/${block.hash}`} key={block.hash} className="block-link">
          <article className="block">
            <div><strong>hash:</strong> {block.hash}</div>
            <div><strong>height:</strong> {block.height}</div>
            <div><strong>time:</strong> {block.time}</div>
          </article>
        </Link>
    
  )
})
