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
        generateCategoriesMenu(json); // Generate categories menu

        // Add event listener for "Show All" button
        document.getElementById('show-all').onclick = () => displayData(json);
    } catch (error) {
        console.error(error.message);
    }
}

function displayData(data) {
    const container = document.getElementById('gallery');
    container.innerHTML = ''; // Clear previous content

    data.forEach(item => {
        const workItem = document.createElement('div');
        workItem.className = 'work-item'; // Add a class for styling if needed

        workItem.innerHTML = `
            <h3>${item.title}</h3>
            <img src="${item.imageUrl}" alt="${item.title}">
        `;

        container.appendChild(workItem);
    });
}

function generateCategoriesMenu(data) {
    const categoriesMap = {};

    // Create a map of categories based on the API data
    data.forEach(item => {
        const categoryId = item.categoryId;
        const categoryName = item.category.name;

        if (!categoriesMap[categoryId]) {
            categoriesMap[categoryId] = categoryName;
        }
    });

    const categoriesContainer = document.getElementById('categories-menu');

    // Clear previous categories
    categoriesContainer.innerHTML = '<button id="show-all">Show All</button>'; // Reset with Show All button

    // Create buttons for each category
    Object.entries(categoriesMap).forEach(([categoryId, categoryName]) => {
        const categoryItem = document.createElement('button');
        categoryItem.innerText = categoryName; // Get category name from map
        categoryItem.onclick = () => filterByCategory(parseInt(categoryId), data);
        categoriesContainer.appendChild(categoryItem);
    });

    // Log the categories for debugging
    console.log("Categories:", categoriesMap);
}

function filterByCategory(selectedCategoryId, allData) {
    const filteredData = allData.filter(item => item.categoryId === selectedCategoryId);
    displayData(filteredData); // Display filtered data
}

// Call the getData function to fetch and display the data
getData();

