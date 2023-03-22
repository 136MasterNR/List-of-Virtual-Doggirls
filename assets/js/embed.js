// Get the URL string parameters
const urlParams = new URLSearchParams(window.location.search);

// Check if the "dog" parameter is present
if (urlParams.has('dog')) {
  const dog = urlParams.get('dog');

  // Set the Open Graph tags based on the "dog" parameter
  document.querySelector('meta[property="og:description"]').setAttribute('content', `Description for ${dog}`);
  document.querySelector('meta[property="og:image"]').setAttribute('content', `https://136masternr.github.io/doggirls/assets/img/${dog}.png`);
}