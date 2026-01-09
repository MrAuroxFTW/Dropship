// Cart Management
class ShoppingCart {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('calicoCart')) || [];
    }

    addItem(product) {
        const color = product.color || product.selectedColor || null;
        const existingItem = this.cart.find(item => item.id === product.id && (item.color || null) === color);
        if (existingItem) {
            existingItem.quantity += product.quantity || 1;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                color: color,
                quantity: product.quantity || 1
            });
        }
        this.save();
        this.updateCartBadge();
    }

    removeItem(productId) {
        if (typeof productId === 'object' && productId !== null) {
            const { id, color } = productId;
            this.cart = this.cart.filter(item => !(item.id === id && (item.color || null) === (color || null)));
        } else {
            this.cart = this.cart.filter(item => item.id !== productId);
        }
        this.save();
        this.updateCartBadge();
    }

    updateQuantity(productId, quantity, color) {
        let item;
        if (typeof productId === 'object' && productId !== null) {
            const { id, color: c } = productId;
            item = this.cart.find(it => it.id === id && (it.color || null) === (c || null));
        } else if (color !== undefined) {
            item = this.cart.find(it => it.id === productId && (it.color || null) === (color || null));
        } else {
            item = this.cart.find(it => it.id === productId);
        }

        if (item) {
            item.quantity = Math.max(1, quantity);
            this.save();
            this.updateCartBadge();
        }
    }

    save() {
        localStorage.setItem('calicoCart', JSON.stringify(this.cart));
    }

    getItems() {
        return this.cart;
    }

    getTotal() {
        return this.cart.reduce((sum, item) => {
            const price = parseFloat(item.price.replace('$', '').replace(',', ''));
            return sum + (price * item.quantity);
        }, 0);
    }

    getItemCount() {
        return this.cart.reduce((count, item) => count + item.quantity, 0);
    }

    updateCartBadge() {
        const badges = document.querySelectorAll('.cart-badge');
        const count = this.getItemCount();
        badges.forEach(badge => {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        });
    }

    clear() {
        this.cart = [];
        this.save();
        this.updateCartBadge();
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Search Functionality
const searchProducts = (query) => {
    const products = [
        { id: 1, name: 'Graphic Tee 01', category: 'Apparel', price: '$45.00', colors: ['White','Black','Olive'] },
        { id: 2, name: 'Logo Hoodie', category: 'Apparel', price: '$85.00', colors: ['Black','Grey'] },
        { id: 3, name: 'Knitted Beanie', category: 'Accessories', price: '$30.00', colors: ['Black','Red','Cream'] },
        { id: 4, name: 'Utility Cargo', category: 'Apparel', price: '$95.00', colors: ['Olive','Stone'] },
        { id: 5, name: 'Seoul Ghost Hoodie', category: 'Apparel', price: '$85.00', colors: ['Charcoal','Grey','Ivory'] },
        { id: 6, name: 'District 9 Graphic Tee', category: 'Apparel', price: '$45.00', colors: ['White'] },
        { id: 7, name: 'Cyber Cargo Pants', category: 'Apparel', price: '$110.00', colors: ['Black','Deep Olive'] },
        { id: 8, name: 'Neon Glitch Shirt', category: 'Apparel', price: '$55.00', colors: ['Lime','Black'] },
        { id: 9, name: 'Orbit Chunky Sneaker', category: 'Footwear', price: '$145.00', colors: ['White','Black'] },
        { id: 10, name: 'Dock Worker Beanie', category: 'Accessories', price: '$35.00', colors: ['Navy','Black','Orange'] },
        { id: 11, name: 'Seoul City Bomber', category: 'Apparel', price: '$180.00', colors: ['Olive','Black'] },
        { id: 12, name: 'Industrial Chain', category: 'Accessories', price: '$60.00', colors: ['Silver'] },
        { id: 13, name: 'Neo-Seoul Graphic Hoodie', category: 'Apparel', price: '$95.00', colors: ['Black','Heather Grey'] },
        { id: 14, name: 'Hazy Knit Sweater', category: 'Apparel', price: '$120.00', colors: ['Cream','Olive','Charcoal'] },
        { id: 15, name: 'Utility Vest', category: 'Apparel', price: '$90.00', colors: ['Black','Khaki'] },
        { id: 16, name: 'Asphalt Track Pants', category: 'Apparel', price: '$75.00', colors: ['Asphalt','Black'] },
        { id: 17, name: 'Streetcore Denim', category: 'Apparel', price: '$130.00', colors: ['Indigo','Black'] },
        { id: 18, name: 'Minimal Sling Bag', category: 'Accessories', price: '$65.00', colors: ['Black','Olive'] },
        { id: 19, name: 'Reflective Strap Sandal', category: 'Footwear', price: '$58.00', colors: ['Black','Grey'] }
    ];

    return products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
};

// Search Modal
const initializeSearch = () => {
    const searchButton = document.querySelector('[aria-label="Search"]');
    if (!searchButton) return;

    searchButton.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-20';
        modal.innerHTML = `
            <div class="bg-white dark:bg-[#211111] rounded-lg shadow-2xl w-full max-w-2xl mx-4">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-2xl font-bold uppercase text-black dark:text-white">Search Products</h2>
                        <button class="close-search text-2xl hover:text-primary">&times;</button>
                    </div>
                    <input type="text" id="searchInput" placeholder="Search by product name or category..." class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-medium bg-white dark:bg-[#211111] text-black dark:text-white focus:outline-none focus:border-primary"/>
                    <div id="searchResults" class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const searchInput = modal.querySelector('#searchInput');
        const resultsContainer = modal.querySelector('#searchResults');
        const closeButton = modal.querySelector('.close-search');

        searchInput.focus();

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            if (query.length < 2) {
                resultsContainer.innerHTML = '';
                return;
            }

            const results = searchProducts(query);
            if (results.length === 0) {
                resultsContainer.innerHTML = `
                    <div class="p-4 text-center text-gray-500 dark:text-gray-400">
                        <p class="mb-2 font-semibold">No Results.</p>
                        <a href="Shopall.html" class="text-primary font-bold underline">See all Items</a>
                    </div>
                `;
            } else {
                resultsContainer.innerHTML = results.map(product => `
                    <div class="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary transition-colors cursor-pointer bg-white dark:bg-[#211111] text-black dark:text-white" onclick="window.location.href='Product_Listing.html'">
                        <h3 class="font-bold text-sm">${product.name}</h3>
                        <p class="text-xs text-gray-500 dark:text-gray-400">${product.category}</p>
                        <p class="text-primary font-bold text-sm mt-1">${product.price}</p>
                    </div>
                `).join('');
            }
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = e.target.value.trim();
                if (query.length < 2) {
                    resultsContainer.innerHTML = '';
                    return;
                }

                const results = searchProducts(query);
                if (results.length === 0) {
                    resultsContainer.innerHTML = `
                        <div class="p-4 text-center text-gray-500 dark:text-gray-400">
                            <p class="mb-2 font-semibold">No Results.</p>
                            <a href="Shopall.html" class="text-primary font-bold underline">See all Items</a>
                        </div>
                    `;
                } else {
                    resultsContainer.innerHTML = results.map(product => `
                        <div class="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary transition-colors cursor-pointer bg-white dark:bg-[#211111] text-black dark:text-white" onclick="window.location.href='Product_Listing.html'">
                            <h3 class="font-bold text-sm">${product.name}</h3>
                            <p class="text-xs text-gray-500 dark:text-gray-400">${product.category}</p>
                            <p class="text-primary font-bold text-sm mt-1">${product.price}</p>
                        </div>
                    `).join('');
                }
            }
        });

        closeButton.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    });
};

// Update cart badge on page load
document.addEventListener('DOMContentLoaded', () => {
    cart.updateCartBadge();
    initializeSearch();
});
