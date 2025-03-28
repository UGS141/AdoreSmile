
// Sample order data

const cardData = [
    { title: "Custom Abutment", description: "This is the first card.",image: "https://picsum.photos/220/220?random=" },
    { title: "AdoreSmile i-ON Abutment", description: "This is the second card.",image: "https://picsum.photos/220/220?random="  },
    { title: "Screw Retained Abutment", description: "This is the third card.",image:"https://picsum.photos/220/220?random=" },
    { title: "On Piece Locator Abutment", description: "This is the fourth card.",image:"https://picsum.photos/220/220?random=" }
];
const cardsContainer = document.querySelectorAll(".cards-container")
let i = 1;
    cardsContainer.forEach(container => {
        cardData.forEach(card => {
            const cardElement = document.createElement("div");
            cardElement.classList.add("card");
            // cardElement.innerHTML = `<h3>${card.title}</h3><p>${card.description}</p>`;
            let imgurl = card.image + i;
            cardElement.innerHTML = `
            <img src="${imgurl}" alt="${card.title}">
            <div class="card-title" onclick="storeData('${card.title}', '${imgurl}')" style="cursor: pointer;">${card.title}</div>`;
           
            container.appendChild(cardElement);
            i++
            // cardsContainer.appendChild(cardElement);
        });
    });

    function storeData(title, image) {
        console.log('title : ',title)
        console.log('image : ',image)
        sessionStorage.setItem("selectedTitle", title);
        sessionStorage.setItem("selectedImage", image);
         window.location.href = "order.html";
    }

        
        
        function showContent(event, sectionId) {
            // Hide all content sections
            document.querySelectorAll('.content').forEach(content => content.classList.remove('active'));

            // Remove active class from all tabs
            document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));

            // Show selected content and highlight active tab
            document.getElementById(sectionId).classList.add('active');
            event.currentTarget.classList.add('active');
        }

// Navigate to different sections
function navigate(type) {
    // In a real app, this would navigate to different pages
    console.log(`Navigating to ${type} order page`);
}

// Download order details


// Initialize the page



const products = {
    'MILLED METAL': [
        { name: 'Custom Abutment', image: 'custom-abutment.png' },
        { name: 'HOIL iON Abutment', image: 'ion-abutment.png' },
        { name: 'Screw Retained', image: 'screw-retained.png' },
        { name: 'One Piece Locator', image: 'one-piece-locator.png' }
    ],
    'SLM METAL': [
        { name: 'SLM Crown', image: 'slm-crown.png' },
        { name: 'SLM Bridge', image: 'slm-bridge.png' }
    ],
    'SOFT MATERIAL': [
        { name: 'Zirconia Crown', image: 'zirconia-crown.png' },
        { name: 'E-max Crown', image: 'emax-crown.png' }
    ],
    '3D PRINTING': [
        { name: '3D Model', image: '3d-model.png' },
        { name: 'Surgical Guide', image: 'surgical-guide.png' }
    ],
    'ADDITIONAL': [
        { name: 'Additional Service 1', image: 'additional1.png' },
        { name: 'Additional Service 2', image: 'additional2.png' }
    ]
};

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Show initial category
    showProducts('MILLED METAL');

    // Add tab click listeners
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            // Add active class to clicked button
            button.classList.add('active');
            // Show products for selected category
            showProducts(button.dataset.category);
        });
    });

    // Add search functionality
    document.getElementById('productSearch').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filterProducts(searchTerm);
    });
});

function showProducts(category) {
    const productsGrid = document.getElementById('productsGrid');
    if(productsGrid){
        productsGrid.innerHTML = '';

        products[category].forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
            `;
            productCard.addEventListener('click', () => {
                // Navigate to product detail page
                window.location.href = `/product-detail.html?product=${encodeURIComponent(product.name)}`;
            });
            productsGrid.appendChild(productCard);
        });
    }
   
}

function filterProducts(searchTerm) {
    const activeCategory = document.querySelector('.tab-btn.active').dataset.category;
    const filteredProducts = products[activeCategory].filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
    
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
        `;
        productsGrid.appendChild(productCard);
    });
}







