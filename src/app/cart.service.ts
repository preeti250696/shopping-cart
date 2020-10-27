import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private data = [
    {
      category: 'Actuators',
      expanded: true,
      products: [
        { id: 0, name: '1-Channel 5V-Relay Module-10A', price: '8', amount: 0, image:'./assets/Actuators/1-Channel 5V-Relay Module-10A.jpg' },
        { id: 1, name: '2 Channel 5V-Relay Module-10A', price: '5', amout: 0, image:'./assets/Actuators/2 Channel 5V-Relay Module-10A.png' },
        { id: 2, name: '4 Channel 5V-Relay Module-10A', price: '9', amount: 0, image:'./assets/Actuators/4 Channel 5V-Relay Module-10A.jpg' },
        { id: 3, name: '8 Channel 5v-Relay Module-10A', price: '7', amount: 0, image:'./assets/Actuators/8 Channel 5v-Relay Module-10A.jpg' }
      ]
    },
    {
      category: 'Wifi Development Boards',
      products: [
        { id: 4, name: 'ESP-WROOM-32 WiFi _ Bluetooth Module', price: '8', amount: 0 , image:'./assets/Development Boards/WiFi Boards/ESP-WROOM-32 WiFi _ Bluetooth Module.jpg' },
        { id: 5, name: 'NodeMCU ESP8266 WiFi Board', price:'6', amount: 0 , image:'./assets/Development Boards/WiFi Boards/NodeMCU ESP8266 WiFi Board.jpg' },
        { id: 5, name: 'Raspberry Pi 3B', price:'6', amount: 0 , image:'./assets/Development Boards/WiFi Boards/Raspberry Pi 3B.jpg' }
      ]
    },
    {
      category: 'Non-WiFi Development Boards',
      products: [
        { id: 6, name: 'Arduino Mega 2560 R3 Board', price: '8', amount: 0 , image:'./assets/Development Boards/Non-WiFi Boards/Arduino Mega 2560 R3 Board.jpg' },
        { id: 7, name: 'Arduino Nano V3.0', price: '5', amount: 0 , image:'./assets/Development Boards/Non-WiFi Boards/Arduino Nano V3.0.jpg' },
        { id: 8, name: 'Arduino Uno R3 ATMega328 SMD', price: '9', amount: 0 , image:'./assets/Development Boards/Non-WiFi Boards/Arduino Uno R3 ATMega328 SMD.jpg' }
      ]
    }
  ];

  private cart = [];
  private cartItemCount = new BehaviorSubject(0);
  constructor() { }

  getProducts(){
    return this.data;
  }

  getCart(){
     return this.cart;
  }

  getCartItemCount(){
    return this.cartItemCount;
  }

  addProduct(product){
    let added = false;
    for(let p of this.cart){
      if(p.id === product.id){
        p.amount +=1;
        added = true;
        break;
      }
    }
    if(!added){
      product.amount = 1;
      this.cart.push(product);
    }
   this.cartItemCount.next(this.cartItemCount.value + 1);
  }
  decreaseProduct(product){
    for (let p of this.cart) {
      if (p.id === product.id) {
        let index = this.cart.findIndex(p => p.id === product.id)
        p.amount -= 1;
        if (p.amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }
  removeProduct(product){
    for (let p of this.cart) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        let index = this.cart.findIndex(p => p.id === product.id)
          this.cart.splice(index, 1);
        
      }
    }
  }
}
