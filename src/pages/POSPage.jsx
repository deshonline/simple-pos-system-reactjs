import React, { useEffect, useRef, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import MainLayout from '../layouts/MainLayout'
import axios from "axios"
import { ComponentToPrint } from '../components/ComponentsToPrint';
import { useReactToPrint } from 'react-to-print';

function POSPage() {
    const [products, setProducts] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0)
    const fetchProducts = async () => {
        setIsLoading(true);
        const result = await axios.get('products')
        setProducts(await result.data);
        setIsLoading(false);
    }
    const addProductToCart = async (product) => {
        let findProductInCart = await cart.find(i => {
            return i.id === product.id
        });
        if (findProductInCart) {
            let newCart = [];
            let newItem;
            cart.forEach(cartItem => {
                if (cartItem.id == product.id) {
                    newItem = {
                        ...cartItem,
                        quantity: cartItem.quantity + 1,
                        totalAmount: cartItem.price * (cartItem.quantity + 1)
                    }
                    newCart.push(newItem);
                } else {
                    newCart.push(cartItem);
                }
            });
            setCart(newCart);

        } else {
            let addingProduct = {
                ...product,
                'quantity': 1,
                'totalAmount': product.price,
            }
            setCart([...cart, addingProduct]);
        }
    }
    const removeProduct = async (product) => {
        const newCart = cart.filter(cartItem => cartItem.id !== product.id);
        setCart(newCart);
    }
    const componentRef = useRef();
    const handleReactToPrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const handlePrint = () => {
        handleReactToPrint();
    }
    useEffect(() => {
        fetchProducts();
    }, []);
    useEffect(() => {
        let newTotalAmount = 0;
        cart.forEach(icart => {
            newTotalAmount = newTotalAmount + parseInt(icart.totalAmount);
        })
        setTotalAmount(newTotalAmount);
    }, [cart])

    return (
        <MainLayout>
            {/* products */}
            <div className='row'>
                <div className='col-lg-8'>
                    {isloading ? 'Loading' : <div className='row'>
                        {products.map((product, key) =>
                            <div key={key} className='col-lg-4 mb-4'>
                                <div className='card' onClick={() => addProductToCart(product)} >
                                    <Carousel showThumbs={false} autoPlay interval={5000} infiniteLoop>
                                        {product.images && product.images.map(image => <div key={key}>
                                            <img src={image} />
                                        </div>)}
                                    </Carousel>
                                    <div class="container">
                                        <p>{product.name}</p>
                                        <h4>Rs. {product.price}</h4>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>}
                </div>

                {/* Bill Table */}
                <div className='col-lg-4'>
                    <div style={{ display: "none" }}>
                        <ComponentToPrint cart={cart} totalAmount={totalAmount} ref={componentRef} />
                    </div>
                    <div className='table-responsive bg-dark'>
                        <table className='table table-responsive table-dark table-hover'>
                            <thead>
                                <tr>
                                    <td>#</td>
                                    <td>Name</td>
                                    <td>Price</td>
                                    <td>Qty</td>
                                    <td>Total</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {cart ? cart.map((cartProduct, key) => <tr key={key}>
                                    <td>{cartProduct.id}</td>
                                    <td>{cartProduct.name}</td>
                                    <td>{cartProduct.price}</td>
                                    <td>{cartProduct.quantity}</td>
                                    <td>{cartProduct.totalAmount}</td>
                                    <td>
                                        <button className='btn btn-danger btn-sm' onClick={() => removeProduct(cartProduct)} ><i class="fa-solid fa-trash-can"></i></button>
                                    </td>
                                </tr>)
                                    : 'No Item in Cart'}
                            </tbody>
                        </table>
                        <h2 className='px-2 text-white' >Total Amount: Rs. {totalAmount}</h2>
                    </div>
                    <div className='mt-3'>
                        {
                            totalAmount !== 0 ? <div>
                                <button className='btn btn-primary' onClick={handlePrint} >Pay Now</button>
                            </div> : 'Click Products To Add Cart'
                        }
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
export default POSPage