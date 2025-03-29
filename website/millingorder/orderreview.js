// Saved addresses data (example)
const savedAddresses = [
    { id: 1, address: 'Adoresmile Global Shipping (HOIL) - Adoresmile.global@HOIL.CO' },
    { id: 2, address: '123 Dental Street, London, UK' },
    { id: 3, address: '456 Medical Avenue, Manchester, UK' }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Populate shipping addresses
    const addressSelect = document.getElementById('shippingAddress');
    savedAddresses.forEach(addr => {
        const option = document.createElement('option');
        option.value = addr.id;
        option.textContent = addr.address;
        addressSelect.appendChild(option);
    });

    // Handle new address checkbox
    const saveAddressCheckbox = document.getElementById('saveAddress');
    const newAddressFields = document.getElementById('newAddressFields');
    
    saveAddressCheckbox.addEventListener('change', (e) => {
        newAddressFields.style.display = e.target.checked ? 'block' : 'none';
        if (e.target.checked) {
            addressSelect.disabled = true;
        } else {
            addressSelect.disabled = false;
        }
    });

    // Handle form submission
    const shippingForm = document.getElementById('shippingForm');
    shippingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            shippedBy: document.getElementById('shippedBy').value,
            useNewAddress: saveAddressCheckbox.checked,
            shippingAddress: saveAddressCheckbox.checked ? {
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                postalCode: document.getElementById('postalCode').value,
                country: document.getElementById('country').value
            } : {
                addressId: document.getElementById('shippingAddress').value
            }
        };

        // Save shipping information to session storage
        sessionStorage.setItem('shippingInfo', JSON.stringify(formData));
        
        // Redirect to payment page (create this next)
        window.location.href = 'payment.html';
    });

    // Load saved shipping info if exists
    const savedShippingInfo = sessionStorage.getItem('shippingInfo');
    if (savedShippingInfo) {
        const info = JSON.parse(savedShippingInfo);
        document.getElementById('shippedBy').value = info.shippedBy;
        
        if (info.useNewAddress) {
            saveAddressCheckbox.checked = true;
            newAddressFields.style.display = 'block';
            addressSelect.disabled = true;
            
            document.getElementById('address').value = info.shippingAddress.address;
            document.getElementById('city').value = info.shippingAddress.city;
            document.getElementById('postalCode').value = info.shippingAddress.postalCode;
            document.getElementById('country').value = info.shippingAddress.country;
        } else {
            addressSelect.value = info.shippingAddress.addressId;
        }
    }
});

// Form validation
function validateForm() {
    const shippedBy = document.getElementById('shippedBy').value;
    const saveAddress = document.getElementById('saveAddress').checked;
    const shippingAddress = document.getElementById('shippingAddress').value;

    if (!shippedBy) {
        alert('Please enter who is shipping');
        return false;
    }

    if (!saveAddress && !shippingAddress) {
        alert('Please select a shipping address or enter a new one');
        return false;
    }

    if (saveAddress) {
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const postalCode = document.getElementById('postalCode').value;
        const country = document.getElementById('country').value;

        if (!address || !city || !postalCode || !country) {
            alert('Please fill in all address fields');
            return false;
        }
    }

    return true;
}