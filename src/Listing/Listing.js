import React, { useContext, useEffect, useState } from 'react'
import ListItem from '../ListItem/ListItem'
import { SuperBaseContext } from '../superbaseContext'

export default function Listing({
    user
}) {

    const superbase = useContext(SuperBaseContext);
    const [fruits, setFruits] = useState([]);

    useEffect(() => {
        const ref = superbase.from('listings')
        ref.then(({ data }) => setFruits(data));
        return ref.on("*", ({ new: _new }) => {
            setFruits(fruits.map((fruit) => fruit.id === _new.id ? _new : fruit));
        }).subscribe()
    }, [])

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
