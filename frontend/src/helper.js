const toggleLoading = (loading) => {
  const backgroundOverlay = document.getElementById("background-overlay");
  if (loading === true) {
    backgroundOverlay.style.display = "block";
  } else {
    backgroundOverlay.style.display = "none";
  }
};

export default toggleLoading;