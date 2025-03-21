import axios from 'axios';

export interface Order {
  TransactionID: string;
  Date: string;
  GameName: string;
  Status: string;
  GameID: string;
  Amount: string;
  currency: string;
  id?: string;
}

const API_URL = 'https://6620fae43bf790e070b16bfe.mockapi.io/block-list/orders';

class ApiService {
  async getOrders(): Promise<Order[]> {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  }

  async createOrder(order: Order): Promise<Order | null> {
    try {
      const response = await axios.post(API_URL, order);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      return null;
    }
  }

  async createTestOrders(): Promise<void> {
    const games = [
      "Cyberpunk 2077",
      "Elden Ring",
      "Red Dead Redemption 2",
      "The Witcher 3",
      "God of War",
      "Horizon Zero Dawn",
      "Death Stranding",
      "Final Fantasy VII",
      "Resident Evil 4",
      "Monster Hunter World"
    ];

    const statuses = ["Success", "Failed", "Pending", "Processing"];
    const currencies = ["USD", "EUR", "UAH"];
    
    const generateRandomOrder = (): Order => {
      const game = games[Math.floor(Math.random() * games.length)];
      const gamePrefix = game.split(' ')[0].substring(0, 2).toUpperCase();
      const currency = currencies[Math.floor(Math.random() * currencies.length)];
      const amount = (Math.random() * 200 + 10).toFixed(2); 
      
      return {
        TransactionID: "TX" + Math.floor(Math.random() * 1000000),
        Date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString(),
        GameName: game,
        Status: statuses[Math.floor(Math.random() * statuses.length)],
        GameID: gamePrefix + Math.floor(Math.random() * 100000),
        Amount: amount,
        currency: currency
      };
    };

    // Створюємо більше тестових замовлень і гарантуємо, що є замовлення для кожної валюти
    const testOrders = [
      ...currencies.map(curr => ({
        ...generateRandomOrder(),
        currency: curr
      })),
      ...Array.from({ length: 7 }, generateRandomOrder)
    ];

    for (const order of testOrders) {
      await this.createOrder(order);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
}

export const apiService = new ApiService(); 