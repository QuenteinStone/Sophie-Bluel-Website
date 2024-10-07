async function getData() {
    const url = "http://localhost:5678/api/works";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);

        // Call the function to display the data
        displayData(json);
    } catch (error) {
        console.error(error.message);
    }
}

function displayData(data) {
    const container = document.getElementById('gallery');
    container.innerHTML = ''; // Clear previous content

    data.forEach(item => {
        // Create a new element for each item
        const workItem = document.createElement('div');
        workItem.className = 'work-item'; // Add a class for styling if needed

        // Assuming each item has a title and imageUrl
        workItem.innerHTML = `
            <h3>${item.title}</h3>
            <img src="${item.imageUrl}" alt="${item.title}" style="width: 100%; height: auto;">
        `;

        // Append the new element to the container
        container.appendChild(workItem);
    });
}

// Call the getData function to fetch and display the data
getData();
