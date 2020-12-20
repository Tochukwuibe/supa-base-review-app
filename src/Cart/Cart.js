import React, { useEffect, useContext, useState } from 'react'
import { SuperBaseContext } from '../superbaseContext';
import ListItem from '../ListItem/ListItem'
import { useRef } from 'react';


export default function Cart({ user }) {

    const [fruits, setFruits] = useState([]);
    const superbase = useContext(SuperBaseContext);
    const ref = useRef(superbase.from('cart'));

    console.log("The fruits ", fruits);
    useEffect(() => {


        ref.current.select("*, fruit: listings(*)")
            .filter('userId', 'eq', user.id)
            .then(({ data }) => setFruits(data))
            .catch((err) => console.log("The then error ", err));

    }, []);

    const onRemoveFromCart = async (id) => {
        try {
            await superbase
                .from('cart')
                .delete()
                .match({ itemId: id, userId: user.id })

            setFruits(fruits.filter(({ fruit }) => fruit.id !== id));

        } catch (e) {

        }
    }

    return (
        <div>
            {fruits.map(({
                fruit: {
                    id,
                    name,
                    image
                }
            }) => (
                <ListItem
                    key={id}
                    img={image}
                    title={name}
                    onRemoveClick={() => onRemoveFromCart(id)}
                />
            ))

            }
        </div>
    )
}
