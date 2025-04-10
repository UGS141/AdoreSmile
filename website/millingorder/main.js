// Product data
const productData = {
    milledmetal: [
        { id: 1, title: 'Titanium Custom Abutment', image: 'img/titanium custom abunment.PNG' },
        { id: 2, title: 'Zirconia Custom Abutment', image: 'img/Zirconia-custom-Abutment-1.jpg' },
        { id: 3, title: 'Pre-Milled Abutment', image: 'img/premilled-abutment.jpg' }
    ],
    slmmetal: [
        { id: 4, title: 'Co-Cr Crown & Bridge', image: 'img/co-cr crown.jpg' },
        { id: 5, title: 'Titanium Framework', image: 'img/titanium framework.png' }
    ],
    softmetal: [
        { id: 6, title: 'PMMA Temporary', image: 'img/pmma-temp.jpg' },
        { id: 7, title: 'Zirconia Crown', image: 'img/zirconia-crown.jpg' }
    ],
    printing: [
        { id: 8, title: 'Model Printing', image: 'img/model-printing.jpg' },
        { id: 9, title: 'Surgical Guide', image: 'img/surgical guide.jpg' }
    ],
    additional: [
        { id: 10, title: 'Scan Body', image: 'img/scan-body.jpg' },
        { id: 11, title: 'Analog', image: 'img/analog.jpg' }
    ]
};

// Show content for selected tab
function showContent(event, categoryId) {
    // Update active tab
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.currentTarget.classList.add('active');

    // Show selected content
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => {
        content.classList.remove('active');
        content.style.opacity = '0';
    });

    const selectedContent = document.getElementById(categoryId);
    selectedContent.classList.add('active');
    setTimeout(() => {
        selectedContent.style.opacity = '1';
    }, 50);

    // Populate products
    populateProducts(categoryId);
}

// Populate products in container
function populateProducts(categoryId) {
    const container = document.querySelector(`#${categoryId} .cards-container`);
    const products = productData[categoryId];

    container.innerHTML = products.map(product => `
        <div class="card" onclick="selectProduct('${product.title}', '${product.image}')">
            <img src="${product.image}" alt="${product.title}">
            <div class="card-title">${product.title}</div>
        </div>
    `).join('');
}

// Handle product selection
function selectProduct(title, image) {
    sessionStorage.setItem('selectedTitle', title);
    sessionStorage.setItem('selectedImage', image); 
    window.location.href = 'order.html';
}

// Search functionality
document.getElementById('productSearch').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    Object.keys(productData).forEach(category => {
        const container = document.querySelector(`#${category} .cards-container`);
        const filteredProducts = productData[category].filter(product => 
            product.title.toLowerCase().includes(searchTerm)
        );
        
        container.innerHTML = filteredProducts.map(product => `
            <div class="card" onclick="selectProduct('${product.title}', '${product.image}')">
                <img src="${product.image}" alt="${product.title}">
                <div class="card-title">${product.title}</div>
            </div>
        `).join('');
    });
});

// Initialize first category on page load
document.addEventListener('DOMContentLoaded', () => {
    populateProducts('milledmetal');
});