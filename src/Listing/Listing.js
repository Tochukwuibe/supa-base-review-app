import React, { useEffect, useState } from 'react'
import ListItem from '../ListItem/ListItem'
import { superbase } from '../superbaseContext';

export default function Listing({
    user
}) {

    const [fruits, setFruits] = useState([]);
    const [newFruit, setNewFruit] = useState([]);


    useEffect(() => {
        const ref = superbase.from('listings')
        ref.then(({ data }) => setFruits(data));

        return ref
            .on("INSERT", ({ new: _new }) => {
                setNewFruit(_new);
            })
            .on("UPDATE", ({ new: _new }) => {
                setNewFruit(_new)
            }).subscribe()

    }, [])

    useEffect(() => {

        if (newFruit) {
            const curr = fruits.find((fruit) => fruit.id === newFruit.id);
            let newFruits = [...fruits];
            if (curr) {
                newFruits = newFruits.map((fruit) => fruit.id === newFruit.id ? newFruit : fruit)
            } else {
                newFruits.push(newFruit)
            }
            setFruits(newFruits);
        }

    }, [newFruit])

    const onAddToCart = async (itemId) => {
        try {


            await superbase
                .from('cart')
                .insert([
                    { userId: user.id, itemId }
                ])



        } catch (e) {
            console.log("the error ", e)
        }

    }


    return (
        <>
            <div>
                {fruits.map(({
                    id,
                    name,
                    image
                }) => (
                    <ListItem
                        key={id}
                        img={image}
                        title={name}
                        onAddClick={() => onAddToCart(id)}
                    />
                ))

                }
            </div>
        </>
    )
}
