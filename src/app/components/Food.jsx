"use client"

import Image from 'next/image'

import food1 from './images/img1.jpg';
import food2 from './images/img2.jpg';
import food3 from './images/img3.jpg';
import food4 from './images/img4.jpg';
import food5 from './images/img5.jpg';
import food6 from './images/img6.jpeg';
import food7 from './images/img7.jpg';
import food8 from './images/img8.jpg';
import food9 from './images/img9.jpg';
import food10 from './images/img10.jpg';
import food11 from './images/img11.jpg';
import food12 from './images/img12.jpg';

export default function Food() {

    const foodData = [
        { id: 1, image: food1, name: 'Sushi', price: 19.55,
            description: 'Prepared with vinegared rice and a wide range of ingredients including seafood, vegetables, and sometimes fruits.'
        },
        { id: 2, image: food2, name: 'Ramen', price: 7.75,
            description: 'Prepared with wheat noodles in a flavorful broth, ramen is topped with ingredients like chashu pork, nori, and marinated eggs.'
        },
        { id: 3, image: food3, name: 'Tom Yam Goong', price: 6,
            description: 'Tom yam goong is prepared with shrimp along with a load of healthy herbs and spices lemongrass, lime, galangal, red chili peppers.'
        },
        { id: 4, image: food4, name: 'Kebab', price: 2.75,
            description: 'It is cooked with various accompanying ingredients including garlic, black pepper, and vegetable oil.'
        },
        { id: 5, image: food5, name: 'Peking duck', price: 40,
            description: 'The dish is served with cucumbers, spring onion, and sweet bean sauce. The dish is cut in front of the diners and then served in three parts.'
        },
        { id: 6, image: food6, name: 'Paella', price: 25,
            description: 'The original recipe contains white rice with green beans, meat (rabbit or chicken, duck), butterbeans, snails, topped with seasoning such as rosemary.'
        },
        { id: 7, image: food7, name: 'Apfelstrudel', price: 6,
            description: 'The dish consists of an oval strudel pastry cover with mouthwatering apple filling inside. The apple filling is prepared with grated apples, cinnamon, sugar and breadcrumbs.'
        },
        { id: 8, image: food8, name: 'Pad Thai', price: 13,
            description: 'This healthy dish is made with stir-frying noodles with eggs, tofu, peanuts, sauce, lime, vegetables. Thre are extra ingredients such as radishes, bean sprouts and other.'
        },
        { id: 9, image: food9, name: 'Goulash', price: 4,
            description: 'The main elements of the dish are the spices, especially paprika. Goulash is prepared from either beef, pork, veal, or lamb, carrots and potatoes.'
        },
        { id: 10, image: food10, name: 'Lasagna', price: 12,
            description: 'The ingredients itself sound mouthwatering - meats, pasta, vegetables, tomato sauce, meat sauce, cheese mixture, u can add spinach and mushrooms too.'
        },
        { id: 11, image: food11, name: 'Fried chicken', price: 7,
            description: 'The chicken is then seasoned with herbs and spices. The spicier, the better. Excess flour is used to make the crust thicker.'
        },
        { id: 12, image: food12, name: 'Massaman Curry', price: 17,
            description: 'Prepared with cardamom, cinnamon, cloves, star anise, cumin, bay leaves, nutmeg and mace, Massaman curry is a mild, relatively rich curry of Thailand.'
        },
    ]

  return (
    <>
      <div className="py-24 bg-gradient-to-t from-[rgba(60,60,60,0.5)] to-[rgba(57,56,56,0.3)]" id='food'>
        <div className="flex flex-col">
            <h2 className="text-4xl text-orange-600 underline text-center">Our Menu</h2>
            <h2 className="text-2xl text-zinc-500 text-center mt-5">Explore our delicious food menu</h2>
        </div>
        <div className="flex flex-wrap items-center justify-center mx-5 gap-4 mt-10">
            {foodData.map((food) => (
                <div key={food.id} className="p-4 border border-zinc-600 rounded-lg">
                    <Image src={food.image} alt={food.name} className="w-full h-40 object-cover pointer-events-none"/>
                    <div className="relative py-3 h-[160px] max-w-[300px]">
                        <h2 className="text-2xl mb-1 text-orange-600">{food.name}</h2>
                        <p className="text-sm mb-2 text-gray-400">{food.description}</p>
                        <p className="absolute bottom-0 text-[18px] text-orange-600">${food.price}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </>
  )
}
