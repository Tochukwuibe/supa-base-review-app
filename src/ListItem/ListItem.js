import React from 'react'

export default function ListItem({
    img,
    title
}) {
    return (
        <div className="ListItem">
            <img src={img} />
            <h4>{title}</h4>
        </div>
    )
}
