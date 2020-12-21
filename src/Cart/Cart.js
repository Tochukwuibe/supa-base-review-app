import React, { useEffect, useState } from 'react'
import ListItem from '../ListItem/ListItem'
import { superbase } from '../superbaseContext';


export default function Cart({ user }) {

    const [fruits, setFruits] = useState([]);
    const [deletedFruit, setDeletedFruit] = useState(null);


    useEffect(() => {
        const ref = superbase.from('cart')

        ref.select("*, fruit: listings(*)")
            .filter('userId', 'eq', user.id)
            .then(({ data }) => setFruits(data))
            .catch((err) => console.log("The then error ", err));

        return ref
            .on("DELETE", (data) => {
                console.log("the deleted data ", data);
                setDeletedFruit(data.old)
            }).subscribe()

    }, []);


    useEffect(() => {
        if (deletedFruit) {
            setFruits(fruits.filter(({ id }) => id !== deletedFruit.id))
        }
    }, [deletedFruit])

    const onRemoveFromCart = async (id) => {
        try {
            await superbase
                .from('cart')
                .delete()
                .match({ itemId: id, userId: user.id })

        } catch (e) {

        }
    }

    return (
        <div>
            {fruits.map(({
                id,
                fruit: {
                    id: fruitId,
                    name,
                    image
                }
            }) => (
                <ListItem
                    key={id}
                    img={image}
                    title={name}
                    onRemoveClick={() => onRemoveFromCart(fruitId)}
                />
            ))

            }
        </div>
    )
}
