import React from 'react'

export default function ListItem({
    img,
    title,
    onAddClick,
    onRemoveClick
}) {
    return (
        <div className="ListItem">
            <div>
                <img src={img} />
                <h4>{title}</h4>
            </div>

            {onAddClick ? <span className="add" onClick={onAddClick}>+</span> : null}
            {onRemoveClick ? <span className="remove" onClick={onRemoveClick}>-</span> : null}
        </div>
    )
}
