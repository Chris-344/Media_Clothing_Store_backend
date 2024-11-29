import { CartItem } from "../models/cartItem.model";

const updateCart = async (cartId, productId) => {
    const cart = await CartItem.findById(cartId);
    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
    
    if (productIndex === -1) {
    cart.products.push({ product: productId, quantity: 1 });
    } else {
    cart.products[productIndex].quantity++;
    }
    
    return cart.save();
    };